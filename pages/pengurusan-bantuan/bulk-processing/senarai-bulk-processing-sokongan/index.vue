<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading workflows...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h3>Error Loading Workflows</h3>
      <p>{{ error }}</p>
      <RsButton @click="fetchWorkflows" variant="outline"> Retry </RsButton>
    </div>

    <!-- Show current workflow iframe -->
    <div
      v-else-if="
        !workflowCompleted && currentProcessIndex < formProcesses.length
      "
    >
      <!-- Workflow Iframe -->
      <iframe
        ref="workflowIframe"
        :src="generateIframeUrl(currentProcess.url)"
        width="100%"
        height="600px"
        style="border: none; min-height: 600px"
      ></iframe>
    </div>

    <!-- Show success message when all workflows are completed -->
    <div v-else-if="workflowCompleted" class="workflow-success">
      <div class="success-container">
        <div class="success-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="success-title">All Workflows Completed Successfully!</h2>
        <p class="success-message">
          All forms have been submitted and processed successfully.
        </p>

        <!-- Display collected data from all workflows -->
        <div class="form-data-display" v-if="allFormData.length > 0">
          <h3>Submitted Data from All Workflows:</h3>
          <div class="workflow-data-list">
            <div
              v-for="(data, index) in allFormData"
              :key="index"
              class="workflow-data-item"
            >
              <h4>{{ formProcesses[index].name }}</h4>
              <pre>{{ JSON.stringify(data, null, 2) }}</pre>
            </div>
          </div>
        </div>

        <button @click="resetWorkflow" class="reset-button">
          Start New Workflow Sequence
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useApiFetching } from "~/composables/useApiFetching";

const apiRequest = useApiFetching();

const workflowCompleted = ref(false);
const currentProcessIndex = ref(0);
const allFormData = ref([]);
const workflowIframe = ref(null);
const formProcesses = ref([]);
const loading = ref(true);
const error = ref(null);
const sessionUuid = ref("");

// Function to generate UUID and create iframe URL
const generateIframeUrl = (baseUrl) => {
  // Generate a new UUID for this session if not already generated
  if (!sessionUuid.value) {
    sessionUuid.value = uuidv4();
    console.log("Generated session UUID:", sessionUuid.value);
  }

  // Create URL with existing parameters and add the UUID
  const url = new URL(baseUrl);
  url.searchParams.set("debug", "false");
  url.searchParams.set("hideComplete", "true");
  url.searchParams.set("asnafUuid", sessionUuid.value);

  console.log("Final URL:", url.toString());

  return url.toString();
};

// Function to fetch workflows from backend
const fetchWorkflows = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Get component ID from route params or query
    const route = useRoute();
    const componentCode = "COMP_012";

    console.log("Fetching workflows from backend...", { componentCode });

    let response;
    if (componentCode) {
      // Fetch specific component by ID
      response = await apiRequest(
        `/configuration/profiling/component/workflows/${componentCode}`,
        {
          method: "GET",
        }
      );
    } else {
      // Fetch all components and use the first one
      response = await apiRequest(
        "/configuration/profiling/component/workflows/all",
        {
          method: "GET",
        }
      );
      if (response && response.length > 0) {
        // Use the first component
        response = response[0];
      }
    }

    console.log("Response: ", response);

    if (response) {
      if (response.processes && response.processes.length > 0) {
        formProcesses.value = response.processes.map((process) => ({
          id: process.id.toString(),
          name: process.name,
          url: process.url,
        }));
        console.log("Loaded workflows:", formProcesses.value);
      } else {
        console.warn("No processes found in component");
        formProcesses.value = [];
        error.value = "No workflows found for this component";
      }
    } else {
      console.error("Invalid response format:", response);
      error.value = "Invalid response format from server";
    }
  } catch (err) {
    console.error("Error fetching workflows:", err);
    error.value = err.message || "Failed to load workflows from server";
  } finally {
    loading.value = false;
  }
};

