
<template>
  <div 
    v-if="isCurrentComponentVisible"
    ref="containerElement" 
    class="component-preview form-field" 
    :style="componentStyle" 
    :data-name="component.props.name"
    :data-type="component.type"
  >
    <!-- Hidden Field Special Display -->
    <div v-if="component.type === 'hidden' && !isPreview" class="py-2">
      <div class="hidden-field-preview border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:eye-slash" class="w-4 h-4 text-gray-400" />
          <span class="text-sm font-medium text-gray-600">Hidden Field</span>
        </div>
        <div class="mt-1">
          <div class="text-xs text-gray-500">
            <strong>Name:</strong> {{ component.props.name || 'unnamed' }}
          </div>
          <div class="text-xs text-gray-500">
            <strong>Value:</strong> {{ component.props.value || '(empty)' }}
          </div>
        </div>
        <div v-if="component.props.help" class="mt-1 text-xs text-gray-400">
          {{ component.props.help }}
        </div>
      </div>
    </div>

    <!-- Basic Input Types (including radio and checkbox) -->
    <FormKit v-else-if="isInputType" :id="`preview-${component.id}`" :type="component.type" 
      :name="getFieldName(component)"
      :label="component.props.label" :help="component.props.help" :placeholder="component.props.placeholder"
      :validation="component.props.validation" :validation-visibility="isPreview ? 'blur' : 'blur'"
      :readonly="component.props.readonly || !isPreview" 
      :disabled="!isPreview || (component.props.readonly && ['select', 'searchSelect', 'checkbox', 'radio', 'switch', 'quillEditor'].includes(component.type))" 
      :options="getFilteredOptions(component)" 
      :value="getFieldValue(component)"
      :accept="component.props.accept || undefined" :max="component.props.max || undefined"
      :mask="component.props.mask || undefined" :digits="component.props.digits || undefined"
      :multiple="component.props.multiple || undefined" :maxSize="component.props.maxSize || undefined"
      :maxFiles="component.props.maxFiles || undefined" :rows="component.type === 'textarea' ? (component.props.rows || 3) : undefined"
      :buttonLabel="component.props.buttonLabel || undefined" :dropzoneText="component.props.dropzoneText || undefined"
      :showRestrictions="component.props.showRestrictions !== undefined ? component.props.showRestrictions : undefined"
      :allowDownload="component.props.allowDownload !== undefined ? component.props.allowDownload : undefined"
      :uploadedFilesText="component.props.uploadedFilesText || undefined"
      :showFileCount="component.props.showFileCount !== undefined ? component.props.showFileCount : undefined"
      :toolbar="component.props.toolbar || undefined" :theme="component.props.theme || undefined"
      :contentType="component.props.contentType || undefined"
      :classes="component.type === 'checkbox' ? {
        wrapper: 'mb-1',
        options: 'space-y-0.5'
      } : {      }" :class="{ 
        'canvas-component': isPreview,
        'readonly-select': component.props.readonly && (component.type === 'select' || component.type === 'searchSelect'),
        'readonly-quill': component.props.readonly && component.type === 'quillEditor',
        'readonly-checkbox': component.props.readonly && component.type === 'checkbox',
        'readonly-radio': component.props.readonly && component.type === 'radio',
        'readonly-switch': component.props.readonly && component.type === 'switch',
        'readonly-date': component.props.readonly && component.type === 'date',
        'readonly-time': component.props.readonly && component.type === 'time',
        'readonly-datetime': component.props.readonly && component.type === 'datetime-local'
      }"
      @input="handleFieldInput(component, $event)"
      @change="handleFieldChange(component, $event)" />

    <!-- Heading -->
    <div v-else-if="component.type === 'heading'" class="py-2">
      <component
        :is="`h${component.props.level || 2}`"
        class="font-semibold"
        :class="{
          'text-2xl': component.props.level === 2,
          'text-xl': component.props.level === 3,
          'text-lg': component.props.level === 4
        }"
        :style="{ textAlign: component.props.textAlign || 'left' }"
      >
        {{ component.props.value || 'Heading Text' }}
      </component>
    </div>

    <!-- Paragraph -->
    <div v-else-if="component.type === 'paragraph'" class="py-2">
      <p class="text-gray-600">{{ component.props.value || 'Paragraph text goes here' }}</p>
    </div>

    <!-- Information Display -->
    <div v-else-if="component.type === 'info-display'" class="py-2">
      <!-- Component Label -->
      <div v-if="component.props.label && component.props.label !== 'Info Display'" class="mb-2">
        <label class="text-sm font-medium text-gray-700">{{ component.props.label }}</label>
      </div>
      
      <!-- Help Text -->
      <div v-if="component.props.help" class="mb-2 text-xs text-gray-600">
        {{ component.props.help }}
      </div>
      
      <div class="info-display-container rounded" :style="{
        backgroundColor: component.props.backgroundColor || '#f9fafb',
        border: component.props.showBorder ? '1px solid #e5e7eb' : 'none'
      }">
        <!-- Title -->
        <div v-if="component.props.title" class="p-3 border-b border-gray-200 bg-white">
          <h4 class="text-base font-medium text-gray-800">{{ component.props.title }}</h4>
        </div>

        <!-- Fields Display -->
        <div class="p-4">
          <!-- Side by Side Layout -->
          <div v-if="component.props.layout === 'side-by-side'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(field, index) in component.props.fields" :key="index" class="field-item">
              <dt class="text-sm font-medium text-gray-600 mb-2">{{ field.label }}</dt>
              <dd class="text-sm text-gray-900">
                <span v-if="field.type === 'button' && field.url" class="block">
                  <button 
                    @click="handleInfoButtonClick(field.url, field.openInNewTab)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    :target="field.openInNewTab ? '_blank' : '_self'"
                  >
                    <Icon v-if="field.icon" :name="field.icon" class="w-4 h-4 mr-1" />
                    {{ field.value }}
                  </button>
                </span>
                <span v-else>{{ field.value }}</span>
              </dd>
            </div>
          </div>

          <!-- Grid Layout -->
          <div v-else-if="component.props.layout === 'grid'" class="grid grid-cols-2 gap-4">
            <div v-for="(field, index) in component.props.fields" :key="index" class="field-item">
              <dt class="text-sm font-medium text-gray-600">{{ field.label }}</dt>
              <dd class="text-sm text-gray-900 mt-1">
                <span v-if="field.type === 'button' && field.url" class="block">
                  <button 
                    @click="handleInfoButtonClick(field.url, field.openInNewTab)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    :target="field.openInNewTab ? '_blank' : '_self'"
                  >
                    <Icon v-if="field.icon" :name="field.icon" class="w-4 h-4 mr-1" />
                    {{ field.value }}
                  </button>
                </span>
                <span v-else>{{ field.value }}</span>
              </dd>
            </div>
          </div>

          <!-- Horizontal Layout -->
          <div v-else-if="component.props.layout === 'horizontal'" class="space-y-2">
            <div v-for="(field, index) in component.props.fields" :key="index"
              class="flex justify-between items-center">
              <dt class="text-sm font-medium text-gray-600">{{ field.label }}:</dt>
              <dd class="text-sm text-gray-900">
                <span v-if="field.type === 'button' && field.url" class="block">
                  <button 
                    @click="handleInfoButtonClick(field.url, field.openInNewTab)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    :target="field.openInNewTab ? '_blank' : '_self'"
                  >
                    <Icon v-if="field.icon" :name="field.icon" class="w-4 h-4 mr-1" />
                    {{ field.value }}
                  </button>
                </span>
                <span v-else>{{ field.value }}</span>
              </dd>
            </div>
          </div>

          <!-- Vertical Layout (Default) -->
          <div v-else class="space-y-3">
            <div v-for="(field, index) in component.props.fields" :key="index" class="field-item">
              <dt class="text-sm font-medium text-gray-600">{{ field.label }}</dt>
              <dd class="text-sm text-gray-900 mt-1">
                <span v-if="field.type === 'button' && field.url" class="block">
                  <button 
                    @click="handleInfoButtonClick(field.url, field.openInNewTab)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    :target="field.openInNewTab ? '_blank' : '_self'"
                  >
                    <Icon v-if="field.icon" :name="field.icon" class="w-4 h-4 mr-1" />
                    {{ field.value }}
                  </button>
                </span>
                <span v-else>{{ field.value }}</span>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div v-else-if="component.type === 'divider'" class="py-4">
      <hr class="border-gray-200" />
    </div>

    <!-- Image Preview Component -->
    <div v-else-if="component.type === 'image-preview'" class="py-2">
      <div class="image-preview-container"
        :class="{ 'has-caption': component.props.showCaption && component.props.caption }">
        <label v-if="component.props.label" class="block text-sm font-medium text-gray-700 mb-1">
          {{ component.props.label }}
        </label>

        <div class="image-container relative" :class="{ 'cursor-zoom-in': component.props.showZoom }"
          @click="handleImageClick">
          <img :src="component.props.imageUrl" :alt="component.props.altText || 'Image preview'"
            class="max-w-full rounded" :style="{
              maxWidth: component.props.maxWidth || '100%',
              height: component.props.height || 'auto',
            }" />
          <div v-if="component.props.showZoom"
            class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white p-1 rounded">
            <Icon name="material-symbols:zoom-in" class="w-4 h-4" />
          </div>
        </div>

        <div v-if="component.props.showCaption && component.props.caption"
          class="mt-1 text-sm text-gray-500 text-center">
          {{ component.props.caption }}
        </div>

        <div v-if="component.props.help" class="mt-1 text-xs text-gray-500">
          {{ component.props.help }}
        </div>
      </div>
    </div>

    <!-- Repeating Group Component -->
    <div v-else-if="component.type === 'repeating-group'">
      <fieldset class="border rounded-md p-4 mb-4">
        <legend class="text-sm font-medium px-2">{{ component.props.label || 'Group' }}</legend>

        <div v-if="component.props.help" class="mb-3 text-xs text-gray-500">
          {{ component.props.help }}
        </div>

        <!-- Builder mode - show draggable container -->
        <div v-if="!isPreview" class="repeating-groups space-y-4">
          <!-- Container for draggable fields -->
          <div 
            class="repeating-group-container border-2 border-dashed border-gray-300 rounded-md p-4 min-h-[100px] bg-gray-50"
            :class="{
              'border-blue-400 bg-blue-50': sectionDropStates[component.id]?.isDraggingOver
            }"
            @dragover.prevent="handleSectionDragOver($event, component.id)"
            @dragleave="handleSectionDragLeave($event, component.id)"
            @drop="handleSectionDrop($event, component.id)"
            @dragenter.prevent="handleSectionDragEnter($event, component.id)"
          >
            <div v-if="component.props.children && component.props.children.length > 0" class="nested-components">
              <draggable
                v-model="component.props.children"
                group="form-components"
                item-key="id"
                handle=".drag-handle"
                ghost-class="ghost"
                animation="300"
                class="grid grid-cols-12 gap-x-2"
                @end="onNestedDragEnd"
                @add="onNestedComponentAdd"
              >
                <template #item="{ element: childElement, index: childIndex }">
                  <div 
                    class="form-component relative border rounded-md overflow-hidden transition-all duration-200 bg-white"
                    :class="'border-gray-200 hover:border-blue-300 hover:shadow-md'"
                    :style="{
                      gridColumn: childElement.props.gridColumn || 'span 6'
                    }"
                  >
                    <!-- Component actions -->
                    <div class="component-actions absolute right-1 top-1 flex space-x-1 z-10">
                      <button 
                        class="p-1 text-gray-400 hover:text-blue-600 rounded"
                        title="Component settings"
                        @click.stop="openNestedComponentSettings(childElement)"
                      >
                        <Icon name="heroicons:cog-6-tooth" class="w-3 h-3" />
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-gray-600 rounded"
                        title="Drag to reorder"
                      >
                        <span class="drag-handle cursor-move">
                          <Icon name="material-symbols:drag-indicator" class="w-3 h-3" />
                        </span>
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-red-500 rounded"
                        title="Remove from group"
                        @click.stop="removeFromSection(component.id, childIndex)"
                      >
                        <Icon name="material-symbols:close" class="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div class="p-2">
                      <component-preview 
                        :component="childElement" 
                        :is-preview="false" 
                        @form-data-updated="handleFormDataUpdate"
                        @open-modal="$emit('open-modal', $event)"
                        @close-modal="$emit('close-modal')"
                        @button-clicked="$emit('button-clicked', $event)"
                        @custom-action="$emit('custom-action', $event)"
                        @custom-navigation="$emit('custom-navigation', $event)"
                        @select-nested-component="$emit('select-nested-component', $event)"
                      />
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            
            <!-- Empty state -->
            <div v-else class="text-center py-8">
              <Icon name="material-symbols:add-circle-outline" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">Drag fields here to add them to this repeating group</p>
            </div>
          </div>

          <!-- Add Item button for preview -->
          <button type="button"
            class="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded text-sm">
            <Icon name="material-symbols:add-circle-outline" class="w-4 h-4 mr-1" />
            {{ component.props.buttonText || 'Add Item' }}
          </button>
        </div>

        <!-- Preview mode - show functional repeating groups -->
        <div v-else class="repeating-groups space-y-4">
          
          
          <!-- Group items -->
          <div v-for="(group, groupIndex) in (safeGetField(component.props.name, previewFormData, { warn: false }) || [])" 
               :key="`${component.props.name}-${groupIndex}`"
               class="group-item border border-gray-200 rounded-md p-3 bg-gray-50 mb-4">
            
            <!-- Item header -->
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-sm font-medium text-gray-700">Item {{ groupIndex + 1 }}</h4>
              <button v-if="(safeGetField(component.props.name, previewFormData, { warn: false }) || []).length > (component.props.minItems || 1)"
                      type="button" 
                      class="text-red-500 hover:text-red-700 text-sm"
                      @click="removeRepeatingGroupItem(component.props.name, groupIndex)">
                {{ component.props.removeText || 'Buang' }}
              </button>
            </div>
            
            <!-- Fields grid -->
            <div class="grid grid-cols-12 gap-x-2">
              <div v-for="(child, childIndex) in component.props.children" 
                   :key="`field-${groupIndex}-${childIndex}`"
                   class="form-component"
                   :style="{ gridColumn: child.props.gridColumn || 'span 6' }">
                
                <!-- Render FormKit field -->
                <FormKit 
                  :type="child.type"
                  :name="`${component.props.name}[${groupIndex}].${child.props.name}`"
                  :label="child.props.label"
                  :placeholder="child.props.placeholder"
                  :help="child.props.help"
                  :options="child.props.options"
                  :validation="child.props.validation"
                  :validation-visibility="isPreview ? 'blur' : 'blur'"
                  :readonly="child.props.readonly || !isPreview"
                  :disabled="!isPreview || (child.props.readonly && ['select', 'searchSelect', 'checkbox', 'radio', 'switch', 'quillEditor'].includes(child.type))"
                  :accept="child.props.accept || undefined"
                  :max="child.props.max || undefined"
                  :mask="child.props.mask || undefined"
                  :digits="child.props.digits || undefined"
                  :multiple="child.props.multiple || undefined"
                  :maxSize="child.props.maxSize || undefined"
                  :maxFiles="child.props.maxFiles || undefined"
                  :rows="child.type === 'textarea' ? (child.props.rows || 3) : undefined"
                  :model-value="getRepeatingGroupFieldValue(group, child.props.name, child.type)"
                  :class="{ 
                    'readonly-select': child.props.readonly && (child.type === 'select' || child.type === 'searchSelect'),
                    'readonly-quill': child.props.readonly && child.type === 'quillEditor',
                    'readonly-checkbox': child.props.readonly && child.type === 'checkbox',
                    'readonly-radio': child.props.readonly && child.type === 'radio',
                    'readonly-switch': child.props.readonly && child.type === 'switch',
                    'readonly-date': child.props.readonly && child.type === 'date',
                    'readonly-time': child.props.readonly && child.type === 'time',
                    'readonly-datetime': child.props.readonly && child.type === 'datetime-local'
                  }"
                  @update:model-value="updateRepeatingGroupField(component.props.name, groupIndex, child.props.name, $event)"
                />
              </div>
            </div>
          </div>
          
          <!-- Empty state -->
          <div v-if="(safeGetField(component.props.name, previewFormData, { warn: false }) || []).length === 0" 
               class="text-center py-8 text-gray-500">
            <p>No items yet. Click "{{ component.props.buttonText || 'Add Item' }}" to add the first item.</p>
          </div>
          
          <!-- Add button -->
          <button v-if="(safeGetField(component.props.name, previewFormData, { warn: false }) || []).length < (component.props.maxItems || 10)"
                  type="button"
                  class="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded text-sm"
                  @click="addRepeatingGroupItem(component.props.name, component.props.children)">
            <Icon name="material-symbols:add-circle-outline" class="w-4 h-4 mr-1" />
            {{ component.props.buttonText || 'Add Item' }}
          </button>
        </div>
      </fieldset>
    </div>

    <!-- Dynamic List Component -->
    <div v-else-if="component.type === 'dynamic-list'" class="pb-4">
      <div class="dynamic-list-container">
        <label v-if="component.props.label" class="block text-sm font-medium text-gray-700 mb-1">
          {{ component.props.label }}
          <span v-if="component.props.showItemCounter" class="text-xs text-gray-500 ml-2">
            ({{ (safeGetField(component.props.name, previewFormData, { warn: false }) || []).length }}/{{ component.props.maxItems || 20 }})
          </span>
        </label>

        <div v-if="component.props.help" class="mb-3 text-xs text-gray-500">
          {{ component.props.help }}
        </div>

        <!-- Search Box (if enabled) -->
        <div v-if="component.props.enableSearch" class="mb-3">
          <div class="relative">
            <input type="text" v-model="searchQuery[component.props.name]" placeholder="Search items..."
              class="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md text-sm" />
            <Icon name="material-symbols:search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <!-- Bulk Operations Toolbar (if enabled) -->
        <div v-if="component.props.bulkOperations && (safeGetField(component.props.name, previewFormData, { warn: false }) || []).length > 0"
          class="mb-3 flex items-center justify-between bg-gray-50 p-2 rounded">
          <div class="flex items-center space-x-2">
            <input type="checkbox" :checked="isAllSelected(component.props.name)"
              @change="toggleSelectAll(component.props.name)" class="h-4 w-4 rounded border-gray-300" />
            <span class="text-xs text-gray-600">
              {{ selectedItems[component.props.name]?.length || 0 }} selected
            </span>
          </div>
          <div class="flex space-x-2">
            <button v-if="(selectedItems[component.props.name]?.length || 0) > 0"
              @click="deleteSelectedItems(component.props.name)"
              class="text-xs text-red-600 hover:text-red-800 flex items-center">
              <Icon name="material-symbols:delete-outline" class="w-4 h-4 mr-1" />
              Delete Selected
            </button>
            <button v-if="component.props.importEnabled" @click="showImportModal(component.props.name)"
              class="text-xs text-blue-600 hover:text-blue-800 flex items-center">
              <Icon name="material-symbols:upload-file-outline" class="w-4 h-4 mr-1" />
              Import
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <div v-if="!isPreview" class="list-items space-y-2">
            <div v-for="(item, index) in component.props.defaultItems" :key="index" class="flex items-center">
              <input :type="component.props.itemType || 'text'" :value="item" :placeholder="component.props.placeholder"
                disabled
                class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 disabled:bg-gray-50" />
              <div v-if="component.props.enableSorting" class="ml-2 cursor-move text-gray-400">
                <Icon name="material-symbols:drag-indicator" class="w-5 h-5" />
              </div>
              <button type="button" class="ml-2 text-red-500 hover:text-red-700">
                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
              </button>
            </div>

            <!-- Add button for edit mode -->
            <button type="button"
              class="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded text-sm">
              <Icon name="material-symbols:add-circle-outline" class="w-4 h-4 mr-1" />
              {{ component.props.buttonText || 'Add Item' }}
            </button>
          </div>

          <div v-else class="list-items space-y-2">
            <div v-for="(item, index) in getFilteredItems(component.props.name)" :key="index"
              class="flex items-center group">
              <input v-if="component.props.bulkOperations" type="checkbox"
                :checked="isItemSelected(component.props.name, index)"
                @change="toggleItemSelection(component.props.name, index)"
                class="mr-2 h-4 w-4 rounded border-gray-300" />
              <input :type="component.props.itemType || 'text'" 
                :value="safeGetField(component.props.name, previewFormData, { warn: false })[index]"
                :placeholder="component.props.placeholder"
                :class="getItemInputClasses(component.props.name, index, item)"
                @blur="validateItem(component.props.name, index, item)"
                @input="updateListItem(component.props.name, index, $event.target.value)" />
              <div v-if="component.props.enableSorting"
                class="ml-2 cursor-move text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="material-symbols:drag-indicator" class="w-5 h-5" />
              </div>
              <button v-if="(safeGetField(component.props.name, previewFormData, { warn: false })?.length || 0) > (component.props.minItems || 0)"
                type="button" class="ml-2 text-red-500 hover:text-red-700" @click="removeListItem(index)">
                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
              </button>
            </div>

            <!-- Validation Messages -->
            <div v-if="validationErrors[component.props.name]" class="text-xs text-red-600 mt-1">
              {{ validationErrors[component.props.name] }}
            </div>

            <button v-if="(safeGetField(component.props.name, previewFormData, { warn: false })?.length || 0) < (component.props.maxItems || 20)"
              type="button"
              class="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded text-sm"
              @click="addListItem">
              <Icon name="material-symbols:add-circle-outline" class="w-4 h-4 mr-1" />
              {{ component.props.buttonText || 'Add Item' }}
            </button>

            <!-- Export Button (if enabled) -->
            <div v-if="component.props.exportFormat && (safeGetField(component.props.name, previewFormData, { warn: false }) || []).length > 0"
              class="mt-2">
              <button @click="exportItems(component.props.name, component.props.exportFormat)"
                class="text-xs text-green-600 hover:text-green-800 flex items-center">
                <Icon name="material-symbols:download" class="w-4 h-4 mr-1" />
                Export as {{ component.props.exportFormat.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- Repeating Table Component -->
    <div v-else-if="component.type === 'repeating-table'" class="repeating-table-wrapper">
      <div class="table-container-wrapper">
        <RepeatingTable
          :config="component.props"
          :model-value="getTableData(component.props.name)"
          :is-preview="isPreview"
          @update:model-value="updateTableData"
          @debug-data="() => {}"
          @mounted="() => {}"
          @custom-action="handleTableCustomAction"
          @custom-navigation="handleTableCustomNavigation"
        />
      </div>
    </div>

    <!-- Layout Grid Component -->
    <div v-else-if="component.type === 'layout-grid'" class="layout-grid-wrapper">
      <!-- Grid Label and Help Text -->
      <div v-if="component.props.label || component.props.help" class="mb-3">
        <label v-if="component.props.label" class="block text-sm font-medium text-gray-700 mb-1">
          {{ component.props.label }}
        </label>
        <p v-if="component.props.help" class="text-xs text-gray-500">
          {{ component.props.help }}
        </p>
      </div>
      
      <div class="layout-grid-container">
        <!-- Grid Container -->
        <div 
          class="grid-container"
          :class="{ 'is-preview': isPreview }"
          :style="getGridStyles(component.props)"
          @dragover.prevent="handleGridDragOver"
          @drop="handleGridDrop"
          @dragenter.prevent="handleGridDragEnter"
          @dragleave="handleGridDragLeave"
        >
          <!-- Grid Cells -->
          <div
            v-for="(cell, index) in component.props.cells"
            :key="`cell-${index}`"
            v-show="!isCellCovered(cell, component.props.cells)"
            class="grid-cell"
            :class="{
              'cell-empty': !cell.component,
              'cell-occupied': cell.component,
              'cell-highlighted': highlightedGridCell === index,
              'cell-drag-over': dragOverGridCell === index,
              'is-preview': isPreview
            }"
            :style="getCellStyles(cell)"
            @click="!isPreview ? selectGridCell(index) : null"
            v-on="getGridCellEvents(cell, index)"
          >
            <!-- Component Preview -->
            <div v-if="cell.component" class="component-preview">
              <!-- Component Actions (when not in preview) -->
              <div v-if="!isPreview" class="component-actions absolute right-1 top-1 flex space-x-1 z-10">
                <button 
                  class="p-1 text-gray-400 hover:text-blue-600 rounded"
                  title="Component settings"
                  @click.stop="openNestedComponentSettings(cell.component)"
                >
                  <Icon name="heroicons:cog-6-tooth" class="w-3 h-3" />
                </button>
                <button 
                  class="p-1 text-gray-400 hover:text-red-500 rounded"
                  title="Remove component"
                  @click.stop="removeGridComponent(component.id, index)"
                >
                  <Icon name="material-symbols:close" class="w-3 h-3" />
                </button>
              </div>
              
              <!-- Grid wrapper to apply component's gridColumn styling within the cell -->
              <div class="grid grid-cols-12 gap-x-2 h-full">
                <div 
                  class="component-grid-wrapper"
                  :style="{
                    gridColumn: cell.component.props?.gridColumn || 'span 12'
                  }"
                >
                  <component-preview 
                    :component="cell.component" 
                    :is-preview="isPreview"
                    @form-data-updated="handleFormDataUpdate"
                    @open-modal="$emit('open-modal', $event)"
                    @close-modal="$emit('close-modal')"
                    @button-clicked="$emit('button-clicked', $event)"
                    @custom-action="$emit('custom-action', $event)"
                    @custom-navigation="$emit('custom-navigation', $event)"
                    @select-nested-component="$emit('select-nested-component', $event)"
                  />
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!isPreview" class="cell-empty-state">
              <!-- Check if this grid cell can accept container components -->
              <div v-if="isContainerComponent({ component: props.component }) && getNestingDepth(props.component.id) >= 3" class="nesting-restricted-cell">
                <div class="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Icon name="material-symbols:block" class="w-8 h-8 text-red-300 mb-2" />
                  <span class="text-sm text-red-400 font-medium">Nesting Limit</span>
                  <span class="text-xs text-red-300 mt-1">Cannot add containers here</span>
                </div>
              </div>
              <div v-else class="normal-empty-cell">
                <div class="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Icon name="heroicons:plus-circle" class="w-8 h-8 text-gray-300 mb-2" />
                  <span class="text-sm text-gray-400 font-medium">Drop Component</span>
                  <span class="text-xs text-gray-300 mt-1">Drag any component here</span>
                </div>
              </div>
            </div>
            
            <!-- Empty cells in preview mode should be completely invisible -->
            <div v-else-if="isPreview && !cell.component" class="cell-empty-preview">
              <!-- Completely empty - no content -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Button Component -->
    <div v-else-if="component.type === 'button'" class="py-2 h-full">

      <!-- Button Container with Positioning -->
      <div class="flex h-full"
        :class="{
          'justify-start': component.props.position === 'left' || !component.props.position,
          'justify-center': component.props.position === 'center',
          'justify-end': component.props.position === 'right',
          'items-start': component.props.verticalAlign === 'top',
          'items-center': component.props.verticalAlign === 'center' || !component.props.verticalAlign,
          'items-end': component.props.verticalAlign === 'bottom' 
        }">
        
        <!-- Custom Button with Custom Colors -->
        <div v-if="component.props.variant === 'custom'" class="inline-block">
        <!-- Link Button with Custom Colors -->
        <a v-if="component.props.linkType && component.props.linkType !== 'none' && getButtonLink()" 
           :href="getButtonLink()" 
           :target="component.props.linkTarget || '_self'"
           class="inline-block">
          <button 
            :type="component.props.buttonType || 'button'"
            :disabled="component.props.disabled || false"
            :class="['button-component', 'custom-button', getButtonSizeClass(component.props.size), component.props.buttonType === 'submit' ? 'formkit-submit-button' : '']"
            :style="getCustomButtonStyles(component.props)"
            :data-hover-effect="component.props.customHoverEffect || 'none'"
            @click="handleButtonClickWrapper"
          >
            <span v-if="component.props.showButtonText !== false">{{ component.props.buttonText || component.props.label || 'Button' }}</span>
            <Icon v-if="component.props.icon" :name="component.props.icon" class="w-4 h-4" :class="{'ml-2': component.props.showButtonText !== false}" />
          </button>
        </a>

        <!-- Regular Button with Custom Colors (no link) -->
        <button 
          v-else
          :type="component.props.buttonType || 'button'"
          :disabled="component.props.disabled || false"
          :class="['button-component', 'custom-button', getButtonSizeClass(component.props.size), component.props.buttonType === 'submit' ? 'formkit-submit-button' : '']"
          :style="getCustomButtonStyles(component.props)"
          :data-hover-effect="component.props.customHoverEffect || 'none'"
          @click="handleButtonClickWrapper"
        >
          <span v-if="component.props.showButtonText !== false">{{ component.props.buttonText || component.props.label || 'Button' }}</span>
          <Icon v-if="component.props.icon" :name="component.props.icon" class="w-4 h-4" :class="{'ml-2': component.props.showButtonText !== false}" />
        </button>
      </div>

      <!-- Standard Button (non-custom colors) -->
      <div v-else class="inline-block">
        <!-- Link Button -->
        <a v-if="component.props.linkType && component.props.linkType !== 'none' && getButtonLink()" 
           :href="getButtonLink()" 
           :target="component.props.linkTarget || '_self'"
           class="inline-block">
          <RsButton :btnType="component.props.buttonType || 'button'" :variant="component.props.variant || 'primary'"
            :size="component.props.size || 'md'" :disabled="component.props.disabled || false"
            class="button-component">
            <span v-if="component.props.showButtonText !== false">{{ component.props.buttonText || component.props.label || 'Button' }}</span>
            <Icon v-if="component.props.icon" :name="component.props.icon" class="w-4 h-4" :class="{'ml-2': component.props.showButtonText !== false}" />
          </RsButton>
        </a>

        <!-- Regular Button (no link) -->
        <RsButton v-else :btnType="component.props.buttonType || 'button'" :variant="component.props.variant || 'primary'"
          :size="component.props.size || 'md'" :disabled="component.props.disabled || false" 
          :class="buttonClasses"
          @click="handleButtonClickWrapper"
        >
          <span v-if="component.props.showButtonText !== false">{{ component.props.buttonText || component.props.label || 'Button' }}</span>
          <Icon v-if="component.props.icon" :name="component.props.icon" class="w-4 h-4" :class="{'ml-2': component.props.showButtonText !== false}" />
        </RsButton>
      </div>
      
      </div> <!-- End of positioning container -->

      <div v-if="component.props.help" class="mt-1 text-xs text-gray-500">
        {{ component.props.help }}
      </div>
    </div>

    <!-- Form Section Component -->
    <div v-else-if="component.type === 'form-section'" class="pb-0">
      <div 
        class="form-section-container"
        :class="{
          'has-border': component.props.showBorder,
          'border-dashed': component.props.borderStyle === 'dashed',
          'border-dotted': component.props.borderStyle === 'dotted',
          'spacing-compact': component.props.spacing === 'compact',
          'spacing-relaxed': component.props.spacing === 'relaxed'
        }"
        :style="{
          backgroundColor: component.props.backgroundColor || '#ffffff',
          borderColor: component.props.showBorder ? '#e5e7eb' : 'transparent'
        }"
      >
        <!-- Section Header -->
        <div 
          v-if="component.props.showHeader"
          class="section-header"
          :class="{
            'header-small': component.props.headerSize === 'small',
            'header-large': component.props.headerSize === 'large',
            'collapsible': component.props.collapsible
          }"
          :style="{ backgroundColor: component.props.headerBackground || '#f9fafb' }"
          @click="component.props.collapsible && toggleSectionCollapse(component.id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <component
                :is="`h${component.props.headerLevel || 3}`"
                class="section-title"
                :style="{ textAlign: component.props.headerAlign || 'left' }"
              >
                {{ component.props.label || 'Section Title' }}
              </component>
              <p v-if="component.props.description" class="section-description">
                {{ component.props.description }}
              </p>
            </div>
            <div v-if="component.props.collapsible" class="collapse-icon">
              <Icon 
                :name="component.props.collapsed ? 'material-symbols:expand-more' : 'material-symbols:expand-less'" 
                class="w-5 h-5 text-gray-500"
              />
            </div>
          </div>
        </div>

        <!-- Section Content -->
        <div 
          v-if="!component.props.collapsed"
          class="section-content"
          :class="{
            'no-header': !component.props.showHeader
          }"
        >
          <!-- In preview mode, show only the nested components (no placeholder) -->
          <div v-if="isPreview" class="section-fields">
            <!-- Render nested components if they exist -->
            <div v-if="component.props.children && component.props.children.length > 0" class="grid grid-cols-12 gap-x-2 py-1">
              <template v-for="(childComponent, childIndex) in component.props.children" :key="`${component.id}-${childComponent.id || childIndex}`">
                <div 
                  class="form-component"
                  :style="{
                    gridColumn: childComponent.props.gridColumn || 'span 6'
                  }"
                >
                  <component-preview 
                    :component="childComponent" 
                    :is-preview="true" 
                    @form-data-updated="handleFormDataUpdate"
                    @open-modal="$emit('open-modal', $event)"
                    @close-modal="$emit('close-modal')"
                    @button-clicked="$emit('button-clicked', $event)"
                    @custom-action="$emit('custom-action', $event)"
                    @custom-navigation="$emit('custom-navigation', $event)"
                    @select-nested-component="$emit('select-nested-component', $event)"
                  />
                </div>
              </template>
            </div>
            <!-- Show subtle indication for empty sections in preview mode (optional) -->
            <div v-else-if="component.props.showEmptyMessage !== false" class="empty-section-preview">
              <p class="text-sm text-gray-400 text-center py-4">
                {{ component.props.emptyMessage || 'This section is empty' }}
              </p>
            </div>
          </div>
          
          <!-- In form builder mode, show drop zone -->
          <div v-else class="section-drop-zone">
            <!-- Nested components rendered in grid -->
            <div v-if="component.props.children && component.props.children.length > 0" class="nested-components">
              <draggable
                v-model="component.props.children"
                group="form-components"
                item-key="id"
                handle=".drag-handle"
                ghost-class="ghost"
                animation="300"
                class="grid grid-cols-12 gap-x-2"
                @end="onNestedDragEnd"
                @add="onNestedComponentAdd"
              >
                <template #item="{ element: childElement, index: childIndex }">
                  <div 
                    class="form-component relative border rounded-md overflow-hidden transition-all duration-200 bg-white"
                    :class="'border-gray-200 hover:border-blue-300 hover:shadow-md'"
                    :style="{
                      gridColumn: childElement.props.gridColumn || 'span 6'
                    }"
                  >
                    <!-- Component actions -->
                    <div class="component-actions absolute right-1 top-1 flex space-x-1 z-10">
                      <button 
                        class="p-1 text-gray-400 hover:text-blue-600 rounded"
                        title="Component settings"
                        @click.stop="openNestedComponentSettings(childElement)"
                      >
                        <Icon name="heroicons:cog-6-tooth" class="w-3 h-3" />
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-gray-600 rounded"
                        title="Drag to reorder"
                      >
                        <span class="drag-handle cursor-move">
                          <Icon name="material-symbols:drag-indicator" class="w-3 h-3" />
                        </span>
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-red-500 rounded"
                        title="Remove from section"
                        @click.stop="removeFromSection(component.id, childIndex)"
                      >
                        <Icon name="material-symbols:close" class="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div class="p-2">
                      <component-preview 
                        :component="childElement" 
                        :is-preview="false" 
                        @form-data-updated="handleFormDataUpdate"
                        @open-modal="$emit('open-modal', $event)"
                        @close-modal="$emit('close-modal')"
                        @button-clicked="$emit('button-clicked', $event)"
                        @custom-action="$emit('custom-action', $event)"
                        @custom-navigation="$emit('custom-navigation', $event)"
                        @select-nested-component="$emit('select-nested-component', $event)"
                      />
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            
            <!-- Drop zone placeholder -->
            <div 
              class="section-drop-placeholder"
              :class="{
                'drop-active': sectionDropStates[component.id]?.isDraggingOver,
                'cannot-accept': sectionDropStates[component.id]?.cannotAccept,
                'empty': !component.props.children || component.props.children.length === 0,
                'hidden-placeholder': component.props.showPlaceholder === false
              }"
              @dragover.prevent="handleSectionDragOver($event, component.id)"
              @dragleave="handleSectionDragLeave($event, component.id)"
              @drop="handleSectionDrop($event, component.id)"
              @dragenter.prevent="handleSectionDragEnter($event, component.id)"
            >
              <div v-if="component.props.showPlaceholder !== false" class="placeholder-content">
                <!-- Show different content based on nesting restriction -->
                <div v-if="sectionDropStates[component.id]?.cannotAccept" class="nesting-restricted">
                  <Icon name="material-symbols:block" class="w-8 h-8 text-red-300 mx-auto mb-2" />
                  <p class="text-sm text-red-500 text-center mb-1">Nesting Limit Reached</p>
                  <p class="text-xs text-red-400 text-center">
                    This container cannot accept more components
                  </p>
                </div>
                <div v-else class="normal-placeholder">
                  <Icon name="material-symbols:add-box-outline" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p class="text-sm text-gray-500 text-center mb-1">Drop Components Here</p>
                  <p class="text-xs text-gray-400 text-center">
                    Drag form fields from the sidebar to add them to this section
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Container Component -->
    <div v-else-if="component.type === 'tab-container'" class="pb-0">
      <div class="tab-container-wrapper">
        <!-- Component Label and Help Text -->
        <div v-if="component.props.label || component.props.help" class="mb-3">
          <label v-if="component.props.label" class="block text-lg font-semibold text-gray-800 leading-tight">
            {{ component.props.label }}
          </label>
          <p v-if="component.props.help" class="text-sm text-gray-600 break-words leading-relaxed">
            {{ component.props.help }}
          </p>
        </div>

        <div 
          class="tab-container"
          :class="{
            'tabs-top': component.props.tabPosition === 'top',
            'tabs-bottom': component.props.tabPosition === 'bottom',
            'tabs-left': component.props.tabPosition === 'left',
            'tabs-right': component.props.tabPosition === 'right'
          }"
        >
          <!-- Tab Headers -->
          <div 
            class="tab-headers"
            :class="{
              'flex': component.props.tabPosition === 'top' || component.props.tabPosition === 'bottom',
              'flex flex-col w-48': component.props.tabPosition === 'left' || component.props.tabPosition === 'right',
              'border-b border-gray-200': component.props.showBorder !== false && component.props.tabPosition === 'top',
              'border-t border-gray-200 order-2': component.props.showBorder !== false && component.props.tabPosition === 'bottom',
              'border-r border-gray-200': component.props.showBorder !== false && component.props.tabPosition === 'left',
              'border-l border-gray-200 order-2': component.props.showBorder !== false && component.props.tabPosition === 'right',
              'mb-4': component.props.showBorder === false && (component.props.tabPosition === 'top' || component.props.tabPosition === 'bottom'),
              'mr-4': component.props.showBorder === false && component.props.tabPosition === 'left',
              'ml-4 order-2': component.props.showBorder === false && component.props.tabPosition === 'right'
            }"
          >
            <button
              v-for="(tab, tabIndex) in component.props.tabs"
              :key="`${component.id}-${tab.id}`"
              type="button"
              class="tab-header"
