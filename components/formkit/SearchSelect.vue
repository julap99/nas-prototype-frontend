<template>
  <div class="formkit-search-select">
    <VueSelect
      :value="_value"
      @input="handleChange"
      :options="context.options || []"
      :placeholder="context.placeholder || 'Search and select an option'"
      :disabled="context.disabled || context.readonly"
      :searchable="!context.readonly"
      :clearable="false"
      label="label"
      :reduce="option => option.value"
      :class="[
        'vue-select-wrapper',
        { 'vue-select-disabled': context.disabled || context.readonly }
      ]"
    />
    
    <!-- Hidden native select for FormKit value handling -->
    <select 
      :value="_value"
      :name="context.node.name"
      :id="context.id"
      :disabled="context.disabled || context.readonly"
      :required="context.attrs.required"
      class="hidden-select"
      tabindex="-1"
    >
      <option v-if="context.placeholder" value="" disabled>{{ context.placeholder }}</option>
      <option 
        v-for="option in context.options" 
        :key="option.value" 
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import '~/assets/style/css/form/searchSelect.css'

const props = defineProps({
  context: {
    type: Object,
    required: true
  }
})

// Computed value that syncs with FormKit
const _value = computed({
  get: () => props.context.node._value,
  set: (value) => props.context.node.input(value)
})

// Handle value changes from vue3-select-component
const handleChange = (value) => {
  // Don't allow changes if readonly
  if (props.context.readonly) {
    return
  }
  props.context.node.input(value)
}
</script>

<style scoped>
.formkit-search-select {
  position: relative;
  width: 100%;
}

.hidden-select {
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

/* Readonly styles for SearchSelect */
.vue-select-disabled {
  opacity: 0.8;
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.vue-select-disabled .vs__dropdown-toggle {
  background-color: #f3f4f6 !important;
  cursor: not-allowed !important;
}

.vue-select-disabled .vs__actions {
  pointer-events: none !important;
}
</style>