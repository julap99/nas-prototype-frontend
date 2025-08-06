<template>
  <div class="space-y-6" :key="route.fullPath">
    <LayoutsBreadcrumb />

    <!-- Page header with title and add button -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Process Components</h1>
      <RsButton @click="openAddModal" variant="primary" size="md">
        <Icon name="ic:round-add" class="mr-2" />
        Add New Component
      </RsButton>
    </div>

    <!-- Components table -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
      <span class="ml-2 text-gray-600">Loading components...</span>
    </div>

    <RsTable
      v-else
      :data="components"
      :key="`components-table-${components.length}-${Date.now()}`"
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
      <template #kodKomponen="{ value }">
        <span class="font-mono text-xs text-gray-700">{{
          value.kodKomponen
        }}</span>
      </template>
      <!-- Custom slot for action buttons -->
      <template #actions="{ value }">
        <div class="flex items-center space-x-2">
          <button
            @click="editComponent(value)"
            class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit Component"
          >
            <Icon name="ic:round-edit" size="18" />
          </button>
          <button
            @click="viewComponent(value)"
            class="p-1.5 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            title="View Component Details"
          >
            <Icon name="ic:round-visibility" size="18" />
          </button>
          <button
            @click="confirmDeleteComponent(value)"
            class="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete Component"
          >
            <Icon name="ic:round-delete" size="18" />
          </button>
        </div>
      </template>
    </RsTable>

    <!-- Add/Edit Component Modal -->
    <RsModal
      v-model="showModal"
      :title="isEditing ? 'Edit Component' : 'Add New Component'"
      size="xl"
      position="center"
      :actions="false"
    >
      <template #body>
        <FormKit type="form" @submit="submitComponent" :actions="false">
          <div class="grid grid-cols-1 gap-6">
            <!-- Component Basic Info -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">
                Component Information
              </h3>
              <FormKit
                name="kodKomponen"
                label="Component Code"
                type="text"
                :value="currentComponent.kodKomponen || 'Auto-generated'"
                :disabled="true"
                placeholder="Auto-generated"
              />

              <FormKit
                name="namaPendaftaran"
                label="Component Name"
                type="text"
                validation="required"
                :value="currentComponent.namaPendaftaran"
                @input="currentComponent.namaPendaftaran = $event"
                placeholder="e.g., Profiling - Full Registration"
              />

              <FormKit
                name="description"
                label="Description"
                type="textarea"
                :value="currentComponent.description"
                @input="currentComponent.description = $event"
                placeholder="Brief description of this component and its workflow"
                rows="3"
              />
            </div>

            <!-- Process Flow Selection -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">
                Process Flow Configuration
              </h3>

              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div class="flex items-start space-x-3">
                  <Icon
                    name="ic:round-info"
                    class="text-blue-600 mt-0.5"
                    size="20"
                  />
                  <div class="text-sm text-blue-800">
                    <p class="font-medium mb-1">Process Flow Order</p>
                    <p>
                      Select and order the processes for this component. Drag to reorder steps. Only selected processes will be included in the workflow.
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="processesLoading" class="flex justify-center items-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span class="ml-2 text-gray-600">Loading processes...</span>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Available Processes -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">
                      Available Processes ({{ availableProcessesForSelection.length }})
                    </span>
                  </div>
                  <div class="max-h-64 overflow-y-auto border rounded-lg p-3 space-y-2 bg-white">
                    <div
                      v-for="process in availableProcessesForSelection"
                      :key="process.kodProses"
                      class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      @click="addProcess(process.kodProses)"
                    >
                      <Icon name="ic:round-arrow-forward" class="text-blue-400" size="18" />
                      <div class="flex-1">
                        <div class="font-medium text-sm">{{ process.namaProses }}</div>
                        <div class="text-xs text-gray-500">{{ process.idPage }}</div>
                      </div>
                    </div>
                    <div v-if="availableProcessesForSelection.length === 0" class="text-xs text-gray-400 text-center py-4">
                      All processes have been selected
                    </div>
                  </div>
                </div>

                <!-- Selected Workflow Steps -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">
                      Selected Workflow Steps ({{ selectedProcesses.length }})
                    </span>
                    <RsButton
                      @click="clearProcessFlow"
                      variant="secondary-outline"
                      size="sm"
                      :disabled="selectedProcesses.length === 0"
                    >
                      Clear Flow
                    </RsButton>
                  </div>
                  <draggable
                    v-model="selectedProcesses"
                    tag="ul"
                    class="space-y-2 min-h-[48px] border rounded-lg p-3 bg-white"
                    :animation="200"
                    item-key="kodProses"
                  >
                    <template #item="{ element, index }">
                      <li class="flex items-center space-x-3 p-2 bg-gray-50 rounded-md border">
                        <Icon name="ic:round-drag-indicator" class="text-gray-400 cursor-move" size="18" />
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {{ index + 1 }}
                        </div>
                        <div class="flex-1">
                          <div class="font-medium text-sm">{{ getProcessName(element) }}</div>
                          <div class="text-xs text-gray-500">{{ getProcessPage(element) }}</div>
                        </div>
                        <button @click.stop="removeProcess(index)" class="p-1 text-red-400 hover:text-red-600" title="Remove from Flow">
                          <Icon name="ic:round-close" size="16" />
                        </button>
                      </li>
                    </template>
                  </draggable>
                  <div v-if="selectedProcesses.length === 0" class="text-xs text-gray-400 text-center py-4">
                    No processes selected. Click on a process from the left to add.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormKit>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton variant="secondary-outline" @click="closeModal"
            >Cancel</RsButton
          >
          <RsButton variant="primary" @click="submitComponent">{{
            isEditing ? "Update" : "Create"
          }}</RsButton>
        </div>
      </template>
    </RsModal>

    <!-- View Component Details Modal -->
    <RsModal
      v-model="showViewModal"
      title="Component Details"
      size="lg"
      position="center"
    >
      <template #body>
        <!-- Loading State -->
        <div
          v-if="viewModalLoading"
          class="flex justify-center items-center py-12"
        >
          <div class="text-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
            ></div>
            <p class="text-gray-600">Loading component details...</p>
          </div>
        </div>

        <!-- Component Details -->
        <div v-else-if="viewingComponent" class="space-y-6">
          <!-- Component Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              Component Information
            </h3>
            <div class="grid grid-cols-1 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700">Component Code:</span>
                <p class="text-gray-900 font-mono text-xs">
                  {{ viewingComponent.kodKomponen }}
                </p>
              </div>
              <div>
                <span class="font-medium text-gray-700">Name:</span>
                <p class="text-gray-900">
                  {{ viewingComponent.namaPendaftaran }}
                </p>
              </div>
              <div>
                <span class="font-medium text-gray-700">Description:</span>
                <p class="text-gray-900">
                  {{
                    viewingComponent.description || "No description provided"
                  }}
                </p>
              </div>
              <div
                v-if="viewingComponent.createdAt || viewingComponent.updatedAt"
                class="grid grid-cols-2 gap-4"
              >
                <div v-if="viewingComponent.createdAt">
                  <span class="font-medium text-gray-700">Created:</span>
                  <p class="text-gray-900 text-xs">
                    {{ new Date(viewingComponent.createdAt).toLocaleString() }}
                  </p>
                </div>
                <div v-if="viewingComponent.updatedAt">
                  <span class="font-medium text-gray-700">Last Updated:</span>
                  <p class="text-gray-900 text-xs">
                    {{ new Date(viewingComponent.updatedAt).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Flow Summary -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-medium text-gray-900">
                Process Flow Summary
              </h3>
              <RsBadge variant="primary" size="sm">
                {{ viewingComponent.processes?.length || 0 }} Steps
              </RsBadge>
            </div>
            <div class="text-sm text-gray-700">
              <p>
                This component contains
                <strong>{{ viewingComponent.processes?.length || 0 }}</strong>
                process steps that will be executed in the order shown below.
              </p>
            </div>
          </div>

          <!-- Process Flow -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              Process Flow Details
            </h3>
            <div
              v-if="
                viewingComponent.processes &&
                viewingComponent.processes.length > 0
              "
              class="space-y-3"
            >
              <div
                v-for="(process, index) in viewingComponent.processes"
                :key="process.kodProses"
                class="border rounded-lg overflow-hidden"
              >
                <!-- Process Header -->
                <div
                  class="flex items-center space-x-3 p-4 bg-gray-50 border-b"
                >
                  <!-- Step Number -->
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {{ process.flowOrder || index + 1 }}
                  </div>

                  <!-- Process Info -->
                  <div class="flex-1">
                    <div class="font-semibold text-gray-900">
                      {{ process.namaProses }}
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ process.idPage }}
                    </div>
                  </div>

                  <!-- Process Code Badge -->
                  <RsBadge variant="primary" size="md">{{
                    process.kodProses
                  }}</RsBadge>
                </div>

                <!-- Process Details -->
                <div class="p-4 bg-white">
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-700"
                        >Process Code:</span
                      >
                      <p class="text-gray-900 font-mono">
                        {{ process.kodProses }}
                      </p>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Page Route:</span>
                      <p class="text-gray-900 font-mono">
                        {{ process.idPage }}
                      </p>
                    </div>
                    <div class="col-span-2">
                      <span class="font-medium text-gray-700"
                        >Process Name:</span
                      >
                      <p class="text-gray-900">{{ process.namaProses }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <Icon
                name="ic:round-playlist-remove"
                class="mx-auto mb-3"
                size="32"
              />
              <p class="text-lg font-medium mb-1">No Processes Included</p>
              <p class="text-sm">
                This component doesn't have any processes configured yet.
              </p>
            </div>
          </div>

          <!-- Workflow Preview -->
          <div
            v-if="
              viewingComponent.processes &&
              viewingComponent.processes.length > 0
            "
            class="bg-green-50 p-4 rounded-lg"
          >
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              Workflow Preview
            </h3>
            <div class="text-sm text-gray-700 space-y-2">
              <p>
                When this component is executed, users will follow this
                workflow:
              </p>
              <ol class="list-decimal list-inside space-y-1 ml-4">
                <li
                  v-for="process in viewingComponent.processes"
                  :key="process.kodProses"
                  class="text-gray-800"
                >
                  <span class="font-medium">{{ process.namaProses }}</span>
                  <span class="text-gray-600"> ({{ process.idPage }})</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            <span
              v-if="
                !viewModalLoading &&
                viewingComponent?.processes &&
                viewingComponent.processes.length > 0
              "
            >
              Total: {{ viewingComponent.processes.length }} process{{
                viewingComponent.processes.length !== 1 ? "es" : ""
              }}
            </span>
          </div>
          <div class="flex gap-2">
            <RsButton
              variant="secondary-outline"
              @click="closeViewModal"
              :disabled="viewModalLoading"
            >
              Close
            </RsButton>
            <RsButton
              variant="primary"
              @click="editComponent({ actions: viewingComponent.id })"
              v-if="!viewModalLoading && viewingComponent?.id"
            >
              Edit Component
            </RsButton>
          </div>
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
            Are you sure you want to delete this component?
          </p>
          <p class="text-gray-600">
            <span class="font-medium">{{
              componentToDelete?.namaPendaftaran
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
          <RsButton variant="danger" @click="deleteComponent">Delete</RsButton>
        </div>
      </template>
    </RsModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useToast } from "~/composables/useToast";
import { useApiFetching } from "~/composables/useApiFetching";
import draggable from "vuedraggable";

console.log("📄 Components page script setup executed");

definePageMeta({
  title: "Admin Profiling Component Configuration",
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
      name: "Components",
      type: "current",
    },
  ],
});

