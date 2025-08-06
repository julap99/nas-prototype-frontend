<script setup>
import { useLayoutStore } from "~/stores/layout";
import { onMounted, onBeforeUnmount } from "vue";

const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;

const width = ref(0); // Initialize with 0 to prevent hydration mismatch
const windowWidth = ref(0); // Initialize with 0 to prevent hydration mismatch

const props = defineProps({
  field: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  basic: {
    type: Boolean,
    default: true,
  },
  advanced: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => ({
      variant: "default",
      striped: false,
      bordered: false,
      borderless: false,
      hover: false,
    }),
  },
  optionsAdvanced: {
    type: Object,
    default: () => ({
      sortable: true,
      filterable: true,
      responsive: false,
      outsideBorder: false,
    }),
  },
  grid: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  sort: {
    type: Object,
    default: () => ({
      column: "",
      direction: "asc",
    }),
  },
});

// Default variable
const columnTitle = ref([]);
const dataTable = ref([]);
const dataTitle = ref([]);
const dataLength = ref(0);

// Clean up function to reset all table state
const resetTableState = () => {
  columnTitle.value = [];
  dataTable.value = [];
  dataTitle.value = [];
  dataLength.value = 0;
  currentSort.value = 0;
  currentSortDir.value = "asc";
  currentPage.value = 1;
  pageSize.value = props.pageSize;
  keyword.value = "";
  filter.value = [];
  openFilter.value = false;
  showColumnSettings.value = false;
  columnVisibility.value = {};
  hideTable.value = false;
  sortColumnFirstTime.value = false;
};

// Advanced Option Variable
const currentSort = ref(0);
const currentSortDir = ref("asc");
const currentPage = ref(1);
const pageSize = ref(props.pageSize);
const maxPageShown = ref(3);

// Searching Variable
const keyword = ref("");

// Filtering Variable
const filter = ref([]);
const openFilter = ref(false);

// Column Visibility Variable
const showColumnSettings = ref(false);
const columnVisibility = ref({});

const hideTable = ref(false);

// Other Variable
const sortColumnFirstTime = ref(false);

const isDesktop = computed(() => {
  return windowWidth.value >= mobileWidth ? true : false;
});

if (props.optionsAdvanced.responsive) {
  if (isDesktop.value) {
    hideTable.value = false;
  } else {
    hideTable.value = true;
  }
}

const camelCasetoTitle = (str, exclusions = []) => {
  if (exclusions.includes(str)) {
    return str.replace(/([A-Z])/g, " $1").trim();
  } else if (/\(.*\)/.test(str)) {
    return str; // if the string contains parentheses, return the original string
  } else {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
      return str.toUpperCase();
    });
  }
};

const spacingCharactertoCamelCase = (array) => {
  // Loop array string and convert to camel case

  let result = [];

  array.forEach((element) => {
    // Handle both string and object elements
    let elementString = element;

    // If element is an object, try to get the label or key property
    if (typeof element === "object" && element !== null) {
      elementString = element.label || element.key || JSON.stringify(element);
    }

    // Ensure elementString is a string
    if (typeof elementString !== "string") {
      elementString = String(elementString);
    }

    if (
      elementString &&
      elementString.charAt(0) == elementString.charAt(0).toUpperCase()
    ) {
      // Camelcase the string and remove spacing
      // and if there is () in the string, do Uppercase inside the () and dont spacing it

      let camelCase = elementString
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => {
          return str.toUpperCase();
        })
        .replace(/\s/g, "");

      let resultCamelCase = camelCase.replace(/\(([^)]+)\)/, (str) => {
        return str.toUpperCase();
      });

      result.push(resultCamelCase);
    } else {
      result.push(elementString);
    }
  });

  // console.log(result);
  return result;
};

// Filter Functions (needed by column visibility functions)
const setFilter = (key, action, condition) => {
  // Check if key exist inside filter
  let index = filter.value.findIndex((item) => item.key === key);

  if (index == -1) {
    // If key not exist, insert new filter
    filter.value.push({
      key: key,
      action: {
        [action]: condition,
      },
    });
  } else {
    // If key exist, update filter
    filter.value[index].action[action] = condition;
  }
};

