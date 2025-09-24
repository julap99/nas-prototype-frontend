<template>
  <div class="icon-browser">
    <!-- Search Input -->
    <div class="search-container">
      <div class="relative">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder || 'Search icons...'"
          :disabled="disabled"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200 text-sm"
          @input="debouncedSearch"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear search"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" :class="gridClasses">
      <div v-for="i in skeletonCount" :key="`skeleton-${i}`" class="icon-item skeleton">
        <div class="icon-preview-skeleton"></div>
        <div v-if="size !== 'compact'" class="icon-name-skeleton"></div>
      </div>
    </div>

    <!-- Icon Grid -->
    <div v-else-if="icons.length > 0" :class="gridClasses">
      <div
        v-for="icon in displayIcons"
        :key="icon"
        class="icon-item"
        :class="{ 'selected': modelValue === icon }"
        @click="selectIcon(icon)"
        :title="icon"
      >
        <div class="icon-preview">
          <Icon :name="icon" :class="iconSizeClass" />
          <div v-if="modelValue === icon" class="selected-overlay">
            <Icon name="heroicons:check" class="w-3 h-3 text-white" />
          </div>
        </div>
        <div v-if="size !== 'compact'" class="icon-name">{{ getIconDisplayName(icon) }}</div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="searchQuery && !loading" class="empty-state">
      <Icon name="material-symbols:search-off" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No icons found</h3>
      <p class="text-gray-600 mb-4">
        No icons match your search "{{ searchQuery }}".
      </p>
      <p class="text-sm text-gray-500">
        Try searching for: home, edit, delete, add, settings, arrow, check
      </p>
    </div>

    <!-- Default State -->
    <div v-else-if="!searchQuery && !loading" class="default-state">
      <Icon name="material-symbols:palette" class="w-12 h-12 text-purple-400 mx-auto mb-3" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Choose an Icon</h3>
      <p class="text-gray-600 mb-4">
        Search from over 14,000 Material Design icons.
      </p>
      <div class="popular-searches">
        <p class="text-sm font-medium text-gray-700 mb-2">Popular searches:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="term in popularSearches"
            :key="term"
            @click="searchQuery = term; debouncedSearch()"
            class="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
          >
            {{ term }}
          </button>
        </div>
      </div>
    </div>

    <!-- Selected Icon Preview -->
    <div v-if="modelValue && showPreview" class="selected-preview">
      <div class="preview-header">
        <span class="text-sm font-medium text-gray-700">Selected Icon:</span>
        <button
          @click="clearSelection"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear selection"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>
      <div class="preview-content">
        <div class="preview-icon">
          <Icon :name="modelValue" class="w-8 h-8 text-gray-700" />
        </div>
        <div class="preview-details">
          <code class="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded">{{ modelValue }}</code>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="hasError" class="error-state">
      <div class="flex items-center text-red-600">
        <Icon name="material-symbols:error" class="w-4 h-4 mr-2" />
        <span class="text-sm">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search icons...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'normal', // 'compact' | 'normal' | 'large'
    validator: (value) => ['compact', 'normal', 'large'].includes(value)
  },
  showPreview: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue']);

// Reactive state
const searchQuery = ref('');
const icons = ref([]);
const loading = ref(false);
const error = ref('');

// Popular search terms for quick access
const popularSearches = ref([
  'home', 'edit', 'delete', 'add', 'search', 'settings', 
  'arrow', 'check', 'close', 'menu', 'play', 'star'
]);

// Computed properties
const hasError = computed(() => {
  if (props.required && !props.modelValue) return true;
  return !!error.value;
});

const errorMessage = computed(() => {
  if (props.required && !props.modelValue) {
    return 'Icon selection is required';
  }
  return error.value;
});

const gridClasses = computed(() => {
  const baseClass = 'icon-grid';
  const sizeClasses = {
    compact: 'icon-grid-compact',
    normal: 'icon-grid-normal', 
    large: 'icon-grid-large'
  };
  return `${baseClass} ${sizeClasses[props.size]}`;
});

const iconSizeClass = computed(() => {
  const sizeClasses = {
    compact: 'w-5 h-5',
    normal: 'w-6 h-6',
    large: 'w-8 h-8'
  };
  return sizeClasses[props.size];
});

const skeletonCount = computed(() => {
  const counts = {
    compact: 12,
    normal: 24,
    large: 16
  };
  return counts[props.size];
});

const displayIcons = computed(() => {
  const limits = {
    compact: 12,
    normal: 48,
    large: 32
  };
  return icons.value.slice(0, limits[props.size]);
});

