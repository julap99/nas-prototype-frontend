import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useFormBuilderStore = defineStore("formBuilder", {
  state: () => ({
    formComponents: [],
    selectedComponentId: null,
    formName: "New Form",
    formDescription: "",
    isDraggingOver: false,
    savedForms: [],
    hasUnsavedChanges: false,
    actionHistory: [],
    currentHistoryIndex: -1,
    maxHistoryLength: 30, // Maximum number of history entries to keep
    currentFormId: null,

    // Custom scripts and styling
    formCustomScript: "",
    formCustomCSS: "",
    formEvents: {
      onLoad: true,
      onFieldChange: true,
      onSubmit: false,
      onValidation: false,
    },
    scriptMode: "safe", // 'safe' or 'advanced'

    // Submit button configuration
    submitButton: {
      enabled: true,
      label: "Submit",
      category: "primary", // primary, secondary
      color: "primary", // primary, secondary, success, info, warning, danger
      position: "left", // left, center, right
      confirmationModal: {
        enabled: false,
        title: "Confirm Submission",
        description: "Are you sure you want to submit this form?",
      },
    },

    // Form preview data
    previewFormData: {},

    // Form history tracking
    lastChangeDescription: null,

    // Form grouping
    formCategory: "",
    formTags: [],
    formGroup: "",

    // Modal system (new)
    modals: {}, // Object of modal definitions
    activeTab: "main", // 'main' or modal ID
    modalIdCounter: 0,
    selectedModalComponentId: null,
  }),

  getters: {
    selectedComponent: (state) => {
      if (!state.selectedComponentId) return null;
      return state.formComponents.find(
        (c) => c.id === state.selectedComponentId
      );
    },

    // Ensure submit button configuration always exists with defaults
    submitButtonConfig: (state) => {
      const defaultSubmitButton = {
        enabled: true,
        label: "Submit",
        category: "primary",
        color: "primary",
        confirmationModal: {
          enabled: false,
          title: "Confirm Submission",
          description: "Are you sure you want to submit this form?",
        },
      };

      return {
        ...defaultSubmitButton,
        ...state.submitButton,
        confirmationModal: {
          ...defaultSubmitButton.confirmationModal,
          ...(state.submitButton?.confirmationModal || {}),
        },
      };
    },

    formConfig: (state) => {
      return {
        id: uuidv4(),
        name: state.formName,
        description: state.formDescription,
        components: state.formComponents.map((c) => ({
          type: c.type,
          props: c.props,
        })),
        createdAt: new Date().toISOString(),
      };
    },

    canUndo: (state) => {
      return state.currentHistoryIndex > 0;
    },

    historyEntries: (state) => {
      return state.actionHistory.map((entry, index) => ({
        ...entry,
        isCurrent: index === state.currentHistoryIndex,
      }));
    },

    getPreviewFormData: (state) => {
      return state.previewFormData;
    },

    // Modal system getters
    getActiveModal: (state) => {
      if (state.activeTab === "main") return null;
      return state.modals[state.activeTab] || null;
    },

    getActiveComponents: (state) => {
      if (state.activeTab === "main") {
        return state.formComponents;
      }
      const modal = state.modals[state.activeTab];
      return modal ? modal.components : [];
    },

    selectedModalComponent: (state) => {
      if (!state.selectedModalComponentId || state.activeTab === "main")
        return null;
      const modal = state.modals[state.activeTab];
      if (!modal) return null;
      return modal.components.find(
        (c) => c.id === state.selectedModalComponentId
      );
    },

    getModal: (state) => (modalId) => {
      return state.modals[modalId] || null;
    },
  },

  actions: {
    // Ensure submit button structure is properly initialized
    ensureSubmitButtonStructure() {
      if (!this.submitButton) {
        this.submitButton = {
          enabled: true,
          label: "Submit",
          category: "primary",
          color: "primary",
          position: "left",
          confirmationModal: {
            enabled: false,
            title: "Confirm Submission",
            description: "Are you sure you want to submit this form?",
          },
        };
      } else {
        if (!this.submitButton.confirmationModal) {
          this.submitButton.confirmationModal = {
            enabled: false,
            title: "Confirm Submission",
            description: "Are you sure you want to submit this form?",
          };
        }
        if (!this.submitButton.position) {
          this.submitButton.position = "left";
        }
      }
    },

    // History Management
    recordHistory(action, details = {}) {
      // Remove any future history entries if we're not at the end
      if (this.currentHistoryIndex < this.actionHistory.length - 1) {
        this.actionHistory = this.actionHistory.slice(
          0,
          this.currentHistoryIndex + 1
        );
      }

      // Ensure we have a deep clone of the current state
      // Make sure to preserve the exact component IDs
      const currentComponents = this.formComponents.map((component) => {
        const copy = JSON.parse(JSON.stringify(component));

        // Ensure the ID is preserved exactly
        if (component.id) {
          copy.id = component.id;
        }

        return copy;
      });

      // Create a new history entry
      const historyEntry = {
        id: uuidv4(),
        action,
        details,
        formState: {
          components: currentComponents,
          name: this.formName,
          description: this.formDescription,
          selectedComponentId: this.selectedComponentId,
        },
        timestamp: new Date(),
      };

      // Add to history and update index
      this.actionHistory.push(historyEntry);
      this.currentHistoryIndex = this.actionHistory.length - 1;

      // Limit history length
      if (this.actionHistory.length > this.maxHistoryLength) {
        this.actionHistory = this.actionHistory.slice(
          this.actionHistory.length - this.maxHistoryLength
        );
        this.currentHistoryIndex = this.actionHistory.length - 1;
      }
    },

    // Helper method to restore state from a history entry
    restoreStateFromHistory(historyState) {
      // Completely replace components with deep clone
      if (Array.isArray(historyState.components)) {
        // Make a deep clone to ensure we break all references
        this.formComponents = historyState.components.map((component) => ({
          ...JSON.parse(JSON.stringify(component)),
          id: component.id, // Preserve the exact ID
        }));
      } else {
        this.formComponents = [];
      }

      // Update other state properties
      this.formName = historyState.name || "New Form";
      this.formDescription = historyState.description || "";

      // Make sure the selectedComponentId references a valid component
      this.selectedComponentId = historyState.selectedComponentId || null;
      if (this.selectedComponentId) {
        // Verify the selected component exists in the restored state
        const selectedExists = this.formComponents.some(
          (c) => c.id === this.selectedComponentId
        );
        if (!selectedExists) {
          this.selectedComponentId =
            this.formComponents.length > 0 ? this.formComponents[0].id : null;
        }
      }
    },

    undo() {
      if (!this.canUndo) return;

      // Get current and previous entries
      const currentEntry = this.actionHistory[this.currentHistoryIndex];
      this.currentHistoryIndex--;
      const previousEntry = this.actionHistory[this.currentHistoryIndex];

      // Restore the state from previous entry
      this.restoreStateFromHistory(previousEntry.formState);

      // Mark as having unsaved changes
      this.hasUnsavedChanges = true;
    },

    redo() {
      if (this.currentHistoryIndex >= this.actionHistory.length - 1) return;

      // Move forward one step in history
      this.currentHistoryIndex++;
      const nextEntry = this.actionHistory[this.currentHistoryIndex];

      // Restore the state from next entry
      this.restoreStateFromHistory(nextEntry.formState);

      // Mark as having unsaved changes
      this.hasUnsavedChanges = true;
    },

    addComponent(component) {
      // Add debugging
      console.log("FormStore: Adding component", component.type);

      // Store the state before the change for history
      const beforeComponents = [...this.formComponents];

      // Find optimal grid placement for the new component
      const { gridColumn, rowIndex, width } = this.findOptimalGridPlacement();

      const newComponentId = uuidv4();

      // Log the incoming component structure
      console.log(
        "Component before processing:",
        JSON.stringify({
          type: component.type,
          name: component.name,
          hasDefaultProps: !!component.defaultProps,
          defaultPropsKeys: component.defaultProps
            ? Object.keys(component.defaultProps)
            : [],
        })
      );

      try {
        // Create a deep copy of the default props to avoid reference issues
        const defaultProps = component.defaultProps
          ? JSON.parse(JSON.stringify(component.defaultProps))
          : {};

        // Ensure the component has necessary grid properties
        defaultProps.width = defaultProps.width || width;
        defaultProps.gridColumn = defaultProps.gridColumn || gridColumn;

        // Generate a default name based on component type if not provided
        if (!defaultProps.name) {
          defaultProps.name = `${component.type}_${this.formComponents.length + 1}`;
        }

        // Generate a default label based on component name if not provided
        if (
          !defaultProps.label &&
          !["heading", "paragraph", "divider"].includes(component.type)
        ) {
          defaultProps.label = `${component.name} ${this.formComponents.length + 1}`;
        }

        // Handle special component types
        switch (component.type) {
          case "image-preview":
            // Ensure all required image preview properties
            defaultProps.imageUrl =
              defaultProps.imageUrl || "https://placehold.co/600x400";
            defaultProps.altText = defaultProps.altText || "Preview image";
            defaultProps.caption = defaultProps.caption || "";
            defaultProps.showZoom =
              defaultProps.showZoom !== undefined
                ? defaultProps.showZoom
                : true;
            defaultProps.showCaption =
              defaultProps.showCaption !== undefined
                ? defaultProps.showCaption
                : true;
            defaultProps.maxWidth = defaultProps.maxWidth || "100%";
            defaultProps.height = defaultProps.height || "auto";
            break;

          case "repeating-group":
            // Ensure all required repeating group properties
            defaultProps.minItems =
              defaultProps.minItems !== undefined ? defaultProps.minItems : 1;
            defaultProps.maxItems =
              defaultProps.maxItems !== undefined ? defaultProps.maxItems : 10;
            defaultProps.buttonText = defaultProps.buttonText || "Add Item";
            defaultProps.removeText = defaultProps.removeText || "Remove";
            defaultProps.fields = defaultProps.fields || [
              {
                type: "text",
                name: "field_1",
                label: "Field 1",
                placeholder: "Enter value",
              },
            ];
            break;

          case "dynamic-list":
            // Ensure all required dynamic list properties
            defaultProps.placeholder = defaultProps.placeholder || "Enter item";
            defaultProps.buttonText = defaultProps.buttonText || "Add Item";
            defaultProps.minItems =
              defaultProps.minItems !== undefined ? defaultProps.minItems : 0;
            defaultProps.maxItems =
              defaultProps.maxItems !== undefined ? defaultProps.maxItems : 20;
            defaultProps.defaultItems = Array.isArray(defaultProps.defaultItems)
              ? defaultProps.defaultItems
              : ["Item 1", "Item 2"];
            break;

          case "repeating-table":
            // Ensure all required repeating table properties
            defaultProps.buttonText = defaultProps.buttonText || "Add Record";
            defaultProps.editText = defaultProps.editText || "Edit";
            defaultProps.deleteText = defaultProps.deleteText || "Delete";
            defaultProps.minRecords =
              defaultProps.minRecords !== undefined
                ? defaultProps.minRecords
                : 0;
            defaultProps.maxRecords =
              defaultProps.maxRecords !== undefined
                ? defaultProps.maxRecords
                : 50;
            defaultProps.showRowNumbers =
              defaultProps.showRowNumbers !== undefined
                ? defaultProps.showRowNumbers
                : true;
            defaultProps.allowEdit =
              defaultProps.allowEdit !== undefined
                ? defaultProps.allowEdit
                : true;
            defaultProps.allowDelete =
              defaultProps.allowDelete !== undefined
                ? defaultProps.allowDelete
                : true;
            defaultProps.confirmDelete =
              defaultProps.confirmDelete !== undefined
                ? defaultProps.confirmDelete
                : true;
            defaultProps.enableSearch =
              defaultProps.enableSearch !== undefined
                ? defaultProps.enableSearch
                : false;
            defaultProps.enableExport =
              defaultProps.enableExport !== undefined
                ? defaultProps.enableExport
                : false;
            defaultProps.columns = Array.isArray(defaultProps.columns)
              ? defaultProps.columns
              : [
                  {
                    name: "name",
                    label: "Name",
                    type: "text",
                    required: true,
                    placeholder: "Enter name",
                    validation: "required",
                    width: "200px",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                    placeholder: "Enter email",
                    validation: "required|email",
                    width: "250px",
                  },
                ];
            defaultProps.defaultData = Array.isArray(defaultProps.defaultData)
              ? defaultProps.defaultData
              : [];
            // Add custom actions support
            defaultProps.customActions = Array.isArray(
              defaultProps.customActions
            )
              ? defaultProps.customActions
              : [];
            break;

          case "info-display":
            // Ensure all required info display properties
            defaultProps.title = defaultProps.title || "Information";
            defaultProps.layout = defaultProps.layout || "vertical";
            defaultProps.showBorder =
              defaultProps.showBorder !== undefined
                ? defaultProps.showBorder
                : true;
            defaultProps.backgroundColor =
              defaultProps.backgroundColor || "#f8fafc";
            defaultProps.fields = Array.isArray(defaultProps.fields)
              ? defaultProps.fields
              : [{ label: "Info Item", value: "Value", key: "item_1" }];
            break;

          case "file":
            // Ensure all required file upload properties
            defaultProps.accept =
              defaultProps.accept || ".pdf,.doc,.docx,.jpg,.jpeg,.png";
            break;

          case "heading":
            // Ensure all required heading properties
            defaultProps.value = defaultProps.value || "Heading";
            defaultProps.level = defaultProps.level || 2;
            break;

          case "paragraph":
            // Ensure all required paragraph properties
            defaultProps.value = defaultProps.value || "Paragraph text";
            break;

          case "select":
          case "radio":
          case "checkbox":
            // Ensure options array exists
            if (
              !Array.isArray(defaultProps.options) ||
              defaultProps.options.length === 0
            ) {
              defaultProps.options = [
                { label: "Option 1", value: "option_1" },
                { label: "Option 2", value: "option_2" },
              ];
            }
            break;

          case "range":
            // Ensure all required range properties
            defaultProps.min =
              defaultProps.min !== undefined ? defaultProps.min : 0;
            defaultProps.max =
              defaultProps.max !== undefined ? defaultProps.max : 100;
            defaultProps.step =
              defaultProps.step !== undefined ? defaultProps.step : 1;
            defaultProps.value =
              defaultProps.value !== undefined ? defaultProps.value : 50;
            break;

          case "color":
            // Ensure color has a default value
            defaultProps.value = defaultProps.value || "#3b82f6";
            break;

          case "switch":
            // Ensure switch has a default value
            defaultProps.value =
              defaultProps.value !== undefined ? defaultProps.value : false;
            break;

          case "hidden":
            // Ensure hidden field has a value
            defaultProps.value = defaultProps.value || "";
            break;

          case "button":
            // Ensure all required button properties
            defaultProps.buttonType = defaultProps.buttonType || "button";
            defaultProps.variant = defaultProps.variant || "primary";
            defaultProps.size = defaultProps.size || "md";
            defaultProps.disabled =
              defaultProps.disabled !== undefined
                ? defaultProps.disabled
                : false;
            defaultProps.onClick = defaultProps.onClick || "";
            break;

          case "mask":
            // Ensure all required mask properties
            defaultProps.mask = defaultProps.mask || "###-###-####";
            break;

          case "otp":
            // Ensure all required OTP properties
            defaultProps.digits =
              defaultProps.digits !== undefined ? defaultProps.digits : 6;
            break;

          case "dropzone":
            // Ensure all required dropzone properties
            defaultProps.accept =
              defaultProps.accept || "image/*,.pdf,.doc,.docx";
            defaultProps.multiple =
              defaultProps.multiple !== undefined
                ? defaultProps.multiple
                : true;
            defaultProps.maxSize =
              defaultProps.maxSize !== undefined
                ? defaultProps.maxSize
                : 5242880; // 5MB
            defaultProps.maxFiles =
              defaultProps.maxFiles !== undefined ? defaultProps.maxFiles : 5;
            break;

          case "switch":
            // Ensure switch has a default value
            defaultProps.value =
              defaultProps.value !== undefined ? defaultProps.value : false;
            break;

          case "tab-container":
            // Ensure tab container has a default value
            defaultProps.tabs = defaultProps.tabs || [
              { id: "tab_1", label: "Tab 1", active: true, children: [] },
              { id: "tab_2", label: "Tab 2", active: false, children: [] },
            ];
            defaultProps.tabPosition = defaultProps.tabPosition || 'top';
            defaultProps.tabStyle = defaultProps.tabStyle || 'default';
            defaultProps.showBorder = defaultProps.showBorder || false;
            defaultProps.showAddButton = defaultProps.showAddButton || true;
            defaultProps.minTabs = defaultProps.minTabs || 1;
            defaultProps.maxTabs = defaultProps.maxTabs || 10;
            break;
        }

        const newComponent = {
          ...component,
          id: newComponentId,
          props: defaultProps,
        };

        this.formComponents.push(newComponent);

        // Initialize preview form data for repeating groups
        if (
          newComponent.type === "repeating-group" &&
          newComponent.props?.name
        ) {
          const groupName = newComponent.props.name;
          const minItems = newComponent.props.minItems || 1;

          const initialGroups = [];
          for (let i = 0; i < minItems; i++) {
            const newGroup = {};

            // Add fields from configuration
            if (newComponent.props.fields) {
              newComponent.props.fields.forEach((field) => {
                newGroup[field.name] = "";
              });
            }

            initialGroups.push(newGroup);
          }

          const updatedFormData = {
            ...this.previewFormData,
            [groupName]: initialGroups,
          };
          this.updatePreviewFormData(updatedFormData);
        }

        // Explicitly select the new component
        this.selectedComponentId = newComponentId;
        this.hasUnsavedChanges = true;

        // Record the action in history
        this.recordHistory("add_component", {
          componentType: component.type,
          componentId: newComponentId,
          componentName: newComponent.props.label || newComponent.type,
          beforeState: {
            components: beforeComponents,
            selectedComponentId: null, // Was null before adding
          },
          newComponent: newComponent,
        });

        console.log(
          "Component successfully added:",
          newComponent.type,
          newComponent.id
        );
      } catch (error) {
        console.error("Error adding component:", error);
        console.error("Problematic component:", component);
      }
    },

    // Find optimal placement for a new component in the grid
    findOptimalGridPlacement(respectDesignSpacing = true) {
      if (this.formComponents.length === 0) {
        // First component - full width
        return {
          gridColumn: "span 12",
          rowIndex: 0,
          width: "100%",
        };
      }

      // If respecting design spacing, always create a new row (don't auto-fill gaps)
      if (respectDesignSpacing) {
        return {
          gridColumn: "span 12",
          rowIndex: this.formComponents.length,
          width: "100%",
        };
      }

      // Legacy auto-fill behavior (kept for compatibility)
      // Group components by their implicit row
      const rows = [];
      let currentRowY = 0;
      let currentRowIndex = 0;
      let currentRowSpace = 0;

      // Sort components by their position in the form (to handle reordering)
      // This assumes components are ordered top to bottom
      const sortedComponents = [...this.formComponents];

      // Track used columns in each row
      sortedComponents.forEach((component) => {
        const spanMatch =
          component.props.gridColumn?.match(/span\s+(\d+)/) || [];
        const columnSpan = parseInt(spanMatch[1]) || 12;

        // If this is the first component in a row or there's enough space
        if (currentRowSpace === 0) {
          // Start a new row
          currentRowSpace = 12 - columnSpan;
          rows[currentRowIndex] = {
            components: [component],
            remainingSpace: currentRowSpace,
          };
        } else if (columnSpan <= currentRowSpace) {
          // Add to current row
          currentRowSpace -= columnSpan;
          rows[currentRowIndex].components.push(component);
          rows[currentRowIndex].remainingSpace = currentRowSpace;
        } else {
          // Start a new row
          currentRowIndex++;
          currentRowSpace = 12 - columnSpan;
          rows[currentRowIndex] = {
            components: [component],
            remainingSpace: currentRowSpace,
          };
        }
      });

      // Find the row with remaining space
      const rowWithSpace = rows.find((row) => row.remainingSpace > 0);

      if (rowWithSpace) {
        // Use remaining space in an existing row
        const remainingColumns = rowWithSpace.remainingSpace;

        // Calculate width percentage based on columns
        // Convert columns to percentage (each column is 8.33% of the grid)
        let widthPercent;

        // Map grid columns to standard width percentages
        switch (remainingColumns) {
          case 3:
            widthPercent = 25;
            break; // 3/12 = 25%
          case 4:
            widthPercent = 33;
            break; // 4/12 = 33.33%
          case 6:
            widthPercent = 50;
            break; // 6/12 = 50%
          case 8:
            widthPercent = 66;
            break; // 8/12 = 66.67%
          case 9:
            widthPercent = 75;
            break; // 9/12 = 75%
          case 12:
            widthPercent = 100;
            break; // 12/12 = 100%
          default:
            widthPercent = Math.round((remainingColumns / 12) * 100);
        }

        return {
          gridColumn: `span ${remainingColumns}`,
          rowIndex: rows.indexOf(rowWithSpace),
          width: `${widthPercent}%`,
        };
      } else {
        // No space in existing rows, create a new row
        return {
          gridColumn: "span 12",
          rowIndex: rows.length,
          width: "100%",
        };
      }
    },

    // Insert component at a specific index (for drop zones)
    insertComponentAtIndex(component, index) {
      console.log(
        "FormStore: Inserting component at index",
        index,
        component.type
      );

      // Store the state before the change for history
      const beforeComponents = [...this.formComponents];

      const newComponentId = uuidv4();

      try {
        // Create a deep copy of the default props to avoid reference issues
        const defaultProps = component.defaultProps
          ? JSON.parse(JSON.stringify(component.defaultProps))
          : {};

        // Set default grid properties - respect design spacing by using full width
        defaultProps.width = defaultProps.width || "100%";
        defaultProps.gridColumn = defaultProps.gridColumn || "span 12";

        // Generate a default name based on component type if not provided
        if (!defaultProps.name) {
          defaultProps.name = `${component.type}_${this.formComponents.length + 1}`;
        }

        // Generate a default label based on component name if not provided
        if (
          !defaultProps.label &&
          !["heading", "paragraph", "divider"].includes(component.type)
        ) {
          defaultProps.label = `${component.name} ${this.formComponents.length + 1}`;
        }

        // Create the new component object
        const newComponent = {
          id: newComponentId,
          type: component.type,
          name: component.name,
          icon: component.icon,
          category: component.category,
          props: defaultProps,
        };

        // Insert the component at the specified index
        this.formComponents.splice(index, 0, newComponent);

        // Select the new component
        this.selectedComponentId = newComponentId;

        // Mark as having unsaved changes
        this.hasUnsavedChanges = true;

        // Record history
        this.recordAction("Add component", beforeComponents, [
          ...this.formComponents,
        ]);

        console.log(
          "FormStore: Component inserted at index",
          index,
          "Total components:",
          this.formComponents.length
        );
      } catch (error) {
        console.error("Error inserting component at index:", error);
        console.error("Problematic component:", component);
      }
    },

    selectComponent(id) {
      // Don't record history for selection changes
      this.selectedComponentId = id;
    },

    updateComponent(updatedComponent) {
      const index = this.formComponents.findIndex(
        (c) => c.id === updatedComponent.id
      );

      if (index !== -1) {
        // Store old component for history
        const oldComponent = { ...this.formComponents[index] };
        const beforeComponents = [...this.formComponents];

        // Update the component
        this.formComponents[index] = JSON.parse(
          JSON.stringify(updatedComponent)
        );
        this.hasUnsavedChanges = true;

        // Record in history
        this.recordHistory("update_component", {
          componentId: updatedComponent.id,
          componentType: updatedComponent.type,
          componentName: updatedComponent.props.label,
          oldComponent: oldComponent,
          newComponent: this.formComponents[index],
          beforeState: {
            components: beforeComponents,
            selectedComponentId: this.selectedComponentId,
          },
        });
      }
    },

    moveComponent({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        // Record before state
        const beforeComponents = [...this.formComponents];
        const componentToMove = { ...this.formComponents[oldIndex] };
        const beforeOrder = this.formComponents.map((c) => c.id);

        // Perform the move
        this.formComponents.splice(oldIndex, 1);
        this.formComponents.splice(newIndex, 0, componentToMove);

        // Optimize layout after reordering
        this.optimizeGridLayout();
        this.hasUnsavedChanges = true;

        // Record in history
        this.recordHistory("move_component", {
          componentId: componentToMove.id,
          componentName: componentToMove.props.label,
          oldIndex,
          newIndex,
          beforeOrder,
          afterOrder: this.formComponents.map((c) => c.id),
          beforeState: {
            components: beforeComponents,
            selectedComponentId: this.selectedComponentId,
          },
        });
      }
    },

    deleteComponent(id) {
      const index = this.formComponents.findIndex((c) => c.id === id);

      if (index !== -1) {
        // Store the component for history
        const deletedComponent = { ...this.formComponents[index] };

        // Store the current state before deletion for history
        const beforeComponents = [...this.formComponents];

        // Remove the component
        this.formComponents.splice(index, 1);

        // Update selection if the deleted component was selected
        if (this.selectedComponentId === id) {
          this.selectedComponentId = null;

          // If there are other components, select the first one after deletion
          if (this.formComponents.length > 0) {
            // Select the component at the same index, or the last component if we deleted the last one
            const newIndex = Math.min(index, this.formComponents.length - 1);
            this.selectedComponentId = this.formComponents[newIndex].id;
          }
        }

        // Optimize layout after deletion
        this.optimizeGridLayout();
        this.hasUnsavedChanges = true;

        // Record in history
        this.recordHistory("delete_component", {
          componentId: id,
          componentType: deletedComponent.type,
          componentName: deletedComponent.props.label,
          componentIndex: index,
          deletedComponent: deletedComponent,
          beforeState: {
            components: beforeComponents,
            selectedComponentId: this.selectedComponentId,
          },
        });
      }
    },

    setDraggingOver(isDragging) {
      this.isDraggingOver = isDragging;
    },

    setFormName(name) {
      const oldName = this.formName;

      if (this.formName !== name) {
        this.formName = name;
        this.hasUnsavedChanges = true;

        // Record in history
        this.recordHistory("change_form_name", {
          oldName,
          newName: name,
        });
      }
    },

    setFormDescription(description) {
      const oldDescription = this.formDescription;

      if (this.formDescription !== description) {
        this.formDescription = description;
        this.hasUnsavedChanges = true;

        // Record in history
        this.recordHistory("change_form_description", {
          oldDescription,
          newDescription: description,
        });
      }
    },

    resetUnsavedChanges() {
      this.hasUnsavedChanges = false;
    },

    // Get forms from the backend
    async getForms() {
      try {
        // Use the API endpoint to fetch forms
        const response = await fetch("https://bp.corrad.ai/api/forms");
        const result = await response.json();

        if (result.success && Array.isArray(result.forms)) {
          return result.forms;
        } else {
          console.error(
            "Error in API response:",
            result.error || "Unknown error"
          );
          return [];
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
        return [];
      }
    },

    // Load saved forms from the API
    async loadSavedForms() {
      try {
        // Fetch forms from the API
        const forms = await this.getForms();

        // Transform to the format expected by the UI
        this.savedForms = forms.map((form) => ({
          id: form.formUUID,
          name: form.formName,
          description: form.formDescription || "",
          components: form.formComponents || [],
          category: form.formCategory || "",
          group: form.formGroup || "",
          tags: form.formTags || [],
          createdAt: form.formCreatedDate,
          updatedAt: form.formModifiedDate,
        }));

        return this.savedForms;
      } catch (error) {
        console.error("Error loading saved forms:", error);
        this.savedForms = [];
        return [];
      }
    },

    // Save form to the database
    async saveForm() {
      try {
        const formData = {
          formName: this.formName,
          formDescription: this.formDescription,
          components: this.formComponents.map((c) => ({
            type: c.type,
            props: c.props,
          })),
          customScript: this.formCustomScript,
          customCSS: this.formCustomCSS,
          formEvents: this.formEvents,
          formModals: this.modals,
          scriptMode: this.scriptMode,
          submitButton: this.submitButton,
          formCategory: this.formCategory,
          formTags: this.formTags,
          formGroup: this.formGroup,
          // Add change description for history tracking
          changeDescription: this.lastChangeDescription || null,
          // Note: savedBy will be handled by the server using the authenticated user from auth middleware
        };

        // Determine if this is a new form or an update
        const isNewForm = !this.currentFormId;
        let response;

        if (isNewForm) {
          // Create a new form
          response = await fetch("https://bp.corrad.ai/api/forms/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        } else {
          // Update existing form
          response = await fetch(`https://bp.corrad.ai/api/forms/${this.currentFormId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        }

        const result = await response.json();

        if (result.success) {
          // Update store state with the saved form
          this.currentFormId = result.form.formUUID;
          this.hasUnsavedChanges = false;
          this.lastChangeDescription = null; // Reset after save

          // Record in history
          this.recordHistory("save_form", {
            formName: this.formName,
            formDescription: this.formDescription,
            componentCount: this.formComponents.length,
            versionSaved: result.versionSaved,
          });

          return result.form;
        } else {
          throw new Error(result.error || "Failed to save form");
        }
      } catch (error) {
        console.error("Error saving form:", error);
        throw error;
      }
    },

    // Load a form from the database
    async loadForm(formId) {
      if (!formId) {
        throw new Error("Form ID is required");
      }

      try {
        const response = await fetch(`https://bp.corrad.ai/api/forms/${formId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.form) {
          // Clear existing data
          this.formComponents = [];
          this.selectedComponentId = null;

          // Set form data
          this.formName = result.form.formName;
          this.formDescription = result.form.formDescription || "";
          this.currentFormId = result.form.formUUID;

          // Load grouping data
          this.formCategory = result.form.formCategory || "";
          this.formTags = result.form.formTags || [];
          this.formGroup = result.form.formGroup || "";

          // Load custom scripts and settings
          this.formCustomScript = result.form.customScript || "";
          this.formCustomCSS = result.form.customCSS || "";
          this.formEvents = result.form.formEvents || {
            onLoad: true,
            onFieldChange: true,
            onSubmit: false,
            onValidation: false,
          };
          this.scriptMode = result.form.scriptMode || "safe";
          this.submitButton = result.form.submitButton || {
            enabled: true,
            label: "Submit",
            category: "primary",
            color: "primary",
          };

          // Ensure backward compatibility for confirmation modal
          if (!this.submitButton.confirmationModal) {
            this.submitButton.confirmationModal = {
              enabled: false,
              title: "Confirm Submission",
              description: "Are you sure you want to submit this form?",
            };
          }

          // Load modal data with backward compatibility
          if (result.form.formModals) {
            this.modals = result.form.formModals;

            // Update modalIdCounter to avoid ID conflicts with existing modals
            let maxModalId = 0;
            Object.keys(this.modals).forEach((modalId) => {
              const match = modalId.match(/^modal_(\d+)$/);
              if (match) {
                const idNumber = parseInt(match[1], 10);
                if (idNumber > maxModalId) {
                  maxModalId = idNumber;
                }
              }
            });
            this.modalIdCounter = maxModalId;
          } else {
            this.modals = {}; // Backward compatibility for forms without modals
            this.modalIdCounter = 0;
          }

          // Ensure backward compatibility for position
          if (!this.submitButton.position) {
            this.submitButton.position = "left";
          }

          // Ensure the submit button structure is complete
          this.ensureSubmitButtonStructure();

          // Transform components from DB format to store format
          if (Array.isArray(result.form.formComponents)) {
            this.formComponents = result.form.formComponents.map((c) => ({
              ...c,
              id: uuidv4(), // Assign a new UUID for each component
            }));
          }

          // Initialize preview form data with repeating groups
          const initialFormData = {};
          this.formComponents.forEach((component) => {
            if (component.type === "repeating-group" && component.props?.name) {
              const groupName = component.props.name;
              const minItems = component.props.minItems || 1;

              const initialGroups = [];
              for (let i = 0; i < minItems; i++) {
                const newGroup = {};

                // Add fields from configuration
                if (component.props.fields) {
                  component.props.fields.forEach((field) => {
                    newGroup[field.name] = "";
                  });
                }

                initialGroups.push(newGroup);
              }

              initialFormData[groupName] = initialGroups;
            }
          });

          this.updatePreviewFormData(initialFormData);

          // Clear and initialize history when loading a form
          this.actionHistory = [];
          this.currentHistoryIndex = -1;

          // Record initial state in history
          this.recordHistory("load_form", {
            formName: result.form.formName,
            formId: formId,
          });

          return result.form;
        } else {
          throw new Error(result.error || "Failed to load form");
        }
      } catch (error) {
        console.error(`Error loading form ${formId}:`, error);
        throw error;
      }
    },

    // Delete a form from the database
    async deleteForm(formId) {
      try {
        const response = await fetch(`https://bp.corrad.ai/api/forms/${formId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          return true;
        } else {
          throw new Error(result.error || "Failed to delete form");
        }
      } catch (error) {
        console.error(`Error deleting form ${formId}:`, error);
        throw error;
      }
    },

    // Clear the current form
    clearForm() {
      // Capture the current state before clearing
      const oldComponents = [...this.formComponents];
      const oldName = this.formName;
      const oldDescription = this.formDescription;

      // Clear form data
      this.formComponents = [];
      this.selectedComponentId = null;
      this.formName = "New Form";
      this.formDescription = "";
      this.currentFormId = null;
      this.hasUnsavedChanges = false;

      // Reset grouping fields
      this.formCategory = "";
      this.formTags = [];
      this.formGroup = "";

      // Reset custom scripts and settings
      this.formCustomScript = "";
      this.formCustomCSS = "";
      this.formEvents = {
        onLoad: true,
        onFieldChange: true,
        onSubmit: false,
        onValidation: false,
      };
      this.scriptMode = "safe";

      // Reset submit button to defaults
      this.submitButton = {
        enabled: true,
        label: "Submit",
        category: "primary",
        color: "primary",
        position: "left",
        confirmationModal: {
          enabled: false,
          title: "Confirm Submission",
          description: "Are you sure you want to submit this form?",
        },
      };

      // Reset modal system
      this.modals = {};
      this.activeTab = "main";
      this.modalIdCounter = 0;
      this.selectedModalComponentId = null;

      // Clear history when starting a new form and add initial state
      this.actionHistory = [];
      this.currentHistoryIndex = -1;

      // Clear preview form data
      this.updatePreviewFormData({});

      // Record the initial empty state
      this.recordHistory("new_form", {
        message: "Created a new empty form",
      });
    },

    // Update preview form data - SSR safe
    updatePreviewFormData(data) {
      this.previewFormData = { ...data };

      // Only persist to sessionStorage on client side to prevent hydration issues
      if (process.client) {
        try {
          sessionStorage.setItem(
            "form-builder-data",
            JSON.stringify({
              previewFormData: this.previewFormData,
              timestamp: Date.now(),
            })
          );
        } catch (error) {
          console.warn("[FormStore] Failed to persist form data:", error);
        }
      }
    },

    // Optimize the grid layout by analyzing the current components
    // and adjusting their sizes to fill available spaces
    optimizeGridLayout() {
      // Skip if no components
      if (this.formComponents.length === 0) return;

      // Group components by their implicit row (similar to findOptimalGridPlacement)
      const rows = [];
      let currentRowIndex = 0;
      let currentRowSpace = 12; // Full width available initially

      // Sort components by their position in the form
      const sortedComponents = [...this.formComponents];

      // First pass: Group components into rows
      sortedComponents.forEach((component) => {
        const spanMatch =
          component.props.gridColumn?.match(/span\s+(\d+)/) || [];
        const columnSpan = parseInt(spanMatch[1]) || 12;

        // If this is the first component in a row or there's enough space
        if (currentRowSpace === 12) {
          // Start of a new row
          currentRowSpace = 12 - columnSpan;
          rows[currentRowIndex] = {
            components: [{ component, span: columnSpan }],
            remainingSpace: currentRowSpace,
          };
        } else if (columnSpan <= currentRowSpace) {
          // Add to current row
          currentRowSpace -= columnSpan;
          rows[currentRowIndex].components.push({
            component,
            span: columnSpan,
          });
          rows[currentRowIndex].remainingSpace = currentRowSpace;
        } else {
          // Start a new row
          currentRowIndex++;
          currentRowSpace = 12 - columnSpan;
          rows[currentRowIndex] = {
            components: [{ component, span: columnSpan }],
            remainingSpace: currentRowSpace,
          };
        }
      });

      // Second pass: Optimize each row
      rows.forEach((row) => {
        // Skip full rows
        if (row.remainingSpace === 0) return;

        // If there's only one component in a row with remaining space,
        // expand it to fill the row
        if (row.components.length === 1 && row.remainingSpace > 0) {
          const comp = row.components[0];
          const totalSpan = 12; // Full row
          this.updateComponentSize(comp.component, totalSpan);
        }
        // If there are multiple components in a row with remaining space,
        // distribute the space proportionally
        else if (row.components.length > 1 && row.remainingSpace > 0) {
          // Calculate how much extra space each component gets
          const extraSpanPerComponent = Math.floor(
            row.remainingSpace / row.components.length
          );
          let remainingExtraSpan = row.remainingSpace % row.components.length;

          // Distribute the remaining columns among components
          row.components.forEach((comp) => {
            // Calculate new span, adding extra space plus one more if there's remainder
            let extraSpan = extraSpanPerComponent;
            if (remainingExtraSpan > 0) {
              extraSpan += 1;
              remainingExtraSpan--;
            }

            const newSpan = comp.span + extraSpan;
            this.updateComponentSize(comp.component, newSpan);
          });
        }
      });
    },

    // Update a component's size based on a new column span
    updateComponentSize(component, newSpan) {
      // Convert the span to a standard width percentage
      let widthPercent;
      switch (newSpan) {
        case 3:
          widthPercent = 25;
          break;
        case 4:
          widthPercent = 33;
          break;
        case 6:
          widthPercent = 50;
          break;
        case 8:
          widthPercent = 66;
          break;
        case 9:
          widthPercent = 75;
          break;
        case 12:
          widthPercent = 100;
          break;
        default:
          widthPercent = Math.round((newSpan / 12) * 100);
      }

      // Update the component
      const index = this.formComponents.findIndex((c) => c.id === component.id);
      if (index !== -1) {
        this.formComponents[index] = {
          ...component,
          props: {
            ...component.props,
            width: `${widthPercent}%`,
            gridColumn: `span ${newSpan}`,
          },
        };
      }
    },

    // Get form history/versions
    async getFormHistory(formId = null) {
      try {
        const id = formId || this.currentFormId;
        if (!id) {
          throw new Error("No form ID provided");
        }

        const response = await fetch(`https://bp.corrad.ai/api/forms/${id}/history`);
        const result = await response.json();

        if (result.success) {
          return result;
        } else {
          throw new Error(result.error || "Failed to fetch form history");
        }
      } catch (error) {
        console.error("Error fetching form history:", error);
        throw error;
      }
    },

    // Get specific form version details
    async getFormVersion(formId, versionId) {
      try {
        const response = await fetch(
          `https://bp.corrad.ai/api/forms/${formId}/version/${versionId}`
        );
        const result = await response.json();

        if (result.success) {
          return result;
        } else {
          throw new Error(result.error || "Failed to fetch form version");
        }
      } catch (error) {
        console.error("Error fetching form version:", error);
        throw error;
      }
    },

    // Restore form to a specific version
    async restoreFormVersion(formId, versionData, changeDescription = null) {
      try {
        const response = await fetch(`https://bp.corrad.ai/api/forms/${formId}/restore`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            versionNumber: versionData.versionNumber,
            historyID: versionData.historyID,
            restoredBy: 1, // TODO: Get from authenticated user
            changeDescription:
              changeDescription ||
              `Restored to version ${versionData.versionNumber}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Reload the form to reflect the restored state
          await this.loadForm(formId);

          return result;
        } else {
          throw new Error(result.error || "Failed to restore form version");
        }
      } catch (error) {
        console.error("Error restoring form version:", error);
        throw error;
      }
    },

    // Load form version for preview (without changing current form)
    async loadFormVersionPreview(formId, versionId) {
      try {
        const versionResult = await this.getFormVersion(formId, versionId);

        if (versionResult.success) {
          const version = versionResult.version;

          // Return the version data in a format compatible with form preview
          return {
            formName: version.formName,
            formDescription: version.formDescription,
            formComponents: version.formComponents,
            customScript: version.customScript,
            customCSS: version.customCSS,
            formEvents: version.formEvents,
            scriptMode: version.scriptMode,
            versionInfo: {
              versionNumber: version.versionNumber,
              savedDate: version.savedDate,
              savedBy: version.savedByUser,
              changeDescription: version.changeDescription,
            },
          };
        } else {
          throw new Error("Failed to load version preview");
        }
      } catch (error) {
        console.error("Error loading form version preview:", error);
        throw error;
      }
    },

    // Set change description for next save
    setChangeDescription(description) {
      this.lastChangeDescription = description;
    },

    // Modal management actions
    createModal(name = "New Modal") {
      const modalId = `modal_${++this.modalIdCounter}`;
      this.modals[modalId] = {
        id: modalId,
        name: name,
        components: [],
        settings: {
          title: name,
          size: "medium", // small, medium, large, fullscreen
          position: "center",
          backdrop: true,
          closeOnEscape: true,
          showHeader: true,
          showFooter: false,
          footer: {
            showOkButton: true,
            showCancelButton: true,
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            okButtonVariant: "primary",
            cancelButtonVariant: "secondary",
          },
          submitButton: {
            enabled: true,
            label: "Submit",
            category: "primary",
            color: "primary",
            position: "right",
          },
        },
      };
      this.activeTab = modalId;
      this.hasUnsavedChanges = true;
      this.recordHistory("add_modal", { modalId, name });

      return modalId;
    },

    deleteModal(modalId) {
      if (this.modals[modalId]) {
        const modalName = this.modals[modalId].name;
        delete this.modals[modalId];

        // Switch to main tab if we deleted the active modal
        if (this.activeTab === modalId) {
          this.activeTab = "main";
          this.selectedModalComponentId = null;
        }

        this.hasUnsavedChanges = true;
        this.recordHistory("delete_modal", { modalId, modalName });
      }
    },

    switchTab(tabId) {
      this.activeTab = tabId;

      // Clear component selection when switching tabs
      if (tabId === "main") {
        this.selectedModalComponentId = null;
      } else {
        this.selectedComponentId = null;
      }
    },

    updateModalName(modalId, newName) {
      if (this.modals[modalId]) {
        const oldName = this.modals[modalId].name;
        this.modals[modalId].name = newName;
        this.modals[modalId].settings.title = newName;
        this.hasUnsavedChanges = true;
        this.recordHistory("rename_modal", { modalId, oldName, newName });
      }
    },

    updateModalSettings(modalId, settings) {
      if (this.modals[modalId]) {
        // Deep merge settings
        this.modals[modalId].settings = {
          ...this.modals[modalId].settings,
          ...settings,
          footer: {
            ...this.modals[modalId].settings.footer,
            ...settings.footer,
          },
          submitButton: {
            ...this.modals[modalId].settings.submitButton,
            ...settings.submitButton,
          },
        };
        this.hasUnsavedChanges = true;
        this.recordHistory("update_modal_settings", { modalId, settings });
      }
    },

    // Shared method to process component default properties
    processComponentDefaultProps(component, componentCount) {
      // Create a deep copy of the default props to avoid reference issues
      const defaultProps = component.defaultProps
        ? JSON.parse(JSON.stringify(component.defaultProps))
        : {};

      // Generate a default name based on component type if not provided
      if (!defaultProps.name) {
        defaultProps.name = `${component.type}_${componentCount + 1}`;
      }

      // Generate a default label based on component name if not provided
      if (
        !defaultProps.label &&
        !["heading", "paragraph", "divider"].includes(component.type)
      ) {
        defaultProps.label = `${component.name} ${componentCount + 1}`;
      }

      // Handle special component types
      switch (component.type) {
        case "image-preview":
          // Ensure all required image preview properties
          defaultProps.imageUrl =
            defaultProps.imageUrl || "https://placehold.co/600x400";
          defaultProps.altText = defaultProps.altText || "Preview image";
          defaultProps.caption = defaultProps.caption || "";
          defaultProps.showZoom =
            defaultProps.showZoom !== undefined ? defaultProps.showZoom : true;
          defaultProps.showCaption =
            defaultProps.showCaption !== undefined
              ? defaultProps.showCaption
              : true;
          defaultProps.maxWidth = defaultProps.maxWidth || "100%";
          defaultProps.height = defaultProps.height || "auto";
          break;

        case "repeating-group":
          // Ensure all required repeating group properties
          defaultProps.minItems =
            defaultProps.minItems !== undefined ? defaultProps.minItems : 1;
          defaultProps.maxItems =
            defaultProps.maxItems !== undefined ? defaultProps.maxItems : 10;
          defaultProps.buttonText = defaultProps.buttonText || "Add Item";
          defaultProps.removeText = defaultProps.removeText || "Remove";
          defaultProps.fields = defaultProps.fields || [
            {
              type: "text",
              name: "field_1",
              label: "Field 1",
              placeholder: "Enter value",
            },
          ];
          break;

        case "dynamic-list":
          // Ensure all required dynamic list properties
          defaultProps.placeholder = defaultProps.placeholder || "Enter item";
          defaultProps.buttonText = defaultProps.buttonText || "Add Item";
          defaultProps.minItems =
            defaultProps.minItems !== undefined ? defaultProps.minItems : 0;
          defaultProps.maxItems =
            defaultProps.maxItems !== undefined ? defaultProps.maxItems : 20;
          defaultProps.defaultItems = Array.isArray(defaultProps.defaultItems)
            ? defaultProps.defaultItems
            : ["Item 1", "Item 2"];
          break;

        case "repeating-table":
          // Ensure all required repeating table properties
          defaultProps.buttonText = defaultProps.buttonText || "Add Record";
          defaultProps.editText = defaultProps.editText || "Edit";
          defaultProps.deleteText = defaultProps.deleteText || "Delete";
          defaultProps.minRecords =
            defaultProps.minRecords !== undefined ? defaultProps.minRecords : 0;
          defaultProps.maxRecords =
            defaultProps.maxRecords !== undefined
              ? defaultProps.maxRecords
              : 50;
          defaultProps.showRowNumbers =
            defaultProps.showRowNumbers !== undefined
              ? defaultProps.showRowNumbers
              : true;
          defaultProps.allowEdit =
            defaultProps.allowEdit !== undefined
              ? defaultProps.allowEdit
              : true;
          defaultProps.allowDelete =
            defaultProps.allowDelete !== undefined
              ? defaultProps.allowDelete
              : true;
          defaultProps.confirmDelete =
            defaultProps.confirmDelete !== undefined
              ? defaultProps.confirmDelete
              : true;
          defaultProps.enableSearch =
            defaultProps.enableSearch !== undefined
              ? defaultProps.enableSearch
              : false;
          defaultProps.enableExport =
            defaultProps.enableExport !== undefined
              ? defaultProps.enableExport
              : false;
          defaultProps.columns = Array.isArray(defaultProps.columns)
            ? defaultProps.columns
            : [
                {
                  name: "name",
                  label: "Name",
                  type: "text",
                  required: true,
                  placeholder: "Enter name",
                  validation: "required",
                  width: "200px",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                  placeholder: "Enter email",
                  validation: "required|email",
                  width: "250px",
                },
              ];
          defaultProps.defaultData = Array.isArray(defaultProps.defaultData)
            ? defaultProps.defaultData
            : [];
          // Add custom actions support
          defaultProps.customActions = Array.isArray(defaultProps.customActions)
            ? defaultProps.customActions
            : [];
          break;

        case "info-display":
          // Ensure all required info display properties
          defaultProps.title = defaultProps.title || "Information";
          defaultProps.layout = defaultProps.layout || "vertical";
          defaultProps.showBorder =
            defaultProps.showBorder !== undefined
              ? defaultProps.showBorder
              : true;
          defaultProps.backgroundColor =
            defaultProps.backgroundColor || "#f8fafc";
          defaultProps.fields = Array.isArray(defaultProps.fields)
            ? defaultProps.fields
            : [{ label: "Info Item", value: "Value", key: "item_1" }];
          break;

        case "file":
          // Ensure all required file upload properties
          defaultProps.accept =
            defaultProps.accept || ".pdf,.doc,.docx,.jpg,.jpeg,.png";
          break;

        case "heading":
          // Ensure all required heading properties
          defaultProps.value = defaultProps.value || "Heading";
          defaultProps.level = defaultProps.level || 2;
          break;

        case "paragraph":
          // Ensure all required paragraph properties
          defaultProps.value = defaultProps.value || "Paragraph text";
          break;

        case "select":
        case "radio":
        case "checkbox":
          // Ensure options array exists
          if (
            !Array.isArray(defaultProps.options) ||
            defaultProps.options.length === 0
          ) {
            defaultProps.options = [
              { label: "Option 1", value: "option_1" },
              { label: "Option 2", value: "option_2" },
            ];
          }
          break;
      }

      return defaultProps;
    },

    // Component management for modals
    addComponentToModal(modalId, component) {
      if (!this.modals[modalId]) return;

      const newComponentId = uuidv4();

      try {
        // Use the same comprehensive component processing as main form
        const defaultProps = this.processComponentDefaultProps(
          component,
          this.modals[modalId].components.length
        );

        // Ensure grid properties for modal context
        defaultProps.width = defaultProps.width || "100%";
        defaultProps.gridColumn = defaultProps.gridColumn || "span 12";

        // Create the new component with processed properties
        const newComponent = {
          id: newComponentId,
          type: component.type,
          props: defaultProps,
        };

        this.modals[modalId].components.push(newComponent);
        this.hasUnsavedChanges = true;
        this.recordHistory("add_component_to_modal", {
          modalId,
          componentType: component.type,
        });

        console.log("Modal component added:", newComponent);
        return newComponentId;
      } catch (error) {
        console.error("Error adding component to modal:", error);
        return null;
      }
    },

    removeComponentFromModal(modalId, componentId) {
      if (!this.modals[modalId]) return;

      const components = this.modals[modalId].components;
      const index = components.findIndex((c) => c.id === componentId);

      if (index !== -1) {
        const removedComponent = components.splice(index, 1)[0];

        // Clear selection if this component was selected
        if (this.selectedModalComponentId === componentId) {
          this.selectedModalComponentId = null;
        }

        this.hasUnsavedChanges = true;
        this.recordHistory("remove_component_from_modal", {
          modalId,
          componentType: removedComponent.type,
        });
      }
    },

    selectModalComponent(componentId) {
      this.selectedModalComponentId = componentId;
      // Clear main form component selection
      this.selectedComponentId = null;
    },

    updateModalComponent(modalId, updatedComponent) {
      if (!this.modals[modalId]) return;

      const components = this.modals[modalId].components;
      const index = components.findIndex((c) => c.id === updatedComponent.id);

      if (index !== -1) {
        components[index] = { ...updatedComponent };
        this.hasUnsavedChanges = true;
        this.recordHistory("update_modal_component", {
          modalId,
          componentId: updatedComponent.id,
          componentType: updatedComponent.type,
        });
      }
    },

    moveModalComponent(modalId, { oldIndex, newIndex }) {
      if (!this.modals[modalId]) return;

      const components = this.modals[modalId].components;
      if (
        oldIndex >= 0 &&
        oldIndex < components.length &&
        newIndex >= 0 &&
        newIndex < components.length
      ) {
        const [movedComponent] = components.splice(oldIndex, 1);
        components.splice(newIndex, 0, movedComponent);

        this.hasUnsavedChanges = true;
        this.recordHistory("move_modal_component", {
          modalId,
          oldIndex,
          newIndex,
        });
      }
    },

    insertComponentToModalAtIndex(modalId, component, index) {
      if (!this.modals[modalId]) return;

      const newComponentId = uuidv4();

      try {
        // Use the same comprehensive component processing as main form
        const defaultProps = this.processComponentDefaultProps(
          component,
          this.modals[modalId].components.length
        );

        // Ensure grid properties for modal context
        defaultProps.width = defaultProps.width || "100%";
        defaultProps.gridColumn = defaultProps.gridColumn || "span 12";

        // Create the new component with processed properties
        const newComponent = {
          id: newComponentId,
          type: component.type,
          props: defaultProps,
        };

        const components = this.modals[modalId].components;
        if (index >= 0 && index <= components.length) {
          components.splice(index, 0, newComponent);
        } else {
          components.push(newComponent);
        }

        this.hasUnsavedChanges = true;
        this.recordHistory("insert_component_to_modal", {
          modalId,
          index,
          componentType: component.type,
        });

        return newComponentId;
      } catch (error) {
        console.error("Error inserting component to modal:", error);
        return null;
      }
    },

    // Helper method to get current canvas components based on active tab
    getCurrentComponents() {
      if (this.activeTab === "main") {
        return this.formComponents;
      }
      const modal = this.modals[this.activeTab];
      return modal ? modal.components : [];
    },

    // Helper method to add component to current active canvas
    addComponentToCurrent(component) {
      if (this.activeTab === "main") {
        this.addComponent(component);
      } else {
        this.addComponentToModal(this.activeTab, component);
      }
    },
  },

  persist: {
    paths: ["savedForms"],
  },
});
