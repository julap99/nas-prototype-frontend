<template>
  <RsModal 
    v-model="isOpen"
    :title="modal?.settings?.title || 'Modal'"
    :size="modal?.settings?.size || 'medium'"
    :position="modal?.settings?.position || 'center'"
  >
    <div class="modal-form-content">
      <FormKit 
        v-if="modal?.components?.length > 0"
        type="form" 
        @submit="handleModalSubmit"
        :submit-label="getSubmitLabel()"
        :actions="modal?.settings?.submitButton?.enabled !== false"
      >
        <template v-for="component in modal.components" :key="component.id">
          <ComponentPreview 
            :component="component"
            :is-preview="true"
            :modal-input-data="modalInputData"
            @form-data-updated="handleFormDataUpdate"
            @button-clicked="handleButtonClick"
            @open-modal="handleOpenModal"
            @close-modal="handleCloseModal"
          />
        </template>
      </FormKit>
      
      <!-- Empty state when no components -->
      <div v-else class="text-center py-8">
        <Icon name="heroicons:cube-transparent" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-600 mb-2">Empty Modal</h3>
        <p class="text-sm text-gray-500">This modal doesn't have any components yet.</p>
      </div>
    </div>
    
    <template #footer v-if="shouldShowFooter">
      <div class="flex justify-end gap-2">
        <!-- Cancel Button -->
        <RsButton 
          v-if="modal?.settings?.footer?.showCancelButton"
          @click="handleClose" 
          :variant="modal?.settings?.footer?.cancelButtonVariant || 'secondary'"
        >
          {{ modal?.settings?.footer?.cancelButtonText || 'Cancel' }}
        </RsButton>
        
        <!-- OK/Submit Button -->
        <RsButton 
          v-if="modal?.settings?.footer?.showOkButton"
          @click="handleOkButtonClick" 
          :variant="modal?.settings?.footer?.okButtonVariant || 'primary'"
        >
          {{ modal?.settings?.footer?.okButtonText || 'OK' }}
        </RsButton>
        
        <!-- Auto-generated footer buttons based on button components -->
        <template v-for="button in footerButtons" :key="button.id">
          <RsButton 
            @click="handleFooterButtonClick(button)"
            :variant="getButtonVariant(button)"
            :disabled="button.props.disabled"
          >
            <Icon 
              v-if="button.props.icon" 
              :name="button.props.icon" 
              class="w-4 h-4 mr-2" 
            />
            {{ button.props.buttonText || button.props.label }}
          </RsButton>
        </template>
      </div>
    </template>
  </RsModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ComponentPreview from '~/components/ComponentPreview.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  modal: {
    type: Object,
    default: null
  },
  // Process variable integration
  modalMappings: {
    type: Object,
    default: () => ({
      inputMappings: [],
      outputMappings: [],
      buttonMappings: []
    })
  },
  processVariables: {
    type: Object,
    default: () => ({})
  },
  modalInputData: {
    type: Object,
    default: () => ({})
  },
  isProcessMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue', 
  'modal-submit', 
  'modal-close',
  'form-data-updated',
  'button-clicked',
  'open-modal',
  'close-modal',
  // Process variable integration events
  'process-variable-updated',
  'modal-field-changed',
  'modal-button-tracked'
])

// Modal state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const modalFormData = ref({})

// Process Variable Integration
const processIntegratedData = computed(() => {
  if (!props.isProcessMode || !props.modalMappings?.inputMappings?.length) {
    return modalFormData.value
  }
  
  // Apply input mappings - Map process variables to modal fields
  const integratedData = { ...modalFormData.value }
  
  props.modalMappings.inputMappings.forEach(mapping => {
    if (mapping.processVariable && mapping.modal?.fieldName && mapping.modal?.modalId === props.modal?.id) {
      const processValue = props.processVariables[mapping.processVariable]
      if (processValue !== undefined) {
        // Set the process variable value into the modal field
        setNestedValue(integratedData, mapping.modal.fieldName, processValue)
      }
    }
  })
  
  return integratedData
})

