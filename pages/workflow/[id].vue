<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormScriptEngine from '~/components/FormScriptEngine.vue';
import ConditionalLogicEngine from '~/components/ConditionalLogicEngine.vue';
import ComponentPreview from '~/components/ComponentPreview.vue';
import FormModal from '~/components/FormModal.vue';
import { useFormBuilderStore } from '~/stores/formBuilder';
import { FormKit } from '@formkit/vue';

// Define page meta
definePageMeta({
  title: "Process Execution",
  description: "Execute and run through a business process workflow",
  layout: "default",
});

// Get route and router
const route = useRoute();
const router = useRouter();

// Get form builder store for ComponentPreview data sharing
const formStore = useFormBuilderStore();

console.log("asdasdas");

console.log(route.query.debug);


// Check if we're in iframe/embed mode
const isIframeMode = computed(() => {
  // Default is false if not provided
  return route.query.debug == undefined ? "false" : route.query.debug === 'false';
});

// Check if we should hide completion message (for seamless multi-process workflows)
const hideCompletionMessage = computed(() => {
  // Default is true if not provided
  return route.query.hideComplete == undefined ? "true" : route.query.hideComplete === 'true';
});

// State
const loading = ref(true);
const process = ref(null);
const currentStep = ref(0);
const caseInstance = ref(null);
const formData = ref({});
const processVariables = ref({});
const error = ref(null);
const stepLoading = ref(false);
const currentForm = ref(null);
const tasks = ref([]);
const conditionalLogicScript = ref('');
const combinedScript = ref('');
const fieldStates = ref({});
const visitedNodesInSession = ref(new Set());
const showSubmitConfirmationModal = ref(false);

// Modal state management
const modalStates = ref({});
const modalInputDataStore = ref({});
const globalModals = ref({});
const modals = computed(() => {
  // Use global modals from all workflow forms, with current form modals as fallback
  const currentFormModals = currentForm.value?.formModals || currentForm.value?.modals || {};
  return Object.keys(globalModals.value).length > 0 ? globalModals.value : currentFormModals;
});

// Get process ID from route
const processId = computed(() => route.params.id);

// Get current workflow definition
const workflowData = computed(() => {
  if (!process.value?.processDefinition) return null;
  return process.value.processDefinition;
});

// Get current step node
const currentNode = computed(() => {
  if (!workflowData.value?.nodes || currentStep.value >= workflowData.value.nodes.length) {
    return null;
  }
  return workflowData.value.nodes[currentStep.value];
});

// Get next step
const nextNode = computed(() => {
  if (!workflowData.value?.nodes || currentStep.value + 1 >= workflowData.value.nodes.length) {
    return null;
  }
  return workflowData.value.nodes[currentStep.value + 1];
});

// Check if process is complete
const isProcessComplete = computed(() => {
  return currentNode.value?.type === 'end' || currentStep.value >= (workflowData.value?.nodes?.length || 0);
});

// Watch for process completion and update URL
watch(isProcessComplete, (newValue) => {
  if (newValue) {
    updateUrlOnComplete();
  }
});

// Capture URL parameters for variables that are configured to do so
const captureUrlParameters = () => {
  try {
    console.log('[Workflow] Capturing URL parameters...');
    
    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    console.log('[Workflow] Available URL parameters:', Object.fromEntries(urlParams.entries()));
    
    // Check if we have process variables defined
    const variableSource = process.value?.variables || process.value?.processVariables;
    if (!variableSource) {
      console.log('[Workflow] No process variables defined, skipping URL parameter capture');
      return;
    }
    
    // Iterate through process variables to find ones configured for URL capture
    Object.entries(variableSource).forEach(([variableName, variableConfig]) => {
      if (variableConfig && variableConfig.captureFromUrl && variableConfig.urlParameterName) {
        const paramName = variableConfig.urlParameterName;
        const paramValue = urlParams.get(paramName);
        
        if (paramValue !== null) {
          // Convert the parameter value based on the variable type
          let convertedValue = paramValue;
          
          switch (variableConfig.type) {
            case 'number':
            case 'int':
            case 'decimal':
              convertedValue = Number(paramValue);
              if (isNaN(convertedValue)) {
                console.warn(`[Workflow] Could not convert URL parameter "${paramName}" value "${paramValue}" to number for variable "${variableName}"`);
                convertedValue = variableConfig.value || 0; // Use default value
              }
              break;
            case 'boolean':
              convertedValue = paramValue.toLowerCase() === 'true' || paramValue === '1';
              break;
            case 'object':
              try {
                convertedValue = JSON.parse(paramValue);
              } catch (e) {
                console.warn(`[Workflow] Could not parse URL parameter "${paramName}" value "${paramValue}" as JSON for variable "${variableName}"`);
                convertedValue = variableConfig.value || {}; // Use default value
              }
              break;
            case 'date':
            case 'datetime':
              const dateValue = new Date(paramValue);
              if (isNaN(dateValue.getTime())) {
                console.warn(`[Workflow] Could not parse URL parameter "${paramName}" value "${paramValue}" as date for variable "${variableName}"`);
                convertedValue = variableConfig.value || null; // Use default value
              } else {
                convertedValue = variableConfig.type === 'date' ? dateValue.toISOString().split('T')[0] : dateValue.toISOString();
              }
              break;
            case 'string':
            default:
              convertedValue = String(paramValue);
              break;
          }
          
          // Set the variable value
          processVariables.value[variableName] = convertedValue;
          console.log(`[Workflow] Captured URL parameter "${paramName}" = "${paramValue}" -> variable "${variableName}" = `, convertedValue);
        } else {
          console.log(`[Workflow] URL parameter "${paramName}" not found for variable "${variableName}"`);
        }
      }
    });
    
    console.log('[Workflow] Final process variables after URL capture:', processVariables.value);
  } catch (err) {
    console.error('[Workflow] Error capturing URL parameters:', err);
  }
};

// Load process data
const loadProcess = async (retryCount = 0) => {
  try {
    loading.value = true;
    error.value = null;
    
    console.log(`[Workflow] Loading process definition... (attempt ${retryCount + 1})`);
    const response = await $fetch(`https://bp.corrad.ai/api/process/${processId.value}`);
    
    if (response.success && response.process) {
      process.value = response.process; // includes processDefinition
      
      // Check if process is published
      const status = process.value.processStatus || process.value.status || 'draft';
      if (status !== 'published') {
        error.value = 'Process must be published before execution';
        return;
      }
      
      // Initialize process variables from DB - extract values from variable definitions
      processVariables.value = {};
      
      // Try both possible property names for variables
      const variableSource = process.value.variables || process.value.processVariables;
      if (variableSource) {
        Object.entries(variableSource).forEach(([name, variableDefinition]) => {
          // Set the actual value, defaulting to the variable's default value or empty string
          processVariables.value[name] = variableDefinition.value || variableDefinition.defaultValue || '';
        });
      }
      
      // Capture URL parameters for variables configured to do so
      captureUrlParameters();
      
      // Reset visited nodes tracking for new process execution
      visitedNodesInSession.value.clear();
      
      // Automatically start the process execution (case instance)
      // This will create the case and move to the first actual task
      await startProcessExecution();
      
      // Loading will be set to false after the first step is ready
      loading.value = false;
      
    } else {
      throw new Error(response.message || 'Invalid process response');
    }
  } catch (fetchError) {
    console.error(`[Workflow] Error loading process (attempt ${retryCount + 1}):`, fetchError);
    
    // Retry logic with exponential backoff  
    if (retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1500; // 1.5s, 3s
      console.log(`[Workflow] Retrying process load in ${delay}ms (attempt ${retryCount + 2}/3)`);
      
      setTimeout(async () => {
        await loadProcess(retryCount + 1);
      }, delay);
      return;
    }
    
    // After all retries failed
    error.value = `Failed to load process after ${retryCount + 1} attempts: ${fetchError.message || 'Network error'}`;
    notifyParentOfError(error.value);
    loading.value = false;
  } finally {
    // Loading state is now managed after startProcessExecution completes
    // Only set loading to false here if there was an error
    if (!process.value && retryCount >= 2) {
      loading.value = false;
    }
  }
};

// Start process execution (create case instance and begin workflow)
const startProcessExecution = async () => {
  try {
    console.log('[Workflow] Starting process execution automatically...');
    
    // Create case instance via API
    const response = await $fetch(`https://bp.corrad.ai/api/process/${processId.value}/start`, {
      method: 'POST',
      body: {
        variables: processVariables.value // Pass initial variables if any
      }
    });
    
    if (response.success) {
      caseInstance.value = response.data.case;
      tasks.value = response.data.tasks || [];
      console.log('[Workflow] Case instance created:', caseInstance.value);
      
      // Find the start node and move past it to the first actual step
      const startNodeIndex = workflowData.value.nodes.findIndex(node => node.type === 'start');
      if (startNodeIndex >= 0) {
        currentStep.value = startNodeIndex;
        console.log('[Workflow] Found start node at index:', startNodeIndex);
        
        // Immediately move to the first actual task after the start node
        moveToNextStep();
      } else {
        // No start node found, begin at first node
        console.warn('[Workflow] No start node found, beginning at first node');
        currentStep.value = 0;
        
        // If the first node is executable, run it
        if (currentNode.value && ['api', 'script', 'notification'].includes(currentNode.value.type)) {
          await executeCurrentStep();
        }
      }
    } else {
      throw new Error(response.error || 'Failed to start process');
    }
  } catch (err) {
    console.error('[Workflow] Error starting process execution:', err);
    
    // More user-friendly error message
    if (err.statusCode === 404) {
      error.value = 'Process not found. Please check if the process exists and is published.';
    } else if (err.statusCode === 403) {
      error.value = 'You do not have permission to execute this process.';
    } else {
      error.value = `Failed to start process: ${err.message || 'Unknown error'}`;
    }
    
    notifyParentOfError(error.value);
  }
};

// Helper: Get all outgoing edges for a node
function getOutgoingEdges(currentNodeId) {
  return workflowData.value.edges.filter(e => e.source === currentNodeId);
}

// Helper: Get next node ID by following edges (for single-path nodes)
function getNextNodeId(currentNodeId) {
  const edges = getOutgoingEdges(currentNodeId);
  return edges.length > 0 ? edges[0].target : null;
}

// Helper: Check if a node can auto-progress (has single outgoing edge)
function canAutoProgress(node) {
  const outgoingEdges = getOutgoingEdges(node.id);
  return outgoingEdges.length === 1;
}

// Helper: Get next node ID for decision/gateway nodes based on conditions
function getNextNodeIdForDecision(currentNodeId) {
  const currentNodeObj = workflowData.value.nodes.find(n => n.id === currentNodeId);
  const outgoingEdges = getOutgoingEdges(currentNodeId);
  
  console.log('[Gateway Debug] getNextNodeIdForDecision - Node:', currentNodeObj?.data?.label);
  console.log('[Gateway Debug] getNextNodeIdForDecision - Outgoing edges:', outgoingEdges);
  
  if (!currentNodeObj || !outgoingEdges.length) {
    console.log('[Gateway Debug] No node or edges found');
    return null;
  }
  
  const { conditions = [], defaultPath } = currentNodeObj.data || {};
  console.log('[Gateway Debug] Conditions:', conditions);
  console.log('[Gateway Debug] Default path:', defaultPath);
  console.log('[Gateway Debug] Current process variables:', processVariables.value);
  
  // Evaluate condition groups (each group represents a path)
  for (const conditionGroup of conditions) {
    const conditionResult = evaluateConditionGroup(conditionGroup, processVariables.value);
    console.log('[Gateway Debug] Condition group result:', conditionGroup.output, '=', conditionResult);
    
    if (conditionResult) {
      // Find the edge that matches this condition group's output label
      const edge = outgoingEdges.find(e => 
        e.label === conditionGroup.output || 
        e.data?.condition === conditionGroup.output
      );
      console.log('[Gateway Debug] Found matching edge for condition:', edge);
      if (edge) return edge.target;
    }
  }
  
  // If no conditions match, look for default path
  let defaultEdge = null;
  
  // First try to find edge with explicit default path name
  if (defaultPath) {
    defaultEdge = outgoingEdges.find(e => e.label === defaultPath);
    console.log('[Gateway Debug] Looking for default path by name:', defaultPath, 'found:', defaultEdge);
  }
  
  // Then look for edge marked as default or containing 'default' in label
  if (!defaultEdge) {
    defaultEdge = outgoingEdges.find(e => 
      e.data?.isDefault || 
      e.label?.toLowerCase().includes('default')
    );
    console.log('[Gateway Debug] Looking for default edge by pattern, found:', defaultEdge);
  }
  
  if (defaultEdge) {
    console.log('[Gateway Debug] Using default edge:', defaultEdge);
    return defaultEdge.target;
  }
  
  // Fallback to first edge
  console.log('[Gateway Debug] Fallback to first edge:', outgoingEdges[0]);
  return outgoingEdges[0]?.target || null;
}

// Helper: Evaluate a condition group (multiple conditions with AND/OR logic)
function evaluateConditionGroup(conditionGroup, variables) {
  if (!conditionGroup.conditions || conditionGroup.conditions.length === 0) {
    return false;
  }

  // If only one condition, evaluate it directly
  if (conditionGroup.conditions.length === 1) {
    const singleResult = evaluateCondition(conditionGroup.conditions[0], variables);
    console.log(`[Gateway Debug] Group '${conditionGroup.output}': single condition result=`, singleResult);
    return singleResult;
  }

  // For multiple conditions, evaluate based on logical operators
  let result = evaluateCondition(conditionGroup.conditions[0], variables);
  console.log(`[Gateway Debug] Group '${conditionGroup.output}': condition 0 result=`, result);

  for (let i = 1; i < conditionGroup.conditions.length; i++) {
    const condition = conditionGroup.conditions[i];
    const conditionResult = evaluateCondition(condition, variables);
    const operator = condition.logicalOperator || 'and';
    
    console.log(`[Gateway Debug] Group '${conditionGroup.output}': evaluating condition ${i}, operator='${operator}', previous result=${result}, current condition result=${conditionResult}`);
    
    if (operator === 'and') {
      result = result && conditionResult;
    } else if (operator === 'or') {
      result = result || conditionResult;
    }
    console.log(`[Gateway Debug] Group '${conditionGroup.output}': after condition ${i}, final result=`, result);
  }

  console.log(`[Gateway Debug] Group '${conditionGroup.output}': FINAL GROUP RESULT=`, result);
  return result;
}

