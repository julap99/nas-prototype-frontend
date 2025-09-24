<template>
  <div class="layout-grid-container">


    <!-- Grid Container -->
    <div 
      class="grid-container"
      :class="{ 'is-preview': isPreview }"
      :style="gridStyles"
      @dragover.prevent="handleDragOver"
      @drop="handleDrop"
      @dragenter.prevent="handleDragEnter"
      @dragleave="handleDragLeave"
    >
      <!-- Grid Cells -->
      <div
        v-for="(cell, index) in gridCells"
        :key="`cell-${index}`"
        v-show="!isCellCovered(index)"
        class="grid-cell"
        :class="{
          'cell-empty': !cell.component,
          'cell-occupied': cell.component,
          'cell-highlighted': highlightedCell === index,
          'cell-drag-over': dragOverCell === index,
          'is-preview': isPreview
        }"
        :style="getCellStyles(cell)"
        @click="!isPreview ? selectCell(index) : null"
        @dragover.prevent="!isContainerComponent(cell) ? handleCellDragOver(index, $event) : null"
        @drop="!isContainerComponent(cell) ? handleCellDrop(index, $event) : null"
        @dragenter.prevent="!isContainerComponent(cell) ? handleCellDragEnter(index) : null"
        @dragleave="!isContainerComponent(cell) ? handleCellDragLeave(index) : null"

      >


        <!-- Component Preview -->
        <div v-if="cell.component" class="component-preview">
          <!-- Component Actions (when not in preview) -->
          <div v-if="!isPreview" class="component-actions absolute right-1 top-1 flex space-x-1 z-10">
            <button 
              class="p-1 text-gray-400 hover:text-blue-600 rounded"
              title="Component settings"
              @click.stop="openComponentSettings(cell.component)"
            >
              <Icon name="heroicons:cog-6-tooth" class="w-3 h-3" />
            </button>
            <button 
              class="p-1 text-gray-400 hover:text-red-500 rounded"
              title="Remove component"
              @click.stop="removeComponent(index)"
            >
              <Icon name="material-symbols:close" class="w-3 h-3" />
            </button>
          </div>
          
          <component-preview 
            :component="cell.component" 
            :is-preview="isPreview"
          />
        </div>

        <!-- Empty State -->
        <div v-else-if="!isPreview" class="cell-empty-state">
          <Icon name="heroicons:plus" class="w-6 h-6 text-gray-400" />
          <span class="text-sm text-gray-500">Drop component here</span>
        </div>
        
        <!-- Empty cells in preview mode should be completely invisible -->
        <div v-else-if="isPreview && !cell.component" class="cell-empty-preview">
          <!-- Completely empty - no content -->
        </div>
      </div>
    </div>


  </div>
  
  <!-- Nested Component Settings Modal -->
  <FormBuilderFieldSettingsModal
    v-model="showNestedSettingsModal"
    :component="selectedNestedComponent"
    @close="closeNestedSettingsModal"
    @update-component="saveNestedComponentSettings"
  />
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useFormBuilderStore } from '~/stores/formBuilder'
import FormBuilderFieldSettingsModal from '~/components/FormBuilderFieldSettingsModal.vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:config'])

// Form builder store
const formStore = useFormBuilderStore()

// Grid state
const selectedCell = ref(null)
const highlightedCell = ref(null)
const dragOverCell = ref(null)

// Nested settings modal state
const showNestedSettingsModal = ref(false)
const selectedNestedComponent = ref(null)

// Grid configuration - better defaults for beginners
const gridConfig = ref({
  rows: props.config.rows || 2,
  columns: props.config.columns || 2,
  gap: props.config.gap || 16
})

// Grid cells data
const gridCells = ref(props.config.cells || [])

// Watch for config changes and update grid accordingly
watch(() => props.config, (newConfig) => {
  if (newConfig) {
    const oldRows = gridConfig.value.rows
    const oldColumns = gridConfig.value.columns
    
    gridConfig.value.rows = newConfig.rows || 2
    gridConfig.value.columns = newConfig.columns || 2
    gridConfig.value.gap = newConfig.gap || 16
    
    // Only update cells if dimensions changed or cells are provided
    if (newConfig.cells && newConfig.cells.length > 0) {
      gridCells.value = [...newConfig.cells]
    } else if (oldRows !== gridConfig.value.rows || oldColumns !== gridConfig.value.columns) {
      initializeGridCells()
    }
  }
}, { immediate: true })

// Debounced emit to prevent excessive updates
let emitTimeout = null
watch(gridCells, (newCells) => {
  if (emitTimeout) clearTimeout(emitTimeout)
  emitTimeout = setTimeout(() => {
    emit('update:config', {
      ...props.config,
      cells: newCells
    })
  }, 100)
}, { deep: false })

// Computed grid styles
const gridStyles = computed(() => ({
  display: 'grid',
  gridTemplateRows: `repeat(${gridConfig.value.rows}, 1fr)`,
  gridTemplateColumns: `repeat(${gridConfig.value.columns}, 1fr)`,
  gap: `${gridConfig.value.gap}px`,
  minHeight: '200px'
}))