// Route guard to prevent content persistence
const route = useRoute();
const router = useRouter();
const apiRequest = useApiFetching();

// Toast notifications
const toast = useToast();

// Watch for route changes to clean up state
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      console.log("🧹 Route changed - cleaning up components page state");
      // Clean up state when navigating away
      components.value = [];
      processes.value = [];
      loading.value = false;
      processesLoading.value = false;
      showModal.value = false;
      showViewModal.value = false;
      showDeleteModal.value = false;
      isEditing.value = false;
      currentComponent.value = {
        id: null,
        namaPendaftaran: "",
        description: "",
        processes: [],
      };
      selectedProcesses.value = [];
      viewingComponent.value = null;
      componentToDelete.value = null;
      viewModalLoading.value = false;
    }
  },
  { immediate: false }
);

// Table data
const components = ref([]);
const processes = ref([]);
const loading = ref(false);
const processesLoading = ref(false);

// Modal control
const showModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const currentComponent = ref({
  id: null,
  namaPendaftaran: "",
  description: "",
  processes: [],
});
const selectedProcesses = ref([]);
const viewingComponent = ref(null);
const componentToDelete = ref(null);
const viewModalLoading = ref(false);

// Computed properties
const availableProcesses = computed(() => {
  return processes.value.filter((process) => process.status !== 0); // Only active processes
});

