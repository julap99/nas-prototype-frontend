import { useUserStore } from '@/stores/user'

// API Response Types
interface LoginResponse {
  user: {
    id: number
    email: string
    fullName: string
    role: string
    isActive: boolean
  }
  accessToken: string
  refreshToken: string
}

interface UserProfile {
  id: number
  email: string
  fullName: string
  role: 'superadmin' | 'ekp' | 'pkp' | 'eoad' | 'asnaf'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// API Configuration
const API_BASE_URL = process.env.NUXT_API_BASE_URL || 'http://localhost:3001'

/**
 * Get authentication headers
 */
const getAuthHeaders = () => {
  const userStore = useUserStore()
  const token = userStore.token
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

/**
 * Handle API errors
 */
const handleError = (error: any) => {
  console.error('API Error:', error)
  
  const status = error.status || error.statusCode
  const message = error.message || error.data?.message || 'Unknown error'

  switch (status) {
    case 401:
      // Token expired or invalid - redirect to login
      const userStore = useUserStore()
      userStore.clearAuth()
      if (process.client) {
        navigateTo('/login')
      }
      throw new Error('Authentication required')
    case 403:
      throw new Error('Access forbidden - insufficient permissions')
    case 404:
      throw new Error('Resource not found')
    case 422:
      throw new Error(message || 'Validation error')
    case 500:
      throw new Error('Server error - please try again later')
    default:
      throw new Error(message || `HTTP ${status} error`)
  }
}

/**
 * Make API request with error handling
 */
const apiRequest = async <T = any>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: Record<string, string>
    requireAuth?: boolean
  } = {}
): Promise<T> => {
  const {
    method = 'GET',
    body,
    query,
    headers = {},
    requireAuth = true
  } = options

  const url = `${API_BASE_URL}${endpoint}`
  
  const requestHeaders = {
    ...(requireAuth ? getAuthHeaders() : { 'Content-Type': 'application/json' }),
    ...headers,
  }

  try {
    const response = await $fetch<T>(url, {
      method,
      headers: requestHeaders,
      body,
      query,
    })

    return response
  } catch (error) {
    handleError(error)
    throw error
  }
}

// ======================
// AUTHENTICATION APIs
// ======================

export const authApi = {
  /**
   * User login
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
      requireAuth: false
    })
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
      requireAuth: false
    })
  },

  /**
   * User logout
   */
  logout: async (refreshToken: string): Promise<{ message: string }> => {
    return apiRequest('/auth/logout', {
      method: 'POST',
      body: { refreshToken }
    })
  },

  /**
   * Logout from all devices
   */
  logoutAll: async (): Promise<{ message: string }> => {
    return apiRequest('/auth/logout-all', {
      method: 'POST'
    })
  },

  /**
   * Validate token
   */
  validateToken: async (): Promise<{ valid: boolean; user: UserProfile }> => {
    return apiRequest('/auth/validate')
  }
}

// ======================
// USER MANAGEMENT APIs
// ======================

export const userApi = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<UserProfile> => {
    return apiRequest<UserProfile>('/users/profile')
  },

  /**
   * Get all users (admin only)
   */
  getAllUsers: async (): Promise<UserProfile[]> => {
    return apiRequest<UserProfile[]>('/users')
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: number): Promise<UserProfile> => {
    return apiRequest<UserProfile>(`/users/${id}`)
  },

  /**
   * Create new user
   */
  createUser: async (userData: {
    email: string
    password: string
    fullName: string
    role?: 'superadmin' | 'ekp' | 'pkp' | 'eoad' | 'asnaf'
  }): Promise<UserProfile> => {
    return apiRequest<UserProfile>('/users', {
      method: 'POST',
      body: userData
    })
  },

  /**
   * Update user
   */
  updateUser: async (id: number, userData: Partial<{
    email: string
    fullName: string
    role: 'superadmin' | 'ekp' | 'pkp' | 'eoad' | 'asnaf'
    password: string
  }>): Promise<UserProfile> => {
    return apiRequest<UserProfile>(`/users/${id}`, {
      method: 'PUT',
      body: userData
    })
  },

  /**
   * Delete user (soft delete)
   */
  deleteUser: async (id: number): Promise<{ message: string }> => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE'
    })
  }
}