:class="{
                'active': tab.active,
                // With Border Styles
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors': component.props.showBorder !== false && (component.props.tabPosition === 'top' || component.props.tabPosition === 'bottom'),
                'px-3 py-2 text-sm font-medium border-r-2 transition-colors text-left': component.props.showBorder !== false && component.props.tabPosition === 'left',
                'px-3 py-2 text-sm font-medium border-l-2 transition-colors text-left': component.props.showBorder !== false && component.props.tabPosition === 'right',
                'border-blue-500 text-blue-600': tab.active && component.props.showBorder !== false && (component.props.tabStyle === 'default' || !component.props.tabStyle),
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !tab.active && component.props.showBorder !== false && (component.props.tabStyle === 'default' || !component.props.tabStyle),
                'bg-blue-100 text-blue-600 rounded-t': tab.active && component.props.showBorder !== false && component.props.tabStyle === 'pills',
                'text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t': !tab.active && component.props.showBorder !== false && component.props.tabStyle === 'pills',
                'border-b-2 border-blue-500 text-blue-600': tab.active && component.props.showBorder !== false && component.props.tabStyle === 'underline',
                'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !tab.active && component.props.showBorder !== false && component.props.tabStyle === 'underline',
                // Minimal Design Styles
                'px-0 py-2 mr-6 text-sm font-medium transition-colors': component.props.showBorder === false && (component.props.tabPosition === 'top' || component.props.tabPosition === 'bottom'),
                'px-0 py-2 mb-2 text-sm font-medium transition-colors text-left': component.props.showBorder === false && (component.props.tabPosition === 'left' || component.props.tabPosition === 'right'),
                'text-blue-600 border-b-2 border-blue-500': tab.active && component.props.showBorder === false,
                'text-gray-500 hover:text-gray-700': !tab.active && component.props.showBorder === false
              }"
              @click="setActiveTab(component, tab.id)"
            >
              {{ tab.label }}
              <!-- Remove tab button (only in builder mode) -->
              <button
                v-if="!isPreview && component.props.tabs.length > component.props.minTabs"
                type="button"
                class="ml-2 text-red-400 hover:text-red-600"
                @click.stop="removeTab(component, tabIndex)"
              >
                <Icon name="material-symbols:close" class="w-3 h-3" />
              </button>
            </button>

            <!-- Add tab button (only in builder mode) -->
            <button
              v-if="!isPreview && component.props.showAddButton && component.props.tabs.length < component.props.maxTabs"
              type="button"
              class="tab-add-button px-3 py-2 text-sm text-gray-400 hover:text-gray-600 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              @click="addNewTab(component)"
            >
              <Icon name="material-symbols:add" class="w-4 h-4" />
              <span class="ml-1">Add Tab</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div 
            class="tab-content"
            :class="{
              'flex-1': true,
              'p-4': component.props.showBorder !== false,
              'pt-0': component.props.showBorder === false,
              'border border-gray-200 rounded-b': component.props.showBorder !== false && component.props.tabPosition === 'top',
              'border border-gray-200 rounded-t': component.props.showBorder !== false && component.props.tabPosition === 'bottom',
              'border border-gray-200 rounded-r': component.props.showBorder !== false && component.props.tabPosition === 'left',
              'border border-gray-200 rounded-l': component.props.showBorder !== false && component.props.tabPosition === 'right'
            }"
          >
            <!-- Active tab content -->
            <div v-for="tab in component.props.tabs" :key="`${component.id}-${tab.id}`" v-show="tab.active">
              <!-- In preview mode, show only the nested components -->
              <div v-if="isPreview" class="tab-fields">
                <div v-if="tab.children && tab.children.length > 0" class="grid grid-cols-12 gap-x-2">
                  <template v-for="(childComponent, childIndex) in tab.children" :key="`${component.id}-${tab.id}-${childComponent.id || childIndex}`">
                    <div 
                      class="form-component"
                      :style="{
                        gridColumn: childComponent.props.gridColumn || 'span 6'
                      }"
                    >
                      <component-preview 
                        :component="childComponent" 
                        :is-preview="true" 
                        @form-data-updated="handleFormDataUpdate"
                        @open-modal="$emit('open-modal', $event)"
                        @close-modal="$emit('close-modal')"
                        @button-clicked="$emit('button-clicked', $event)"
                        @custom-action="$emit('custom-action', $event)"
                        @custom-navigation="$emit('custom-navigation', $event)"
                        @select-nested-component="$emit('select-nested-component', $event)"
                      />
                    </div>
                  </template>
                </div>
                <!-- Show empty message for empty tabs in preview -->
                <div v-else class="empty-tab-preview text-center py-8 text-gray-400">
                  <Icon name="material-symbols:tab" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p class="text-sm">This tab is empty</p>
                </div>
              </div>

              <!-- In builder mode, show drop zone -->
              <div v-else class="tab-drop-zone">
                <!-- Nested components rendered in grid -->
                <div v-if="tab.children && tab.children.length > 0" class="nested-components">
                  <draggable
                    v-model="tab.children"
                    group="form-components"
                    item-key="id"
                    handle=".drag-handle"
                    ghost-class="ghost"
                    animation="300"
                    class="grid grid-cols-12 gap-x-2"
                    @add="onTabComponentAdd(component, tab.id)"
                  >
                    <template #item="{ element: childElement, index: childIndex }">
                      <div 
                        class="form-component relative border rounded-md overflow-hidden transition-all duration-200 bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                        :style="{
                          gridColumn: childElement.props.gridColumn || 'span 6'
                        }"
                      >
                        <!-- Component actions -->
                        <div class="component-actions absolute right-1 top-1 flex space-x-1 z-10">
                          <button 
                            class="p-1 text-gray-400 hover:text-blue-600 rounded"
                            title="Component settings"
                            @click.stop="openNestedComponentSettings(childElement)"
                          >
                            <Icon name="heroicons:cog-6-tooth" class="w-3 h-3" />
                          </button>
                          <button 
                            class="p-1 text-gray-400 hover:text-gray-600 rounded"
                            title="Drag to reorder"
                          >
                            <span class="drag-handle cursor-move">
                              <Icon name="material-symbols:drag-indicator" class="w-3 h-3" />
                            </span>
                          </button>
                          <button 
                            class="p-1 text-gray-400 hover:text-red-500 rounded"
                            title="Remove from tab"
                            @click.stop="removeFromTab(component, tab.id, childIndex)"
                          >
                            <Icon name="material-symbols:close" class="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div class="p-2">
                          <component-preview 
                            :component="childElement" 
                            :is-preview="false" 
                            @form-data-updated="handleFormDataUpdate"
                            @open-modal="$emit('open-modal', $event)"
                            @close-modal="$emit('close-modal')"
                            @button-clicked="$emit('button-clicked', $event)"
                            @custom-action="$emit('custom-action', $event)"
                            @custom-navigation="$emit('custom-navigation', $event)"
                            @select-nested-component="$emit('select-nested-component', $event)"
                          />
                        </div>
                      </div>
                    </template>
                  </draggable>
                </div>
                
                <!-- Drop zone placeholder -->
                <div 
                  class="tab-drop-placeholder"
                  :class="{
                    'drop-active': tabDropStates[`${component.id}-${tab.id}`]?.isDraggingOver,
                    'cannot-accept': tabDropStates[`${component.id}-${tab.id}`]?.cannotAccept,
                    'empty': !tab.children || tab.children.length === 0
                  }"
                  @dragover.prevent="handleTabDragOver($event, component.id, tab.id)"
                  @dragleave="handleTabDragLeave($event, component.id, tab.id)"
                  @drop="handleTabDrop($event, component.id, tab.id)"
                  @dragenter.prevent="handleTabDragEnter($event, component.id, tab.id)"
                >
                  <div class="placeholder-content">
                    <!-- Show different content based on nesting restriction -->
                    <div v-if="tabDropStates[`${component.id}-${tab.id}`]?.cannotAccept" class="nesting-restricted text-center py-8">
                      <Icon name="material-symbols:block" class="w-8 h-8 text-red-300 mx-auto mb-2" />
                      <p class="text-sm text-red-500 text-center mb-1">Nesting Limit Reached</p>
                      <p class="text-xs text-red-400 text-center">
                        This tab cannot accept more components
                      </p>
                    </div>
                    <div v-else class="normal-placeholder text-center py-8">
                      <Icon name="material-symbols:add-box-outline" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p class="text-sm text-gray-500 mb-1">Drop Components Here</p>
                      <p class="text-xs text-gray-400">
                        Drag form fields from the sidebar to add them to this tab
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom HTML Component -->
    <div v-else-if="component.type === 'customHtml'" class="py-2">
      <div class="custom-html-wrapper">
        <!-- Component Label -->
        <div v-if="component.props.label && component.props.label !== 'Custom HTML Component'" class="mb-2">
          <label class="text-sm font-medium text-gray-700">{{ component.props.label }}</label>
        </div>
        
        <!-- Help Text -->
        <div v-if="component.props.help" class="mb-2 text-xs text-gray-600">
          {{ component.props.help }}
        </div>
        
        <!-- Custom HTML Content Container -->
        <div 
          :id="`custom-html-${component.id}`"
          class="custom-html-content"
          :class="{
            'readonly-mode': component.props.readonly || !isPreview,
            'safe-mode': component.props.previewMode === 'safe',
            'advanced-mode': component.props.previewMode === 'advanced'
          }"
        >
          <!-- Inject scoped CSS -->
          <div v-if="getScopedCss(component)" v-html="getScopedCss(component)"></div>
          
          <!-- Render HTML content -->
          <div v-html="getSafeHtmlContent(component)"></div>
        </div>
      </div>
    </div>

    <!-- Unknown Component Type Fallback -->
    <div v-else class="p-4 border border-dashed border-gray-300 rounded">
      <div class="text-gray-500">Unknown component type: {{ component.type }}</div>
    </div>
  </div>

  <!-- Nested Component Settings Modal -->
  <FormBuilderFieldSettingsModal
    v-model="showNestedSettingsModal"
    :component="selectedNestedComponent"
    @close="closeNestedSettingsModal"
    @update-component="saveNestedComponentSettings"
  />
