<template>
  <div class="conditional-logic-engine">
    <!-- This component handles conditional logic execution -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  formComponents: {
    type: Array,
    required: true
  },
  formData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['script-generated'])

// Internal state
const generatedScript = ref('')
const isInitialized = ref(false)

// Helper function to map operators to valid JavaScript
const getJavaScriptOperator = (operator) => {
  switch (operator) {
    case 'and':
    case 'AND':
      return '&&'
    case 'or':
    case 'OR':
      return '||'
    default:
      return '&&' // Default to AND if unknown operator
  }
}

// Generate conditional logic script from form components
const generateConditionalLogicScript = () => {
  const scriptsArray = []
  const fieldWatchers = new Map() // Group by watched field to avoid duplicates
  const initialEvaluations = []
  
  // Helper function to generate condition check
  const generateConditionCheck = (condition) => {
    const { field, operator: condOp, value } = condition
    
    switch (condOp) {
      case 'equals':
        return `getField('${field}') === '${value}'`
      case 'not_equals':
        return `getField('${field}') !== '${value}'`
      case 'contains':
        return `String(getField('${field}') || '').toLowerCase().includes('${value}'.toLowerCase())`
      case 'not_contains':
        return `!String(getField('${field}') || '').toLowerCase().includes('${value}'.toLowerCase())`
      case 'is_empty':
        return `!getField('${field}') || getField('${field}') === ''`
      case 'is_not_empty':
        return `getField('${field}') && getField('${field}') !== ''`
      case 'greater_than':
        return `Number(getField('${field}')) > ${Number(value) || 0}`
      case 'less_than':
        return `Number(getField('${field}')) < ${Number(value) || 0}`
      default:
        return `getField('${field}') === '${value}'`
    }
  }
  
  // Helper function to generate action code
  const generateActionCode = (action, fieldName) => {
    switch (action) {
      case 'show': return `showField('${fieldName}')`
      case 'hide': return `hideField('${fieldName}')`
      case 'enable': return `enableField('${fieldName}')`
      case 'disable': return `disableField('${fieldName}')`
      default: return `showField('${fieldName}')`
    }
  }
  
  // Helper function to generate inverse action code
  const generateInverseActionCode = (action, fieldName) => {
    switch (action) {
      case 'show': return `hideField('${fieldName}')`
      case 'hide': return `showField('${fieldName}')`
      case 'enable': return `disableField('${fieldName}')`
      case 'disable': return `enableField('${fieldName}')`
      default: return `hideField('${fieldName}')`
    }
  }
  
  // Process each component that has conditional logic enabled
  props.formComponents.forEach(component => {
    const conditionalLogic = component.props.conditionalLogic
    
    if (!conditionalLogic || !conditionalLogic.enabled || !conditionalLogic.conditions.length) {
      return
    }
    
    const { conditions, action, operator } = conditionalLogic
    const fieldName = component.props.name
    
    if (!fieldName) return
    
    // Generate condition checks
    const conditionChecks = conditions.map(generateConditionCheck).join(` ${getJavaScriptOperator(operator)} `)
    
    // Generate action functions
    const actionCode = generateActionCode(action, fieldName)
    const inverseActionCode = generateInverseActionCode(action, fieldName)
    
    // Get all watched fields for this component
    const watchedFields = [...new Set(conditions.map(c => c.field).filter(Boolean))]
    
    // Group logic by watched field to avoid duplicates
    watchedFields.forEach(watchField => {
      if (!fieldWatchers.has(watchField)) {
        fieldWatchers.set(watchField, {
          fieldName: watchField,
          logicBlocks: []
        })
      }
      
      // Add this component's logic to the watched field
      fieldWatchers.get(watchField).logicBlocks.push({
        targetField: fieldName,
        conditionChecks,
        actionCode,
        inverseActionCode,
        componentType: component.type
      })
    })
    
    // Add initial evaluation
    initialEvaluations.push({
      targetField: fieldName,
      conditionChecks,
      actionCode,
      inverseActionCode,
      componentType: component.type
    })
  })
  
  // Generate optimized field change handlers (one per watched field)
  fieldWatchers.forEach((watcher, watchField) => {
    const logicBlocks = watcher.logicBlocks.map(block => `
  // Logic for ${block.componentType} field: ${block.targetField}
  if (${block.conditionChecks}) {
    ${block.actionCode};
  } else {
    ${block.inverseActionCode};
  }`).join('')
    
    const script = `
// Optimized field change handler for: ${watchField}
// Handles ${watcher.logicBlocks.length} dependent field(s): ${watcher.logicBlocks.map(b => b.targetField).join(', ')}
onFieldChange('${watchField}', function() {${logicBlocks}
});`
    
    scriptsArray.push(script)
  })
  
  // Generate initial evaluations
  if (initialEvaluations.length > 0) {
    const initialLogicBlocks = initialEvaluations.map(block => `
  // Initial evaluation for ${block.componentType} field: ${block.targetField}
  if (${block.conditionChecks}) {
    ${block.actionCode};
  } else {
    ${block.inverseActionCode};
  }`).join('')
    
    const initialScript = `
// Initial conditional logic evaluation
(function() {${initialLogicBlocks}
})();`
    
    scriptsArray.push(initialScript)
  }
  
  return scriptsArray.join('\n\n')
}

// Update generated script when components change (but not tab states)
watch(() => props.formComponents, (newComponents, oldComponents) => {
  if (isInitialized.value) {
    // Only regenerate if the components structure changed, not just tab active states
    const newHash = generateComponentsHash(newComponents)
    const oldHash = generateComponentsHash(oldComponents || [])
    
    if (newHash !== oldHash) {
      updateConditionalLogic()
    }
  }
}, { deep: true })

// Generate a hash of components excluding tab active states
const generateComponentsHash = (components) => {
  return JSON.stringify(components, (key, value) => {
    // Exclude tab active state from hash to prevent unnecessary updates
    if (key === 'active' && typeof value === 'boolean') {
      return undefined
    }
    return value
  })
}

// Update conditional logic
const updateConditionalLogic = () => {
  const newScript = generateConditionalLogicScript()
  generatedScript.value = newScript
  
  // Emit the generated script to parent component
  emit('script-generated', newScript)
}

// Initialize on mount
onMounted(() => {
  nextTick(() => {
    updateConditionalLogic()
    isInitialized.value = true
  })
})

// Expose the generated script for debugging
defineExpose({
  generatedScript,
  updateConditionalLogic
})
</script>

<style scoped>
.conditional-logic-engine {
  display: none; /* This component is purely functional */
}
</style> 