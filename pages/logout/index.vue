<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Logout",
  layout: "empty",
});

const userStore = useUserStore();
const { auth } = useApi();

await auth.logout();

if (process.client) {
  userStore.setUsername("");
  userStore.setRoles([]);
  userStore.setIsAuthenticated(false);

  navigateTo("/login");
}
</script>

<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>
