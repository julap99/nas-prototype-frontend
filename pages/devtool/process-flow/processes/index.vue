<template>
  <div class="space-y-6" :key="route.fullPath">
    <LayoutsBreadcrumb />

    <!-- Page header with title and add button -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Process Management</h1>
      <RsButton @click="openAddModal" variant="primary" size="md">
        <Icon name="ic:round-add" class="mr-2" />
        Add New Process
      </RsButton>
    </div>

    <!-- Process table -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
      <span class="ml-2 text-gray-600">Loading processes...</span>
    </div>

    <RsTable
      v-if="!loading && processes && processes.length >= 0"
      :data="processes"
      :key="`processes-table-${processes.length}-${Date.now()}`"
      :basic="false"
      :advanced="true"
      :pageSize="10"
      :options="{
        variant: 'default',
        striped: true,
        bordered: false,
        hover: true,
      }"
      :optionsAdvanced="{
        sortable: true,
        filterable: true,
        responsive: true,
        outsideBorder: true,
      }"
    >
      <template #link="{ value }">
        <div>
          <a
            class="text-blue-600 hover:underline"
            target="_blank"
            :href="value.link"
            >{{ value.link }}</a
          >
        </div>
      </template>

      <template #description="{ value }">
        <div class="max-w-xs">
          <span v-if="value" class="text-sm text-gray-600 line-clamp-2">{{
            value.description
          }}</span>
          <span v-else class="text-sm text-gray-400 italic"
            >No description</span
          >
        </div>
      </template>

      <template #status="{ value }">
        <div class="flex items-center">
          <button
            @click="toggleProcessStatus(value)"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              value.status == 1
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200',
            ]"
            :title="
              value.status == 1 ? 'Click to deactivate' : 'Click to activate'
            "
          >
            {{ value.status == 1 ? "Active" : "Inactive" }}
          </button>
        </div>
      </template>

      <!-- Custom slot for action buttons -->
      <template #actions="{ value }">
        <div class="flex items-center space-x-2">
          <button
            @click="editProcess(value)"
            class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit Process"
          >
            <Icon name="ic:round-edit" size="18" />
          </button>
          <button
            @click="confirmDeleteProcess(value)"
            class="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete Process"
          >
            <Icon name="ic:round-delete" size="18" />
          </button>
        </div>
      </template>
    </RsTable>

    <!-- No data message -->
    <div
      v-if="!loading && (!processes || processes.length === 0)"
      class="text-center py-8"
    >
      <Icon
        name="ic:round-inbox"
        size="48"
        class="mx-auto text-gray-400 mb-4"
      />
      <p class="text-gray-500 text-lg">No processes found</p>
      <p class="text-gray-400">Create your first process to get started</p>
    </div>

    <!-- Add/Edit Process Modal -->
    <RsModal
      v-model="showModal"
      :title="isEditing ? 'Edit Process' : 'Add New Process'"
      size="md"
      position="center"
    >
      <template #body>
        <FormKit type="form" @submit="submitProcess" :actions="false">
          <FormKit
            name="namaProses"
            label="Process Name"
            type="text"
            validation="required"
            :value="currentProcess.namaProses"
            @input="currentProcess.namaProses = $event"
            placeholder="Enter process name"
          />

          <FormKit
            name="idPage"
            label="Process Link"
            type="text"
            validation="required"
            :value="currentProcess.idPage"
            @input="currentProcess.idPage = $event"
            placeholder="Enter process link"
            help="Enter the full process link path"
          />

          <FormKit
            name="description"
            label="Description"
            type="textarea"
            :value="currentProcess.description"
            @input="currentProcess.description = $event"
            placeholder="Enter process description (optional)"
            help="Provide a brief description of this process"
            rows="3"
          />
        </FormKit>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton variant="secondary-outline" @click="showModal = false"
            >Cancel</RsButton
          >
          <RsButton variant="primary" @click="submitProcess">{{
            isEditing ? "Update" : "Create"
          }}</RsButton>
        </div>
      </template>
    </RsModal>

    <!-- Delete Confirmation Modal -->
    <RsModal
      v-model="showDeleteModal"
      title="Confirm Deletion"
      size="md"
      position="center"
    >
      <template #body>
        <div class="p-4 text-center">
          <Icon
            name="ic:round-warning"
            size="48"
            class="mx-auto text-red-500 mb-4"
          />
          <p class="text-lg font-medium mb-2">
            Are you sure you want to delete this process?
          </p>
          <p class="text-gray-600">
            <span class="font-medium">{{
              processToDelete?.name || "Unknown Process"
            }}</span>
            <br />
            This action cannot be undone.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton variant="secondary-outline" @click="showDeleteModal = false"
            >Cancel</RsButton
          >
          <RsButton variant="danger" @click="deleteProcess">Delete</RsButton>
        </div>
      </template>
    </RsModal>

    <!-- Components Affected Modal -->
    <RsModal
      v-model="showComponentsAffectedModal"
      title="Cannot Delete Process"
      size="lg"
      position="center"
    >
      <template #body>
        <div class="p-4">
          <div class="text-center mb-4">
            <Icon
              name="ic:round-error"
              size="48"
              class="mx-auto text-orange-500 mb-4"
            />
            <p class="text-lg font-medium mb-2 text-red-600">
              Cannot Delete Process
            </p>
            <p class="text-gray-600 mb-4">
              This process is currently being used by the following components:
            </p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div
              v-for="component in affectedComponents"
              :key="component.id"
              class="mb-3 p-3 bg-white rounded border"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">
                    {{ component.name }}
                  </h4>
                  <p
                    v-if="component.description"
                    class="text-sm text-gray-600 mt-1"
                  >
                    {{ component.description }}
                  </p>
                </div>
                <div class="ml-4">
                  <NuxtLink
                    :to="`/admin/configuration/profiling/components`"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Component
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">
              <Icon name="ic:round-info" class="inline mr-1" size="16" />
              To delete this process, you must first remove it from all
              components that use it.
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton
            variant="primary"
            @click="showComponentsAffectedModal = false"
          >
            OK
          </RsButton>
        </div>
      </template>
    </RsModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "~/composables/useToast";
