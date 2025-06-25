import pkg from "maska";
const { maska } = pkg;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maska', maska);
});
