<template>
  <div>
    <!-- Custom CSS Injection - Remove scoped to allow global styling -->
    <component :is="'style'" v-if="customCSS">
      {{ customCSS }}
    </component>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  customScript: {
    type: String,
    default: ''
  },
  customCSS: {
    type: String,
    default: ''
  },
  formEvents: {
    type: Object,
    default: () => ({
      onLoad: true,
      onFieldChange: true,
      onSubmit: false,
      onValidation: false
    })
  },
  scriptMode: {
    type: String,
    default: 'safe' // 'safe' or 'advanced'
  }
});

const emit = defineEmits(['field-change', 'form-submit', 'field-validate']);

// Internal state
const scriptContext = ref(null);
const fieldChangeHandlers = ref(new Map());
const isScriptInitialized = ref(false);
const previousFormData = ref({});

// Create safe execution context
const createScriptContext = () => {
  const context = {
    getField: (fieldName) => {
      return props.formData[fieldName];
    },
    
    setField: (fieldName, value) => {
      // Find the FormKit field container
      const fieldContainer = document.querySelector(`[data-name="${fieldName}"]`);
      if (!fieldContainer) {
        console.warn(`[FormScriptEngine] Field "${fieldName}" not found`);
        // Still emit the event for reactive updates
        emit('field-change', { fieldName, value });
        return;
      }

      // Get the field type from data attributes or class names
      const fieldType = fieldContainer.getAttribute('data-type') || 
                       (fieldContainer.querySelector('select') ? 'select' : 
                        fieldContainer.querySelector('input[type="radio"]') ? 'radio' :
                        fieldContainer.querySelector('input[type="checkbox"]') ? 'checkbox' :
                        fieldContainer.querySelector('input[type="range"]') ? 'range' :
                        fieldContainer.querySelector('textarea') ? 'textarea' : 'input');

      try {
        if (fieldType === 'select') {
          // Handle select dropdowns
          const selectElement = fieldContainer.querySelector('select');
          if (selectElement) {
            // Try to set by value first, then by label if value doesn't exist
            let optionFound = false;
            
            // First try to match by value
            for (let option of selectElement.options) {
              if (option.value === value) {
                selectElement.value = value;
                optionFound = true;
                break;
              }
            }
            
            // If not found by value, try to match by label (for user convenience)
            if (!optionFound) {
              for (let option of selectElement.options) {
                if (option.text === value || option.textContent === value) {
                  selectElement.value = option.value;
                  optionFound = true;
                  break;
                }
              }
            }
            
            if (!optionFound) {
              console.warn(`[FormScriptEngine] Option "${value}" not found in select field "${fieldName}"`);
            }
            
            // Trigger events
            selectElement.dispatchEvent(new Event('input', { bubbles: true }));
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } else if (fieldType === 'radio') {
          // Handle radio button groups
          const radioButtons = fieldContainer.querySelectorAll('input[type="radio"]');
          let radioFound = false;
          
          radioButtons.forEach(radio => {
            if (radio.value === value) {
              radio.checked = true;
              radioFound = true;
              // Trigger events
              radio.dispatchEvent(new Event('input', { bubbles: true }));
              radio.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
              radio.checked = false;
            }
          });
          
          // If not found by value, try to match by label
          if (!radioFound) {
            radioButtons.forEach(radio => {
              const label = radio.nextElementSibling?.textContent || 
                           radio.closest('label')?.textContent?.replace(radio.value, '').trim();
              if (label === value) {
                radio.checked = true;
                radioFound = true;
                radio.dispatchEvent(new Event('input', { bubbles: true }));
                radio.dispatchEvent(new Event('change', { bubbles: true }));
              } else {
                radio.checked = false;
              }
            });
          }
          
          if (!radioFound) {
            console.warn(`[FormScriptEngine] Radio option "${value}" not found in field "${fieldName}"`);
          }
        } else if (fieldType === 'checkbox') {
          // Handle checkbox groups
          const checkboxes = fieldContainer.querySelectorAll('input[type="checkbox"]');
          
          if (checkboxes.length === 1) {
            // Single checkbox - treat as boolean
            const checkbox = checkboxes[0];
            checkbox.checked = Boolean(value);
            checkbox.dispatchEvent(new Event('input', { bubbles: true }));
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
          } else if (checkboxes.length > 1) {
            // Multiple checkboxes - handle array of values or single value
            const valuesToCheck = Array.isArray(value) ? value : [value];
            
            checkboxes.forEach(checkbox => {
              const shouldCheck = valuesToCheck.includes(checkbox.value) || 
                                 valuesToCheck.includes(checkbox.nextElementSibling?.textContent?.trim());
              
              if (checkbox.checked !== shouldCheck) {
                checkbox.checked = shouldCheck;
                checkbox.dispatchEvent(new Event('input', { bubbles: true }));
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
              }
            });
          }
        } else if (fieldType === 'range') {
          // Handle range slider
          const rangeElement = fieldContainer.querySelector('input[type="range"]');
          if (rangeElement) {
            rangeElement.value = value;
            rangeElement.dispatchEvent(new Event('input', { bubbles: true }));
            rangeElement.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } else {
          // Handle regular input fields (text, number, email, etc.)
          const inputElement = fieldContainer.querySelector('input, textarea');
          if (inputElement) {
            inputElement.value = value;
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      } catch (error) {
        console.error(`[FormScriptEngine] Error setting field "${fieldName}":`, error);
      }
      
      // Always emit the event for reactive updates
      emit('field-change', { fieldName, value });
    },
    
    setFieldByLabel: (fieldName, labelValue) => {
      // Convenience function to set option-based fields by their label instead of value
      // This is especially useful for select, radio, and checkbox fields
      const fieldContainer = document.querySelector(`[data-name="${fieldName}"]`);
      if (!fieldContainer) {
        console.warn(`[FormScriptEngine] Field "${fieldName}" not found`);
        return;
      }

      const fieldType = fieldContainer.getAttribute('data-type') || 
                       (fieldContainer.querySelector('select') ? 'select' : 
                        fieldContainer.querySelector('input[type="radio"]') ? 'radio' :
                        fieldContainer.querySelector('input[type="checkbox"]') ? 'checkbox' : 'input');

      try {
        if (fieldType === 'select') {
          const selectElement = fieldContainer.querySelector('select');
          if (selectElement) {
            for (let option of selectElement.options) {
              if (option.text === labelValue || option.textContent === labelValue) {
                selectElement.value = option.value;
                selectElement.dispatchEvent(new Event('input', { bubbles: true }));
                selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                emit('field-change', { fieldName, value: option.value });
                return;
              }
            }
            console.warn(`[FormScriptEngine] Label "${labelValue}" not found in select field "${fieldName}"`);
          }
        } else if (fieldType === 'radio') {
          const radioButtons = fieldContainer.querySelectorAll('input[type="radio"]');
          let radioFound = false;
          
          radioButtons.forEach(radio => {
            const label = radio.nextElementSibling?.textContent || 
                         radio.closest('label')?.textContent?.replace(radio.value, '').trim();
            if (label === labelValue) {
              radio.checked = true;
              radioFound = true;
              radio.dispatchEvent(new Event('input', { bubbles: true }));
              radio.dispatchEvent(new Event('change', { bubbles: true }));
              emit('field-change', { fieldName, value: radio.value });
            } else {
              radio.checked = false;
            }
          });
          
          if (!radioFound) {
            console.warn(`[FormScriptEngine] Label "${labelValue}" not found in radio field "${fieldName}"`);
          }
        } else if (fieldType === 'checkbox') {
          const checkboxes = fieldContainer.querySelectorAll('input[type="checkbox"]');
          const labelsToCheck = Array.isArray(labelValue) ? labelValue : [labelValue];
          const selectedValues = [];
          
          checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling?.textContent?.trim() || 
                         checkbox.closest('label')?.textContent?.replace(checkbox.value, '').trim();
            const shouldCheck = labelsToCheck.includes(label);
            
            if (checkbox.checked !== shouldCheck) {
              checkbox.checked = shouldCheck;
              checkbox.dispatchEvent(new Event('input', { bubbles: true }));
              checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            if (shouldCheck) {
              selectedValues.push(checkbox.value);
            }
          });
          
          emit('field-change', { fieldName, value: selectedValues });
        } else {
          // For non-option fields, just use setField
          context.setField(fieldName, labelValue);
        }
      } catch (error) {
        console.error(`[FormScriptEngine] Error setting field "${fieldName}" by label:`, error);
      }
    },
    
    hideField: (fieldName) => {
      const fieldElement = document.querySelector(`[data-name="${fieldName}"]`);
      if (fieldElement) {
        fieldElement.style.display = 'none';
        fieldElement.setAttribute('data-hidden', 'true');
      }
    },
    
    showField: (fieldName) => {
      const fieldElement = document.querySelector(`[data-name="${fieldName}"]`);
      if (fieldElement) {
        fieldElement.style.display = '';
        fieldElement.removeAttribute('data-hidden');
      }
    },
    
    disableField: (fieldName) => {
      const fieldElement = document.querySelector(`[data-name="${fieldName}"] input, [data-name="${fieldName}"] select, [data-name="${fieldName}"] textarea`);
      if (fieldElement) {
        fieldElement.disabled = true;
        fieldElement.closest('[data-name]')?.setAttribute('data-disabled', 'true');
      }
    },
    
    enableField: (fieldName) => {
      const fieldElement = document.querySelector(`[data-name="${fieldName}"] input, [data-name="${fieldName}"] select, [data-name="${fieldName}"] textarea`);
      if (fieldElement) {
        fieldElement.disabled = false;
        fieldElement.closest('[data-name]')?.removeAttribute('data-disabled');
      }
    },
    
    getFieldOptions: (fieldName) => {
      // Get all available options for a select, radio, or checkbox field
      // Returns an array of {label, value} objects
      const fieldContainer = document.querySelector(`[data-name="${fieldName}"]`);
      if (!fieldContainer) {
        console.warn(`[FormScriptEngine] Field "${fieldName}" not found`);
        return [];
      }

      const fieldType = fieldContainer.getAttribute('data-type') || 
                       (fieldContainer.querySelector('select') ? 'select' : 
                        fieldContainer.querySelector('input[type="radio"]') ? 'radio' :
                        fieldContainer.querySelector('input[type="checkbox"]') ? 'checkbox' : 'input');

      try {
        if (fieldType === 'select') {
          const selectElement = fieldContainer.querySelector('select');
          if (selectElement) {
            return Array.from(selectElement.options).map(option => ({
              label: option.text || option.textContent,
              value: option.value
            }));
          }
        } else if (fieldType === 'radio' || fieldType === 'checkbox') {
          const inputElements = fieldContainer.querySelectorAll(`input[type="${fieldType}"]`);
          return Array.from(inputElements).map(input => {
            const label = input.nextElementSibling?.textContent?.trim() || 
                         input.closest('label')?.textContent?.replace(input.value, '').trim() ||
                         input.value;
            return {
              label: label,
              value: input.value
            };
          });
        }
      } catch (error) {
        console.error(`[FormScriptEngine] Error getting options for field "${fieldName}":`, error);
      }
      
      return [];
    },
    
    validateField: (fieldName) => {
      emit('field-validate', { fieldName });
    },
    
    getAllFieldValues: () => {
      return { ...props.formData };
    },
    
    onFieldChange: (fieldNames, callback) => {
      const fields = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
      fields.forEach(fieldName => {
        if (!fieldChangeHandlers.value.has(fieldName)) {
          fieldChangeHandlers.value.set(fieldName, []);
        }
        fieldChangeHandlers.value.get(fieldName).push(callback);
      });
    },
    
    // Add missing helper functions
    showSuccess: (message, options = {}) => {
      // Enhanced success notification with Vue Toastification
      if (typeof window !== 'undefined' && window.$nuxt) {
        try {
          const toast = window.$nuxt.$toast;
          if (toast) {
            const defaultOptions = {
              timeout: 3000,
              position: 'bottom-right',
              ...options
            };
            toast.success(message, defaultOptions);
            return;
          }
        } catch (error) {
          console.warn('[FormScriptEngine] Toast not available:', error);
        }
      }
      
      // Fallback to simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    },
    
    showError: (message, options = {}) => {
      // Enhanced error notification with Vue Toastification
      if (typeof window !== 'undefined' && window.$nuxt) {
        try {
          const toast = window.$nuxt.$toast;
          if (toast) {
            const defaultOptions = {
              timeout: 5000,
              position: 'bottom-right',
              ...options
            };
            toast.error(message, defaultOptions);
            return;
          }
        } catch (error) {
          console.warn('[FormScriptEngine] Toast not available:', error);
        }
      }
      
      // Fallback to simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 5000);
    },
    
    showInfo: (message, options = {}) => {
      // Enhanced info notification with Vue Toastification
      if (typeof window !== 'undefined' && window.$nuxt) {
        try {
          const toast = window.$nuxt.$toast;
          if (toast) {
            const defaultOptions = {
              timeout: 3000,
              position: 'bottom-right',
              ...options
            };
            toast.info(message, defaultOptions);
            return;
          }
        } catch (error) {
          console.warn('[FormScriptEngine] Toast not available:', error);
        }
      }
      
      // Fallback to simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    },
    
    showWarning: (message, options = {}) => {
      // Warning notification with Vue Toastification
      if (typeof window !== 'undefined' && window.$nuxt) {
        try {
          const toast = window.$nuxt.$toast;
          if (toast) {
            const defaultOptions = {
              timeout: 4000,
              position: 'bottom-right',
              ...options
            };
            toast.warning(message, defaultOptions);
            return;
          }
        } catch (error) {
          console.warn('[FormScriptEngine] Toast not available:', error);
        }
      }
      
      // Fallback to simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 4000);
    },
    
    showConfirm: (message, options = {}) => {
      // Confirmation dialog with customizable buttons
      if (typeof window !== 'undefined' && window.Swal) {
        const defaultOptions = {
          title: 'Confirm Action',
          text: message,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          focusConfirm: false
        };
        return window.Swal.fire({ ...defaultOptions, ...options });
      } else {
        // Fallback to browser confirm
        return Promise.resolve({
          isConfirmed: confirm(message),
          isDenied: false,
          isDismissed: false
        });
      }
    },
    
    showInputDialog: (message, options = {}) => {
      // Input dialog with validation
      if (typeof window !== 'undefined' && window.Swal) {
        const defaultOptions = {
          title: 'Input Required',
          text: message,
          input: 'text',
          inputPlaceholder: 'Enter value...',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputValidator: (value) => {
            if (!value) {
              return 'Please enter a value';
            }
          }
        };
        return window.Swal.fire({ ...defaultOptions, ...options });
      } else {
        // Fallback to browser prompt
        const result = prompt(message);
        return Promise.resolve({
          isConfirmed: result !== null,
          value: result,
          isDenied: false,
          isDismissed: result === null
        });
      }
    },
    
    showSelectDialog: (message, options = {}) => {
      // Select dialog for choosing from options
      if (typeof window !== 'undefined' && window.Swal) {
        const defaultOptions = {
          title: 'Select Option',
          text: message,
          input: 'select',
          inputOptions: {},
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputValidator: (value) => {
            if (!value) {
              return 'Please select an option';
            }
          }
        };
        return window.Swal.fire({ ...defaultOptions, ...options });
      } else {
        // Fallback to basic prompt
        const result = prompt(message);
        return Promise.resolve({
          isConfirmed: result !== null,
          value: result,
          isDenied: false,
          isDismissed: result === null
        });
      }
    },
    
    showToast: (message, options = {}) => {
      // Toast notification using Vue Toastification
      if (typeof window !== 'undefined' && window.$nuxt) {
        try {
          const toast = window.$nuxt.$toast;
          if (toast) {
            const defaultOptions = {
              timeout: 3000,
              position: 'bottom-right',
              ...options
            };
            // Use info as default type, but allow override via options.type
            const toastType = options.type || 'info';
            if (typeof toast[toastType] === 'function') {
              toast[toastType](message, defaultOptions);
            } else {
              toast.info(message, defaultOptions);
            }
            return;
          }
        } catch (error) {
          console.warn('[FormScriptEngine] Toast not available:', error);
        }
      }
      
      // Fallback to simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    },
    
    showProgress: (message, options = {}) => {
      // Progress dialog
      if (typeof window !== 'undefined' && window.Swal) {
        const defaultOptions = {
          title: 'Please Wait...',
          text: message,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            window.Swal.showLoading();
          }
        };
        return window.Swal.fire({ ...defaultOptions, ...options });
      } else {
        console.log('Progress:', message);
        return Promise.resolve({});
      }
    },
    
    showCustomAlert: (options = {}) => {
      // Fully customizable alert
      if (typeof window !== 'undefined' && window.Swal) {
        return window.Swal.fire(options);
      } else {
        // Fallback to basic alert
        alert(options.text || options.title || 'Alert');
        return Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false
        });
      }
    },
    
    closeAlert: () => {
      // Close any open SweetAlert2 dialog
      if (typeof window !== 'undefined' && window.Swal) {
        window.Swal.close();
      }
    },
    
    // Utility functions
    console: {
      log: (...args) => console.log('[Form Script]', ...args),
      warn: (...args) => console.warn('[Form Script]', ...args),
      error: (...args) => console.error('[Form Script]', ...args)
    },
    
    // Math utilities
    Math: Math,
    
    // Date utilities
    Date: Date,
    
    // Safe DOM manipulation (limited)
    querySelector: (selector) => {
      // Only allow querying within form container
      const formContainer = document.querySelector('.form-container');
      return formContainer ? formContainer.querySelector(selector) : null;
    },
    
    // Array utilities
    Array: Array,
    
    // String utilities
    String: String,
    
    // Number utilities
    Number: Number,
    
    // Additional utility functions
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    
    // Direct Vue Toastification access for advanced usage
    $toast: typeof window !== 'undefined' && window.$nuxt ? window.$nuxt.$toast : null
  };
  
  return context;
};

// Safe script execution
const executeScript = (script, context) => {
  if (!script || !script.trim()) return;
  
  try {
    if (props.scriptMode === 'safe') {
      // Create a safe execution environment
      const allowedGlobals = Object.keys(context);
      const globalProxy = new Proxy({}, {
        get(target, prop) {
          if (allowedGlobals.includes(prop)) {
            return context[prop];
          }
          throw new Error(`Access to '${prop}' is not allowed in safe mode`);
        },
        set() {
          throw new Error('Setting global variables is not allowed in safe mode');
        }
      });
      
      // Create function with limited scope
      const scriptFunction = new Function(
        ...allowedGlobals,
        `
          "use strict";
          ${script}
        `
      );
      
      // Execute with only allowed context
      scriptFunction.apply(globalProxy, allowedGlobals.map(key => context[key]));
    } else {
      // Advanced mode - more permissive but still sandboxed
      const scriptFunction = new Function('context', `
        "use strict";
        with(context) {
          ${script}
        }
      `);
      
      scriptFunction.call(null, context);
    }
  } catch (error) {
    console.error('[FormScriptEngine] Script execution error:', error);
    // Show error to user if showError function is available
    if (context.showError) {
      context.showError(`Script Error: ${error.message}`);
    }
  }
};

// Initialize script engine
const initializeScript = () => {
  fieldChangeHandlers.value.clear();
  
  // Create script context
  scriptContext.value = createScriptContext();
  
  // Store initial form data
  previousFormData.value = { ...props.formData };
  
  // Execute onLoad script if enabled
  if (props.formEvents.onLoad && props.customScript) {
    executeScript(props.customScript, scriptContext.value);
  }
  
  isScriptInitialized.value = true;
};

// Handle field changes
const handleFieldChange = (fieldName, newValue, oldValue) => {
  if (!fieldChangeHandlers.value.has(fieldName)) {
    return;
  }
  
  const handlers = fieldChangeHandlers.value.get(fieldName);
  handlers.forEach((handler, index) => {
    try {
      if (typeof handler === 'function') {
        handler.call(scriptContext.value, newValue, oldValue);
      }
    } catch (error) {
      console.error(`[FormScriptEngine] Error in onFieldChange handler for "${fieldName}":`, error);
      if (scriptContext.value?.showError) {
        scriptContext.value.showError(`Field change handler error for ${fieldName}: ${error.message}`);
      }
    }
  });
};

// Watch for script changes and reinitialize
watch(() => props.customScript, async (newScript, oldScript) => {
  if (newScript !== oldScript) {
    isScriptInitialized.value = false;
    await nextTick();
    setTimeout(() => {
      initializeScript();
    }, 200);
  }
});

// Watch for form data changes - the elegant, performant way
watch(() => props.formData, (newData, oldData) => {
  if (!isScriptInitialized.value || !props.formEvents.onFieldChange) {
    return;
  }
  
  // Compare with our stored previousFormData to detect changes
  Object.keys(newData).forEach(fieldName => {
    const newValue = newData[fieldName];
    const oldValue = previousFormData.value[fieldName];
    
    if (newValue !== oldValue) {
      handleFieldChange(fieldName, newValue, oldValue);
    }
  });
  
  // Update previousFormData for next comparison
  previousFormData.value = { ...newData };
}, { deep: true, immediate: false });

// Watch for CSS changes and update
watch(() => props.customCSS, () => {
  // CSS will be automatically updated by the template reactivity
});

// Lifecycle hooks
onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initializeScript();
  }, 200); // Delay to ensure all FormKit fields are loaded
});

onUnmounted(() => {
  fieldChangeHandlers.value.clear();
  isScriptInitialized.value = false;
});

// Expose methods for parent component
defineExpose({
  executeScript: (script) => {
    if (scriptContext.value) {
      executeScript(script, scriptContext.value);
    }
  },
  getContext: () => scriptContext.value,
  reinitialize: () => {
    isScriptInitialized.value = false; 
    initializeScript(); 
  }
});
</script>

<style>
/* Component doesn't render visible content */
</style> 