// Helper: Evaluate a single condition
function evaluateCondition(condition, variables) {
  const { variable, operator, value, minValue, maxValue } = condition;
  const variableValue = variables[variable];

  console.log(`[Gateway Debug] Evaluating condition: variable='${variable}', operator='${operator}', value='${value}', variableValue='${variableValue}'`);

  // Handle undefined/null variables
  if (variableValue === undefined || variableValue === null) {
    console.warn(`[Gateway Debug] Variable '${variable}' is undefined/null for condition evaluation`);
    
    // For empty/not_empty checks, handle undefined/null explicitly
    if (operator === 'empty' || operator === 'is_empty') {
      return true;
    } else if (operator === 'not_empty' || operator === 'is_not_empty') {
      return false;
    }
    
    // For other operators, undefined/null values should generally fail comparisons
    return false;
  }

  // Handle boolean type conversions
  let compareValue = value;
  if (condition.valueType === 'boolean') {
    if (typeof value === 'string') {
      compareValue = value.toLowerCase() === 'true';
    } else {
      compareValue = Boolean(value);
    }
  }

  let result;
  switch (operator) {
    case 'eq':
    case 'equals':
    case '==':
      // Use strict equality for better type safety
      result = String(variableValue) === String(compareValue);
      break;
    case 'neq':
    case 'not_equals':
    case '!=':
      result = String(variableValue) !== String(compareValue);
      break;
    case 'gt':
    case 'greater_than':
    case '>':
      result = Number(variableValue) > Number(compareValue);
      break;
    case 'lt':
    case 'less_than':
    case '<':
      result = Number(variableValue) < Number(compareValue);
      break;
    case 'gte':
    case 'greater_than_or_equal':
    case '>=':
      result = Number(variableValue) >= Number(compareValue);
      break;
    case 'lte':
    case 'less_than_or_equal':
    case '<=':
      result = Number(variableValue) <= Number(compareValue);
      break;
    case 'between':
      result = (
        Number(variableValue) >= Number(minValue) &&
        Number(variableValue) <= Number(maxValue)
      );
      break;
    case 'not_between':
      result = (
        Number(variableValue) < Number(minValue) ||
        Number(variableValue) > Number(maxValue)
      );
      break;
    case 'contains':
      result = String(variableValue).toLowerCase().includes(String(compareValue).toLowerCase());
      break;
    case 'not_contains':
      result = !String(variableValue).toLowerCase().includes(String(compareValue).toLowerCase());
      break;
    case 'starts_with':
      result = String(variableValue).toLowerCase().startsWith(String(compareValue).toLowerCase());
      break;
    case 'ends_with':
      result = String(variableValue).toLowerCase().endsWith(String(compareValue).toLowerCase());
      break;
    case 'regex':
      try {
        result = new RegExp(compareValue).test(variableValue);
      } catch (e) {
        result = false;
      }
      break;
    case 'has_property':
      result = variableValue && typeof variableValue === 'object' && value in variableValue;
      break;
    case 'property_equals': {
      if (!variableValue || typeof variableValue !== 'object' || typeof compareValue !== 'string') {
        result = false;
        break;
      }
      const [prop, val] = compareValue.split(':');
      result = variableValue[prop] == val;
      break;
    }
    case 'empty':
    case 'is_empty':
      result = !variableValue || variableValue === '' || variableValue === null || variableValue === undefined;
      break;
    case 'not_empty':
    case 'is_not_empty':
      // Check for meaningful values - handle strings, arrays, objects
      if (typeof variableValue === 'string') {
        result = variableValue.trim() !== '';
      } else if (Array.isArray(variableValue)) {
        result = variableValue.length > 0;
      } else if (typeof variableValue === 'object' && variableValue !== null) {
        result = Object.keys(variableValue).length > 0;
      } else {
        result = variableValue !== null && variableValue !== undefined && variableValue !== '';
      }
      break;
    case 'is_true':
      result = Boolean(variableValue) === true;
      break;
    case 'is_false':
      result = Boolean(variableValue) === false;
      break;
    // Date operators
    case 'today': {
      if (!variableValue) { result = false; break; }
      const date = new Date(variableValue);
      const now = new Date();
      result = (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
      break;
    }
    case 'this_week': {
      if (!variableValue) { result = false; break; }
      const date = new Date(variableValue);
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      result = date >= startOfWeek && date <= endOfWeek;
      break;
    }
    case 'this_month': {
      if (!variableValue) { result = false; break; }
      const date = new Date(variableValue);
      const now = new Date();
      result = (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
      break;
    }
    case 'this_year': {
      if (!variableValue) { result = false; break; }
      const date = new Date(variableValue);
      const now = new Date();
      result = date.getFullYear() === now.getFullYear();
      break;
    }
    default:
      console.warn('[Workflow] Unknown condition operator:', operator);
      result = false;
  }
  console.log(`[Gateway Debug] Condition DETAILED: variable='${variable}', operator='${operator}', expectedValue='${value}', actualVariableValue='${variableValue}', types: expected=${typeof value}, actual=${typeof variableValue}, result=${result}`);
  return result;
}

// Move to a specific node by its ID
const moveToSpecificNode = (targetNodeId) => {
  // Safety check: prevent revisiting the same node too many times
  const visitCount = Array.from(visitedNodesInSession.value).filter(id => id === targetNodeId).length;
  if (visitCount > 3) {
    console.warn('[Workflow] Safety check: Node', targetNodeId, 'visited too many times, stopping to prevent infinite loop');
    error.value = 'Workflow loop detected. Please check your process configuration.';
    return false;
  }
  
  const nextIndex = workflowData.value.nodes.findIndex(n => n.id === targetNodeId);
  if (nextIndex !== -1) {
    visitedNodesInSession.value.add(targetNodeId);
    currentStep.value = nextIndex;
    const node = workflowData.value.nodes[currentStep.value];
    console.log(`[Workflow] Moved to node: ${node.type} - ${node.data?.label || node.label}`);
    return true;
  }
  console.warn('[Workflow] Target node not found:', targetNodeId);
  return false;
};

// Move to next step in workflow (only for single-path auto-progressable nodes)
const moveToNextStep = () => {
  const currentNode = workflowData.value.nodes[currentStep.value];
  if (!currentNode) return;
  
  // Only auto-progress if there's exactly one outgoing edge
  if (!canAutoProgress(currentNode)) {
    console.log(`[Workflow] Node ${currentNode.id} has multiple paths, waiting for user choice`);
    return;
  }
  
  const nextNodeId = getNextNodeId(currentNode.id);
  if (nextNodeId) {
    moveToSpecificNode(nextNodeId);
  }
};

// Handle form submission
const handleFormSubmit = async () => {
  try {
    stepLoading.value = true;
    
    // Merge formData with form store's preview data to ensure all component data is included
    // This is crucial for repeating tables and other custom components
    const completeFormData = { ...formData.value, ...formStore.previewFormData };
    
    // Form data merged for processing
    
    // Apply output mappings if configured
    if (currentNode.value.data?.outputMappings?.length > 0) {
      console.log('[Workflow] Applying output mappings, count:', currentNode.value.data.outputMappings.length);
      applyOutputMappings(
        currentNode.value.data, 
        completeFormData, 
        processVariables.value
      );
    } else {
      console.log('[Workflow] No output mappings configured, using fallback assignment');
      // Fallback to current flat assignment behavior
      Object.assign(processVariables.value, completeFormData);
    }
    
    // Handle assignment variables
    if (currentNode.value.data?.assignmentVariable) {
      processVariables.value[currentNode.value.data.assignmentVariable] = {
        completedBy: 'currentUser', // TODO: Get from auth context
        completedAt: new Date().toISOString(),
        formData: { ...completeFormData }
      };
    }
    
    moveToNextStep();
    console.log('[Workflow] After form submit, current node:', currentNode.value);
    if (currentNode.value && ['api', 'script'].includes(currentNode.value.type)) {
      await executeCurrentStep();
    }
  } catch (err) {
    console.error('[Workflow] Error submitting form:', err);
    error.value = 'Failed to submit form';
  } finally {
    stepLoading.value = false;
  }
};

// --- Utility: Substitute variables in a string ---
function substituteVariables(str, variables) {
  if (typeof str !== 'string') return str;
  // Replace {{variable}} first
  str = str.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, varName) => {
    const value = variables[varName];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && value.name && value.type)
    ) return '';
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  });
  // Then replace {variable}
  str = str.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, varName) => {
    const value = variables[varName];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && value.name && value.type)
    ) return '';
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  });
  return str;
}

// --- Variable Mapping Functions ---

// Apply input mappings to pre-fill form with process variables
function applyInputMappings(nodeData, processVars, formData) {
  const { inputMappings = [] } = nodeData;
  
  console.log('[TAB DEBUG] applyInputMappings - Total mappings:', inputMappings.length);
  console.log('[TAB DEBUG] Available form components:', nodeData.formComponents?.length || 0);

  inputMappings.forEach((mapping, index) => {
    const { processVariable, formField } = mapping;
    console.log(`[TAB DEBUG] Processing mapping ${index + 1}:`, { processVariable, formField });
    
    // Check if the process variable exists (including empty string values)
    if (processVars.hasOwnProperty(processVariable)) {
      let value = processVars[processVariable];
      console.log(`[TAB DEBUG] Found process variable '${processVariable}' with value:`, value);

      // Check if the form field is a date field and format accordingly
      // For tab container fields, extract the actual field name for definition lookup
      let lookupFieldName = formField;
      if (formField.includes('tabs[') && formField.includes('].')) {
        const afterTabs = formField.match(/\.tabs\[[^\]]+\]\.(.+)$/);
        if (afterTabs) {
          let pathAfterTab = afterTabs[1];
          
          // Extract the final field name from complex nested paths
          const segments = pathAfterTab.split('.');
          let actualFieldName = segments[segments.length - 1];
          
          // Handle cell notation in layout grids: cellX.field_name -> field_name
          if (segments.length >= 2 && segments[segments.length - 2].startsWith('cell')) {
            actualFieldName = segments[segments.length - 1];
          }
          
          lookupFieldName = actualFieldName;
        }
      }
      
      const fieldDef = findFieldDefinitionRecursive(nodeData.formComponents, lookupFieldName);
      console.log(`[TAB DEBUG] Field '${formField}' (lookup: '${lookupFieldName}') definition found:`, !!fieldDef, fieldDef?.type);
      if (fieldDef && fieldDef.type === 'date' && value) {
        // Convert to YYYY-MM-DD
        const d = new Date(value);
        if (!isNaN(d)) {
          value = d.toISOString().slice(0, 10);
        }
      }

      try {
        // Check if this is a tab container field with hierarchical path
        let targetFieldName = formField;
        if (formField.includes('tabs[') && formField.includes('].')) {
          // Extract the actual field name from tab container path
          // Handle multiple nesting levels:
          // Pattern 1: tab_container.tabs[tab_id].field_name -> field_name
          // Pattern 2: tab_container.tabs[tab_id].layout-grid.cell0.field_name -> field_name
          // Pattern 3: tab_container.tabs[tab_id].form-section.field_name -> field_name
          
          const afterTabs = formField.match(/\.tabs\[[^\]]+\]\.(.+)$/);
          if (afterTabs) {
            let pathAfterTab = afterTabs[1];
            
            // Extract the final field name from complex nested paths
            // Split by dots and find the last segment that looks like a field name
            const segments = pathAfterTab.split('.');
            
            // Look for the actual field name (usually the last segment that doesn't start with container names)
            let actualFieldName = segments[segments.length - 1];
            
            // Handle cell notation in layout grids: cellX.field_name -> field_name
            if (segments.length >= 2 && segments[segments.length - 2].startsWith('cell')) {
              actualFieldName = segments[segments.length - 1];
            }
            
            targetFieldName = actualFieldName;
            console.log(`[TAB DEBUG] Tab container nested field detected. Path: '${formField}' -> Actual field: '${targetFieldName}'`);
          }
        }
        
        // Use enhanced path setting for complex fields
        console.log(`[TAB DEBUG] Setting field '${targetFieldName}' to value:`, value);
        setFieldValue(formData, targetFieldName, value);
        console.log(`[TAB DEBUG] Field '${targetFieldName}' set successfully`);
      } catch (error) {
        console.error(`[TAB DEBUG] Error setting field '${formField}':`, error);
        // Fallback to simple assignment for backward compatibility
        formData[formField] = value;
        console.log(`[TAB DEBUG] Used fallback assignment for '${formField}'`);
      }
    } else {
      console.log(`[TAB DEBUG] Process variable '${processVariable}' not found in:`, Object.keys(processVars));
    }
  });
}

// Enhanced field value setting with path support
function setFieldValue(formData, fieldPath, value) {
  console.log(`[TAB DEBUG] setFieldValue called - fieldPath: '${fieldPath}', value:`, value);
  if (!fieldPath || formData === null || formData === undefined) {
    console.log(`[TAB DEBUG] Early return - invalid parameters`);
    return;
  }
  
  // Handle simple fields (no dots or brackets)
  if (!fieldPath.includes('.') && !fieldPath.includes('[')) {
    console.log(`[TAB DEBUG] Simple field assignment: ${fieldPath}`);
    formData[fieldPath] = value;
    return;
  }
  
  console.log(`[TAB DEBUG] Complex field path detected: ${fieldPath}`);
  
  // Handle complex paths - create nested structure if needed
  const segments = fieldPath.split(/[\.\[\]]/).filter(segment => segment !== '');
  let current = formData;
  
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    
    // Determine if next segment is an array index
    const isNextIndex = /^\d+$/.test(nextSegment);
    
    // Handle array indices
    if (/^\d+$/.test(segment)) {
      const index = parseInt(segment);
      if (!Array.isArray(current)) {
        console.warn(`[Workflow] Expected array for index ${index}, got:`, typeof current);
        return;
      }
      if (!current[index]) {
        current[index] = isNextIndex ? [] : {};
      }
      current = current[index];
    } else {
      // Handle object properties
      if (!current[segment]) {
        current[segment] = isNextIndex ? [] : {};
      }
      current = current[segment];
    }
  }
  
  // Set the final value
  const lastSegment = segments[segments.length - 1];
  if (/^\d+$/.test(lastSegment)) {
    const index = parseInt(lastSegment);
    if (Array.isArray(current)) {
      current[index] = value;
    } else {
      console.warn(`[Workflow] Cannot set array index ${index} on non-array:`, typeof current);
    }
  } else {
    current[lastSegment] = value;
  }
}

// Apply output mappings to save form data to process variables
function applyOutputMappings(nodeData, formData, processVars) {
  const { outputMappings = [] } = nodeData;
  // Apply output mappings
  
  outputMappings.forEach(mapping => {
    const { formField, processVariable } = mapping;
    
    try {
      // Use enhanced path resolution for complex fields
      const fieldValue = getFieldValue(formData, formField);
      
      if (fieldValue !== undefined) {
        // Map the value with proper type handling - pass formField for component type checking
        let mappedValue = processFieldValue(fieldValue, processVariable, formField);
        
        // Validate variable type consistency (ensure arrays stay arrays)
        mappedValue = validateVariableType(processVariable, mappedValue);
        
        // Set the process variable
        processVars[processVariable] = mappedValue;
      }
    } catch (error) {
      console.error(`[Workflow] Error mapping '${formField}' to '${processVariable}':`, error);
    }
  });
  
  // Output mappings applied
}

// Enhanced field value extraction with path support
function getFieldValue(formData, fieldPath) {
  if (!fieldPath || !formData) return undefined;
  
  // Handle simple fields (no dots or brackets)
  if (!fieldPath.includes('.') && !fieldPath.includes('[')) {
    return formData[fieldPath];
  }
  
  // Handle complex paths with JavaScript-style notation
  try {
    return resolvePath(formData, fieldPath);
  } catch (error) {
    console.warn(`[Workflow] Failed to resolve path '${fieldPath}':`, error);
    return undefined;
  }
}

