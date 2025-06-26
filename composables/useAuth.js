/**
 * Simplified Authentication composable using the new centralized API client
 * Uses real backend endpoints with proper error handling
 */
import { useUserStore } from "@/stores/user";
import { authApi } from "@/composables/api-fetching";

export const useAuth = () => {
  const { $swal } = useNuxtApp();
  const userStore = useUserStore();

  /**
   * Login with credentials
   */
  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);

      if (response.user && response.accessToken) {
        // Use Pinia store's setAuth method
        userStore.setAuth({
          username: response.user.email,
          fullName: response.user.fullName,
          role: response.user.role,
          roles: [response.user.role], // Keep array format for compatibility
          token: response.accessToken,
          refreshToken: response.refreshToken,
        });

        return {
          success: true,
          message: "Login successful",
          user: {
            username: response.user.email,
            fullName: response.user.fullName,
            role: response.user.role,
            roles: [response.user.role],
          },
        };
      } else {
        return {
          success: false,
          message: "Login failed - invalid response format",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    }
  };

  /**
   * Logout and clear authentication data
   */
  const logout = async (showMessage = true) => {
    try {
      // Call logout API with refresh token
      if (userStore.refreshToken) {
        await authApi.logout(userStore.refreshToken);
      }
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
  const initializeAuth = async () => {
    // Check if user has a token
    if (!userStore.token) {
      console.log("No token found");
      return false;
    }

    try {
      // Validate token with backend
      const response = await authApi.validateToken();
      
      if (response.valid && response.user) {
        // Update user data from server
        userStore.setUserData(
          response.user.email,
          response.user.fullName,
          [response.user.role],
          response.user.role
        );
        
        console.log("Authentication valid for user:", response.user.email);
        return true;
      } else {
        console.log("Token validation failed");
        userStore.clearAuth();
        return false;
      }
    } catch (error) {
      console.error("Token validation error:", error);
      userStore.clearAuth();
      return false;
    }
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
      fullName: userStore.fullName,
      roles: userStore.roles,
      role: userStore.role,
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

  /**
   * Refresh authentication token
   */
  const refreshAuthToken = async () => {
    try {
      if (!userStore.refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await authApi.refreshToken(userStore.refreshToken);
      
      userStore.setToken(
        response.accessToken,
        response.refreshToken
      );

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      forceLogout("Session expired");
      return false;
    }
  };

  return {
    // Authentication methods
    login,
    logout,
    forceLogout,
    initializeAuth,
    refreshAuthToken,

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
