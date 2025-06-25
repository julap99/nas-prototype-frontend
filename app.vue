<script setup>
const { siteSettings, loadSiteSettings } = useSiteSettings();

// Use site settings for global meta
useHead({
  title: () => 'New Agihan Sistem | LZS',
  meta: [
    { name: 'description', content: () => 'New Agihan Sistem | LZS' },
    { property: 'og:title', content: () => 'New Agihan Sistem | LZS' },
    { property: 'og:description', content: () => 'New Agihan Sistem | LZS' },
    { name: 'twitter:title', content: () => 'New Agihan Sistem | LZS' },
    { name: 'twitter:description', content: () => 'New Agihan Sistem | LZS' },
  ],
  link: [
    { rel: 'icon', href: () => siteSettings?.value?.siteFavicon || '/favicon.ico' },
    { rel: 'apple-touch-icon', href: () => siteSettings?.value?.siteFavicon || '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: "en",
  },
});

const nuxtApp = useNuxtApp();
const loading = ref(true);

onMounted(async () => {
  // Load site settings first
  await loadSiteSettings();
  
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Get theme from localStorage or site settings
  let theme = localStorage.getItem("theme") || siteSettings?.value?.selectedTheme || "biasa";
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage :key="$route.fullPath" v-else />
    </NuxtLayout>
  </div>
</template>