// Add a computed for availableProcessesForSelection
const availableProcessesForSelection = computed(() => {
  return processes.value.filter(
    (process) => !selectedProcesses.value.includes(process.kodProses) && process.status !== 0
  );
});

// Load components on mount
const loadComponents = async () => {
  console.log("🔄 Starting loadComponents function");

  // Don't reload if already loading
  if (loading.value) {
    console.log("⏳ Already loading components, skipping...");
    return;
  }

  loading.value = true;

  try {
    console.log("📡 Calling componentApi.getAll()...");
    const response = await apiRequest("/configuration/profiling/component", {
      method: "GET",
    });
    console.log("✅ Components API Response received:", response);

    if (response && Array.isArray(response)) {
      components.value = response.map((component) => {
        // Handle kodProses - it might be a JSON string or array
        let processCodes = [];
        if (typeof component.kodProses === "string") {
          try {
            processCodes = JSON.parse(component.kodProses);
          } catch (e) {
            console.warn(
              "Failed to parse kodProses JSON:",
              component.kodProses
            );
            processCodes = [];
          }
        } else if (Array.isArray(component.kodProses)) {
          processCodes = component.kodProses;
        }

        return {
          kodKomponen: component.kodKomponen,
          namaPendaftaran: component.namaPendaftaran,
          description: component.description,
          processCount: processCodes.length,
          // processes: processCodes.join(", "), // Show just the process codes for table display
          actions: component.id,
          // Store original component data for editing
          // originalData: component,
        };
      });
      console.log("📊 Final components array:", components.value);
    } else {
      console.warn("⚠️ Components response is not an array:", response);
      // Fallback to mock data for development
      const mockComponents = [
        {
          id: 1,
          kodKomponen: "COMP_001",
          namaPendaftaran: "Profiling - Full Registration",
          description: "Complete registration process for new users",
          processes: [
            {
              kodProses: "PROF_001",
              namaProses: "Personal Information",
              idPage: "/profiling/personal",
              flowOrder: 1,
            },
            {
              kodProses: "PROF_002",
              namaProses: "Document Upload",
              idPage: "/profiling/documents",
              flowOrder: 2,
            },
            {
              kodProses: "PROF_003",
              namaProses: "Verification",
              idPage: "/profiling/verify",
              flowOrder: 3,
            },
          ],
        },
        {
          id: 2,
          kodKomponen: "COMP_002",
          namaPendaftaran: "Profiling - Basic Registration",
          description: "Basic registration for quick setup",
          processes: [
            {
              kodProses: "PROF_001",
              namaProses: "Personal Information",
              idPage: "/profiling/personal",
              flowOrder: 1,
            },
          ],
        },
      ];

      components.value = mockComponents.map((component) => ({
        kodKomponen: component.kodKomponen,
        namaPendaftaran: component.namaPendaftaran,
        description: component.description,
        processCount: component.processes.length,
        processes: component.processes.map((p) => p.kodProses).join(", "), // Show just the process codes for table display
        actions: component.id,
        processesData: component.processes, // Keep full process data for modals
      }));
    }
  } catch (error) {
    console.error("❌ Error loading components:", error);
    toast.error("Failed to load components");
    components.value = [];
  } finally {
    loading.value = false;
    console.log("✅ Components loading state set to false");
  }
};