const getFilter = (key) => {
  let result = false;
  filter.value.forEach((item) => {
    if (item.key === key) {
      result = item.action.hide;
    }
  });
  return result;
};

const hideColumn = (key) => {
  if (!getFilter(key)) {
    // insert into filter variable to tell there is a change in filter
    setFilter(key, "hide", true);
  } else {
    // update filter variable to tell there is a change in filter
    setFilter(key, "hide", false);
  }
};

// Column Visibility Functions (defined before watch to avoid hoisting issues)
const initializeColumnVisibility = () => {
  const visibility = {};
  dataTitle.value.forEach((column) => {
    visibility[column] = true;
  });
  columnVisibility.value = visibility;
};

const toggleColumnVisibility = (columnKey) => {
  columnVisibility.value[columnKey] = !columnVisibility.value[columnKey];
  hideColumn(columnKey);
};

const showAllColumns = () => {
  Object.keys(columnVisibility.value).forEach((key) => {
    if (!columnVisibility.value[key]) {
      columnVisibility.value[key] = true;
      hideColumn(key);
    }
  });
};

const hideAllColumns = () => {
  Object.keys(columnVisibility.value).forEach((key) => {
    if (columnVisibility.value[key]) {
      columnVisibility.value[key] = false;
      hideColumn(key);
    }
  });
};

const getVisibleColumnsCount = () => {
  return Object.values(columnVisibility.value).filter((visible) => visible)
    .length;
};

const getTotalColumnsCount = () => {
  return Object.keys(columnVisibility.value).length;
};

// watch props.data change and redo all the data
watch(
  () => [props.data, props.field],
  () => {
    if (props.data && props.data.length > 0) {
      dataTable.value = props.data;
      dataLength.value = props.data.length;
      if (props.field && props.field.length > 0) {
        columnTitle.value = spacingCharactertoCamelCase(props.field);
        dataTitle.value = spacingCharactertoCamelCase(props.field);
      } else {
        columnTitle.value = Object.keys(dataTable.value[0]);
        dataTitle.value = Object.keys(dataTable.value[0]);
      }

      // Initialize column visibility
      initializeColumnVisibility();
    } else {
      dataTable.value = [];
      dataLength.value = 0;
      columnTitle.value = [];
      dataTitle.value = [];
    }
  },
  { immediate: true }
);

const setColumnTitle = (data) => {
  try {
    if (props.field && props.field.length == 0) {
      columnTitle.value = Object.keys(data);
    } else {
      columnTitle.value = spacingCharactertoCamelCase(props.field);
    }
  } catch (error) {
    console.log(error);
  }
};

const filteredDatabyTitle = (data, title) => {
  let result = "";
  try {
    if (props.field && props.field.length == 0) {
      Object.entries(data).forEach(([key, value]) => {
        if (key === title) {
          result = value;
          return;
        }
      });
    } else {
      // Get index title from columnTitle
      let index = columnTitle.value.indexOf(title);

      // Convert data json to array
      let arr = Object.values(data);

      result = arr[index];
    }
    if (result === "" || result === null) result = "-";
    return result;
  } catch (error) {
    console.log(error);
    return "-";
  }
};

// Window resize handler
const handleResize = () => {
  width.value = window.innerWidth;
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  // Set window width on mount to prevent hydration mismatch
  width.value = window.innerWidth;
  windowWidth.value = window.innerWidth;

  // Add resize listener
  window.addEventListener("resize", handleResize);

  if (dataTable.value.length > 0) {
    setColumnTitle(dataTable.value[0]);
  }
});

// Clean up on unmount
onUnmounted(() => {
  resetTableState();
  // Cleanup resize listener
  window.removeEventListener("resize", handleResize);
});