// Computed property for current process
const currentProcess = computed(() => {
  return formProcesses.value[currentProcessIndex.value] || null;
});

// Computed property for current session UUID
const currentSessionId = computed(() => {
  return sessionUuid.value || "Not generated yet";
});

// Function to handle messages from iframe
const handleMessage = (event) => {
  // Check if the message is from the corrad.ai domain
  if (event.origin !== "https://bp.corrad.ai") {
    return;
  }

  console.log("Received message from iframe:", event.data);

  // Check for workflow completion indicators
  if (event.data && typeof event.data === "object") {
    // Check if the message indicates workflow completion
    if (
      event.data.type === "workflow-complete" ||
      event.data.complete === true ||
      event.data.nodeType === "end" ||
      event.data.currentNode?.type === "end"
    ) {
      // Extract form data from current workflow
      let formData = null;
      if (event.data.formData) {
        formData = event.data.formData;
      } else if (event.data.data) {
        formData = event.data.data;
      }

      // Store the form data for current workflow
      allFormData.value[currentProcessIndex.value] = formData;

      console.log(
        `Workflow ${currentProcessIndex.value + 1} completed! Form data:`,
        formData
      );

      // Move to next workflow or complete all workflows
      if (currentProcessIndex.value < formProcesses.value.length - 1) {
        // Move to next workflow
        currentProcessIndex.value++;
        console.log(`Moving to workflow ${currentProcessIndex.value + 1}`);
      } else {
        // All workflows completed
        workflowCompleted.value = true;
        console.log("All workflows completed!");
      }
    }
  }
};

// Function to go to previous workflow
const previousWorkflow = () => {
  if (currentProcessIndex.value > 0) {
    currentProcessIndex.value--;
    // Remove the data from the current workflow since we're going back
    allFormData.value.splice(currentProcessIndex.value, 1);
  }
};

// Function to reset all workflows
const resetWorkflow = () => {
  workflowCompleted.value = false;
  currentProcessIndex.value = 0;
  allFormData.value = [];
  // Generate a new UUID for the new session
  sessionUuid.value = uuidv4();
  console.log("Reset workflow - New session UUID:", sessionUuid.value);
};

// Listen for URL changes in iframe (alternative method)
const checkIframeURL = () => {
  if (workflowIframe.value && !workflowCompleted.value) {
    try {
      const iframeURL = workflowIframe.value.contentWindow.location.href;
      if (iframeURL.includes("complete=true")) {
        // Handle completion via URL change
        if (currentProcessIndex.value < formProcesses.value.length - 1) {
          currentProcessIndex.value++;
          console.log(
            `Moving to workflow ${currentProcessIndex.value + 1} via URL change`
          );
        } else {
          workflowCompleted.value = true;
          console.log("All workflows completed via URL change");
        }
      }
    } catch (error) {
      // Cross-origin restrictions might prevent access
      console.log("Cannot access iframe URL due to CORS restrictions");
    }
  }
};

onMounted(async () => {
  // Fetch workflows from backend
  await fetchWorkflows();

  // Add message listener
  window.addEventListener("message", handleMessage);

  // Check iframe URL periodically as fallback
  const urlCheckInterval = setInterval(checkIframeURL, 2000);

  // Clean up interval on unmount
  onUnmounted(() => {
    clearInterval(urlCheckInterval);
  });
});

onUnmounted(() => {
  // Remove message listener
  window.removeEventListener("message", handleMessage);
});
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    font-size: 1rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;

  .error-icon {
    color: #ef4444;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 1.5rem;
    max-width: 400px;
  }
}

.workflow-success {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1000px;
  padding: 2rem;
}

.success-container {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
}

.success-icon {
  color: #10b981;
  margin-bottom: 1.5rem;
}

.success-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.form-data-display {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
}

.workflow-data-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.workflow-data-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
  }
}

.reset-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
