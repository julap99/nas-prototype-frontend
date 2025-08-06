<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
  sidebarToggle: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div class="vertical-menu">
    <div class="py-2 px-4 bg-[rgb(var(--header))]">
      <nuxt-link to="/">
        <div class="flex flex-auto gap-3 justify-center items-center h-[48px]">
          <div
            class="app-logo text-center h-20 flex justify-center items-center gap-3 px-4"
          >
            <nuxt-link to="/" class="flex items-center justify-center">
              <img
                src="@/assets/img/logo/lzs-logo.png"
                class="logo h-10"
                alt="logo"
                @error="$event.target.src = '/img/logo/lzs-logo.png'"
              />
            </nuxt-link>
          </div>
        </div>
      </nuxt-link>
    </div>
    <NuxtScrollbar
      class="flex flex-col justify-between my-6"
      style="max-height: 82dvh"
    >
      <RSItem :items="menuItem"></RSItem>
    </NuxtScrollbar>
  </div>
</template>