// JavaScript-style path resolver
function resolvePath(obj, path) {
  // Handle wildcard paths like "experience[*].company"
  if (path.includes('[*]')) {
    return resolveWildcardPath(obj, path);
  }
  
  // Split path into segments: "experience[0].company" -> ["experience", "0", "company"]
  const segments = path.split(/[\.\[\]]/).filter(segment => segment !== '');
  
  return segments.reduce((current, segment) => {
    if (current === null || current === undefined) return undefined;
    
    // Handle array indices
    if (/^\d+$/.test(segment)) {
      const index = parseInt(segment);
      return Array.isArray(current) ? current[index] : undefined;
    }
    
    // Handle object properties
    return current[segment];
  }, obj);
}

// Wildcard path resolver for array operations
function resolveWildcardPath(obj, path) {
  const beforeWildcard = path.split('[*]')[0];
  const afterWildcard = path.split('[*]')[1];
  
  const arrayData = resolvePath(obj, beforeWildcard);
  if (!Array.isArray(arrayData)) {
    console.warn(`[Workflow] Expected array for wildcard path '${path}', got:`, typeof arrayData);
    return [];
  }
  
  if (!afterWildcard) {
    return arrayData; // Return entire array
  }
  
  // Extract specified field from each array item
  const fieldPath = afterWildcard.startsWith('.') ? afterWildcard.slice(1) : afterWildcard;
  return arrayData.map(item => resolvePath(item, fieldPath)).filter(val => val !== undefined);
}

// Process field value with type handling
function processFieldValue(fieldValue, processVariable, formField) {
  // Check if this is a dynamic component field (should always be array)
  const isDynamicComponent = isDynamicComponentField(formField);
  
  if (isDynamicComponent) {
    // For dynamic components, ensure we always return an array
    if (!Array.isArray(fieldValue)) {
      console.warn(`[Workflow] Dynamic component '${formField}' should be array, got:`, typeof fieldValue);
      return Array.isArray(fieldValue) ? fieldValue : [fieldValue];
    }
    console.log(`[Workflow] Dynamic component '${formField}' correctly handled as array with ${fieldValue.length} items`);
    return fieldValue; // Already an array
  }
  
  // Existing logic for other field types
  let mappedValue = fieldValue;
  
  // Special handling for common field types
  if (typeof fieldValue === 'string') {
    mappedValue = fieldValue.trim(); // Remove whitespace
  } else if (Array.isArray(fieldValue)) {
    // For multi-select fields (non-dynamic arrays), handle based on expected variable type
    const variableSource = process.value?.variables || process.value?.processVariables;
    const variableConfig = variableSource?.[processVariable];
    
    if (variableConfig?.type === 'string' && fieldValue.length > 0) {
      mappedValue = fieldValue[0]; // Take first selected value for string variables
    } else {
      mappedValue = fieldValue; // Keep as array for other types
    }
  }
  
  return mappedValue;
}

// Helper to check if field is from a dynamic component
function isDynamicComponentField(fieldName) {
  // Check against form structure to determine if this field comes from a dynamic component
  if (!currentForm.value?.formComponents) return false;
  
  return findFieldInComponents(currentForm.value.formComponents, fieldName);
}