// Refresh components with enriched process data
const refreshComponentsWithProcesses = async () => {
  console.log("🔄 Refreshing components with process data");
  if (components.value.length > 0) {
    const response = await apiRequest("/configuration/profiling/component", {
      method: "GET",
    });
    if (response && Array.isArray(response)) {
      components.value = response.map((component) => {
        // Handle kodProses - it might be a JSON string or array
        let processCodes = [];
        if (typeof component.kodProses === "string") {
          try {
            processCodes = JSON.parse(component.kodProses);
          } catch (e) {
            console.warn(
              "Failed to parse kodProses JSON:",
              component.kodProses
            );
            processCodes = [];
          }
        } else if (Array.isArray(component.kodProses)) {
          processCodes = component.kodProses;
        }

        // Enrich process codes with full process details
        const enrichedProcesses = processCodes.map((processCode, index) => {
          const process = processes.value.find(
            (p) => p.kodProses === processCode
          );
          return process
            ? {
                kodProses: process.kodProses,
                namaProses: process.namaProses,
                idPage: process.idPage,
                flowOrder: index + 1,
              }
            : {
                kodProses: processCode,
                namaProses: "Unknown Process",
                idPage: "/unknown",
                flowOrder: index + 1,
              };
        });

        return {
          kodKomponen: component.kodKomponen,
          namaPendaftaran: component.namaPendaftaran,
          description: component.description,
          processCount: processCodes.length,
          // processes: processCodes.join(", "), // Show just the process codes for table display
          actions: component.id,
          // processesData: enrichedProcesses, // Keep full process data for modals
          // Store original component data for editing
          // originalData: component,
        };
      });
      console.log("📊 Refreshed components array:", components.value);
    }
  }
};