import { useApiFetching } from "~/composables/useApiFetching";

definePageMeta({
  title: "Admin Profiling Process Configuration",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Configuration",
      url: "/admin/configuration/profiling/process",
    },
    {
      name: "Profiling",
      url: "/admin/configuration/profiling/process",
    },
    {
      name: "Process",
      type: "current",
    },
  ],
});

// Route guard to prevent content persistence
const route = useRoute();
const router = useRouter();
const apiRequest = useApiFetching();

// Watch for route changes to clean up state
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      console.log("🧹 Route changed - cleaning up process page state");
      // Clean up state when navigating away
      processes.value = [];
      loading.value = false;
      showModal.value = false;
      showDeleteModal.value = false;
      showComponentsAffectedModal.value = false;
      isEditing.value = false;
      currentProcess.value = {
        id: null,
        namaProses: "",
        idPage: "",
        description: "",
      };
      processToDelete.value = null;
      affectedComponents.value = [];
    }
  },
  { immediate: false }
);

// Toast notifications
const toast = useToast();

// Table data
const processes = ref([]);
const loading = ref(false);

// Modal control
const showModal = ref(false);
const showDeleteModal = ref(false);
const showComponentsAffectedModal = ref(false);
const isEditing = ref(false);
const currentProcess = ref({
  id: null,
  namaProses: "",
  idPage: "",
  description: "",
});
const processToDelete = ref(null);
const affectedComponents = ref([]);

// Load processes on mount
const loadProcesses = async () => {
  console.log("🔄 Starting loadProcesses function");
  console.log("📊 Current processes state:", processes.value);
  console.log("📍 Current route:", route.path);

  // Don't reload if already loading
  if (loading.value) {
    console.log("⏳ Already loading, skipping...");
    return;
  }

  // Reset state before loading
  processes.value = [];
  loading.value = true;
  console.log("⏳ Loading state set to true");

  try {
    console.log("📡 Calling processApi.getAll()...");

    const response = await apiRequest("/configuration/profiling/process", {
      method: "GET",
    });

    console.log("✅ API Response received:", response);

    if (response && Array.isArray(response)) {
      const mappedProcesses = response.map((process) => {
        const mappedProcess = {
          name: process?.namaProses || "",
          link: process?.idPage || "",
          description: process?.description || "",
          status: process?.status || 0,
          processCode: process?.kodProses || "",
          actions: process?.kodProses || "",
        };
        console.log("🔄 Mapped process:", mappedProcess);
        return mappedProcess;
      });

      // Use nextTick to ensure DOM is updated
      await nextTick();
      processes.value = mappedProcesses;
      console.log("📊 Final processes array:", processes.value);
    } else {
      console.warn("⚠️ Response is not an array:", response);
      processes.value = [];
    }
  } catch (error) {
    console.error("❌ Error loading processes:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response,
    });
    toast.error("Failed to load processes");
    processes.value = [];
  } finally {
    loading.value = false;
    console.log("✅ Loading state set to false");
  }
};

// Watch for route changes to reload data when entering the page
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (
      newPath === "/admin/configuration/profiling/process" &&
      oldPath &&
      oldPath !== newPath
    ) {
      console.log("🔄 Entering process page - reloading data");
      loadProcesses();
    }
  },
  { immediate: false }
);

