import { mockApiResponses, mockAuthResponse } from '~/mock-data/index.js';

/**
 * API Composable for Frontend-Backend Communication
 * Currently uses mock data, but designed for easy migration to external NestJS backend
 */
export const useApi = () => {
  // Configuration - Change this when connecting to external backend
  const USE_MOCK_DATA = true; // Set to false when connecting to real backend
  
  const getExternalApiBaseUrl = () => {
    const runtimeConfig = useRuntimeConfig();
    return runtimeConfig.public.apiBaseUrl || 'http://localhost:3001';
  };
  
  /**
   * Simulate API delay for realistic mock behavior
   */
  const simulateDelay = (ms = 300) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * Mock API call handler
   */
  const mockApiCall = async (endpoint, options = {}) => {
    await simulateDelay();
    
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : null;
    
    // Handle authentication specifically
    if (endpoint === '/api/auth/login' && method === 'POST') {
      // Simple mock authentication - accept admin/admin
      if (body && body.username === 'admin' && body.password === 'admin') {
        return { data: mockAuthResponse.success };
      } else {
        return { data: mockAuthResponse.error };
      }
    }
    
    // Handle other endpoints
    if (mockApiResponses[endpoint]) {
      return { data: mockApiResponses[endpoint] };
    }
    
    // Default response for unknown endpoints
    return {
      data: {
        statusCode: 404,
        message: `Mock endpoint ${endpoint} not found`
      }
    };
  };

  /**
   * Real API call handler (for future use)
   */
  const realApiCall = async (endpoint, options = {}) => {
    const url = `${getExternalApiBaseUrl()}${endpoint.replace('/api', '')}`;
    
    return await $fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  };

  /**
   * Main API call function
   * Switches between mock and real API based on configuration
   */
  const apiCall = async (endpoint, options = {}) => {
    try {
      if (USE_MOCK_DATA) {
        return await mockApiCall(endpoint, options);
      } else {
        return await realApiCall(endpoint, options);
      }
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  /**
   * Authentication API calls
   */
  const auth = {
    login: async (username, password) => {
      return await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },
    
    logout: async () => {
      return await apiCall('/api/auth/logout', {
        method: 'GET'
      });
    },
    
    validate: async () => {
      return await apiCall('/api/auth/validate', {
        method: 'GET'
      });
    },
    
    validateToken: async (token) => {
      // For mock implementation, just check if token exists and is our mock token
      if (USE_MOCK_DATA) {
        await simulateDelay(100);
        if (token === 'mock-jwt-token') {
          return { 
            data: { 
              statusCode: 200, 
              valid: true,
              user: {
                username: "admin",
                roles: ["Admin"]
              }
            } 
          };
        } else {
          return { 
            data: { 
              statusCode: 401, 
              valid: false,
              message: "Invalid token"
            } 
          };
        }
      } else {
        // For real backend, validate token with server
        return await apiCall('/api/auth/validate-token', {
          method: 'POST',
          body: JSON.stringify({ token })
        });
      }
    }
  };

  /**
   * Configuration API calls
   */
  const config = {
    getLoadingLogo: async () => {
      return await apiCall('/api/devtool/config/loading-logo');
    },
    
    getSiteSettings: async () => {
      return await apiCall('/api/devtool/config/site-settings');
    }
  };

  /**
   * Menu/User Management API calls
   */
  const menu = {
    getUserList: async () => {
      return await apiCall('/api/devtool/menu/user-list');
    },
    
    getRoleList: async () => {
      return await apiCall('/api/devtool/menu/role-list');
    }
  };

  return {
    // Core API function
    apiCall,
    
    // Grouped API calls
    auth,
    config,
    menu,
    
    // Configuration flags
    USE_MOCK_DATA,
    getExternalApiBaseUrl
  };
}; 