// Helper function to set nested object values
function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

// Footer configuration
const shouldShowFooter = computed(() => {
  return props.modal?.settings?.showFooter === true;
})

const footerButtons = computed(() => {
  if (!props.modal?.components) return []
  
  // Extract button components that should appear in footer
  return props.modal.components.filter(component => 
    component.type === 'button' && 
    component.props.showInFooter === true
  )
})

// Handle form submission
const handleModalSubmit = (formData) => {
  console.log('Modal form submitted:', formData)
  emit('modal-submit', {
    modalId: props.modal?.id,
    formData: formData,
    modal: props.modal
  })
}

// Handle OK button click with navigation support
const handleOkButtonClick = () => {
  const footerSettings = props.modal?.settings?.footer
  
  // First, always submit the form data
  handleModalSubmit(modalFormData.value)
  
  // Then handle navigation if configured
  if (footerSettings?.okButtonAction === 'url' && footerSettings?.okButtonUrl) {
    const url = footerSettings.okButtonUrl
    const target = footerSettings.okButtonTarget || '_self'
    
    if (target === '_blank') {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  } else if (footerSettings?.okButtonAction === 'process' && footerSettings?.okButtonProcessId) {
    const processId = footerSettings.okButtonProcessId
    const target = footerSettings.okButtonTarget || '_self'
    const processUrl = `/workflow/${processId}`
    
    if (target === '_blank') {
      window.open(processUrl, '_blank')
    } else {
      navigateTo(processUrl)
    }
  }
}

// Handle form data updates
const handleFormDataUpdate = (data) => {
  modalFormData.value = { ...modalFormData.value, ...data }
  
  // Emit standard form data update
  emit('form-data-updated', {
    modalId: props.modal?.id,
    formData: modalFormData.value,
    fieldData: data
  })
  
  // Handle process variable integration in process mode
  if (props.isProcessMode && props.modalMappings?.outputMappings?.length) {
    handleProcessVariableOutputs(data)
  }
  
  // Emit modal field change for tracking
  emit('modal-field-changed', {
    modalId: props.modal?.id,
    fieldData: data,
    timestamp: new Date().toISOString()
  })
}

// Handle output mappings - Modal fields to process variables
const handleProcessVariableOutputs = (changedData) => {
  const updates = {}
  
  props.modalMappings.outputMappings.forEach(mapping => {
    if (mapping.modal?.fieldName && mapping.processVariable && mapping.modal?.modalId === props.modal?.id) {
      // Check if this field was changed
      const fieldValue = getNestedValue(changedData, mapping.modal.fieldName)
      if (fieldValue !== undefined) {
        updates[mapping.processVariable] = fieldValue
      } else {
        // If not in changed data, get from current form data
        const currentValue = getNestedValue(modalFormData.value, mapping.modal.fieldName)
        if (currentValue !== undefined) {
          updates[mapping.processVariable] = currentValue
        }
      }
    }
  })
  
  // Emit process variable updates if any
  if (Object.keys(updates).length > 0) {
    emit('process-variable-updated', {
      modalId: props.modal?.id,
      variableUpdates: updates,
      timestamp: new Date().toISOString()
    })
  }
}

// Handle button clicks within the modal
const handleButtonClick = (buttonData) => {
  console.log('Modal button clicked:', buttonData)
  
  // Handle process variable integration for button clicks
  if (props.isProcessMode && props.modalMappings?.buttonMappings?.length) {
    handleProcessVariableButtonTracking(buttonData)
  }
  
  // Emit modal button tracking
  emit('modal-button-tracked', {
    modalId: props.modal?.id,
    buttonData: buttonData,
    timestamp: new Date().toISOString()
  })
  
  // Handle special button actions
  if (buttonData.action === 'close-modal') {
    handleCloseModal()
  } else if (buttonData.action === 'submit') {
    handleModalSubmit(modalFormData.value)
  } else {
    // Pass through other button events
    emit('button-clicked', {
      ...buttonData,
      modalId: props.modal?.id,
      formData: modalFormData.value
    })
  }
}

// Handle button tracking for process variables
const handleProcessVariableButtonTracking = (buttonData) => {
  const updates = {}
  
  props.modalMappings.buttonMappings.forEach(mapping => {
    if (mapping.modal?.buttonName === buttonData.buttonName && 
        mapping.modal?.modalId === props.modal?.id && 
        mapping.processVariable) {
      
      // Determine the value to set based on action type
      let value = mapping.customValue || true
      
      if (mapping.action === 'clicked') {
        value = mapping.customValue || true
      } else if (mapping.action === 'timestamp') {
        value = new Date().toISOString()
      } else if (mapping.action === 'count') {
        // Increment existing count or start at 1
        const currentValue = props.processVariables[mapping.processVariable] || 0
        value = (typeof currentValue === 'number' ? currentValue : 0) + 1
      }
      
      updates[mapping.processVariable] = value
    }
  })
  
  // Emit process variable updates if any
  if (Object.keys(updates).length > 0) {
    emit('process-variable-updated', {
      modalId: props.modal?.id,
      variableUpdates: updates,
      buttonData: buttonData,
      timestamp: new Date().toISOString()
    })
  }
}

// Handle footer button clicks
const handleFooterButtonClick = (button) => {
  handleButtonClick({
    buttonName: button.props.name,
    buttonLabel: button.props.label,
    buttonText: button.props.buttonText || button.props.label,
    buttonType: button.props.buttonType || 'button',
    action: button.props.action,
    targetModal: button.props.targetModal,
    timestamp: new Date().toISOString()
  })
}

// Handle nested modal operations
const handleOpenModal = (modalId) => {
  emit('open-modal', modalId)
}

const handleCloseModal = () => {
  isOpen.value = false
  emit('close-modal', props.modal?.id)
}

// Handle modal close
const handleClose = () => {
  emit('modal-close', {
    modalId: props.modal?.id,
    formData: modalFormData.value
  })
  isOpen.value = false
}

// Helper functions
const getSubmitLabel = () => {
  return props.modal?.settings?.submitButton?.label || 'Submit'
}

const getButtonVariant = (button) => {
  const variantMap = {
    'primary': 'primary',
    'secondary': 'secondary', 
    'success': 'success',
    'warning': 'warning',
    'danger': 'danger'
  }
  return variantMap[button.props.variant] || 'primary'
}

// Clear form data when modal closes and initialize with process variables when opens
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    // Clear form data when modal closes
    modalFormData.value = {}
  } else if (newValue && props.isProcessMode) {
    // Initialize modal with process variable values when opened in process mode
    initializeModalWithProcessVariables()
  }
})

// Initialize modal fields with process variable values
const initializeModalWithProcessVariables = () => {
  if (!props.modalMappings?.inputMappings?.length) return
  
  const initialData = {}
  
  props.modalMappings.inputMappings.forEach(mapping => {
    if (mapping.processVariable && mapping.modal?.fieldName && mapping.modal?.modalId === props.modal?.id) {
      const processValue = props.processVariables[mapping.processVariable]
      if (processValue !== undefined) {
        setNestedValue(initialData, mapping.modal.fieldName, processValue)
      }
    }
  })
  
  // Merge with any existing modal data
  modalFormData.value = { ...modalFormData.value, ...initialData }
  
  console.log('[FormModal] Initialized with process variables:', initialData)
}
</script>

<style scoped>
.modal-form-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0;
}

.modal-form-content :deep(.formkit-form) {
  padding: 1rem;
}

/* Ensure proper spacing for form components */
.modal-form-content :deep(.form-component) {
  margin-bottom: 1rem;
}

.modal-form-content :deep(.form-component:last-child) {
  margin-bottom: 0;
}

/* Handle scrolling for long forms */
.modal-form-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.modal-form-content::-webkit-scrollbar {
  width: 6px;
}

.modal-form-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-form-content::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

.modal-form-content::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>