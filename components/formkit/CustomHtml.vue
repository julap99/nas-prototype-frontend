<script setup>
const props = defineProps({
  context: Object,
});

const componentRef = ref(null);
const uniqueId = ref(`custom-html-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

// Get component properties with defaults
const htmlContent = computed(() => props.context.htmlContent || '<p>No HTML content provided</p>');
const cssContent = computed(() => props.context.cssContent || '');
const jsContent = computed(() => props.context.jsContent || '');
const allowScripts = computed(() => props.context.allowScripts !== false);
const previewMode = computed(() => props.context.previewMode || 'safe');
const showInPreview = computed(() => props.context.showInPreview !== false);

// Create scoped CSS with unique ID
const scopedCss = computed(() => {
  if (!cssContent.value) return '';
  
  // Add scope to CSS rules
  const scopedRules = cssContent.value.replace(
    /([^@{}]+)\s*{/g, 
    `#${uniqueId.value} $1 {`
  );
  
  return `<style scoped>
#${uniqueId.value} {
  /* Component container styles */
  position: relative;
}

${scopedRules}
</style>`;
});

// Safe HTML content (no scripts)
const safeHtmlContent = computed(() => {
  if (previewMode.value === 'safe') {
    // Remove script tags and event handlers for safe mode
    return htmlContent.value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '');
  }
  return htmlContent.value;
});

// Execute custom JavaScript in a controlled environment
const executeCustomScript = () => {
  if (!allowScripts.value || !jsContent.value || previewMode.value === 'safe') {
    return;
  }

  try {
    // Create a safe execution context
    const scriptContext = {
      element: componentRef.value,
      console: console,
      
      // Helper functions for form interaction
      getValue: (fieldName) => {
        // Access parent form context if available
        if (props.context.node && props.context.node.parent) {
          const formData = props.context.node.parent.value;
          return formData ? formData[fieldName] : undefined;
        }
        return undefined;
      },
      
      setValue: (fieldName, value) => {
        // Set form field value if parent context available
        if (props.context.node && props.context.node.parent) {
          props.context.node.parent.input({ [fieldName]: value }, false);
        }
      },

      // Safe DOM methods
      querySelector: (selector) => componentRef.value?.querySelector(selector),
      querySelectorAll: (selector) => componentRef.value?.querySelectorAll(selector),
    };

    // Create function with custom context
    const scriptFunction = new Function('console', 'element', 'getValue', 'setValue', 'querySelector', 'querySelectorAll', jsContent.value);
    
    // Execute with controlled context
    scriptFunction.call(
      scriptContext,
      scriptContext.console,
      scriptContext.element,
      scriptContext.getValue,
      scriptContext.setValue,
      scriptContext.querySelector,
      scriptContext.querySelectorAll
    );
    
  } catch (error) {
    console.warn('Custom HTML script execution error:', error);
  }
};

// Watch for changes and re-execute script
watch([htmlContent, cssContent, jsContent], () => {
  nextTick(() => {
    executeCustomScript();
  });
});

// Execute script after component is mounted
onMounted(() => {
  nextTick(() => {
    executeCustomScript();
  });
});

// Clean up any event listeners when component is unmounted
onUnmounted(() => {
  if (componentRef.value) {
    // Remove any dynamically added event listeners
    const buttons = componentRef.value.querySelectorAll('button, a, [onclick]');
    buttons.forEach(el => {
      el.replaceWith(el.cloneNode(true)); // Remove all event listeners
    });
  }
});

// Don't display anything if showInPreview is false and we're in readonly/preview mode
const shouldShow = computed(() => {
  if (!props.context.readonly) return true; // Always show in edit mode
  return showInPreview.value; // Only show in preview if enabled
});
</script>

<template>
  <div v-if="shouldShow" class="custom-html-wrapper">
    <!-- Component Label -->
    <div v-if="context.label && context.label !== 'Custom HTML Component'" class="mb-2">
      <label class="text-sm font-medium text-gray-700">{{ context.label }}</label>
    </div>
    
    <!-- Help Text -->
    <div v-if="context.help" class="mb-2 text-xs text-gray-600">
      {{ context.help }}
    </div>
    
    <!-- Safe Mode Warning (only show in builder mode, not preview) -->
    <div v-if="!context.readonly && previewMode === 'safe' && (jsContent || htmlContent.includes('on'))" 
         class="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
      <Icon name="material-symbols:warning-outline" class="w-4 h-4 inline mr-1" />
      Safe Mode: Scripts and event handlers are disabled for security.
    </div>
    
    <!-- Custom HTML Content Container -->
    <div 
      :id="uniqueId"
      ref="componentRef" 
      class="custom-html-content"
      :class="{
        'readonly-mode': context.readonly,
        'safe-mode': previewMode === 'safe',
        'advanced-mode': previewMode === 'advanced'
      }"
    >
      <!-- Inject scoped CSS -->
      <div v-if="cssContent" v-html="scopedCss"></div>
      
      <!-- Render HTML content -->
      <div v-html="safeHtmlContent"></div>
    </div>
    
    <!-- Development Info (only visible in builder mode, not preview) -->
    <div v-if="false && !context.readonly && (htmlContent || cssContent || jsContent)" 
         class="mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
      <div class="flex items-center space-x-4">
        <div v-if="htmlContent">
          <Icon name="material-symbols:html" class="w-3 h-3 inline mr-1" />
          HTML: {{ htmlContent.length }} chars
        </div>
        <div v-if="cssContent">
          <Icon name="material-symbols:css" class="w-3 h-3 inline mr-1" />
          CSS: {{ cssContent.length }} chars
        </div>
        <div v-if="jsContent">
          <Icon name="material-symbols:javascript" class="w-3 h-3 inline mr-1" />
          JS: {{ jsContent.length }} chars
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-html-wrapper {
  width: 100%;
}

.custom-html-content {
  min-height: 40px;
  position: relative;
}

.custom-html-content.readonly-mode {
  pointer-events: auto; /* Allow interactions in readonly mode for custom HTML */
}

.custom-html-content.safe-mode {
  /* Additional safe mode styling if needed */
}

.custom-html-content.advanced-mode {
  /* Additional advanced mode styling if needed */
}

/* Prevent layout issues with custom HTML */
.custom-html-content :deep(*) {
  max-width: 100%;
  box-sizing: border-box;
}

/* Ensure images are responsive */
.custom-html-content :deep(img) {
  max-width: 100%;
  height: auto;
}

/* Prevent custom HTML from breaking out of container */
.custom-html-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>