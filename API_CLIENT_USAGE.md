# API Client Usage Guide

This guide explains how to use the new centralized API client (`api-fetching.ts`) in your frontend application.

## Overview

The API client provides a centralized way to interact with the backend using `$fetch` (Nuxt's built-in fetch). It includes:

- ✅ Automatic authentication header injection
- ✅ Error handling with automatic token refresh
- ✅ TypeScript support
- ✅ Role-based API grouping
- ✅ Proper error messages and status codes

## Basic Usage

### Import the API Client

```typescript
// Import the full client
import apiClient from '@/composables/api-fetching'

// Or import specific API groups
import { authApi, userApi, ekpApi, pkpApi, eoadApi, asnafApi, adminApi } from '@/composables/api-fetching'

// Or use the composable
const api = useApiClient()
```

### Authentication Examples

```typescript
// Login
try {
  const response = await authApi.login('user@example.com', 'password123')
  console.log('Login successful:', response.user)
} catch (error) {
  console.error('Login failed:', error.message)
}

// Logout
await authApi.logout(refreshToken)

// Validate token
const validation = await authApi.validateToken()
console.log('Token valid:', validation.valid)
```

### User Management Examples

```typescript
// Get current user profile
const profile = await userApi.getCurrentUser()

// Get all users (admin only)
const users = await userApi.getAllUsers()

// Create new user
const newUser = await userApi.createUser({
  email: 'newuser@example.com',
  password: 'securepassword',
  fullName: 'New User',
  role: 'asnaf'
})

// Update user
const updatedUser = await userApi.updateUser(userId, {
  fullName: 'Updated Name',
  role: 'ekp'
})
```

### Role-Specific API Examples

#### EKP APIs
```typescript
// Get all EKP applications
const applications = await ekpApi.getApplications()

// Create new application
const newApp = await ekpApi.createApplication({
  title: 'Application Title',
  description: 'Application description',
  // ... other fields
})

// Get EKP reports
const reports = await ekpApi.getReports()
```

#### PKP APIs
```typescript
// Similar to EKP but for PKP operations
const pkpApplications = await pkpApi.getApplications()
const pkpReports = await pkpApi.getReports()
```

#### EOAD APIs
```typescript
// Similar to EKP but for EOAD operations
const eoadApplications = await eoadApi.getApplications()
const eoadReports = await eoadApi.getReports()
```

#### Asnaf APIs
```typescript
// Get my applications (for logged-in asnaf user)
const myApplications = await asnafApi.getMyApplications()

// Submit new application
const newApplication = await asnafApi.submitApplication({
  type: 'education',
  amount: 5000,
  // ... other fields
})

// Check application status
const status = await asnafApi.getApplicationStatus(applicationId)
```

### Admin APIs

```typescript
// Get system settings
const settings = await adminApi.getSystemSettings()

// Update system settings
await adminApi.updateSystemSettings({
  siteName: 'New Site Name',
  // ... other settings
})

// Get audit logs
const logs = await adminApi.getAuditLogs({
  page: 1,
  limit: 50,
  startDate: '2024-01-01',
  endDate: '2024-12-31'
})

// Get user activity reports
const activity = await adminApi.getUserActivity({
  userId: 123,
  startDate: '2024-01-01'
})
```

## Using in Vue Components

### In `<script setup>`

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { userApi, ekpApi } from '@/composables/api-fetching'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const loadUsers = async () => {
  try {
    loading.value = true
    error.value = null
    users.value = await userApi.getAllUsers()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="user in users" :key="user.id">
        {{ user.fullName }} ({{ user.role }})
      </div>
    </div>
  </div>
</template>
```

### In Pages

```vue
<!-- pages/admin/users.vue -->
<script setup>
import { userApi } from '@/composables/api-fetching'

// Automatically handles authentication and role-based access
const { data: users, pending, error } = await useLazyAsyncData('admin-users', () => 
  userApi.getAllUsers()
)
</script>

<template>
  <div>
    <h1>User Management</h1>
    <div v-if="pending">Loading users...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <!-- User list here -->
    </div>
  </div>
</template>
```

## Error Handling

The API client automatically handles common errors:

- **401 Unauthorized**: Automatically clears auth and redirects to login
- **403 Forbidden**: Shows permission error
- **404 Not Found**: Shows resource not found error
- **422 Validation Error**: Shows validation message
- **500 Server Error**: Shows server error message

```typescript
try {
  const data = await userApi.getCurrentUser()
} catch (error) {
  // Error is already handled by the API client
  // You can still handle specific cases if needed
  if (error.message.includes('Authentication required')) {
    // User will be redirected to login automatically
  }
}
```

## Configuration

The API client uses these environment variables:

- `NUXT_API_BASE_URL`: Backend API base URL (default: `http://localhost:3001`)

Set these in your `.env` file:

```env
NUXT_API_BASE_URL=http://localhost:3001
```

## Best Practices

1. **Always use try-catch** when calling API methods
2. **Use loading states** to improve UX
3. **Handle errors gracefully** with user-friendly messages
4. **Use the role-specific APIs** for better organization
5. **Leverage Nuxt's data fetching** (`useLazyAsyncData`, `$fetch`) when possible

## Migration from Mock API

If you were using the old mock API system, replace:

```typescript
// Old way
const { auth } = useApi()
const response = await auth.login(username, password)

// New way
import { authApi } from '@/composables/api-fetching'
const response = await authApi.login(email, password)
```

## TypeScript Support

All API methods are fully typed. Your IDE will provide autocomplete and type checking:

```typescript
// TypeScript will know the return type
const user: UserProfile = await userApi.getCurrentUser()

// TypeScript will validate the input
await userApi.createUser({
  email: 'test@example.com', // ✅ Valid
  password: 'password123',   // ✅ Valid
  fullName: 'Test User',     // ✅ Valid
  role: 'invalid-role'       // ❌ TypeScript error
})
```

This centralized API client provides a clean, type-safe, and maintainable way to interact with your backend services. 