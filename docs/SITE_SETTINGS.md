# Site Settings Feature

## Overview
The Site Settings feature allows administrators to customize the appearance and branding of the application through a user-friendly interface. All settings are globally applied across the entire application including SEO, meta tags, and visual elements.

## Features

### 1. Basic Information
- **Site Name**: Customize the application name displayed globally in:
  - Header and sidebar
  - Browser title and meta tags
  - SEO and Open Graph tags
  - Loading screen
  - All pages and components
- **Site Description**: Set a description used for:
  - SEO meta descriptions
  - Open Graph descriptions
  - Twitter Card descriptions
- **Theme Selection**: Choose from available themes:
  - Standard themes (from themeList.js)
  - Accessibility themes (from themeList2.js)
  - Custom themes added to theme.css

### 2. Branding
- **Site Logo**: Upload a custom logo displayed in:
  - Header (horizontal layout)
  - Sidebar (vertical layout)
  - Loading screen
  - Login page
  - Any component using site settings
- **Favicon**: Upload a custom favicon displayed in:
  - Browser tabs
  - Bookmarks
  - Mobile home screen icons

### 3. Advanced Settings
- **Custom CSS**: Add custom CSS injected into document head
- **Custom Theme File**: Upload CSS files saved to `/assets/style/css/`
- **Add Custom Theme to theme.css**: Directly add themes to the main theme.css file

## How to Access

1. Navigate to **Pentadbiran** → **Konfigurasi** → **Site Settings**
2. Use the tabbed interface:
   - **Basic Info**: Site name, description, and theme selection
   - **Branding**: Logo and favicon uploads
   - **Advanced**: Custom CSS and theme management
3. Use the **Live Preview** panel to see changes in real-time
4. Click **Save Changes** to apply your settings

## Technical Implementation

### Database Schema
The settings are stored in the `site_settings` table with the following fields:
- `siteName`, `siteDescription`
- `siteLogo`, `siteFavicon`
- `selectedTheme` - Selected theme name
- `customCSS`, `customThemeFile`
- Legacy fields maintained for backward compatibility

### API Endpoints
- `GET /api/devtool/config/site-settings` - Retrieve current settings
- `POST /api/devtool/config/site-settings` - Update settings
- `POST /api/devtool/config/upload-file` - Upload files (logos, themes)
- `POST /api/devtool/config/add-custom-theme` - Add custom theme to theme.css

### File Upload Locations
- **Logo and Favicon files**: Saved to `public/uploads/site-settings/`
- **Theme CSS files**: Saved to `assets/style/css/` directory
- **Custom themes**: Added directly to `assets/style/css/base/theme.css`

### Composable
The `useSiteSettings()` composable provides:
- `siteSettings` - Reactive settings object
- `loadSiteSettings()` - Load settings from API
- `updateSiteSettings()` - Update settings
- `setTheme()` - Set theme using existing theme system
- `getCurrentTheme()` - Get current theme
- `applyThemeSettings()` - Apply theme changes to DOM
- `updateGlobalMeta()` - Update global meta tags and SEO
- `addCustomThemeToFile()` - Add custom theme to theme.css

### Global Integration
The site settings are globally integrated across:

#### Header Component
- Uses site settings for logo and name display
- Theme selection dropdown uses same system as site settings
- Synced with site settings theme selection

#### Loading Component
- Uses site logo if available, fallback to default
- Displays site name in loading screen

#### App.vue
- Global meta tags updated from site settings
- Title, description, and favicon managed globally
- Theme initialization from site settings

#### SEO and Meta Tags
- Document title updated globally
- Meta descriptions for SEO
- Open Graph tags for social sharing
- Twitter Card tags
- Favicon and apple-touch-icon

### Theme System Integration
- Integrates with existing theme system (themeList.js, themeList2.js)
- Theme selection in header dropdown synced with site settings
- Custom themes can be added directly to theme.css
- Backward compatibility with existing theme structure

### Custom Theme Structure
Custom themes added to theme.css should follow this structure:
```css
html[data-theme="your-theme-name"] {
  --color-primary: 255, 0, 0;
  --color-secondary: 0, 255, 0;
  --color-success: 0, 255, 0;
  --color-info: 0, 0, 255;
  --color-warning: 255, 255, 0;
  --color-danger: 255, 0, 0;
  /* Add your theme variables here */
}
```

## Default Values
If no settings are configured, the system uses these defaults:
- Site Name: "corradAF"
- Site Description: "corradAF Base Project"
- Selected Theme: "biasa"
- Logo: Default corradAF logo
- Favicon: Default favicon

## Migration Notes
- Legacy color fields (primaryColor, secondaryColor, etc.) are maintained for backward compatibility
- `themeMode` field is mapped to `selectedTheme` for compatibility
- Existing installations will automatically use default values
- Theme selection integrates with existing theme dropdown in header

## Notes
- Changes are applied immediately in the preview
- Theme changes affect the entire application
- Custom CSS is injected into the document head
- Theme files are saved to `/assets/style/css/` for proper integration
- File uploads are validated for type and size
- Settings persist across browser sessions
- Site name and description updates are reflected globally and immediately
- All meta tags and SEO elements are automatically updated
- Logo changes are reflected in all components that use site settings 

### Important Notes
- Changes are applied immediately in the preview
- Theme changes affect the entire application
- Custom CSS is injected into the document head
- Theme files are saved to `/assets/style/css/` for proper integration
- File uploads are validated for type and size
- Settings persist across browser sessions
- Site name and description updates are reflected globally and immediately
- All meta tags and SEO elements are automatically updated
- Logo changes are reflected in all components that use site settings 