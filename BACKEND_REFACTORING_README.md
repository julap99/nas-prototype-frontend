# 🔧 Backend Refactoring Documentation

## Overview

This project has been successfully refactored to remove the internal backend and prepare for integration with an external NestJS backend. All API calls now use mock data while maintaining the same interface for easy future migration.

## ✅ What Was Done

### 1. **Removed Internal Backend**
- ❌ Deleted `server/` folder entirely
- ❌ Removed `prisma/` folder and all Prisma configurations
- ❌ Removed `database/` folder
- ❌ Cleaned up server-related configuration files

### 2. **Updated Dependencies**
- ❌ Removed `@prisma/client` and `prisma` packages
- ❌ Removed `prisma` script from package.json
- ✅ Kept all frontend dependencies intact

### 3. **Created Mock Data System**
- ✅ `mock-data/index.js` - Centralized mock data for all API endpoints
- ✅ `composables/useApi.js` - Smart API composable that handles both mock and real data
- ✅ Maintains exact same API interface for seamless backend switching

### 4. **Updated Components & Pages**
- ✅ `pages/login/index.vue` - Now uses mock authentication
- ✅ `pages/logout/index.vue` - Updated logout flow
- ✅ `components/Loading.vue` - Uses mock loading configuration
- ✅ `components/draggable/sideMenuNested.vue` - Uses mock user/role data
- ✅ `composables/useSiteSettings.js` - Uses mock site settings
- ✅ `middleware/auth.js` & `middleware/dashboard.js` - Updated validation logic

## 🎯 Current Mock Data Features

### Authentication
- **Username**: `admin`
- **Password**: `admin`
- Mock JWT tokens and user roles

### User Management
- Mock users (admin, user1, user2)
- Mock roles (Admin, User, Manager)
- Realistic user data structure

### Site Settings
- Complete site configuration mock data
- Logo, theme, SEO settings
- Font and color configuration

### API Responses
- Consistent response format
- Proper status codes
- Error handling

## 🚀 How to Connect External NestJS Backend

### Step 1: Update API Configuration

In `composables/useApi.js`, change the configuration:

```javascript
// Change this flag to false when ready to use external backend
const USE_MOCK_DATA = false; 

// Set your NestJS backend URL
const EXTERNAL_API_BASE_URL = 'http://localhost:3001/api'; // Your NestJS URL
```

### Step 2: Environment Variables

Add to your `.env` file:
```env
NUXT_API_BASE_URL=http://localhost:3001/api
```

### Step 3: NestJS Backend Requirements

Your NestJS backend should implement these endpoints:

#### Authentication Endpoints
```
POST /auth/login
GET  /auth/logout  
GET  /auth/validate
```

#### Configuration Endpoints
```
GET  /devtool/config/loading-logo
GET  /devtool/config/site-settings
POST /devtool/config/site-settings
```

#### Menu/User Management Endpoints
```
GET  /devtool/menu/user-list
GET  /devtool/menu/role-list
```

### Step 4: Expected Response Format

All endpoints should return responses in this format:

```javascript
// Success Response
{
  statusCode: 200,
  message: "Success message",
  data: { /* your data */ }
}

// Error Response  
{
  statusCode: 401, // or appropriate error code
  message: "Error message"
}
```

### Step 5: Authentication Flow

For the login endpoint, expect this request/response:

**Request:**
```javascript
POST /auth/login
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```javascript
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "username": "admin",
    "roles": ["Admin"],
    "token": "jwt-token-here",
    "refreshToken": "refresh-token-here"
  }
}
```

## 🔄 Gradual Migration Strategy

You can migrate endpoints gradually:

1. **Start with Authentication** - Implement auth endpoints first
2. **Add Configuration** - Site settings and loading configuration  
3. **User Management** - User and role management endpoints
4. **Additional Features** - Add other endpoints as needed

## 🛠️ Development Workflow

### Running with Mock Data (Current State)
```bash
npm run dev
```
- All API calls use mock data
- No external dependencies
- Fully functional UI

### Running with External Backend
1. Ensure your NestJS backend is running
2. Update `USE_MOCK_DATA` to `false` in `composables/useApi.js`
3. Set correct `EXTERNAL_API_BASE_URL`
4. Run: `npm run dev`

## 📁 Key Files to Understand

- **`mock-data/index.js`** - All mock data definitions
- **`composables/useApi.js`** - API layer that switches between mock/real data
- **`composables/useSiteSettings.js`** - Site configuration management
- **`middleware/auth.js`** - Authentication middleware
- **`middleware/dashboard.js`** - Dashboard access control

## 🔍 Mock vs Real API Switching

The `useApi()` composable automatically handles the switching:

```javascript
// This works the same whether using mock or real data
const { auth } = useApi();
const response = await auth.login(username, password);
```

## 📋 Testing Checklist

Before switching to external backend, verify:

- [ ] Login works with mock data (admin/admin)
- [ ] Logout redirects properly
- [ ] Site settings load correctly
- [ ] User/role lists display in components
- [ ] No console errors
- [ ] All UI components function properly

## 🎨 Customization

### Adding New Mock Endpoints

1. Add mock data to `mock-data/index.js`
2. Add endpoint handler in `useApi.js`
3. Update components to use new endpoint

### Adding New API Groups

```javascript
// In useApi.js
const newFeature = {
  getData: async () => {
    return await apiCall('/api/new-feature/data');
  }
};

return {
  // ... existing groups
  newFeature
};
```

## 🚨 Important Notes

- **Authentication**: Current mock accepts any `admin/admin` login
- **Data Persistence**: Mock data resets on page refresh
- **Error Handling**: Both mock and real API calls use same error structure
- **Type Safety**: Maintain same response types for seamless switching

## 💡 Next Steps

1. **Set up your NestJS backend** with the required endpoints
2. **Test with Postman/Insomnia** to ensure endpoints work
3. **Switch the flag** in `useApi.js` to `false`
4. **Test the integration** thoroughly
5. **Add authentication tokens** and proper session management

---

**The frontend is now fully decoupled and ready for external backend integration!** 🎉 