// Recursive helper to find field in form components
function findFieldInComponents(components, fieldName) {
  for (const component of components) {
    if (component.props?.name === fieldName) {
      const isDynamic = ['repeating-table', 'dynamic-list', 'repeating-group'].includes(component.type);
      if (isDynamic) {
        console.log(`[Workflow] Found dynamic component field: ${fieldName} (${component.type})`);
      }
      return isDynamic;
    }
    
    // Check nested components (form-section, layout-grid)
    if (component.props?.children) {
      if (findFieldInComponents(component.props.children, fieldName)) {
        return true;
      }
    }
    
    if (component.props?.cells) {
      for (const cell of component.props.cells) {
        if (cell.component && findFieldInComponents([cell.component], fieldName)) {
          return true;
        }
      }
    }
    
    // Check tab-container tabs
    if (component.type === 'tab-container' && component.props?.tabs) {
      for (const tab of component.props.tabs) {
        if (tab.children && findFieldInComponents(tab.children, fieldName)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Recursively find field definition in form components (including tab containers)
function findFieldDefinitionRecursive(components, fieldName) {
  if (!components || !Array.isArray(components)) return null;
  
  for (const component of components) {
    // Check if this component matches the field name
    if (component.props?.name === fieldName) {
      console.log(`[TAB DEBUG] Found field definition for '${fieldName}':`, component.type);
      return component;
    }
    
    // Check nested components (form-section, layout-grid)
    if (component.props?.children) {
      const found = findFieldDefinitionRecursive(component.props.children, fieldName);
      if (found) return found;
    }
    
    // Check layout-grid cells
    if (component.props?.cells) {
      for (const cell of component.props.cells) {
        if (cell.component) {
          const found = findFieldDefinitionRecursive([cell.component], fieldName);
          if (found) return found;
        }
      }
    }
    
    // Check tab-container tabs
    if (component.type === 'tab-container' && component.props?.tabs) {
      for (const tab of component.props.tabs) {
        if (tab.children) {
          const found = findFieldDefinitionRecursive(tab.children, fieldName);
          if (found) return found;
        }
      }
    }
    
    // Check repeating-group fields
    if (component.props?.fields) {
      const found = findFieldDefinitionRecursive(component.props.fields, fieldName);
      if (found) return found;
    }
  }
  
  return null;
}

// Validate variable type consistency
function validateVariableType(processVariable, value) {
  const variableSource = process.value?.variables || process.value?.processVariables;
  const variableConfig = variableSource?.[processVariable];
  
  if (variableConfig?.type === 'array' && !Array.isArray(value)) {
    console.warn(`[Workflow] Variable '${processVariable}' expects array but got ${typeof value}`);
    return Array.isArray(value) ? value : [value];
  }
  
  return value;
}

// Apply button mappings to assign button click data to process variables
function applyButtonMappings(nodeData, buttonEvent, processVars) {
  const { buttonMappings = [] } = nodeData;
  console.log('[Workflow] Applying button mappings:', buttonMappings, 'for button:', buttonEvent.buttonName);
  
  buttonMappings.forEach(mapping => {
    const { formButton, processVariable, action, customValue } = mapping;
    if (formButton === buttonEvent.buttonName && processVariable) {
      let valueToAssign;
      
      switch (action) {
        case 'clicked':
          valueToAssign = true;
          break;
        case 'button_name':
          valueToAssign = buttonEvent.buttonName;
          break;
        case 'button_label':
          valueToAssign = buttonEvent.buttonLabel;
          break;
        case 'custom':
          valueToAssign = customValue || '';
          console.log(`[Workflow] Button custom value assignment: customValue=${customValue} (type: ${typeof customValue}), valueToAssign=${valueToAssign} (type: ${typeof valueToAssign})`);
          break;
        default:
          valueToAssign = true;
      }
      
      processVars[processVariable] = valueToAssign;
      console.log(`[Workflow] Button mapping applied: ${formButton} -> ${processVariable} = ${valueToAssign}`);
    }
  });
}

// Apply field conditions for dynamic form behavior
function applyFieldConditions(nodeData, processVars) {
  const { fieldConditions = [] } = nodeData;
  const fieldStates = {};
  
  fieldConditions.forEach(condition => {
    const { processVariable, operator, value, targetField, action } = condition;
    
    if (evaluateCondition({ variable: processVariable, operator, value }, processVars)) {
      fieldStates[targetField] = {
        ...fieldStates[targetField],
        [action]: true
      };
      console.log(`[Workflow] Field condition applied: ${targetField} -> ${action}`);
    }
  });
  
  return fieldStates;
}

// --- Modal Mapping Functions ---

// Apply modal input mappings to pre-fill modal fields with process variables
function applyModalInputMappings(nodeData, processVars, modalId) {
  const { modalMappings = {} } = nodeData;
  const { inputMappings = [] } = modalMappings;
  
  console.log('[DEBUG] applyModalInputMappings called with modalId:', modalId);
  console.log('[DEBUG] Available input mappings:', inputMappings);
  
  // Filter mappings for the specific modal
  const modalInputMappings = inputMappings.filter(mapping => 
    mapping.modal?.modalId === modalId
  );
  
  console.log('[DEBUG] Filtered mappings for modal:', modalInputMappings);
  
  if (modalInputMappings.length === 0) {
    console.log('[DEBUG] No mappings found for modal:', modalId);
    return {};
  }
  
  const modalData = {};
  
  modalInputMappings.forEach(mapping => {
    const { processVariable, modal } = mapping;
    const modalField = modal?.fieldName || modal?.modalField; // Support both field name formats
    
    console.log('[DEBUG] Processing mapping:', { processVariable, modalField, processVarValue: processVars[processVariable] });
    
    // Check if the process variable exists (including empty string values)
    if (processVars.hasOwnProperty(processVariable) && modalField) {
      let value = processVars[processVariable];
      
      console.log('[DEBUG] Setting modal field value:', modalField, '=', value);
      
      try {
        // Set modal field value using the same path resolution as form fields
        setFieldValue(modalData, modalField, value);
        console.log('[DEBUG] Successfully set modal field:', modalField);
      } catch (error) {
        console.error(`[Workflow] Error setting modal field '${modalField}':`, error);
        // Fallback to simple assignment
        modalData[modalField] = value;
      }
    } else {
      console.log('[DEBUG] Skipping mapping - processVariable exists:', processVars.hasOwnProperty(processVariable), 'modalField exists:', !!modalField);
    }
  });
  
  return modalData;
}

// Apply modal output mappings to save modal data to process variables
function applyModalOutputMappings(nodeData, modalData, processVars, modalId) {
  const { modalMappings = {} } = nodeData;
  const { outputMappings = [] } = modalMappings;
  
  // Filter mappings for the specific modal
  const modalOutputMappings = outputMappings.filter(mapping => 
    mapping.modal?.modalId === modalId
  );
  
  if (modalOutputMappings.length === 0) {
    return;
  }
  
  modalOutputMappings.forEach(mapping => {
    const { modal, processVariable } = mapping;
    const { modalField } = modal;
    
    if (modalField && processVariable) {
      try {
        // Get modal field value using the same path resolution as form fields
        const fieldValue = getFieldValue(modalData, modalField);
        
        if (fieldValue !== undefined) {
          // Process and assign the value to process variable
          processVars[processVariable] = fieldValue;
        }
      } catch (error) {
        console.error(`[Workflow] Error getting modal field '${modalField}':`, error);
      }
    }
  });
}

// Apply modal button mappings to track button clicks
function applyModalButtonMappings(nodeData, buttonName, processVars, modalId) {
  const { modalMappings = {} } = nodeData;
  const { buttonMappings = [] } = modalMappings;
  
  // Filter mappings for the specific modal and button
  const modalButtonMappings = buttonMappings.filter(mapping => 
    mapping.modal?.modalId === modalId && mapping.modal?.modalButton === buttonName
  );
  
  if (modalButtonMappings.length === 0) {
    return;
  }
  
  modalButtonMappings.forEach(mapping => {
    const { processVariable, value } = mapping;
    
    if (processVariable) {
      // Use the configured value or default to button name
      const buttonValue = value || buttonName;
      processVars[processVariable] = buttonValue;
    }
  });
}

// --- Utility: Build API request from node data ---
function buildApiRequest(nodeData, variables) {
  // 1. URL (with param substitution)
  let url = substituteVariables(nodeData.apiUrl, variables);

  // 2. Params (for GET, DELETE, etc.)
  let params = Array.isArray(nodeData.params) ? nodeData.params : [];
  if (params.length) {
    const query = params
      .filter(p => p.key)
      .map(p => `${encodeURIComponent(substituteVariables(p.key, variables))}=${encodeURIComponent(substituteVariables(p.value, variables))}`)
      .join('&');
    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }
  }

  // 3. Headers
  let headers = {};
  if (Array.isArray(nodeData.headers)) {
    nodeData.headers.forEach(h => {
      if (h.key) headers[substituteVariables(h.key, variables)] = substituteVariables(h.value, variables);
    });
  } else if (typeof nodeData.headers === 'object') {
    headers = { ...nodeData.headers };
  }

  // 4. Authorization
  if (nodeData.authorization && nodeData.authorization.type && nodeData.authorization.type !== 'none') {
    const auth = nodeData.authorization;

    if (auth.type === 'bearer' && auth.token) {
      headers['Authorization'] = `Bearer ${substituteVariables(auth.token, variables)}`;
    } else if (auth.type === 'basic') {
      if (auth.token) {
        // Basic Auth with token (JWT or other token)
        headers['Authorization'] = `Basic ${substituteVariables(auth.token, variables)}`;
      } else if (auth.username && auth.password) {
        // Basic Auth with username/password
        const token = btoa(`${substituteVariables(auth.username, variables)}:${substituteVariables(auth.password, variables)}`);
        headers['Authorization'] = `Basic ${token}`;
      }
    } else if (auth.type === 'apiKey' && auth.key && auth.value) {
      if (auth.in === 'header') {
        headers[substituteVariables(auth.key, variables)] = substituteVariables(auth.value, variables);
      } else if (auth.in === 'query') {
        url += (url.includes('?') ? '&' : '?') + `${encodeURIComponent(substituteVariables(auth.key, variables))}=${encodeURIComponent(substituteVariables(auth.value, variables))}`;
      }
    }
  }

  // 5. Body
  let body;
  if (nodeData.body && nodeData.body.type && nodeData.body.type !== 'none') {
    if (['form-data', 'x-www-form-urlencoded'].includes(nodeData.body.type)) {
      const dataArr = Array.isArray(nodeData.body.data) ? nodeData.body.data : [];
      if (nodeData.body.type === 'form-data') {
        body = new FormData();
        dataArr.forEach(item => {
          if (item.key) body.append(substituteVariables(item.key, variables), substituteVariables(item.value, variables));
        });
        // Remove content-type header for FormData (browser will set it)
        if (headers['Content-Type']) delete headers['Content-Type'];
      } else {
        // x-www-form-urlencoded
        body = dataArr
          .filter(item => item.key)
          .map(item => `${encodeURIComponent(substituteVariables(item.key, variables))}=${encodeURIComponent(substituteVariables(item.value, variables))}`)
          .join('&');
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }
    } else if (nodeData.body.type === 'raw') {
      body = substituteVariables(nodeData.body.data, variables);
      // Try to detect JSON
      if (body && body.trim().startsWith('{')) {
        headers['Content-Type'] = 'application/json';
      }
    } else if (nodeData.body.type === 'binary') {
      // Not supported in workflow execution context
      body = undefined;
    }
  }

  return { url, headers, body };
}

// Update executeCurrentStep for API node
const executeCurrentStep = async () => {
  try {
    stepLoading.value = true;
    console.log('[Workflow] Executing current step:', currentNode.value);
    if (currentNode.value?.type === 'api') {
      console.log(`[Workflow] Executing API node: ${currentNode.value.data?.label || currentNode.value.label}`);
      const nodeData = currentNode.value.data || {};

      // Use new structure if present (check for any new structure properties)
      if (nodeData.body !== undefined || nodeData.headers !== undefined || nodeData.params !== undefined || nodeData.authorization !== undefined) {
        const outputVariable = nodeData.outputVariable || 'apiResponse';
        const errorVariable = nodeData.errorVariable || 'apiError';
        const continueOnError = nodeData.continueOnError || false;
        
        try {
          // Use proxy endpoint to avoid CORS issues
          const response = await $fetch('https://bp.corrad.ai/api/process/workflow-api-call', {
            method: 'POST',
            body: {
              nodeData,
              processVariables: processVariables.value
            }
          });
          
          if (response.success) {
            processVariables.value[outputVariable] = response.data;
            processVariables.value[errorVariable] = null;
            console.log('[Workflow] API call success. Output variable set:', outputVariable, response.data);
            if (canAutoProgress(currentNode.value)) {
              moveToNextStep();
            } else {
              console.log('[Workflow] API completed, multiple paths available - waiting for user choice');
            }
          } else {
            processVariables.value[errorVariable] = response.error;
            console.error('[Workflow] API call failed:', response.error);
            if (continueOnError) {
              if (canAutoProgress(currentNode.value)) {
                moveToNextStep();
              } else {
                console.log('[Workflow] API failed but continuing, multiple paths available - waiting for user choice');
              }
            } else {
              error.value = 'API call failed: ' + (response.error.message || response.error);
              notifyParentOfError(error.value);
            }
          }
        } catch (err) {
          processVariables.value[errorVariable] = err;
          console.error('[Workflow] API call failed:', err);
          if (continueOnError) {
            if (canAutoProgress(currentNode.value)) {
              moveToNextStep();
            } else {
              console.log('[Workflow] API failed but continuing, multiple paths available - waiting for user choice');
            }
          } else {
            error.value = 'API call failed: ' + (err.message || err);
            notifyParentOfError(error.value);
          }
        }
      } else {
        // Fallback: old structure

        const {
          apiUrl,
          apiMethod = 'GET',
          headers = '{}',
          requestBody = '',
          outputVariable = 'apiResponse',
          errorVariable = 'apiError',
          continueOnError = false
        } = nodeData;
        try {
          const response = await $fetch(apiUrl, {
            method: apiMethod,
            headers: headers ? JSON.parse(headers) : {},
            body: requestBody ? JSON.parse(requestBody) : undefined,
          });
          processVariables.value[outputVariable] = response;
          processVariables.value[errorVariable] = null;
          console.log('[Workflow] API call success. Output variable set:', outputVariable, response);
          if (canAutoProgress(currentNode.value)) {
            moveToNextStep();
          } else {
            console.log('[Workflow] API completed, multiple paths available - waiting for user choice');
          }
        } catch (err) {
          processVariables.value[errorVariable] = err;
          console.error('[Workflow] API call failed:', err);
          if (continueOnError) {
            if (canAutoProgress(currentNode.value)) {
              moveToNextStep();
            } else {
              console.log('[Workflow] API failed but continuing, multiple paths available - waiting for user choice');
            }
          } else {
            error.value = 'API call failed: ' + (err.message || err);
            notifyParentOfError(error.value);
          }
        }
      }
    } else if (currentNode.value?.type === 'script') {
      const scriptCode = currentNode.value.data?.scriptCode;
      if (scriptCode) {
        try {
          // Expose processVariables to the script
          window.processVariables = processVariables.value;
          // Run the script code with processVariables in scope
          // eslint-disable-next-line no-new-func
          new Function('processVariables', scriptCode)(processVariables.value);
        } catch (err) {
          console.error('[Workflow] Error executing script node:', err);
          error.value = 'Script execution failed: ' + (err.message || err);
          notifyParentOfError(error.value);
        }
      }
      // Only auto-progress if there's a single outgoing edge
      if (canAutoProgress(currentNode.value)) {
        moveToNextStep();
      } else {
        console.log('[Workflow] Script completed, multiple paths available - waiting for user choice');
      }
    } else if (currentNode.value?.type === 'html') {
      console.log(`[Workflow] Processing HTML node: ${currentNode.value.data?.label || currentNode.value.label}`);
      // HTML nodes are user-interactive, so we don't auto-advance
      // The user will click a button to continue
      return;
    } else if (currentNode.value?.type === 'notification') {
      console.log(`[Workflow] Sending notification: ${currentNode.value.data?.label || currentNode.value.label}`);
      
      // Extract notification configuration
      const {
        notificationType = 'info',
        recipientType = 'email',
        recipientUser = '',
        recipientRole = '',
        recipientVariable = '',
        recipientEmail = '',
        subject = '',
        message = '',
        messageFormat = 'text',
        htmlMessage = '',
        richTextMessage = '',
        deliveryOptions = { inApp: true, email: false, sms: false },
        priority = 'medium',
        continueOnError = true
      } = currentNode.value.data || {};
      
      try {
        // Only send email if email delivery is enabled
        if (deliveryOptions.email && (subject || message)) {
          console.log('[Workflow] Sending email notification...');
          
          // Prepare notification payload
          const notificationPayload = {
            notificationType,
            recipientType,
            recipientData: {
              recipientUser,
              recipientRole,
              recipientVariable,
              recipientEmail
            },
            subject: substituteVariables(subject, processVariables.value),
            message: substituteVariables(message, processVariables.value),
            htmlMessage: htmlMessage ? substituteVariables(htmlMessage, processVariables.value) : '',
            messageFormat,
            processVariables: processVariables.value,
            processName: process.value?.processName || 'Process Workflow',
            deliveryOptions,
            priority
          };
          
          // Send notification via API
          const response = await $fetch('https://bp.corrad.ai/api/notifications/send', {
            method: 'POST',
            body: notificationPayload
          });
          
          if (response.success) {
            console.log('[Workflow] Email notification sent successfully:', response);
            // You could update process variables with notification results if needed
            processVariables.value.lastNotificationResult = {
              success: true,
              sent: response.sent,
              recipients: response.recipients,
              timestamp: new Date().toISOString()
            };
          } else {
            throw new Error(response.message || 'Failed to send notification');
          }
        } else {
          console.log('[Workflow] Email delivery disabled or no content - skipping email notification');
          
          // Handle in-app notifications if enabled
          if (deliveryOptions.inApp) {
            console.log('[Workflow] In-app notification would be displayed here');
            // In a real implementation, you would add the notification to a queue
            // or trigger an in-app notification system
          }
          
          // Set notification result in process variables
          processVariables.value.lastNotificationResult = {
            success: true,
            sent: 0,
            recipients: 0,
            timestamp: new Date().toISOString(),
            note: 'Email delivery disabled'
          };
        }
        
        // Only auto-progress if there's a single outgoing edge
        if (canAutoProgress(currentNode.value)) {
          moveToNextStep();
        } else {
          console.log('[Workflow] Notification processed, multiple paths available - waiting for user choice');
        }
      } catch (err) {
        console.error('[Workflow] Notification failed:', err);
        
        // Set error in process variables
        processVariables.value.lastNotificationError = {
          error: err.message || String(err),
          timestamp: new Date().toISOString()
        };
        
        if (continueOnError) {
          console.log('[Workflow] Continuing despite notification error');
          if (canAutoProgress(currentNode.value)) {
            moveToNextStep();
          } else {
            console.log('[Workflow] Notification failed but continuing, multiple paths available - waiting for user choice');
          }
        } else {
          error.value = 'Notification failed: ' + (err.message || err);
          notifyParentOfError(error.value);
        }
      }
    } else if (currentNode.value?.type === 'subprocess') {
      console.log(`[Workflow] Processing subprocess node: ${currentNode.value.data?.label || currentNode.value.label}`);
      
      try {
        const subprocessData = currentNode.value.data;
        if (!subprocessData?.subprocessId) {
          throw new Error('No subprocess selected');
        }
        
        // Map input variables from parent to subprocess
        const inputMappings = subprocessData.inputMappings || [];
        const subprocessInput = {};
        
        inputMappings.forEach(mapping => {
          if (mapping.sourceVariable && mapping.targetVariable) {
            const sourceValue = processVariables.value[mapping.sourceVariable];
            if (sourceValue !== undefined || mapping.createIfMissing) {
              subprocessInput[mapping.targetVariable] = sourceValue;
            }
          }
        });
        
        console.log('[Workflow] Subprocess input variables:', subprocessInput);
        
        // Update status variable if configured
        const executionOptions = subprocessData.executionOptions || {};
        if (executionOptions.statusVariable) {
          processVariables.value[executionOptions.statusVariable] = 'running';
        }
        
        // Execute subprocess
        const subprocessResponse = await $fetch(`https://bp.corrad.ai/api/subprocess/execute`, {
          method: 'POST',
          body: {
            processId: subprocessData.subprocessId,
            parentCaseId: caseId,
            inputVariables: subprocessInput,
            executionOptions
          }
        });
        
        if (!subprocessResponse.success) {
          throw new Error(subprocessResponse.error || 'Subprocess execution failed');
        }
        
        console.log('[Workflow] Subprocess started:', subprocessResponse.data);
        
        // If waitForCompletion is true, poll for completion
        if (executionOptions.waitForCompletion) {
          console.log('[Workflow] Waiting for subprocess completion...');
          
          const subprocessCaseId = subprocessResponse.data.caseId;
          const timeout = executionOptions.timeout || 300000; // 5 minutes default
          const startTime = Date.now();
          
          let subprocessComplete = false;
          let subprocessResult = null;
          
          while (!subprocessComplete && (timeout === 0 || Date.now() - startTime < timeout)) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
            
            const statusResponse = await $fetch(`https://bp.corrad.ai/api/subprocess/status/${subprocessCaseId}`);
            if (statusResponse.success) {
              const status = statusResponse.data.status;
              console.log(`[Workflow] Subprocess status: ${status}`);
              
              if (status === 'completed') {
                subprocessComplete = true;
                subprocessResult = statusResponse.data;
                
                // Update status variable
                if (executionOptions.statusVariable) {
                  processVariables.value[executionOptions.statusVariable] = 'completed';
                }
                
                // Map output variables from subprocess to parent
                const outputMappings = subprocessData.outputMappings || [];
                const subprocessVariables = subprocessResult.variables || {};
                
                outputMappings.forEach(mapping => {
                  if (mapping.sourceVariable && mapping.targetVariable) {
                    const sourceValue = subprocessVariables[mapping.sourceVariable];
                    if (sourceValue !== undefined || mapping.createIfMissing) {
                      processVariables.value[mapping.targetVariable] = sourceValue;
                    }
                  }
                });
                
                console.log('[Workflow] Subprocess output variables mapped:', outputMappings.length);
                
              } else if (status === 'failed' || status === 'error') {
                if (executionOptions.continueOnError) {
                  console.log('[Workflow] Subprocess failed but continuing on error');
                  subprocessComplete = true;
                  
                  // Update status and error variables
                  if (executionOptions.statusVariable) {
                    processVariables.value[executionOptions.statusVariable] = 'failed';
                  }
                  if (executionOptions.errorVariable) {
                    processVariables.value[executionOptions.errorVariable] = statusResponse.data.error || 'Subprocess failed';
                  }
                } else {
                  throw new Error(statusResponse.data.error || 'Subprocess execution failed');
                }
              }
            }
          }
          
          // Check for timeout
          if (!subprocessComplete && timeout > 0 && Date.now() - startTime >= timeout) {
            if (executionOptions.continueOnError) {
              console.log('[Workflow] Subprocess timed out but continuing on error');
              if (executionOptions.statusVariable) {
                processVariables.value[executionOptions.statusVariable] = 'timeout';
              }
              if (executionOptions.errorVariable) {
                processVariables.value[executionOptions.errorVariable] = 'Subprocess execution timed out';
              }
            } else {
              throw new Error('Subprocess execution timed out');
            }
          }
        } else {
          console.log('[Workflow] Subprocess started in background, not waiting for completion');
          if (executionOptions.statusVariable) {
            processVariables.value[executionOptions.statusVariable] = 'running';
          }
        }
        
        // Auto-progress if possible
        if (canAutoProgress(currentNode.value)) {
          moveToNextStep();
        }
        
      } catch (err) {
        console.error('[Workflow] Subprocess execution error:', err);
        const executionOptions = currentNode.value.data?.executionOptions || {};
        
        if (executionOptions.continueOnError) {
          console.log('[Workflow] Continuing despite subprocess error');
          
          // Update error variables
          if (executionOptions.statusVariable) {
            processVariables.value[executionOptions.statusVariable] = 'failed';
          }
          if (executionOptions.errorVariable) {
            processVariables.value[executionOptions.errorVariable] = err.message || 'Subprocess execution failed';
          }
          
          if (canAutoProgress(currentNode.value)) {
            moveToNextStep();
          }
        } else {
          error.value = 'Subprocess execution failed: ' + (err.message || err);
          notifyParentOfError(error.value);
        }
      }
    } else if (['decision', 'gateway'].includes(currentNode.value?.type)) {
      console.log(`[Workflow] Processing decision node: ${currentNode.value.data?.label || currentNode.value.label}`);
      // Decision nodes require user interaction or automatic condition evaluation
      // We'll handle this in the template section
      return;
    }
    // Add more node types as needed
  } catch (err) {
    console.error('[Workflow] Error executing step:', err);
    error.value = 'Failed to execute step';
    notifyParentOfError(error.value);
  } finally {
    stepLoading.value = false;
  }
};

// Get step type display info
const getStepInfo = (node) => {
  const stepTypes = {
    'start': { label: 'Process Started', icon: 'material-symbols:play-circle', color: 'green' },
    'form': { label: 'User Form', icon: 'material-symbols:description', color: 'blue' },
    'api': { label: 'API Call', icon: 'material-symbols:api', color: 'purple' },
    'script': { label: 'Script Execution', icon: 'material-symbols:code', color: 'orange' },
    'decision': { label: 'Decision Point', icon: 'material-symbols:alt-route', color: 'yellow' },
    'gateway': { label: 'Decision Gateway', icon: 'material-symbols:fork-right', color: 'yellow' },
    'html': { label: 'HTML Content', icon: 'material-symbols:code-blocks', color: 'indigo' },
    'notification': { label: 'Notification', icon: 'material-symbols:notifications', color: 'pink' },
    'end': { label: 'Process Complete', icon: 'material-symbols:check-circle', color: 'green' }
  };
  
  return stepTypes[node?.type] || { label: 'Unknown Step', icon: 'material-symbols:help', color: 'gray' };
};

// Load form data from database
const loadFormData = async (formId, retryCount = 0) => {
  try {
    if (!formId) {
      console.warn('[Workflow] No form ID provided to loadFormData');
      return null;
    }
    
    console.log(`[Workflow] Loading form data for ID: ${formId} (attempt ${retryCount + 1})`);
    const response = await $fetch(`https://bp.corrad.ai/api/forms/${formId}`);
    
    if (response.success && response.form) {
      console.log(`[Workflow] Form data loaded successfully for ID: ${formId}`);
      return response.form;
    } else {
      console.warn(`[Workflow] Form load failed - invalid response for ID: ${formId}`, response);
      throw new Error(`Invalid form response: ${response.message || 'Unknown error'}`);
    }
  } catch (fetchError) {
    console.error(`[Workflow] Error loading form ${formId}:`, fetchError);
    
    // Retry logic with exponential backoff
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      console.log(`[Workflow] Retrying form load in ${delay}ms (attempt ${retryCount + 2}/4)`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return loadFormData(formId, retryCount + 1);
    }
    
    // After all retries failed, set error state and return null
    error.value = `Failed to load form after ${retryCount + 1} attempts: ${fetchError.message || 'Network error'}`;
    console.error(`[Workflow] Form loading completely failed for ID: ${formId} after ${retryCount + 1} attempts`);
    return null;
  }
};

// Note: isInputType function removed as ComponentPreview handles all component types

// Get truncated custom script for display
const customScriptPreview = computed(() => {
  if (!currentForm.value?.customScript) return '';
  return currentForm.value.customScript.substring(0, 200) + '...';
});

// Handle script-driven field changes
const handleScriptFieldChange = ({ fieldName, value }) => {
  console.log('[WorkflowExecution] Script field change:', fieldName, '=', value);
  // Update form data with script changes
  formData.value[fieldName] = value;
  // Also update form store for ComponentPreview
  formStore.updatePreviewFormData(formData.value);
};

// Handle form data updates from ComponentPreview
const handleFormDataUpdate = (updatedData) => {
  // Update the form data with the new data (simple merge)
  // This ensures that repeating table data and other custom component data is included
  formData.value = { ...formData.value, ...updatedData };
  
  // Also ensure form store is updated for completeness
  // This helps maintain data consistency across components
  formStore.updatePreviewFormData(formData.value);
};

// Handle button click events and apply button mappings
const handleButtonClick = (buttonEvent) => {
  console.log('[Workflow] Button clicked:', buttonEvent);
  
  // Apply button mappings if configured
  if (currentNode.value?.data?.buttonMappings?.length > 0) {
    applyButtonMappings(currentNode.value.data, buttonEvent, processVariables.value);
  }
  
  // Apply output mappings to capture current form data before navigation
  if (currentNode.value?.data?.outputMappings?.length > 0) {
    console.log('[Workflow] Applying output mappings before button navigation');
    applyOutputMappings(currentNode.value.data, formData.value, processVariables.value);
  }
  
  // Check if any button mapping has navigation action
  if (currentNode.value?.data?.buttonMappings?.length > 0) {
    const buttonMapping = currentNode.value.data.buttonMappings.find(
      mapping => mapping.formButton === buttonEvent.buttonName && mapping.navigationAction === 'continue'
    );
    
    if (buttonMapping) {
      console.log('[Workflow] Button mapping has navigation action, moving to next step');
      // Wait a moment for variables to be updated then continue
      nextTick(() => {
        moveToNextStep();
        // If next node is a gateway, execute it automatically
        if (currentNode.value && ['decision', 'gateway'].includes(currentNode.value.type)) {
          executeDecisionNode();
        }
      });
    }
  }
};

// Handle conditional logic script generation
const handleConditionalLogicGenerated = (generatedScript) => {
  console.log('[WorkflowExecution] Conditional logic script generated');
  conditionalLogicScript.value = generatedScript;
  
  // Combine conditional logic with custom script
  const customScript = currentForm.value?.customScript || '';
  combinedScript.value = [conditionalLogicScript.value, customScript].filter(Boolean).join('\n\n');
};

// Modal event handlers
const handleModalSubmit = (modalData) => {
  console.log('[Workflow] Modal submit:', modalData);
  
  // Apply modal output mappings if configured
  if (currentNode.value?.data?.modalMappings?.outputMappings?.length > 0 && modalData.modalId) {
    applyModalOutputMappings(
      currentNode.value.data,
      modalData.formData || {},
      processVariables.value,
      modalData.modalId
    );
  } else {
    // Fallback: Update process variables with modal form data (legacy behavior)
    if (modalData.formData && Object.keys(modalData.formData).length > 0) {
      Object.entries(modalData.formData).forEach(([key, value]) => {
        if (processVariables.value.hasOwnProperty(key)) {
          processVariables.value[key] = value;
        }
      });
      console.log('[Workflow] Updated process variables from modal (fallback):', modalData.formData);
    }
  }
  
  // Close the modal
  handleCloseModal(modalData.modalId);
};

const handleModalClose = (modalData) => {
  console.log('[Workflow] Modal close:', modalData);
  handleCloseModal(modalData.modalId);
};

// Handle process variable updates from modal mappings
const handleProcessVariableUpdate = (eventData) => {
  console.log('[Workflow] Process variable update from modal:', eventData);
  
  if (eventData.variableUpdates && Object.keys(eventData.variableUpdates).length > 0) {
    // Update process variables with the new values
    Object.entries(eventData.variableUpdates).forEach(([variableName, value]) => {
      processVariables.value[variableName] = value;
      console.log(`[Workflow] Updated process variable: ${variableName} = ${value}`);
    });
    
    // Variables are reactive and will persist automatically
  }
};

// Handle modal field changes for tracking
const handleModalFieldChanged = (eventData) => {
  console.log('[Workflow] Modal field changed:', eventData);
  
  // You can add additional tracking logic here if needed
  // For example, logging field changes to analytics or audit trail
};

// Handle modal button tracking
const handleModalButtonTracked = (eventData) => {
  console.log('[Workflow] Modal button tracked:', eventData);
  
  // Apply modal button mappings if configured
  if (currentNode.value?.data?.modalMappings?.buttonMappings?.length > 0 && eventData.modalId && eventData.buttonName) {
    applyModalButtonMappings(
      currentNode.value.data,
      eventData.buttonName,
      processVariables.value,
      eventData.modalId
    );
  }
  
  // You can add additional tracking logic here if needed
  // For example, logging button clicks to analytics or triggering special workflows
};

// Navigation functions
const goHome = () => {
  router.push('/');
};

// Update URL when process completes
const updateUrlOnComplete = () => {
  if (isIframeMode.value) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('complete', 'true');
    // Use replaceState to avoid adding to browser history
    window.history.replaceState({}, '', currentUrl.toString());
    console.log('[Workflow] URL updated with complete=true');
    
    // Also notify parent iframe if we're in an iframe
    try {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'workflow-complete',
          processId: processId.value,
          processName: process.value?.processName,
          hideCompletionMessage: hideCompletionMessage.value,
          timestamp: new Date().toISOString()
        }, '*');
        console.log('[Workflow] Message sent to parent iframe');
      }
    } catch (error) {
      console.log('[Workflow] Could not send message to parent:', error);
    }
  }
};

