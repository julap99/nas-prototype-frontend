<template>
  <WorkflowExecutor
    v-if="processId"
    :process-id="processId"
    :debug="false"
    :hide-complete="true"
    :show-header="false"
    :initial-variables="initialVariables"
  />
  <div v-else class="p-8 text-center">
    <p class="text-gray-500">Process ID not provided. Please add ?pid=your_process_id to the URL.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import WorkflowExecutor from "~/components/WorkflowExecutor.vue";

definePageMeta({
  title: "Organisasi",
  description: "Organisasi",
  layout: "default",
});

const route = useRoute();
const processId = computed(() => route.query.pid);

// You can pass initial variables if needed
const initialVariables = computed(() => {
  const vars = {};
  
  // Extract any other query parameters as initial variables
  Object.entries(route.query).forEach(([key, value]) => {
    if (key !== 'pid') {
      vars[key] = value;
    }
  });
  
  return vars;
});
</script>

<style scoped>
/* Full-bleed iframe; page provides no extra chrome */
</style>
