<template>
  <div class="formkit-quill-editor">
    <ClientOnly>
      <QuillEditor
        :content="_value"
        @update:content="handleContentChange"
        :contentType="context.contentType || 'html'"
        :theme="context.theme || 'snow'"
        :toolbar="editorToolbar"
        :placeholder="context.placeholder || 'Enter text...'"
        :readOnly="context.disabled || context.readonly"
        :options="editorOptions"
        class="quill-wrapper"
        :class="{
          'quill-disabled': context.disabled,
          'quill-readonly': context.readonly
        }"
      />
    </ClientOnly>

    <!-- Hidden textarea for FormKit value handling and validation -->
    <textarea
      :value="_value"
      :name="context.node.name"
      :id="context.id"
      :disabled="context.disabled || context.readonly"
      :required="context.attrs.required"
      class="hidden-textarea"
      tabindex="-1"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  context: {
    type: Object,
    required: true
  }
})

// Computed value that syncs with FormKit
const _value = computed({
  get: () => props.context.node._value || '',
  set: (value) => props.context.node.input(value)
})

// Toolbar configurations
const toolbarPresets = {
  minimal: [
    ['bold', 'italic'],
    ['link']
  ],
  essential: [
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
  full: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ]
}

// Get toolbar configuration
const editorToolbar = computed(() => {
  const toolbar = props.context.toolbar || 'essential'

  // If it's a string preset, use predefined toolbar
  if (typeof toolbar === 'string' && toolbarPresets[toolbar]) {
    return toolbarPresets[toolbar]
  }

  // If it's an array, use custom toolbar
  if (Array.isArray(toolbar)) {
    return toolbar
  }

  // Default to essential
  return toolbarPresets.essential
})

// Editor configuration options
const editorOptions = computed(() => ({
  modules: {
    toolbar: editorToolbar.value
  },
  placeholder: props.context.placeholder || 'Enter text...',
  readOnly: props.context.readonly || props.context.disabled || false
}))

// Handle content changes from Quill
const handleContentChange = (content) => {
  // Don't allow changes if readonly or disabled
  if (props.context.readonly || props.context.disabled) {
    return
  }

  // Update FormKit value
  props.context.node.input(content)
}
</script>

<style scoped>
.formkit-quill-editor {
  position: relative;
  width: 100%;
}

.hidden-textarea {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.quill-wrapper {
  width: 100%;
  min-height: 150px;
}

/* Disabled/Readonly styles */
.quill-disabled,
.quill-readonly {
  opacity: 0.8;
}

.quill-disabled :deep(.ql-toolbar),
.quill-readonly :deep(.ql-toolbar) {
  pointer-events: none;
  opacity: 0.5;
}

.quill-disabled :deep(.ql-container),
.quill-readonly :deep(.ql-container) {
  background-color: #f3f4f6;
}

/* FormKit theme integration */
:deep(.ql-container) {
  font-family: inherit;
  border-color: #d1d5db;
  border-radius: 0 0 0.375rem 0.375rem;
}

:deep(.ql-toolbar) {
  border-color: #d1d5db;
  border-radius: 0.375rem 0.375rem 0 0;
  background-color: #f9fafb;
}

:deep(.ql-container.ql-snow) {
  border: 1px solid #d1d5db;
}

:deep(.ql-editor) {
  min-height: 120px;
  font-size: 0.875rem;
  padding: 12px 15px;
}

:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}

/* Focus styles */
:deep(.ql-container:focus-within) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

:deep(.ql-toolbar.ql-snow) {
  border: 1px solid #d1d5db;
  border-bottom: none;
}

/* Error state styling */
.formkit-quill-editor.formkit-invalid :deep(.ql-container),
.formkit-quill-editor.formkit-invalid :deep(.ql-toolbar) {
  border-color: #ef4444;
}

/* Success state styling */
.formkit-quill-editor.formkit-valid :deep(.ql-container),
.formkit-quill-editor.formkit-valid :deep(.ql-toolbar) {
  border-color: #10b981;
}

/* Custom toolbar button spacing */
:deep(.ql-toolbar.ql-snow) {
  padding: 8px;
}

:deep(.ql-toolbar.ql-snow .ql-formats) {
  margin-right: 15px;
}
</style>