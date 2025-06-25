# Notification System API Documentation

This document provides comprehensive information about the notification system's database schema and API endpoints based on the notification creation form requirements.

## Table of Contents
1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [Usage Examples](#usage-examples)
4. [Integration Guide](#integration-guide)

## Database Schema

### Core Tables

#### `notification_categories`
Stores categorization options for notifications.
```sql
- id (UUID, Primary Key)
- name (VARCHAR) - Display name
- value (VARCHAR) - Unique identifier 
- description (TEXT) - Optional description
- created_at, updated_at (TIMESTAMP)
```

#### `notification_templates`
Reusable templates for common notification types.
```sql
- id (UUID, Primary Key)
- name (VARCHAR) - Template name
- value (VARCHAR) - Unique identifier
- subject (VARCHAR) - Email subject template
- email_content (TEXT) - Email body template
- push_title (VARCHAR) - Push notification title
- push_body (VARCHAR) - Push notification body
- variables (JSONB) - Available variables
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### `notifications` (Main Table)
Central table storing all notification configurations.
```sql
- id (UUID, Primary Key)
- title (VARCHAR) - Internal notification title
- type (ENUM) - 'single' or 'bulk'
- priority (ENUM) - 'low', 'medium', 'high', 'critical'
- category_id (UUID) - FK to notification_categories
- status (ENUM) - 'draft', 'scheduled', 'sending', 'sent', 'failed', 'cancelled'
- delivery_type (ENUM) - 'immediate' or 'scheduled'
- scheduled_at (TIMESTAMP) - When to send (for scheduled)
- timezone (VARCHAR) - Timezone for scheduling
- expires_at (TIMESTAMP) - Optional expiration
- enable_ab_testing (BOOLEAN)
- ab_test_split (INTEGER) - Percentage split for A/B testing
- ab_test_name (VARCHAR) - A/B test identifier
- enable_tracking (BOOLEAN)
- audience_type (ENUM) - 'all', 'specific', 'segmented'
- specific_users (TEXT) - Comma-separated user identifiers
- user_status (VARCHAR) - Filter by user status
- registration_period (VARCHAR) - Filter by registration period
- exclude_unsubscribed (BOOLEAN)
- respect_do_not_disturb (BOOLEAN)
- content_type (ENUM) - 'new' or 'template'
- template_id (UUID) - FK to notification_templates
- email_subject (VARCHAR)
- email_content (TEXT)
- call_to_action_text (VARCHAR)
- call_to_action_url (TEXT)
- push_title (VARCHAR)
- push_body (VARCHAR)
- push_image_url (TEXT)
- estimated_reach (INTEGER)
- actual_sent (INTEGER)
- created_by (UUID) - User who created
- created_at, updated_at, sent_at (TIMESTAMP)
```

#### Supporting Tables

- `notification_channels` - Many-to-many relationship for delivery channels
- `notification_user_segments` - Many-to-many for user segments
- `notification_recipients` - Tracks individual recipients and delivery status
- `notification_queue` - Queue for scheduled notifications
- `notification_analytics` - Tracks metrics and engagement
- `user_notification_preferences` - User preferences and DND settings

## API Endpoints

### 1. Create Notification
**POST** `/api/notifications`

Creates a new notification or schedules it for delivery.

**Request Body:**
```json
{
  "title": "Welcome New Users",
  "type": "bulk",
  "priority": "medium",
  "category": "user_management",
  "channels": ["email", "push"],
  "emailSubject": "Welcome to our platform!",
  "deliveryType": "immediate",
  "timezone": "UTC",
  "enableAbTesting": false,
  "abTestSplit": 50,
  "enableTracking": true,
  "audienceType": "segmented",
  "userSegments": ["new_users"],
  "excludeUnsubscribed": true,
  "respectDoNotDisturb": true,
  "contentType": "new",
  "emailContent": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  "pushTitle": "Welcome!",
  "pushBody": "Thank you for joining our platform.",
  "callToActionText": "Get Started",
  "callToActionUrl": "https://example.com/onboarding"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-of-notification",
    "message": "Notification is being sent",
    "estimatedReach": 1500
  }
}
```

### 2. Get Categories
**GET** `/api/notifications/categories`

Returns available notification categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "label": "User Management",
      "value": "user_management",
      "description": "User registration, profile updates, account changes"
    }
  ]
}
```

### 3. Get Templates
**GET** `/api/notifications/templates`

Returns available notification templates.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "label": "Welcome Message",
      "value": "welcome",
      "subject": "Welcome to {{company_name}}!",
      "content": "<h1>Welcome {{first_name}}!</h1>",
      "pushTitle": "Welcome!",
      "pushBody": "Hi {{first_name}}, welcome!",
      "variables": ["first_name", "company_name"]
    }
  ]
}
```

### 4. Get User Segments
**GET** `/api/notifications/segments`

Returns available user segments for targeting.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "label": "New Users",
      "value": "new_users",
      "description": "Users registered within last 30 days",
      "criteria": {"registration_days": 30}
    }
  ]
}
```

