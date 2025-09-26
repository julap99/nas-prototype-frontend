<template>
  <WorkflowExecutorEmbed
    :process-id="processId"
    :debug="false"
    :hide-complete="true"
    height="calc(100vh - 0px)"
  />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import WorkflowExecutorEmbed from "~/components/WorkflowExecutorEmbed.vue";

definePageMeta({
  title: "Workflow Embed",
  description: "Embed view for workflow execution",
  layout: "default",
});

const route = useRoute();
const processId = computed(() => route.query.pid);
</script>

<style scoped>
/* Full-bleed iframe; page provides no extra chrome */
</style>
