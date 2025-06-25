import VueCodeHighlight from "vue-code-highlight";

import "vue-code-highlight/themes/prism-okaidia.css";
import "vue-code-highlight/themes/window.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Check if VueCodeHighlight is a proper plugin or component
  if (VueCodeHighlight && typeof VueCodeHighlight.install === 'function') {
    nuxtApp.vueApp.use(VueCodeHighlight);
  } else if (VueCodeHighlight) {
    // If it's a component, register it as a global component
    nuxtApp.vueApp.component('VueCodeHighlight', VueCodeHighlight);
  }
});
