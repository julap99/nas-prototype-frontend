<template>
  <div class="space-y-6" :key="route.fullPath">
    <LayoutsBreadcrumb />

    <!-- Page header with title and add button -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Category Management</h1>
      <RsButton @click="openAddModal" variant="primary" size="md">
        <Icon name="ic:round-add" class="mr-2" />
        Add New Category
      </RsButton>
    </div>

    <!-- Category table -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
      <span class="ml-2 text-gray-600">Loading categories...</span>
    </div>

    <RsTable
      v-if="!loading && categories && categories.length >= 0"
      :data="categories"
      :key="`categories-table-${categories.length}-${Date.now()}`"
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
            @click="toggleCategoryStatus(value)"
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
            @click="editCategory(value)"
            class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit Category"
          >
            <Icon name="ic:round-edit" size="18" />
          </button>
          <button
            @click="confirmDeleteCategory(value)"
            class="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete Category"
          >
            <Icon name="ic:round-delete" size="18" />
          </button>
        </div>
      </template>
    </RsTable>

    <!-- No data message -->
    <div
      v-if="!loading && (!categories || categories.length === 0)"
      class="text-center py-8"
    >
      <Icon
        name="ic:round-inbox"
        size="48"
        class="mx-auto text-gray-400 mb-4"
      />
      <p class="text-gray-500 text-lg">No categories found</p>
      <p class="text-gray-400">Create your first category to get started</p>
    </div>

    <!-- Add/Edit Category Modal -->
    <RsModal
      v-model="showModal"
      :title="isEditing ? 'Edit Category' : 'Add New Category'"
      size="md"
      position="center"
    >
      <template #body>
        <FormKit type="form" @submit="submitCategory" :actions="false">
          <FormKit
            name="namaKategori"
            label="Category Name"
            type="text"
            validation="required"
            :value="currentCategory.namaKategori"
            @input="currentCategory.namaKategori = $event"
            placeholder="Enter category name"
          />

          <FormKit
            name="description"
            label="Description"
            type="textarea"
            :value="currentCategory.description"
            @input="currentCategory.description = $event"
            placeholder="Enter category description (optional)"
            help="Provide a brief description of this category"
            rows="3"
          />
        </FormKit>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton variant="secondary-outline" @click="showModal = false"
            >Cancel</RsButton
          >
          <RsButton variant="primary" @click="submitCategory">{{
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
            Are you sure you want to delete this category?
          </p>
          <p class="text-gray-600">
            <span class="font-medium">{{
              categoryToDelete?.namaKategori || "Unknown Category"
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
          <RsButton variant="danger" @click="deleteCategory">Delete</RsButton>
        </div>
      </template>
    </RsModal>

    <!-- Processes Affected Modal -->
    <RsModal
      v-model="showProcessesAffectedModal"
      title="Cannot Delete Category"
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
              Cannot Delete Category
            </p>
            <p class="text-gray-600 mb-4">
              This category is currently being used by the following processes:
            </p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div
              v-for="process in affectedProcesses"
              :key="process.id"
              class="mb-3 p-3 bg-white rounded border"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">
                    {{ process.namaProses }}
                  </h4>
                  <p
                    v-if="process.description"
                    class="text-sm text-gray-600 mt-1"
                  >
                    {{ process.description }}
                  </p>
                </div>
                <div class="ml-4">
                  <NuxtLink
                    :to="`/admin/configuration/profiling/process`"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Process
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">
              <Icon name="ic:round-info" class="inline mr-1" size="16" />
              To delete this category, you must first remove it from all
              processes that use it.
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton
            variant="primary"
            @click="showProcessesAffectedModal = false"
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
  title: "Admin Profiling Category Configuration",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Configuration",
      url: "/admin/configuration/profiling/category",
    },
    {
      name: "Profiling",
      url: "/admin/configuration/profiling/category",
    },
    {
      name: "Category",
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
      console.log("🧹 Route changed - cleaning up category page state");
      // Clean up state when navigating away
      categories.value = [];
      loading.value = false;
      showModal.value = false;
      showDeleteModal.value = false;
      showProcessesAffectedModal.value = false;
      isEditing.value = false;
      currentCategory.value = {
        id: null,
        namaKategori: "",
        description: "",
      };
      categoryToDelete.value = null;
      affectedProcesses.value = [];
    }
  },
  { immediate: false }
);

// Toast notifications
const toast = useToast();

// Table data
const categories = ref([]);
const loading = ref(false);

// Modal control
const showModal = ref(false);
const showDeleteModal = ref(false);
const showProcessesAffectedModal = ref(false);
const isEditing = ref(false);
const currentCategory = ref({
  id: null,
  namaKategori: "",
  description: "",
});
const categoryToDelete = ref(null);
const affectedProcesses = ref([]);

// Load categories on mount
const loadCategories = async () => {
  console.log("🔄 Starting loadCategories function");
  console.log("📊 Current categories state:", categories.value);
  console.log("📍 Current route:", route.path);

  // Don't reload if already loading
  if (loading.value) {
    console.log("⏳ Already loading, skipping...");
    return;
  }

  // Reset state before loading
  categories.value = [];
  loading.value = true;
  console.log("⏳ Loading state set to true");

  try {
    console.log("📡 Calling categoryApi.getAll()...");

    const response = await apiRequest("/configuration/profiling/category", {
      method: "GET",
    });

    console.log("✅ API Response received:", response);

    if (response && Array.isArray(response)) {
      const mappedCategories = response.map((category) => {
        const mappedCategory = {
          name: category?.namaKategori || "",
          description: category?.description || "",
          status: category?.status || 0,
          categoryCode: category?.kodKategori || "",
          actions: category?.kodKategori || "",
        };
        console.log("🔄 Mapped category:", mappedCategory);
        return mappedCategory;
      });

      // Use nextTick to ensure DOM is updated
      await nextTick();
      categories.value = mappedCategories;
      console.log("📊 Final categories array:", categories.value);
    } else {
      console.warn("⚠️ Response is not an array:", response);
      categories.value = [];
    }
  } catch (error) {
    console.error("❌ Error loading categories:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response,
    });
    toast.error("Failed to load categories");
    categories.value = [];
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
      newPath === "/admin/configuration/profiling/category" &&
      oldPath &&
      oldPath !== newPath
    ) {
      console.log("🔄 Entering category page - reloading data");
      loadCategories();
    }
  },
  { immediate: false }
);