// Load processes for selection
const loadProcesses = async () => {
  console.log("🔄 Starting loadProcesses function");

  // Don't reload if already loading
  if (processesLoading.value) {
    console.log("⏳ Already loading processes, skipping...");
    return;
  }

  processesLoading.value = true;

  try {
    console.log("📡 Calling processApi.getAll()...");
    const response = await apiRequest("/configuration/profiling/process", {
      method: "GET",
    });
    console.log("✅ Processes API Response received:", response);

    if (response && Array.isArray(response)) {
      processes.value = response;
      console.log("📊 Final processes array:", processes.value);

      // Refresh components with process data after processes are loaded
      await refreshComponentsWithProcesses();
    } else {
      console.warn("⚠️ Processes response is not an array:", response);
      processes.value = [];
    }
  } catch (error) {
    console.error("❌ Error loading processes:", error);
    toast.error("Failed to load processes");
    processes.value = [];
  } finally {
    processesLoading.value = false;
    console.log("✅ Processes loading state set to false");
  }
};

// Watch for route changes to reload data when entering the page
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (
      newPath === "/admin/configuration/profiling/components" &&
      oldPath &&
      oldPath !== newPath
    ) {
      console.log("🔄 Entering components page - reloading data");
      loadProcesses();
      loadComponents();
    }
  },
  { immediate: false }
);

onMounted(async () => {
  console.log("🚀 Component mounted");
  console.log("📍 Current route:", route.path);

  // Load processes first, then components
  await loadProcesses();
  await loadComponents();

  // Safety timeout to ensure loading stops
  setTimeout(() => {
    if (loading.value) {
      console.warn(
        "⚠️ Components loading timeout reached, forcing loading to stop"
      );
      loading.value = false;
    }
    if (processesLoading.value) {
      console.warn(
        "⚠️ Processes loading timeout reached, forcing loading to stop"
      );
      processesLoading.value = false;
    }
  }, 10000); // 10 seconds timeout
});

// Watch for modal state changes to reset form when modal is closed
watch(showModal, (newValue) => {
  if (!newValue && !isEditing.value) {
    // Modal was closed and we're not in editing mode, reset form
    resetFormState();
  }
});

