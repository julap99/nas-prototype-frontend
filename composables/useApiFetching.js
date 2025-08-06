import { useUserStore } from "@/stores/user";

const getApiBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl || "http://localhost:3001";
};

/**
 * Get authentication headers
 */
const getAuthHeaders = () => {
  try {
    const userStore = useUserStore();
    const accessToken = userStore?.accessToken;
    const refreshToken = userStore?.refreshToken;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      headers.RefreshToken = `Bearer ${refreshToken}`;
    }

    return headers;
  } catch (error) {
    console.error("Error getting auth headers:", error);
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
};

/**
 * Handle API errors
 */
const handleError = (error) => {
  console.error("API Error:", error);

  const status = error.status || error.statusCode;
  const message = error.message || error.data?.message || "Unknown error";

  switch (status) {
    case 401:
      // Token expired or invalid - redirect to login
      try {
        const userStore = useUserStore();
        userStore.clearAuth();
        if (process.client) {
          navigateTo("/login");
        }
      } catch (authError) {
        console.error("Error clearing auth:", authError);
      }
      throw new Error("Authentication required");
    case 403:
      throw new Error("Access forbidden - insufficient permissions");
    case 404:
      throw new Error("Resource not found");
    case 422:
      throw new Error(message || "Validation error");
    case 500:
      throw new Error("Server error - please try again later");
    default:
      throw new Error(message || `HTTP ${status} error`);
  }
};

/**
 * Make API request with error handling
 */
const apiRequest = async (
  endpoint,
  options = {
    method: "GET" || "POST" || "PUT" || "DELETE" || "PATCH",
    body: {},
    query: {},
    headers: {},
    requireAuth: true,
  }
) => {
  const {
    method = "GET",
    body,
    query,
    headers = {},
    requireAuth = true,
  } = options;

  const url = `${getApiBaseUrl()}${endpoint}`;

  const requestHeaders = {
    ...(requireAuth
      ? getAuthHeaders()
      : { "Content-Type": "application/json" }),
    ...headers,
  };

  try {
    const response = await $fetch(url, {
      method,
      headers: requestHeaders,
      body,
      query,
    });

    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Default export
export default {
  apiRequest,
};

// Composable for easy usage
export const useApiFetching = () => apiRequest;