// Computed data
const computedData = computed(() => {
  let result = [];
  let totalData = 0;
  result = dataTable.value
    .slice()
    .sort((a, b) => {
      let modifier = 1;

      columnTitle.value.forEach((title, index) => {
        // console.log(title, props.sort.column);
        // First sort by column title
        if (title === props.sort.column && !sortColumnFirstTime.value) {
          currentSort.value = index;
          currentSortDir.value = props.sort.direction;
          sortColumnFirstTime.value = true;
        }
      });

      // Check if column title is number or string and convert spacing to camelcase
      let a1 = filteredDatabyTitle(a, columnTitle.value[currentSort.value]);
      let b1 = filteredDatabyTitle(b, columnTitle.value[currentSort.value]);

      if (typeof a1 === "string") a1 = a1.toLowerCase();
      if (typeof b1 === "string") b1 = b1.toLowerCase();

      // Convert string to number if possible
      if (isNumeric(a1)) a1 = parseFloat(a1);
      if (isNumeric(b1)) b1 = parseFloat(b1);

      if (currentSortDir.value === "desc") modifier = -1;
      if (a1 < b1) return -1 * modifier;
      if (a1 > b1) return 1 * modifier;
      return 0;
    })
    .filter((row) => {
      // Search all json object if keyword not equal null
      if (keyword.value === "") return true;
      let result = false;
      Object.entries(row).forEach(([key, value]) => {
        try {
          if (
            value.toString().toLowerCase().includes(keyword.value.toLowerCase())
          ) {
            result = true;
            currentPage.value = 1;
          }
        } catch (error) {
          result = false;
        }
      });
      return result;
    })
    .filter((_, index) => {
      let start = (currentPage.value - 1) * pageSize.value;
      let end = currentPage.value * pageSize.value;
      totalData++;
      if (index >= start && index < end) return true;
    });
  dataLength.value = totalData;
  return result;
});

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const totalEntries = computed(() => {
  return dataLength.value;
});

const sort = (index) => {
  if (index === currentSort.value) {
    currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
  } else if (index !== currentSort.value && currentSortDir.value == "desc") {
    currentSortDir.value = "asc";
  }
  currentSort.value = index;
};

const pages = computed(() => {
  let totalPG = Math.ceil(dataLength.value / pageSize.value);
  const numShown = Math.min(maxPageShown.value, totalPG);
  let first = currentPage.value - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, totalPG - numShown + 1);
  return [...Array(numShown)].map((k, i) => i + first);
});

const totalPage = computed(() => {
  return Math.ceil(dataLength.value / pageSize.value);
});

const pageChange = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value * pageSize.value < dataLength.value)
    currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const firstPage = () => {
  currentPage.value = 1;
};

const lastPage = () => {
  currentPage.value = totalPage.value;
};

// Click outside to close column settings
const closeColumnSettings = (event) => {
  if (!event.target.closest(".column-settings-container")) {
    showColumnSettings.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeColumnSettings);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeColumnSettings);
});

// Watch filter.value
watch(
  () => filter.value,
  () => {
    // console.log(filter.value);
    // Loop json object filter.value
    filter.value.forEach((item) => {
      // Hide Column
      if (item.action.hide) {
        // Get index title from columnTitle
        let index = columnTitle.value.indexOf(item.key);

        if (index !== -1) {
          // Remove column from columnTitle
          columnTitle.value.splice(index, 1);
        }
        // Update column visibility state
        if (columnVisibility.value[item.key] !== false) {
          columnVisibility.value[item.key] = false;
        }
      } else if (!item.action.hide) {
        // Get index title from dataTitle
        let indexData = dataTitle.value.indexOf(item.key);

        if (!columnTitle.value.includes(item.key)) {
          // Add Column back to its original position
          columnTitle.value.splice(indexData, 0, item.key);

          // Sort the columnTitle like dataTitle
          columnTitle.value.sort((a, b) => {
            let indexA = dataTitle.value.indexOf(a);
            let indexB = dataTitle.value.indexOf(b);
            return indexA - indexB;
          });
        }
        // Update column visibility state
        if (columnVisibility.value[item.key] !== true) {
          columnVisibility.value[item.key] = true;
        }
      }
    });
  },
  { deep: true }
);

const filterComputed = computed(() => {
  let result = [];
  let i = 0;
  filter.value.forEach((item) => {
    if (item.action.hide) {
      result.push({
        title: item.key,
        hide: item.action.hide,
      });
    }
    i++;
  });
  // console.log(result);
  return result;
});

