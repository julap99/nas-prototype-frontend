import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    // User data
    username: null,
    fullName: null,
    roles: null, // Keep as array for backward compatibility
    role: null, // Single role for easier access
    isAuth: false,
    
    // Token management
    token: null,
    tokenExpiry: null,
    refreshToken: null
  }),
  
  persist: {
    storage: persistedState.localStorage,
    paths: ['username', 'fullName', 'roles', 'role', 'isAuth', 'token', 'tokenExpiry', 'refreshToken']
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
      return state.fullName || state.username || 'User';
    },
    
    /**
     * Check if user has specific role
     */
    hasRole: (state) => {
      return (role) => {
        // Check single role first
        if (state.role === role) return true;
        
        // Fallback to roles array for backward compatibility
        if (!state.roles || !Array.isArray(state.roles)) return false;
        return state.roles.includes(role);
      };
    },
    
    /**
     * Check if user is admin (superadmin)
     */
    isAdmin: (state) => {
      return state.role === 'superadmin' || (state.roles && state.roles.includes('superadmin'));
    },
    
    /**
     * Get user's primary role
     */
    primaryRole: (state) => {
      return state.role || (state.roles && state.roles.length > 0 ? state.roles[0] : null);
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
      this.fullName = userData.fullName;
      this.roles = userData.roles || [];
      this.role = userData.role || (userData.roles && userData.roles.length > 0 ? userData.roles[0] : null);
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
      
      console.log('User authenticated:', this.username, 'Role:', this.role);
    },
    
    /**
     * Clear authentication data
     */
    clearAuth() {
      this.username = null;
      this.fullName = null;
      this.roles = null;
      this.role = null;
      this.isAuth = false;
      this.token = null;
      this.tokenExpiry = null;
      this.refreshToken = null;
      
      console.log('User authentication cleared');
    },
    
    /**
     * Update user data only (keep token)
     */
    setUserData(username, fullName, roles, role = null) {
      this.username = username;
      this.fullName = fullName;
      this.roles = roles || [];
      this.role = role || (roles && roles.length > 0 ? roles[0] : null);
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
      this.role = roles && roles.length > 0 ? roles[0] : null;
    },
    
    setIsAuthenticated(isAuth) {
      this.isAuth = isAuth;
      if (!isAuth) {
        this.clearAuth();
      }
    }
  }
});
