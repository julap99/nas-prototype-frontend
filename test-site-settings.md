# Site Settings Features Test Guide

## Features Implemented ✅

### 1. Font Size Stepper for Site Name
**Location**: Site Settings > Appearance Tab > Site Name Styling

**Test Steps**:
1. Navigate to `/devtool/config/site-settings`
2. Click on the "Appearance" tab
3. Locate the "Site Name Font Size" section
4. Use the stepper buttons (+/-) to change the font size (12px - 36px)
5. Observe the live preview showing the size change
6. Check the current size indicator showing the exact pixel value

**Expected Results**:
- Font size changes in real-time in the preview
- Size indicator updates with current pixel value
- Header and sidemenu site name reflect the new size after saving

### 2. Google Fonts Suggestions Dropdown
**Location**: Site Settings > Appearance Tab > Font Configuration

**Test Steps**:
1. In the same "Appearance" tab, scroll to "Font Configuration"
2. Open the "Popular Google Fonts" dropdown
3. Select a font (e.g., "Inter", "Poppins", "Roboto")
4. Verify the font is applied immediately
5. Check that a success toast notification appears
6. Verify the "Current Font" section updates

**Expected Results**:
- Dropdown contains 15 popular Google Fonts
- Font applies immediately when selected
- Success notification shows: "[Font Name] font applied successfully"
- Current font section shows the new font name and Google Fonts URL
- Dropdown resets after selection

### 3. Show Site Name in Header Toggle
**Location**: Site Settings > Basic Tab

**Test Steps**:
1. Go to the "Basic" tab
2. Locate the "Show site name in header" toggle
3. Toggle it OFF
4. Navigate to any other page
5. Check the header - site name should be hidden
6. Return to settings and toggle it ON
7. Check the header - site name should be visible again

**Expected Results**:
- When OFF: Site name is hidden in both header and sidemenu
- When ON: Site name is visible in both header and sidemenu
- Changes apply immediately without needing to save

### 4. Consistent UI Components
**Verification Points**:
- Uses `rs-button` components with proper variants (primary, outline)
- Uses `rs-card` components for layout
- Consistent spacing and typography
- Uses `FontSizeStepper` component with proper props
- Proper dark mode support
- Icons from Iconify (`ic:` prefix)

**Design Patterns Used**:
- Border rounded containers with proper padding
- Gray borders with dark mode variants
- Consistent form input styling
- Proper spacing with Tailwind classes
- Live preview sidebar with real-time updates

## Database Fields Added ✅

- `siteNameFontSize` (Int, default: 18) - Already existed in Prisma schema
- Field is properly handled in API endpoints
- Synced with global site settings composable

## API Integration ✅

- All settings are saved to `/api/devtool/config/site-settings`
- Font size is included in the POST request body
- Settings load correctly on page refresh
- Changes persist across browser sessions

## Components Updated ✅

1. **pages/devtool/config/site-settings/index.vue**
   - Added font size stepper
   - Added Google Fonts dropdown
   - Enhanced live preview
   - Added visual feedback

2. **components/layouts/Header.vue**
   - Applied dynamic font sizing
   - Respects show/hide toggle

3. **components/layouts/sidemenu/index.vue**
   - Applied scaled font sizing
   - Respects show/hide toggle

4. **composables/useSiteSettings.js**
   - Added siteNameFontSize field
   - Maintains global state consistency

## Testing Checklist ✅

- [ ] Font size stepper works (12px - 36px range)
- [ ] Font size preview updates in real-time
- [ ] Font size applies to header site name
- [ ] Font size applies to sidemenu site name (scaled)
- [ ] Google Fonts dropdown has 15 options
- [ ] Google Font selection applies immediately
- [ ] Font source URL updates when Google Font selected
- [ ] Show/hide toggle works for header
- [ ] Show/hide toggle works for sidemenu
- [ ] Live preview sidebar reflects all changes
- [ ] Settings save and persist correctly
- [ ] Dark mode compatibility
- [ ] Mobile responsiveness
- [ ] Toast notifications appear for font changes
- [ ] All UI components follow design system 