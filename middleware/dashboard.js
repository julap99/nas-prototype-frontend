import { useUserStore } from "@/stores/user";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    // Get the user store
    const userStore = useUserStore();
    
    // If user is authenticated, redirect to dashboard
    if (userStore.isAuthenticated) {
      return navigateTo("/dashboard");
    }
    
    // If not authenticated, allow access to login page
    return true;
  }
});