// ======================
// ROLE-SPECIFIC APIs
// ======================

export const ekpApi = {
  getApplications: (): Promise<any[]> => apiRequest('/ekp/applications'),
  getApplication: (id: number): Promise<any> => apiRequest(`/ekp/applications/${id}`),
  createApplication: (data: any): Promise<any> => apiRequest('/ekp/applications', { method: 'POST', body: data }),
  updateApplication: (id: number, data: any): Promise<any> => apiRequest(`/ekp/applications/${id}`, { method: 'PUT', body: data }),
  deleteApplication: (id: number): Promise<any> => apiRequest(`/ekp/applications/${id}`, { method: 'DELETE' }),
  getDocuments: (): Promise<any[]> => apiRequest('/ekp/documents'),
  getReports: (): Promise<any[]> => apiRequest('/ekp/reports'),
}

export const pkpApi = {
  getApplications: (): Promise<any[]> => apiRequest('/pkp/applications'),
  getApplication: (id: number): Promise<any> => apiRequest(`/pkp/applications/${id}`),
  createApplication: (data: any): Promise<any> => apiRequest('/pkp/applications', { method: 'POST', body: data }),
  updateApplication: (id: number, data: any): Promise<any> => apiRequest(`/pkp/applications/${id}`, { method: 'PUT', body: data }),
  deleteApplication: (id: number): Promise<any> => apiRequest(`/pkp/applications/${id}`, { method: 'DELETE' }),
  getDocuments: (): Promise<any[]> => apiRequest('/pkp/documents'),
  getReports: (): Promise<any[]> => apiRequest('/pkp/reports'),
}

export const eoadApi = {
  getApplications: (): Promise<any[]> => apiRequest('/eoad/applications'),
  getApplication: (id: number): Promise<any> => apiRequest(`/eoad/applications/${id}`),
  createApplication: (data: any): Promise<any> => apiRequest('/eoad/applications', { method: 'POST', body: data }),
  updateApplication: (id: number, data: any): Promise<any> => apiRequest(`/eoad/applications/${id}`, { method: 'PUT', body: data }),
  deleteApplication: (id: number): Promise<any> => apiRequest(`/eoad/applications/${id}`, { method: 'DELETE' }),
  getDocuments: (): Promise<any[]> => apiRequest('/eoad/documents'),
  getReports: (): Promise<any[]> => apiRequest('/eoad/reports'),
}

export const asnafApi = {
  getMyApplications: (): Promise<any[]> => apiRequest('/asnaf/applications'),
  getApplication: (id: number): Promise<any> => apiRequest(`/asnaf/applications/${id}`),
  submitApplication: (data: any): Promise<any> => apiRequest('/asnaf/applications', { method: 'POST', body: data }),
  updateApplication: (id: number, data: any): Promise<any> => apiRequest(`/asnaf/applications/${id}`, { method: 'PUT', body: data }),
  getMyDocuments: (): Promise<any[]> => apiRequest('/asnaf/documents'),
  getApplicationStatus: (id: number): Promise<any> => apiRequest(`/asnaf/applications/${id}/status`),
}

// ======================
// ADMIN APIs
// ======================

export const adminApi = {
  /**
   * System settings
   */
  getSystemSettings: (): Promise<any> => apiRequest('/admin/settings'),
  updateSystemSettings: (settings: any): Promise<any> => apiRequest('/admin/settings', { method: 'PUT', body: settings }),
  
  /**
   * Audit logs
   */
  getAuditLogs: (query?: { page?: number; limit?: number; startDate?: string; endDate?: string }): Promise<any> => 
    apiRequest('/admin/logs', { query }),
  
  /**
   * System reports
   */
  getSystemReports: (): Promise<any[]> => apiRequest('/admin/reports/system'),
  getUserActivity: (query?: { userId?: number; startDate?: string; endDate?: string }): Promise<any[]> => 
    apiRequest('/admin/reports/user-activity', { query }),
}

// ======================
// MAIN API CLIENT
// ======================

export const apiClient = {
  auth: authApi,
  user: userApi,
  ekp: ekpApi,
  pkp: pkpApi,
  eoad: eoadApi,
  asnaf: asnafApi,
  admin: adminApi,
}

// Default export
export default apiClient

// Composable for easy usage
export const useApiClient = () => apiClient 