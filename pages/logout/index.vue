<script setup>
definePageMeta({
  title: "Logout",
  layout: "empty",
});

const { logout } = useAuth();

// Perform logout with message display
await logout(true);

// Navigate to login after a brief delay to show the logout message
if (process.client) {
  setTimeout(() => {
    navigateTo("/login");
  }, 2000);
}
</script>

<template>
  <div>
    <!-- <h1>Logout</h1> -->
  </div>
</template>