// Initialize grid cells
function initializeGridCells() {
  const totalCells = gridConfig.value.rows * gridConfig.value.columns
  gridCells.value = Array.from({ length: totalCells }, (_, index) => ({
    id: `cell-${index}`,
    row: Math.floor(index / gridConfig.value.columns),
    col: index % gridConfig.value.columns,
    rowSpan: 1,
    colSpan: 1,
    component: null
  }))
}

// Get cell styles
function getCellStyles(cell) {
  return {
    gridRow: `${cell.row + 1} / span ${cell.rowSpan}`,
    gridColumn: `${cell.col + 1} / span ${cell.colSpan}`,
    position: 'relative'
  }
}

// Get cell position string
function getCellPosition(index) {
  const cell = gridCells.value[index]
  return `${cell.row + 1},${cell.col + 1}`
}

// Check if a cell is covered by a spanning cell (optimized)
function isCellCovered(cellIndex) {
  const cell = gridCells.value[cellIndex]
  if (!cell || cell.rowSpan > 1 || cell.colSpan > 1) return false
  
  // Only check if this cell is covered by spanning cells
  for (let i = 0; i < gridCells.value.length; i++) {
    if (i === cellIndex) continue
    
    const otherCell = gridCells.value[i]
    if (!otherCell || otherCell.rowSpan === 1 && otherCell.colSpan === 1) continue
    
    // Check if this cell is within the span of another cell
    const isInRowSpan = cell.row >= otherCell.row && 
                       cell.row < otherCell.row + otherCell.rowSpan
    const isInColSpan = cell.col >= otherCell.col && 
                       cell.col < otherCell.col + otherCell.colSpan
    
    if (isInRowSpan && isInColSpan) {
      return true
    }
  }
  
  return false
}

// Check if a cell contains a container component
function isContainerComponent(cell) {
  return cell.component && ['repeating-group', 'form-section', 'dynamic-list'].includes(cell.component.type)
}

// Cell selection
function selectCell(index) {
  selectedCell.value = index
}

// Drag and drop handlers
function handleDragOver(event) {
  event.preventDefault()
}

function handleDrop(event) {
  event.preventDefault()
  dragOverCell.value = null
  
  // Check if we have a selected cell and if it's a container component
  if (selectedCell.value !== null) {
    const cell = gridCells.value[selectedCell.value]
    const isContainerComponent = cell.component && ['repeating-group', 'form-section', 'dynamic-list'].includes(cell.component.type)
    
    if (isContainerComponent) {
      // Allow the drop event to pass through to the container component
      console.log('Allowing drop to pass through to container component:', cell.component.type)
      return
    }
  }
  
  // For non-container components or empty cells, handle the drop here
  event.stopPropagation()
  
  try {
    const componentData = JSON.parse(event.dataTransfer.getData('text/plain'))
    if (componentData.type) {
      const success = addComponentToCell(selectedCell.value || 0, componentData)
      if (success) {
        // Prevent the component from being added to the main form
        event.stopImmediatePropagation()
      }
    }
  } catch (error) {
    console.warn('Invalid component data dropped:', error)
  }
}

function handleDragEnter(event) {
  event.preventDefault()
}

