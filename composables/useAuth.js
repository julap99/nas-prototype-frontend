/**
 * Simplified Authentication composable using Pinia store
 * Pinia persistence plugin handles localStorage automatically
 */
import { useUserStore } from "@/stores/user";

export const useAuth = () => {
  const { $swal } = useNuxtApp();
  const userStore = useUserStore();

  /**
   * Login with credentials
   */
  const login = async (username, password) => {
    try {
      const { auth } = useApi();
      const res = await auth.login(username, password);
      const data = res.data;

      if (data.statusCode === 200) {
        // Use Pinia store's setAuth method
        userStore.setAuth({
          username: data.data.username,
          roles: data.data.roles,
          token: data.data.token,
          refreshToken: data.data.refreshToken,
        });

        return {
          success: true,
          message: "Login successful",
          user: {
            username: data.data.username,
            roles: data.data.roles,
          },
        };
      } else {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  };

  /**
   * Logout and clear authentication data
   */
  const logout = async (showMessage = true) => {
    try {
      // Call logout API
      const { auth } = useApi();
      await auth.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    }

    // Clear Pinia store (persistence plugin will handle localStorage)
    userStore.clearAuth();

    if (showMessage && process.client) {
      $swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  /**
   * Force logout due to expired token
   */
  const forceLogout = (reason = "Session expired") => {
    userStore.clearAuth();

    if (process.client) {
      $swal
        .fire({
          title: "Session Expired",
          text: reason,
          icon: "warning",
          confirmButtonText: "OK",
        })
        .then(() => {
          window.location.replace("/login");
        });
    }
  };

  /**
   * Initialize authentication - validates current state
   */
  const initializeAuth = () => {
    // Validate authentication state using Pinia getter
    const isValid = userStore.validateAuth();

    if (!isValid) {
      console.log("Authentication invalid or expired");
      return false;
    }

    console.log("Authentication valid for user:", userStore.username);
    return true;
  };

  /**
   * Check if user is authenticated (uses Pinia getter)
   */
  const isAuthenticated = () => {
    return userStore.isAuthenticated;
  };

  /**
   * Get current user data
   */
  const getCurrentUser = () => {
    return {
      username: userStore.username,
      roles: userStore.roles,
      displayName: userStore.displayName,
      isAdmin: userStore.isAdmin,
    };
  };

  /**
   * Get authentication token
   */
  const getToken = () => {
    return userStore.token;
  };

  /**
   * Check if token is valid (uses Pinia getter)
   */
  const isTokenValid = () => {
    return userStore.isAuthenticated;
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role) => {
    return userStore.hasRole(role);
  };

  /**
   * Get time until token expires
   */
  const getTimeUntilExpiry = () => {
    return userStore.timeUntilExpiry;
  };

  return {
    // Authentication methods
    login,
    logout,
    forceLogout,
    initializeAuth,

    // State checks
    isAuthenticated,
    isTokenValid,
    hasRole,

    // User data
    getCurrentUser,
    getToken,
    getTimeUntilExpiry,

    // Direct store access (for advanced usage)
    userStore,
  };
};
