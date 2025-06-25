import VueFullscreen from "vue-fullscreen";

export default defineNuxtPlugin((nuxtApp) => {
  // Check if VueFullscreen is a proper plugin
  if (VueFullscreen && typeof VueFullscreen.install === 'function') {
    nuxtApp.vueApp.use(VueFullscreen);
  } else if (VueFullscreen) {
    // Handle if it's not a proper Vue 3 plugin
    console.warn('VueFullscreen may not be compatible with Vue 3');
  }
});
