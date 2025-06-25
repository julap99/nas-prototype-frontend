import { ref } from "vue";

export const useNotificationDelivery = () => {
  const isLoading = ref(false);
  const error = ref(null);

  // Fetch delivery statistics
  const fetchDeliveryStats = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/notifications/delivery/stats");
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to fetch delivery stats";
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch email configuration
  const fetchEmailConfig = async () => {
    try {
      const response = await $fetch("/api/notifications/delivery/email-config");
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to fetch email configuration";
      throw error.value;
    }
  };

  // Fetch push notification configuration
  const fetchPushConfig = async () => {
    try {
      const response = await $fetch("/api/notifications/delivery/push-config");
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to fetch push configuration";
      throw error.value;
    }
  };

  // Fetch delivery settings
  const fetchDeliverySettings = async () => {
    try {
      const response = await $fetch("/api/notifications/delivery/settings");
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to fetch delivery settings";
      throw error.value;
    }
  };

  // Update email configuration
  const updateEmailConfig = async (config) => {
    try {
      const response = await $fetch("/api/notifications/delivery/email-config", {
        method: "PUT",
        body: config,
      });
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to update email configuration";
      throw error.value;
    }
  };

  // Update push notification configuration
  const updatePushConfig = async (config) => {
    try {
      const response = await $fetch("/api/notifications/delivery/push-config", {
        method: "PUT",
        body: config,
      });
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to update push configuration";
      throw error.value;
    }
  };

  // Update delivery settings
  const updateDeliverySettings = async (settings) => {
    try {
      const response = await $fetch("/api/notifications/delivery/settings", {
        method: "PUT",
        body: settings,
      });
      return response.data;
    } catch (err) {
      error.value = err.data?.message || err.message || "Failed to update delivery settings";
      throw error.value;
    }
  };

  return {
    isLoading,
    error,
    fetchDeliveryStats,
    fetchEmailConfig,
    fetchPushConfig,
    fetchDeliverySettings,
    updateEmailConfig,
    updatePushConfig,
    updateDeliverySettings,
  };
}; 