function handleDragLeave(event) {
  // Only clear if actually leaving the container
  const rect = event.currentTarget.getBoundingClientRect()
  const isOutside = (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
  
  if (isOutside) {
    dragOverCell.value = null
  }
}

function handleCellDragOver(cellIndex, event) {
  if (props.isPreview) return
  
  // Only handle drag over for non-container components or empty cells
  event.preventDefault()
  dragOverCell.value = cellIndex
}

function handleCellDrop(cellIndex, event) {
  if (props.isPreview) return
  
  // Only handle drops for non-container components or empty cells
  event.preventDefault()
  event.stopPropagation()
  dragOverCell.value = null
  
  try {
    const componentData = JSON.parse(event.dataTransfer.getData('text/plain'))
    if (componentData.type) {
      const success = addComponentToCell(cellIndex, componentData)
      if (success) {
        // Prevent the component from being added to the main form
        event.stopImmediatePropagation()
      }
    }
  } catch (error) {
    console.warn('Invalid component data dropped:', error)
  }
}

function handleCellDragEnter(cellIndex) {
  if (props.isPreview) return
  
  // Only handle drag enter for non-container components or empty cells
  dragOverCell.value = cellIndex
}

function handleCellDragLeave(cellIndex) {
  if (dragOverCell.value === cellIndex) {
    dragOverCell.value = null
  }
}

// Add component to cell
function addComponentToCell(cellIndex, componentData) {
  if (cellIndex >= 0 && cellIndex < gridCells.value.length) {
    const newComponent = {
      id: `${componentData.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: componentData.type,
      name: componentData.name,
      props: {
        ...componentData.defaultProps,
        label: componentData.defaultProps.label || componentData.name || componentData.type,
        name: componentData.defaultProps.name || `${componentData.type}_${Date.now()}`
      }
    }
    
    gridCells.value[cellIndex].component = newComponent
    console.log(`[LayoutGrid] Added component ${componentData.type} to cell ${cellIndex}`)
    
    // Prevent the component from being added to the main form
    // by stopping the event propagation
    return true
  }
  return false
}

// Remove component from cell
function removeComponent(cellIndex) {
  if (cellIndex >= 0 && cellIndex < gridCells.value.length) {
    gridCells.value[cellIndex].component = null
    console.log(`[LayoutGrid] Removed component from cell ${cellIndex}`)
  }
}

// Helper function to find container at any nesting level
const findContainerRecursively = (containerId, components, childId = null) => {
  for (const component of components) {
    // Check if this is the target container
    if (containerId && component.id === containerId) {
      return component;
    }
    
    // If searching for parent by child ID, check if this component contains the child
    if (childId && component.props.children && Array.isArray(component.props.children)) {
      const hasChild = component.props.children.some(child => child.id === childId);
      if (hasChild) {
        return component;
      }
    }
    
    // If this component has children, search recursively
    if (component.props.children && Array.isArray(component.props.children)) {
      const found = findContainerRecursively(containerId, component.props.children, childId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

// Nested component settings functions
const openComponentSettings = (component) => {
  selectedNestedComponent.value = { ...component }
  showNestedSettingsModal.value = true
  console.log('Opening settings for component:', component)
}

const closeNestedSettingsModal = () => {
  showNestedSettingsModal.value = false
  selectedNestedComponent.value = null
}

const saveNestedComponentSettings = (updatedComponent) => {
  if (!updatedComponent || !selectedNestedComponent.value) return
  
  // Find the parent container at any nesting level
  const parentContainer = findContainerRecursively(null, formStore.formComponents, updatedComponent.id)
  
  if (parentContainer) {
    const childIndex = parentContainer.props.children.findIndex(child => child.id === updatedComponent.id)
    if (childIndex !== -1) {
      // Update the nested component
      parentContainer.props.children[childIndex] = { ...updatedComponent }
      // Update the container to trigger reactivity
      formStore.updateComponent(parentContainer)
      console.log('Updated nested component:', updatedComponent)
    }
  } else {
    // If not found in form components, it might be in the grid cells
    const cellIndex = gridCells.value.findIndex(cell => 
      cell.component && cell.component.id === updatedComponent.id
    )
    
    if (cellIndex !== -1) {
      // Update the component directly in the grid cell
      gridCells.value[cellIndex].component = { ...updatedComponent }
      console.log('Updated component in grid cell:', updatedComponent)
    } else {
      console.warn('Could not find parent container for component:', updatedComponent.id)
    }
  }
  
  // Close the modal
  closeNestedSettingsModal()
}






</script>

<style scoped>
.layout-grid-container {
  @apply border-0 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm w-full;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}





.grid-container {
  @apply relative;
  min-height: 200px;
  padding: 1rem;
}

.grid-container.is-preview {
  padding: 0;
}

.grid-cell {
  @apply transition-all duration-200;
  min-height: 80px;
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.grid-cell.is-preview {
  border: none;
  padding: 0;
  background: transparent;
}

.grid-cell.cell-empty {
  @apply bg-white;
}

.grid-cell.cell-occupied {
  @apply border-gray-400 bg-white;
}

.grid-cell.cell-highlighted {
  @apply border-blue-400 bg-blue-50;
}

.grid-cell.cell-drag-over {
  @apply border-green-400 bg-green-50;
}

.cell-header {
  @apply flex justify-between items-center mb-2 p-1 bg-gray-100 rounded text-xs;
}

.cell-info {
  @apply flex items-center gap-2;
}

.cell-position {
  @apply font-mono text-gray-600;
}

.cell-component {
  @apply text-blue-600 font-medium;
}

.cell-span {
  @apply text-xs text-gray-500 bg-gray-100 px-1 rounded;
}

.cell-actions {
  @apply flex items-center gap-1;
}

.cell-action-btn {
  @apply p-1 text-gray-400 hover:text-gray-600 rounded transition-colors;
}

.cell-action-btn:hover {
  @apply bg-gray-200;
}

.component-preview {
  @apply w-full;
}

.cell-empty-state {
  @apply flex flex-col items-center justify-center h-full text-center;
  min-height: 60px;
}

.cell-empty-state span {
  @apply mt-2;
}

.cell-empty-preview {
  /* Completely invisible in preview mode */
  display: none;
}

.component-actions {
  @apply opacity-0 transition-opacity duration-200;
}

.component-preview:hover .component-actions {
  @apply opacity-100;
}

.nested-settings-modal {
  @apply max-h-[80vh] overflow-y-auto;
}

.cell-help-text {
  @apply text-xs text-gray-500 italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .grid-header {
    @apply p-3;
  }
  
  .header-content {
    @apply flex-col gap-2;
  }
  
  .grid-title {
    @apply text-base font-semibold leading-tight;
  }
  
  .grid-help {
    @apply text-sm leading-relaxed;
  }
  
  .header-right {
    @apply mt-2;
  }
  
  .grid-container {
    @apply p-3;
  }
  
  .grid-cell {
    @apply p-2;
    min-height: 60px;
  }
  
  .modal-container {
    @apply mx-2;
  }
}
</style>