</template>

<script setup>
import { useNuxtApp } from '#app';
import { useFormBuilderStore } from '~/stores/formBuilder';
import FormBuilderFieldSettingsModal from '~/components/FormBuilderFieldSettingsModal.vue';

import { safeGetField } from '~/composables/safeGetField';
import { onMounted, onUnmounted, watch, computed, nextTick, triggerRef, defineComponent, h } from 'vue';
import draggable from 'vuedraggable';

// RepeatingGroupContainer component removed - using template approach instead

const props = defineProps({
  component: {
    type: Object,
    required: true
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  fieldStates: {
    type: Object,
    default: () => ({})
  },
  modalInputData: {
    type: Object,
    default: () => ({})
  },
  resizeMode: {
    type: Boolean,
    default: false
  },
  selectedComponentId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select-nested-component', 'form-data-updated', 'button-clicked', 'custom-action', 'custom-navigation', 'open-modal', 'close-modal', 'update-nested-component']);

// Get access to the form builder store
const formStore = useFormBuilderStore();
const previewFormData = computed(() => formStore.previewFormData || {});

// Clean up: Debug watcher removed - repeating groups working correctly

// Enhanced dynamic list functionality
const searchQuery = ref({});
const selectedItems = ref({});
const validationErrors = ref({});

// Force reactivity for repeating groups
const groupUpdateCounter = ref(0);

// Simplified reactive variables
const isInRepeatingGroup = ref(false);
const repeatingGroupContext = ref(null);

// New reactive state for form sections
const sectionDropStates = ref({});

// Grid state for layout grid
const highlightedGridCell = ref(null)
const dragOverGridCell = ref(null)
const selectedGridCell = ref(null)
// Tab container state
const tabDropStates = ref({})

// State for nested component settings modal
const showNestedSettingsModal = ref(false);
const selectedNestedComponent = ref(null);

// Track selected component ID for highlighting
const selectedComponentId = ref(null);

// Component visibility management
const hiddenComponents = ref(new Set())

// Computed property to check if current component should be visible
const isCurrentComponentVisible = computed(() => {
  if (!props.component?.id) return true
  return isComponentVisible(props.component.id)
})

// Track timers and DOM elements for cleanup
let lightbox = null;
let importInput = null;
let timers = [];

onUnmounted(() => {
  // Clean up any lightbox DOM element
  if (lightbox && document.body.contains(lightbox)) {
    document.body.removeChild(lightbox);
    lightbox = null;
  }
  // Clean up import input
  if (importInput && document.body.contains(importInput)) {
    document.body.removeChild(importInput);
    importInput = null;
  }
  // Clear all timers
  timers.forEach(t => clearTimeout(t));
  timers = [];
});

// Initialize data for components
onMounted(() => {
  // Initialize default values for standard input fields
  if (isInputType.value && props.component.props.name && props.isPreview) {
    const fieldName = props.component.props.name;
    const currentValue = safeGetField(fieldName, formStore.previewFormData, { warn: false });
    
    // If field doesn't have a value yet and has a defaultValue, set it
    if ((currentValue === undefined || currentValue === null || currentValue === '') && 
        props.component.props.defaultValue !== undefined && 
        props.component.props.defaultValue !== null) {
      nextTick(() => {
        const updatedData = { ...formStore.previewFormData, [fieldName]: props.component.props.defaultValue };
        formStore.updatePreviewFormData(updatedData);
      });
    }
  }
  
  // Initialize search and selection data for dynamic lists
  if (props.component.type === 'dynamic-list') {
    const listName = props.component.props.name;
    if (listName) {
      searchQuery.value[listName] = '';
      selectedItems.value[listName] = [];
      validationErrors.value[listName] = '';
      
      // Initialize form data with default items if they exist and form data is empty
      const currentFormData = safeGetField(listName, formStore.previewFormData, { warn: false });
      const defaultItems = props.component.props.defaultItems;
      
      if ((!currentFormData || currentFormData.length === 0) && defaultItems && defaultItems.length > 0) {
        nextTick(() => {
          const updatedData = { ...formStore.previewFormData, [listName]: [...defaultItems] };
          formStore.updatePreviewFormData(updatedData);
        });
      }
    }
  }
  
  // Initialize repeating groups
  if (props.component.type === 'repeating-group') {
    const groupName = props.component.props.name;
    if (groupName) {
      // Get current groups or initialize empty array
      const currentGroups = safeGetField(groupName, formStore.previewFormData, { warn: false });
      
      // If no groups exist and minItems is specified, create initial groups
      if ((!currentGroups || currentGroups.length === 0) && props.component.props.minItems > 0) {
        const initialGroups = [];
        const minItems = props.component.props.minItems || 1;
        
        for (let i = 0; i < minItems; i++) {
          const newGroup = {};
          
          // Add fields from configuration (legacy)
          if (props.component.props.fields) {
            props.component.props.fields.forEach(field => {
              newGroup[field.name] = '';
            });
          }
          
          // Add fields from children components (form builder format)
          if (props.component.props.children) {
            const extractFieldsFromComponent = (comp) => {
              if (!comp) return;
              
              // If this component has a name, add it to the group
              if (comp.props && comp.props.name) {
                newGroup[comp.props.name] = getDefaultValueForType(comp.type, comp);
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
            
            props.component.props.children.forEach(child => {
              extractFieldsFromComponent(child);
            });
          }
          
          initialGroups.push(newGroup);
        }
        
        nextTick(() => {
          const updatedData = { ...formStore.previewFormData, [groupName]: initialGroups };
          formStore.updatePreviewFormData(updatedData);
        });
      }
    }
  }
  
  // Initialize repeating tables
  if (props.component.type === 'repeating-table') {
    const tableName = props.component.props.name;
    
    if (tableName) {
      // Get current table data or initialize empty array
      const currentData = safeGetField(tableName, formStore.previewFormData, { warn: false });
      
      // If no data exists, initialize it
      if (!currentData || !Array.isArray(currentData)) {
        const initialData = Array.isArray(props.component.props.defaultData) ? [...props.component.props.defaultData] : [];
        
        nextTick(() => {
          const updatedData = { ...formStore.previewFormData, [tableName]: initialData };
          formStore.updatePreviewFormData(updatedData);
        });
      }
    }
  }
});

// Watch for changes to component props, especially defaultItems
watch(() => props.component.props.defaultItems, (newDefaultItems, oldDefaultItems) => {
  if (props.component.type === 'dynamic-list') {
    const listName = props.component.props.name;
    if (!listName) return;
    
    // Check if defaultItems actually changed to prevent unnecessary updates
    const newItemsStr = JSON.stringify(newDefaultItems);
    const oldItemsStr = JSON.stringify(oldDefaultItems);
    
    if (newItemsStr === oldItemsStr) return;
    
    // Always update when defaultItems change, regardless of current form data
    const items = newDefaultItems || [];
    
    nextTick(() => {
      const updatedData = { ...formStore.previewFormData, [listName]: [...items] };
      formStore.updatePreviewFormData(updatedData);
    });
  }
}, { deep: true, immediate: true });

// Watch for changes to repeating group props
watch(() => props.component.props.minItems, (newMinItems, oldMinItems) => {
  if (props.component.type === 'repeating-group') {
    const groupName = props.component.props.name;
    if (!groupName || newMinItems === oldMinItems) return;
    
    const currentGroups = safeGetField(groupName, formStore.previewFormData, { warn: false });
    const minItems = newMinItems || 1;
    
    // If current groups are fewer than minItems, add missing groups
    if ((!currentGroups || currentGroups.length < minItems) && minItems > 0) {
      const groupsToAdd = minItems - (currentGroups?.length || 0);
      const updatedGroups = [...(currentGroups || [])];
      
      for (let i = 0; i < groupsToAdd; i++) {
        const newGroup = {};
        
        // Add fields from configuration (legacy)
        if (props.component.props.fields) {
          props.component.props.fields.forEach(field => {
            newGroup[field.name] = '';
          });
        }
        
        // Add fields from children components (form builder format)
        if (props.component.props.children) {
          const extractFieldsFromComponent = (comp) => {
            if (!comp) return;
            
            // If this component has a name, add it to the group
            if (comp.props && comp.props.name) {
              newGroup[comp.props.name] = getDefaultValueForType(comp.type, comp);
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
          
          props.component.props.children.forEach(child => {
            extractFieldsFromComponent(child);
          });
        }
        
        updatedGroups.push(newGroup);
      }
      
      nextTick(() => {
        const updatedData = { ...formStore.previewFormData, [groupName]: updatedGroups };
        formStore.updatePreviewFormData(updatedData);
      });
    }
  }
}, { deep: true, immediate: true });

// Watch for changes to defaultData in repeating-table components
watch(() => props.component.props.defaultData, (newDefaultData) => {
  if (props.component.type === 'repeating-table') {
    const tableName = props.component.props.name;
    
    if (!tableName) return;
    
    // Always update if we have new defaultData, regardless of whether it appears the same
    // The issue is that when saving from the modal, the old and new data might be the same proxy reference
    // but we still want to load it into the table if the table is currently empty or has different data
    const currentTableData = safeGetField(tableName, formStore.previewFormData, { warn: false }) || [];
    const currentTableDataStr = JSON.stringify(currentTableData);
    const newDataStr = JSON.stringify(newDefaultData);
    
    // Only skip if the table already has the exact same data as the new defaultData
    if (currentTableDataStr === newDataStr && Array.isArray(newDefaultData) && newDefaultData.length > 0) {
      return;
    }
    
    // Automatically load the new sample data into the table
    if (Array.isArray(newDefaultData) && newDefaultData.length > 0) {
      const updatedData = { ...formStore.previewFormData, [tableName]: [...newDefaultData] };
      formStore.updatePreviewFormData(updatedData);
    } else if (!newDefaultData || (Array.isArray(newDefaultData) && newDefaultData.length === 0)) {
      // Clear table data if no sample data
      const updatedData = { ...formStore.previewFormData, [tableName]: [] };
      formStore.updatePreviewFormData(updatedData);
    }
  }
}, { deep: true, immediate: true });

// Legacy updateGroupField removed - now handled by RepeatingGroupContainer

const updateListItem = (listName, index, newValue) => {
  if (!props.isPreview) return;

  const currentItems = [...(safeGetField(listName, formStore.previewFormData, { warn: false }) || [])];
  if (currentItems[index] === newValue) return; // No change

  // Validate and handle duplicates
  if (!checkDuplicates(listName, newValue, index)) return;
  if (!validateItem(listName, index, newValue)) return;

  currentItems[index] = newValue;

  // Update form data and emit immediately
  const updatedData = { ...formStore.previewFormData, [listName]: currentItems };
  formStore.updatePreviewFormData(updatedData);
  emit('form-data-updated', updatedData);
};

// Legacy functions removed - now handled by RepeatingGroupContainer

const addListItem = () => {
  if (!props.isPreview) return;

  const listName = props.component.props.name;
  if (!listName) return;

  // Get current items or initialize empty array
  const currentItems = [...(safeGetField(listName, formStore.previewFormData, { warn: false }) || [])];

  // Add an empty item
  currentItems.push('');

  // Update the form data
  const updatedData = { ...formStore.previewFormData, [listName]: currentItems };
  formStore.updatePreviewFormData(updatedData);
  emit('form-data-updated', updatedData);
};

const removeListItem = (index) => {
  if (!props.isPreview) return;

  const listName = props.component.props.name;
  if (!listName) return;

  // Get current items
  const currentItems = [...(safeGetField(listName, formStore.previewFormData, { warn: false }) || [])];

  // Remove the item at the specified index
  currentItems.splice(index, 1);

  // Update the form data
  const updatedData = { ...formStore.previewFormData, [listName]: currentItems };
  formStore.updatePreviewFormData(updatedData);
  emit('form-data-updated', updatedData);
};

// Enhanced Dynamic List Methods

// Validate individual item based on component settings
const validateItem = (listName, index, value) => {
  const component = props.component;
  if (!component.props.itemValidation) return true;

  // Simple validation for now - can be enhanced with more complex rules
  const rules = component.props.itemValidation.split('|');

  for (const rule of rules) {
    if (rule === 'required' && (!value || value.trim() === '')) {
      validationErrors.value[listName] = `Item ${index + 1} is required`;
      return false;
    }

    if (rule.startsWith('min:')) {
      const minLength = parseInt(rule.split(':')[1]);
      if (value.length < minLength) {
        validationErrors.value[listName] = `Item ${index + 1} must be at least ${minLength} characters`;
        return false;
      }
    }

    if (rule.startsWith('max:')) {
      const maxLength = parseInt(rule.split(':')[1]);
      if (value.length > maxLength) {
        validationErrors.value[listName] = `Item ${index + 1} cannot exceed ${maxLength} characters`;
        return false;
      }
    }

    if (rule === 'email' && component.props.itemType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        validationErrors.value[listName] = `Item ${index + 1} must be a valid email address`;
        return false;
      }
    }

    if (rule === 'url' && component.props.itemType === 'url') {
      try {
        new URL(value);
      } catch {
        validationErrors.value[listName] = `Item ${index + 1} must be a valid URL`;
        return false;
      }
    }
  }

  // Clear validation error if validation passes
  validationErrors.value[listName] = '';
  return true;
};

// Check for duplicate items
const checkDuplicates = (listName, newValue, currentIndex) => {
  if (props.component.props.allowDuplicates) return true;

  const currentItems = safeGetField(listName, formStore.previewFormData, { warn: false }) || [];
  const duplicateIndex = currentItems.findIndex((item, index) =>
    index !== currentIndex && item.toLowerCase() === newValue.toLowerCase()
  );

  if (duplicateIndex !== -1) {
    validationErrors.value[listName] = `Duplicate item detected. Item "${newValue}" already exists.`;
    return false;
  }

  validationErrors.value[listName] = '';
  return true;
};

// Handle item input with validation
const handleItemInput = (listName, index, value) => {
  // Check for duplicates if not allowed
  if (!checkDuplicates(listName, value, index)) {
    return;
  }

  // Validate the item
  validateItem(listName, index, value);
};

// Get CSS classes for item input based on validation state
const getItemInputClasses = (listName, index, value) => {
  const baseClasses = "block w-full border rounded-md shadow-sm py-2 px-3 text-gray-700";
  const hasError = validationErrors.value[listName];

  if (hasError) {
    return `${baseClasses} border-red-300 focus:border-red-500`;
  }

  return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
};

// Filter items based on search query
const getFilteredItems = (listName) => {
  const items = safeGetField(listName, formStore.previewFormData, { warn: false }) || [];
  const query = searchQuery.value[listName];

  if (!query || !props.component.props.enableSearch) {
    return items;
  }

  return items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
};

// Bulk operations
const isItemSelected = (listName, index) => {
  return selectedItems.value[listName]?.includes(index) || false;
};

const toggleItemSelection = (listName, index) => {
  if (!selectedItems.value[listName]) {
    selectedItems.value[listName] = [];
  }

  const selectedList = selectedItems.value[listName];
  const selectedIndex = selectedList.indexOf(index);

  if (selectedIndex > -1) {
    selectedList.splice(selectedIndex, 1);
  } else {
    selectedList.push(index);
  }
};

const isAllSelected = (listName) => {
  const items = safeGetField(listName, formStore.previewFormData, { warn: false }) || [];
  const selected = selectedItems.value[listName] || [];
  return items.length > 0 && selected.length === items.length;
};

const toggleSelectAll = (listName) => {
  const items = safeGetField(listName, formStore.previewFormData, { warn: false }) || [];

  if (isAllSelected(listName)) {
    selectedItems.value[listName] = [];
  } else {
    selectedItems.value[listName] = items.map((_, index) => index);
  }
};

const deleteSelectedItems = (listName) => {
  if (!props.component.props.confirmDelete || confirm('Are you sure you want to delete the selected items?')) {
    const currentItems = [...(safeGetField(listName, formStore.previewFormData, { warn: false }) || [])];
    const selected = selectedItems.value[listName] || [];

    // Sort indices in descending order to avoid index shifting issues
    selected.sort((a, b) => b - a);

    // Remove selected items
    selected.forEach(index => {
      currentItems.splice(index, 1);
    });

    // Update form data
    const updatedData = { ...formStore.previewFormData, [listName]: currentItems };
    formStore.updatePreviewFormData(updatedData);

    // Clear selection
    selectedItems.value[listName] = [];
  }
};

// Import/Export functionality
const exportItems = (listName, format) => {
  const items = safeGetField(listName, formStore.previewFormData, { warn: false }) || [];
  let content = '';
  let filename = `${listName}_items`;
  let mimeType = 'text/plain';

  switch (format) {
    case 'json':
      content = JSON.stringify(items, null, 2);
      filename += '.json';
      mimeType = 'application/json';
      break;
    case 'csv':
      content = items.map(item => `"${item}"`).join('\n');
      filename += '.csv';
      mimeType = 'text/csv';
      break;
    default: // txt
      content = items.join('\n');
      filename += '.txt';
      break;
  }

  // Create and trigger download
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const showImportModal = (listName) => {
  importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.accept = '.txt,.csv,.json';
  importInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let importedItems = [];
        try {
          const content = e.target.result;
          if (file.name.endsWith('.json')) {
            importedItems = JSON.parse(content);
          } else if (file.name.endsWith('.csv')) {
            importedItems = content.split('\n').map(line => line.replace(/"/g, '').trim()).filter(Boolean);
          } else {
            importedItems = content.split('\n').filter(Boolean);
          }
          const currentItems = [...(safeGetField(listName, formStore.previewFormData, { warn: false }) || [])];
          const newItems = [...currentItems, ...importedItems];
          const maxItems = props.component.props.maxItems || 20;
          if (newItems.length > maxItems) {
            newItems.splice(maxItems);
            alert(`Import limited to ${maxItems} items total.`);
          }
          const updatedData = { ...formStore.previewFormData, [listName]: newItems };
          formStore.updatePreviewFormData(updatedData);
        } catch (error) {
          alert('Error importing file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };
  importInput.click();
};

// Handle button click wrapper with debugging
const handleButtonClickWrapper = () => {
  
  const isSubmitButton = props.component.props.buttonType === 'submit';
  const isModalAction = props.component.props.action === 'open-modal' || props.component.props.action === 'close-modal';
  
  
  if (isSubmitButton && !isModalAction) {
    // console.log('❌ Click blocked - submit button without modal action');
    return;
  }
  
  // console.log('✅ Executing handleButtonClick');
  handleButtonClick();
};

// Handle button click
const handleButtonClick = () => {
  if (!props.isPreview) return;

  // Handle button actions
  const action = props.component.props.action;
  
  if (action === 'open-modal' && props.component.props.targetModal) {
    // Emit modal open event
    emit('open-modal', props.component.props.targetModal);
  } else if (action === 'close-modal') {
    // Emit modal close event
    emit('close-modal');
  } else if (action === 'hide-components' && props.component.props.targetComponents) {
    // Handle component visibility - hide components
    handleVisibilityAction('hide', props.component.props.targetComponents);
  } else if (action === 'show-components' && props.component.props.targetComponents) {
    // Handle component visibility - show components
    handleVisibilityAction('show', props.component.props.targetComponents);
  } else if (action === 'toggle-components' && props.component.props.targetComponents) {
    // Handle component visibility - toggle components
    handleVisibilityAction('toggle', props.component.props.targetComponents);
  } else if (action === 'custom' || props.component.props.onClick) {
    // Execute custom onClick code if provided
    try {
      // Create a safe execution context
      const context = {
        formData: formStore.previewFormData,
        componentName: props.component.props.name,
        buttonLabel: props.component.props.label
      };

      // Execute the custom code
      const func = new Function('context', props.component.props.onClick);
      func(context);
    } catch (error) {
      console.error('Error executing button onClick:', error);
    }
  }

  // Emit button click event for workflow processing
  emit('button-clicked', {
    buttonName: props.component.props.name,
    buttonLabel: props.component.props.label,
    buttonText: props.component.props.buttonText || props.component.props.label,
    buttonType: props.component.props.buttonType || 'button',
    action: action,
    targetModal: props.component.props.targetModal,
    timestamp: new Date().toISOString()
  });

  // Default behavior
  // Button click handled
};

// Check if the component is a standard FormKit input type (excluding specialized components)
const isStandardInputType = computed(() => {
  const standardInputTypes = [
    'text', 'textarea', 'number', 'email', 'password',
    'date', 'time', 'datetime-local', 'url', 'tel',
    'select', 'radio', 'file', 'range', 'color', 'hidden'
  ];

  return standardInputTypes.includes(props.component.type);
});

// Check if the component is any FormKit input type (including checkbox and custom types)
const isInputType = computed(() => {
  const inputTypes = [
    'text', 'textarea', 'number', 'email', 'password',
    'date', 'time', 'datetime-local', 'url', 'tel',
    'select', 'checkbox', 'radio', 'file', 'range',
    'color', 'hidden', 'mask', 'otp', 'dropzone', 'switch',
    'searchSelect', 'customFileUpload', 'quillEditor' // Add our new custom components
  ];

  return inputTypes.includes(props.component.type);
});

// Button classes with conditional click handling
const buttonClasses = computed(() => {
  const classes = ['button-component'];
  if (props.component.props.buttonType === 'submit') {
    classes.push('formkit-submit-button');
  }
  return classes.join(' ');
});

// Handle image click for image preview component
const handleImageClick = (event) => {
  // Only do something if zoom is enabled
  if (!props.component.props.showZoom) return;

  // Get the image URL
  const imageUrl = props.component.props.imageUrl;
  if (!imageUrl) return;

  // Remove previous lightbox if exists
  if (lightbox && document.body.contains(lightbox)) {
    document.body.removeChild(lightbox);
  }
  lightbox = document.createElement('div');
  lightbox.style.position = 'fixed';
  lightbox.style.top = '0';
  lightbox.style.left = '0';
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.style.zIndex = '1000';
  lightbox.style.cursor = 'zoom-out';

  // Create the image element
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.objectFit = 'contain';

  // Add close functionality
  lightbox.onclick = () => {
    if (document.body.contains(lightbox)) {
      document.body.removeChild(lightbox);
    }
    lightbox = null;
  };

  // Prevent image click from closing the lightbox
  img.onclick = (e) => {
    e.stopPropagation();
  };

  // Add to DOM
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
};

// Mobile detection reactive reference
const isMobile = ref(false);
const containerElement = ref(null);
let resizeObserver = null;

// Check if screen or container is mobile size
const checkMobileScreen = () => {
  if (process.client) {
    // Check window width (for browser resize)
    const windowMobile = window.innerWidth <= 767;
    
    // Check container width (for device preview containers)
    let containerMobile = false;
    if (containerElement.value) {
      const containerWidth = containerElement.value.closest('.device-preview-container, .grid-preview-container, .device-screen')?.offsetWidth;
      if (containerWidth) {
        containerMobile = containerWidth <= 767;
      }
    }
    
    isMobile.value = windowMobile || containerMobile;
  }
};

// Set up mobile detection
onMounted(() => {
  checkMobileScreen();
  if (process.client) {
    window.addEventListener('resize', checkMobileScreen);
    
    // Set up ResizeObserver to detect container size changes
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        checkMobileScreen();
      });
      
      // Wait for next tick to ensure element is mounted
      nextTick(() => {
        if (containerElement.value) {
          const observeTarget = containerElement.value.closest('.device-preview-container, .grid-preview-container, .device-screen') || containerElement.value;
          resizeObserver.observe(observeTarget);
        }
      });
    }
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobileScreen);
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  }
});

// Compute style based on grid properties with mobile responsiveness
const componentStyle = computed(() => {
  // Apply grid column styling in both preview and edit modes
  let gridColumn = props.component.props.gridColumn || 'span 12';
  
  // Force full width on mobile for better responsiveness
  if (isMobile.value && gridColumn !== 'span 12') {
    gridColumn = 'span 12';
  }

  return {
    gridColumn: gridColumn,
    width: '100%', // Always use 100% within the grid cell
    boxSizing: 'border-box'
  };
});

// Update dynamic list items
const updateListItems = (listName, newItems) => {
  const updatedData = { ...formStore.previewFormData, [listName]: newItems };
  formStore.updatePreviewFormData(updatedData);
  emit('form-data-updated', updatedData);
};

// Get table data safely and initialize if needed
const getTableData = (tableName) => {
  if (!tableName) return [];
  
  // Use safeGetField for consistent data access
  const currentData = safeGetField(tableName, formStore.previewFormData, { warn: false });
  
  // If field exists and is an array, return it
  if (Array.isArray(currentData)) {
    return currentData;
  }
  
  // If data doesn't exist, initialize it
  const initialData = [];
  nextTick(() => {
    const updatedFormData = { ...formStore.previewFormData, [tableName]: initialData };
    formStore.updatePreviewFormData(updatedFormData);
  });
  
  return initialData;
};

// Simplified helper functions for regular fields only
const getFieldName = (component) => component.props.name;

// Filter options based on enableNullOption setting (only for select components)
const getFilteredOptions = (component) => {
  if (!component.props.options) return undefined;
  
  // Only apply null option filtering for select components
  if (component.type === 'select' || component.type === 'searchSelect') {
    // If enableNullOption is false, filter out the null option
    if (component.props.enableNullOption === false) {
      return component.props.options.filter(option => option.value !== '');
    }
  }
  
  // For all components, return all options (including null option if present)
  return component.props.options;
};

const getFieldValue = (component) => {
  const fieldName = component.props.name;
  
  // First priority: Check modal input data (for modal pre-filling)
  if (props.modalInputData && props.modalInputData.hasOwnProperty(fieldName)) {
    const modalValue = props.modalInputData[fieldName];
    if (modalValue !== undefined && modalValue !== null) {
      return modalValue;
    }
  }
  
  // Second priority: Check form store data (for regular form data)
  const formData = formStore.previewFormData;
  if (formData && formData.hasOwnProperty(fieldName)) {
    const value = formData[fieldName];
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  
  // Third priority: Check for defaultValue property
  if (component.props.defaultValue !== undefined && component.props.defaultValue !== null) {
    return component.props.defaultValue;
  }
  
  // Fourth priority: For select fields, return first option value as default if no form data exists
  if (component.type === 'select' && component.props.options && component.props.options.length > 0) {
    return component.props.options[0].value || '';
  }
  
  // Special handling for radio fields - no default selection unless explicitly set
  if (component.type === 'radio') {
    return undefined; // No default selection for radio buttons
  }
  
  // Last priority: Return component value property if no default value exists
  return component.props.value || '';
};

const handleFieldInput = async (component, event) => {
  if (!props.isPreview) return;
  
  const fieldName = component.props.name;
  
  // Extract the actual value from the event based on field type
  let newValue;
  if (component.type === 'select') {
    // For select fields, get the value from the event target or use the event itself if it's already a value
    newValue = (event && event.target) ? event.target.value : event;
    
    // Wait for Vue's reactivity cycle to complete
    await nextTick();
    
    // Try to get the current value from the form store after nextTick
    const currentStoreValue = formStore.previewFormData[fieldName];
    
    // Use the most recent value (either extracted or from store)
    if (currentStoreValue && currentStoreValue !== newValue) {
      newValue = currentStoreValue;
    }
  } else {
    newValue = (event && event.target) ? event.target.value : event;
  }
  
  // Simple update for regular fields only
  const updatedData = { ...formStore.previewFormData, [fieldName]: newValue };
  formStore.updatePreviewFormData(updatedData);
  emit('form-data-updated', updatedData);
};

const handleFieldChange = (component, event) => {
  handleFieldInput(component, event);
};

// Helper function to safely get field values for repeating groups without warnings
const getRepeatingGroupFieldValue = (group, fieldName, fieldType, component = null) => {
  if (!group || typeof group !== 'object') {
    return getDefaultValueForType(fieldType, component);
  }
  
  if (group.hasOwnProperty(fieldName)) {
    const value = group[fieldName];
    if (value === undefined || value === null) {
      return getDefaultValueForType(fieldType, component);
    }
    return value;
  }
  
  return getDefaultValueForType(fieldType, component);
};

// Helper function to get default values based on field type
function getDefaultValueForType(fieldType, component = null) {
  // First check if component has a defaultValue property
  if (component && component.props && component.props.defaultValue !== undefined) {
    return component.props.defaultValue;
  }
  
  switch (fieldType) {
    case 'number':
      return 0;
    case 'checkbox':
      return [];
    case 'select':
      // If component is provided and has options, use first option value
      if (component && component.props && component.props.options && component.props.options.length > 0) {
        return component.props.options[0].value || '';
      }
      return '';
    case 'radio':
      return undefined; // No default selection for radio buttons
    default:
      return '';
  }
}

// Simple repeating group functions
const addRepeatingGroupItem = (groupName, children) => {
  const currentData = safeGetField(groupName, formStore.previewFormData, { warn: false }) || [];
  const newItem = {};
  
  // Initialize fields from children
  if (children) {
    const extractFieldsFromComponent = (comp) => {
      if (!comp) return;
      
      // If this component has a name, add it to the item
      if (comp.props && comp.props.name) {
        // Use the getDefaultValueForType function with the component
        newItem[comp.props.name] = getDefaultValueForType(comp.type, comp);
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
    
    children.forEach(child => {
      extractFieldsFromComponent(child);
    });
  }
  
  const newData = [...currentData, newItem];
  const updatedFormData = { ...formStore.previewFormData, [groupName]: newData };
  
  formStore.updatePreviewFormData(updatedFormData);
  emit('form-data-updated', updatedFormData);
};

const removeRepeatingGroupItem = (groupName, index) => {
  const currentData = safeGetField(groupName, formStore.previewFormData, { warn: false }) || [];
  const newData = [...currentData];
  newData.splice(index, 1);
  
  const updatedFormData = { ...formStore.previewFormData, [groupName]: newData };
  formStore.updatePreviewFormData(updatedFormData);
  emit('form-data-updated', updatedFormData);
};

const updateRepeatingGroupField = (groupName, groupIndex, fieldName, value) => {
  const currentData = safeGetField(groupName, formStore.previewFormData, { warn: false }) || [];
  const newData = [...currentData];
  
  if (!newData[groupIndex]) {
    newData[groupIndex] = {};
  }
  
  newData[groupIndex][fieldName] = value;
  
  const updatedFormData = { ...formStore.previewFormData, [groupName]: newData };
  formStore.updatePreviewFormData(updatedFormData);
  emit('form-data-updated', updatedFormData);
};

// Duplicate RepeatingGroupContainer definition removed

// Handle info display button clicks
const handleInfoButtonClick = (url, openInNewTab = false) => {
  if (!url) return;
  
  try {
    if (openInNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};

// Update table data for repeating-table component
const updateTableData = (newData) => {
  const tableName = props.component.props.name;
  if (!tableName) return;
  
  // Ensure newData is always an array
  const safeNewData = Array.isArray(newData) ? newData : [];
  
  // Check if data actually changed to prevent unnecessary updates
  const currentData = safeGetField(tableName, formStore.previewFormData, { warn: false }) || [];
  const currentDataStr = JSON.stringify(currentData);
  const newDataStr = JSON.stringify(safeNewData);
  
  if (currentDataStr === newDataStr) {
    return;
  }
  
  nextTick(() => {
    const updatedFormData = { ...formStore.previewFormData, [tableName]: safeNewData };
    formStore.updatePreviewFormData(updatedFormData);
    
    // Emit the change for workflow page to sync with its local formData
    emit('form-data-updated', updatedFormData);
  });
};

// Handle form data update from nested components (especially in layout grid cells)
const handleFormDataUpdate = (updatedData) => {
  
  // Update the form store with the new data
  formStore.updatePreviewFormData(updatedData);
  
  // Re-emit the event to propagate it up to parent components (like workflow execution)
  emit('form-data-updated', updatedData);
};

// Update grid config for layout-grid component
const updateGridConfig = (newConfig) => {
  // Update the component props
  if (props.component && props.component.props) {
    Object.assign(props.component.props, newConfig);
    
    // Update the component in the form store
    formStore.updateComponent(props.component);
  }
};

// Form Section Component
const toggleSectionCollapse = (sectionId) => {
  // Find the section component at any nesting level
  const section = findContainerRecursively(sectionId);
  if (section) {
    section.props.collapsed = !section.props.collapsed;
    formStore.updateComponent(section);
  }
};

// New methods for form section component
const onNestedDragEnd = (event) => {
  // Handle reordering within a section
  // console.log('Nested drag end:', event);
};

const onNestedComponentAdd = (event) => {
  // Handle adding a new component to a section
  // console.log('Nested component add:', event);
};

const removeFromSection = (sectionId, childIndex) => {
  // Find the container at any nesting level
  const section = findContainerRecursively(sectionId);
  if (section && section.props.children) {
    const removedComponent = section.props.children.splice(childIndex, 1)[0];
    if (removedComponent) {
      // Update the section (don't add the component back to main form)
      formStore.updateComponent(section);
      
      // Record the deletion in history
      formStore.recordHistory('delete_component_from_section', {
        componentId: removedComponent.id,
        componentType: removedComponent.type,
        componentName: removedComponent.props.label || removedComponent.props.name,
        sectionId: sectionId,
        deletedComponent: removedComponent
      });
      
      // console.log('Component deleted from section:', removedComponent);
    }
  }
};

const handleSectionDragOver = (event, containerId) => {
  
  event.preventDefault();
  event.stopPropagation();
  
  // Initialize container drop state if it doesn't exist
  if (!sectionDropStates.value[containerId]) {
    sectionDropStates.value[containerId] = { isDraggingOver: false };
  }
  sectionDropStates.value[containerId].isDraggingOver = true;
};

const handleSectionDragLeave = (event, containerId) => {
  event.preventDefault();
  event.stopPropagation();
  
  // Only hide the drag over state if we're actually leaving the drop zone
  const rect = event.currentTarget.getBoundingClientRect();
  const isOutside = (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
  
  if (isOutside && sectionDropStates.value[containerId]) {
    sectionDropStates.value[containerId].isDraggingOver = false;
  }
};

// Container drag handling functions
const handleContainerDragStart = (event) => {
  // console.log('Container drag started:', event);
};

const handleContainerDragEnd = (event) => {
  // console.log('Container drag ended:', event);
  // The draggable component automatically updates the array order
  // We just need to update the parent container to trigger reactivity
  if (props.component) {
    formStore.updateComponent(props.component);
  }
};

// Nested component selection
const selectNestedComponent = (nestedComponent) => {
  if (!nestedComponent || !nestedComponent.id) return;
  
  selectedComponentId.value = nestedComponent.id;
  selectedNestedComponent.value = nestedComponent;
  
  // Emit the selection event to parent
  emit('select-nested-component', nestedComponent);
  
  // console.log('Selected nested component:', nestedComponent);
};

// Delete nested component
const deleteNestedComponent = (componentId) => {
  if (!componentId || !props.component) return;
  
  // Find the component in the children array
  const childIndex = props.component.props.children.findIndex(child => child.id === componentId);
  if (childIndex !== -1) {
    // Remove the component
    const deletedComponent = props.component.props.children.splice(childIndex, 1)[0];
    
    // Update the container to trigger reactivity
    formStore.updateComponent(props.component);
    
    // Clear selection if the deleted component was selected
    if (selectedComponentId.value === componentId) {
      selectedComponentId.value = null;
      selectedNestedComponent.value = null;
    }
    
    // console.log('Deleted nested component:', deletedComponent);
  }
};

// Helper function to find container at any nesting level
const findContainerRecursively = (containerId, components = formStore.formComponents, childId = null) => {
  // console.log('🔍 Searching for container:', { containerId, childId, componentsCount: components.length });
  
  for (const component of components) {
    // console.log(`Checking component: ${component.id} (${component.type})`);
    
    // Check if this is the target container
    if (containerId && component.id === containerId) {
      // console.log('✅ Found target container by ID:', component.id);
      return component;
    }
    
    // If searching for parent by child ID, check if this component contains the child
    if (childId && component.props.children && Array.isArray(component.props.children)) {
      const hasChild = component.props.children.some(child => child.id === childId);
      if (hasChild) {
        // console.log('✅ Found parent container:', component.id, '(type:', component.type, ') contains child:', childId);
        return component;
      }
    }
    
    // If this component has children, search recursively
    if (component.props.children && Array.isArray(component.props.children)) {
      const found = findContainerRecursively(containerId, component.props.children, childId);
      if (found) {
        return found;
      }
    }
    
    // Special handling for Tab Container components - search in their tabs
    if (component.type === 'tab-container' && component.props.tabs) {
      // If searching for parent by child ID, check if this tab container contains the child
      if (childId) {
        for (const tab of component.props.tabs) {
          if (tab.children && Array.isArray(tab.children)) {
            const hasChild = tab.children.some(child => child.id === childId);
            if (hasChild) {
              return component; // Return the tab container as the parent container
            }
          }
        }
      }
      
      // If searching for specific container by ID, check tabs recursively
      if (containerId) {
        for (const tab of component.props.tabs) {
          if (tab.children && Array.isArray(tab.children)) {
            const found = findContainerRecursively(containerId, tab.children, childId);
            if (found) {
              return found;
            }
          }
        }
      }
    }
    
    // Special handling for Layout Grid components - search in their cells
    if (component.type === 'layout-grid' && component.props.cells) {
      // If searching for parent by child ID, check if this layout grid contains the child directly
      if (childId) {
        const hasChild = component.props.cells.some(cell => cell.component && cell.component.id === childId);
        if (hasChild) {
          return component; // Return the layout grid as the parent container
        }
      }
      
      for (const cell of component.props.cells) {
        if (cell.component) {
          // Check if this cell's component is the target container
          if (containerId && cell.component.id === containerId) {
            return cell.component;
          }
          
          // If searching for parent by child ID, check if this cell's component contains the child
          if (childId && cell.component.props.children && Array.isArray(cell.component.props.children)) {
            const hasChild = cell.component.props.children.some(child => child.id === childId);
            if (hasChild) {
              return cell.component;
            }
          }
          
          // Recursively search in the cell's component children
          if (cell.component.props.children && Array.isArray(cell.component.props.children)) {
            const found = findContainerRecursively(containerId, cell.component.props.children, childId);
            if (found) {
              return found;
            }
          }
          
          // Special handling for tab-containers inside layout-grid cells
          if (cell.component.type === 'tab-container' && cell.component.props.tabs) {
            // If searching for parent by child ID, check if this tab container contains the child
            if (childId) {
              for (const tab of cell.component.props.tabs) {
                if (tab.children && Array.isArray(tab.children)) {
                  const hasChild = tab.children.some(child => child.id === childId);
                  if (hasChild) {
                    return cell.component; // Return the tab container as the parent
                  }
                }
              }
            }
            
            // If searching for specific container by ID, check tabs recursively
            if (containerId) {
              for (const tab of cell.component.props.tabs) {
                if (tab.children && Array.isArray(tab.children)) {
                  const found = findContainerRecursively(containerId, tab.children, childId);
                  if (found) {
                    return found;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
};

// Layout Grid helper functions
const getGridStyles = (props) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${props.rows || 2}, auto)`,
  gridTemplateColumns: `repeat(${props.columns || 2}, minmax(0, 1fr))`,
  gap: `${props.gap || 8}px`,
  minHeight: 'auto',
  height: 'auto'
})

const getCellStyles = (cell) => ({
  gridRow: `${cell.row + 1} / span ${cell.rowSpan}`,
  gridColumn: `${cell.col + 1} / span ${cell.colSpan}`,
  position: 'relative'
})

const isCellCovered = (cell, cells) => {
  if (!cell || cell.rowSpan > 1 || cell.colSpan > 1) return false
  
  // Only check if this cell is covered by spanning cells
  for (let i = 0; i < cells.length; i++) {
    const otherCell = cells[i]
    if (!otherCell || otherCell.rowSpan === 1 && otherCell.colSpan === 1) continue
    
    // Check if this cell is within the span of another cell
    const isInRowSpan = cell.row >= otherCell.row && 
                       cell.row < otherCell.row + otherCell.rowSpan
    const isInColSpan = cell.col >= otherCell.col && 
                       cell.col < otherCell.col + otherCell.colSpan
    
    if (isInRowSpan && isInColSpan) {
      return true
    }
  }
  
  return false
}

const isContainerComponent = (cell) => {
  // Add null checks to prevent errors
  if (!cell || !cell.component) {
    return false
  }
  
  const isContainer = ['repeating-group', 'form-section', 'dynamic-list', 'tab-container'].includes(cell.component.type)

  return isContainer
}

const getNestingDepth = (componentId) => {
  // Calculate the nesting depth of a component (max 3 levels)
  let depth = 0
  let currentId = componentId
  
  // Traverse up the parent hierarchy
  while (depth < 3) {
    const parentContainer = findParentContainer(currentId)
    if (!parentContainer) {
      break
    }
    depth++
    currentId = parentContainer.id
  }
  
  return depth
}

const isComponentInsideLayoutGrid = (componentId) => {
  // Check if a component is nested inside a layout grid anywhere in its hierarchy
  let currentId = componentId
  
  while (currentId) {
    const parentContainer = findParentContainer(currentId)
    if (!parentContainer) {
      break
    }
    
    if (parentContainer.type === 'layout-grid') {
      return true
    }
    
    currentId = parentContainer.id
  }
  
  return false
}

const canAcceptComponents = (containerComponent) => {
  // Check if this container can accept more components (nesting level restriction)
  if (!containerComponent || !isContainerComponent({ component: containerComponent })) {
    return false
  }
  
  // Check if this container is inside a layout grid (which allows deeper nesting)
  const isInsideLayoutGrid = isComponentInsideLayoutGrid(containerComponent.id)
  
  // Different nesting limits:
  // - Layout Grid: 3 levels
  // - Components inside Layout Grid: inherit the 3-level limit
  // - Other containers: 1 level only
  const maxDepth = (containerComponent.type === 'layout-grid' || isInsideLayoutGrid) ? 3 : 1
  const nestingDepth = getNestingDepth(containerComponent.id)
  
  if (nestingDepth >= maxDepth) {
    // Show user-friendly notification
    showNestingRestrictionNotification(containerComponent, null, nestingDepth, maxDepth)
    
    return false
  }
  
  return true
}

const showNestingRestrictionNotification = (containerComponent, parentContainer, nestingDepth, maxDepth = 1) => {
  // Create a temporary notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm'
  
  const message = parentContainer 
    ? `Cannot add components to <strong>${containerComponent.type.replace('-', ' ')}</strong> inside <strong>${parentContainer.type.replace('-', ' ')}</strong>`
    : `Cannot add components to <strong>${containerComponent.type.replace('-', ' ')}</strong> - maximum nesting depth (${maxDepth} levels) reached`
    
  notification.innerHTML = `
    <div class="flex items-start">
      <Icon name="material-symbols:warning" class="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
      <div class="flex-1">
        <h4 class="text-sm font-medium text-red-800 mb-1">Nesting Limit Reached</h4>
        <p class="text-xs text-red-600">
          ${message}
        </p>
        <p class="text-xs text-red-500 mt-1">
          Current depth: ${nestingDepth}/${maxDepth} levels
        </p>
      </div>
      <button class="ml-3 text-red-400 hover:text-red-600" onclick="this.parentElement.parentElement.remove()">
        <Icon name="material-symbols:close" class="w-4 h-4" />
      </button>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

const findParentContainer = (componentId) => {
  // Find if this component is nested inside another container
  const formComponents = formStore.formComponents
  
  for (const component of formComponents) {
    // Check if component has children and contains the target
    if (component.props.children && component.props.children.length > 0) {
      const hasChild = component.props.children.some(child => 
        child.id === componentId || 
        (child.props.children && child.props.children.some(grandChild => grandChild.id === componentId))
      )
      if (hasChild) {
        return component
      }
    }
    
    // Check if component is a layout grid and contains the target in its cells
    if (component.type === 'layout-grid' && component.props.cells) {
      for (const cell of component.props.cells) {
        if (cell.component && cell.component.id === componentId) {
          return component
        }
        if (cell.component && cell.component.props.children) {
          const hasChild = cell.component.props.children.some(child => 
            child.id === componentId || 
            (child.props.children && child.props.children.some(grandChild => grandChild.id === componentId))
          )
          if (hasChild) {
            return component
          }
        }
      }
    }
  }
  
  return null
}

const getGridCellEvents = (cell, index) => {
  // If it's a container component, return empty events object to let the container handle its own events
  if (isContainerComponent(cell)) {
    return {}
  }
  
  // For non-container components, return the Layout Grid's event handlers
  return {
    dragover: (event) => {
      event.preventDefault()
      handleGridCellDragOver(index, event)
    },
    drop: (event) => {
      handleGridCellDrop(index, event)
    },
    dragenter: (event) => {
      event.preventDefault()
      handleGridCellDragEnter(index)
    },
    dragleave: () => {
      handleGridCellDragLeave(index)
    }
  }
}

const selectGridCell = (index) => {
  selectedGridCell.value = index
}

const removeGridComponent = (componentId, cellIndex) => {
  if (props.component && props.component.id === componentId && props.component.props.cells) {
    props.component.props.cells[cellIndex].component = null
    formStore.updateComponent(props.component)
  }
}

// Layout Grid drag and drop handlers
const handleGridDragOver = (event) => {
  
  // Don't prevent default if we're over a container component
  const target = event.target.closest('.component-preview')
  if (target) {
    const cell = target.closest('.grid-cell')
    if (cell && cell.parentElement) {
      const cellIndex = Array.from(cell.parentElement.children).indexOf(cell)
      // console.log('🔵 [LayoutGrid] Found cell index:', cellIndex)
      
      if (cellIndex >= 0 && props.component.props.cells[cellIndex]) {
        const currentCell = props.component.props.cells[cellIndex]
        // console.log('🔵 [LayoutGrid] Current cell:', currentCell)
        
        if (isContainerComponent(currentCell)) {
          // console.log('🔵 [LayoutGrid] Container component detected, letting it handle dragover')
          return // Let the container handle the dragover
        }
      }
    }
  }
  
  // console.log('🔵 [LayoutGrid] Handling dragover normally')
  event.preventDefault()
}

const handleGridDrop = (event) => {

  // Don't handle drop if we're over a container component
  const target = event.target.closest('.component-preview')
  if (target) {
    const cell = target.closest('.grid-cell')
    if (cell && cell.parentElement) {
      const cellIndex = Array.from(cell.parentElement.children).indexOf(cell)
      // console.log('🟢 [LayoutGrid] Found cell index:', cellIndex)
      
      if (cellIndex >= 0 && props.component.props.cells[cellIndex]) {
        const currentCell = props.component.props.cells[cellIndex]
        // console.log('🟢 [LayoutGrid] Current cell:', currentCell)
        
        if (isContainerComponent(currentCell)) {
          // console.log('🟢 [LayoutGrid] Container component detected, letting it handle drop')
          return // Let the container handle the drop
        }
      }
    }
  }
  
  // console.log('🟢 [LayoutGrid] Handling drop normally')
  event.preventDefault()
  event.stopPropagation()
  
  try {
    const componentData = JSON.parse(event.dataTransfer.getData('text/plain'))
    // console.log('🟢 [LayoutGrid] Component data:', componentData)
    if (componentData.type && selectedGridCell.value !== null) {
      const success = addComponentToGridCell(selectedGridCell.value, componentData)
      if (success) {
        event.stopImmediatePropagation()
      }
    }
  } catch (error) {
    console.warn('Invalid component data dropped:', error)
  }
}

const handleGridDragEnter = (event) => {
  // Don't prevent default if we're over a container component
  const target = event.target.closest('.component-preview')
  if (target) {
    const cell = target.closest('.grid-cell')
    if (cell && cell.parentElement) {
      const cellIndex = Array.from(cell.parentElement.children).indexOf(cell)
      if (cellIndex >= 0 && props.component.props.cells[cellIndex]) {
        const currentCell = props.component.props.cells[cellIndex]
        if (isContainerComponent(currentCell)) {
          return // Let the container handle the dragenter
        }
      }
    }
  }
  event.preventDefault()
}

const handleGridDragLeave = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const isOutside = (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
  
  if (isOutside) {
    dragOverGridCell.value = null
  }
}

const handleGridCellDragOver = (cellIndex, event) => {
  if (props.isPreview) return
  event.preventDefault()
  dragOverGridCell.value = cellIndex
}

const handleGridCellDrop = (cellIndex, event) => {
  if (props.isPreview) return
  event.preventDefault()
  event.stopPropagation()
  dragOverGridCell.value = null
  
  try {
    const componentData = JSON.parse(event.dataTransfer.getData('text/plain'))
    if (componentData.type) {
      const success = addComponentToGridCell(cellIndex, componentData)
      if (success) {
        event.stopImmediatePropagation()
      }
    }
  } catch (error) {
    console.warn('Invalid component data dropped:', error)
  }
}

const handleGridCellDragEnter = (cellIndex) => {
  if (props.isPreview) return
  dragOverGridCell.value = cellIndex
}

const handleGridCellDragLeave = (cellIndex) => {
  if (dragOverGridCell.value === cellIndex) {
    dragOverGridCell.value = null
  }
}

const addComponentToGridCell = (cellIndex, componentData) => {
  // Check if this is a container component and if it would exceed nesting level
  if (['repeating-group', 'form-section', 'dynamic-list', 'tab-container'].includes(componentData.type)) {
    // Since we're adding to a layout grid, components inherit the 3-level limit
    const currentDepth = getNestingDepth(props.component.id)
    const maxAllowedDepth = 2 // Grid + 1 more level = 3 total levels
    
    if (currentDepth > maxAllowedDepth) {
      console.warn('🚫 [Nesting Restriction] Cannot add container component - would exceed 3-level limit:', {
        containerType: componentData.type,
        gridId: props.component.id,
        currentGridDepth: currentDepth,
        maxAllowedDepth: maxAllowedDepth,
        wouldBeDepth: currentDepth + 1
      })
      return false
    }
  }
  
  const newComponent = {
    id: `${componentData.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: componentData.type,
    name: componentData.name,
    props: {
      ...componentData.defaultProps,
      // Layout-grid components should default to full width within their cell
      gridColumn: 'span 12',
      width: '100%',
      label: componentData.defaultProps.label || componentData.name || componentData.type,
      name: componentData.defaultProps.name || `${componentData.type}_${Date.now()}`
    }
  }
  
  // Update the current layout grid component directly
  if (props.component && props.component.type === 'layout-grid' && props.component.props.cells) {
    props.component.props.cells[cellIndex].component = newComponent
    formStore.updateComponent(props.component)
    // console.log(`[LayoutGrid] Added component ${componentData.type} to cell ${cellIndex}`)
    return true
  }
  
  return false
}

// Tab Container Methods
const setActiveTab = (tabComponent, tabId) => {
  if (!tabComponent?.props?.tabs) return
  
  // Set all tabs to inactive
  tabComponent.props.tabs.forEach(tab => {
    tab.active = false
  })
  
  // Set the selected tab to active
  const selectedTab = tabComponent.props.tabs.find(tab => tab.id === tabId)
  if (selectedTab) {
    selectedTab.active = true
    // Only update form store in builder mode, not in preview mode (workflow execution)
    // This prevents triggering component re-initialization in workflows
    if (!props.isPreview) {
      formStore.updateComponent(tabComponent)
    }
  }
}

const addNewTab = (tabComponent) => {
  if (!tabComponent?.props?.tabs) return
  if (tabComponent.props.tabs.length >= tabComponent.props.maxTabs) return
  
  const newTabId = `tab_${Date.now()}`
  const newTab = {
    id: newTabId,
    label: `Tab ${tabComponent.props.tabs.length + 1}`,
    active: false,
    children: []
  }
  
  tabComponent.props.tabs.push(newTab)
  // Only update form store in builder mode
  if (!props.isPreview) {
    formStore.updateComponent(tabComponent)
  }
}

const removeTab = (tabComponent, tabIndex) => {
  if (!tabComponent?.props?.tabs) return
  if (tabComponent.props.tabs.length <= tabComponent.props.minTabs) return
  
  const removedTab = tabComponent.props.tabs[tabIndex]
  const wasActive = removedTab?.active
  
  tabComponent.props.tabs.splice(tabIndex, 1)
  
  // If we removed the active tab, set the first tab as active
  if (wasActive && tabComponent.props.tabs.length > 0) {
    tabComponent.props.tabs[0].active = true
  }
  
  // Only update form store in builder mode
  if (!props.isPreview) {
    formStore.updateComponent(tabComponent)
  }
}

const removeFromTab = (tabComponent, tabId, childIndex) => {
  if (!tabComponent?.props?.tabs) return
  
  const tab = tabComponent.props.tabs.find(t => t.id === tabId)
  if (tab && tab.children) {
    const removedComponent = tab.children.splice(childIndex, 1)[0]
    if (removedComponent) {
      // Only update form store in builder mode
      if (!props.isPreview) {
        formStore.updateComponent(tabComponent)
        
        // Record the deletion in history
        formStore.recordHistory('delete_component_from_tab', {
          componentId: removedComponent.id,
          componentType: removedComponent.type,
          componentName: removedComponent.props.label || removedComponent.props.name,
          tabId: tabId,
          tabContainerId: tabComponent.id,
          deletedComponent: removedComponent
        })
      }
    }
  }
}

const onTabComponentAdd = (tabComponent, tabId) => {
  // Handle adding a new component to a tab
  // console.log('Tab component add:', tabComponent, tabId)
  // Only update form store in builder mode
  if (!props.isPreview) {
    formStore.updateComponent(tabComponent)
  }
}

// Tab drag and drop handlers
const handleTabDragOver = (event, componentId, tabId) => {
  event.preventDefault();
  event.stopPropagation();
  
  const dropKey = `${componentId}-${tabId}`;
  // Initialize tab drop state if it doesn't exist
  if (!tabDropStates.value[dropKey]) {
    tabDropStates.value[dropKey] = { isDraggingOver: false };
  }
  tabDropStates.value[dropKey].isDraggingOver = true;
}

const handleTabDragLeave = (event, componentId, tabId) => {
  event.preventDefault();
  event.stopPropagation();
  
  const dropKey = `${componentId}-${tabId}`;
  // Only hide the drag over state if we're actually leaving the drop zone
  const rect = event.currentTarget.getBoundingClientRect();
  const isOutside = (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
  
  if (isOutside && tabDropStates.value[dropKey]) {
    tabDropStates.value[dropKey].isDraggingOver = false;
  }
}

const handleTabDragEnter = (event, componentId, tabId) => {
  event.preventDefault();
  event.stopPropagation();
  
  const dropKey = `${componentId}-${tabId}`;
  // Initialize tab drop state if it doesn't exist
  if (!tabDropStates.value[dropKey]) {
    tabDropStates.value[dropKey] = { isDraggingOver: false };
  }
  
  // Check if this tab can accept components (could add restrictions later)
  const container = findContainerRecursively(componentId);
  if (container && container.type === 'tab-container') {
    const tab = container.props.tabs.find(t => t.id === tabId);
    if (tab && !canAcceptComponents(container)) {
      // Show visual feedback that this tab cannot accept components
      if (tabDropStates.value[dropKey]) {
        tabDropStates.value[dropKey].cannotAccept = true;
      }
    }
  }
}

const handleTabDrop = (event, componentId, tabId) => {
  
  event.preventDefault();
  event.stopPropagation();
  
  const dropKey = `${componentId}-${tabId}`;
  // Reset drag state
  if (tabDropStates.value[dropKey]) {
    tabDropStates.value[dropKey].isDraggingOver = false;
  }
  
  try {
    // Get the dropped component data
    let componentData = null;
    
    try {
      componentData = JSON.parse(event.dataTransfer.getData('text/plain') || '{}');
    } catch (parseError) {
      // Fallback for Safari or other browsers
      componentData = window.__draggedComponentData || {};
    }
    
    // console.log('🔵 [TabContainer] Component data:', componentData);
    
    if (!componentData.type) {
      console.warn('No valid component data found in drop event');
      return;
    }
    
    // Create a new component instance with proper label setup
    const newComponent = {
      id: `${componentData.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: componentData.type,
      name: componentData.name,
      props: {
        ...componentData.defaultProps,
        gridColumn: 'span 6', // Default to half width in containers
        width: '50%',
        // Ensure the component has a proper label
        label: componentData.defaultProps.label || componentData.name || `${componentData.type.charAt(0).toUpperCase() + componentData.type.slice(1)} Field`,
        name: componentData.defaultProps.name || `${componentData.type}_${Date.now()}`
      }
    };
    
    // Find the target container at any nesting level
    const container = findContainerRecursively(componentId);
    // console.log('🔵 [TabContainer] Found container:', container);
    
    if (container && container.type === 'tab-container') {
      // Find the specific tab
      const tab = container.props.tabs.find(t => t.id === tabId);
      if (!tab) {
        console.warn('Tab not found:', tabId);
        return;
      }
      
      // Initialize children array if it doesn't exist
      if (!tab.children) {
        tab.children = [];
      }
      
      // Add the component to the tab
      tab.children.push(newComponent);
      
      // Update the container to trigger reactivity
      formStore.updateComponent(container);
      
      // Record the addition in history
      formStore.recordHistory('add_component_to_tab', {
        componentId: newComponent.id,
        componentType: newComponent.type,
        componentName: newComponent.props.label || newComponent.props.name,
        tabId: tabId,
        containerId: componentId
      });
    
      // console.log('🔵 [TabContainer] Component added to tab:', newComponent, 'in tab:', tabId);
    } else {
      console.warn('🔵 [TabContainer] Tab container not found:', componentId);
    }
  } catch (error) {
    console.error('🔵 [TabContainer] Error handling tab drop:', error);
  }
}

// Component Visibility Methods
const hideComponent = (componentId) => {
  hiddenComponents.value.add(componentId)
  // console.log('Component hidden:', componentId)
}

const showComponent = (componentId) => {
  hiddenComponents.value.delete(componentId)
  // console.log('Component shown:', componentId)
}

const toggleComponentVisibility = (componentId) => {
  if (hiddenComponents.value.has(componentId)) {
    showComponent(componentId)
  } else {
    hideComponent(componentId)
  }
}

const isComponentVisible = (componentId) => {
  return !hiddenComponents.value.has(componentId)
}

const handleVisibilityAction = (action, targetComponentIds) => {
  if (!targetComponentIds || !Array.isArray(targetComponentIds)) return
  
  switch (action) {
    case 'hide':
      targetComponentIds.forEach(id => hideComponent(id))
      break
    case 'show':
      targetComponentIds.forEach(id => showComponent(id))
      break
    case 'toggle':
      targetComponentIds.forEach(id => toggleComponentVisibility(id))
      break
  }
}

const handleSectionDrop = (event, containerId) => {
  
  event.preventDefault();
  event.stopPropagation();
  
  // Reset drag state
  if (sectionDropStates.value[containerId]) {
    sectionDropStates.value[containerId].isDraggingOver = false;
  }
  
  try {
    // Get the dropped component data
    let componentData = null;
    
    try {
      componentData = JSON.parse(event.dataTransfer.getData('text/plain') || '{}');
    } catch (parseError) {
      // Fallback for Safari or other browsers
      componentData = window.__draggedComponentData || {};
    }
    
    // console.log('🟡 [RepeatingGroup] Component data:', componentData);
    
    if (!componentData.type) {
      console.warn('No valid component data found in drop event');
      return;
    }
    
    // Create a new component instance with proper label setup
    const newComponent = {
      id: `${componentData.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: componentData.type,
      name: componentData.name,
      props: {
        ...componentData.defaultProps,
        gridColumn: 'span 6', // Default to half width in containers
        width: '50%',
        // Ensure the component has a proper label
        label: componentData.defaultProps.label || componentData.name || `${componentData.type.charAt(0).toUpperCase() + componentData.type.slice(1)} Field`,
        name: componentData.defaultProps.name || `${componentData.type}_${Date.now()}`
      }
    };
    
    // Find the target container at any nesting level
    const container = findContainerRecursively(containerId);
    // console.log('🟡 [RepeatingGroup] Found container:', container);
    

    if (!container) {
      console.log('🔍 [handleSectionDrop] Container not found by findContainerRecursively, attempting deep search...');
      
      // Use a more comprehensive search that handles all nesting scenarios
      const deepSearchContainer = (componentId, components = formStore.formComponents) => {
        console.log('🔍 [deepSearchContainer] Searching for:', componentId, 'in', components.length, 'components');
        
        for (const comp of components) {
          // Direct match
          if (comp.id === componentId) {
            console.log('✅ [deepSearchContainer] Found direct match:', comp.id);
            return comp;
          }
          
          // Search in children
          if (comp.props.children && Array.isArray(comp.props.children)) {
            const found = deepSearchContainer(componentId, comp.props.children);
            if (found) return found;
          }
          
          // Search in layout-grid cells
          if (comp.type === 'layout-grid' && comp.props.cells) {
            for (const cell of comp.props.cells) {
              if (cell.component) {
                // Check if cell component is the target
                if (cell.component.id === componentId) {
                  console.log('✅ [deepSearchContainer] Found in layout-grid cell:', cell.component.id);
                  return cell.component;
                }
                
                // Search recursively in cell component children
                if (cell.component.props.children) {
                  const found = deepSearchContainer(componentId, cell.component.props.children);
                  if (found) return found;
                }
                
                // Search in tab-containers inside cells
                if (cell.component.type === 'tab-container' && cell.component.props.tabs) {
                  for (const tab of cell.component.props.tabs) {
                    if (tab.children && Array.isArray(tab.children)) {
                      const found = deepSearchContainer(componentId, tab.children);
                      if (found) return found;
                    }
                  }
                }
              }
            }
          }
          
          // Search in tab-container tabs
          if (comp.type === 'tab-container' && comp.props.tabs) {
            for (const tab of comp.props.tabs) {
              if (tab.children && Array.isArray(tab.children)) {
                const found = deepSearchContainer(componentId, tab.children);
                if (found) return found;
              }
            }
          }
        }
        return null;
      };
      
      const foundContainer = deepSearchContainer(containerId);
      if (foundContainer) {
        console.log('✅ [handleSectionDrop] Found container via deep search:', foundContainer.id, foundContainer.type);
        
        if (foundContainer.type === 'form-section' || foundContainer.type === 'repeating-group' || foundContainer.type === 'tab-container') {
          // Check nesting level restriction
          if (!canAcceptComponents(foundContainer)) {
            console.warn('🚫 [Nesting Restriction] Cannot add component to nested container:', {
              containerId: foundContainer.id,
              containerType: foundContainer.type,
              componentType: newComponent.type
            })
            return
          }
          
          // Initialize children array if it doesn't exist
          if (!foundContainer.props.children) {
            foundContainer.props.children = [];
          }
          
          // Add the component to the container
          foundContainer.props.children.push(newComponent);
          
          // Find the root component to update in form store
          const rootComponent = findRootComponent(foundContainer.id);
          if (rootComponent) {
            formStore.updateComponent(rootComponent);
          } else {
            formStore.updateComponent(foundContainer);
          }
          
          // Record the action in history
          formStore.recordHistory('add_component_to_container', {
            componentType: newComponent.type,
            componentName: newComponent.name,
            containerId: containerId,
            containerType: foundContainer.type
          });
          
          console.log('✅ [handleSectionDrop] Component added to deeply nested container:', newComponent);
          return;
        }
      } else {
        console.warn('🚫 [handleSectionDrop] Container not found even with deep search:', containerId);
      }
    }
    
    if (container && (container.type === 'form-section' || container.type === 'repeating-group' || container.type === 'tab-container')) {
      // Check nesting level restriction
      if (!canAcceptComponents(container)) {
        console.warn('🚫 [Nesting Restriction] Cannot add component to nested container:', {
          containerId: container.id,
          containerType: container.type,
          componentType: newComponent.type
        })
        return
      }
      
      // Initialize children array if it doesn't exist
      if (!container.props.children) {
        container.props.children = [];
      }
      
      // Add the component to the container
      container.props.children.push(newComponent);
      
      // Update the container in the form store
      formStore.updateComponent(container);
      
      // Record the action in history
      formStore.recordHistory('add_component_to_container', {
        componentType: newComponent.type,
        componentName: newComponent.name,
        containerId: containerId,
        containerType: container.type
      });
      
      // console.log('🟡 [RepeatingGroup] Component added to container:', newComponent);
    } else {
      console.warn('🟡 [RepeatingGroup] Container not found or invalid container type:', containerId);
    }
  } catch (error) {
    console.error('🟡 [RepeatingGroup] Error dropping component into container:', error);
  }
};

const handleSectionDragEnter = (event, containerId) => {
  event.preventDefault();
  event.stopPropagation();
  
  // Initialize container drop state if it doesn't exist
  if (!sectionDropStates.value[containerId]) {
    sectionDropStates.value[containerId] = { isDraggingOver: false };
  }
  
  // Check if this container can accept components
  const container = findContainerRecursively(containerId);
  if (container && !canAcceptComponents(container)) {
    // Show visual feedback that this container cannot accept components
    if (sectionDropStates.value[containerId]) {
      sectionDropStates.value[containerId].cannotAccept = true;
    }
  }
};

const openNestedComponentSettings = (component) => {
  // Set the selected nested component and open the modal
  selectedNestedComponent.value = { ...component };
  showNestedSettingsModal.value = true;
  // console.log('Opening settings for component:', component);
  // console.log('Component type:', component.type);
  // console.log('Component props:', component.props);
};

const closeNestedSettingsModal = () => {
  showNestedSettingsModal.value = false;
  selectedNestedComponent.value = null;
};

// Enhanced function to find immediate parent of nested component
// Helper function to find the root component that should be updated in the form store
const findRootComponent = (componentId, components = formStore.formComponents) => {
  console.log('🔍 [findRootComponent] Searching for root of:', componentId);
  
  for (const rootComponent of components) {
    // Check if this root component contains the target component anywhere in its tree
    const containsComponent = (comp, targetId) => {
      if (comp.id === targetId) return true;
      
      if (comp.props.children && Array.isArray(comp.props.children)) {
        for (const child of comp.props.children) {
          if (containsComponent(child, targetId)) return true;
        }
      }
      
      if (comp.type === 'layout-grid' && comp.props.cells) {
        for (const cell of comp.props.cells) {
          if (cell.component && containsComponent(cell.component, targetId)) return true;
        }
      }
      
      if (comp.type === 'tab-container' && comp.props.tabs) {
        for (const tab of comp.props.tabs) {
          if (tab.children && Array.isArray(tab.children)) {
            for (const child of tab.children) {
              if (containsComponent(child, targetId)) return true;
            }
          }
        }
      }
      
      return false;
    };
    
    if (containsComponent(rootComponent, componentId)) {
      console.log('✅ [findRootComponent] Found root component:', rootComponent.id);
      return rootComponent;
    }
  }
  
  console.log('⚠️ [findRootComponent] No root component found for:', componentId);
  return null;
};

const findImmediateParent = (childId, components = formStore.formComponents) => {
  console.log('🔍 [findImmediateParent] Searching for parent of:', childId, 'in', components.length, 'components');
  
  for (const component of components) {
    console.log('🔍 [findImmediateParent] Checking component:', { id: component.id, type: component.type });
    // Check direct children first
    if (component.props.children && Array.isArray(component.props.children)) {
      console.log('🔍 [findImmediateParent] Checking children array for component:', component.id);
      console.log('👶 [findImmediateParent] Children details:', component.props.children.map(child => ({
        id: child.id,
        type: child.type,
        name: child.props?.name
      })));
      const hasDirectChild = component.props.children.some(child => child.id === childId);
      if (hasDirectChild) {
        console.log('✅ [findImmediateParent] Found parent in children array:', component.id);
        return component;
      }
    }
    
    // Check layout grid cells
    if (component.type === 'layout-grid' && component.props.cells) {
      console.log('🔍 [findImmediateParent] Checking layout-grid cells for component:', component.id);
      console.log('📦 [findImmediateParent] Cell details:', component.props.cells.map((cell, idx) => ({
        cellIndex: idx,
        hasComponent: !!cell.component,
        componentId: cell.component?.id,
        componentType: cell.component?.type
      })));
      const hasDirectChild = component.props.cells.some(cell => cell.component && cell.component.id === childId);
      if (hasDirectChild) {
        console.log('✅ [findImmediateParent] Found parent in layout-grid cells:', component.id);
        return component;
      }
    }
    
    // Check tab container tabs
    if (component.type === 'tab-container' && component.props.tabs) {
      for (const tab of component.props.tabs) {
        if (tab.children && Array.isArray(tab.children)) {
          const hasDirectChild = tab.children.some(child => child.id === childId);
          if (hasDirectChild) {
            return component;
          }
        }
      }
    }
    
    // Recursively search in children
    if (component.props.children && Array.isArray(component.props.children)) {
      const found = findImmediateParent(childId, component.props.children);
      if (found) return found;
    }
    
    // Recursively search in layout grid cells
    if (component.type === 'layout-grid' && component.props.cells) {
      console.log('🔄 [findImmediateParent] Recursively searching in layout-grid cells for component:', component.id);
      for (const cell of component.props.cells) {
        if (cell.component) {
          console.log('🔄 [findImmediateParent] Checking cell component as potential parent:', cell.component.id);
          // First check if the cell component itself is the parent
          if (cell.component.props.children && Array.isArray(cell.component.props.children)) {
            console.log('👶 [findImmediateParent] Cell component children:', cell.component.props.children.map(child => ({
              id: child.id,
              type: child.type,
              name: child.props?.name
            })));
            const hasDirectChild = cell.component.props.children.some(child => child.id === childId);
            if (hasDirectChild) {
              console.log('✅ [findImmediateParent] Found parent in cell component children:', cell.component.id);
              return cell.component;
            }
          }
          
          // Special handling for tab-containers inside layout-grid cells
          if (cell.component.type === 'tab-container' && cell.component.props.tabs) {
            console.log('🔄 [findImmediateParent] Checking tab-container in cell:', cell.component.id);
            // First check if any tab contains the child directly
            for (const tab of cell.component.props.tabs) {
              if (tab.children && Array.isArray(tab.children)) {
                const hasDirectChild = tab.children.some(child => child.id === childId);
                if (hasDirectChild) {
                  console.log('✅ [findImmediateParent] Found parent in tab-container in cell:', cell.component.id);
                  return cell.component;
                }
              }
            }
            // Then search recursively in tab children
            for (const tab of cell.component.props.tabs) {
              if (tab.children) {
                const found = findImmediateParent(childId, tab.children);
                if (found) {
                  return found;
                }
              }
            }
          }
          
          // Then search recursively within the cell component's children
          if (cell.component.props.children) {
            console.log('🔄 [findImmediateParent] Searching recursively in cell component children:', cell.component.id);
            const found = findImmediateParent(childId, cell.component.props.children);
            if (found) {
              console.log('✅ [findImmediateParent] Found in recursive search within cell:', cell.component.id);
              return found;
            }
          }
        }
      }
    }
    
    // Recursively search in tab containers
    if (component.type === 'tab-container' && component.props.tabs) {
      for (const tab of component.props.tabs) {
        if (tab.children) {
          const found = findImmediateParent(childId, tab.children);
          if (found) return found;
        }
      }
    }
  }
  
  return null;
};

const saveNestedComponentSettings = (updatedComponent) => {
  console.log('🔧 [saveNestedComponentSettings] Starting update process:', {
    componentId: updatedComponent?.id,
    componentType: updatedComponent?.type,
    hasSelectedNested: !!selectedNestedComponent.value
  });
  
  if (!updatedComponent || !selectedNestedComponent.value) {
    console.log('❌ [saveNestedComponentSettings] Early exit - missing component or selection');
    return;
  }
  
  // Find the immediate parent container 
  const parentContainer = findImmediateParent(updatedComponent.id);
  console.log('🔍 [saveNestedComponentSettings] Parent search result:', {
    parentFound: !!parentContainer,
    parentId: parentContainer?.id,
    parentType: parentContainer?.type
  });
  
  if (parentContainer) {
    console.log('🔄 [saveNestedComponentSettings] Checking parent container type and structure:', {
      hasChildren: !!parentContainer.props.children,
      hasCells: !!parentContainer.props.cells,
      hasTabs: !!parentContainer.props.tabs,
      childrenCount: parentContainer.props.children?.length || 0,
      cellsCount: parentContainer.props.cells?.length || 0,
      tabsCount: parentContainer.props.tabs?.length || 0
    });
    
    // Handle Form Section components (use children array)
    if (parentContainer.props.children && Array.isArray(parentContainer.props.children)) {
      console.log('📋 [saveNestedComponentSettings] Handling form-section/children pattern');
      const childIndex = parentContainer.props.children.findIndex(child => child.id === updatedComponent.id);
      console.log('🔍 [saveNestedComponentSettings] Child search in children array:', { childIndex, childrenLength: parentContainer.props.children.length });
      
      if (childIndex !== -1) {
        console.log('✅ [saveNestedComponentSettings] Found child in form-section, updating...');
        // Update the nested component
        parentContainer.props.children[childIndex] = { ...updatedComponent };
        
        // Also trigger updates on any parent containers above this one
        const grandParent = findImmediateParent(parentContainer.id);
        if (grandParent) {
          // Special handling for layout-grid grandparents to fix cell reference
          if (grandParent.type === 'layout-grid' && grandParent.props.cells) {
            const cellIndex = grandParent.props.cells.findIndex(cell => 
              cell.component && cell.component.id === parentContainer.id);
            if (cellIndex !== -1) {
              // Update the layout-grid cell to reference the updated parent container
              grandParent.props.cells[cellIndex].component = { ...parentContainer };
            }
          }
          formStore.updateComponent(grandParent);
        }
        
        formStore.updateComponent(parentContainer);
        return; // Exit early to prevent other handlers
      }
    }
    
    // Handle Layout Grid components (use cells array)
    if (parentContainer.props.cells && Array.isArray(parentContainer.props.cells)) {
      console.log('🎯 [saveNestedComponentSettings] Handling layout-grid pattern');
      console.log('🔍 [saveNestedComponentSettings] Searching in layout-grid cells:', {
        cellsCount: parentContainer.props.cells.length,
        searchingFor: updatedComponent.id,
        cells: parentContainer.props.cells.map((cell, idx) => ({
          cellIndex: idx,
          hasComponent: !!cell.component,
          componentId: cell.component?.id,
          componentType: cell.component?.type
        }))
      });
      
      for (let cellIndex = 0; cellIndex < parentContainer.props.cells.length; cellIndex++) {
        const cell = parentContainer.props.cells[cellIndex];
        if (cell.component && cell.component.id === updatedComponent.id) {
          console.log('✅ [saveNestedComponentSettings] Found component in layout-grid cell:', { cellIndex, componentId: cell.component.id });
          
          // Log the before/after comparison for layout properties
          console.log('🔄 [saveNestedComponentSettings] BEFORE update cell component:', {
            id: cell.component.id,
            type: cell.component.type,
            gridColumn: cell.component.props?.gridColumn,
            width: cell.component.props?.width,
            allProps: cell.component.props
          });
          
          console.log('🔄 [saveNestedComponentSettings] NEW component data:', {
            id: updatedComponent.id,
            type: updatedComponent.type,
            gridColumn: updatedComponent.props?.gridColumn,
            width: updatedComponent.props?.width,
            allProps: updatedComponent.props
          });
          
          // Update the component in the cell
          parentContainer.props.cells[cellIndex].component = { ...updatedComponent };
          
          console.log('🔄 [saveNestedComponentSettings] AFTER update cell component:', {
            id: parentContainer.props.cells[cellIndex].component.id,
            type: parentContainer.props.cells[cellIndex].component.type,
            gridColumn: parentContainer.props.cells[cellIndex].component.props?.gridColumn,
            width: parentContainer.props.cells[cellIndex].component.props?.width
          });
          
          // Force reactivity by creating a new cells array
          console.log('🔄 [saveNestedComponentSettings] Forcing reactivity with new cells array');
          parentContainer.props.cells = [...parentContainer.props.cells];
          
          // Also trigger updates on any parent containers above this one
          const grandParent = findImmediateParent(parentContainer.id);
          console.log('👴 [saveNestedComponentSettings] Grandparent search result:', {
            grandParentFound: !!grandParent,
            grandParentId: grandParent?.id,
            grandParentType: grandParent?.type
          });
          
          if (grandParent) {
            // Special handling for layout-grid grandparents to fix cell reference
            if (grandParent.type === 'layout-grid' && grandParent.props.cells) {
              console.log('🔧 [saveNestedComponentSettings] Handling layout-grid grandparent');
              const grandCellIndex = grandParent.props.cells.findIndex(cell => 
                cell.component && cell.component.id === parentContainer.id);
              console.log('🔍 [saveNestedComponentSettings] Grandparent cell search:', { grandCellIndex, parentId: parentContainer.id });
              
              if (grandCellIndex !== -1) {
                console.log('✅ [saveNestedComponentSettings] Updating grandparent layout-grid cell reference');
                // Update the grandparent layout-grid cell to reference the updated parent container
                grandParent.props.cells[grandCellIndex].component = { ...parentContainer };
              }
            }
            console.log('📢 [saveNestedComponentSettings] Updating grandparent in store:', grandParent.id);
            formStore.updateComponent(grandParent);
          }
          
          // Update the container to trigger reactivity
          console.log('📢 [saveNestedComponentSettings] Updating parent container in store:', parentContainer.id);
          formStore.updateComponent(parentContainer);
          console.log('✅ [saveNestedComponentSettings] Layout-grid update completed successfully');
          return; // Exit early to prevent other handlers
        }
      }
      console.log('❌ [saveNestedComponentSettings] Component not found in any layout-grid cells');
    }
    
    // Handle Tab Container components (use tabs array with children)
    if (parentContainer.props.tabs && Array.isArray(parentContainer.props.tabs)) {
      console.log('🏷️ [saveNestedComponentSettings] Handling tab-container pattern');
      // console.log('Updating in Tab Container');
      // console.log('Number of tabs:', parentContainer.props.tabs.length);
      
      for (let tabIndex = 0; tabIndex < parentContainer.props.tabs.length; tabIndex++) {
        const tab = parentContainer.props.tabs[tabIndex];
        // console.log(`Checking tab ${tabIndex}:`, tab.id, 'children count:', tab.children?.length || 0);
        
        if (tab.children && Array.isArray(tab.children)) {
          const childIndex = tab.children.findIndex(child => child.id === updatedComponent.id);
          // console.log(`Child index in tab ${tabIndex}:`, childIndex);
          
          if (childIndex !== -1) {
            
            // Update the nested component in the tab
            parentContainer.props.tabs[tabIndex].children[childIndex] = { ...updatedComponent };
            // Force reactivity by creating a new tabs array
            parentContainer.props.tabs = [...parentContainer.props.tabs];
            
            // Also trigger updates on any parent containers above this one
            const grandParent = findImmediateParent(parentContainer.id);
            if (grandParent) {
              // Special handling for layout-grid grandparents to fix cell reference
              if (grandParent.type === 'layout-grid' && grandParent.props.cells) {
                const cellIndex = grandParent.props.cells.findIndex(cell => 
                  cell.component && cell.component.id === parentContainer.id);
                if (cellIndex !== -1) {
                  // Update the layout-grid cell to reference the updated tab-container
                  grandParent.props.cells[cellIndex].component = { ...parentContainer };
                }
              }
              formStore.updateComponent(grandParent);
            }
            
            // Update the container to trigger reactivity
            formStore.updateComponent(parentContainer);
            return; // Exit early
          }
        }
      }
    }
  } else {
    console.log('❌ [saveNestedComponentSettings] No parent container found for component:', updatedComponent.id);
    console.log('🔍 [saveNestedComponentSettings] Available components in form store:', 
      formStore.formComponents.map(c => ({ id: c.id, type: c.type }))
    );
  }
  
  console.log('🏁 [saveNestedComponentSettings] Function completed');
  
  // Close the modal after a brief delay to ensure updates are processed
  nextTick(() => {
    closeNestedSettingsModal();
  });
};

// Button link functionality
const getButtonLink = () => {
  if (!props.component || props.component.type !== 'button') return null;
  
  const { linkType, linkUrl, linkProcessId, linkTarget, iframeDebug, iframeHideComplete, iframeTheme, iframeCustomParams } = props.component.props;
  
  if (linkType === 'url' && linkUrl) {
    return linkUrl;
  }
  
  if (linkType === 'process' && linkProcessId) {
    // Generate the process workflow URL with iframe parameters
    const baseUrl = `${window.location.origin}/workflow/${linkProcessId}`;
    const params = new URLSearchParams();
    
    // Add debug parameter (false = iframe mode, true = debug mode)
    if (iframeDebug !== undefined) {
      params.append('debug', iframeDebug ? 'true' : 'false');
    }
    
    // Add hideComplete parameter
    if (iframeHideComplete) {
      params.append('hideComplete', 'true');
    }
    
    // Add theme parameter
    if (iframeTheme) {
      params.append('theme', iframeTheme);
    }
    
    // Add custom parameters
    if (iframeCustomParams) {
      const customParams = new URLSearchParams(iframeCustomParams);
      customParams.forEach((value, key) => {
        params.append(key, value);
      });
    }
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
  
  return null;
};

// Custom button styling functions
const getCustomButtonStyles = (props) => {
  if (!props || props.variant !== 'custom') return {};
  
  const styles = {
    backgroundColor: props.customBackgroundColor || '#3b82f6',
    color: props.customTextColor || '#ffffff',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  };
  
  // Add border if specified
  if (props.customBorderColor && props.customBorderWidth) {
    styles.border = `${props.customBorderWidth}px solid ${props.customBorderColor}`;
  }
  
  // Add border radius
  if (props.customBorderRadius) {
    styles.borderRadius = `${props.customBorderRadius}px`;
  }
  
  // Add hover effects
  const hoverEffect = props.customHoverEffect;
  if (hoverEffect && hoverEffect !== 'none') {
    switch (hoverEffect) {
      case 'darken':
        styles[':hover'] = { filter: 'brightness(0.9)' };
        break;
      case 'lighten':
        styles[':hover'] = { filter: 'brightness(1.1)' };
        break;
      case 'scale':
        styles[':hover'] = { transform: 'scale(1.05)' };
        break;
      case 'glow':
        styles[':hover'] = { 
          boxShadow: `0 0 10px ${props.customBackgroundColor || '#3b82f6'}` 
        };
        break;
    }
  }
  
  return styles;
};

const getButtonSizeClass = (size) => {
  const sizeClasses = {
    'sm': 'px-3 py-1.5 text-sm',
    'md': 'px-4 py-2 text-sm',
    'lg': 'px-6 py-3 text-base'
  };
  return sizeClasses[size] || sizeClasses['md'];
};

// Custom HTML component helper methods
const getScopedCss = (component) => {
  const cssContent = component.props.cssContent || 
    // Fallback to default CSS from FormBuilderComponents.vue
    `.custom-component {
  padding: 20px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  text-align: center;
}

.custom-component h3 {
  color: #1e40af;
  margin-bottom: 10px;
}

.custom-component button {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.custom-component button:hover {
  background: #2563eb;
}`;
  
  const uniqueId = `custom-html-${component.id}`;
  
  // Add scope to CSS rules
  const scopedRules = cssContent.replace(
    /([^@{}]+)\s*{/g, 
    `#${uniqueId} $1 {`
  );
  
  return `<style scoped>
#${uniqueId} {
  /* Component container styles */
  position: relative;
}

${scopedRules}
</style>`;
};

const getSafeHtmlContent = (component) => {
  // Get HTML content from component props
  const htmlContent = component.props.htmlContent || 
    // Fallback to the default content from FormBuilderComponents.vue
    `<div class="custom-component">
  <h3>Custom HTML Component</h3>
  <p>Edit this HTML to create your custom design.</p>
  <button type="button">Click me!</button>
</div>`;
  
  const previewMode = component.props.previewMode || 'safe';
  
  if (previewMode === 'safe') {
    // Remove script tags and event handlers for safe mode
    let safeContent = htmlContent
      // Remove script tags completely
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove event handler attributes more carefully
      .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
      // Remove javascript: protocol
      .replace(/javascript:/gi, '');
    
    return safeContent;
  }
  return htmlContent;
};

// Execute custom JavaScript in a controlled environment
const executeCustomScript = (component) => {
  const jsContent = component.props.jsContent;
  const allowScripts = component.props.allowScripts !== false;
  const previewMode = component.props.previewMode || 'safe';
  
  if (!allowScripts || !jsContent || previewMode === 'safe') {
    return;
  }

  try {
    const uniqueId = `custom-html-${component.id}`;
    const element = document.getElementById(uniqueId);
    
    if (!element) {
      console.warn('Custom HTML element not found for script execution');
      return;
    }

    // Create a safe execution context
    const scriptContext = {
      element: element,
      console: console,
      
      // Helper functions for form interaction
      getValue: (fieldName) => {
        // Access form data from the form store
        return formStore.previewFormData ? formStore.previewFormData[fieldName] : undefined;
      },
      
      setValue: (fieldName, value) => {
        // Set form field value in the form store
        if (formStore.previewFormData) {
          formStore.previewFormData[fieldName] = value;
          // Also emit an event to notify the parent form about the change
          emit('form-data-updated', { fieldName, value });
        }
      },

      // Safe DOM methods
      querySelector: (selector) => element?.querySelector(selector),
      querySelectorAll: (selector) => element?.querySelectorAll(selector),
    };

    // Create function with custom context
    const scriptFunction = new Function('console', 'element', 'getValue', 'setValue', 'querySelector', 'querySelectorAll', jsContent);
    
    // Execute with controlled context
    scriptFunction.call(
      scriptContext,
      scriptContext.console,
      scriptContext.element,
      scriptContext.getValue,
      scriptContext.setValue,
      scriptContext.querySelector,
      scriptContext.querySelectorAll
    );
    
  } catch (error) {
    console.warn('Custom HTML script execution error:', error);
  }
};

// Watch for custom HTML components and execute their scripts
watch(() => props.component, (newComponent) => {
  if (newComponent && newComponent.type === 'customHtml') {
    nextTick(() => {
      executeCustomScript(newComponent);
    });
  }
}, { deep: true });

// Execute scripts for custom HTML components on mount
onMounted(() => {
  if (props.component && props.component.type === 'customHtml') {
    nextTick(() => {
      executeCustomScript(props.component);
    });
  }
});

// Custom Action Handlers for RepeatingTable
const handleTableCustomAction = ({ action, rowData, event }) => {
  // Emit to parent if needed
  emit('custom-action', { action, rowData, event })
}

const handleTableCustomNavigation = ({ action, url, rowData }) => {
  // Navigation is already handled by CustomActionButton
  // Emit to parent if additional handling is needed
  emit('custom-navigation', { action, url, rowData })
}
</script>

<style scoped>
.component-preview {
  width: 100%;
}

:deep(.formkit-label) {
  margin-bottom: 0.25rem;
}

:deep(.formkit-label-box) {
  font-weight: 400;
  margin-bottom: 0rem;
}

:deep(.formkit-wrapper) {
  margin-bottom: 0rem !important;
}

:deep(.formkit-options) {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 1rem !important;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.formkit-fieldset-box){
  padding: 0.25rem 0rem !important;
  border: 0px !important;
}

:deep(.formkit-option) {
  margin: 0 !important;
  flex: 0 0 auto;
}

/* Improve visibility of disabled inputs in the canvas view */
:deep(.canvas-component.formkit-disabled),
:deep(.canvas-component.formkit-disabled input),
:deep(.canvas-component.formkit-disabled select),
:deep(.canvas-component.formkit-disabled textarea) {
  opacity: 0.8 !important;
  pointer-events: none;
}

/* Readonly styles for select, checkbox, radio, switch, and quill components */
:deep(.readonly-select),
:deep(.readonly-checkbox),
:deep(.readonly-radio),
:deep(.readonly-switch),
:deep(.readonly-quill),
:deep(.readonly-date),
:deep(.readonly-time),
:deep(.readonly-datetime) {
  cursor: default !important;
}

:deep(.readonly-select select),
:deep(.readonly-select .formkit-inner),
:deep(.readonly-checkbox input[type="checkbox"]),
:deep(.readonly-radio input[type="radio"]),
:deep(.readonly-switch input[type="checkbox"]),
:deep(.readonly-date input[type="date"]),
:deep(.readonly-time input[type="time"]),
:deep(.readonly-datetime input[type="datetime-local"]) {
  pointer-events: none !important;
  opacity: 0.8 !important;
  background-color: #f3f4f6 !important;
}

:deep(.readonly-checkbox) .formkit-options,
:deep(.readonly-radio) .formkit-options,
:deep(.readonly-switch) .formkit-wrapper {
  pointer-events: none !important;
}

:deep(.readonly-checkbox) .formkit-wrapper,
:deep(.readonly-radio) .formkit-wrapper,
:deep(.readonly-switch) .formkit-wrapper {
  cursor: not-allowed !important;
}

/* Readonly styles for QuillEditor */
:deep(.readonly-quill) .ql-toolbar {
  pointer-events: none !important;
  opacity: 0.5 !important;
  background-color: #f3f4f6 !important;
}

:deep(.readonly-quill) .ql-container {
  background-color: #f3f4f6 !important;
  cursor: not-allowed !important;
}

:deep(.readonly-quill) .ql-editor {
  pointer-events: none !important;
  cursor: not-allowed !important;
}

/* Image Preview Component */
.image-preview-container {
  display: flex;
  flex-direction: column;
}

.image-container {
  display: flex;
  justify-content: center;
  border-radius: 0.375rem;
  overflow: hidden;
  max-width: 100%;
}

.image-container img {
  display: block;
  border-radius: 0.375rem;
  max-width: 100%;
}

.has-caption {
  padding-bottom: 0.5rem;
}

/* Repeating Group Component */
.repeating-groups {
  width: 100%;
}

.group-item {
  transition: all 0.2s ease-in-out;
}

/* .group-item:hover {
  border-color: #93c5fd;
} */

.repeating-group-container {
  transition: all 0.2s ease-in-out;
  min-height: 100px;
}

.repeating-group-container:hover {
  border-color: #93c5fd;
  background-color: #f0f9ff;
}

/* Nested Component Styles */
.nested-component {
  transition: all 0.2s ease-in-out;
  margin-bottom: 0.75rem;
}

.nested-component:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nested-component-actions {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.nested-component:hover .nested-component-actions {
  opacity: 1;
}

.draggable-children-container {
  min-height: 20px;
}

/* Ghost class for drag preview */
.ghost {
  opacity: 0.5;
  background: #c1d5db;
}

/* Form component styles for nested components */
.form-component {
  transition: all 0.2s ease-in-out;
}

/* .form-component:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */

.component-actions {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.form-component:hover .component-actions {
  opacity: 1;
}

/* Dynamic List Component */
.dynamic-list-container {
  width: 100%;
}

.list-items {
  width: 100%;
}

.repeating-table-wrapper{
  margin-bottom: 0.75rem !important;
  width: 100%;
  min-width: 0; /* Allow shrinking */
  overflow: hidden; /* Prevent table from breaking layout */
}

.table-container-wrapper {
  width: 100%;
  min-width: 0; /* Allow shrinking */
  /* This is where the horizontal scrolling happens */
}

/* Form Section Component */
.form-section-container {
  /* border-width: 1px; */
  border-width: 0px;
  border-style: solid;
  border-color: transparent;
  border-radius: 0.375rem;
  background-color: #ffffff;
}

.section-header {
  background-color: #FFFFFF !important;
  /* padding: 0.75rem 1rem; */
  padding: 0.25rem 0rem;
  margin: 0.75rem 0rem;
  margin-top: 0rem;
  border-bottom-width: 0px;
  border-bottom-style: solid;
  border-bottom-color: #e5e7eb;
  cursor: pointer;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.section-description {
  font-size: 0.875rem;
  color: #6b7280;
}

.collapse-icon {
  margin-left: auto;
}

.section-content {
  /* padding: 1rem 0rem; */
  padding: 0rem 0rem;
}

.section-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-width: 1px;
  border-style: dashed;
  border-color: #e5e7eb;
  border-radius: 0.375rem;
}

.placeholder-content {
  text-align: center;
}

.section-fields {
  padding: 0rem;
}

.empty-section-preview {
  border: 1px dashed #e5e7eb;
  border-radius: 0.375rem;
  background-color: #fafafa;
}

.section-drop-zone {
  padding: 1rem;
  min-height: 120px;
  border-radius: 0.75rem;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
}

/* Nesting restriction styles */
.section-drop-placeholder.cannot-accept {
  border-color: #fecaca !important;
  background-color: #fef2f2 !important;
}

.section-drop-placeholder.cannot-accept .nesting-restricted {
  display: block;
}

.section-drop-placeholder.cannot-accept .normal-placeholder {
  display: none;
}

.section-drop-placeholder:not(.cannot-accept) .nesting-restricted {
  display: none;
}

.section-drop-placeholder:not(.cannot-accept) .normal-placeholder {
  display: block;
}

.nested-components {
  width: 100%;
  min-height: 80px;
}

.form-component {
  transition: all 0.2s ease-in-out;
  margin-bottom: 0.25rem;
}

/* .form-component:hover {
  border-color: #93c5fd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */

.component-actions {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0 0.375rem 0 0.375rem;
  padding: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.form-component:hover .component-actions {
  opacity: 1;
}

/* Preview mode grid styles */
.repeating-groups .grid,
.section-fields .grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 0.75rem;
}

.repeating-groups .form-component,
.section-fields .form-component {
  width: 100%;
}

/* Mobile Responsiveness - Force single column layout on small screens */
@media (max-width: 767px) {
  /* Override grid template to single column with no horizontal gap */
  .section-fields .grid,
  .repeating-groups .grid {
    grid-template-columns: 1fr !important;
    column-gap: 0 !important;
  }
  
  /* Force all form components to span full width */
  .section-fields .form-component,
  .repeating-groups .form-component {
    grid-column: 1 / -1 !important;
  }
  
  /* Also override any inline grid-column styles on mobile */
  .section-fields .form-component[style*="grid-column"],
  .repeating-groups .form-component[style*="grid-column"] {
    grid-column: 1 / -1 !important;
  }
}

.component-actions:hover {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component-actions button {
  transition: all 0.15s ease-in-out;
}

.component-actions button:hover {
  transform: scale(1.1);
}

.drag-handle {
  cursor: move;
  opacity: 0.6;
}

.drag-handle:hover {
  opacity: 1;
}

.section-drop-placeholder {
  padding: 2rem;
  border-width: 1px;
  border-style: dashed;
  border-color: #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.section-drop-placeholder.empty {
  border-color: #e5e7eb;
  min-height: 120px;
  padding: 2rem;
}

.section-drop-placeholder:not(.empty) {
  border-color: #e5e7eb;
  min-height: 80px;
  padding: 1.5rem;
  border-style: dashed;
  background-color: #fafafa;
}

.section-drop-placeholder.drop-active {
  border-color: #3b82f6;
  background-color: #eff6ff;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.section-drop-placeholder.empty:hover {
  border-color: #9ca3af;
  background-color: #f8fafc;
}

.section-drop-placeholder:not(.empty):hover {
  border-color: #9ca3af;
  background-color: #f1f5f9;
}

.section-drop-placeholder.hidden-placeholder {
  border: none;
  background-color: transparent;
  padding: 0;
  min-height: 40px;
}

/* Tab Container Component */
.tab-container-wrapper {
  @apply w-full;
}

.tab-container {
  @apply w-full;
}

.tab-container.tabs-top {
  @apply flex flex-col;
}

.tab-container.tabs-bottom {
  @apply flex flex-col-reverse;
}

.tab-container.tabs-left {
  @apply flex flex-row;
}

.tab-container.tabs-right {
  @apply flex flex-row-reverse;
}

.tab-headers {
  @apply bg-white;
}

.tab-header {
  @apply cursor-pointer outline-none focus:outline-none;
}

.tab-header.active {
  @apply font-semibold;
}

.tab-add-button {
  @apply cursor-pointer outline-none focus:outline-none;
}

.tab-content {
  @apply bg-white;
  min-height: 12rem; /* 192px, equivalent to min-h-48 */
}

.tab-fields {
  @apply w-full;
}

.tab-drop-zone {
  @apply w-full;
}

.tab-drop-placeholder {
  @apply border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 transition-all duration-200;
  min-height: 120px;
}

.tab-drop-placeholder.empty {
  min-height: 8rem; /* 128px, equivalent to min-h-32 */
}

.tab-drop-placeholder.drop-active {
  @apply border-blue-400 bg-blue-50;
}
.tab-drop-placeholder.cannot-accept {
  @apply border-red-400 bg-red-50;
}

.tab-drop-placeholder:hover {
  @apply border-gray-400;
}

.empty-tab-preview {
  @apply text-center py-8 text-gray-400;
}

/* Ghost styles for dragging */
.ghost {
  opacity: 0.5;
  background-color: #dbeafe !important;
  border-color: #3b82f6 !important;
}

/* Custom button styles */
.custom-button {
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}

.custom-button:hover {
  transform: translateY(-1px);
}

.custom-button:active {
  transform: translateY(0);
}

.custom-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Layout Grid Styles */
.layout-grid-container {
  width: 100%;
}

.grid-container {
  display: grid;
  min-height: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.grid-container.is-preview {
  padding: 0;
  border: none;
  background: transparent;
}

.grid-cell {
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  padding: 8px;
  background-color: #fafafa;
  transition: all 0.2s ease-in-out;
  position: relative;
  min-height: auto;
  height: auto;
  display: flex;
  flex-direction: column;
}

.grid-cell.is-preview {
  border: none;
  padding: 0;
  background: transparent;
}

.grid-cell.cell-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-color: #e5e7eb;
}

.grid-cell.cell-occupied {
  background-color: #ffffff;
  border-color: #d1d5db;
}

.grid-cell.cell-highlighted {
  border-color: #3b82f6;
  background-color: #eff6ff;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.grid-cell.cell-drag-over {
  border-color: #10b981;
  background-color: #ecfdf5;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.cell-empty-state {
  @apply flex flex-col items-center justify-center text-center;
  min-height: 30px;
  padding: 4px;
}

.cell-empty-preview {
  display: none;
}

.component-preview {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Ensure components inside grid cells are compact */
.grid-cell .component-preview > div {
  margin: 0 !important;
  padding: 0 !important;
}

.grid-cell .component-preview .py-2 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.grid-cell .component-preview .mb-2 {
  margin-bottom: 0.25rem !important;
}

.grid-cell .component-preview .mt-2 {
  margin-top: 0.25rem !important;
}

.component-actions {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
  display: flex;
  gap: 4px;
}

/* Layout-grid component grid wrapper styling */
.component-grid-wrapper {
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.component-preview:hover .component-actions {
  opacity: 1;
}

.component-actions button {
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

.component-actions button:hover {
  transform: scale(1.1);
}

/* Custom button hover effects */
.custom-button[data-hover-effect="darken"]:hover {
  filter: brightness(0.9);
}

.custom-button[data-hover-effect="lighten"]:hover {
  filter: brightness(1.1);
}

.custom-button[data-hover-effect="scale"]:hover {
  transform: scale(1.05) translateY(-1px);
}

.custom-button[data-hover-effect="glow"]:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

/* Table Loading State Styles */
.table-loading-state {
  @apply border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm w-full;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.loading-header {
  @apply p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200;
}

.loading-title {
  @apply text-lg font-semibold text-gray-800 leading-tight mb-1;
}

.loading-subtitle {
  @apply text-sm text-gray-600 leading-relaxed;
}

.loading-table {
  @apply p-4;
}

.loading-row {
  @apply flex gap-4 mb-3;
}

.loading-header-row {
  @apply border-b border-gray-200 pb-3 mb-4;
}

.loading-cell {
  @apply flex-1 h-6 bg-gray-200 rounded animate-pulse;
  min-width: 80px;
}

.loading-header-row .loading-cell {
  @apply h-4 bg-gray-300;
}

/* Custom HTML Component Styles */
.custom-html-wrapper {
  width: 100%;
}

.custom-html-content {
  min-height: 40px;
  position: relative;
}

.custom-html-content.readonly-mode {
  pointer-events: auto; /* Allow interactions in readonly mode for custom HTML */
}

.custom-html-content.safe-mode {
  /* Safe mode styles */
  position: relative;
}

.custom-html-content.advanced-mode {
  /* Advanced mode styles */
  position: relative;
}

/* Prevent layout issues with custom HTML */
.custom-html-content :deep(*) {
  max-width: 100%;
  box-sizing: border-box;
}

/* Ensure images are responsive */
.custom-html-content :deep(img) {
  max-width: 100%;
  height: auto;
}

/* Prevent custom HTML from breaking out of container */
.custom-html-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* Layout Grid Component Styles */
.layout-grid-wrapper {
  @apply w-full;
}

.layout-grid-container {
  @apply w-full;
}

.grid-container {
  @apply w-full border border-gray-200 rounded-lg bg-gray-50 p-4;
  min-height: 200px;
  transition: all 0.2s ease;
}

.grid-container.is-preview {
  @apply border-gray-100 bg-transparent p-0;
  min-height: auto;
}

.grid-cell {
  @apply relative border-2 border-dashed border-gray-300 rounded-md bg-white transition-all duration-200;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-cell.cell-empty {
  @apply border-gray-300 bg-transparent;
}

.grid-cell.cell-occupied {
  @apply border-gray-200 bg-white;
}

.grid-cell.cell-highlighted {
  @apply border-blue-400 bg-blue-50;
}

.grid-cell.cell-drag-over {
  @apply border-blue-500 bg-blue-100;
}

.grid-cell:hover {
  @apply border-gray-400 bg-gray-50;
}

.cell-empty-state {
  @apply w-full h-full flex items-center justify-center;
  color: #9ca3af;
}

.nesting-restricted-cell {
  @apply w-full h-full;
}

.nesting-restricted-cell .nesting-restricted-cell {
  display: block;
}

.nesting-restricted-cell .normal-empty-cell {
  display: none;
}

.normal-empty-cell .nesting-restricted-cell {
  display: none;
}

.normal-empty-cell .normal-empty-cell {
  display: block;
}

.cell-empty-preview {
  @apply w-full h-full;
}

/* Component actions in grid cells */
.grid-cell .component-actions {
  @apply absolute top-1 right-1 z-10;
}

.grid-cell .component-actions button {
  @apply p-1 text-gray-400 hover:text-blue-600 rounded transition-colors;
}

.grid-cell .component-actions button:hover {
  @apply bg-blue-50;
}

/* Submit Button Styles */
:deep(.formkit-submit-button) {
  /* Ensure submit buttons are properly recognized by FormKit */
  cursor: pointer;
}

/* Custom submit button styling */
.formkit-submit-button.custom-button {
  /* Custom submit button specific styles */
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.formkit-submit-button.custom-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.formkit-submit-button.custom-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

/* Form Builder Tab Container Styling - Enhanced Padding & Spacing */
.tab-container-wrapper {
  padding: 0rem 0rem;
}

.tab-container .tab-headers {
  gap: 0.25rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.tab-container .tab-header {
  padding: 0.75rem 1.25rem !important;
  margin-right: 0.125rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-container .tab-header:hover {
  background-color: #f8fafc;
}

.tab-container .tab-header.active {
  padding: 0.75rem 1.25rem !important;
  border-bottom: 2px solid #3b82f6;
  color: #3b82f6;
}

.tab-container .tab-content {
  padding: 0rem 1rem;
  padding-bottom: 0rem;
  min-height: 200px;
}

/* Enhanced spacing for nested components in tabs */
.tab-container .tab-content .form-component {
  margin-bottom: 1rem;
}

.tab-container .tab-content .form-component:last-child {
  margin-bottom: 0;
}
</style>