### 5. Preview Audience
**POST** `/api/notifications/audience-preview`

Preview the target audience based on selected criteria.

**Request Body:**
```json
{
  "audienceType": "segmented",
  "userSegments": ["new_users", "active_users"],
  "userStatus": "active",
  "excludeUnsubscribed": true,
  "channels": ["email"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "segment": "New Users",
        "status": "active",
        "registeredAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalCount": 1500,
    "previewCount": 100
  }
}
```

### 6. Send Test Notification
**POST** `/api/notifications/test-send`

Send a test notification to validate setup.

**Request Body:**
```json
{
  "email": "test@example.com",
  "testData": {
    "title": "Test Notification",
    "channels": ["email", "push"],
    "emailSubject": "Test Email",
    "emailContent": "<p>This is a test email.</p>",
    "pushTitle": "Test Push",
    "pushBody": "This is a test push notification."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Test notifications processed",
    "results": [
      {
        "channel": "email",
        "status": "sent",
        "message": "Test email sent successfully"
      },
      {
        "channel": "push",
        "status": "sent",
        "message": "Test push notification sent successfully"
      }
    ]
  }
}
```

### 7. Save Draft
**POST** `/api/notifications/draft`

Save notification as draft for later completion.

**Request Body:**
```json
{
  "title": "Draft Notification",
  "type": "single",
  "category": "marketing",
  "channels": ["email"],
  "emailSubject": "Special Offer",
  "contentType": "new",
  "draftId": "existing-draft-uuid" // Optional, for updating
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "draft-uuid",
    "message": "Draft saved successfully"
  }
}
```

## Usage Examples

### Creating a Welcome Email Campaign

```javascript
// 1. Create notification for new users
const response = await $fetch('/api/notifications', {
  method: 'POST',
  body: {
    title: 'New User Welcome Campaign',
    type: 'bulk',
    priority: 'medium',
    category: 'user_management',
    channels: ['email'],
    emailSubject: 'Welcome to {{company_name}}!',
    deliveryType: 'immediate',
    audienceType: 'segmented',
    userSegments: ['new_users'],
    contentType: 'template',
    selectedTemplate: 'welcome',
    enableTracking: true
  }
})

console.log(`Notification created: ${response.data.id}`)
console.log(`Estimated reach: ${response.data.estimatedReach} users`)
```

### Scheduling a Marketing Campaign