// Watch for view modal state changes to reset when closed
watch(showViewModal, (newValue) => {
  if (!newValue) {
    // View modal was closed, reset state
    viewingComponent.value = null;
    viewModalLoading.value = false;
  }
});

// Reset form state
const resetFormState = () => {
  isEditing.value = false;
  currentComponent.value = {
    id: null,
    namaPendaftaran: "",
    description: "",
    processes: [],
  };
  selectedProcesses.value = [];
};

// Open add modal
const openAddModal = () => {
  resetFormState();
  showModal.value = true;
};

// Close modal and reset form
const closeModal = () => {
  showModal.value = false;
  resetFormState();
};

// Close view modal and reset state
const closeViewModal = () => {
  showViewModal.value = false;
  viewingComponent.value = null;
  viewModalLoading.value = false;
};

// Edit component
const editComponent = async (component) => {
  console.log("🔄 Edit component called with:", component);
  isEditing.value = true;

  try {
    // Try to fetch the latest component data from the API
    console.log(
      "📡 Fetching component data for kodKomponen:",
      component.kodKomponen
    );
    const componentData = await apiRequest(
      `/configuration/profiling/component/${component.kodKomponen}`,
      {
        method: "GET",
      }
    );
    console.log("✅ Fetched component data:", componentData);

    if (componentData) {
      // Parse the kodProses from the fetched data
      let processCodes = [];
      if (typeof componentData.kodProses === "string") {
        try {
          processCodes = JSON.parse(componentData.kodProses);
        } catch (e) {
          console.warn(
            "Failed to parse kodProses JSON:",
            componentData.kodProses
          );
          processCodes = [];
        }
      } else if (Array.isArray(componentData.kodProses)) {
        processCodes = componentData.kodProses;
      }

      // Set current component data
      currentComponent.value = {
        id: componentData.id || component.actions,
        kodKomponen: componentData.kodKomponen,
        namaPendaftaran: componentData.namaPendaftaran,
        description: componentData.description || "",
        processes: [],
      };

      // Set selected processes
      selectedProcesses.value = processCodes;

      console.log("✅ Set current component:", currentComponent.value);
      console.log("✅ Set selected processes:", selectedProcesses.value);
    } else {
      // Fallback to local data if API call fails
      console.warn("⚠️ API call failed, using local data");
      const actualComponent = components.value.find(
        (c) => c.actions === component.actions
      );

      if (actualComponent) {
        const localComponentData =
          actualComponent.originalData || actualComponent;

        currentComponent.value = {
          id: actualComponent.actions,
          kodKomponen: actualComponent.kodKomponen,
          namaPendaftaran:
            localComponentData.namaPendaftaran || actualComponent.name,
          description:
            localComponentData.description || actualComponent.description,
          processes: actualComponent.processesData || [],
        };

        if (
          actualComponent.processesData &&
          actualComponent.processesData.length > 0
        ) {
          selectedProcesses.value = actualComponent.processesData.map(
            (p) => p.kodProses
          );
        } else {
          if (
            actualComponent.processes &&
            typeof actualComponent.processes === "string"
          ) {
            try {
              const processCodes = actualComponent.processes
                .split(", ")
                .filter((code) => code.trim());
              selectedProcesses.value = processCodes;
            } catch (e) {
              console.warn(
                "Failed to parse processes string:",
                actualComponent.processes
              );
              selectedProcesses.value = [];
            }
          } else {
            selectedProcesses.value = [];
          }
        }
      } else {
        console.error("❌ Component not found for editing");
        toast.error("Component not found");
        return;
      }
    }
  } catch (error) {
    console.error("❌ Error fetching component data:", error);
    toast.error("Failed to load component data for editing");
    return;
  }

  showModal.value = true;
};

