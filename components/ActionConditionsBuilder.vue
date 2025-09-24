<template>
  <div class="action-conditions-builder">
    <!-- Operator Selection (when multiple conditions exist) -->
    <div v-if="conditions.length > 1" class="mb-4">
      <FormKit
        type="select"
        label="Condition Logic"
        :model-value="operator || 'and'"
        @update:model-value="$emit('update:operator', $event)"
        :options="[
          { label: 'All conditions must be true (AND)', value: 'and' },
          { label: 'Any condition can be true (OR)', value: 'or' }
        ]"
        help="How to combine multiple conditions"
        :classes="{ outer: 'field-wrapper' }"
      />
    </div>

    <!-- Conditions List -->
    <div class="space-y-3">
      <div v-for="(condition, index) in conditions" :key="index" class="condition-row">
        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- Field Selection -->
            <FormKit
              type="select"
              label="Field"
              v-model="condition.field"
              :options="fieldOptions"
              placeholder="Select field..."
              :classes="{ outer: 'field-wrapper-compact' }"
            />

            <!-- Operator Selection -->
            <FormKit
              type="select"
              label="Condition"
              v-model="condition.operator"
              :options="operatorOptions"
              placeholder="Select condition..."
              :classes="{ outer: 'field-wrapper-compact' }"
            />

            <!-- Value Input -->
            <FormKit
              :type="getValueInputType(condition.operator)"
              label="Value"
              v-model="condition.value"
              :placeholder="getValuePlaceholder(condition.operator)"
              :classes="{ outer: 'field-wrapper-compact' }"
              :disabled="condition.operator === 'is_empty' || condition.operator === 'is_not_empty'"
            />
          </div>

          <!-- Remove Button -->
          <button
            @click="removeCondition(index)"
            class="mt-6 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Remove condition"
            type="button"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add Condition Button -->
    <div class="mt-4 flex justify-center">
      <RsButton
        @click="addCondition"
        variant="primary-outline"
        size="sm"
      >
        <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
        Add Condition
      </RsButton>
    </div>

    <!-- No Conditions State -->
    <div v-if="conditions.length === 0" class="text-center py-6 text-gray-500">
      <Icon name="heroicons:funnel" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p class="text-sm mb-2">No conditions configured</p>
      <p class="text-xs text-gray-400">{{ actionName }} button will always be visible</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  availableFields: {
    type: Array,
    default: () => []
  },
  operator: {
    type: String,
    default: 'and'
  },
  actionName: {
    type: String,
    default: 'Action'
  }
})

const emit = defineEmits(['update:modelValue', 'update:operator'])

// Local conditions
const conditions = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
})

// Field options from available fields
const fieldOptions = computed(() => {
  return (props.availableFields || []).map(field => ({
    label: field.label || field.name,
    value: field.name
  }))
})

// Operator options
const operatorOptions = [
  { label: 'equals', value: 'equals' },
  { label: 'does not equal', value: 'not_equals' },
  { label: 'contains', value: 'contains' },
  { label: 'does not contain', value: 'not_contains' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' },
  { label: 'is greater than', value: 'greater_than' },
  { label: 'is less than', value: 'less_than' },
  { label: 'is greater than or equal to', value: 'greater_than_or_equal' },
  { label: 'is less than or equal to', value: 'less_than_or_equal' }
]

// Get input type based on operator
const getValueInputType = (operator) => {
  if (operator === 'is_empty' || operator === 'is_not_empty') {
    return 'text'
  }
  if (operator === 'greater_than' || operator === 'less_than' || 
      operator === 'greater_than_or_equal' || operator === 'less_than_or_equal') {
    return 'number'
  }
  return 'text'
}

// Get placeholder based on operator
const getValuePlaceholder = (operator) => {
  if (operator === 'is_empty' || operator === 'is_not_empty') {
    return 'No value needed'
  }
  if (operator === 'greater_than' || operator === 'less_than' ||
      operator === 'greater_than_or_equal' || operator === 'less_than_or_equal') {
    return 'Enter number...'
  }
  return 'Enter value...'
}

// Add new condition
const addCondition = () => {
  const newConditions = [...conditions.value]
  newConditions.push({
    field: '',
    operator: 'equals',
    value: ''
  })
  conditions.value = newConditions
}

// Remove condition
const removeCondition = (index) => {
  const newConditions = [...conditions.value]
  newConditions.splice(index, 1)
  conditions.value = newConditions
}
</script>

<style scoped>
.field-wrapper-compact :deep(.formkit-wrapper) {
  margin-bottom: 0;
}

.field-wrapper-compact :deep(.formkit-label) {
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.field-wrapper-compact :deep(.formkit-input) {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
}

.condition-row {
  transition: all 0.2s ease;
}

.condition-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>