```javascript
// 2. Schedule a promotional campaign
const scheduledResponse = await $fetch('/api/notifications', {
  method: 'POST',
  body: {
    title: 'Black Friday Sale',
    type: 'bulk',
    priority: 'high',
    category: 'marketing',
    channels: ['email', 'push'],
    emailSubject: '🔥 Black Friday Sale - 50% Off Everything!',
    deliveryType: 'scheduled',
    scheduledAt: '2024-11-29T09:00:00Z',
    timezone: 'America/New_York',
    audienceType: 'segmented',
    userSegments: ['active_users', 'high_value'],
    contentType: 'new',
    emailContent: '<h1>Black Friday Sale!</h1><p>Don\'t miss out on 50% off everything!</p>',
    pushTitle: 'Black Friday Sale!',
    pushBody: '50% off everything - today only!',
    callToActionText: 'Shop Now',
    callToActionUrl: 'https://example.com/sale',
    enableAbTesting: true,
    abTestSplit: 50,
    abTestName: 'Subject Line Test'
  }
})
```

### Sending Test Notifications

```javascript
// 3. Send test before going live
const testResponse = await $fetch('/api/notifications/test-send', {
  method: 'POST',
  body: {
    email: 'marketing@company.com',
    notificationId: scheduledResponse.data.id
  }
})

console.log('Test results:', testResponse.data.results)
```

## Integration Guide

### Frontend Integration

Update your Vue.js notification creation form to use these APIs:

```vue
<script setup>
// Fetch initial data
const { data: categories } = await $fetch('/api/notifications/categories')
const { data: templates } = await $fetch('/api/notifications/templates')
const { data: segments } = await $fetch('/api/notifications/segments')

// Preview audience
const previewAudience = async () => {
  const response = await $fetch('/api/notifications/audience-preview', {
    method: 'POST',
    body: {
      audienceType: form.audienceType,
      userSegments: form.userSegments,
      userStatus: form.userStatus,
      excludeUnsubscribed: form.excludeUnsubscribed,
      channels: form.channels
    }
  })
  
  previewedUsers.value = response.data.users
  estimatedReach.value = response.data.totalCount
}

// Submit notification
const submitNotification = async (formData) => {
  try {
    const response = await $fetch('/api/notifications', {
      method: 'POST',
      body: formData
    })
    
    // Show success message
    await $swal.fire({
      title: 'Success!',
      text: response.data.message,
      icon: 'success'
    })
    
    // Redirect to notification list
    await navigateTo('/notifications')
    
  } catch (error) {
    console.error('Failed to create notification:', error)
  }
}
</script>
```

### Database Setup

1. **Run the migration:**
```bash
psql -d your_database -f database/migrations/001_create_notification_tables.sql
```

2. **Set up database connection in Nuxt:**
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL
  }
})

// plugins/database.server.js
import { Pool } from 'pg'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  
  const pool = new Pool({
    connectionString: config.databaseUrl
  })
  
  nitroApp.hooks.hook('close', async () => {
    await pool.end()
  })
  
  nitroApp.provide('db', pool)
})
```

### Email/Push Service Integration

Replace the mock functions in `test-send.post.js` with your actual service integrations:

```javascript
// Email service example (SendGrid)
import sgMail from '@sendgrid/mail'

async function sendTestEmail({ to, subject, content, callToActionText, callToActionUrl }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const msg = {
    to,
    from: 'noreply@yourcompany.com',
    subject,
    html: content
  }
  
  await sgMail.send(msg)
}

// Push service example (Firebase)
import admin from 'firebase-admin'

async function sendTestPush({ email, title, body }) {
  // Get user's device tokens from your database
  const tokens = await getUserDeviceTokens(email)
  
  const message = {
    notification: { title, body },
    tokens
  }
  
  await admin.messaging().sendMulticast(message)
}
```

This comprehensive notification system provides:

✅ **Complete database schema** with all necessary tables and relationships
✅ **Robust API endpoints** with proper validation and error handling  
✅ **Transaction support** to ensure data consistency
✅ **A/B testing capabilities** for optimization
✅ **User preference handling** including DND settings
✅ **Queue system** for reliable delivery
✅ **Analytics tracking** for performance monitoring
✅ **Draft functionality** for iterative creation
✅ **Test sending** for validation before deployment

The system is designed to handle both simple single notifications and complex bulk campaigns with advanced targeting and scheduling capabilities. 