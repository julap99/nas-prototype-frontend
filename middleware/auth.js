import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("Auth middleware - checking authentication");

  if (process.client) {
    // Get the user store
    const userStore = useUserStore();

    // Check if user is authenticated using Pinia getter
    if (!userStore.isAuthenticated) {
      console.log("User not authenticated, redirecting to login");

      // Show session expired message
      const { $swal } = useNuxtApp();
      $swal
        .fire({
          title: "Session Expired",
          text: "Your session has expired. Please login again.",
          icon: "warning",
          confirmButtonText: "OK",
        })
        .then(() => {
          return navigateTo("/login");
        });

      return;
    }

    console.log("User is authenticated:", userStore.username);
    return true;
  }
});
