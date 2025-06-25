import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    // User data
    username: null,
    roles: null,
    isAuth: false,
    
    // Token management
    token: null,
    tokenExpiry: null,
    refreshToken: null
  }),
  
  persist: {
    storage: persistedState.localStorage,
    paths: ['username', 'roles', 'isAuth', 'token', 'tokenExpiry', 'refreshToken']
  },
  
  getters: {
    /**
     * Check if user is authenticated and token is valid
     */
    isAuthenticated: (state) => {
      if (!state.isAuth || !state.token) return false;
      
      // Check token expiry
      if (state.tokenExpiry) {
        const now = Date.now();
        const expiry = new Date(state.tokenExpiry).getTime();
        return now < expiry;
      }
      
      return true;
    },
    
    /**
     * Get user display name
     */
    displayName: (state) => {
      return state.username || 'User';
    },
    
    /**
     * Check if user has specific role
     */
    hasRole: (state) => {
      return (role) => {
        if (!state.roles || !Array.isArray(state.roles)) return false;
        return state.roles.includes(role);
      };
    },
    
    /**
     * Check if user is admin
     */
    isAdmin: (state) => {
      if (!state.roles || !Array.isArray(state.roles)) return false;
      return state.roles.includes('Admin');
    },
    
    /**
     * Time until token expires (in milliseconds)
     */
    timeUntilExpiry: (state) => {
      if (!state.tokenExpiry) return 0;
      
      const now = Date.now();
      const expiry = new Date(state.tokenExpiry).getTime();
      return Math.max(0, expiry - now);
    }
  },
  
  actions: {
    /**
     * Set user authentication data
     */
    setAuth(userData) {
      this.username = userData.username;
      this.roles = userData.roles || [];
      this.token = userData.token;
      this.refreshToken = userData.refreshToken;
      
      // Set token expiry (default 24 hours if not provided)
      if (userData.tokenExpiry) {
        this.tokenExpiry = userData.tokenExpiry;
      } else {
        const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        this.tokenExpiry = expiryTime.toISOString();
      }
      
      this.isAuth = true;
      
      console.log('User authenticated:', this.username);
    },
    
    /**
     * Clear authentication data
     */
    clearAuth() {
      this.username = null;
      this.roles = null;
      this.isAuth = false;
      this.token = null;
      this.tokenExpiry = null;
      this.refreshToken = null;
      
      console.log('User authentication cleared');
    },
    
    /**
     * Update user data only (keep token)
     */
    setUserData(username, roles) {
      this.username = username;
      this.roles = roles || [];
    },
    
    /**
     * Update token data only
     */
    setToken(token, refreshToken = null, expiryTime = null) {
      this.token = token;
      this.refreshToken = refreshToken;
      
      if (expiryTime) {
        this.tokenExpiry = expiryTime;
      } else {
        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        this.tokenExpiry = expiry.toISOString();
      }
    },
    
    /**
     * Check and validate current authentication
     */
    validateAuth() {
      if (!this.isAuthenticated) {
        this.clearAuth();
        return false;
      }
      return true;
    },
    
    // Legacy methods for backward compatibility
    setUsername(username) {
      this.username = username;
    },
    
    setRoles(roles) {
      this.roles = roles;
    },
    
    setIsAuthenticated(isAuth) {
      this.isAuth = isAuth;
      if (!isAuth) {
        this.clearAuth();
      }
    }
  }
});