onMounted(() => {
  console.log("🚀 Component mounted");
  console.log("📍 Current route:", route.path);

  loadProcesses();

  // Safety timeout to ensure loading stops
  setTimeout(() => {
    if (loading.value) {
      console.warn("⚠️ Loading timeout reached, forcing loading to stop");
      loading.value = false;
    }
  }, 10000); // 10 seconds timeout
});

// Clean up on unmount to prevent state persistence
onUnmounted(() => {
  console.log("🧹 Component unmounting - cleaning up state");
  processes.value = [];
  loading.value = false;
  showModal.value = false;
  showDeleteModal.value = false;
  showComponentsAffectedModal.value = false;
  isEditing.value = false;
  currentProcess.value = {
    id: null,
    namaProses: "",
    idPage: "",
    description: "",
  };
  processToDelete.value = null;
  affectedComponents.value = [];
});

// Open add modal
const openAddModal = () => {
  isEditing.value = false;
  currentProcess.value = {
    id: null,
    namaProses: "",
    idPage: "",
    description: "",
  };
  showModal.value = true;
};

// Edit process
const editProcess = (process) => {
  isEditing.value = true;
  currentProcess.value = {
    kodProses: process.processCode || "",
    namaProses: process.name || "",
    idPage: process.link || "",
    description: process.description || "",
  };
  showModal.value = true;
};

// Submit process (create or update)
const submitProcess = async () => {
  // Form validation (basic)
  if (!currentProcess.value.namaProses || !currentProcess.value.idPage) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    if (isEditing.value) {
      // Update existing process
      console.log("🔄 Updating process:", currentProcess.value);
      await apiRequest(
        `/configuration/profiling/process/${currentProcess.value.kodProses}`,
        {
          method: "PATCH",
          body: {
            namaProses: currentProcess.value.namaProses,
            idPage: currentProcess.value.idPage,
            description: currentProcess.value.description,
          },
        }
      );
      toast.success("Process updated successfully");
    } else {
      // Create new process
      console.log("🆕 Creating new process:", currentProcess.value);
      await apiRequest("/configuration/profiling/process", {
        method: "POST",
        body: {
          namaProses: currentProcess.value.namaProses,
          idPage: currentProcess.value.idPage,
          description: currentProcess.value.description,
        },
      });
      toast.success("New process created successfully");
    }

    // Reload processes
    await loadProcesses();

    // Close modal
    showModal.value = false;
  } catch (error) {
    console.error("Error submitting process:", error);
    toast.error("Failed to save process");
  }
};

// Confirm delete process
const confirmDeleteProcess = (process) => {
  processToDelete.value = process;
  showDeleteModal.value = true;
};

// Toggle process status
const toggleProcessStatus = async (process) => {
  try {
    const newStatus = process.status == 1 ? 0 : 1;
    console.log(
      "🔄 Toggling process status:",
      process.processCode,
      "to",
      newStatus
    );

    await apiRequest(process.processCode, {
      method: "PUT",
      body: {
        status: newStatus,
      },
    });

    // Update the local state immediately for better UX
    process.status = newStatus;

    toast.success(
      `Process ${newStatus == 1 ? "activated" : "deactivated"} successfully`
    );
  } catch (error) {
    console.error("Error toggling process status:", error);
    toast.error("Failed to update process status");
  }
};

// Delete process
const deleteProcess = async () => {
  if (processToDelete.value) {
    try {
      console.log("🗑️ Deleting process:", processToDelete.value);

      // Use the processCode (which is the kodProses) for deletion
      const processIdentifier = processToDelete.value.processCode;

      if (!processIdentifier) {
        console.error("❌ No process code found for deletion");
        toast.error("Cannot delete process: missing process code");
        return;
      }

      console.log("🔍 Using process identifier:", processIdentifier);
      const response = await apiRequest(`/configuration/profiling/process/${processIdentifier}`, {
        method: "DELETE",
      });

      console.log("📡 Delete response:", response);

      if (response.success) {
        toast.success("Process deleted successfully");
        showDeleteModal.value = false;
        processToDelete.value = null;

        // Reload processes
        await loadProcesses();
      } else if (
        response.affectedComponents &&
        response.affectedComponents.length > 0
      ) {
        // Process cannot be deleted because it's used by components
        console.log(
          "⚠️ Process cannot be deleted - affected components:",
          response.affectedComponents
        );
        affectedComponents.value = response.affectedComponents;
        showDeleteModal.value = false;
        showComponentsAffectedModal.value = true;
        processToDelete.value = null;
      } else {
        console.error(
          "❌ Delete failed - no success and no affected components"
        );
        toast.error("Failed to delete process");
      }
    } catch (error) {
      console.error("Error deleting process:", error);
      toast.error("Failed to delete process");
    }
  }
};
</script>

<style lang="scss" scoped>
// You can add custom styles here if needed
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
