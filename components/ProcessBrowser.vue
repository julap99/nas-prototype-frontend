<template>
  <div class="process-browser">
    <!-- Search Input -->
    <div class="search-container">
      <div class="relative">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder || 'Search processes...'"
          :disabled="disabled"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
          @input="filterProcesses"
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
    <div v-if="loading" class="process-grid">
      <div v-for="i in 6" :key="`skeleton-${i}`" class="process-item skeleton">
        <div class="process-preview-skeleton"></div>
        <div class="process-name-skeleton"></div>
      </div>
    </div>

    <!-- Process Grid -->
    <div v-else-if="filteredProcesses.length > 0" class="process-grid" :class="gridClasses">
      <div
        v-for="process in filteredProcesses"
        :key="process.value"
        class="process-item"
        :class="[{ 'selected': modelValue === process.value }, itemClasses]"
        @click="selectProcess(process)"
        :title="process.label"
      >
        <div class="process-preview">
          <Icon 
            name="material-symbols:account-tree" 
            :class="[size === 'compact' ? 'w-5 h-5' : 'w-6 h-6', 'text-blue-600']" 
          />
          <div v-if="modelValue === process.value" class="selected-overlay">
            <Icon name="heroicons:check" class="w-3 h-3 text-white" />
          </div>
        </div>
        <div class="process-name" :class="size === 'compact' ? 'text-xs' : 'text-sm'">{{ process.label }}</div>
        <div v-if="size !== 'compact'" class="process-description">{{ process.description }}</div>
        <div class="process-id" :class="size === 'compact' ? 'text-xs' : 'text-xs'">{{ process.value.substring(0, 8) }}...</div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="searchQuery && !loading" class="empty-state">
      <Icon name="material-symbols:search-off" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No processes found</h3>
      <p class="text-gray-600 mb-4">
        No processes match your search "{{ searchQuery }}".
      </p>
    </div>

    <!-- Default State -->
    <div v-else-if="!searchQuery && !loading" class="default-state">
      <Icon name="material-symbols:account-tree" class="w-12 h-12 text-blue-400 mx-auto mb-3" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Choose a Process</h3>
      <p class="text-gray-600 mb-4">
        Search through {{ processes.length }} published processes.
      </p>
    </div>

    <!-- Selected Process Preview -->
    <div v-if="modelValue && selectedProcess && showPreview" class="selected-preview">
      <div class="preview-header">
        <span class="text-sm font-medium text-gray-700">Selected Process:</span>
        <button
          @click="clearSelection"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear selection"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>
      <div class="preview-content">
        <Icon name="material-symbols:account-tree" class="w-8 h-8 text-blue-600" />
        <div class="ml-3">
          <div class="font-medium text-gray-900">{{ selectedProcess.label }}</div>
          <div class="text-sm text-gray-600 mb-1">{{ selectedProcess.description }}</div>
          <div class="text-xs text-gray-500">{{ selectedProcess.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search for a process...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'compact'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

// Reactive state
const searchQuery = ref('');
const processes = ref([]);
const loading = ref(false);
const error = ref('');

// Computed properties
const filteredProcesses = computed(() => {
  if (!searchQuery.value) {
    return processes.value.slice(0, 12); // Show first 12 by default
  }
  
  const query = searchQuery.value.toLowerCase();
  return processes.value.filter(process => 
    process.label.toLowerCase().includes(query) ||
    process.value.toLowerCase().includes(query) ||
    process.description.toLowerCase().includes(query)
  );
});

const selectedProcess = computed(() => {
  return processes.value.find(process => process.value === props.modelValue);
});

const gridClasses = computed(() => {
  return props.size === 'compact' 
    ? 'grid-cols-1 sm:grid-cols-2 max-h-48' 
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-h-64';
});

const itemClasses = computed(() => {
  return props.size === 'compact' ? 'min-h-[80px] p-2' : 'min-h-[120px] p-3';
});

// Methods
const fetchProcesses = async () => {
  try {
    loading.value = true;
    error.value = '';

    const response = await $fetch('/api/process?status=published&limit=1000');
    
    if (response.success) {
      processes.value = response.data.processes.map(process => ({
        label: process.processName,
        value: process.processUUID,
        description: process.processDescription || 'No description available'
      }));
    }
  } catch (err) {
    console.error('Error fetching processes:', err);
    error.value = 'Failed to load processes. Please try again.';
    processes.value = [];
  } finally {
    loading.value = false;
  }
};

const filterProcesses = useDebounceFn(() => {
  // The filtering is done reactively in the computed property
}, 300);

const selectProcess = (process) => {
  if (props.disabled) return;
  emit('update:modelValue', process.value);
};

const clearSearch = () => {
  searchQuery.value = '';
};

const clearSelection = () => {
  emit('update:modelValue', '');
};

// Load processes on component mount
onMounted(() => {
  fetchProcesses();
});
</script>

<style scoped>
.process-browser {
  @apply w-full;
}

.search-container {
  @apply mb-4;
}

.process-grid {
  @apply grid gap-3 overflow-y-auto;
}

.process-item {
  @apply border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all duration-200;
}

.process-item.selected {
  @apply border-blue-500 bg-blue-50 shadow-sm;
}

.process-item.skeleton {
  @apply animate-pulse cursor-default;
}

.process-preview {
  @apply relative flex items-center justify-center mb-2;
}

.process-preview-skeleton {
  @apply w-6 h-6 bg-gray-300 rounded;
}

.process-name {
  @apply text-sm font-medium text-gray-900 truncate mb-1;
}

.process-description {
  @apply text-xs text-gray-600 line-clamp-2 mb-1;
}

.process-name-skeleton {
  @apply h-4 bg-gray-300 rounded w-full;
}

.process-id {
  @apply text-xs text-gray-500 truncate;
}

.selected-overlay {
  @apply absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center;
}

.empty-state,
.default-state {
  @apply text-center py-8;
}

.selected-preview {
  @apply mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg;
}

.preview-header {
  @apply flex justify-between items-center mb-2;
}

.preview-content {
  @apply flex items-center;
}

/* Scrollbar styling */
.process-grid::-webkit-scrollbar {
  @apply w-2;
}

.process-grid::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

.process-grid::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded hover:bg-gray-400;
}
</style>