// Methods
const searchIcons = async (query) => {
  if (!query || query.length < 2) {
    icons.value = [];
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    const response = await fetch(
      `https://api.iconify.design/search?query=${encodeURIComponent(query)}&prefix=material-symbols&limit=48`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    icons.value = data.icons || [];

  } catch (err) {
    console.error('Error fetching icons:', err);
    error.value = 'Failed to load icons. Please try again.';
    icons.value = [];
  } finally {
    loading.value = false;
  }
};

// Debounced search function
const debouncedSearch = useDebounceFn(() => {
  searchIcons(searchQuery.value);
}, 500);

const selectIcon = (iconName) => {
  if (props.disabled) return;
  emit('update:modelValue', iconName);
};

const clearSelection = () => {
  emit('update:modelValue', '');
};

const clearSearch = () => {
  searchQuery.value = '';
  icons.value = [];
  error.value = '';
};

const getIconDisplayName = (fullIconName) => {
  // Remove the "material-symbols:" prefix for display
  return fullIconName.replace('material-symbols:', '').replace(/-/g, ' ');
};

// Load default popular icons on component mount
const loadPopularIcons = async () => {
  try {
    loading.value = true;
    const popularTerms = ['home', 'edit', 'delete', 'add', 'search', 'settings'];
    const allIcons = [];

    for (const term of popularTerms) {
      const response = await fetch(
        `https://api.iconify.design/search?query=${term}&prefix=material-symbols&limit=8`
      );
      
      if (response.ok) {
        const data = await response.json();
        allIcons.push(...(data.icons || []).slice(0, 4)); // Take first 4 from each category
      }
    }

    // Remove duplicates and limit to 24 icons
    icons.value = [...new Set(allIcons)].slice(0, 24);
  } catch (err) {
    console.error('Error loading popular icons:', err);
  } finally {
    loading.value = false;
  }
};

// Load popular icons on mount
loadPopularIcons();

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  // If external value changes, we might want to do something here
  // For now, just ensure the error state is updated
  error.value = '';
});
</script>

<style scoped>
.icon-browser {
  @apply w-full;
}

.search-container {
  @apply mb-4;
}

.icon-grid {
  @apply border border-gray-200 rounded-md bg-gray-50 overflow-y-auto;
}

.icon-grid-compact {
  @apply grid grid-cols-6 gap-1 max-h-32 p-1;
}

.icon-grid-normal {
  @apply grid grid-cols-6 gap-3 max-h-80 p-2;
}

.icon-grid-large {
  @apply grid grid-cols-4 gap-4 max-h-96 p-3;
}

.icon-item {
  @apply flex flex-col items-center rounded-md cursor-pointer hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent;
}

.icon-grid-compact .icon-item {
  @apply p-1;
}

.icon-grid-normal .icon-item {
  @apply p-2;
}

.icon-grid-large .icon-item {
  @apply p-3;
}

.icon-item.selected {
  @apply bg-purple-50 border-purple-200 shadow-sm;
}

.icon-item.skeleton {
  @apply cursor-default;
}

.icon-preview {
  @apply relative flex items-center justify-center mb-1 rounded-md bg-gray-100;
}

.icon-grid-compact .icon-preview {
  @apply w-8 h-8;
}

.icon-grid-normal .icon-preview {
  @apply w-10 h-10;
}

.icon-grid-large .icon-preview {
  @apply w-12 h-12;
}

.icon-item:hover .icon-preview {
  @apply bg-white;
}

.icon-item.selected .icon-preview {
  @apply bg-purple-100;
}

.selected-overlay {
  @apply absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center;
}

.icon-name {
  @apply text-xs text-gray-600 text-center leading-tight max-w-full overflow-hidden;
  font-size: 10px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.icon-item.selected .icon-name {
  @apply text-purple-700 font-medium;
}

/* Skeleton Loading */
.icon-preview-skeleton {
  @apply w-10 h-10 bg-gray-200 rounded-md animate-pulse;
}

.icon-name-skeleton {
  @apply w-16 h-3 bg-gray-200 rounded animate-pulse mt-1;
}

/* States */
.empty-state,
.default-state {
  @apply text-center py-12 px-4;
}

.popular-searches {
  @apply mt-6;
}

.selected-preview {
  @apply mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md;
}

.preview-header {
  @apply flex items-center justify-between mb-2;
}

.preview-content {
  @apply flex items-center space-x-3;
}

.preview-icon {
  @apply flex items-center justify-center w-12 h-12 bg-white rounded-md shadow-sm;
}

.preview-details {
  @apply flex-1;
}

.error-state {
  @apply mt-2;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .icon-grid {
    @apply grid-cols-4 gap-2;
  }
  
  .icon-name {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .icon-grid {
    @apply grid-cols-3;
  }
}
</style>