// watch pinia getter windowWidth
watch(
  () => windowWidth.value,
  () => {
    if (props.optionsAdvanced.responsive) {
      if (windowWidth.value <= mobileWidth) {
        hideTable.value = true;
      } else {
        hideTable.value = false;
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    v-if="dataTable && dataTable.length > 0"
    class="modern-table-wrapper bg-[rgb(var(--bg-0))] rounded-2xl shadow-sm border border-[rgb(var(--border-color))] overflow-hidden"
  >
    <!-- Modern Table Header -->
    <div
      v-if="advanced"
      class="table-modern-header bg-gradient-to-r from-[rgb(var(--bg-1))] to-[rgb(var(--bg-0))] border-b border-[rgb(var(--border-color))] p-6"
      :class="{
        'pb-4': !openFilter && !showColumnSettings,
        'pb-6': openFilter || showColumnSettings,
      }"
    >
      <!-- Top Controls Row -->
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4"
      >
        <!-- Search Section -->
        <div class="flex-1 max-w-md">
          <div class="relative">
            <Icon
              name="ic:round-search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-color))] opacity-50"
              size="1.1rem"
            />
            <FormKit
              v-model="keyword"
              type="search"
              placeholder="Search entries..."
              outer-class="mb-0"
              input-class="!pl-10 !py-3 !rounded-xl !border-[rgb(var(--border-color))] !bg-[rgb(var(--bg-0))] !text-[rgb(var(--text-color))] focus:!ring-2 focus:!ring-primary/20 focus:!border-primary !transition-all !duration-200"
            />
          </div>
        </div>

        <!-- Action Controls -->
        <div class="flex items-center gap-3">
          <!-- Results per page -->
          <div
            class="flex items-center gap-2 text-sm text-[rgb(var(--text-color))] opacity-75"
          >
            <span class="whitespace-nowrap">Show</span>
            <FormKit
              type="select"
              v-model="pageSize"
              :options="[
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '25', value: 25 },
                { label: '100', value: 100 },
              ]"
              outer-class="mb-0"
              input-class="!py-2 !px-3 !rounded-lg !border-[rgb(var(--border-color))] !bg-[rgb(var(--bg-0))] !text-[rgb(var(--text-color))] !text-sm min-w-[70px]"
            />
            <span class="whitespace-nowrap">entries</span>
          </div>

          <!-- Modern Action Buttons -->
          <div class="flex items-center gap-2">
            <button
              v-if="optionsAdvanced.filterable"
              @click="openFilter = !openFilter"
              class="modern-btn modern-btn-secondary"
              :class="{ 'modern-btn-active': openFilter }"
            >
              <Icon name="ic:round-filter-list" size="1.1rem" />
              <span class="hidden sm:inline ml-2">Filter</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Column Settings Panel -->
      <Transition name="slide-down">
        <div
          v-if="showColumnSettings && optionsAdvanced.filterable"
          class="column-settings-modern"
        >
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-[rgb(var(--text-color))]">
                Column Visibility
              </h3>
              <p class="text-sm text-[rgb(var(--text-color))] opacity-60 mt-1">
                {{ getVisibleColumnsCount() }} of
                {{ getTotalColumnsCount() }} columns visible
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="showAllColumns"
                class="modern-btn-sm modern-btn-primary"
              >
                Show All
              </button>
              <button
                @click="hideAllColumns"
                class="modern-btn-sm modern-btn-ghost"
              >
                Hide All
              </button>
              <button
                @click="showColumnSettings = false"
                class="modern-btn-sm modern-btn-ghost !p-1 !w-8 !h-8"
              >
                <Icon name="ic:round-close" size="16" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <button
              v-for="column in dataTitle"
              :key="column"
              @click="toggleColumnVisibility(column)"
              class="modern-column-toggle"
              :class="{
                'modern-column-toggle-active': columnVisibility[column],
                'modern-column-toggle-inactive': !columnVisibility[column],
              }"
            >
              <Icon
                :name="
                  columnVisibility[column]
                    ? 'ic:round-visibility'
                    : 'ic:round-visibility-off'
                "
                size="16"
                class="flex-shrink-0"
              />
              <span class="text-sm font-medium truncate">{{
                camelCasetoTitle(column)
              }}</span>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Filter Panel -->
      <Transition name="slide-down">
        <div
          v-if="openFilter && optionsAdvanced.filterable"
          class="filter-panel-compact"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-[rgb(var(--text-color))]">
              Quick Column Actions
            </h3>
            <span class="text-xs text-[rgb(var(--text-color))] opacity-60"
              >Click to show/hide columns</span
            >
          </div>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(val, index) in dataTitle"
              :key="index"
              @click="hideColumn(val)"
              class="compact-filter-chip"
              :class="{ 'compact-filter-chip-hidden': getFilter(val) }"
              :title="`${getFilter(val) ? 'Show' : 'Hide'} ${camelCasetoTitle(
                val
              )} column`"
            >
              <Icon
                :name="
                  getFilter(val)
                    ? 'ic:round-visibility-off'
                    : 'ic:round-visibility'
                "
                size="12"
              />
              <span class="text-xs font-medium">{{
                camelCasetoTitle(val)
              }}</span>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Active Filters -->
      <Transition name="fade">
        <div v-if="filterComputed.length > 0" class="active-filters-modern">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-sm font-medium text-[rgb(var(--text-color))]"
              >Active filters:</span
            >
            <div
              v-for="(val, index) in filterComputed"
              :key="index"
              class="modern-filter-tag"
            >
              <span>{{ camelCasetoTitle(val.title) }}</span>
              <button
                @click="hideColumn(val.title)"
                class="ml-2 hover:text-red-500 transition-colors"
              >
                <Icon name="ic:round-close" size="14" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Modern Table Content -->
    <div class="overflow-hidden">
      <div v-if="!hideTable" class="overflow-x-auto">
        <table class="w-full">
          <!-- Modern Table Head -->
          <thead class="modern-table-head">
            <tr>
              <th
                v-for="(val, index) in columnTitle"
                :key="index"
                class="modern-table-th"
                :class="{
                  'cursor-pointer hover:bg-gray-50':
                    optionsAdvanced.sortable && advanced,
                  'modern-table-th-sorted': currentSort === index,
                }"
                @click="
                  optionsAdvanced.sortable && advanced ? sort(index) : null
                "
              >
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-[rgb(var(--text-color))]">{{
                    camelCasetoTitle(val)
                  }}</span>
                  <div
                    v-if="optionsAdvanced.sortable && advanced"
                    class="ml-2 flex-shrink-0"
                  >
                    <Icon
                      v-if="currentSort === index && currentSortDir === 'asc'"
                      name="ic:round-keyboard-arrow-up"
                      size="1.2rem"
                      class="text-primary"
                    />
                    <Icon
                      v-else-if="
                        currentSort === index && currentSortDir === 'desc'
                      "
                      name="ic:round-keyboard-arrow-down"
                      size="1.2rem"
                      class="text-primary"
                    />
                    <Icon
                      v-else
                      name="ic:round-unfold-more"
                      size="1.2rem"
                      class="text-[rgb(var(--text-color))] opacity-30 group-hover:opacity-40"
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <!-- Modern Table Body -->
          <tbody class="modern-table-body">
            <tr
              v-for="(val1, index1) in computedData"
              :key="index1"
              class="modern-table-row"
              :class="{
                'hover:bg-primary/5': options.hover,
                'bg-[rgb(var(--bg-1))]/30': options.striped && index1 % 2 === 1,
              }"
            >
              <td
                v-for="(val2, index2) in columnTitle"
                :key="index2"
                class="modern-table-td"
              >
                <slot
                  :name="val2"
                  :text="filteredDatabyTitle(val1, val2)"
                  :value="val1"
                >
                  <span class="text-[rgb(var(--text-color))]">{{
                    filteredDatabyTitle(val1, val2)
                  }}</span>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modern Mobile View -->
      <div v-else class="p-4">
        <div v-if="computedData.length > 0" class="space-y-4">
          <div
            v-for="(val, index) in computedData"
            :key="index"
            class="modern-mobile-card"
          >
            <!-- Card Header -->
            <div class="modern-mobile-card-header">
              <div class="flex-1">
                <h3 class="font-semibold text-[rgb(var(--text-color))] text-lg">
                  {{ Object.values(val)[0] }}
                </h3>
                <p
                  class="text-[rgb(var(--text-color))] opacity-70 text-sm mt-1"
                >
                  {{ Object.values(val)[1] }}
                </p>
              </div>
              <div class="modern-mobile-badge">
                {{ Object.values(val)[Object.values(val).length - 1] }}
              </div>
            </div>

            <!-- Card Content -->
            <div class="modern-mobile-card-content">
              <div
                v-for="(val1, index1) in Object.entries(val).slice(
                  2,
                  Object.entries(val).length - 1
                )"
                :key="index1"
                class="modern-mobile-field"
              >
                <dt class="modern-mobile-field-label">
                  {{ camelCasetoTitle(val1[0]) }}
                </dt>
                <dd class="modern-mobile-field-value">
                  {{ val1[1] }}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Table Footer -->
    <div v-if="advanced" class="modern-table-footer">
      <!-- Results Info -->
      <div class="text-sm text-[rgb(var(--text-color))] opacity-70">
        Showing
        <span class="font-medium text-[rgb(var(--text-color))]">{{
          pageSize * currentPage - pageSize + 1
        }}</span>
        to
        <span class="font-medium text-[rgb(var(--text-color))]">{{
          Math.min(pageSize * currentPage, totalEntries)
        }}</span>
        of
        <span class="font-medium text-[rgb(var(--text-color))]">{{
          totalEntries
        }}</span>
        entries
      </div>

      <!-- Modern Pagination -->
      <div class="modern-pagination">
        <button
          @click="firstPage"
          :disabled="currentPage === 1"
          class="modern-pagination-btn"
          :class="{ 'modern-pagination-btn-disabled': currentPage === 1 }"
        >
          <Icon name="ic:round-first-page" size="1.1rem" />
        </button>

        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="modern-pagination-btn"
          :class="{ 'modern-pagination-btn-disabled': currentPage === 1 }"
        >
          <Icon name="ic:round-chevron-left" size="1.1rem" />
        </button>

        <button
          v-for="(val, index) in pages"
          :key="index"
          @click="pageChange(val)"
          class="modern-pagination-btn modern-pagination-number"
          :class="{
            'modern-pagination-btn-active': currentPage === val,
            'modern-pagination-btn-inactive': currentPage !== val,
          }"
        >
          {{ val }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPage"
          class="modern-pagination-btn"
          :class="{
            'modern-pagination-btn-disabled': currentPage === totalPage,
          }"
        >
          <Icon name="ic:round-chevron-right" size="1.1rem" />
        </button>

        <button
          @click="lastPage"
          :disabled="currentPage === totalPage"
          class="modern-pagination-btn"
          :class="{
            'modern-pagination-btn-disabled': currentPage === totalPage,
          }"
        >
          <Icon name="ic:round-last-page" size="1.1rem" />
        </button>
      </div>
    </div>
  </div>

  <!-- Modern Empty State -->
  <div v-else class="modern-empty-state">
    <div class="modern-empty-state-content">
      <div class="modern-empty-state-icon">
        <Icon
          name="ic:round-table-view"
          size="48"
          class="text-[rgb(var(--text-color))] opacity-30"
        />
      </div>
      <h3 class="modern-empty-state-title">No data available</h3>
      <p class="modern-empty-state-description">
        There are no entries to display at this time.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Modern Button Styles */
.modern-btn {
  @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.modern-btn-primary {
  @apply bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm;
}

.modern-btn-secondary {
  @apply bg-[rgb(var(--bg-0))] text-[rgb(var(--text-color))] border border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] focus:ring-primary/50 shadow-sm;
}

.modern-btn-ghost {
  @apply text-[rgb(var(--text-color))]/70 hover:text-[rgb(var(--text-color))] hover:bg-[rgb(var(--bg-1))] focus:ring-primary/50;
}

.modern-btn-active {
  @apply bg-primary/10 text-primary border-primary/30;
}

.modern-btn-sm {
  @apply px-3 py-1.5 text-xs font-medium rounded-md;
}

/* Column Settings */
.column-settings-modern {
  @apply bg-[rgb(var(--bg-0))] border border-[rgb(var(--border-color))] rounded-xl p-6 mt-4 shadow-sm;
}

.modern-column-toggle {
  @apply flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 text-left;
}

.modern-column-toggle-active {
  @apply bg-success/10 border-success/30 text-success hover:bg-success/20;
}

.modern-column-toggle-inactive {
  @apply bg-[rgb(var(--bg-1))] border-[rgb(var(--border-color))] text-[rgb(var(--text-color))]/60 hover:bg-[rgb(var(--bg-2))];
}

/* Filter Panel */
.filter-panel-compact {
  @apply bg-[rgb(var(--bg-0))] border border-[rgb(var(--border-color))] rounded-lg p-4 mt-3 shadow-sm;
}

.compact-filter-chip {
  @apply inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 hover:shadow-sm;
  @apply bg-success/10 border-success/30 text-success hover:bg-success/20;
}

.compact-filter-chip-hidden {
  @apply bg-danger/10 border-danger/30 text-danger hover:bg-danger/20;
}

/* Active Filters */
.active-filters-modern {
  @apply mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20;
}

.modern-filter-tag {
  @apply inline-flex items-center px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/30;
}

/* Table Styles */
.modern-table-head {
  @apply bg-[rgb(var(--bg-1))] border-b border-[rgb(var(--border-color))];
}

.modern-table-th {
  @apply px-6 py-4 text-left text-xs font-medium text-[rgb(var(--text-color))]/60 uppercase tracking-wider;
}

.modern-table-th-sorted {
  @apply bg-primary/10;
}

.modern-table-body {
  @apply bg-[rgb(var(--bg-0))] divide-y divide-[rgb(var(--border-color))];
}

.modern-table-row {
  @apply transition-colors duration-150;
}

.modern-table-td {
  @apply px-6 py-4 whitespace-nowrap text-sm;
}

/* Mobile Card Styles */
.modern-mobile-card {
  @apply bg-[rgb(var(--bg-0))] rounded-xl border border-[rgb(var(--border-color))] shadow-sm overflow-hidden;
}

.modern-mobile-card-header {
  @apply flex items-start justify-between p-4 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))];
}

.modern-mobile-badge {
  @apply px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full;
}

.modern-mobile-card-content {
  @apply p-4 space-y-3;
}

.modern-mobile-field {
  @apply flex justify-between items-center py-2 border-b border-[rgb(var(--border-color))]/50 last:border-b-0;
}

.modern-mobile-field-label {
  @apply text-sm font-medium text-[rgb(var(--text-color))]/70;
}

.modern-mobile-field-value {
  @apply text-sm text-[rgb(var(--text-color))] font-medium;
}

/* Footer Styles */
.modern-table-footer {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 bg-[rgb(var(--bg-1))] border-t border-[rgb(var(--border-color))];
}

/* Pagination Styles */
.modern-pagination {
  @apply flex items-center gap-1;
}

.modern-pagination-btn {
  @apply inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2;
}

.modern-pagination-number {
  @apply w-10 h-10;
}

.modern-pagination-btn-active {
  @apply bg-primary text-white shadow-sm;
}

.modern-pagination-btn-inactive {
  @apply text-[rgb(var(--text-color))] bg-[rgb(var(--bg-0))] border border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))];
}

.modern-pagination-btn-disabled {
  @apply text-[rgb(var(--text-color))]/40 bg-[rgb(var(--bg-1))] cursor-not-allowed;
}

/* Empty State */
.modern-empty-state {
  @apply bg-[rgb(var(--bg-0))] rounded-2xl shadow-sm border border-[rgb(var(--border-color))] p-8;
}

.modern-empty-state-content {
  @apply text-center;
}

.modern-empty-state-icon {
  @apply flex justify-center mb-4;
}

.modern-empty-state-title {
  @apply text-xl font-semibold text-[rgb(var(--text-color))] mb-2;
}

.modern-empty-state-description {
  @apply text-[rgb(var(--text-color))]/70;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