// Notify parent iframe of errors
const notifyParentOfError = (errorMessage) => {
  if (isIframeMode.value) {
    try {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'workflow-error',
          processId: processId.value,
          processName: process.value?.processName,
          error: errorMessage,
          timestamp: new Date().toISOString()
        }, '*');
        console.log('[Workflow] Error message sent to parent iframe');
      }
    } catch (error) {
      console.log('[Workflow] Could not send error message to parent:', error);
    }
  }
};

/*
 * PARENT IFRAME INTEGRATION GUIDE:
 * 
 * The workflow will send messages to the parent iframe when in iframe mode (?debug=false):
 * 
 * 1. Process Completion:
 *    - URL will be updated with ?complete=true
 *    - Message sent: { type: 'workflow-complete', processId, processName, hideCompletionMessage, timestamp }
 * 
 * 2. Process Error:
 *    - Message sent: { type: 'workflow-error', processId, processName, error, timestamp }
 * 
 * URL Parameters:
 * - ?debug=false: Enable iframe mode (hide UI chrome)
 * - ?hideComplete=true: Hide completion message (for seamless multi-process workflows)
 * 
 * Example parent iframe listener:
 * 
 * window.addEventListener('message', (event) => {
 *   if (event.data.type === 'workflow-complete') {
 *     console.log('Workflow completed:', event.data);
 *     // Handle completion - redirect to next process if needed
 *     if (event.data.hideCompletionMessage) {
 *       // User won't see completion message, redirect immediately
 *       redirectToNextProcess();
 *     }
 *   } else if (event.data.type === 'workflow-error') {
 *     console.log('Workflow error:', event.data);
 *     // Handle error
 *   }
 * });
 * 
 * To check URL for completion:
 * const urlParams = new URLSearchParams(window.location.search);
 * if (urlParams.get('complete') === 'true') {
 *   // Process is complete
 * }
 * 
 * MULTI-PROCESS WORKFLOW EXAMPLE:
 * 
 * // Parent system with multiple processes
 * const processes = [
 *   { id: 'process1', name: 'Personal Information' },
 *   { id: 'process2', name: 'Employment Details' },
 *   { id: 'process3', name: 'Document Upload' },
 *   { id: 'process4', name: 'Final Review' }
 * ];
 * 
 * let currentProcessIndex = 0;
 * 
 * function loadProcess(processIndex) {
 *   if (processIndex >= processes.length) {
 *     // All processes complete
 *     showFinalSuccess();
 *     return;
 *   }
 *   
 *   const process = processes[processIndex];
 *   const iframe = document.getElementById('workflow-iframe');
 *   
 *   // Load process with hidden completion message
 *   iframe.src = `/workflow/${process.id}?debug=false&hideComplete=true`;
 *   currentProcessIndex = processIndex;
 * }
 * 
 * // Listen for completion and auto-advance
 * window.addEventListener('message', (event) => {
 *   if (event.data.type === 'workflow-complete') {
 *     console.log(`Process ${event.data.processName} completed`);
 *     
 *     if (event.data.hideCompletionMessage) {
 *       // Seamlessly move to next process
 *       setTimeout(() => {
 *         loadProcess(currentProcessIndex + 1);
 *       }, 100); // Small delay for smooth transition
 *     }
 *   } else if (event.data.type === 'workflow-error') {
 *     console.error('Process failed:', event.data.error);
 *     showErrorMessage(event.data.error);
 *   }
 * });
 * 
 * // Start the first process
 * loadProcess(0);
 */

// Load process on mount
onMounted(() => {
  loadProcess();
});

// Watch for process loading completion to load global modals
watch(() => process.value, async (newProcess) => {
  if (newProcess?.processDefinition) {
    await loadGlobalModals();
  }
}, { immediate: true });

// Watch for step changes to auto-execute non-form steps or load form data
watch(currentStep, async (newStep) => {
  if (currentNode.value) {
    stepLoading.value = true; // Start loading for any node
    try {
      console.log('[Workflow] Step changed to:', newStep, 'Node type:', currentNode.value.type, 'Node label:', currentNode.value.data?.label);
      
      if (["api", "script", "notification", "subprocess"].includes(currentNode.value.type)) {
        await executeCurrentStep();
      } else if (currentNode.value.type === "form") {
        // Reset all form-related state to prevent flush errors
        formData.value = {};
        fieldStates.value = {};
        formStore.updatePreviewFormData({});
        formStore.formComponents = [];
        // Load form data for form nodes
        const formId = currentNode.value.data?.formId;
        if (formId) {
          currentForm.value = await loadFormData(formId);
          
          // Check if form loading failed
          if (!currentForm.value) {
            console.error(`[Workflow] Form loading failed for ID: ${formId}, showing error state`);
            stepLoading.value = false;
            return; // Don't proceed with form setup if loading failed
          }
          // Apply input mappings to pre-fill form
          if (currentNode.value.data?.inputMappings) {
            applyInputMappings(
              currentNode.value.data, 
              processVariables.value, 
              formData.value
            );
          }
          // Apply field conditions
          if (currentNode.value.data?.fieldConditions) {
            fieldStates.value = applyFieldConditions(
              currentNode.value.data, 
              processVariables.value
            );
          }
          // Update form store with form components and data for ComponentPreview
          if (currentForm.value?.formComponents) {
            // Only update form components if they actually changed to prevent unnecessary re-renders
            const currentStoreComponents = JSON.stringify(formStore.formComponents);
            const newComponents = JSON.stringify(currentForm.value.formComponents);
            
            if (currentStoreComponents !== newComponents) {
              formStore.formComponents = currentForm.value.formComponents;
            }
            
            // Initialize repeating groups and tables in form data
            const updatedFormData = { ...formData.value };
            
            // Initialize all form fields with proper default values
            initializeFormFields(currentForm.value.formComponents, updatedFormData);
            currentForm.value.formComponents.forEach(component => {
              if (component.type === 'repeating-group' && component.props?.name) {
                const groupName = component.props.name;
                const minItems = component.props.minItems || 1;
                
                // If the field doesn't exist or is not an array, initialize it
                if (!updatedFormData[groupName] || !Array.isArray(updatedFormData[groupName])) {
                  const initialGroups = [];
                  
                  for (let i = 0; i < minItems; i++) {
                    const newGroup = {};
                    
                    // Add fields from configuration (legacy)
                    if (component.props.fields) {
                      component.props.fields.forEach(field => {
                        newGroup[field.name] = '';
                      });
                    }
                    
                    // Add fields from children components (form builder format)
                    if (component.props.children) {
                      const extractFieldsFromComponent = (comp) => {
                        if (!comp) return;
                        
                        // If this component has a name, add it to the group
                        if (comp.props && comp.props.name) {
                          // Initialize with default value based on component type
                          switch (comp.type) {
                            case 'number':
                              newGroup[comp.props.name] = 0;
                              break;
                            case 'checkbox':
                              newGroup[comp.props.name] = [];
                              break;
                            case 'select':
                              if (comp.props.options && comp.props.options.length > 0) {
                                newGroup[comp.props.name] = comp.props.options[0].value || '';
                              } else {
                                newGroup[comp.props.name] = '';
                              }
                              break;
                            default:
                              newGroup[comp.props.name] = '';
                          }
                        }
                        
                        // Handle layout grid components
                        if (comp.type === 'layout-grid' && comp.props.cells) {
                          comp.props.cells.forEach(cell => {
                            if (cell.component) {
                              extractFieldsFromComponent(cell.component);
                            }
                          });
                        }
                        
                        // Handle nested container components
                        if (comp.props.children && Array.isArray(comp.props.children)) {
                          comp.props.children.forEach(nestedChild => {
                            extractFieldsFromComponent(nestedChild);
                          });
                        }
                      };
                      
                      component.props.children.forEach(child => {
                        extractFieldsFromComponent(child);
                      });
                    }
                    
                    initialGroups.push(newGroup);
                  }
                  
                  updatedFormData[groupName] = initialGroups;
                }
              } else if (component.type === 'repeating-table' && component.props?.name) {
                const tableName = component.props.name;
                
                // If the field doesn't exist or is not an array, initialize it as empty array
                if (!updatedFormData[tableName] || !Array.isArray(updatedFormData[tableName])) {
                  updatedFormData[tableName] = component.props.defaultData ? [...component.props.defaultData] : [];
                }
              }
            });
            
            formData.value = updatedFormData;
            formStore.updatePreviewFormData(updatedFormData);
          }
        }
      } else if (["decision", "gateway"].includes(currentNode.value.type)) {
        console.log('[Workflow] Processing gateway/decision node');
        await executeDecisionNode();
      }
      // html nodes are handled in template - no auto-execution needed
    } catch (err) {
      console.error('[Workflow] Error in step change watch:', err);
      error.value = 'Error processing workflow step: ' + (err.message || err);
    } finally {
      stepLoading.value = false; // End loading after all async work
    }
  }
});

