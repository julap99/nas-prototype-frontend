import { ref } from "vue";

export const useNotifications = () => {
  const isLoading = ref(false);
  const notifications = ref([]);
  const pagination = ref(null);
  const error = ref(null);

  // Fetch notifications list
  const fetchNotifications = async (options = {}) => {
    isLoading.value = true;
    error.value = null;

    try {
      const queryParams = new URLSearchParams();

      console.log("Query Params:", queryParams);

      // Add query parameters
      if (options.page) queryParams.append("page", options.page);
      if (options.limit) queryParams.append("limit", options.limit);
      if (options.status) queryParams.append("status", options.status);
      if (options.priority) queryParams.append("priority", options.priority);
      if (options.category) queryParams.append("category", options.category);
      if (options.search) queryParams.append("search", options.search);
      if (options.sortBy) queryParams.append("sortBy", options.sortBy);
      if (options.sortOrder) queryParams.append("sortOrder", options.sortOrder);

      const url = `/api/notifications/list${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;

      const { data } = await $fetch(url);

      notifications.value = data.notifications;
      pagination.value = data.pagination;

      return data;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to fetch notifications";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await $fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });

      // Remove from local state
      notifications.value = notifications.value.filter(
        (n) => n.id !== notificationId
      );

      return response;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to delete notification";
      throw err;
    }
  };

  // Get notification by ID
  const getNotificationById = async (notificationId) => {
    isLoading.value = true;
    error.value = null;

    console.log("Notification ID:", notificationId);

    try {
      const response = await $fetch(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to fetch notification";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Create notification
  const createNotification = async (notificationData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/notifications", {
        method: "POST",
        body: notificationData,
      });

      return response;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to create notification";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Update notification
  const updateNotification = async (notificationId, notificationData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`/api/notifications/${notificationId}`, {
        method: "PUT",
        body: notificationData,
      });

      return response;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to update notification";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Save draft
  const saveDraft = async (draftData) => {
    try {
      const response = await $fetch("/api/notifications/draft", {
        method: "POST",
        body: draftData,
      });

      return response;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to save draft";
      throw err;
    }
  };

  // Test send notification
  const testSendNotification = async (testData) => {
    try {
      const response = await $fetch("/api/notifications/test-send", {
        method: "POST",
        body: testData,
      });

      return response;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to send test notification";
      throw err;
    }
  };

  // Get audience preview
  const getAudiencePreview = async (audienceData) => {
    try {
      const response = await $fetch("/api/notifications/audience-preview", {
        method: "POST",
        body: audienceData,
      });

      return response;
    } catch (err) {
      error.value =
        err.data?.message || err.message || "Failed to get audience preview";
      throw err;
    }
  };

  return {
    // State
    isLoading,
    notifications,
    pagination,
    error,

    // Actions
    fetchNotifications,
    deleteNotification,
    getNotificationById,
    createNotification,
    updateNotification,
    saveDraft,
    testSendNotification,
    getAudiencePreview,
  };
};