onMounted(() => {
  console.log("🚀 Component mounted");
  console.log("📍 Current route:", route.path);

  loadCategories();

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
  categories.value = [];
  loading.value = false;
  showModal.value = false;
  showDeleteModal.value = false;
  showProcessesAffectedModal.value = false;
  isEditing.value = false;
  currentCategory.value = {
    id: null,
    namaKategori: "",
    description: "",
  };
  categoryToDelete.value = null;
  affectedProcesses.value = [];
});

// Open add modal
const openAddModal = () => {
  isEditing.value = false;
  currentCategory.value = {
    id: null,
    namaKategori: "",
    description: "",
  };
  showModal.value = true;
};

// Edit category
const editCategory = (category) => {
  isEditing.value = true;
  currentCategory.value = {
    kodKategori: category.categoryCode || "",
    namaKategori: category.name || "",
    description: category.description || "",
  };
  showModal.value = true;
};

// Submit category (create or update)
const submitCategory = async () => {
  // Form validation (basic)
  if (!currentCategory.value.namaKategori) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    if (isEditing.value) {
      // Update existing category
      console.log("🔄 Updating category:", currentCategory.value);
      await apiRequest(
        `/configuration/profiling/category/${currentCategory.value.kodKategori}`,
        {
          method: "PATCH",
          body: {
            namaKategori: currentCategory.value.namaKategori,
            description: currentCategory.value.description,
          },
        }
      );
      toast.success("Category updated successfully");
    } else {
      // Create new category
      console.log("🆕 Creating new category:", currentCategory.value);
      await apiRequest("/configuration/profiling/category", {
        method: "POST",
        body: {
          namaKategori: currentCategory.value.namaKategori,
          description: currentCategory.value.description,
        },
      });
      toast.success("New category created successfully");
    }

    // Reload categories
    await loadCategories();

    // Close modal
    showModal.value = false;
  } catch (error) {
    console.error("Error submitting category:", error);
    toast.error("Failed to save category");
  }
};

// Confirm delete category
const confirmDeleteCategory = (category) => {
  categoryToDelete.value = category;
  showDeleteModal.value = true;
};

// Toggle category status
const toggleCategoryStatus = async (category) => {
  try {
    const newStatus = category.status == 1 ? 0 : 1;
    console.log(
      "🔄 Toggling category status:",
      category.categoryCode,
      "to",
      newStatus
    );

    await apiRequest(`/configuration/profiling/category/${category.categoryCode}/status`, {
      method: "PUT",
      body: {
        status: newStatus,
      },
    });

    // Update the local state immediately for better UX
    category.status = newStatus;

    toast.success(
      `Category ${newStatus == 1 ? "activated" : "deactivated"} successfully`
    );
  } catch (error) {
    console.error("Error toggling category status:", error);
    toast.error("Failed to update category status");
  }
};

// Delete category
const deleteCategory = async () => {
  if (categoryToDelete.value) {
    try {
      console.log("🗑️ Deleting category:", categoryToDelete.value);

      // Use the categoryCode (which is the kodKategori) for deletion
      const categoryIdentifier = categoryToDelete.value.categoryCode;

      if (!categoryIdentifier) {
        console.error("❌ No category code found for deletion");
        toast.error("Cannot delete category: missing category code");
        return;
      }

      console.log("🔍 Using category identifier:", categoryIdentifier);
      const response = await apiRequest(`/configuration/profiling/category/${categoryIdentifier}`, {
        method: "DELETE",
      });

      console.log("📡 Delete response:", response);

      if (response.success) {
        toast.success("Category deleted successfully");
        showDeleteModal.value = false;
        categoryToDelete.value = null;

        // Reload categories
        await loadCategories();
      } else {
        console.error("❌ Delete failed");
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
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