// Watch formData changes and sync with form store
watch(formData, (newData) => {
  formStore.updatePreviewFormData(newData);
}, { deep: true });

// Watch for process variable changes and re-evaluate field conditions
watch(processVariables, (newVars) => {
  if (currentNode.value?.type === 'form' && currentNode.value.data?.fieldConditions) {
    fieldStates.value = applyFieldConditions(currentNode.value.data, newVars);
  }
}, { deep: true });

// Add FormKit form ref
const formRef = ref(null);

// New: handle FormKit form submit
const onFormKitSubmit = () => {
  // Check if confirmation modal is enabled for the current form
  if (currentForm.value?.submitButton?.confirmationModal?.enabled) {
    showSubmitConfirmationModal.value = true;
    return;
  }
  
  // If no confirmation needed, proceed with form submission
  handleFormSubmit();
};


// New: validate and submit handler for button
const validateAndSubmit = () => {
  // Always trigger FormKit validation first
  if (formRef.value && formRef.value.node && typeof formRef.value.node.submit === 'function') {
    formRef.value.node.submit();
  }
};

// Handle decision node execution (automatic or manual)
const executeDecisionNode = async () => {
  try {
    stepLoading.value = true;
    const currentNodeObj = workflowData.value.nodes[currentStep.value];
    const { executionType = 'automatic' } = currentNodeObj.data || {};

    // Debug: Log process variables before evaluating gateway
    console.log('[Gateway Debug] Current processVariables:', JSON.stringify(processVariables.value, null, 2));
    console.log('[Gateway Debug] Current node:', currentNodeObj);
    console.log('[Gateway Debug] Execution type:', executionType);

    if (executionType === 'automatic') {
      // Automatic decision based on conditions
      const nextNodeId = getNextNodeIdForDecision(currentNodeObj.id);
      console.log('[Gateway Debug] Next node ID from decision:', nextNodeId);
      
      if (nextNodeId) {
        if (moveToSpecificNode(nextNodeId)) {
          const node = workflowData.value.nodes[currentStep.value];
          console.log(`[Workflow] Decision made automatically, moving to: ${node.data?.label || node.label}`);
          
          // Continue execution if the next node is also auto-executable
          if (currentNode.value && ['api', 'script', 'notification'].includes(currentNode.value.type)) {
            await executeCurrentStep();
          } else if (currentNode.value && ['decision', 'gateway'].includes(currentNode.value.type)) {
            // Recursively handle nested gateways
            await executeDecisionNode();
          }
        }
      } else {
        console.warn('[Gateway Debug] No valid next node found for automatic decision');
        error.value = 'Unable to determine next step in workflow';
      }
    }
    // Manual decisions are handled in the template with buttons
  } catch (err) {
    console.error('[Workflow] Error executing decision:', err);
    error.value = 'Failed to execute decision: ' + (err.message || err);
  } finally {
    stepLoading.value = false;
  }
};

// Handle manual decision choice
const makeDecision = (targetNodeId) => {
  if (moveToSpecificNode(targetNodeId)) {
    const node = workflowData.value.nodes[currentStep.value];
    console.log(`[Workflow] Manual decision made, moving to: ${node.data?.label || node.label}`);
  }
};

// Helper: Interpolate process variables in HTML content
const interpolateHtmlContent = (htmlContent) => {
  if (!htmlContent || typeof htmlContent !== 'string') return htmlContent;
  // Replace {{ processVariables.variableName }} with actual values
  return htmlContent.replace(/\{\{\s*processVariables\.(\w+)\s*\}\}/g, (match, variableName) => {
    const value = processVariables.value[variableName];
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') {
      // Pretty print object as JSON, wrapped in <pre> if not already inside <pre>
      return `<pre style='display:inline;white-space:pre-wrap;'>${JSON.stringify(value, null, 2)}</pre>`;
    }
    return String(value);
  });
};

// Compute the workflow path by following edges from start to end
function computeWorkflowPath() {
  const path = [];
  const nodes = workflowData.value?.nodes || [];
  const edges = workflowData.value?.edges || [];
  
  if (!nodes.length) return path;
  
  const visitedNodes = new Set();
  let node = nodes.find(n => n.type === 'start');
  
  while (node && !visitedNodes.has(node.id)) {
    visitedNodes.add(node.id);
    path.push(node.id);
    
    // Stop if we've reached the end node
    if (node.type === 'end') break;
    
    const outgoingEdges = edges.filter(e => e.source === node.id);
    
    // Handle different cases for outgoing edges
    if (outgoingEdges.length === 0) {
      // No more edges, end of path
      break;
    } else if (outgoingEdges.length === 1) {
      // Single path, continue normally
      const edge = outgoingEdges[0];
      node = nodes.find(n => n.id === edge.target);
    } else {
      // Multiple paths (gateway/decision node)
      // For linear path computation, we can't determine which path to take
      // without executing the conditions, so we stop here
      console.log('[Workflow] Branching detected at node', node.data?.label || node.id, '- stopping linear path computation');
      break;
    }
    
    // Safety check to prevent infinite loops
    if (path.length > 50) {
      console.warn('[Workflow] Path computation safety limit reached, stopping');
      break;
    }
  }
  
  return path;
}

const workflowPath = ref([]);

watch(
  () => workflowData.value,
  () => {
    workflowPath.value = computeWorkflowPath();
  },
  { immediate: true }
);

const currentStepIndex = computed(() => {
  if (!currentNode.value?.id) return 0;
  
  // For workflows with branching, use node position in the overall flow
  const nodeIndex = workflowPath.value.indexOf(currentNode.value.id);
  if (nodeIndex !== -1) {
    return nodeIndex + 1;
  }
  
  // Fallback: count how many steps we've been through
  const allNodes = workflowData.value?.nodes || [];
  const startIndex = allNodes.findIndex(n => n.type === 'start');
  const currentIndex = allNodes.findIndex(n => n.id === currentNode.value.id);
  
  if (startIndex !== -1 && currentIndex !== -1) {
    return Math.min(currentIndex - startIndex + 1, allNodes.length);
  }
  
  return 1;
});

const totalSteps = computed(() => {
  // For workflows with branching, estimate total based on all nodes
  const allNodes = workflowData.value?.nodes || [];
  const linearPath = workflowPath.value.length;
  
  // If we have a complete linear path, use it
  if (linearPath > 0 && allNodes.some(n => n.type === 'end')) {
    const hasEndInPath = workflowPath.value.some(nodeId => 
      allNodes.find(n => n.id === nodeId)?.type === 'end'
    );
    if (hasEndInPath) {
      return linearPath;
    }
  }
  
  // Otherwise, estimate based on total nodes (excluding start/end for better UX)
  return Math.max(allNodes.filter(n => !['start', 'end'].includes(n.type)).length, 1);
});

// Computed: Interpolated HTML content for HTML nodes
const interpolatedHtmlContent = computed(() => {
  if (currentNode.value?.type !== 'html') return '';
  const htmlContent = currentNode.value?.data?.htmlCode || currentNode.value?.data?.htmlContent || '';
  // Interpolate variables in HTML
  const interpolated = substituteVariables(htmlContent, processVariables.value);
  return interpolateHtmlContent(interpolated);
});

// Modal event handlers
const handleOpenModal = (modalId) => {
  if (modalId) {
    console.log('[DEBUG] Opening modal:', modalId);
    console.log('[DEBUG] Modal mappings:', currentNode.value?.data?.modalMappings);
    console.log('[DEBUG] Input mappings count:', currentNode.value?.data?.modalMappings?.inputMappings?.length || 0);
    
    // Apply modal input mappings if configured
    if (currentNode.value?.data?.modalMappings?.inputMappings?.length > 0) {
      const modalInputData = applyModalInputMappings(
        currentNode.value.data, 
        processVariables.value, 
        modalId
      );
      
      // Store modal input data for the modal to use
      console.log('[DEBUG] Modal input data generated:', modalInputData);
      if (Object.keys(modalInputData).length > 0) {
        console.log('[DEBUG] Storing modal input data for modal:', modalId);
        // Update modal data in form store or pass to ComponentPreview
        // The modal will pick up this data through the modalInputData prop
        modalInputDataStore.value = {
          ...modalInputDataStore.value,
          [modalId]: modalInputData
        };
        console.log('[DEBUG] Modal input data store:', modalInputDataStore.value);
      } else {
        console.log('[DEBUG] No modal input data to store');
      }
    }
    
    modalStates.value = {
      ...modalStates.value,
      [modalId]: true
    };
  }
};

const handleCloseModal = (modalId) => {
  if (modalId) {
    modalStates.value = {
      ...modalStates.value,
      [modalId]: false
    };
  }
};

// Load all modals from workflow forms at startup
const loadGlobalModals = async () => {
  try {
    if (!workflowData.value?.nodes) return;

    const allModals = {};

    // Find all form nodes in the workflow
    const formNodes = workflowData.value.nodes.filter(node => 
      node.type === 'form' && node.data?.formId
    );

    // Load each form and extract its modals
    for (const formNode of formNodes) {
      try {
        const formData = await loadFormData(formNode.data.formId);
        
        // Check both formModals (database field) and modals (computed field)
        const modalSource = formData?.formModals || formData?.modals;
        if (modalSource && Object.keys(modalSource).length > 0) {
          Object.assign(allModals, modalSource);
        }
      } catch (error) {
        // Silently continue if a form fails to load
      }
    }

    globalModals.value = allModals;
  } catch (error) {
    // Silently handle errors
  }
};

// Computed: CSS styles for HTML nodes
const htmlNodeStyles = computed(() => {
  if (currentNode.value?.type !== 'html') return '';
  return currentNode.value?.data?.cssCode || '';
});

// Computed: Condition evaluation results for gateway nodes
const conditionEvaluationResults = computed(() => {
  if (!['decision', 'gateway'].includes(currentNode.value?.type)) return [];
  if (!currentNode.value?.data?.conditions) return [];
  
  return currentNode.value.data.conditions.map(conditionGroup => 
    getConditionGroupResult(conditionGroup, processVariables.value)
  );
});

// CSS injection for HTML nodes
let currentStyleElement = null;
// JS injection for HTML nodes
let currentHtmlScriptElement = null;

// Function to inject CSS
const injectHtmlNodeCSS = (cssCode) => {
  // Remove previous style element
  if (currentStyleElement) {
    currentStyleElement.remove();
    currentStyleElement = null;
  }
  // Interpolate variables in CSS
  const processedCss = substituteVariables(cssCode, processVariables.value);
  // Add new styles if available
  if (processedCss && processedCss.trim()) {
    currentStyleElement = document.createElement('style');
    currentStyleElement.textContent = processedCss;
    currentStyleElement.setAttribute('data-workflow-html-node', 'true');
    document.head.appendChild(currentStyleElement);
  }
};

// Function to inject JS
const injectHtmlNodeJS = (jsCode) => {
  // Remove previous script if exists
  if (currentHtmlScriptElement) {
    currentHtmlScriptElement.remove();
    currentHtmlScriptElement = null;
  }
  // Expose processVariables to global scope
  window.processVariables = processVariables.value;
  // Interpolate variables in JS code
  const processedJsCode = substituteVariables(jsCode, processVariables.value);
  if (processedJsCode && processedJsCode.trim()) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = processedJsCode;
    script.setAttribute('data-workflow-html-node', 'true');
    document.body.appendChild(script);
    currentHtmlScriptElement = script;
  }
};

// Watch for HTML node CSS changes and inject styles
watch(htmlNodeStyles, (newStyles) => {
  injectHtmlNodeCSS(newStyles);
}, { immediate: true });

// Watch for HTML node JS changes and inject script
watch(
  () => currentNode.value?.type === 'html' ? currentNode.value?.data?.jsCode : '',
  (newJsCode) => {
    nextTick(() => {
      injectHtmlNodeJS(newJsCode);
    });
  },
  { immediate: true }
);

// Cleanup styles and JS on unmount
onUnmounted(() => {
  if (currentStyleElement) {
    currentStyleElement.remove();
    currentStyleElement = null;
  }
  if (currentHtmlScriptElement) {
    currentHtmlScriptElement.remove();
    currentHtmlScriptElement = null;
  }
});

// Helper: Get next node object for single-path nodes
function getNextNodeObject(currentNode) {
  if (!currentNode || !workflowData.value?.nodes) return null;
  const edges = getOutgoingEdges(currentNode.id);
  if (edges.length !== 1) return null;
  const nextNodeId = edges[0].target;
  return workflowData.value.nodes.find(n => n.id === nextNodeId) || null;
}

// Helper: Get next node label by node ID
function getNodeLabel(nodeId) {
  const node = workflowData.value.nodes.find(n => n.id === nodeId);
  return node?.data?.label || node?.label || 'Next Step';
}

// Helper: Get human-readable condition description
function getConditionDescription(condition, variables) {
  const { variable, operator, value, valueType } = condition;
  const variableValue = variables[variable];
  
  let operatorText = operator;
  switch (operator) {
    case 'eq': operatorText = '='; break;
    case 'neq': operatorText = '≠'; break;
    case 'gt': operatorText = '>'; break;
    case 'lt': operatorText = '<'; break;
    case 'gte': operatorText = '≥'; break;
    case 'lte': operatorText = '≤'; break;
    case 'contains': operatorText = 'contains'; break;
    case 'not_contains': operatorText = 'does not contain'; break;
    case 'starts_with': operatorText = 'starts with'; break;
    case 'ends_with': operatorText = 'ends with'; break;
    case 'empty': operatorText = 'is empty'; break;
    case 'not_empty': operatorText = 'is not empty'; break;
    case 'is_true': operatorText = 'is true'; break;
    case 'is_false': operatorText = 'is false'; break;
  }
  
  if (['empty', 'not_empty', 'is_true', 'is_false'].includes(operator)) {
    return `${variable} ${operatorText}`;
  }
  
  return `${variable} ${operatorText} ${value}`;
}

// Helper: Get condition group evaluation result
function getConditionGroupResult(conditionGroup, variables) {
  const results = conditionGroup.conditions.map(condition => {
    const result = evaluateCondition(condition, variables);
    const description = getConditionDescription(condition, variables);
    return { result, description };
  });
  
  return {
    group: conditionGroup,
    results,
    finalResult: evaluateConditionGroup(conditionGroup, variables)
  };
}

// Helper: Get submit button variant for RsButton
const getSubmitButtonVariant = () => {
  // If form has submit button configuration, use it
  if (currentForm.value?.submitButton) {
    const { category } = currentForm.value.submitButton;
    return category || 'primary';
  }
  // Fallback to primary
  return 'primary';
};