// View component details
const viewComponent = async (component) => {
  console.log("🔄 View component called with:", component);

  // Show modal first, then load data
  showViewModal.value = true;
  viewModalLoading.value = true;
  viewingComponent.value = null;

  try {
    // Fetch the latest component data from the API
    console.log(
      "📡 Fetching component data for viewing ID:",
      component.kodKomponen
    );
    const componentData = await apiRequest(
      `/configuration/profiling/component/${component.kodKomponen}`,
      {
        method: "GET",
      }
    );
    console.log("✅ Fetched component data for viewing:", componentData);

    if (componentData) {
      // Parse the kodProses from the fetched data
      let processCodes = [];
      if (typeof componentData.kodProses === "string") {
        try {
          processCodes = JSON.parse(componentData.kodProses);
        } catch (e) {
          console.warn(
            "Failed to parse kodProses JSON:",
            componentData.kodProses
          );
          processCodes = [];
        }
      } else if (Array.isArray(componentData.kodProses)) {
        processCodes = componentData.kodProses;
      }

      // Enrich process codes with full process details
      const enrichedProcesses = processCodes.map((processCode, index) => {
        const process = processes.value.find(
          (p) => p.kodProses === processCode
        );
        return process
          ? {
              kodProses: process.kodProses,
              namaProses: process.namaProses,
              idPage: process.idPage,
              flowOrder: index + 1,
            }
          : {
              kodProses: processCode,
              namaProses: "Unknown Process",
              idPage: "/unknown",
              flowOrder: index + 1,
            };
      });

      viewingComponent.value = {
        id: componentData.id || component.actions,
        kodKomponen: componentData.kodKomponen,
        namaPendaftaran: componentData.namaPendaftaran,
        description: componentData.description || "",
        processes: enrichedProcesses,
        createdAt: componentData.createdAt,
        updatedAt: componentData.updatedAt,
      };

      console.log("✅ Set viewing component:", viewingComponent.value);
    } else {
      // Fallback to local data if API call fails
      console.warn("⚠️ API call failed, using local data for viewing");
      const actualComponent = components.value.find(
        (c) => c.actions === component.actions
      );

      if (actualComponent) {
        // Enrich local data with process details
        let processCodes = [];
        if (
          actualComponent.processesData &&
          actualComponent.processesData.length > 0
        ) {
          processCodes = actualComponent.processesData.map((p) => p.kodProses);
        } else if (
          actualComponent.processes &&
          typeof actualComponent.processes === "string"
        ) {
          try {
            processCodes = actualComponent.processes
              .split(", ")
              .filter((code) => code.trim());
          } catch (e) {
            console.warn(
              "Failed to parse processes string:",
              actualComponent.processes
            );
            processCodes = [];
          }
        }

        const enrichedProcesses = processCodes.map((processCode, index) => {
          const process = processes.value.find(
            (p) => p.kodProses === processCode
          );
          return process
            ? {
                kodProses: process.kodProses,
                namaProses: process.namaProses,
                idPage: process.idPage,
                flowOrder: index + 1,
              }
            : {
                kodProses: processCode,
                namaProses: "Unknown Process",
                idPage: "/unknown",
                flowOrder: index + 1,
              };
        });

        viewingComponent.value = {
          id: actualComponent.actions,
          kodKomponen: actualComponent.kodKomponen,
          namaPendaftaran: actualComponent.name,
          description: actualComponent.description || "",
          processes: enrichedProcesses,
        };
      } else {
        console.error("❌ Component not found for viewing");
        toast.error("Component not found");
        return;
      }
    }
  } catch (error) {
    console.error("❌ Error fetching component data for viewing:", error);
    toast.error("Failed to load component data for viewing");
    showViewModal.value = false;
  } finally {
    viewModalLoading.value = false;
  }
};

// Toggle process selection
const toggleProcess = (processCode) => {
  console.log("🔄 Toggle process:", processCode);
  console.log("📋 Current selected processes:", selectedProcesses.value);

  const index = selectedProcesses.value.indexOf(processCode);
  if (index > -1) {
    selectedProcesses.value.splice(index, 1);
    console.log("❌ Removed process:", processCode);
  } else {
    selectedProcesses.value.push(processCode);
    console.log("✅ Added process:", processCode);
  }

  console.log("📋 Updated selected processes:", selectedProcesses.value);
};

// Select all processes
const selectAllProcesses = () => {
  selectedProcesses.value = availableProcesses.value.map((p) => p.kodProses);
};

