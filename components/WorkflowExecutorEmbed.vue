<template>
  <div class="relative w-full">
    <iframe
      :src="finalUrl"
      class="w-full rounded-md border border-gray-200 bg-white"
      :style="{ height }"
      frameborder="0"
      allow="clipboard-read; clipboard-write;"
    />
  </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";

const props = defineProps({
  // Required workflow/process identifier
  processId: { type: [String, Number], required: true },

  // Frame height (CSS value)
  height: { type: String, default: "calc(100vh - 120px)" },

  // Forces the page into its embedded/iframe-friendly mode
  debug: { type: [Boolean, String, Number], default: "false" },

  // Whether to hide the completion screen
  hideComplete: { type: [Boolean, String, Number], default: "true" },

  // Additional query parameters to forward to the page
  extraQuery: { type: Object, default: () => ({}) },

  // Base path to the workflow page within this app
  basePath: { type: String, default: "/workflow" },
});

function toBoolString(val, fallback = "false") {
  if (val === true || val === "true" || val === 1 || val === "1") return "true";
  if (val === false || val === "false" || val === 0 || val === "0")
    return "false";
  return String(fallback);
}

const finalUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("debug", toBoolString(props.debug, "false"));
  params.set("hideComplete", toBoolString(props.hideComplete, "true"));

  for (const [k, v] of Object.entries(props.extraQuery || {})) {
    if (v !== undefined && v !== null) {
      params.set(k, String(v));
    }
  }

  return `https://bp.corrad.ai${props.basePath}/${
    props.processId
  }?${params.toString()}`;
});

// Log whenever the URL changes (and immediately on mount)
watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log("[WorkflowExecutorEmbed] Final URL:", finalUrl.value);
});

const height = computed(() => props.height);
</script>

<style scoped>
/* No additional styles required; inherits Tailwind classes */
</style>