// Helper: Get submit button styles using theme colors
const getWorkflowSubmitButtonStyle = () => {
  // If form has submit button configuration, use it
  if (currentForm.value?.submitButton) {
    const { category = 'primary', color = 'primary' } = currentForm.value.submitButton;
    
    // Use CSS custom properties from theme.css with opacity based on category
    const opacity = category === 'primary' ? '1' : '0.8';
    const hoverOpacity = category === 'primary' ? '0.9' : '0.7';
    
    return {
      backgroundColor: `rgba(var(--color-${color}), ${opacity})`,
      '--hover-bg': `rgba(var(--color-${color}), ${hoverOpacity})`,
      color: 'white',
      border: 'none'
    };
  }
  
  // Fallback to default styling
  return {};
};

// Enhanced form field initialization function
function initializeFormFields(components, formData, parentPath = '') {
  components.forEach(component => {
    const fieldPath = parentPath ? `${parentPath}.${component.props?.name}` : component.props?.name;
    
    // Initialize simple input fields with appropriate default values
    if (component.props?.name && isInputComponent(component.type)) {
      if (!hasNestedValue(formData, fieldPath)) {
        const defaultValue = getDefaultValueForComponent(component);
        setNestedValue(formData, fieldPath, defaultValue);
        console.log(`[Workflow] Initialized field '${fieldPath}' with default:`, defaultValue);
      }
    }
    
    // Handle complex container components
    switch (component.type) {
      case 'repeating-group':
        initializeRepeatingGroupField(component, formData);
        break;
      case 'form-section':
        initializeFormSectionField(component, formData);
        break;
      case 'layout-grid':
        initializeLayoutGridField(component, formData);
        break;
      case 'repeating-table':
      case 'data-table': // Legacy support
        initializeDataTableField(component, formData);
        break;
      case 'dynamic-list':
        initializeDynamicListField(component, formData);
        break;
      case 'tab-container':
        initializeTabContainerField(component, formData);
        break;
    }
  });
}

// Check if component type is an input component
function isInputComponent(type) {
  const inputTypes = [
    'text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 
    'select', 'checkbox', 'radio', 'switch', 'date', 'time', 
    'datetime-local', 'range', 'color', 'file', 'otp', 'dropzone',
    'mask', 'hidden'
  ];
  return inputTypes.includes(type);
}

// Get default value for a component based on its type
// This function matches ComponentPreview.vue's getFieldValue priority system
function getDefaultValueForComponent(component) {
  // First priority: Check for defaultValue property (matches ComponentPreview)
  if (component.props.defaultValue !== undefined && component.props.defaultValue !== null) {
    return component.props.defaultValue;
  }
  
  // Second priority: Type-based defaults for select fields
  if (component.type === 'select' && component.props.options && component.props.options.length > 0) {
    return component.props.multiple ? [] : component.props.options[0].value || '';
  }
  
  // Third priority: Type-based defaults
  switch (component.type) {
    case 'number':
    case 'range':
      return 0;
    case 'checkbox':
      return component.props.multiple ? [] : false;
    case 'select':
      return component.props.multiple ? [] : '';
    case 'radio':
      return undefined; // No default selection for radio buttons
    case 'switch':
      return false;
    case 'file':
      return null;
    default:
      // Fourth priority: Component value property as fallback (matches ComponentPreview)
      return component.props.value || '';
  }
}

// Check if a nested value exists
function hasNestedValue(obj, path) {
  try {
    return getFieldValue(obj, path) !== undefined;
  } catch {
    return false;
  }
}

// Set a nested value
function setNestedValue(obj, path, value) {
  try {
    setFieldValue(obj, path, value);
  } catch (error) {
    console.warn(`[Workflow] Failed to set nested value '${path}':`, error);
  }
}

// Initialize repeating group fields
function initializeRepeatingGroupField(component, formData) {
  const groupName = component.props?.name;
  if (!groupName) return;
  
  const minItems = component.props?.minItems || 1;
  
  if (!formData[groupName] || !Array.isArray(formData[groupName])) {
    formData[groupName] = [];
    
    for (let i = 0; i < minItems; i++) {
      const newItem = {};
      
      // Initialize from legacy fields format
      if (component.props.fields) {
        component.props.fields.forEach(field => {
          if (field.name) {
            newItem[field.name] = getDefaultValueForFieldType(field.type);
          }
        });
      }
      
      // Initialize from form builder children format
      if (component.props.children) {
        initializeFormFields(component.props.children, newItem);
      }
      
      formData[groupName].push(newItem);
    }
    
    console.log(`[Workflow] Initialized repeating group '${groupName}' with ${minItems} items`);
  }
}

// Initialize form section fields
function initializeFormSectionField(component, formData) {
  if (component.props?.fields) {
    initializeFormFields(component.props.fields, formData);
  }
  if (component.props?.children) {
    initializeFormFields(component.props.children, formData);
  }
}

// Initialize layout grid fields
function initializeLayoutGridField(component, formData) {
  if (component.props?.cells) {
    component.props.cells.forEach(cell => {
      if (cell.component) {
        initializeFormFields([cell.component], formData);
      }
    });
  }
}

// Initialize data table fields
function initializeDataTableField(component, formData) {
  const tableName = component.props?.name;
  if (!tableName) return;
  
  if (!formData[tableName] || !Array.isArray(formData[tableName])) {
    formData[tableName] = component.props.defaultData ? [...component.props.defaultData] : [];
    console.log(`[Workflow] Initialized data table '${tableName}'`);
  }
}

// Initialize dynamic list fields
function initializeDynamicListField(component, formData) {
  const listName = component.props?.name;
  if (!listName) return;
  
  if (!formData[listName] || !Array.isArray(formData[listName])) {
    // Initialize with defaultItems if available, otherwise empty array
    formData[listName] = component.props.defaultItems ? [...component.props.defaultItems] : [];
    console.log(`[Workflow] Initialized dynamic list '${listName}' with:`, formData[listName]);
  }
}

// Initialize tab container field by traversing tabs and their children
function initializeTabContainerField(component, formData) {
  if (!component.props?.tabs || !Array.isArray(component.props.tabs)) {
    return;
  }

  // Process each tab's children
  component.props.tabs.forEach(tab => {
    if (tab.children && Array.isArray(tab.children)) {
      initializeFormFields(tab.children, formData);
    }
  });
}

// Get default value by field type (for legacy field format)
function getDefaultValueForFieldType(type) {
  switch (type) {
    case 'number': return 0;
    case 'checkbox': return [];
    case 'select': return '';
    case 'radio': return undefined;
    case 'switch': return false;
    case 'file': return null;
    default: return '';
  }
}
</script>