// Clear selected processes
const clearProcessFlow = () => {
  selectedProcesses.value = [];
};

// Add process to selected list
const addProcess = (processCode) => {
  if (!selectedProcesses.value.includes(processCode)) {
    selectedProcesses.value.push(processCode);
  }
};

// Move process up in the flow
const moveProcessUp = (index) => {
  if (index > 0) {
    const [item] = selectedProcesses.value.splice(index, 1);
    selectedProcesses.value.splice(index - 1, 0, item);
  }
};

// Move process down in the flow
const moveProcessDown = (index) => {
  if (index < selectedProcesses.value.length - 1) {
    const [item] = selectedProcesses.value.splice(index, 1);
    selectedProcesses.value.splice(index + 1, 0, item);
  }
};

// Remove process from the flow
const removeProcess = (index) => {
  selectedProcesses.value.splice(index, 1);
};

// Get process name by code
const getProcessName = (processCode) => {
  const process = processes.value.find((p) => p.kodProses === processCode);
  return process ? process.namaProses : processCode;
};

// Get process page by code
const getProcessPage = (processCode) => {
  const process = processes.value.find((p) => p.kodProses === processCode);
  return process ? process.idPage : processCode;
};

// Submit component (create or update)
const submitComponent = async () => {
  console.log("🔄 Submit component called, isEditing:", isEditing.value);

  // Form validation
  if (!currentComponent.value.namaPendaftaran?.trim()) {
    toast.error("Please fill in the component name");
    return;
  }

  if (selectedProcesses.value.length === 0) {
    toast.error("Please select at least one process for the workflow");
    return;
  }

  try {
    // Prepare component data - API expects array of objects with kodProses property
    const componentData = {
      namaPendaftaran: currentComponent.value.namaPendaftaran.trim(),
      description: currentComponent.value.description?.trim() || "",
      kodProses: selectedProcesses.value.map((processCode) => ({
        kodProses: processCode,
      })),
    };

    console.log("📤 Prepared component data:", componentData);

    if (isEditing.value) {
      // Update existing component
      console.log("🔄 Updating component ID:", currentComponent.value.id);
      console.log("📤 Update payload:", componentData);

      const updateResult = await apiRequest(
        `/configuration/profiling/component/${currentComponent.value.id}`,
        {
          method: "PATCH",
          body: componentData,
        }
      );
      console.log("✅ Update result:", updateResult);

      toast.success("Component updated successfully");
    } else {
      // Create new component
      console.log("🆕 Creating new component");
      console.log("📤 Create payload:", componentData);

      const createResult = await apiRequest(
        "/configuration/profiling/component",
        {
          method: "POST",
          body: componentData,
        }
      );
      console.log("✅ Create result:", createResult);

      toast.success("New component created successfully");
    }

    // Reload components with enriched process data
    await refreshComponentsWithProcesses();

    // Close modal and reset form
    closeModal();
  } catch (error) {
    console.error("❌ Error submitting component:", error);

    // Provide more specific error messages
    if (error.response?.status === 409) {
      toast.error("A component with this name already exists");
    } else if (error.response?.status === 404) {
      toast.error("Component not found for update");
    } else if (error.response?.status === 400) {
      toast.error("Invalid data provided. Please check your input.");
    } else {
      toast.error("Failed to save component. Please try again.");
    }
  }
};

// Confirm delete component
const confirmDeleteComponent = (component) => {
  componentToDelete.value = component;
  showDeleteModal.value = true;
};

// Delete component
const deleteComponent = async () => {
  if (componentToDelete.value) {
    try {
      console.log("🗑️ Deleting component:", componentToDelete.value);
      await apiRequest(
        `/configuration/profiling/component/${componentToDelete.value.actions}`,
        {
          method: "DELETE",
        }
      );
      toast.success("Component deleted successfully");
      showDeleteModal.value = false;
      componentToDelete.value = null;

      // Reload components with enriched process data
      await refreshComponentsWithProcesses();
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("Failed to delete component");
    }
  }
};
</script>

<style lang="scss" scoped>
// You can add custom styles here if needed
</style>
