// Mock data for external backend integration
// This file exports all mock data used in the frontend

export const mockUsers = [
  {
    userID: 1,
    userUsername: "admin",
    userFullName: "Administrator",
    userEmail: "admin@example.com",
    userPhone: "+60123456789",
    userStatus: "active",
    userCreatedDate: new Date("2023-01-01").toISOString(),
    userModifiedDate: new Date().toISOString()
  },
  {
    userID: 2,
    userUsername: "user1",
    userFullName: "John Doe",
    userEmail: "john@example.com",
    userPhone: "+60123456790",
    userStatus: "active",
    userCreatedDate: new Date("2023-01-15").toISOString(),
    userModifiedDate: new Date().toISOString()
  },
  {
    userID: 3,
    userUsername: "user2",
    userFullName: "Jane Smith",
    userEmail: "jane@example.com",
    userPhone: "+60123456791",
    userStatus: "active",
    userCreatedDate: new Date("2023-02-01").toISOString(),
    userModifiedDate: new Date().toISOString()
  }
];

export const mockRoles = [
  {
    roleID: 1,
    roleName: "Admin",
    roleDescription: "System Administrator with full access",
    roleStatus: "active",
    roleCreatedDate: new Date("2023-01-01").toISOString(),
    roleModifiedDate: new Date().toISOString()
  },
  {
    roleID: 2,
    roleName: "User",
    roleDescription: "Regular user with limited access",
    roleStatus: "active",
    roleCreatedDate: new Date("2023-01-01").toISOString(),
    roleModifiedDate: new Date().toISOString()
  },
  {
    roleID: 3,
    roleName: "Manager",
    roleDescription: "Manager with supervisory access",
    roleStatus: "active",
    roleCreatedDate: new Date("2023-01-01").toISOString(),
    roleModifiedDate: new Date().toISOString()
  }
];

export const mockSiteSettings = {
  settingID: 1,
  siteName: "corradAF",
  siteNameFontSize: 18,
  siteDescription: "corradAF Admin Portal",
  siteLogo: "/img/logo/corradAF-logo.svg",
  siteLoadingLogo: "/img/logo/corradAF-logo.svg",
  siteLoginLogo: "/img/logo/corradAF-logo.svg",
  siteFavicon: "/favicon.ico",
  showSiteNameInHeader: true,
  primaryColor: "#00A59A",
  secondaryColor: "#f3586a",
  successColor: "#22c55e",
  infoColor: "#3b82f6",
  warningColor: "#f59e0b",
  dangerColor: "#ef4444",
  customCSS: "",
  themeMode: "light",
  customThemeFile: "",
  currentFont: "Inter",
  fontSource: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  seoTitle: "corradAF Admin Portal",
  seoDescription: "Modern admin portal built with Nuxt.js",
  seoKeywords: "admin, portal, dashboard, nuxt",
  seoAuthor: "Corrad Software",
  seoOgImage: "/img/logo/corradAF-logo.svg",
  seoTwitterCard: "summary_large_image",
  seoCanonicalUrl: "",
  seoRobots: "index, follow",
  seoGoogleAnalytics: "",
  seoGoogleTagManager: "",
  seoFacebookPixel: "",
  settingCreatedDate: new Date("2023-01-01").toISOString(),
  settingModifiedDate: new Date().toISOString()
};

export const mockAuthResponse = {
  success: {
    statusCode: 200,
    message: "Login successful",
    data: {
      username: "admin",
      roles: ["Admin"],
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token"
    }
  },
  error: {
    statusCode: 401,
    message: "Invalid credentials"
  }
};

export const mockLoadingConfig = {
  statusCode: 200,
  data: {
    siteLoadingLogo: "/img/logo/corradAF-logo.svg",
    siteName: "corradAF"
  }
};

// Mock API responses
export const mockApiResponses = {
  "/api/auth/login": mockAuthResponse,
  "/api/auth/logout": { statusCode: 200, message: "Logout successful" },
  "/api/auth/validate": { statusCode: 200, data: { valid: true } },
  "/api/devtool/config/loading-logo": mockLoadingConfig,
  "/api/devtool/config/site-settings": { statusCode: 200, data: mockSiteSettings },
  "/api/devtool/menu/user-list": { statusCode: 200, data: mockUsers },
  "/api/devtool/menu/role-list": { statusCode: 200, data: mockRoles }
}; 