<template>
  <div :class="isIframeMode ? 'min-h-screen' : 'min-h-screen bg-gray-50'">
    <!-- Header - Hidden in iframe mode -->
    <header v-if="!isIframeMode" class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Icon
            @click="goHome"
            name="ph:arrow-circle-left-duotone"
            class="cursor-pointer w-6 h-6 hover:text-gray-600 text-gray-500"
          />
          <div class="flex items-center gap-3">
            <!-- <img
              src="@/assets/img/logo/lzs-logo-main.png"
              alt="LZS Logo"
              class="h-8"
            /> -->
            <div class="border-l border-gray-300 pl-3">
              <h1 class="text-xl font-semibold text-gray-900">Process Execution</h1>
              <p class="text-sm text-gray-500">
                {{ process?.processName || 'Loading...' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Progress indicator -->
        <div v-if="!loading && !error" class="flex items-center gap-2 text-sm text-gray-600">
          <span>Step {{ currentStepIndex }} of {{ totalSteps }}</span>
          <div class="w-32 bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${((currentStepIndex) / (totalSteps || 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div :class="isIframeMode ? 'p-4 bg-white rounded-lg shadow-sm border border-gray-200' : 'container mx-auto px-6 py-8 max-w-[1200px]'">
      <!-- Loading State - Basic Skeleton -->
      <div v-if="loading" class="w-full">
        <div class="animate-pulse">
          <!-- Header Card Skeleton -->
          <div class="bg-white p-4 mb-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div class="space-y-2">
                <div class="h-5 bg-gray-200 rounded w-32"></div>
                <div class="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div class="h-10 bg-gray-200 rounded"></div>
          </div>

          <!-- Main Content Card Skeleton -->
          <div class="bg-white p-4">
            <div class="space-y-4 mb-8">
              <div class="h-8 bg-gray-200 rounded w-1/3"></div>
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            <div class="space-y-6 mb-8">
              <div class="h-32 bg-gray-200 rounded-lg"></div>
              <div class="h-24 bg-gray-200 rounded-lg"></div>
              <div class="h-16 bg-gray-200 rounded-lg"></div>
            </div>

            <div class="flex justify-end space-x-3">
              <div class="h-10 bg-gray-200 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" :class="isIframeMode ? 'p-6 text-center' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center'">
        <Icon name="material-symbols:error-outline" class="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Process Error</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <div class="flex justify-center gap-3">
          <RsButton @click="() => loadProcess(0)" variant="secondary">
            <Icon name="material-symbols:refresh" class="mr-2" />
            Try Again
          </RsButton>
          <RsButton v-if="!isIframeMode" @click="goHome" variant="primary">
            <Icon name="material-symbols:home" class="mr-2" />
            Go Home
          </RsButton>
        </div>
      </div>

      <!-- Process Complete - Hidden when hideComplete=true -->
      <div v-else-if="isProcessComplete && !hideCompletionMessage" :class="isIframeMode ? 'p-6 text-center' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center'">
        <Icon name="material-symbols:check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 :class="isIframeMode ? 'text-xl font-bold text-gray-900 mb-2' : 'text-2xl font-bold text-gray-900 mb-2'">Process Complete!</h2>
        <p class="text-gray-600 mb-6">
          The workflow "{{ process.processName }}" has been completed successfully.
        </p>
        <div v-if="!isIframeMode" class="flex justify-center gap-3">
          <RsButton @click="() => loadProcess(0)" variant="secondary">
            <Icon name="material-symbols:refresh" class="mr-2" />
            Run Again
          </RsButton>
          <RsButton @click="goHome" variant="primary">
            <Icon name="material-symbols:home" class="mr-2" />
            Go Home
          </RsButton>
        </div>
      </div>

      <!-- Process Complete but Hidden - Show minimal loading state -->
      <div v-else-if="isProcessComplete && hideCompletionMessage" class="flex justify-center items-center py-8">
        <div class="text-center">
          <Icon name="material-symbols:progress-activity" class="w-6 h-6 animate-spin text-blue-500 mx-auto mb-2" />
          <p class="text-gray-500 text-sm">Processing...</p>
        </div>
      </div>

      <!-- Current Step -->
      <div v-else-if="currentNode" :class="isIframeMode ? 'space-y-2' : 'space-y-6'">
        <!-- Step Info - Hidden in iframe mode -->
        <div v-if="!isIframeMode" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-4 mb-4">
            <div :class="[
              'p-3 rounded-lg',
              getStepInfo(currentNode).color === 'blue' ? 'bg-blue-100 text-blue-600' :
              getStepInfo(currentNode).color === 'green' ? 'bg-green-100 text-green-600' :
              getStepInfo(currentNode).color === 'purple' ? 'bg-purple-100 text-purple-600' :
              getStepInfo(currentNode).color === 'orange' ? 'bg-orange-100 text-orange-600' :
              getStepInfo(currentNode).color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
              getStepInfo(currentNode).color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
              getStepInfo(currentNode).color === 'pink' ? 'bg-pink-100 text-pink-600' :
              'bg-gray-100 text-gray-600'
            ]">
              <Icon :name="getStepInfo(currentNode).icon" class="w-6 h-6" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ getStepInfo(currentNode).label }}</h2>
              <p class="text-gray-600">{{ currentNode.data?.label || currentNode.data?.name || `Step ${currentStepIndex}` }}</p>
            </div>
          </div>
        </div>

        <!-- Form Step -->
        <div v-if="currentNode.type === 'form'" :class="isIframeMode ? 'p-2' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'">
          <div v-if="!isIframeMode" class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ currentNode.data?.formName || currentNode.data?.label || 'Please fill out the form' }}
            </h3>
            <p v-if="currentForm?.formDescription" class="text-gray-600 text-sm">
              {{ currentForm.formDescription }}
            </p>
          </div>
          
          <!-- Loading form data -->
          <div v-if="!currentForm && currentNode.data?.formId" class="w-full">
            <div class="animate-pulse">
              <!-- Header Card Skeleton -->
              <div class="bg-white p-4 mb-2">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="space-y-2">
                    <div class="h-5 bg-gray-200 rounded w-32"></div>
                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div class="h-10 bg-gray-200 rounded"></div>
              </div>
            
              <!-- Main Content Card Skeleton -->
              <div class="bg-white p-4">
                <div class="space-y-4 mb-8">
                  <div class="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              
                <div class="space-y-6 mb-8">
                  <div class="h-32 bg-gray-200 rounded-lg"></div>
                  <div class="h-24 bg-gray-200 rounded-lg"></div>
                  <div class="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              
                <div class="flex justify-end space-x-3">
                  <div class="h-10 bg-gray-200 rounded-lg w-24"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Form rendering -->
          <div v-else-if="currentForm && currentForm.formComponents" class="form-container">
            <!-- Conditional Logic Engine for FormKit conditional logic -->
            <ConditionalLogicEngine
              :form-components="currentForm.formComponents"
              :form-data="formData"
              @script-generated="handleConditionalLogicGenerated"
              :key="currentNode.value?.id"
            />
            
            <!-- Form Script Engine for conditional logic + custom script -->
            <FormScriptEngine
              v-if="combinedScript"
              :form-data="formData"
              :custom-script="combinedScript"
              :custom-css="currentForm.customCSS"
              :form-events="currentForm.formEvents || { onLoad: true, onFieldChange: true }"
              :script-mode="currentForm.scriptMode || 'safe'"
              @field-change="handleScriptFieldChange"
              :key="currentNode.value?.id"
            />
            
            <!-- FormKit form wrapper -->
            <FormKit
              type="form"
              v-model="formData"
              ref="formRef"
              @submit="onFormKitSubmit"
              :actions="false"
              :incomplete-message="false"
              validation-visibility="submit"
              :key="currentForm?.formId || currentNode.value?.id"
            >
              <div class="grid grid-cols-12 gap-x-2">
                <template v-for="component in currentForm.formComponents" :key="component.id || component.props.name">
                  <ComponentPreview
                    :component="component" 
                    :is-preview="true"
                    :field-states="fieldStates"
                    :modal-input-data="modalInputDataStore"
                    @form-data-updated="handleFormDataUpdate"
                    @button-clicked="handleButtonClick"
                    @open-modal="handleOpenModal"
                    @close-modal="handleCloseModal"
                  />
                </template>
                <!-- Submit button - respects form builder configuration -->
                <div v-if="currentForm?.submitButton?.enabled !== false" class="col-span-12 pt-6 border-t border-gray-200" 
                  :class="{
                    'flex justify-start': currentForm?.submitButton?.position === 'left' || !currentForm?.submitButton?.position,
                    'flex justify-center': currentForm?.submitButton?.position === 'center',
                    'flex justify-end': currentForm?.submitButton?.position === 'right'
                  }">
                  <RsButton 
                    @click="validateAndSubmit"
                    :disabled="stepLoading"
                    :variant="getSubmitButtonVariant()"
                    :style="getWorkflowSubmitButtonStyle()"
                  >
                    <Icon v-if="stepLoading" name="material-symbols:progress-activity" class="w-4 h-4 animate-spin mr-2" />
                    {{ stepLoading ? 'Processing...' : (currentForm?.submitButton?.label || 'Submit') }}
                  </RsButton>
                </div>
              </div>
            </FormKit>
            
            <!-- Script Info (for debugging) - Hidden in iframe mode -->
            <div v-if="combinedScript && !isIframeMode" class="mt-4 p-3 bg-gray-50 rounded-lg border">
              <details>
                <summary class="text-sm font-medium text-gray-700 cursor-pointer">Form Logic Available (Development)</summary>
                <div class="mt-2 space-y-2">
                  <div v-if="conditionalLogicScript">
                    <p class="text-xs font-medium text-gray-600">Conditional Logic:</p>
                    <pre class="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto max-h-32">{{ conditionalLogicScript.substring(0, 200) }}...</pre>
                  </div>
                  <div v-if="currentForm?.customScript">
                    <p class="text-xs font-medium text-gray-600">Custom Script:</p>
                    <pre class="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto max-h-32">{{ customScriptPreview }}</pre>
                  </div>
                </div>
              </details>
            </div>
          </div>
          
          <!-- Fallback if no form data -->
          <div v-else class="text-center py-8">
            <Icon name="material-symbols:description-outline" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-gray-900 mb-2">Form Not Found</h4>
            <p class="text-gray-600 mb-4">The form associated with this step could not be loaded.</p>
            <RsButton @click="moveToNextStep" variant="primary">
              <Icon name="material-symbols:skip-next" class="mr-2" />
              Skip to Next Step
            </RsButton>
          </div>
        </div>

        <!-- API/Script/Notification Step - Hidden in iframe mode unless multiple paths -->
        <div v-else-if="['api', 'script', 'notification'].includes(currentNode.type) && (!isIframeMode || !canAutoProgress(currentNode))" 
             :class="isIframeMode ? 'p-2' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'">
          <!-- Processing State - Hidden in iframe mode -->
          <div v-if="stepLoading && !isIframeMode" class="text-center py-8">
            <Icon name="material-symbols:progress-activity" class="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ 
                currentNode.type === 'api' ? 'Calling API...' : 
                currentNode.type === 'script' ? 'Executing Script...' :
                'Sending Notification...'
              }}
            </h3>
            <p class="text-gray-600">Please wait while we process this step</p>
          </div>
          
          <!-- Completed State with Multiple Paths -->
          <div v-else-if="!canAutoProgress(currentNode)" class="space-y-4">
            <div v-if="!isIframeMode" class="text-center">
              <Icon name="material-symbols:check-circle" class="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ 
                  currentNode.type === 'api' ? 'API Call Complete' : 
                  currentNode.type === 'script' ? 'Script Executed' :
                  'Notification Sent'
                }}
              </h3>
              <p class="text-gray-600 mb-6">{{ currentNode.data?.label || currentNode.label }}</p>
            </div>
            
            <!-- Multiple Path Options -->
            <div :class="isIframeMode ? '' : 'border-t border-gray-200 pt-4'">
              <h4 v-if="!isIframeMode" class="font-medium text-gray-700 mb-3">Choose your next step:</h4>
              <div class="grid gap-2">
                <template v-for="edge in getOutgoingEdges(currentNode.id)" :key="edge.id">
                  <RsButton 
                    @click="makeDecision(edge.target)"
                    variant="outline"
                    :class="isIframeMode ? 'justify-between p-2' : 'justify-between p-3'"
                  >
                    <span>{{ isIframeMode ? getNodeLabel(edge.target) : `Continue to: ${getNodeLabel(edge.target)}` }}</span>
                    <Icon name="material-symbols:arrow-right-alt" />
                  </RsButton>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- HTML Content Step -->
        <div v-else-if="currentNode.type === 'html'" :class="isIframeMode ? 'p-2' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'">
          <div v-if="!isIframeMode" class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ currentNode.data?.title || currentNode.data?.label || 'Content Display' }}
            </h3>
            <p v-if="currentNode.data?.description" class="text-gray-600 text-sm">
              {{ currentNode.data.description }}
            </p>
          </div>
          
          <!-- HTML Content -->
          <div :class="isIframeMode ? 'mb-4' : 'html-content-container border border-gray-200 rounded-lg p-4 mb-6'">
            <div 
              v-if="interpolatedHtmlContent" 
              v-html="interpolatedHtmlContent"
              class="prose max-w-none"
            ></div>
            <div v-else-if="!isIframeMode" class="text-center text-gray-500 py-8">
              <Icon name="material-symbols:code-blocks" class="w-12 h-12 mx-auto mb-2" />
              <p>No HTML content provided</p>
            </div>
          </div>
          
          <!-- Continue Options -->
          <div :class="isIframeMode ? 'pt-2' : 'pt-4 border-t border-gray-200'">
            <!-- Single Path - Simple Continue Button -->
            <div v-if="canAutoProgress(currentNode)" :class="isIframeMode ? 'flex justify-center' : 'flex justify-end'">
              <RsButton 
                @click="moveToNextStep"
                :disabled="stepLoading"
                variant="primary"
                :class="isIframeMode ? 'px-4 py-2' : ''"
              >
                <Icon v-if="stepLoading" name="material-symbols:progress-activity" class="w-4 h-4 animate-spin mr-2" />
                <template v-if="!stepLoading">
                  {{ isIframeMode ? 'Continue' : `Continue to: ${getNextNodeObject(currentNode)?.data?.label || getNextNodeObject(currentNode)?.label || 'Next Step'}` }}
                </template>
                <template v-else>
                  Processing...
                </template>
              </RsButton>
            </div>
            
            <!-- Multiple Paths - Show Options -->
            <div v-else class="space-y-3">
              <h4 v-if="!isIframeMode" class="font-medium text-gray-700">Choose your next step:</h4>
              <div class="grid gap-2">
                <template v-for="edge in getOutgoingEdges(currentNode.id)" :key="edge.id">
                  <RsButton 
                    @click="makeDecision(edge.target)"
                    variant="outline"
                    :class="isIframeMode ? 'justify-between p-2' : 'justify-between p-3'"
                  >
                    <span>{{ isIframeMode ? getNodeLabel(edge.target) : `Continue to: ${getNodeLabel(edge.target)}` }}</span>
                    <Icon name="material-symbols:arrow-right-alt" />
                  </RsButton>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Decision/Gateway Step -->
        <div v-else-if="['decision', 'gateway'].includes(currentNode.type)" :class="isIframeMode ? 'p-2' : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'">
          <div v-if="!isIframeMode" class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ currentNode.data?.title || currentNode.data?.label || 'Make a Decision' }}
            </h3>
            <p v-if="currentNode.data?.description" class="text-gray-600 text-sm">
              {{ currentNode.data.description }}
            </p>
          </div>
          
          <!-- Manual Decision Options -->
          <div v-if="currentNode.data?.executionType === 'manual'" class="space-y-4">
            <p v-if="!isIframeMode" class="text-gray-700 mb-4">Please choose one of the following options:</p>
            <div class="grid gap-3">
              <template v-for="edge in workflowData.edges.filter(e => e.source === currentNode.id)" :key="edge.id">
                <RsButton 
                  @click="makeDecision(edge.target)"
                  variant="outline-primary"
                  :class="isIframeMode ? 'justify-start p-2 h-auto' : 'justify-start p-4 h-auto'"
                >
                  <div class="text-left">
                    <div :class="isIframeMode ? 'font-medium text-sm' : 'font-medium'">{{ edge.label || 'Option' }}</div>
                    <div v-if="edge.data?.description && !isIframeMode" class="text-sm text-gray-500 mt-1">
                      {{ edge.data.description }}
                    </div>
                  </div>
                  <Icon name="material-symbols:arrow-right-alt" class="ml-auto" />
                </RsButton>
              </template>
            </div>
          </div>
          
          <!-- Automatic Decision Processing - Hidden in iframe mode -->
          <div v-else-if="!isIframeMode" class="text-center py-8">
            <Icon name="material-symbols:progress-activity" class="w-8 h-8 animate-spin text-yellow-500 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-gray-900 mb-2">Evaluating Conditions</h4>
            <p class="text-gray-600">Please wait while we determine the next step...</p>
            
            <!-- Show conditions being evaluated -->
            <div v-if="currentNode.data?.conditions?.length" class="mt-6 text-left">
              <h5 class="font-medium text-gray-700 mb-3">Decision Paths:</h5>
              <div class="space-y-3">
                <div v-for="(evaluationResult, groupIndex) in conditionEvaluationResults" :key="groupIndex" 
                     class="border rounded-lg p-3"
                     :class="evaluationResult.finalResult ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'">
                  <div class="flex items-center gap-2 mb-2">
                    <Icon name="material-symbols:alt-route" class="w-4 h-4" 
                          :class="evaluationResult.finalResult ? 'text-green-500' : 'text-orange-500'" />
                    <span class="font-medium text-sm">{{ evaluationResult.group.output || `Path ${groupIndex + 1}` }}</span>
                    <span v-if="evaluationResult.finalResult" 
                          class="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                      MATCH
                    </span>
                  </div>
                  <div class="space-y-1">
                    <div v-for="(conditionResult, conditionIndex) in evaluationResult.results" :key="conditionIndex" 
                         class="flex items-center gap-2 text-xs">
                      <Icon name="material-symbols:rule" class="w-3 h-3" 
                            :class="conditionResult.result ? 'text-green-500' : 'text-red-500'" />
                      <span v-if="conditionIndex > 0" class="text-orange-600 font-medium">
                        {{ evaluationResult.group.conditions[conditionIndex].logicalOperator?.toUpperCase() || 'AND' }}
                      </span>
                      <span :class="conditionResult.result ? 'text-green-700' : 'text-red-700'">
                        {{ conditionResult.description }}
                      </span>
                      <span class="text-gray-500">
                        ({{ conditionResult.result ? '✓' : '✗' }})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Step Types -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Icon name="material-symbols:info" class="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ getStepInfo(currentNode).label }}</h3>
          <p class="text-gray-600 mb-6">This step type is not yet implemented</p>
          <RsButton @click="moveToNextStep" variant="primary">
            <Icon name="material-symbols:skip-next" class="mr-2" />
            Skip to Next Step
          </RsButton>
        </div>

        <!-- Variable Mapping Debug (hidden in iframe mode) -->
        <div v-if="currentNode && !isIframeMode" class="bg-gray-100 rounded-lg p-4">
          <details>
            <summary class="font-medium text-gray-700 cursor-pointer mb-2">Variable Mapping Debug</summary>
            <div class="space-y-3 text-xs">
              <!-- Input Mappings -->
              <div v-if="currentNode.data?.inputMappings?.length">
                <p class="font-medium text-gray-700">Input Mappings (Process → Form):</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(currentNode.data.inputMappings, null, 2) }}</pre>
              </div>
              <!-- Output Mappings -->
              <div v-if="currentNode.data?.outputMappings?.length">
                <p class="font-medium text-gray-700">Output Mappings (Form → Process):</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(currentNode.data.outputMappings, null, 2) }}</pre>
              </div>
              <!-- Field Conditions -->
              <div v-if="currentNode.data?.fieldConditions?.length">
                <p class="font-medium text-gray-700">Field Conditions:</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(currentNode.data.fieldConditions, null, 2) }}</pre>
              </div>
              <!-- Current Field States -->
              <div v-if="Object.keys(fieldStates || {}).length">
                <p class="font-medium text-gray-700">Active Field States:</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(fieldStates, null, 2) }}</pre>
              </div>
              <!-- Dynamic Components Status -->
              <div v-if="Object.keys(formData || {}).some(key => Array.isArray(formData[key]))">
                <p class="font-medium text-gray-700">Dynamic Components Status:</p>
                <div class="bg-white p-2 rounded border text-sm space-y-1">
                  <div v-for="[key, value] in Object.entries(formData || {})" :key="key">
                    <span v-if="Array.isArray(value)" class="inline-flex items-center">
                      <span class="font-mono text-blue-600">{{ key }}</span>: 
                      <span class="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        {{ value.length }} items
                      </span>
                      <span v-if="value.length > 0" class="ml-2 text-gray-500 text-xs">
                        ({{ value.length === 1 ? 'has data' : 'has data' }})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Form Data -->
              <div v-if="Object.keys(formData || {}).length">
                <p class="font-medium text-gray-700">Current Form Data:</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
              </div>
              <!-- Node Data (for non-form nodes) -->
              <div v-if="currentNode.data && !currentNode.data.inputMappings && !currentNode.data.outputMappings && !currentNode.data.fieldConditions">
                <p class="font-medium text-gray-700">Node Data:</p>
                <pre class="text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(currentNode.data, null, 2) }}</pre>
              </div>
            </div>
          </details>
        </div>

        <!-- Process Variables Debug (hidden in iframe mode) -->
        <div v-if="Object.keys(processVariables || {}).length > 0 && !isIframeMode" class="bg-gray-100 rounded-lg p-4 mt-4">
          <details>
            <summary class="font-medium text-gray-700 cursor-pointer mb-2">Process Variables (Debug)</summary>
            <pre class="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto">{{ JSON.stringify(processVariables, null, 2) }}</pre>
          </details>
        </div>
      </div>
    </div>

    <!-- Submit Confirmation Modal -->
    <RsModal v-model="showSubmitConfirmationModal" :title="currentForm?.submitButton?.confirmationModal?.title || 'Confirm Submission'" size="md" position="center">
      <div class="p-4">
        <div class="flex items-start mb-4">
          <Icon name="material-symbols:help-outline" class="text-blue-500 w-8 h-8 mr-3 flex-shrink-0 mt-1" />
          <div>
            <p class="text-gray-600 text-sm">
              {{ currentForm?.submitButton?.confirmationModal?.description || 'Are you sure you want to submit this form? This action cannot be undone.' }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton @click="showSubmitConfirmationModal = false" variant="tertiary">
            Cancel
          </RsButton>
          <RsButton @click="showSubmitConfirmationModal = false; handleFormSubmit()" variant="primary">
            Confirm
          </RsButton>
        </div>
      </template>
    </RsModal>

    <!-- Form Modals -->
    <template v-for="(modal, modalId) in modals" :key="modalId">
      <FormModal
        v-model="modalStates[modalId]"
        :modal="modal"
        :modal-mappings="currentNode?.data?.modalMappings || {}"
        :process-variables="processVariables"
        :modal-input-data="modalInputDataStore[modalId] || {}"
        :is-process-mode="true"
        @modal-submit="handleModalSubmit"
        @modal-close="handleModalClose"
        @form-data-updated="handleFormDataUpdate"
        @button-clicked="handleButtonClick"
        @open-modal="handleOpenModal"
        @close-modal="handleCloseModal"
        @process-variable-updated="handleProcessVariableUpdate"
        @modal-field-changed="handleModalFieldChanged"
        @modal-button-tracked="handleModalButtonTracked"
      />
    </template>
  </div>
</template>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Submit button hover effects using CSS custom properties */
:deep(.rs-button:hover) {
  background-color: var(--hover-bg) !important;
}
</style>