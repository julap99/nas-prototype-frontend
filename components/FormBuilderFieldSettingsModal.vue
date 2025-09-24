<template>
  <RsModal v-model="isOpen" :title="modalTitle" size="xl" position="center" @close="handleClose">
    <template #body>
      <div v-if="component" class="field-settings-modal">
        <!-- Component Info Header -->
        <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4 mb-6">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <Icon :name="getComponentIcon(component.type)" class="w-8 h-8 text-blue-600" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-medium text-gray-900">
                {{ getComponentTypeName(component.type) }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ getComponentDescription(component.type) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Settings Tabs -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button v-for="tab in availableTabs" :key="tab.id"
              @click="activeTab = tab.id"
              class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap" :class="activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
              <Icon :name="tab.icon" class="w-4 h-4 inline mr-2" />
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Basic Settings Tab -->
          <div v-if="activeTab === 'basic'" class="space-y-6">
            <!-- Essential Settings Section -->
            <div class="settings-section">
              <div class="section-header">
                <h4 class="section-title">
                  <Icon name="heroicons:identification" class="w-5 h-5 mr-2" />
                  Essential Settings
                </h4>
                <p class="section-description">Basic information and identification for this field</p>
              </div>

              <div class="section-content">
                <!-- Field Type Changer -->
                <div v-if="availableTypeChanges.length > 0" class="type-changer-section">
                  <FormKit type="select" label="Field Type" name="fieldType" :modelValue="component.type"
                    @input="handleTypeChange" :options="[
                      { label: getComponentTypeName(component.type), value: component.type, disabled: true },
                      ...availableTypeChanges.map(type => ({
                        label: `Change to ${getComponentTypeName(type)}`,
                        value: type
                      }))
                    ]" help="Change this field to a similar compatible type" :classes="{ outer: 'field-wrapper' }" />

                  <!-- Change Preview -->
                  <div v-if="showTypeChangePreview" class="type-change-preview">
                    <div class="preview-header">
                      <Icon name="heroicons:arrow-right" class="w-4 h-4 text-blue-600" />
                      <span class="text-sm font-medium text-gray-700">Preview Change</span>
                    </div>
                    <div class="preview-content">
                      <div class="preview-item">
                        <span class="preview-label">From:</span>
                        <span class="preview-value">{{ getComponentTypeName(component.type) }}</span>
                      </div>
                      <div class="preview-item">
                        <span class="preview-label">To:</span>
                        <span class="preview-value">{{ getComponentTypeName(pendingTypeChange) }}</span>
                      </div>
                      <div class="preview-item">
                        <span class="preview-label">Preserved:</span>
                        <span class="preview-value">{{ getPreservedProperties(component.type,
                          pendingTypeChange).join(',') }}</span>
                      </div>
                    </div>
                    <div class="preview-actions">
                      <RsButton @click="confirmTypeChange" variant="primary" size="sm">
                        <Icon name="heroicons:check" class="w-4 h-4 mr-1" />
                        Confirm Change
                      </RsButton>
                      <RsButton @click="cancelTypeChange" variant="secondary" size="sm">
                        <Icon name="heroicons:x-mark" class="w-4 h-4 mr-1" />
                        Cancel
                      </RsButton>
                    </div>
                  </div>
                </div>

                <!-- Heading-specific Essential Settings -->
                <template v-if="component.type === 'heading'">
                  <FormKit type="text" label="Heading Text" name="value" v-model="configModel.value"
                    help="The heading text that will be displayed" :classes="{ outer: 'field-wrapper' }"
                    placeholder="e.g., Personal Information, Contact Details" validation="required" />

                  <FormKit type="select" label="Heading Level" name="level" v-model="configModel.level" :options="[
                    { label: 'Please select...', value: '' },
                    { label: 'Heading 1 (Largest)', value: 1 },
                    { label: 'Heading 2 (Large)', value: 2 },
                    { label: 'Heading 3 (Medium)', value: 3 },
                    { label: 'Heading 4 (Small)', value: 4 },
                    { label: 'Heading 5 (Smaller)', value: 5 },
                    { label: 'Heading 6 (Smallest)', value: 6 }
                  ]" help="Choose the size and importance of this heading" :classes="{ outer: 'field-wrapper' }" />

                  <FormKit type="select" label="Text Alignment" name="textAlign" v-model="configModel.textAlign" :options="[
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                    { label: 'Justify', value: 'justify' }
                  ]" help="Choose the text alignment for this heading" :classes="{ outer: 'field-wrapper' }" />
                </template>

                <!-- Paragraph-specific Essential Settings -->
                <template v-else-if="component.type === 'paragraph'">
                  <FormKit type="textarea" label="Paragraph Text" name="value" v-model="configModel.value"
                    help="The text content that will be displayed" :classes="{ outer: 'field-wrapper' }"
                    placeholder="Enter your paragraph text here..." validation="required" rows="4" />
                </template>

                <!-- Info Display-specific Essential Settings -->
                <template v-else-if="component.type === 'info-display'">
                  <div class="space-y-4">
                    <FormKit type="text" label="Component Title" name="title" v-model="configModel.title"
                      help="Title displayed at the top of the information display" :classes="{ outer: 'field-wrapper' }"
                      placeholder="e.g., User Information, Contact Details" />

                    <FormKit type="text" label="Component Name (Internal)" name="name" v-model="configModel.name"
                      help="Used internally to identify this component" validation="required|alpha_numeric"
                      :classes="{ outer: 'field-wrapper' }" placeholder="e.g., user_info, contact_details" />

                    <FormKit type="text" label="Component Label" name="label" v-model="configModel.label"
                      help="Label displayed above the component (optional)" :classes="{ outer: 'field-wrapper' }"
                      placeholder="e.g., User Information Section" />

                    <FormKit type="textarea" label="Help Text" name="help" v-model="configModel.help"
                      help="Additional information or instructions for users" :classes="{ outer: 'field-wrapper' }"
                      placeholder="e.g., This section displays your profile information" rows="2" />

                    <FormKit type="select" label="Layout Style" name="layout" v-model="configModel.layout" :options="[
                      { label: 'Please select...', value: '' },
                      { label: 'Vertical (Label above value)', value: 'vertical' },
                      { label: 'Horizontal (Label: Value)', value: 'horizontal' },
                      { label: 'Grid (2 columns)', value: 'grid' },
                      { label: 'Side by Side (2 columns)', value: 'side-by-side' }
                    ]" help="How to display the information fields" :classes="{ outer: 'field-wrapper' }" />
                  </div>
                </template>

                <!-- Standard form field Essential Settings -->
                <template v-else>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit v-if="showField('label') && component.type !== 'button'" type="text" label="Field Label"
                      name="label" v-model="configModel.label" help="What users will see above this field"
                      :classes="{ outer: 'field-wrapper' }" placeholder="e.g., Full Name, Email Address" />

                    <!-- Button Text (instead of label for buttons) -->
                    <FormKit v-if="component.type === 'button'" type="text" label="Button Text" name="label"
                      v-model="configModel.label" help="Text displayed on the button"
                      :classes="{ outer: 'field-wrapper' }" placeholder="e.g., Submit, Save, Continue" />

                    <FormKit v-if="showField('name')" type="text" label="Field Name (Internal)" name="name"
                      v-model="configModel.name" help="Used internally to identify this field"
                      validation="required|alpha_numeric" :classes="{ outer: 'field-wrapper' }"
                      placeholder="e.g., full_name, email_address" />
                  </div>

                  <FormKit v-if="showField('placeholder')" type="text" label="Placeholder Text" name="placeholder"
                    v-model="configModel.placeholder" help="Hint text shown inside the empty field"
                    :classes="{ outer: 'field-wrapper' }" placeholder="e.g., Enter your email address..." />

                  <FormKit v-if="showField('help')" type="textarea" label="Help Text" name="help"
                    v-model="configModel.help" help="Additional instructions or guidance for users"
                    :classes="{ outer: 'field-wrapper' }"
                    placeholder="e.g., We'll use this to send you updates about your order" rows="2" />

                  <!-- Default Value Field -->
                  <FormKit v-if="showDefaultValueField()" :type="getDefaultValueFieldType()" label="Default Value"
                    name="defaultValue" v-model="configModel.defaultValue" :help="getDefaultValueHelp()"
                    :classes="{ outer: 'field-wrapper' }" :placeholder="getDefaultValuePlaceholder()"
                    :options="component.type === 'select' || component.type === 'radio' || component.type === 'checkbox' ? configModel.options : undefined"
                    :rows="component.type === 'textarea' ? 2 : undefined" />

                  <FormKit v-if="showField('rows')" type="number" label="Number of Rows" name="rows"
                    v-model="configModel.rows" help="Number of visible text lines in the textarea"
                    :classes="{ outer: 'field-wrapper' }" placeholder="3" min="1" max="20" />

                  <FormKit v-if="showField('readonly')" type="switch" label="Read Only" name="readonly"
                    v-model="configModel.readonly" help="Users cannot edit this field value"
                    :classes="{ outer: 'field-wrapper' }" />
                </template>
              </div>
            </div>


            <!-- Component-Specific Settings -->
            <div v-if="hasSpecificSettings" class="settings-section">
              <div class="section-header">
                <h4 class="section-title">
                  <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 mr-2" />
                  {{ getComponentTypeName(component.type) }} Settings
                </h4>
                <p class="section-description">Settings specific to this type of field</p>
              </div>

              <div class="section-content">
                <!-- Text Input Specific -->
                <template v-if="component.type === 'mask'">
                  <FormKit type="text" label="Input Mask Pattern" name="mask" v-model="configModel.mask"
                    help="Pattern for formatting input (e.g., ###-###-#### for phone)"
                    :classes="{ outer: 'field-wrapper' }" placeholder="###-###-####" />
                  <div class="mask-examples">
                    <p class="text-sm font-medium text-gray-700 mb-2">Common patterns:</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      <RsButton @click="configModel.mask = '###-###-####'" variant="secondary-outline" size="sm">
                        Phone: ###-###-####
                      </RsButton>
                      <RsButton @click="configModel.mask = '##/##/####'" variant="secondary-outline" size="sm">
                        Date: ##/##/####
                      </RsButton>
                      <RsButton @click="configModel.mask = 'AA-####'" variant="secondary-outline" size="sm">
                        Code: AA-####
                      </RsButton>
                      <RsButton @click="configModel.mask = '#### #### #### ####'" variant="secondary-outline" size="sm">
                        Credit Card: #### #### #### ####
                      </RsButton>
                    </div>
                  </div>
                </template>

                <!-- OTP Specific -->
                <template v-if="component.type === 'otp'">
                  <FormKit type="range" label="Number of Digits" name="digits" v-model="configModel.digits"
                    help="How many digits for the verification code" :min="4" :max="8" :step="1"
                    :classes="{ outer: 'field-wrapper' }" />
                  <div class="text-center mt-2">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-200 bg-white text-blue-800">
                      {{ configModel.digits || 6 }} digits
                    </span>
                  </div>
                </template>

                <!-- QuillEditor Specific -->
                <template v-if="component.type === 'quillEditor'">
                  <div class="space-y-6">
                    <!-- Editor Configuration -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="material-symbols:edit-document" class="w-4 h-4 mr-2" />
                        Editor Configuration
                      </h5>
                      
                      <!-- Toolbar Configuration -->
                      <FormKit type="select" label="Toolbar Style" name="toolbar" v-model="configModel.toolbar"
                        help="Choose the toolbar complexity level"
                        :classes="{ outer: 'field-wrapper' }"
                        :options="[
                          { label: 'Minimal (Bold, Italic, Link)', value: 'minimal' },
                          { label: 'Essential (Recommended)', value: 'essential' },
                          { label: 'Full (All Features)', value: 'full' }
                        ]" />

                      <!-- Content Type -->
                      <FormKit type="select" label="Content Type" name="contentType" v-model="configModel.contentType"
                        help="Format for storing the content"
                        :classes="{ outer: 'field-wrapper' }"
                        :options="[
                          { label: 'HTML (Rich formatting)', value: 'html' },
                          { label: 'Plain Text (No formatting)', value: 'text' }
                        ]" />
                    </div>

                    <!-- Toolbar Preview -->
                    <div class="border border-gray-200 bg-gray-50 rounded-lg p-4">
                      <h6 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <Icon name="material-symbols:preview" class="w-4 h-4 mr-2" />
                        Available Formatting Options
                      </h6>
                      
                      <!-- Minimal Toolbar -->
                      <div v-if="configModel.toolbar === 'minimal'" class="space-y-3">
                        <div class="text-xs font-medium text-gray-700 mb-2">✨ Minimal Toolbar (3 options):</div>
                        <div class="grid grid-cols-1 gap-2 text-xs">
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded font-bold">B</span>
                            <span class="text-gray-600">Bold text</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded italic">I</span>
                            <span class="text-gray-600">Italic text</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded text-blue-600">🔗</span>
                            <span class="text-gray-600">Insert links</span>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500 italic">Perfect for simple text formatting</div>
                      </div>
                      
                      <!-- Essential Toolbar -->
                      <div v-else-if="configModel.toolbar === 'essential'" class="space-y-3">
                        <div class="text-xs font-medium text-gray-700 mb-2">⭐ Essential Toolbar (8 options):</div>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded font-bold">B</span>
                            <span class="text-gray-600">Bold text</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded italic">I</span>
                            <span class="text-gray-600">Italic text</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded underline">U</span>
                            <span class="text-gray-600">Underline text</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded">❝❞</span>
                            <span class="text-gray-600">Quote blocks</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded font-mono">&lt;/&gt;</span>
                            <span class="text-gray-600">Code blocks</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded">• 1.</span>
                            <span class="text-gray-600">Lists (bullet/numbered)</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded text-blue-600">🔗</span>
                            <span class="text-gray-600">Insert links</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2 py-1 bg-white border rounded">🧹</span>
                            <span class="text-gray-600">Clear formatting</span>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500 italic">Recommended for most content creation needs</div>
                      </div>
                      
                      <!-- Full Toolbar -->
                      <div v-else-if="configModel.toolbar === 'full'" class="space-y-3">
                        <div class="text-xs font-medium text-gray-700 mb-2">🚀 Full Toolbar (15+ options):</div>
                        <div class="space-y-2">
                          <div class="text-xs text-gray-600 font-medium">Basic Formatting:</div>
                          <div class="grid grid-cols-2 gap-1 text-xs ml-2">
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded font-bold text-xs">B</span>
                              <span class="text-gray-600">Bold</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded italic text-xs">I</span>
                              <span class="text-gray-600">Italic</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded underline text-xs">U</span>
                              <span class="text-gray-600">Underline</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded line-through text-xs">S</span>
                              <span class="text-gray-600">Strikethrough</span>
                            </div>
                          </div>
                          
                          <div class="text-xs text-gray-600 font-medium mt-2">Structure & Layout:</div>
                          <div class="grid grid-cols-2 gap-1 text-xs ml-2">
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded font-bold text-xs">H1</span>
                              <span class="text-gray-600">Large heading</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded font-semibold text-xs">H2</span>
                              <span class="text-gray-600">Medium heading</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-xs">• 1.</span>
                              <span class="text-gray-600">Lists & indents</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-xs">⬅️⬜➡️</span>
                              <span class="text-gray-600">Text alignment</span>
                            </div>
                          </div>
                          
                          <div class="text-xs text-gray-600 font-medium mt-2">Advanced Features:</div>
                          <div class="grid grid-cols-2 gap-1 text-xs ml-2">
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-xs">🎨</span>
                              <span class="text-gray-600">Text & background colors</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-xs">📏</span>
                              <span class="text-gray-600">Font sizes</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-blue-600 text-xs">🔗</span>
                              <span class="text-gray-600">Insert links</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <span class="inline-flex items-center px-1.5 py-0.5 bg-white border rounded text-xs">🖼️</span>
                              <span class="text-gray-600">Insert images</span>
                            </div>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500 italic">Complete feature set for professional content creation</div>
                      </div>
                    </div>

                    <!-- Usage Tips -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-start">
                        <Icon name="material-symbols:lightbulb" class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div class="text-sm text-blue-800">
                          <h6 class="font-medium mb-1">QuillEditor Tips</h6>
                          <ul class="space-y-1 text-xs">
                            <li>• <strong>Essential toolbar</strong> is perfect for most content creation needs</li>
                            <li>• <strong>HTML content type</strong> preserves formatting when saving</li>
                            <li>• Content is automatically validated and sanitized for security</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- File Upload Specific -->
                <template v-if="component.type === 'dropzone'">
                  <div class="grid grid-cols-2 gap-4">
                    <FormKit type="text" label="Accepted File Types" name="accept" v-model="configModel.accept"
                      help="File types allowed (e.g., image/*, .pdf)" :classes="{ outer: 'field-wrapper' }"
                      placeholder="image/*,.pdf,.doc" />

                    <FormKit type="number" label="Max File Size (MB)" name="maxSize" v-model="configModel.maxSizeMB"
                      help="Maximum size per file in megabytes" :classes="{ outer: 'field-wrapper' }" placeholder="5" />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <FormKit type="number" label="Max Number of Files" name="maxFiles" v-model="configModel.maxFiles"
                      help="Maximum number of files allowed" :classes="{ outer: 'field-wrapper' }" :min="1"
                      placeholder="5" />

                    <FormKit type="switch" label="Allow Multiple Files" name="multiple" v-model="configModel.multiple"
                      help="Enable uploading multiple files at once" :classes="{ outer: 'field-wrapper' }" />
                  </div>
                </template>

                <!-- Custom File Upload Specific -->
                <template v-if="component.type === 'customFileUpload'">
                  <div class="space-y-4">
                    <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Upload Configuration</h5>
                    
                    <!-- Button Customization -->
                    <FormKit type="text" label="Button Label" name="buttonLabel" v-model="configModel.buttonLabel"
                      help="Text displayed on the upload button" :classes="{ outer: 'field-wrapper' }"
                      placeholder="Choose Files" />
                    
                    <!-- File Type & Multiple Settings -->  
                    <div class="grid grid-cols-2 gap-4">
                      <FormKit type="text" label="Accepted File Types" name="accept" v-model="configModel.accept"
                        help="File types allowed - see examples below" :classes="{ outer: 'field-wrapper' }"
                        placeholder="*/*" />
                        
                      <FormKit type="switch" label="Allow Multiple Files" name="multiple" v-model="configModel.multiple"
                        help="Enable selecting multiple files at once" :classes="{ outer: 'field-wrapper' }" />
                    </div>
                    
                    <!-- File type examples -->
                    <div class="file-type-examples">
                      <p class="text-sm font-medium text-gray-700 mb-2">Common file type patterns:</p>
                      <div class="grid grid-cols-2 gap-2 text-xs">
                        <RsButton @click="configModel.accept = 'image/*'" variant="secondary-outline" size="sm">
                          Images: image/*
                        </RsButton>
                        <RsButton @click="configModel.accept = '.pdf,.doc,.docx'" variant="secondary-outline" size="sm">
                          Documents: .pdf,.doc,.docx
                        </RsButton>
                        <RsButton @click="configModel.accept = '.jpg,.jpeg,.png,.gif'" variant="secondary-outline" size="sm">
                          Images: .jpg,.jpeg,.png,.gif
                        </RsButton>
                        <RsButton @click="configModel.accept = '.csv,.xlsx,.xls'" variant="secondary-outline" size="sm">
                          Spreadsheets: .csv,.xlsx,.xls
                        </RsButton>
                        <RsButton @click="configModel.accept = 'video/*'" variant="secondary-outline" size="sm">
                          Videos: video/*
                        </RsButton>
                        <RsButton @click="configModel.accept = 'audio/*'" variant="secondary-outline" size="sm">
                          Audio: audio/*
                        </RsButton>
                        <RsButton @click="configModel.accept = '.zip,.rar,.7z'" variant="secondary-outline" size="sm">
                          Archives: .zip,.rar,.7z
                        </RsButton>
                        <RsButton @click="configModel.accept = '*/*'" variant="secondary-outline" size="sm">
                          All Files: */*
                        </RsButton>
                      </div>
                      <div class="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                        <strong>Tips:</strong> Use MIME types (image/*, video/*) or file extensions (.pdf, .jpg). 
                        Separate multiple types with commas (,).
                      </div>
                    </div>
                    
                    <!-- Size & Count Limits -->
                    <div class="grid grid-cols-2 gap-4">
                      <FormKit type="number" label="Max File Size (MB)" name="maxSizeMB" v-model="configModelMaxSizeMB"
                        help="Maximum size per file in megabytes" :classes="{ outer: 'field-wrapper' }"
                        placeholder="10" :min="0.1" :step="0.1" />
                        
                      <FormKit type="number" label="Max Files" name="maxFiles" v-model="configModel.maxFiles"
                        help="Maximum number of files (when multiple enabled)" :classes="{ outer: 'field-wrapper' }"
                        placeholder="5" :min="1" />
                    </div>
                    
                    <!-- Display Options -->
                    <h6 class="text-sm font-medium text-gray-700 border-b pb-2 mt-4">Display Options</h6>
                    <div class="grid grid-cols-2 gap-4">
                      <FormKit type="text" label="Uploaded Files Text" name="uploadedFilesText" 
                        v-model="configModel.uploadedFilesText"
                        help="Custom label for the uploaded files section" :classes="{ outer: 'field-wrapper' }" 
                        placeholder="Uploaded Files" />
                        
                      <FormKit type="switch" label="Show File Count" name="showFileCount" 
                        v-model="configModel.showFileCount"
                        help="Display file count next to uploaded files text" :classes="{ outer: 'field-wrapper' }" />
                    </div>
                    
                    <!-- Additional Options -->
                    <div class="grid grid-cols-2 gap-4 mt-4">
                      <FormKit type="switch" label="Show File Restrictions" name="showRestrictions" 
                        v-model="configModel.showRestrictions"
                        help="Display file type/size restrictions below button" :classes="{ outer: 'field-wrapper' }" />
                        
                      <FormKit type="switch" label="Allow File Download" name="allowDownload" 
                        v-model="configModel.allowDownload"
                        help="Enable download buttons for uploaded files" :classes="{ outer: 'field-wrapper' }" />
                    </div>
                  </div>
                </template>

                <!-- Range Slider Specific -->
                <template v-if="component.type === 'range'">
                  <div class="grid grid-cols-3 gap-4">
                    <FormKit type="number" label="Minimum Value" name="min" v-model="configModel.min"
                      help="Lowest value allowed" :classes="{ outer: 'field-wrapper' }" />

                    <FormKit type="number" label="Maximum Value" name="max" v-model="configModel.max"
                      help="Highest value allowed" :classes="{ outer: 'field-wrapper' }" />

                    <FormKit type="number" label="Step Size" name="step" v-model="configModel.step"
                      help="Increment between values" :classes="{ outer: 'field-wrapper' }" :min="0.01" :step="0.01" />
                  </div>
                </template>

                <!-- Button Configuration -->
                <template v-if="component.type === 'button'">
                  <!-- Button Behavior Section -->
                  <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4 mb-4">
                    <div class="flex items-center mb-3">
                      <Icon name="material-symbols:touch-app" class="w-5 h-5 text-blue-600 mr-2" />
                      <h3 class="text-sm font-medium text-blue-800">Button Behavior</h3>
                    </div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="select" label="Button Type" name="buttonType" v-model="configModel.buttonType"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: '🔵 Button (Regular)', value: 'button' },
                            { label: '✅ Submit (Form Submit)', value: 'submit' },
                            { label: '🔄 Reset (Clear Form)', value: 'reset' }
                          ]" help="Choose the button behavior" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="select" label="Button Action" name="action" v-model="currentActionType"
                          :options="[
                            { label: 'No Action', value: 'none' },
                            { label: 'Submit Form', value: 'submit' },
                            { label: 'Open Modal', value: 'open-modal' },
                            { label: 'Close Modal', value: 'close-modal' },
                            { label: 'Navigate to URL', value: 'url' },
                            { label: 'Navigate to Process', value: 'process' },
                            { label: 'Custom JavaScript', value: 'javascript' }
                          ]" help="What action should this button perform?" :classes="{ outer: 'field-wrapper' }"
                          @input="handleActionTypeChange" />
                      </div>

                      <!-- Target Modal Selection -->
                      <FormKit v-if="currentActionType === 'open-modal'" type="select" label="Target Modal"
                        name="targetModal" v-model="configModel.targetModal" :options="getModalOptions()"
                        help="Which modal should this button open?" :classes="{ outer: 'field-wrapper' }" />
                        
                      <!-- URL Navigation Settings -->
                      <div v-if="currentActionType === 'url'" class="space-y-3">
                        <FormKit type="text" label="URL" name="linkUrl" v-model="configModel.linkUrl"
                          help="Enter the URL to navigate to when button is clicked" 
                          :classes="{ outer: 'field-wrapper' }"
                          placeholder="https://example.com" validation="url" />

                        <FormKit type="select" label="Open In" name="linkTarget" v-model="configModel.linkTarget"
                          :options="[
                            { label: 'Same Window', value: '_self' },
                            { label: 'New Window/Tab', value: '_blank' }
                          ]" help="Choose how the link should open" :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <!-- Process Navigation Settings -->
                      <div v-if="currentActionType === 'process'" class="space-y-3">
                        <div class="field-wrapper">
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            Select Process
                          </label>
                          <ProcessBrowser 
                            :model-value="configModel.linkProcessId"
                            @update:model-value="(value) => { console.log('Process selected:', value); configModel.linkProcessId = value; }"
                            :show-preview="true"
                            placeholder="Search for a process..."
                          />
                          <div class="text-xs text-gray-500 mt-1">
                            Choose a published process to link to
                          </div>
                        </div>

                        <FormKit type="select" label="Open In" name="linkTarget" v-model="configModel.linkTarget"
                          :options="[
                            { label: 'Same Window', value: '_self' },
                            { label: 'New Window/Tab', value: '_blank' }
                          ]" help="Choose how the link should open" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                      
                      <!-- Custom JavaScript Settings -->
                      <div v-if="currentActionType === 'javascript'" class="space-y-3">
                        <div class="mb-3">
                          <div class="mb-2 text-xs text-gray-600">
                            <strong>Available functions:</strong> getField(), setField(), setFieldByLabel(),
                            getFieldOptions(), showField(), hideField(), enableField(), disableField(), showSuccess(), 
                            showError(), showInfo(), showWarning(), showConfirm(), showToast()
                          </div>
                          <textarea v-model="configModel.onClick"
                            class="w-full h-32 font-mono text-sm p-2 border border-gray-300 rounded"
                            placeholder="// Write your JavaScript code here
// Example:
showSuccess('Button clicked!');
console.log('Form data:', getField('fieldName'));"></textarea>
                        </div>
                        
                        <!-- Quick Templates -->
                        <div class="flex flex-wrap gap-2">
                          <button @click="insertButtonScriptTemplate('validation')"
                            class="text-xs px-2 py-1 bg-white text-blue-700 border border-gray-200 rounded hover:bg-gray-50">
                            Insert Validation Example
                          </button>
                          <button @click="insertButtonScriptTemplate('calculation')"
                            class="text-xs px-2 py-1 bg-white text-blue-700 border border-gray-200 rounded hover:bg-gray-50">
                            Insert Calculation Example
                          </button>
                          <button @click="insertButtonScriptTemplate('toggle')"
                            class="text-xs px-2 py-1 bg-white text-blue-700 border border-gray-200 rounded hover:bg-gray-50">
                            Insert Toggle Fields Example
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Visual Appearance Section -->
                  <div class="border border-gray-200 border-t-4 border-t-purple-500 bg-white rounded-lg p-4 mb-4">
                    <div class="flex items-center mb-3">
                      <Icon name="material-symbols:palette" class="w-5 h-5 text-purple-600 mr-2" />
                      <h3 class="text-sm font-medium text-purple-800">Visual Appearance</h3>
                    </div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="select" label="Button Style" name="variant" v-model="configModel.variant"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Primary (Blue)', value: 'primary' },
                            { label: 'Secondary (Gray)', value: 'secondary' },
                            { label: 'Success (Green)', value: 'success' },
                            { label: 'Danger (Red)', value: 'danger' },
                            { label: 'Warning (Orange)', value: 'warning' },
                            { label: 'Custom Color', value: 'custom' }
                          ]" help="Visual appearance of the button" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="select" label="Button Size" name="size" v-model="configModel.size" :options="[
                          { label: 'Please select...', value: '' },
                          { label: 'Small', value: 'sm' },
                          { label: 'Medium', value: 'md' },
                          { label: 'Large', value: 'lg' }
                        ]" help="Size of the button" :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="select" label="Horizontal Position" name="position" v-model="configModel.position"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Left', value: 'left' },
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' }
                          ]" help="Choose where the button appears horizontally" :classes="{ outer: 'field-wrapper' }" />
                          
                        <FormKit type="select" label="Vertical Alignment" name="verticalAlign" v-model="configModel.verticalAlign"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Top', value: 'top' },
                            { label: 'Center', value: 'center' },
                            { label: 'Bottom', value: 'bottom' }
                          ]" help="Choose how the button aligns vertically with adjacent fields" :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <div class="field-wrapper">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Icon (Optional)</label>
                        <IconBrowser v-model="configModel.icon" size="compact" :show-preview="false"
                          placeholder="Search Material Design icons..." />
                        <div class="text-xs text-gray-600 mt-1">
                          Icon displayed on the button
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Custom Color Section -->
                  <div v-if="configModel.variant === 'custom'"
                    class="border border-gray-200 border-t-4 border-t-orange-500 bg-white rounded-lg p-4 mb-4">
                    <div class="flex items-center mb-3">
                      <Icon name="material-symbols:color-lens" class="w-5 h-5 text-orange-600 mr-2" />
                      <h3 class="text-sm font-medium text-orange-800">Custom Color Settings</h3>
                    </div>
                    <div class="space-y-3">

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="color" label="Background Color" name="customBackgroundColor"
                          v-model="configModel.customBackgroundColor" help="Choose the button background color"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="color" label="Text Color" name="customTextColor"
                          v-model="configModel.customTextColor" help="Choose the button text color"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="color" label="Border Color" name="customBorderColor"
                          v-model="configModel.customBorderColor" help="Choose the button border color"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="number" label="Border Width (px)" name="customBorderWidth"
                          v-model="configModel.customBorderWidth" help="Set the border width in pixels"
                          :classes="{ outer: 'field-wrapper' }" :min="0" :max="10" placeholder="2" />
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="number" label="Border Radius (px)" name="customBorderRadius"
                          v-model="configModel.customBorderRadius" help="Set the corner roundness in pixels"
                          :classes="{ outer: 'field-wrapper' }" :min="0" :max="50" placeholder="6" />

                        <FormKit type="select" label="Hover Effect" name="customHoverEffect"
                          v-model="configModel.customHoverEffect" :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'None', value: 'none' },
                            { label: 'Darken', value: 'darken' },
                            { label: 'Lighten', value: 'lighten' },
                            { label: 'Scale', value: 'scale' },
                            { label: 'Glow', value: 'glow' }
                          ]" help="Choose hover animation effect" :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <!-- Color Preview -->
                      <div class="mt-4 p-3 border border-gray-200 border-l-4 border-l-blue-400 bg-white rounded-lg">
                        <h6 class="text-sm font-medium text-gray-700 mb-2">Color Preview</h6>
                        <div class="flex items-center space-x-3">
                          <button class="px-4 py-2 rounded font-medium transition-all duration-200"
                            :style="getCustomButtonStyles()" disabled>
                            {{ configModel.buttonText || configModel.label || 'Button Preview' }}
                          </button>
                          <div class="text-xs text-gray-600">
                            <div>Background: {{ configModel.customBackgroundColor || '#3b82f6' }}</div>
                            <div>Text: {{ configModel.customTextColor || '#ffffff' }}</div>
                            <div>Border: {{ configModel.customBorderColor || 'transparent' }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </template>

                <!-- Dynamic List Configuration -->
                <template v-if="component.type === 'dynamic-list'">
                  <div class="space-y-8">

                    <!-- Basic List Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="heroicons:list-bullet" class="w-4 h-4 mr-2" />
                        Basic List Settings
                      </h5>
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="text" label="Add Button Text" name="buttonText" v-model="configModel.buttonText"
                          help="Text for the add item button" :classes="{ outer: 'field-wrapper' }"
                          placeholder="Add Item" />

                        <FormKit type="select" label="Item Type" name="itemType" v-model="configModel.itemType"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Text', value: 'text' },
                            { label: 'Number', value: 'number' },
                            { label: 'Email', value: 'email' },
                            { label: 'URL', value: 'url' }
                          ]" help="Type of data for list items" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Item Limits -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <Icon name="heroicons:chart-bar" class="w-4 h-4 mr-2" />
                        Item Limits
                      </h5>
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="number" label="Minimum Items" name="minItems" v-model="configModel.minItems"
                          help="Minimum number of items required" :classes="{ outer: 'field-wrapper' }" :min="0"
                          placeholder="0" />

                        <FormKit type="number" label="Maximum Items" name="maxItems" v-model="configModel.maxItems"
                          help="Maximum number of items allowed" :classes="{ outer: 'field-wrapper' }" :min="1"
                          placeholder="10" />
                      </div>
                    </div>

                    <!-- Item Validation -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-purple-800 mb-3 flex items-center">
                        <Icon name="heroicons:shield-check" class="w-4 h-4 mr-2" />
                        Item Validation
                      </h5>
                      <FormKit type="text" label="Item Validation Rules" name="itemValidation"
                        v-model="configModel.itemValidation"
                        help="Validation rules for individual items (e.g., 'required|min:3|max:50')"
                        :classes="{ outer: 'field-wrapper' }" placeholder="required|min:3" />
                    </div>

                    <!-- Behavior Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-green-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-amber-800 mb-3 flex items-center">
                        <Icon name="heroicons:cog-6-tooth" class="w-4 h-4 mr-2" />
                        Behavior Settings
                      </h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Allow Duplicates" name="allowDuplicates"
                          v-model="configModel.allowDuplicates" help="Allow duplicate items in the list"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Enable Sorting" name="enableSorting"
                          v-model="configModel.enableSorting" help="Allow drag & drop reordering"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Enable Search" name="enableSearch"
                          v-model="configModel.enableSearch" help="Add search/filter functionality"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Show Item Counter" name="showItemCounter"
                          v-model="configModel.showItemCounter" help="Display current item count"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Confirm Delete" name="confirmDelete"
                          v-model="configModel.confirmDelete" help="Require confirmation before deleting"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Bulk Operations" name="bulkOperations"
                          v-model="configModel.bulkOperations" help="Enable bulk select/delete operations"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Import/Export Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-amber-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-pink-800 mb-3 flex items-center">
                        <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 mr-2" />
                        Import/Export Settings
                      </h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Enable Import" name="importEnabled"
                          v-model="configModel.importEnabled" help="Allow importing items from files"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="select" label="Export Format" name="exportFormat"
                          v-model="configModel.exportFormat" :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'JSON', value: 'json' },
                            { label: 'CSV', value: 'csv' },
                            { label: 'Text', value: 'txt' }
                          ]" help="Default format for exporting items" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Default Items -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
                        <Icon name="heroicons:document-plus" class="w-4 h-4 mr-2" />
                        Default Items
                      </h5>

                      <div class="bg-white border border-indigo-200 rounded-lg p-4 space-y-3">
                        <div v-for="(item, index) in (configModel.defaultItems || [])" :key="index"
                          class="flex items-center">
                          <input type="text" v-model="configModel.defaultItems[index]"
                            class="flex-1 border border-indigo-200 rounded px-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                            placeholder="Enter default item" />
                          <button @click="removeDefaultItem(index)"
                            class="ml-3 text-red-500 hover:text-red-700 p-2 rounded hover:bg-gray-50 transition-colors"
                            type="button" title="Remove item">
                            <Icon name="material-symbols:delete-outline" class="w-4 h-4" />
                          </button>
                        </div>
                        <button @click="addDefaultItem"
                          class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center p-2 rounded hover:bg-gray-50 transition-colors"
                          type="button">
                          <Icon name="material-symbols:add-circle-outline" class="w-4 h-4 mr-1" />
                          Add Default Item
                        </button>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Data Table Configuration -->
                <template v-if="component.type === 'repeating-table'">
                  <div class="space-y-8">

                    <!-- Table Limits Section -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="heroicons:chart-bar" class="w-4 h-4 mr-2" />
                        Table Limits & Pagination
                      </h5>
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="number" label="Minimum Records" name="minRecords"
                          v-model="configModel.minRecords" help="Minimum number of records required"
                          :classes="{ outer: 'field-wrapper' }" :min="0" placeholder="0" />

                        <FormKit type="number" label="Maximum Records" name="maxRecords"
                          v-model="configModel.maxRecords" help="Maximum number of records allowed"
                          :classes="{ outer: 'field-wrapper' }" :min="1" placeholder="50" />

                        <div class="space-y-3">
                          <FormKit type="select" label="Results Per Page" name="rowsPerPagePreset"
                            :modelValue="getRowsPerPagePreset(configModel.rowsPerPage)"
                            @update:model-value="handleRowsPerPagePresetChange"
                            help="Choose a preset or set custom number of rows per page"
                            :classes="{ outer: 'field-wrapper' }"
                            :options="[
                              { label: '1 row per page', value: 1 },
                              { label: '5 rows per page', value: 5 },
                              { label: '10 rows per page (Default)', value: 10 },
                              { label: '15 rows per page', value: 15 },
                              { label: '20 rows per page', value: 20 },
                              { label: '25 rows per page', value: 25 },
                              { label: '50 rows per page', value: 50 },
                              { label: '100 rows per page', value: 100 },
                              { label: 'Show all (No pagination)', value: 0 },
                              { label: 'Custom...', value: 'custom' }
                            ]" />
                          
                          <!-- Custom Input Field -->
                          <FormKit v-if="isCustomRowsPerPage" type="number" label="Custom Rows Per Page" name="rowsPerPage"
                            v-model="configModel.rowsPerPage" help="Enter any number from 1 to 500"
                            :classes="{ outer: 'field-wrapper' }" :min="1" :max="500" placeholder="Enter number..." />


                        </div>

                        <FormKit type="checkbox" label="Hide Pagination" name="hidePagination"
                          v-model="configModel.hidePagination" help="Hide pagination controls even when there are many rows"
                          :classes="{ outer: 'field-wrapper' }" />
                          
                        <!-- Pagination Options Configuration -->
                        <FormKit type="textarea" label="Available Pagination Options" name="pageSizeOptionsText"
                          v-model="configModel.pageSizeOptionsText" 
                          help="Comma-separated list of pagination options users can choose from (e.g., 1,10,25,50,100). Leave empty for default options."
                          :classes="{ outer: 'field-wrapper' }"
                          placeholder="1,5,10,25,50,100"
                          rows="2" />
                      </div>
                      
                      <!-- Pagination Preview -->
                      <div class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <h6 class="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Icon name="material-symbols:preview" class="w-4 h-4 mr-2" />
                          Pagination Preview
                        </h6>
                        
                        <!-- Available Options Preview -->
                        <div v-if="configModel.pageSizeOptions && configModel.pageSizeOptions.length > 0" class="mb-3 p-2 bg-white border border-gray-200 rounded">
                          <div class="text-xs font-medium text-gray-600 mb-1">Available Options:</div>
                          <div class="flex flex-wrap gap-1">
                            <span v-for="option in configModel.pageSizeOptions" :key="option" 
                              class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                              :class="option === (configModel.rowsPerPage || 10) ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-700'">
                              {{ option === 0 ? 'Show all' : option }}
                              <span v-if="option === (configModel.rowsPerPage || 10)" class="ml-1">✓</span>
                            </span>
                          </div>
                        </div>
                        <div class="text-xs text-gray-600">
                          <div v-if="configModel.rowsPerPage === 0" class="flex items-center space-x-2">
                            <Icon name="material-symbols:view-list" class="w-4 h-4 text-green-600" />
                            <span><strong>All records visible</strong> - No pagination controls will be shown</span>
                          </div>
                          <div v-else-if="configModel.hidePagination" class="flex items-center space-x-2">
                            <Icon name="material-symbols:visibility-off" class="w-4 h-4 text-orange-600" />
                            <span><strong>{{ configModel.rowsPerPage }} rows shown</strong> - Pagination controls hidden</span>
                          </div>
                          <div v-else class="space-y-1">
                            <div class="flex items-center space-x-2">
                              <Icon name="material-symbols:table-rows" class="w-4 h-4 text-blue-600" />
                              <span><strong>{{ configModel.rowsPerPage || 10 }} rows per page</strong> - Users can navigate between pages</span>
                              <span v-if="isCustomRowsPerPage" class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Custom</span>
                            </div>
                            <div class="flex items-center space-x-2 ml-6 text-gray-500">
                              <span>Example: 25 records = {{ Math.ceil(25 / (configModel.rowsPerPage || 10)) }} pages</span>
                            </div>
                            <div v-if="configModel.rowsPerPage === 1" class="flex items-center space-x-2 ml-6 text-blue-600">
                              <Icon name="material-symbols:info" class="w-3 h-3" />
                              <span class="text-xs">One record per page - great for detailed forms or reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Button Customization Section -->
                    <div class="border border-gray-200 border-t-4 border-t-green-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
                        Button Customization
                      </h5>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormKit type="text" label="Add Button Text" name="buttonText" v-model="configModel.buttonText"
                          help="Text for the add record button" :classes="{ outer: 'field-wrapper' }"
                          placeholder="Add Record" />

                        <FormKit type="text" label="Edit Button Text" name="editText" v-model="configModel.editText"
                          help="Text for the edit button" :classes="{ outer: 'field-wrapper' }" placeholder="Edit" />

                        <FormKit type="text" label="Delete Button Text" name="deleteText"
                          v-model="configModel.deleteText" help="Text for the delete button"
                          :classes="{ outer: 'field-wrapper' }" placeholder="Delete" />
                      </div>
                    </div>

                    <!-- Table Behavior Section -->
                    <div class="border border-gray-200 border-t-4 border-t-purple-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-purple-800 mb-3 flex items-center">
                        <Icon name="heroicons:cog-6-tooth" class="w-4 h-4 mr-2" />
                        Table Behavior
                      </h5>

                      <!-- Display Options -->
                      <div class="mb-4">
                        <h6 class="text-xs font-medium text-purple-700 mb-2 uppercase tracking-wide">Display Options
                        </h6>
                        <div class="grid grid-cols-2 gap-3">
                          <FormKit type="switch" label="Show Row Numbers" name="showRowNumbers"
                            v-model="configModel.showRowNumbers" help="Display row numbers in the table"
                            :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" label="Hide Record Count" name="hideRecordCount"
                            v-model="configModel.hideRecordCount" help="Hide the record count display (e.g., '2 records / 50 max')"
                            :classes="{ outer: 'field-wrapper' }" />
                        </div>
                        <div class="grid grid-cols-2 gap-3 mt-3">
                          <FormKit type="switch" label="Enable Search" name="enableSearch"
                            v-model="configModel.enableSearch" help="Add search functionality to the table"
                            :classes="{ outer: 'field-wrapper' }" />
                        </div>
                      </div>

                      <!-- Edit & Delete Permissions -->
                      <div class="mb-4">
                        <h6 class="text-xs font-medium text-purple-700 mb-2 uppercase tracking-wide">Edit & Delete
                          Permissions</h6>
                        <div class="grid grid-cols-2 gap-3">
                          <FormKit type="switch" label="Allow Edit" name="allowEdit" v-model="configModel.allowEdit"
                            help="Allow editing existing records" :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" label="Edit Readonly" name="editReadonly"
                            v-model="configModel.editReadonly" help="Make edit button view-only (readonly mode)"
                            :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" 
                            label="Inline Cell Editing" name="enableInlineEditing" v-model="configModel.enableInlineEditing"
                            help="Edit cells directly instead of modal popup" :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" label="Allow Delete" name="allowDelete"
                            v-model="configModel.allowDelete" help="Allow deleting records"
                            :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" label="Confirm Delete" name="confirmDelete"
                            v-model="configModel.confirmDelete" help="Require confirmation before deleting"
                            :classes="{ outer: 'field-wrapper' }" />
                        </div>
                      </div>

                      <!-- Advanced Options -->
                      <div>
                        <h6 class="text-xs font-medium text-purple-700 mb-2 uppercase tracking-wide">Advanced Options
                        </h6>
                        <div class="grid grid-cols-2 gap-3">
                          <FormKit type="switch" label="Hide Add Button" name="hideAddButton"
                            v-model="configModel.hideAddButton" help="Hide the add record button completely"
                            :classes="{ outer: 'field-wrapper' }" />
                          <FormKit type="switch" label="Enable Export" name="enableExport"
                            v-model="configModel.enableExport" help="Allow exporting table data"
                            :classes="{ outer: 'field-wrapper' }" />
                        </div>
                      </div>
                    </div>

                    <!-- Table Columns Management -->
                    <div class="border border-gray-200 border-t-4 border-t-orange-500 bg-white rounded-lg p-4">
                      <div class="flex justify-between items-center mb-4">
                        <h5 class="text-sm font-semibold text-orange-800 flex items-center">
                          <Icon name="heroicons:table-cells" class="w-4 h-4 mr-2" />
                          Table Columns
                        </h5>
                        <RsButton @click="addTableColumn" variant="primary" size="sm">
                          <Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
                          Add Column
                        </RsButton>
                      </div>

                      <div class="space-y-4">
                        <div v-for="(column, index) in (configModel.columns || [])" :key="index"
                          class="border bg-gray-50 p-4 rounded-lg shadow-sm">
                          <div class="flex justify-between items-center mb-4">
                            <h4 class="font-medium text-sm text-orange-800 border border-gray-200 bg-white px-2 py-1 rounded">Column {{
                              index
                              + 1 }}</h4>
                            <button @click="removeTableColumn(index)"
                              class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-gray-50 transition-colors"
                              type="button" title="Remove column">
                              <Icon name="material-symbols:delete-outline" class="w-4 h-4" />
                            </button>
                          </div>

                          <!-- Basic Column Properties -->
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <FormKit type="text" label="Column Name" v-model="column.name"
                              placeholder="e.g., name, email, phone" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Column Label" v-model="column.label"
                              placeholder="e.g., Name, Email, Phone" :classes="{ outer: 'field-wrapper' }" />
                          </div>

                          <!-- Column Configuration -->
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <FormKit type="select" label="Column Type" v-model="column.type" :options="[
                              { label: 'Text', value: 'text' },
                              { label: 'Number', value: 'number' },
                              { label: 'Email', value: 'email' },
                              { label: 'Phone', value: 'tel' },
                              { label: 'Date', value: 'date' },
                              { label: 'Time', value: 'time' },
                              { label: 'URL', value: 'url' },
                              { label: 'Select', value: 'select' },
                              { label: 'Checkbox', value: 'checkbox' },
                              { label: 'Radio', value: 'radio' },
                              { label: 'Text Area', value: 'textarea' },
                              { label: 'Custom HTML', value: 'custom-html' }
                            ]" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Placeholder" v-model="column.placeholder"
                              placeholder="Enter placeholder text" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Validation Rules" v-model="column.validation"
                              placeholder="e.g., required|email" :classes="{ outer: 'field-wrapper' }" />
                          </div>

                          <!-- Required Field Toggle -->
                          <div class="mb-4">
                            <label
                              class="flex items-center p-3 border border-gray-200 border-l-4 border-l-green-400 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                              <input type="checkbox" v-model="column.required"
                                class="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                              <span class="text-sm font-medium text-gray-700">Required Field</span>
                            </label>
                          </div>

                          <!-- Column Visibility and Editing Controls -->
                          <div class="mb-4 space-y-3">
                            <!-- Hide from Table Toggle -->
                            <div>
                              <label
                                class="flex items-center p-3 border border-gray-200 border-l-4 border-l-blue-400 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" v-model="column.hideFromTable"
                                  class="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <div class="flex-1">
                                  <span class="text-sm font-medium text-gray-700">Hide Column from Table</span>
                                  <div class="text-xs text-gray-500 mt-1 flex items-center">
                                    <Icon name="heroicons:information-circle" class="w-3 h-3 mr-1" />
                                    Hidden columns are still available in Custom HTML templates as {{column.name}}
                                  </div>
                                </div>
                              </label>
                            </div>
                            
                            <!-- Allow Inline Editing Toggle -->
                            <div>
                              <label
                                class="flex items-center p-3 border border-gray-200 border-l-4 border-l-indigo-400 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" v-model="column.allowInlineEdit"
                                  class="mr-3 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                <div class="flex-1">
                                  <span class="text-sm font-medium text-gray-700">Allow Inline Editing</span>
                                  <div class="text-xs text-gray-500 mt-1 flex items-center">
                                    <Icon name="heroicons:pencil-square" class="w-3 h-3 mr-1" />
                                    When enabled, users can edit this column directly in the table
                                  </div>
                                </div>
                              </label>
                            </div>
                            
                            <!-- Always Editable Toggle -->
                            <div>
                              <label
                                class="flex items-center p-3 border border-gray-200 border-l-4 border-l-green-400 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" v-model="column.alwaysEditable"
                                  class="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                                <div class="flex-1">
                                  <span class="text-sm font-medium text-gray-700">Always Editable</span>
                                  <div class="text-xs text-gray-500 mt-1 flex items-center">
                                    <Icon name="heroicons:bolt" class="w-3 h-3 mr-1" />
                                    Column is instantly editable without entering edit mode
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>

                          <!-- Custom HTML Template Configuration -->
                          <div v-if="column.type === 'custom-html'" class="mt-4">
                            <div class="border border-purple-200 border-l-4 border-l-purple-500 bg-purple-50 rounded-lg p-4">
                              <h6 class="text-sm font-medium text-purple-800 mb-3 flex items-center">
                                <Icon name="heroicons:code-bracket" class="w-4 h-4 mr-2" />
                                HTML Template Configuration
                              </h6>
                              
                              <div class="space-y-4">
                                <!-- HTML Template Editor -->
                                <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                    HTML Template
                                  </label>
                                  <RsCodeMirror
                                    v-model="column.htmlTemplate"
                                    :options="{
                                      mode: 'htmlmixed',
                                      theme: 'default',
                                      lineNumbers: true,
                                      lineWrapping: true,
                                      autoCloseBrackets: true,
                                      autoCloseTags: true,
                                      matchBrackets: true,
                                      matchTags: true,
                                      indentUnit: 2,
                                      tabSize: 2
                                    }"
                                    class="html-template-editor border border-gray-300 rounded-md"
                                    placeholder="<!-- Enter your HTML template here -->
<div class='custom-column-content'>
  <span class='text-blue-600'>{{name}}</span>
  <small class='text-gray-500'>Row {{rowIndex}}</small>
</div>"
                                  />
                                  <p class="text-xs text-gray-600 mt-1">
                                    Use template variables like {{name}}, {{email}}, {{rowIndex}} to display dynamic content
                                  </p>
                                </div>
                                
                                <!-- Safety Options -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label class="flex items-center text-sm">
                                      <input 
                                        type="checkbox" 
                                        v-model="column.allowScripts"
                                        class="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                      Allow JavaScript
                                    </label>
                                    <p class="text-xs text-gray-500 ml-6">⚠️ Only enable if you trust the HTML source</p>
                                  </div>
                                  
                                  <div>
                                    <label class="flex items-center text-sm">
                                      <input 
                                        type="checkbox" 
                                        v-model="column.sanitizeHtml"
                                        class="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                      Sanitize HTML
                                    </label>
                                    <p class="text-xs text-gray-500 ml-6">🛡️ Remove potentially harmful content</p>
                                  </div>
                                </div>
                                
                                <!-- Template Examples -->
                                <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Quick Templates
                                  </label>
                                  <div class="flex flex-wrap gap-2">
                                    <button 
                                      type="button"
                                      @click="column.htmlTemplate = '<span class=&quot;px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium&quot;>{{status}}</span>'"
                                      class="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                      Status Badge
                                    </button>
                                    <button 
                                      type="button"
                                      @click="column.htmlTemplate = '<a href=&quot;mailto:{{email}}&quot; class=&quot;text-blue-600 hover:underline&quot;>{{email}}</a>'"
                                      class="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                      Email Link
                                    </button>
                                    <button 
                                      type="button"
                                      @click="column.htmlTemplate = '<div class=&quot;flex items-center space-x-2&quot;><button class=&quot;px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600&quot; onclick=&quot;alert(&quot;Edit row {{rowIndex}}&quot;)&quot;>Edit</button><button class=&quot;px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600&quot; onclick=&quot;alert(&quot;Delete row {{rowIndex}}&quot;)&quot;>Delete</button></div>'"
                                      class="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                      Action Buttons
                                    </button>
                                    <button 
                                      type="button"
                                      @click="column.htmlTemplate = '<div class=&quot;w-full bg-gray-200 rounded-full h-2&quot;><div class=&quot;bg-blue-600 h-2 rounded-full&quot; style=&quot;width: {{progress}}%&quot;></div></div><div class=&quot;text-xs text-gray-600 mt-1&quot;>{{progress}}%</div>'"
                                      class="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                      Progress Bar
                                    </button>
                                  </div>
                                </div>
                                
                                <!-- Preview -->
                                <div v-if="column.htmlTemplate" class="border-t border-gray-200 pt-4">
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Preview (sample data)
                                  </label>
                                  <div 
                                    class="p-3 bg-gray-50 border border-gray-200 rounded"
                                    v-html="getCustomHtmlPreview(column.htmlTemplate)"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Options for select, checkbox, and radio types -->
                          <div v-if="column.type === 'select' || column.type === 'checkbox' || column.type === 'radio'" class="mt-4">
                            <div class="flex justify-between items-center mb-2">
                              <h6 class="text-sm font-medium text-gray-700">
                                {{ column.type === 'checkbox' ? 'Checkbox Options' : 
                                   column.type === 'radio' ? 'Radio Options' : 'Select Options' }}
                              </h6>
                              <button @click="addColumnOption(index)" class="text-blue-600 hover:text-blue-800 text-sm"
                                type="button">
                                <Icon name="heroicons:plus" class="w-3 h-3 mr-1" />
                                Add Option
                              </button>
                            </div>

                            <div class="space-y-2">
                              <div v-for="(option, optionIndex) in (column.options || [])" :key="optionIndex"
                                class="flex items-center space-x-2">
                                <input type="text" v-model="option.label" placeholder="Option label"
                                  class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                                <input type="text" v-model="option.value" placeholder="Option value"
                                  class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                                <button @click="removeColumnOption(index, optionIndex)"
                                  class="text-red-500 hover:text-red-700" type="button">
                                  <Icon name="material-symbols:delete-outline" class="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Sample Data Section -->
                    <div class="border border-gray-200 border-t-4 border-t-indigo-500 bg-white rounded-lg p-4">
                      <div class="flex justify-between items-center mb-4">
                        <h5 class="text-sm font-semibold text-purple-800 flex items-center">
                          <Icon name="heroicons:document-text" class="w-4 h-4 mr-2" />
                          Sample Data
                        </h5>
                        <div class="flex gap-2">
                          <RsButton @click="addSampleDataRow" variant="success" size="sm">
                            <Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
                            Add Row
                          </RsButton>
                          <RsButton v-if="(configModel.defaultData || []).length > 0" @click="clearAllSampleData" variant="danger-outline" size="sm">
                            <Icon name="heroicons:trash" class="w-4 h-4 mr-1" />
                            Clear All
                          </RsButton>
                        </div>
                      </div>

                      <div v-if="!configModel.columns || configModel.columns.length === 0" class="text-center py-8 text-gray-500">
                        <Icon name="heroicons:table-cells" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p class="text-sm">Add table columns first to configure sample data</p>
                      </div>

                      <div v-else-if="!configModel.defaultData || configModel.defaultData.length === 0" class="text-center py-8 text-gray-500">
                        <Icon name="heroicons:document-plus" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p class="text-sm mb-2">No sample data added yet</p>
                        <p class="text-xs text-gray-400">Add sample rows to pre-populate your datatable with realistic data</p>
                      </div>

                      <div v-else class="sample-data-container">
                        <!-- Sample Data Table Header -->
                        <div class="sample-data-table">
                          <div class="sample-row sample-header">
                            <div class="row-controls-header">#</div>
                            <div 
                              v-for="column in configModel.columns" 
                              :key="column.name"
                              class="sample-cell header-cell"
                            >
                              <div class="header-content">
                                <span class="column-name">{{ column.label || column.name }}</span>
                                <span class="column-type">({{ column.type }})</span>
                              </div>
                            </div>
                            <div class="row-controls-header">Actions</div>
                          </div>

                          <!-- Sample Data Rows -->
                          <div 
                            v-for="(row, rowIndex) in configModel.defaultData" 
                            :key="rowIndex"
                            class="sample-row"
                          >
                            <div class="row-number">{{ rowIndex + 1 }}</div>
                            
                            <div 
                              v-for="column in configModel.columns" 
                              :key="column.name"
                              class="sample-cell"
                            >
                              <!-- Dynamic input based on column type -->
                              
                              <!-- Native Checkbox for better table rendering -->
                              <div v-if="getSampleInputType(column) === 'native-checkbox'" class="checkbox-container">
                                <!-- Single Boolean Checkbox -->
                                <div v-if="!column.options || column.options.length === 0">
                                  <label class="inline-flex items-center">
                                    <input 
                                      type="checkbox" 
                                      v-model="row[column.name]" 
                                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                  </label>
                                </div>
                                
                                <!-- Multiple Checkbox Options -->
                                <div v-else class="space-y-1 max-h-24 overflow-y-auto">
                                  <div v-for="option in column.options" :key="option.value" class="flex items-center">
                                    <label class="inline-flex items-center text-xs">
                                      <input 
                                        type="checkbox" 
                                        :value="option.value"
                                        :checked="Array.isArray(row[column.name]) && row[column.name].includes(option.value)"
                                        @change="toggleCheckboxOption(row, column.name, option.value)"
                                        class="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                      <span class="ml-1 text-gray-700">{{ option.label }}</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              
                              <!-- Native Radio Buttons for better table rendering -->
                              <div v-else-if="getSampleInputType(column) === 'native-radio'" class="radio-container">
                                <div class="space-y-1 max-h-24 overflow-y-auto">
                                  <div v-for="option in column.options" :key="option.value" class="flex items-center">
                                    <label class="inline-flex items-center text-xs">
                                      <input 
                                        type="radio" 
                                        :value="option.value"
                                        v-model="row[column.name]"
                                        :name="`${column.name}_${rowIndex}`"
                                        class="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      />
                                      <span class="ml-1 text-gray-700">{{ option.label }}</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              
                              <!-- FormKit for other input types -->
                              <FormKit 
                                v-else
                                :type="getSampleInputType(column)"
                                v-model="row[column.name]"
                                :options="column.options"
                                :placeholder="getSampleInputPlaceholder(column)"
                                :classes="{ outer: 'sample-field-wrapper' }"
                                :validation="false"
                              />
                            </div>
                            
                            <div class="row-controls">
                              <button 
                                @click="removeSampleDataRow(rowIndex)"
                                class="remove-row-btn"
                                type="button" 
                                title="Remove this row"
                              >
                                <Icon name="heroicons:x-mark" class="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Custom Actions Management -->
                    <div class="border border-gray-200 border-t-4 border-t-indigo-500 bg-white rounded-lg p-4">
                      <div class="flex justify-between items-center mb-4">
                        <h5 class="text-sm font-semibold text-indigo-800 flex items-center">
                          <Icon name="heroicons:bolt" class="w-4 h-4 mr-2" />
                          Custom Actions
                        </h5>
                        <RsButton @click="addCustomAction" variant="primary" size="sm">
                          <Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
                          Add Action
                        </RsButton>
                      </div>
                      <p class="text-xs text-gray-500">Add custom action buttons that appear in each table row</p>

                      <div class="border border-gray-200 border-l-4 border-l-indigo-400 rounded-md p-3 bg-white space-y-3">
                        <div v-for="(action, index) in (configModel.customActions || [])" :key="index"
                          class="border p-3 rounded bg-gray-50">
                          <div class="flex justify-between items-center mb-3">
                            <h4 class="font-medium text-sm text-gray-800">Action {{ index + 1 }}</h4>
                            <button @click="removeCustomAction(index)" class="text-red-500 hover:text-red-700"
                              type="button">
                              <Icon name="material-symbols:delete-outline" class="w-4 h-4" />
                            </button>
                          </div>

                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormKit type="text" label="Action Label" v-model="action.label"
                              placeholder="e.g., View Details, Edit Item" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Action URL" v-model="action.url"
                              placeholder="e.g., /details/{id} or https://example.com/edit/{id}"
                              help="Use {fieldName} for dynamic values from row data"
                              :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="select" label="URL Type" v-model="action.urlType" :options="[
                              { label: 'Static URL', value: 'static' },
                              { label: 'Dynamic URL (with placeholders)', value: 'dynamic' }
                            ]" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="select" label="Button Style" v-model="action.variant" :options="[
                              { label: 'Default (Blue)', value: 'primary' },
                              { label: 'Secondary (Gray)', value: 'secondary' },
                              { label: 'Success (Green)', value: 'success' },
                              { label: 'Warning (Orange)', value: 'warning' },
                              { label: 'Danger (Red)', value: 'danger' },
                              { label: 'Info (Blue)', value: 'info' }
                            ]" help="Matches the edit/delete button styling" :classes="{ outer: 'field-wrapper' }" />

                            <div class="field-wrapper">
                              <label class="block text-sm font-medium text-gray-700 mb-1">
                                Icon (Optional)
                              </label>
                              <IconBrowser v-model="action.icon" placeholder="Search Material Design icons..."
                                size="compact" :show-preview="false" />
                              <div class="text-xs text-gray-600 mt-1">
                                Leave empty for automatic icon based on button style
                              </div>
                            </div>

                            <FormKit type="select" label="Target" v-model="action.target" :options="[
                              { label: 'Same Tab', value: '_self' },
                              { label: 'New Tab', value: '_blank' }
                            ]" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Confirmation Message (Optional)" v-model="action.confirmMessage"
                              placeholder="e.g., Are you sure you want to proceed?"
                              help="Shows confirmation dialog before navigation"
                              :classes="{ outer: 'field-wrapper' }" />
                          </div>
                        </div>

                        <div v-if="!configModel.customActions || configModel.customActions.length === 0"
                          class="text-center py-4 text-gray-500">
                          <Icon name="heroicons:cursor-arrow-rays" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p class="text-sm">No custom actions configured</p>
                          <p class="text-xs">Add custom actions to enable additional functionality in your table rows
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Conditional Actions Section -->
                    <div class="border border-gray-200 border-t-4 border-t-red-500 bg-white rounded-lg p-4">
                      <div class="flex justify-between items-center mb-4">
                        <h5 class="text-sm font-semibold text-amber-800 flex items-center">
                          <Icon name="heroicons:eye" class="w-4 h-4 mr-2" />
                          Conditional Action Visibility
                        </h5>
                      </div>

                      <div class="text-sm text-amber-700 mb-4">
                        Configure when action buttons should appear based on row data values.
                      </div>

                      <!-- Edit Button Conditions -->
                      <div v-if="configModel.allowEdit" class="mb-6 border-l-4 border-blue-200 pl-4">
                        <h6 class="text-sm font-medium text-blue-700 mb-3 flex items-center">
                          <Icon name="heroicons:pencil-square" class="w-4 h-4 mr-2" />
                          Edit Button Visibility
                        </h6>
                        
                        <FormKit 
                          type="switch" 
                          label="Enable conditional visibility" 
                          v-model="configModel.editActionConditions.enabled"
                          help="Show/hide the edit button based on field values"
                          :classes="{ outer: 'field-wrapper' }" 
                        />
                        
                        <div v-if="configModel.editActionConditions?.enabled" class="mt-3 pl-4 border-l-2 border-gray-200">
                          <ActionConditionsBuilder
                            v-model="configModel.editActionConditions.conditions"
                            :available-fields="configModel.columns"
                            :operator="configModel.editActionConditions.operator"
                            @update:operator="configModel.editActionConditions.operator = $event"
                            action-name="Edit"
                          />
                        </div>
                      </div>

                      <!-- Delete Button Conditions -->
                      <div v-if="configModel.allowDelete" class="mb-6 border-l-4 border-red-200 pl-4">
                        <h6 class="text-sm font-medium text-red-700 mb-3 flex items-center">
                          <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
                          Delete Button Visibility
                        </h6>
                        
                        <FormKit 
                          type="switch" 
                          label="Enable conditional visibility" 
                          v-model="configModel.deleteActionConditions.enabled"
                          help="Show/hide the delete button based on field values"
                          :classes="{ outer: 'field-wrapper' }" 
                        />
                        
                        <div v-if="configModel.deleteActionConditions?.enabled" class="mt-3 pl-4 border-l-2 border-gray-200">
                          <ActionConditionsBuilder
                            v-model="configModel.deleteActionConditions.conditions"
                            :available-fields="configModel.columns"
                            :operator="configModel.deleteActionConditions.operator"
                            @update:operator="configModel.deleteActionConditions.operator = $event"
                            action-name="Delete"
                          />
                        </div>
                      </div>

                      <!-- Custom Actions Conditions -->
                      <div v-if="configModel.customActions?.length > 0" class="space-y-4">
                        <h6 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <Icon name="heroicons:cursor-arrow-rays" class="w-4 h-4 mr-2" />
                          Custom Action Visibility
                        </h6>
                        
                        <div 
                          v-for="(action, index) in configModel.customActions" 
                          :key="index"
                          class="border-l-4 border-purple-200 pl-4 pb-4"
                        >
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-purple-700">{{ action.label || `Action ${index + 1}` }}</span>
                          </div>
                          
                          <FormKit 
                            type="switch" 
                            label="Enable conditional visibility" 
                            v-model="action.showWhen.enabled"
                            :help="`Show/hide '${action.label}' button based on field values`"
                            :classes="{ outer: 'field-wrapper mb-2' }" 
                          />
                          
                          <div v-if="action.showWhen?.enabled" class="mt-3 pl-4 border-l-2 border-gray-200">
                            <ActionConditionsBuilder
                              v-model="action.showWhen.conditions"
                              :available-fields="configModel.columns"
                              :operator="action.showWhen.operator"
                              @update:operator="action.showWhen.operator = $event"
                              :action-name="action.label"
                            />
                          </div>
                        </div>
                      </div>

                      <div v-if="!configModel.allowEdit && !configModel.allowDelete && (!configModel.customActions || configModel.customActions.length === 0)" 
                           class="text-center py-8 text-gray-500">
                        <Icon name="heroicons:eye-slash" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p class="text-sm">No actions are enabled</p>
                        <p class="text-xs text-gray-400">Enable Edit, Delete, or add Custom Actions to configure conditional visibility</p>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Repeating Group Configuration -->
                <template v-if="component.type === 'repeating-group'">
                  <div class="space-y-6">
                    <!-- Group Limits -->
                    <div class="grid grid-cols-2 gap-4">
                      <FormKit type="number" label="Minimum Items" name="minItems" v-model="configModel.minItems"
                        help="Minimum number of groups required" :classes="{ outer: 'field-wrapper' }" :min="0"
                        placeholder="1" />

                      <FormKit type="number" label="Maximum Items" name="maxItems" v-model="configModel.maxItems"
                        help="Maximum number of groups allowed" :classes="{ outer: 'field-wrapper' }" :min="1"
                        placeholder="10" />
                    </div>

                    <!-- Button Text Settings -->
                    <div class="grid grid-cols-2 gap-4">
                      <FormKit type="text" label="Add Button Text" name="buttonText" v-model="configModel.buttonText"
                        help="Text for the add button" :classes="{ outer: 'field-wrapper' }" placeholder="Add Item" />

                      <FormKit type="text" label="Remove Button Text" name="removeText" v-model="configModel.removeText"
                        help="Text for the remove button" :classes="{ outer: 'field-wrapper' }" placeholder="Remove" />
                    </div>

                    <!-- Container Information -->
                    <div class="border border-gray-200 border-t-4 border-t-teal-500 bg-white rounded-md p-4">
                      <div class="flex items-start">
                        <Icon name="material-symbols:info" class="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 class="font-medium text-sm text-blue-800 mb-1">Repeating Group Container</h4>
                          <p class="text-xs text-blue-700">
                            This is a container component. Drag and drop fields into it in the form builder to create
                            the
                            repeating group structure.
                            Each field you add will be repeated for every group item.
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Children Count -->
                    <div class="border border-gray-200 border-l-4 border-l-indigo-400 rounded-md p-3 bg-white">
                      <div class="flex items-center justify-between">
                        <div>
                          <h5 class="text-sm font-medium text-gray-700">Group Fields</h5>
                          <p class="text-xs text-gray-500 mt-1">
                            {{ configModel.children?.length || 0 }} field(s) in this repeating group
                          </p>
                        </div>
                        <div class="text-sm text-gray-500">
                          <Icon name="material-symbols:drag-indicator" class="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Layout Grid Configuration -->
                <template v-if="component.type === 'layout-grid'">
                  <div class="space-y-8">

                    <!-- Grid Layout Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="material-symbols:grid-view" class="w-4 h-4 mr-2" />
                        Grid Layout Settings
                      </h5>
                      <div class="grid grid-cols-2 gap-4 mb-4">
                        <FormKit type="number" label="Grid Areas (Vertical)" name="rows" v-model="configModel.rows"
                          help="How many vertical sections you want" :classes="{ outer: 'field-wrapper' }" min="1"
                          max="6" />
                        <FormKit type="number" label="Grid Areas (Horizontal)" name="columns"
                          v-model="configModel.columns" help="How many horizontal sections you want"
                          :classes="{ outer: 'field-wrapper' }" min="1" max="6" />
                      </div>

                      <FormKit type="range" label="Spacing Between Areas" name="gap" v-model="configModel.gap"
                        help="Space between each grid area" :classes="{ outer: 'field-wrapper' }" min="0" max="32"
                        step="4" />
                    </div>

                    <!-- Cell Spanning Controls -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <Icon name="heroicons:arrows-pointing-out" class="w-4 h-4 mr-2" />
                        Cell Spanning
                      </h5>

                      <p class="text-sm text-green-800 mb-3">
                        <Icon name="heroicons:information-circle" class="w-4 h-4 inline mr-1" />
                        Configure how cells span across rows and columns
                      </p>

                      <div class="space-y-3">
                        <div v-for="(cell, index) in configModel.cells" :key="index" class="cell-span-control">
                          <div class="flex items-center justify-between p-3 bg-white border border-green-200 rounded">
                            <div class="flex items-center space-x-3">
                              <span class="text-sm font-medium text-green-800">Cell {{ index + 1 }}</span>
                              <span class="text-xs text-green-600">({{ cell.row + 1 }},{{ cell.col + 1 }})</span>
                            </div>

                            <div class="flex items-center space-x-2">
                              <div class="flex items-center space-x-1">
                                <label class="text-xs text-green-600">Rows:</label>
                                <input type="number" v-model="cell.rowSpan" min="1" max="6"
                                  class="w-12 px-2 py-1 text-xs border border-green-200 rounded focus:border-green-400" />
                              </div>

                              <div class="flex items-center space-x-1">
                                <label class="text-xs text-green-600">Cols:</label>
                                <input type="number" v-model="cell.colSpan" min="1" max="6"
                                  class="w-12 px-2 py-1 text-xs border border-green-200 rounded focus:border-green-400" />
                              </div>

                              <button @click="removeCell(index)"
                                class="p-1 text-red-400 hover:text-red-600 rounded hover:bg-gray-50 transition-colors"
                                title="Remove cell">
                                <Icon name="heroicons:trash" class="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button @click="addCell"
                          class="w-full py-2 px-3 text-sm text-green-600 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors">
                          <Icon name="heroicons:plus" class="w-4 h-4 inline mr-1" />
                          Add Cell
                        </button>
                      </div>
                    </div>

                    <!-- Layout Presets -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-purple-800 mb-3 flex items-center">
                        <Icon name="heroicons:square-3-stack-3d" class="w-4 h-4 mr-2" />
                        Quick Layout Presets
                      </h5>

                      <div class="grid grid-cols-2 gap-3">
                        <button @click="applyPreset('sidebar-right')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('sidebar-right') }">
                          <div class="preset-preview sidebar-right-preview"></div>
                          <span class="preset-label">Sidebar Right</span>
                        </button>

                        <button @click="applyPreset('sidebar-left')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('sidebar-left') }">
                          <div class="preset-preview sidebar-left-preview"></div>
                          <span class="preset-label">Sidebar Left</span>
                        </button>

                        <button @click="applyPreset('header-content')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('header-content') }">
                          <div class="preset-preview header-content-preview"></div>
                          <span class="preset-label">Header + Content</span>
                        </button>

                        <button @click="applyPreset('three-column')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('three-column') }">
                          <div class="preset-preview three-column-preview"></div>
                          <span class="preset-label">Three Column</span>
                        </button>

                        <button @click="applyPreset('two-by-two')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('two-by-two') }">
                          <div class="preset-preview two-by-two-preview"></div>
                          <span class="preset-label">2x2 Grid</span>
                        </button>

                        <button @click="applyPreset('form-layout')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('form-layout') }">
                          <div class="preset-preview form-layout-preview"></div>
                          <span class="preset-label">Form Layout</span>
                        </button>

                        <button @click="applyPreset('header-sidebar')" class="preset-button"
                          :class="{ 'preset-active': isCurrentPreset('header-sidebar') }">
                          <div class="preset-preview header-sidebar-preview"></div>
                          <span class="preset-label">Header + Sidebar</span>
                        </button>
                      </div>
                    </div>

                    <!-- Grid Layout Management -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-amber-800 mb-3 flex items-center">
                        <Icon name="heroicons:puzzle-piece" class="w-4 h-4 mr-2" />
                        Layout Management
                      </h5>

                      <div class="bg-white border border-amber-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-3">
                          <div>
                            <p class="text-sm font-medium text-amber-800">
                              Components in grid: {{ getTotalComponents() }}
                            </p>
                            <p class="text-xs text-amber-600">
                              Drag form components into the grid areas to position them
                            </p>
                          </div>
                        </div>

                        <div class="text-xs text-amber-600 mt-2 space-y-1">
                          <p>• In the form builder, drag components directly into the grid areas</p>
                          <p>• Components will be positioned exactly where you drop them</p>
                          <p>• Adjust grid dimensions above to create more areas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Form Section Configuration -->
                <template v-if="component.type === 'form-section'">
                  <div class="space-y-8">

                    <!-- Section Content -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="heroicons:document-text" class="w-4 h-4 mr-2" />
                        Section Content
                      </h5>
                      <FormKit type="textarea" label="Section Description" name="description"
                        v-model="configModel.description" help="Optional description text below the section title"
                        :classes="{ outer: 'field-wrapper' }" placeholder="Describe this section..." rows="2" />
                    </div>

                    <!-- Header Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-green-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <Icon name="heroicons:view-columns" class="w-4 h-4 mr-2" />
                        Header Settings
                      </h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Show Header" name="showHeader" v-model="configModel.showHeader"
                          help="Display the section header" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit v-if="configModel.showHeader" type="select" label="Header Size" name="headerSize"
                          v-model="configModel.headerSize" :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Small', value: 'small' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Large', value: 'large' }
                          ]" help="Size of the section header" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit v-if="configModel.showHeader" type="select" label="Header Level" name="headerLevel"
                          v-model="configModel.headerLevel" :options="[
                            { label: 'H1 (Largest)', value: 1 },
                            { label: 'H2 (Large)', value: 2 },
                            { label: 'H3 (Medium)', value: 3 },
                            { label: 'H4 (Small)', value: 4 },
                            { label: 'H5 (Smaller)', value: 5 },
                            { label: 'H6 (Smallest)', value: 6 }
                          ]" help="HTML heading level for the section title" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit v-if="configModel.showHeader" type="select" label="Header Alignment" name="headerAlign"
                          v-model="configModel.headerAlign" :options="[
                            { label: 'Left', value: 'left' },
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' },
                            { label: 'Justify', value: 'justify' }
                          ]" help="Text alignment for the section header" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit v-if="configModel.showHeader" type="switch" label="Collapsible" name="collapsible"
                          v-model="configModel.collapsible" help="Allow users to collapse this section"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit v-if="configModel.showHeader && configModel.collapsible" type="switch"
                          label="Start Collapsed" name="collapsed" v-model="configModel.collapsed"
                          help="Start with this section collapsed" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Show Placeholder" name="showPlaceholder"
                          v-model="configModel.showPlaceholder" help="Show placeholder when empty in builder mode"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Visual Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-purple-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-purple-800 mb-3 flex items-center">
                        <Icon name="heroicons:paint-brush" class="w-4 h-4 mr-2" />
                        Visual Settings
                      </h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Show Border" name="showBorder" v-model="configModel.showBorder"
                          help="Display border around the section" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="select" label="Border Style" name="borderStyle" v-model="configModel.borderStyle"
                          :options="[
                            { label: 'Please select...', value: '' },
                            { label: 'Solid', value: 'solid' },
                            { label: 'Dashed', value: 'dashed' },
                            { label: 'Dotted', value: 'dotted' }
                          ]" help="Style of the section border" :classes="{ outer: 'field-wrapper' }"
                          :disabled="!configModel.showBorder" />

                        <FormKit type="select" label="Spacing" name="spacing" v-model="configModel.spacing" :options="[
                          { label: 'Please select...', value: '' },
                          { label: 'Compact', value: 'compact' },
                          { label: 'Normal', value: 'normal' },
                          { label: 'Relaxed', value: 'relaxed' }
                        ]" help="Internal padding of the section" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Color Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-pink-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-pink-800 mb-3 flex items-center">
                        <Icon name="heroicons:swatch" class="w-4 h-4 mr-2" />
                        Color Settings
                      </h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="color" label="Background Color" name="backgroundColor"
                          v-model="configModel.backgroundColor" help="Background color of the section"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="color" label="Header Background" name="headerBackground"
                          v-model="configModel.headerBackground" help="Background color of the header"
                          :classes="{ outer: 'field-wrapper' }" :disabled="!configModel.showHeader" />
                      </div>
                    </div>

                    <!-- Nested Components Management -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-amber-800 mb-3 flex items-center">
                        <Icon name="heroicons:puzzle-piece" class="w-4 h-4 mr-2" />
                        Nested Components
                      </h5>

                      <div class="bg-white border border-amber-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-3">
                          <div>
                            <p class="text-sm font-medium text-amber-800">
                              Components in this section: {{ (configModel.children || []).length }}
                            </p>
                            <p class="text-xs text-amber-600">
                              Drag form components into the section to group them here
                            </p>
                          </div>
                          <div v-if="(configModel.children || []).length > 0">
                            <span
                              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-200 bg-white text-amber-800">
                              {{ (configModel.children || []).length }} {{ (configModel.children || []).length === 1 ?
                                'component' : 'components' }}
                            </span>
                          </div>
                        </div>

                        <!-- List of nested components -->
                        <div v-if="(configModel.children || []).length > 0" class="space-y-2">
                          <div v-for="(child, index) in configModel.children" :key="child.id"
                            class="flex items-center justify-between bg-white border border-amber-200 rounded px-3 py-2">
                            <div class="flex items-center space-x-2">
                              <Icon :name="getComponentIcon(child.type)" class="w-4 h-4 text-amber-500" />
                              <span class="text-sm text-amber-700">
                                {{ child.props.label || getComponentTypeName(child.type) }}
                              </span>
                              <span class="text-xs text-amber-500">
                                ({{ child.type }})
                              </span>
                            </div>
                            <button @click="removeNestedComponent(index)"
                              class="text-red-500 hover:text-red-700 text-xs" title="Remove from section">
                              <Icon name="material-symbols:close" class="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <!-- Empty state -->
                        <div v-else class="text-center py-4">
                          <Icon name="material-symbols:inbox-outline" class="w-8 h-8 text-amber-300 mx-auto mb-2" />
                          <p class="text-sm text-amber-600 mb-1">No components in this section</p>
                          <p class="text-xs text-amber-500">
                            Drag components from the sidebar into the section area
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Tab Container Configuration -->
                <template v-if="component.type === 'tab-container'">
                  <div class="space-y-8">
                    <!-- Tab Configuration -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="material-symbols:tab" class="w-4 h-4 mr-2" />
                        Tab Configuration
                      </h5>
                      <div class="space-y-4">
                        <FormKit type="text" label="Default Active Tab" name="defaultActiveTab"
                          v-model="configModel.defaultActiveTab" help="ID of the tab that should be active by default"
                          :classes="{ outer: 'field-wrapper' }" placeholder="tab1" />
                        <FormKit type="number" label="Minimum Tab Height" name="minTabHeight"
                          v-model="configModel.minTabHeight" help="Minimum height for tab content area (in pixels)"
                          :classes="{ outer: 'field-wrapper' }" placeholder="200" :min="100" />
                      </div>
                    </div>

                    <!-- Tab Position & Style -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <Icon name="material-symbols:style" class="w-4 h-4 mr-2" />
                        Tab Position & Style
                      </h5>
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="select" label="Tab Position" name="tabPosition" v-model="configModel.tabPosition"
                          :options="[
                            { label: 'Top', value: 'top' },
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' }
                          ]" help="Position of the tab navigation" :classes="{ outer: 'field-wrapper' }" />
                        <FormKit type="select" label="Tab Style" name="tabStyle" v-model="configModel.tabStyle"
                          :options="[
                            { label: 'Default', value: 'default' },
                            { label: 'Pills', value: 'pills' },
                            { label: 'Underline', value: 'underline' },
                            { label: 'Boxed', value: 'boxed' }
                          ]" help="Visual style of the tabs" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                      <div class="mt-4">
                        <FormKit type="checkbox" label="Show Border Around Content" name="showBorder"
                          v-model="configModel.showBorder"
                          help="Display border and background around tab content (uncheck for minimal design)"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Default Tabs Configuration -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
                        <Icon name="material-symbols:tab-group" class="w-4 h-4 mr-2" />
                        Default Tabs
                      </h5>
                      <div class="space-y-4">
                        <div v-if="configModel.tabs && configModel.tabs.length > 0" class="space-y-3">
                          <div v-for="(tab, index) in configModel.tabs" :key="index"
                            class="flex items-center justify-between bg-white border border-indigo-200 rounded px-3 py-2">
                            <div class="flex items-center space-x-3 flex-1">
                              <Icon name="material-symbols:tab" class="w-4 h-4 text-indigo-500" />
                              <div class="flex-1">
                                <FormKit 
                                  type="text" 
                                  :model-value="tab.label || `Tab ${index + 1}`"
                                  @update:model-value="updateTabLabel(index, $event)"
                                  :classes="{ outer: 'mb-0', input: 'text-sm font-medium text-indigo-700 bg-transparent border-none p-0 focus:ring-0' }"
                                  placeholder="Tab name"
                                />
                                <span class="text-xs text-indigo-500">({{ tab.id || `tab${index + 1}` }})</span>
                              </div>
                            </div>
                            <button @click="removeTab(index)" class="text-red-500 hover:text-red-700 text-xs"
                              title="Remove tab">
                              <Icon name="material-symbols:close" class="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div v-else class="text-center py-4">
                          <Icon name="material-symbols:tab-inactive" class="w-8 h-8 text-indigo-300 mx-auto mb-2" />
                          <p class="text-sm text-indigo-600 mb-1">No tabs configured</p>
                          <p class="text-xs text-indigo-500">
                            Add some default tabs to get started
                          </p>
                        </div>
                        <button @click="addTab" type="button"
                          class="w-full px-4 py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-400 hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Icon name="material-symbols:add" class="w-4 h-4 mr-2" />
                          Add New Tab
                        </button>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Custom HTML Configuration -->
                <template v-if="component.type === 'customHtml'">
                  <div class="space-y-8">

                    <!-- Code Editor Tabs -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="heroicons:code-bracket" class="w-4 h-4 mr-2" />
                        Code Editor
                      </h5>
                      <div class="code-editor-tabs">
                        <div class="tabs-header border-b border-blue-200 bg-white rounded-t-lg">
                          <div class="flex">
                            <button @click="customHtmlActiveTab = 'html'"
                              class="px-4 py-2 text-sm font-medium transition-colors rounded-tl-lg"
                              :class="customHtmlActiveTab === 'html' ? 'text-blue-600 border-b-2 border-blue-500 bg-gray-50' : 'text-blue-600 hover:text-blue-800 hover:bg-gray-50'">
                              <span class="flex items-center">
                                <Icon name="material-symbols:code" class="w-4 h-4 mr-2" />
                                HTML
                              </span>
                            </button>
                            <button @click="customHtmlActiveTab = 'css'"
                              class="px-4 py-2 text-sm font-medium transition-colors"
                              :class="customHtmlActiveTab === 'css' ? 'text-blue-600 border-b-2 border-blue-500 bg-gray-50' : 'text-blue-600 hover:text-blue-800 hover:bg-gray-50'">
                              <span class="flex items-center">
                                <Icon name="material-symbols:format-color-fill" class="w-4 h-4 mr-2" />
                                CSS
                              </span>
                            </button>
                            <button @click="customHtmlActiveTab = 'js'"
                              class="px-4 py-2 text-sm font-medium transition-colors"
                              :class="customHtmlActiveTab === 'js' ? 'text-blue-600 border-b-2 border-blue-500 bg-gray-50' : 'text-blue-600 hover:text-blue-800 hover:bg-gray-50'">
                              <span class="flex items-center">
                                <Icon name="material-symbols:code-blocks" class="w-4 h-4 mr-2" />
                                JavaScript
                              </span>
                            </button>
                            <button @click="customHtmlActiveTab = 'preview'"
                              class="px-4 py-2 text-sm font-medium transition-colors ml-auto rounded-tr-lg"
                              :class="customHtmlActiveTab === 'preview' ? 'text-green-600 border-b-2 border-green-500 bg-gray-50' : 'text-green-600 hover:text-green-800 hover:bg-gray-50'">
                              <span class="flex items-center">
                                <Icon name="material-symbols:preview" class="w-4 h-4 mr-2" />
                                Preview
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- HTML Tab -->
                    <div v-show="customHtmlActiveTab === 'html'" class="tab-content py-4">
                      <div class="html-editor-container">
                        <RsCodeMirror v-model="configModel.htmlContent" language="html" height="300px"
                          class="html-editor border border-gray-200 rounded" placeholder="" />
                      </div>
                      <p class="text-xs text-gray-500 mt-2 flex items-start">
                        <Icon name="material-symbols:lightbulb-outline" class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Create your custom HTML structure. Use standard HTML5 elements and attributes. Use <code
                            class="bg-gray-100 px-1 rounded text-xs">this.getValue('fieldName')</code> and <code
                            class="bg-gray-100 px-1 rounded text-xs">this.setValue('fieldName', value)</code> to
                          interact
                          with form fields.</span>
                      </p>
                    </div>

                    <!-- CSS Tab -->
                    <div v-show="customHtmlActiveTab === 'css'" class="tab-content py-4">
                      <div class="css-editor-container">
                        <RsCodeMirror v-model="configModel.cssContent" language="css" height="300px"
                          class="css-editor border border-gray-200 rounded" placeholder="" />
                      </div>
                      <p class="text-xs text-gray-500 mt-2 flex items-start">
                        <Icon name="material-symbols:lightbulb-outline" class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Add custom CSS styles. These styles will be automatically scoped to this component only,
                          preventing conflicts with other form elements.</span>
                      </p>
                    </div>

                    <!-- JavaScript Tab -->
                    <div v-show="customHtmlActiveTab === 'js'" class="tab-content py-4">
                      <div class="js-editor-container">
                        <RsCodeMirror v-model="configModel.jsContent" language="javascript" height="300px"
                          class="js-editor border border-gray-200 rounded" placeholder="" />
                      </div>
                      <p class="text-xs text-gray-500 mt-2 flex items-start">
                        <Icon name="material-symbols:lightbulb-outline" class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Add interactive JavaScript functionality. Use <code
                            class="bg-gray-100 px-1 rounded text-xs">this.element</code> to access the component, and
                          the
                          helper functions for form interaction. Scripts run in {{ configModel.previewMode === 'safe' ?
                            'Safe Mode (disabled)' : 'Advanced Mode' }}.</span>
                      </p>
                    </div>

                    <!-- Live Preview Tab -->
                    <div v-show="customHtmlActiveTab === 'preview'" class="tab-content py-4">
                      <div class="preview-section">
                        <div
                          class="preview-container border border-gray-200 rounded-lg p-4 bg-white min-h-[200px] max-h-[400px] overflow-auto">
                          <div v-if="configModel.htmlContent" class="custom-html-preview">
                            <div v-html="getFullHtmlPreview(configModel.htmlContent, configModel.cssContent)"></div>
                          </div>
                          <div v-else class="text-gray-500 text-center py-12">
                            <Icon name="material-symbols:code" class="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p class="text-sm">No HTML content to preview</p>
                            <p class="text-xs text-gray-400 mt-1">Switch to the HTML tab to start coding</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Component Settings -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Component Settings</h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="select" label="Preview Mode" name="previewMode" v-model="configModel.previewMode"
                          help="Choose how to render the HTML content" :options="[
                            { label: 'Safe Mode (No Scripts)', value: 'safe' },
                            { label: 'Advanced Mode (Full HTML)', value: 'advanced' }
                          ]" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Allow Scripts" name="allowScripts"
                          v-model="configModel.allowScripts" help="Enable JavaScript execution (Advanced mode only)"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>

                      <FormKit type="switch" label="Show in Preview" name="showInPreview"
                        v-model="configModel.showInPreview" help="Display this component in form preview mode"
                        :classes="{ outer: 'field-wrapper' }" />
                    </div>

                    <!-- Content Statistics -->
                    <div class="p-4 border border-gray-200 bg-white rounded-lg">
                      <h5 class="text-sm font-medium text-gray-700 mb-2">Content Statistics</h5>
                      <div class="flex items-center space-x-6 text-xs text-gray-600">
                        <div class="flex items-center">
                          <Icon name="material-symbols:html" class="w-4 h-4 mr-1" />
                          HTML: {{ (configModel.htmlContent || '').length }} characters
                        </div>
                        <div class="flex items-center">
                          <Icon name="material-symbols:css" class="w-4 h-4 mr-1" />
                          CSS: {{ (configModel.cssContent || '').length }} characters
                        </div>
                        <div class="flex items-center">
                          <Icon name="material-symbols:javascript" class="w-4 h-4 mr-1" />
                          JavaScript: {{ (configModel.jsContent || '').length }} characters
                        </div>
                      </div>
                    </div>

                    <!-- Security Notice -->
                    <div class="border border-gray-200 border-t-4 border-t-yellow-500 bg-white rounded-md p-4">
                      <div class="flex items-start">
                        <Icon name="material-symbols:security" class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <h4 class="font-medium text-sm text-yellow-800 mb-1">Security Notice</h4>
                          <p class="text-xs text-yellow-700">
                            Custom HTML components can contain arbitrary code. In Safe Mode, scripts and event handlers
                            are
                            disabled.
                            Use Advanced Mode only with trusted content and enable "Allow Scripts" carefully.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Image Preview Configuration -->
                <template v-if="component.type === 'image-preview'">
                  <div class="space-y-6">
                    <!-- Image Configuration -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Image Configuration</h5>

                      <FormKit type="text" label="Image URL" name="imageUrl" v-model="configModel.imageUrl"
                        help="URL of the image to display" :classes="{ outer: 'field-wrapper' }"
                        placeholder="https://example.com/image.jpg" />

                      <FormKit type="text" label="Alt Text" name="altText" v-model="configModel.altText"
                        help="Alternative text for accessibility" :classes="{ outer: 'field-wrapper' }"
                        placeholder="Describe the image" />

                      <FormKit type="text" label="Caption" name="caption" v-model="configModel.caption"
                        help="Optional caption text below the image" :classes="{ outer: 'field-wrapper' }"
                        placeholder="Image caption" />
                    </div>

                    <!-- Display Options -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Display Options</h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Show Zoom" name="showZoom" v-model="configModel.showZoom"
                          help="Allow users to zoom in on the image" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="switch" label="Show Caption" name="showCaption" v-model="configModel.showCaption"
                          help="Display the caption below the image" :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Sizing -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Sizing</h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="text" label="Max Width" name="maxWidth" v-model="configModel.maxWidth"
                          help="Maximum width of the image (e.g., 100%, 500px)" :classes="{ outer: 'field-wrapper' }"
                          placeholder="100%" />

                        <FormKit type="text" label="Height" name="height" v-model="configModel.height"
                          help="Height of the image (e.g., auto, 300px)" :classes="{ outer: 'field-wrapper' }"
                          placeholder="auto" />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Divider Configuration -->
                <template v-if="component.type === 'divider'">
                  <div class="space-y-6">
                    <!-- Style Configuration -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Divider Style</h5>

                      <FormKit type="select" label="Divider Style" name="dividerStyle"
                        v-model="configModel.dividerStyle" help="Visual style of the divider line" :options="[
                          { label: 'Solid', value: 'solid' },
                          { label: 'Dashed', value: 'dashed' },
                          { label: 'Dotted', value: 'dotted' },
                          { label: 'Double', value: 'double' }
                        ]" :classes="{ outer: 'field-wrapper' }" />

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="color" label="Color" name="color" v-model="configModel.color"
                          help="Color of the divider line" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="number" label="Thickness (px)" name="thickness" v-model="configModel.thickness"
                          help="Thickness of the divider line in pixels" :classes="{ outer: 'field-wrapper' }" :min="1"
                          :max="10" placeholder="1" />
                      </div>
                    </div>

                    <!-- Spacing -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Spacing</h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="text" label="Top Margin" name="marginTop" v-model="configModel.marginTop"
                          help="Space above the divider (e.g., 1rem, 20px)" :classes="{ outer: 'field-wrapper' }"
                          placeholder="1rem" />

                        <FormKit type="text" label="Bottom Margin" name="marginBottom"
                          v-model="configModel.marginBottom" help="Space below the divider (e.g., 1rem, 20px)"
                          :classes="{ outer: 'field-wrapper' }" placeholder="1rem" />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- SearchSelect Configuration -->
                <template v-if="component.type === 'searchSelect'">
                  <div class="space-y-6">
                    <!-- Search Configuration -->
                    <div class="space-y-4">
                      <h5 class="text-sm font-medium text-gray-700 border-b pb-2">Search Settings</h5>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="switch" label="Allow Multiple Selection" name="multiple"
                          v-model="configModel.multiple" help="Allow users to select multiple options"
                          :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="number" label="Min Search Length" name="minSearchLength"
                          v-model="configModel.minSearchLength" help="Minimum characters required before search begins"
                          :classes="{ outer: 'field-wrapper' }" :min="0" :max="10" placeholder="0" />
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="text" label="No Results Text" name="noResultsText"
                          v-model="configModel.noResultsText" help="Text to display when no search results are found"
                          :classes="{ outer: 'field-wrapper' }" placeholder="No results found" />

                        <FormKit type="text" label="Search Placeholder" name="searchPlaceholder"
                          v-model="configModel.searchPlaceholder" help="Placeholder text for the search input"
                          :classes="{ outer: 'field-wrapper' }" placeholder="Search options..." />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Info Display Specific Settings -->
                <template v-if="component.type === 'info-display'">
                  <div class="space-y-8">

                    <!-- Display Settings -->
                    <div class="border border-gray-200 border-t-4 border-t-blue-500 bg-white rounded-lg p-4">
                      <h5 class="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <Icon name="heroicons:eye" class="w-4 h-4 mr-2" />
                        Display Settings
                      </h5>
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="checkbox" label="Show Border" name="showBorder" v-model="configModel.showBorder"
                          help="Show border around the information display" :classes="{ outer: 'field-wrapper' }" />

                        <FormKit type="color" label="Background Color" name="backgroundColor"
                          v-model="configModel.backgroundColor" help="Background color for the information display"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>

                    <!-- Information Fields Management -->
                    <div class="border border-gray-200 bg-white rounded-lg p-4">
                      <div class="flex justify-between items-center mb-4">
                        <div>
                          <h5 class="text-sm font-semibold text-green-800 flex items-center">
                            <Icon name="heroicons:document-text" class="w-4 h-4 mr-2" />
                            Information Fields
                          </h5>
                          <p class="text-xs text-green-600 mt-1">Configure the information that will be displayed</p>
                        </div>
                        <button
                          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                          @click="addInfoField">
                          <Icon name="material-symbols:add" class="w-4 h-4 mr-1" />
                          Add Field
                        </button>
                      </div>

                      <!-- Fields List -->
                      <div v-if="configModel.fields && configModel.fields.length > 0" class="space-y-4">
                        <div v-for="(field, index) in configModel.fields" :key="index"
                          class="field-card bg-white border border-green-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                          <!-- Field Header -->
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-8 h-8 border border-gray-200 bg-white rounded-full flex items-center justify-center mr-3">
                                <Icon
                                  :name="field.type === 'button' ? 'material-symbols:smart-button' : 'material-symbols:text-fields'"
                                  class="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <h6 class="text-sm font-medium text-green-800">
                                  {{ field.label || `Field ${index + 1}` }}
                                </h6>
                                <p class="text-xs text-green-600">
                                  {{ field.type === 'button' ? 'Button Field' : 'Text Field' }}
                                </p>
                              </div>
                            </div>
                            <button
                              class="p-1.5 text-green-400 hover:text-red-500 hover:bg-gray-50 rounded transition-colors"
                              @click="removeInfoField(index)" title="Remove field">
                              <Icon name="material-symbols:delete-outline" class="w-4 h-4" />
                            </button>
                          </div>

                          <!-- Field Configuration -->
                          <div class="space-y-3">
                            <!-- Basic Info -->
                            <div class="grid grid-cols-2 gap-3">
                              <FormKit type="text" label="Display Label" v-model="field.label"
                                placeholder="e.g., Customer Name" :classes="{ outer: 'mb-0' }" />
                              <FormKit type="text" label="Field Key" v-model="field.key"
                                placeholder="e.g., customer_name" :classes="{ outer: 'mb-0' }" />
                            </div>

                            <!-- Field Type -->
                            <FormKit type="select" label="Field Type" v-model="field.type" :options="[
                              { label: '📝 Text Information', value: 'text' },
                              { label: '🔗 Action Button', value: 'button' }
                            ]" :classes="{ outer: 'mb-0' }" />

                            <!-- Text Field Configuration -->
                            <div v-if="field.type === 'text'">
                              <FormKit type="text" label="Display Value" v-model="field.value"
                                placeholder="e.g., John Doe, 555-123-4567" help="The text that will be shown to users"
                                :classes="{ outer: 'mb-0' }" />
                            </div>

                            <!-- Button Field Configuration -->
                            <div v-if="field.type === 'button'"
                              class="space-y-3 p-3 border border-gray-200 bg-white rounded-lg">
                              <div class="flex items-center mb-2">
                                <Icon name="material-symbols:settings" class="w-4 h-4 text-purple-600 mr-2" />
                                <span class="text-sm font-medium text-purple-800">Button Settings</span>
                              </div>

                              <FormKit type="text" label="Button Text" v-model="field.value"
                                placeholder="e.g., View Profile, Download PDF" help="Text displayed on the button"
                                :classes="{ outer: 'mb-0' }" />

                              <FormKit type="text" label="Button URL" v-model="field.url"
                                placeholder="e.g., https://example.com/profile"
                                help="Where the button should redirect to" :classes="{ outer: 'mb-0' }" />

                              <div class="grid grid-cols-2 gap-3">
                                <FormKit type="checkbox" label="Open in new tab" v-model="field.openInNewTab"
                                  help="Opens link in new window" :classes="{ outer: 'mb-0' }" />

                                <div class="mb-0">
                                  <label class="block text-sm font-medium text-gray-700 mb-1">Icon (optional)</label>
                                  <IconBrowser v-model="field.icon" size="compact" :show-preview="false"
                                    placeholder="Search icons..." />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Empty State -->
                      <div v-else
                        class="empty-fields-state text-center py-8 border-2 border-dashed border-green-300 rounded-lg bg-white">
                        <Icon name="material-symbols:info-outline" class="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h6 class="text-sm font-medium text-green-600 mb-1">No information fields yet</h6>
                        <p class="text-xs text-green-500 mb-4">Add fields to display information to your users</p>
                        <button
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                          @click="addInfoField">
                          <Icon name="material-symbols:add" class="w-4 h-4 mr-1" />
                          Add Your First Field
                        </button>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>



          </div>

          <!-- Options Tab (for select, radio, checkbox) -->
          <div v-if="activeTab === 'options'" class="space-y-6">
            <div class="settings-section">
              <div class="section-header">
                <h4 class="section-title">
                  <Icon name="heroicons:list-bullet" class="w-5 h-5 mr-2" />
                  Choice Options
                </h4>
                <p class="section-description">Configure the options users can choose from</p>
              </div>

              <div class="section-content">
                <!-- Null Option Control -->
                <div v-if="component.type === 'select' || component.type === 'searchSelect'"
                  class="mb-6 p-4 bg-gray-50 border border-blue-200 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <h5 class="text-sm font-semibold text-blue-800 mb-1">Null Option Settings</h5>
                      <p class="text-xs text-blue-600">Control whether to show a "Please select..." option</p>
                    </div>
                    <FormKit type="switch" label="Enable Null Option" name="enableNullOption"
                      v-model="configModel.enableNullOption" help="Show 'Please select...' as the first option"
                      :classes="{ outer: 'field-wrapper' }" />
                  </div>
                </div>

                <div class="options-manager">
                  <div class="options-header">
                    <span class="text-sm font-medium text-gray-700">Options List</span>
                    <button @click="addOption" class="add-option-btn">
                      <Icon name="heroicons:plus-circle" class="w-4 h-4 mr-1" />
                      Add Option
                    </button>
                  </div>

                  <div v-if="configModel.options && configModel.options.length > 0" class="options-list">
                    <div v-for="(option, index) in configModel.options" :key="index" class="option-item">
                      <div class="option-drag-handle">
                        <Icon name="heroicons:bars-3" class="w-4 h-4 text-gray-400" />
                      </div>

                      <div class="option-content">
                        <FormKit type="text" placeholder="What users will see" v-model="option.label"
                          :classes="{ outer: 'option-field', input: 'option-input' }" />
                        <FormKit type="text" placeholder="Internal value" v-model="option.value"
                          :classes="{ outer: 'option-field', input: 'option-input' }" />
                      </div>

                      <button @click="removeOption(index)" class="option-remove-btn" title="Remove this option">
                        <Icon name="heroicons:trash" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div v-else class="empty-options">
                    <Icon name="heroicons:list-bullet" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p class="text-sm text-gray-500 text-center mb-3">No options added yet</p>
                    <button @click="addOption" class="empty-add-btn">
                      Add First Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Layout Tab -->
          <div v-if="activeTab === 'layout'" class="space-y-6">
            <div class="settings-section">
              <div class="section-header">
                <h4 class="section-title">
                  <Icon name="heroicons:squares-2x2" class="w-5 h-5 mr-2" />
                  Layout & Size
                </h4>
                <p class="section-description">Control how this field appears in your form</p>
              </div>

              <div class="section-content">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Field Width</label>

                  <!-- Compact Width Selector -->
                  <div class="width-selector-compact">
                    <!-- Button Group for Width Selection -->
                    <div class="width-buttons">
                      <button v-for="option in widthOptions" :key="option.value"
                        @click="setComponentWidth(option.value, option.gridColumns)" type="button" class="width-button"
                        :class="{
                          'active': getComponentWidthPercent() === option.value,
                          'recommended': isRecommendedWidth(option.type)
                        }" :title="option.useCase">
                        <div class="width-visual">
                          <div class="width-bar" :style="{ width: option.value + '%' }"></div>
                        </div>
                        <span class="width-label">{{ option.name }}</span>
                      </button>
                    </div>

                    <!-- Simple Visual Preview -->
                    <div class="width-preview">
                      <div class="preview-container">
                        <div class="preview-field" :style="{ width: getComponentWidthPercent() + '%' }">
                          <div class="preview-input"></div>
                        </div>
                      </div>
                      <div class="preview-info">
                        {{ getCurrentWidthOption()?.name || 'Custom' }} ({{ getComponentWidthPercent() }}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Validation Tab -->
          <div v-if="activeTab === 'validation'" class="space-y-6">
            <div class="settings-section">
              <div class="section-header">
                <h4 class="section-title">
                  <Icon name="heroicons:shield-check" class="w-5 h-5 mr-2" />
                  Field Validation
                </h4>
                <p class="section-description">Set rules to ensure users enter valid information</p>
              </div>

              <div class="section-content">
                <div class="validation-options">
                  <!-- Required Field -->
                  <div class="validation-item">
                    <label class="validation-toggle" @click.stop>
                      <input type="checkbox" v-model="isRequired" />
                      <span class="toggle-slider"></span>
                      <div class="validation-info">
                        <span class="validation-title">Required Field</span>
                        <span class="validation-desc">Users must fill this field before submitting</span>
                      </div>
                    </label>
                  </div>

                  <!-- Email Validation -->
                  <div v-if="component.type === 'email' || component.type === 'text'" class="validation-item">
                    <label class="validation-toggle" @click.stop>
                      <input type="checkbox" v-model="isEmailValidation" />
                      <span class="toggle-slider"></span>
                      <div class="validation-info">
                        <span class="validation-title">Email Format</span>
                        <span class="validation-desc">Must be a valid email address</span>
                      </div>
                    </label>
                  </div>

                  <!-- URL Validation -->
                  <div v-if="component.type === 'url' || component.type === 'text'" class="validation-item">
                    <label class="validation-toggle" @click.stop>
                      <input type="checkbox" v-model="isUrlValidation" />
                      <span class="toggle-slider"></span>
                      <div class="validation-info">
                        <span class="validation-title">URL Format</span>
                        <span class="validation-desc">Must be a valid website address</span>
                      </div>
                    </label>
                  </div>

                  <!-- Length Validation -->
                  <div v-if="isTextBasedField" class="validation-item">
                    <label class="validation-toggle" @click.stop>
                      <input type="checkbox" v-model="hasLengthValidation" />
                      <span class="toggle-slider"></span>
                      <div class="validation-info">
                        <span class="validation-title">Text Length Limits</span>
                        <span class="validation-desc">Set minimum and maximum text length</span>
                      </div>
                    </label>

                    <div v-if="hasLengthValidation" class="validation-details">
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="number" label="Minimum Length" v-model="minLength" :min="0"
                          :classes="{ outer: 'field-wrapper' }" />
                        <FormKit type="number" label="Maximum Length" v-model="maxLength" :min="1"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>
                  </div>

                  <!-- Number Range Validation -->
                  <div v-if="component.type === 'number'" class="validation-item">
                    <label class="validation-toggle" @click.stop>
                      <input type="checkbox" v-model="hasNumberValidation" />
                      <span class="toggle-slider"></span>
                      <div class="validation-info">
                        <span class="validation-title">Number Range</span>
                        <span class="validation-desc">Set minimum and maximum values</span>
                      </div>
                    </label>

                    <div v-if="hasNumberValidation" class="validation-details">
                      <div class="grid grid-cols-2 gap-4">
                        <FormKit type="number" label="Minimum Value" v-model="minNumber"
                          :classes="{ outer: 'field-wrapper' }" />
                        <FormKit type="number" label="Maximum Value" v-model="maxNumber"
                          :classes="{ outer: 'field-wrapper' }" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Validation -->
                <div class="mt-6">
                  <FormKit type="text" label="Custom Validation Rules" name="validation"
                    v-model="configModel.validation"
                    help="Advanced: Enter custom validation rules using the format below"
                    :classes="{ outer: 'field-wrapper' }" placeholder="e.g., required|email|length:3,50" />



                  <!-- Validation Rules Guide -->
                  <ValidationRulesHelp />
                </div>
              </div>
            </div>
          </div>

          <!-- Conditional Logic Section -->
          <div v-if="activeTab === 'conditional'" class="section-container mt-6">
            <div class="section">
              <div class="section-wrapper">
                <div class="section-header">
                  <h4 class="section-title">
                    <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5 mr-2" />
                    Conditional Logic
                  </h4>
                  <p class="section-description">Show, hide, or disable this field based on other field values</p>
                </div>

                <div class="section-content">
                  <!-- Enable Conditional Logic -->
                  <FormKit type="switch" label="Enable Conditional Logic" name="conditionalLogicEnabled"
                    v-model="configModel.conditionalLogic.enabled" help="Show or hide this field based on other fields"
                    :classes="{ outer: 'field-wrapper' }" />

                  <!-- Conditional Logic Configuration -->
                  <div v-if="configModel.conditionalLogic.enabled" class="mt-4 space-y-4">
                    <!-- Action Selection -->
                    <FormKit type="select" label="Action" name="conditionalAction"
                      v-model="configModel.conditionalLogic.action" :options="[
                        { label: 'Show this field', value: 'show' },
                        { label: 'Hide this field', value: 'hide' },
                        { label: 'Enable this field', value: 'enable' },
                        { label: 'Disable this field', value: 'disable' }
                      ]" help="What should happen when conditions are met" :classes="{ outer: 'field-wrapper' }" />

                    <!-- Operator Selection (when multiple conditions) -->
                    <FormKit v-if="configModel.conditionalLogic.conditions.length > 1" type="select"
                      label="Logic Operator" name="conditionalOperator" v-model="configModel.conditionalLogic.operator"
                      :options="[
                        { label: 'All conditions must be true (AND)', value: 'and' },
                        { label: 'Any condition can be true (OR)', value: 'or' }
                      ]" help="How multiple conditions should be evaluated" :classes="{ outer: 'field-wrapper' }" />

                    <!-- Conditions -->
                    <div class="conditions-section">
                      <h5 class="text-sm font-medium text-gray-700 mb-3">Conditions</h5>

                      <div v-if="configModel.conditionalLogic.conditions.length === 0"
                        class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        <Icon name="heroicons:plus-circle" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p class="text-sm">No conditions set. Add a condition to get started.</p>
                      </div>

                      <div v-else class="space-y-3">
                        <div v-for="(condition, index) in configModel.conditionalLogic.conditions" :key="index"
                          class="condition-item bg-gray-50 p-4 rounded-lg border">
                          <div class="grid grid-cols-3 gap-3">
                            <FormKit type="text" label="Field Name" :name="`condition_field_${index}`"
                              v-model="condition.field" placeholder="field_name" help="Name of the field to check"
                              :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="select" label="Operator" :name="`condition_operator_${index}`"
                              v-model="condition.operator" :options="[
                                { label: 'Equals', value: 'equals' },
                                { label: 'Not equals', value: 'not_equals' },
                                { label: 'Contains', value: 'contains' },
                                { label: 'Does not contain', value: 'not_contains' },
                                { label: 'Is empty', value: 'is_empty' },
                                { label: 'Is not empty', value: 'is_not_empty' },
                                { label: 'Greater than', value: 'greater_than' },
                                { label: 'Less than', value: 'less_than' }
                              ]" :classes="{ outer: 'field-wrapper' }" />

                            <FormKit type="text" label="Value" :name="`condition_value_${index}`"
                              v-model="condition.value" placeholder="Value to compare"
                              help="Leave empty for 'is empty' conditions" :classes="{ outer: 'field-wrapper' }" />
                          </div>

                          <div class="flex justify-end mt-3">
                            <button @click="removeCondition(index)" type="button"
                              class="text-red-600 hover:text-red-800 text-sm flex items-center">
                              <Icon name="heroicons:trash" class="w-4 h-4 mr-1" />
                              Remove Condition
                            </button>
                          </div>
                        </div>
                      </div>

                      <button @click="addCondition" type="button"
                        class="mt-3 inline-flex items-center px-3 py-2 border border-blue-600 text-blue-600 bg-white hover:bg-gray-50 rounded text-sm">
                        <Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
                        Add Condition
                      </button>
                    </div>

                    <!-- Preview JavaScript Code -->
                    <div v-if="configModel.conditionalLogic.conditions.length > 0" class="mt-4">
                      <h5 class="text-sm font-medium text-gray-700 mb-2">Generated Code Preview</h5>
                      <div class="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                        {{ generateConditionalLogicCode() }}
                      </div>
                      <p class="text-xs text-gray-500 mt-1">This JavaScript will be automatically executed to handle the
                        conditional logic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <RsButton @click="handleClose" variant="secondary-outline">
          Cancel
        </RsButton>

        <div class="flex space-x-3">
          <RsButton @click="showResetConfirmation" variant="warning-outline">
            <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-1" />
            Reset to Default
          </RsButton>

          <RsButton @click="handleSave" variant="primary">
            <Icon name="heroicons:check" class="w-4 h-4 mr-1" />
            Apply Changes
          </RsButton>
        </div>
      </div>
    </template>
  </RsModal>

  <!-- Reset Confirmation Modal -->
  <RsModal v-model="showResetModal" title="Confirm Reset" size="md" position="center">
    <div class="p-4">
      <div class="flex items-center mb-4">
        <Icon name="material-symbols:warning-outline" class="text-yellow-500 w-8 h-8 mr-3 flex-shrink-0" />
        <div>
          <p class="text-gray-600 font-medium mb-1">Reset to Default Settings</p>
          <p class="text-gray-600 text-sm">
            Are you sure you want to reset this component to its default settings? This action will overwrite all
            current
            configuration and cannot be undone.
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <RsButton @click="cancelReset" variant="tertiary">
          Cancel
        </RsButton>
        <RsButton @click="confirmReset" variant="warning">
          <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-1" />
          Reset to Default
        </RsButton>
      </div>
    </template>
  </RsModal>

</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import ValidationRulesHelp from '~/components/ValidationRulesHelp.vue'
import IconBrowser from '~/components/IconBrowser.vue'
import ProcessBrowser from '~/components/ProcessBrowser.vue'
import ActionConditionsBuilder from '~/components/ActionConditionsBuilder.vue'
import { useFormBuilderStore } from '~/stores/formBuilder'

const props = defineProps({
  modelValue: Boolean,
  component: Object
})

const emit = defineEmits(['update:modelValue', 'update-component', 'close'])

// Store
const formStore = useFormBuilderStore()

// Modal state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const activeTab = ref('basic')
const customHtmlActiveTab = ref('html')
const configModel = ref({
  conditionalLogic: {
    enabled: false,
    conditions: [],
    action: 'show',
    operator: 'and'
  }
})

// Type changing state
const pendingTypeChange = ref(null)
const showTypeChangePreview = ref(false)
const showResetModal = ref(false)

// Component info helpers
const modalTitle = computed(() => {
  if (!props.component) return 'Field Settings'
  return `Configure ${getComponentTypeName(props.component.type)}`
})

// Computed property for action type (handles backward compatibility)
const currentActionType = computed({
  get() {
    // Check actionType first, then linkType, then action field, fallback to 'none'
    return configModel.value.actionType || 
           configModel.value.linkType || 
           configModel.value.action || 
           'none'
  },
  set(newValue) {
    handleActionTypeChange(newValue)
  }
})

const getComponentIcon = (type) => {
  const icons = {
    text: 'heroicons:document-text',
    textarea: 'heroicons:document-text',
    number: 'heroicons:hashtag',
    email: 'heroicons:envelope',
    password: 'heroicons:key',
    url: 'heroicons:link',
    tel: 'heroicons:device-phone-mobile',
    mask: 'heroicons:pencil-square',
    hidden: 'heroicons:eye-slash',
    select: 'heroicons:chevron-down',
    searchSelect: 'heroicons:magnifying-glass',
    quillEditor: 'material-symbols:edit-document',
    checkbox: 'heroicons:check-badge',
    radio: 'heroicons:radio',
    switch: 'material-symbols:toggle-on',
    date: 'heroicons:calendar-days',
    time: 'heroicons:clock',
    'datetime-local': 'heroicons:calendar',
    range: 'heroicons:adjustments-horizontal',
    color: 'heroicons:swatch',
    file: 'heroicons:document-arrow-up',
    customFileUpload: 'material-symbols:upload-file-outline',
    otp: 'heroicons:key',
    dropzone: 'heroicons:cloud-arrow-up',
    button: 'heroicons:cursor-arrow-rays',
    heading: 'heroicons:h1',
    paragraph: 'heroicons:document-text',
    divider: 'heroicons:minus',
    'form-section': 'material-symbols:view-module-outline',
    'tab-container': 'material-symbols:tab',
    'layout-grid': 'material-symbols:grid-on',
    'info-display': 'heroicons:information-circle',
    'dynamic-list': 'heroicons:list-bullet',
    'repeating-table': 'heroicons:table-cells',
    'repeating-group': 'heroicons:list-bullet',
    'customHtml': 'material-symbols:code'
  }
  return icons[type] || 'heroicons:square-3-stack-3d'
}

const getComponentTypeName = (type) => {
  const names = {
    text: 'Text Field',
    textarea: 'Text Area',
    number: 'Number Field',
    email: 'Email Field',
    password: 'Password Field',
    url: 'URL Field',
    tel: 'Phone Field',
    mask: 'Masked Input',
    hidden: 'Hidden Field',
    select: 'Dropdown Menu',
    searchSelect: 'Searchable Dropdown',
    quillEditor: 'Rich Text Editor',
    checkbox: 'Checkboxes',
    radio: 'Radio Buttons',
    switch: 'Switch Toggle',
    date: 'Date Picker',
    time: 'Time Picker',
    'datetime-local': 'Date & Time',
    range: 'Range Slider',
    color: 'Color Picker',
    file: 'File Upload (Basic)',
    customFileUpload: 'File Upload (Enhanced)',
    otp: 'Verification Code',
    dropzone: 'File Drop Zone',
    button: 'Action Button',
    heading: 'Heading Text',
    paragraph: 'Paragraph Text',
    divider: 'Divider Line',
    'form-section': 'Form Section',
    'tab-container': 'Tab Container',
    'layout-grid': 'Layout Grid',
    'info-display': 'Information Display',
    'dynamic-list': 'Dynamic List',
    'repeating-table': 'Data Table',
    'repeating-group': 'Repeating Group',
    'customHtml': 'Custom HTML'
  }
  return names[type] || 'Form Field'
}

const getComponentDescription = (type) => {
  const descriptions = {
    text: 'Single line text input for names, titles, and short text',
    textarea: 'Multi-line text area for longer content and descriptions',
    number: 'Numeric input with validation for quantities, prices, and counts',
    email: 'Email address input with format validation',
    password: 'Secure password input with hidden characters',
    url: 'Website URL input with link validation',
    tel: 'Phone number input for contact information',
    mask: 'Formatted text input with custom patterns like phone numbers',
    hidden: 'Hidden field for storing data not visible to users',
    select: 'Dropdown menu for choosing one option from a list',
    searchSelect: 'Searchable dropdown menu with type-to-filter functionality',
    quillEditor: 'Rich text editor with formatting toolbar for creating formatted content',
    checkbox: 'Multiple checkboxes for selecting multiple options',
    radio: 'Radio buttons for choosing one option from a group',
    switch: 'Toggle switch for enabling/disabling options',
    date: 'Date picker for selecting dates',
    time: 'Time picker for selecting times',
    'datetime-local': 'Combined date and time selection',
    range: 'Slider for selecting values within a range',
    color: 'Color picker for selecting colors',
    file: 'Simple native browser file upload - quick and standard',
    customFileUpload: 'Advanced file upload with custom styling, preview, and download features',
    otp: 'One-time password input for verification codes',
    dropzone: 'Drag and drop file upload area',
    button: 'Action button for forms and interactions',
    heading: 'Section heading to organize form content',
    paragraph: 'Text content for instructions and descriptions',
    divider: 'Visual separator to organize form sections',
    'form-section': 'Visual container to group related form fields into sections',
    'tab-container': 'Organize content into tabbed sections for better user experience',
    'layout-grid': 'Create custom grid layouts for precise component positioning',
    'info-display': 'Read-only information display in organized format',
    'dynamic-list': 'Dynamic list for displaying and managing items',
    'repeating-table': 'Structured table for collecting multiple records with forms',
    'repeating-group': 'Collect multiple entries of the same data structure',
    'customHtml': 'Create custom designs using HTML, CSS, and JavaScript'
  }
  return descriptions[type] || 'Configure this form field'
}

// Tab management
const availableTabs = computed(() => {
  const tabs = [
    { id: 'basic', label: 'Basic Settings', icon: 'heroicons:cog-6-tooth' }
  ]

  // Add layout tab for components that support width settings
  if (showField('width')) {
    tabs.push({ id: 'layout', label: 'Layout', icon: 'heroicons:squares-2x2' })
  }

  if (hasOptions.value) {
    tabs.push({ id: 'options', label: 'Options', icon: 'heroicons:list-bullet' })
  }

  // Only add validation tab for components that support validation
  if (supportsValidation.value) {
    tabs.push({ id: 'validation', label: 'Validation', icon: 'heroicons:shield-check' })
  }

  // // Add advanced tab for components with advanced/specific settings
  // if (hasSpecificSettings.value) {
  //   tabs.push({ id: 'advanced', label: 'Advanced', icon: 'heroicons:adjustments-horizontal' })
  // }

  // Add conditional logic tab for components that support it
  if (showConditionalLogic.value) {
    tabs.push({ id: 'conditional', label: 'Conditional Logic', icon: 'heroicons:code-bracket' })
  }

  return tabs
})

// Field visibility helpers
const showField = (fieldName) => {
  if (!props.component) return false

  const fieldConfig = {
    label: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask', 'select', 'searchSelect', 'quillEditor', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local', 'range', 'color', 'file', 'customFileUpload', 'otp', 'dropzone', 'button', 'form-section', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml', 'info-display', 'image-preview', 'divider', 'layout-grid', 'tab-container'],
    name: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask', 'hidden', 'select', 'searchSelect', 'quillEditor', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local', 'range', 'color', 'file', 'customFileUpload', 'otp', 'dropzone', 'button', 'form-section', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml', 'info-display', 'image-preview', 'divider', 'layout-grid', 'tab-container'],
    placeholder: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask', 'select', 'searchSelect', 'quillEditor', 'dynamic-list'],
    help: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask', 'hidden', 'select', 'searchSelect', 'quillEditor', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local', 'range', 'color', 'file', 'customFileUpload', 'otp', 'dropzone', 'button', 'form-section', 'tab-container', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml', 'info-display', 'image-preview', 'divider', 'layout-grid'],
    value: ['heading', 'paragraph', 'hidden'],
    width: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask', 'select', 'searchSelect', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local', 'range', 'color', 'file', 'customFileUpload', 'otp', 'dropzone', 'button', 'heading', 'paragraph', 'form-section', 'tab-container', 'info-display', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml', 'image-preview', 'divider', 'layout-grid'],
    rows: ['textarea'],
    options: ['select', 'searchSelect', 'checkbox', 'radio'],
    conditionalLogic: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'select', 'searchSelect', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local', 'range', 'color', 'file', 'customFileUpload', 'form-section', 'tab-container', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml'],
    readonly: ['text', 'number', 'email', 'password', 'textarea', 'mask', 'url', 'tel', 'select', 'searchSelect', 'checkbox', 'radio', 'switch', 'date', 'time', 'datetime-local']
  }

  return fieldConfig[fieldName]?.includes(props.component.type) || false
}

const hasOptions = computed(() => showField('options'))
const hasSpecificSettings = computed(() => {
  if (!props.component) return false
  const specificTypes = ['mask', 'otp', 'quillEditor', 'dropzone', 'customFileUpload', 'range', 'button', 'form-section', 'tab-container', 'dynamic-list', 'repeating-table', 'repeating-group', 'customHtml', 'info-display', 'layout-grid', 'image-preview', 'divider', 'searchSelect']
  return specificTypes.includes(props.component.type)
})

// Components that support validation
const supportsValidation = computed(() => {
  if (!props.component) return false
  const validationSupportedTypes = [
    'text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'select',
    'searchSelect', 'quillEditor', 'checkbox', 'radio', 'date', 'time', 'datetime-local', 'range', 'color',
    'file', 'customFileUpload', 'otp', 'dropzone', 'mask'
  ]
  return validationSupportedTypes.includes(props.component.type)
})

const showConditionalLogic = computed(() => {
  if (!props.component) return false
  const validationSupportedTypes = [
    'text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'select',
    'searchSelect', 'quillEditor', 'checkbox', 'radio', 'date', 'time', 'datetime-local', 'range', 'color',
    'file', 'customFileUpload', 'otp', 'dropzone', 'mask'
  ]
  return validationSupportedTypes.includes(props.component.type)
})

// Validation helpers
const isRequired = computed({
  get: () => configModel.value.validation?.includes('required') || false,
  set: (value) => updateValidation('required', value)
})

const isEmailValidation = computed({
  get: () => configModel.value.validation?.includes('email') || false,
  set: (value) => updateValidation('email', value)
})

const isUrlValidation = computed({
  get: () => configModel.value.validation?.includes('url') || false,
  set: (value) => updateValidation('url', value)
})

const hasLengthValidation = ref(false)
const minLength = ref(null)
const maxLength = ref(null)

const hasNumberValidation = ref(false)
const minNumber = ref(null)
const maxNumber = ref(null)

const isTextBasedField = computed(() => {
  return ['text', 'textarea', 'email', 'password', 'url', 'tel'].includes(props.component?.type)
})

// Default Value Field Helpers
const showDefaultValueField = () => {
  if (!props.component) return false

  // List of components that support default values
  const supportedTypes = [
    'text', 'textarea', 'number', 'email', 'password', 'url', 'tel',
    'mask', 'select', 'searchSelect', 'checkbox', 'radio', 'switch',
    'date', 'time', 'datetime-local', 'range', 'color', 'hidden'
  ]

  return supportedTypes.includes(props.component.type)
}

const getDefaultValueFieldType = () => {
  if (!props.component) return 'text'

  const fieldTypeMap = {
    'text': 'text',
    'textarea': 'textarea',
    'number': 'number',
    'email': 'email',
    'password': 'text',
    'url': 'url',
    'tel': 'tel',
    'mask': 'text',
    'select': 'select',
    'searchSelect': 'select',
    'checkbox': 'checkbox',
    'radio': 'select',
    'switch': 'switch',
    'date': 'date',
    'time': 'time',
    'datetime-local': 'datetime-local',
    'range': 'number',
    'color': 'color',
    'hidden': 'text'
  }

  return fieldTypeMap[props.component.type] || 'text'
}

// Modal options for button targeting
const getModalOptions = () => {
  const options = [{ label: 'Select a modal...', value: '' }]

  // Add all available modals from the form builder store
  Object.values(formStore.modals || {}).forEach(modal => {
    options.push({
      label: modal.name,
      value: modal.id
    })
  })

  // If no modals exist, show helpful message
  if (options.length === 1) {
    options.push({ label: 'No modals available - create one first', value: '', disabled: true })
  }

  return options
}

const getDefaultValueHelp = () => {
  if (!props.component) return 'Initial value when the form loads'

  const helpTexts = {
    'select': 'Choose the default selected option',
    'searchSelect': 'Choose the default selected option',
    'checkbox': 'Select the default checked options',
    'radio': 'Choose the default selected option',
    'switch': 'Set the default on/off state',
    'date': 'Set the default date (YYYY-MM-DD)',
    'time': 'Set the default time (HH:MM)',
    'datetime-local': 'Set the default date and time',
    'range': 'Set the default slider value',
    'color': 'Choose the default color',
    'number': 'Set the default numeric value'
  }

  return helpTexts[props.component.type] || 'Initial value when the form loads'
}

const getDefaultValuePlaceholder = () => {
  if (!props.component) return ''

  const placeholders = {
    'text': 'e.g., John Doe',
    'email': 'e.g., user@example.com',
    'url': 'e.g., https://example.com',
    'tel': 'e.g., +1234567890',
    'number': 'e.g., 100',
    'date': 'YYYY-MM-DD',
    'time': 'HH:MM',
    'datetime-local': 'YYYY-MM-DDTHH:MM'
  }

  return placeholders[props.component.type] || ''
}

// Safe HTML preview for custom HTML component
const getSafeHtmlPreview = (htmlContent) => {
  if (!htmlContent) return ''

  // Remove script tags and event handlers for safe preview
  return htmlContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
}

// Full HTML preview with CSS included
const getFullHtmlPreview = (htmlContent, cssContent) => {
  if (!htmlContent) return ''

  const safeHtml = getSafeHtmlPreview(htmlContent)

  if (cssContent) {
    // Create a unique ID for scoping
    const previewId = `preview-${Date.now()}`

    // Scope the CSS to the preview container
    const scopedCss = cssContent.replace(
      /([^@{}]+)\s*{/g,
      `#${previewId} $1 {`
    )

    return `
      <style>
        #${previewId} {
          /* Preview container styles */
          position: relative;
        }
        ${scopedCss}
      </style>
      <div id="${previewId}">${safeHtml}</div>
    `
  }

  return safeHtml
}

// Custom HTML tab integration
const getTotalContentLength = () => {
  const html = configModel.value.htmlContent || '';
  const css = configModel.value.cssContent || '';
  const js = configModel.value.jsContent || '';
  return html.length + css.length + js.length;
}

// ProcessBrowser component handles its own data fetching

// Generate iframe URL preview
const getIframeUrlPreview = () => {
  if (!configModel.value.linkProcessId) {
    return 'Select a process first...'
  }

  const baseUrl = `${window.location.origin}/workflow/${configModel.value.linkProcessId}`
  const params = new URLSearchParams()

  // Add debug parameter (false = iframe mode, true = debug mode)
  if (configModel.value.iframeDebug !== undefined) {
    params.append('debug', configModel.value.iframeDebug ? 'true' : 'false')
  }

  // Add hideComplete parameter
  if (configModel.value.iframeHideComplete) {
    params.append('hideComplete', 'true')
  }

  // Add theme parameter
  if (configModel.value.iframeTheme) {
    params.append('theme', configModel.value.iframeTheme)
  }

  // Add custom parameters
  if (configModel.value.iframeCustomParams) {
    const customParams = new URLSearchParams(configModel.value.iframeCustomParams)
    customParams.forEach((value, key) => {
      params.append(key, value)
    })
  }

  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

// Generate custom button styles for preview
const getCustomButtonStyles = () => {
  const styles = {
    backgroundColor: configModel.value.customBackgroundColor || '#3b82f6',
    color: configModel.value.customTextColor || '#ffffff',
    border: 'none',
    cursor: 'pointer'
  }

  // Add border if specified
  if (configModel.value.customBorderColor && configModel.value.customBorderWidth) {
    styles.border = `${configModel.value.customBorderWidth}px solid ${configModel.value.customBorderColor}`
  }

  // Add border radius
  if (configModel.value.customBorderRadius) {
    styles.borderRadius = `${configModel.value.customBorderRadius}px`
  }

  // Add hover effects
  const hoverEffect = configModel.value.customHoverEffect
  if (hoverEffect && hoverEffect !== 'none') {
    switch (hoverEffect) {
      case 'darken':
        styles[':hover'] = { filter: 'brightness(0.9)' }
        break
      case 'lighten':
        styles[':hover'] = { filter: 'brightness(1.1)' }
        break
      case 'scale':
        styles[':hover'] = { transform: 'scale(1.05)' }
        break
      case 'glow':
        styles[':hover'] = {
          boxShadow: `0 0 10px ${configModel.value.customBackgroundColor || '#3b82f6'}`
        }
        break
    }
  }

  return styles
}

// Type changing functionality
const compatibilityGroups = {
  // Text-based inputs (can switch between each other)
  textInputs: ['text', 'textarea', 'number', 'email', 'password', 'url', 'tel', 'mask'],

  // Selection inputs (can switch between each other)
  selectionInputs: ['select', 'searchSelect', 'radio', 'checkbox'],

  // Date/time inputs (can switch between each other)
  dateTimeInputs: ['date', 'time', 'datetime-local'],

  // Number-based inputs
  numberInputs: ['number', 'range'],

  // File inputs
  fileInputs: ['file', 'dropzone', 'customFileUpload'],

  // Layout elements
  layoutElements: ['heading', 'paragraph'],

  // Advanced inputs (each unique but can have some compatibility)
  advancedInputs: ['switch', 'color', 'otp', 'hidden']
}

const availableTypeChanges = computed(() => {
  if (!props.component) return []

  const currentType = props.component.type

  // Find which group the current type belongs to
  for (const [groupName, types] of Object.entries(compatibilityGroups)) {
    if (types.includes(currentType)) {
      // Return other types in the same group
      return types.filter(type => type !== currentType)
    }
  }

  return []
})

// Get preserved properties when changing types
const getPreservedProperties = (fromType, toType) => {
  const commonProperties = ['label', 'name', 'help', 'validation', 'width', 'gridColumn']
  const preserved = [...commonProperties]

  // Check for specific preserved properties based on compatibility groups
  if (compatibilityGroups.textInputs.includes(fromType) && compatibilityGroups.textInputs.includes(toType)) {
    preserved.push('placeholder')
  }

  if (compatibilityGroups.selectionInputs.includes(fromType) && compatibilityGroups.selectionInputs.includes(toType)) {
    preserved.push('options')
  }

  if (compatibilityGroups.dateTimeInputs.includes(fromType) && compatibilityGroups.dateTimeInputs.includes(toType)) {
    preserved.push('min', 'max')
  }

  if (compatibilityGroups.numberInputs.includes(fromType) && compatibilityGroups.numberInputs.includes(toType)) {
    preserved.push('min', 'max', 'step')
  }

  if (compatibilityGroups.fileInputs.includes(fromType) && compatibilityGroups.fileInputs.includes(toType)) {
    preserved.push('accept', 'multiple')
  }

  if (compatibilityGroups.layoutElements.includes(fromType) && compatibilityGroups.layoutElements.includes(toType)) {
    preserved.push('value')
  }

  return preserved.filter((prop, index, self) => self.indexOf(prop) === index) // Remove duplicates
}

// File size helper
const configModelMaxSizeMB = computed({
  get: () => configModel.value.maxSize ? Math.round(configModel.value.maxSize / (1024 * 1024)) : 5,
  set: (value) => {
    configModel.value.maxSize = value * 1024 * 1024
  }
})

// Width options with smart recommendations
const widthOptions = [
  {
    name: 'Narrow',
    value: 25,
    gridColumns: 3,
    type: 'narrow',
    description: 'Quarter width',
    useCase: 'Small inputs like age, zip code, or short codes'
  },
  {
    name: 'Small',
    value: 33,
    gridColumns: 4,
    type: 'small',
    description: 'One-third width',
    useCase: 'Short text fields, city names, or grouped inputs'
  },
  {
    name: 'Medium',
    value: 50,
    gridColumns: 6,
    type: 'medium',
    description: 'Half width',
    useCase: 'Names, phone numbers, or paired inputs'
  },
  {
    name: 'Wide',
    value: 75,
    gridColumns: 9,
    type: 'wide',
    description: 'Three-quarter width',
    useCase: 'Addresses, longer text, or prominent fields'
  },
  {
    name: 'Full',
    value: 100,
    gridColumns: 12,
    type: 'full',
    description: 'Full width',
    useCase: 'Long text, paragraphs, or single-column layout'
  }
]

// Smart recommendations based on field type
const getRecommendedWidth = (fieldType) => {
  const recommendations = {
    // Narrow fields (25% - 3 columns)
    'number': 'narrow',
    'date': 'narrow',
    'time': 'narrow',
    'color': 'narrow',
    'otp': 'narrow',

    // Small fields (33% - 4 columns)
    'text': 'small',

    // Medium fields (50% - 6 columns)
    'email': 'medium',
    'tel': 'medium',
    'password': 'medium',
    'mask': 'medium',
    'select': 'medium',
    'datetime-local': 'medium',

    // Wide fields (75% - 9 columns)
    'url': 'wide',
    'file': 'wide',
    'dropzone': 'wide',

    // Full width fields (100% - 12 columns)
    'textarea': 'full',
    'heading': 'full',
    'paragraph': 'full',
    'checkbox': 'full',
    'radio': 'full',
    'range': 'full',
    'switch': 'full',
    'button': 'full',
    'info-display': 'full',
    'dynamic-list': 'full',
    'repeating-table': 'full'
  }

  return recommendations[fieldType] || 'full'
}

const isRecommendedWidth = (widthType) => {
  return getRecommendedWidth(props.component?.type) === widthType
}

const getCurrentWidthOption = () => {
  const currentPercent = getComponentWidthPercent()
  return widthOptions.find(option => option.value === currentPercent)
}

const getCurrentGridColumns = () => {
  const currentPercent = getComponentWidthPercent()
  const option = widthOptions.find(opt => opt.value === currentPercent)
  return option ? option.gridColumns : 12
}

// Watch for component changes
watch(() => props.component, (newComponent) => {
  if (newComponent) {
    configModel.value = {
      ...newComponent.props,
      // Ensure conditionalLogic is properly initialized
      conditionalLogic: newComponent.props.conditionalLogic || {
        enabled: false,
        conditions: [],
        action: 'show',
        operator: 'and'
      },
      // Initialize conditional action configurations for datatable
      ...(newComponent.type === 'repeating-table' && {
        // Core datatable permissions - ensure they exist for existing components
        allowEdit: newComponent.props.allowEdit ?? true,
        editReadonly: newComponent.props.editReadonly ?? false,
        allowDelete: newComponent.props.allowDelete ?? true,
        confirmDelete: newComponent.props.confirmDelete ?? false,
        
        // Inline editing feature - initialize for existing components
        enableInlineEditing: newComponent.props.enableInlineEditing ?? false,
        
        // Pagination settings - initialize for existing components
        rowsPerPage: newComponent.props.rowsPerPage ?? 5,
        hidePagination: newComponent.props.hidePagination ?? false,
        
        // Initialize column properties for backward compatibility
        columns: (newComponent.props.columns || []).map(column => ({
          ...column,
          hideFromTable: column.hideFromTable ?? false,
          allowInlineEdit: column.allowInlineEdit ?? true,
          alwaysEditable: column.alwaysEditable ?? false
        })),
        
        // Conditional action configurations
        editActionConditions: newComponent.props.editActionConditions || {
          enabled: false,
          conditions: [],
          operator: 'and'
        },
        deleteActionConditions: newComponent.props.deleteActionConditions || {
          enabled: false,
          conditions: [],
          operator: 'and'
        },
        // Ensure custom actions have showWhen configuration
        customActions: (newComponent.props.customActions || []).map(action => ({
          ...action,
          showWhen: action.showWhen || {
            enabled: false,
            conditions: [],
            operator: 'and'
          }
        }))
      }),
      // Initialize customFileUpload properties for backward compatibility
      ...(newComponent.type === 'customFileUpload' && {
        uploadedFilesText: newComponent.props.uploadedFilesText ?? 'Uploaded Files',
        showFileCount: newComponent.props.showFileCount ?? true
      })
    }
    activeTab.value = 'basic'
    resetValidationState()
  }
}, { immediate: true })

// Methods - Define resetValidationState first before it's used above
const resetValidationState = () => {
  hasLengthValidation.value = false
  hasNumberValidation.value = false
  minLength.value = null
  maxLength.value = null
  minNumber.value = null
  maxNumber.value = null
}

const updateValidation = (rule, enabled) => {
  let current = configModel.value.validation || ''
  const rules = current.split('|').filter(r => r && r !== rule)

  if (enabled) {
    rules.push(rule)
  }

  configModel.value.validation = rules.join('|')
}

const setComponentWidth = (percentage, gridColumns) => {
  configModel.value.width = `${percentage}%`
  configModel.value.gridColumn = `span ${gridColumns}`
}

const getComponentWidthPercent = () => {
  const width = configModel.value.width || '100%'
  return parseInt(width.replace('%', ''))
}

const addOption = () => {
  if (!configModel.value.options) {
    configModel.value.options = []
  }
  configModel.value.options.push({
    label: `Option ${configModel.value.options.length + 1}`,
    value: `option_${configModel.value.options.length + 1}`
  })

  // Ensure null option is managed correctly (only for select components)
  if (['select', 'searchSelect'].includes(props.component?.type) &&
    props.component?.props?.hasOwnProperty('enableNullOption')) {
    manageNullOption();
  }
}

// Manage null option based on enableNullOption setting (only for select components)
const manageNullOption = () => {
  // Only manage null option for select components that have enableNullOption property
  if (!configModel.value.options || !['select', 'searchSelect'].includes(props.component?.type)) return;

  // Check if the component actually has the enableNullOption property
  if (!props.component?.props?.hasOwnProperty('enableNullOption')) return;

  const hasNullOption = configModel.value.options.some(option => option.value === '');
  const shouldHaveNullOption = configModel.value.enableNullOption !== false;

  if (shouldHaveNullOption && !hasNullOption) {
    // Add null option at the beginning
    configModel.value.options.unshift({ label: 'Please select...', value: '' });
  } else if (!shouldHaveNullOption && hasNullOption) {
    // Remove null option
    configModel.value.options = configModel.value.options.filter(option => option.value !== '');
  }
}

// Watch for changes in enableNullOption and manage the null option accordingly (only for select components)
watch(() => configModel.value.enableNullOption, () => {
  if (['select', 'searchSelect'].includes(props.component?.type) &&
    props.component?.props?.hasOwnProperty('enableNullOption')) {
    manageNullOption();
  }
}, { immediate: true });

// Also watch for changes in the options array to ensure null option is managed (only for select components)
watch(() => configModel.value.options, () => {
  if (['select', 'searchSelect'].includes(props.component?.type) &&
    props.component?.props?.hasOwnProperty('enableNullOption')) {
    manageNullOption();
  }
}, { deep: true, immediate: true });

const removeOption = (index) => {
  if (configModel.value.options && configModel.value.options.length > index) {
    configModel.value.options.splice(index, 1)
  }

  // Ensure null option is managed correctly after removal (only for select components)
  if (['select', 'searchSelect'].includes(props.component?.type) &&
    props.component?.props?.hasOwnProperty('enableNullOption')) {
    manageNullOption();
  }
}

// Tab management methods for tab-container
const addTab = () => {
  if (!configModel.value.tabs) {
    configModel.value.tabs = []
  }
  const tabNumber = configModel.value.tabs.length + 1
  configModel.value.tabs.push({
    id: `tab${tabNumber}`,
    label: `Tab ${tabNumber}`,
    content: [],
    icon: null
  })
}

const removeTab = (index) => {
  if (configModel.value.tabs && configModel.value.tabs.length > index) {
    configModel.value.tabs.splice(index, 1)
  }
}

const updateTabLabel = (index, newLabel) => {
  if (configModel.value.tabs && configModel.value.tabs.length > index) {
    configModel.value.tabs[index].label = newLabel
  }
}

// Default items management for dynamic-list
const addDefaultItem = () => {
  if (!configModel.value.defaultItems) {
    configModel.value.defaultItems = []
  }
  configModel.value.defaultItems.push('')
}

const removeDefaultItem = (index) => {
  if (configModel.value.defaultItems) {
    configModel.value.defaultItems.splice(index, 1)
  }
}

// Conditional logic management
const addCondition = () => {
  if (!configModel.value.conditionalLogic) {
    configModel.value.conditionalLogic = {
      enabled: true,
      conditions: [],
      action: 'show',
      operator: 'and'
    }
  }

  if (!configModel.value.conditionalLogic.conditions) {
    configModel.value.conditionalLogic.conditions = []
  }

  configModel.value.conditionalLogic.conditions.push({
    field: '',
    operator: 'equals',
    value: ''
  })
}

const removeCondition = (index) => {
  if (configModel.value.conditionalLogic?.conditions) {
    configModel.value.conditionalLogic.conditions.splice(index, 1)
  }
}

// Info Display field management
const addInfoField = () => {
  if (!configModel.value.fields) {
    configModel.value.fields = []
  }

  configModel.value.fields.push({
    label: `Field ${configModel.value.fields.length + 1}`,
    value: 'Value',
    key: `field_${configModel.value.fields.length + 1}`,
    type: 'text', // text, button
    url: '', // for button type
    openInNewTab: false, // for button type
    icon: '' // for button type
  })
}

const removeInfoField = (index) => {
  if (configModel.value.fields && configModel.value.fields.length > index) {
    configModel.value.fields.splice(index, 1)
  }
}

const generateConditionalLogicCode = () => {
  if (!configModel.value.conditionalLogic || !configModel.value.conditionalLogic.conditions.length) {
    return '// No conditions defined'
  }

  const { conditions, action, operator } = configModel.value.conditionalLogic
  const fieldName = configModel.value.name || 'this_field'

  // Helper function to map operators to valid JavaScript
  const getJavaScriptOperator = (operator) => {
    switch (operator) {
      case 'and':
      case 'AND':
        return '&&'
      case 'or':
      case 'OR':
        return '||'
      default:
        return '&&' // Default to AND if unknown operator
    }
  }

  // Helper function to generate condition check
  const generateConditionCheck = (condition) => {
    const { field, operator: condOp, value } = condition

    switch (condOp) {
      case 'equals':
        return `getField('${field}') === '${value}'`
      case 'not_equals':
        return `getField('${field}') !== '${value}'`
      case 'contains':
        return `String(getField('${field}') || '').toLowerCase().includes('${value}'.toLowerCase())`
      case 'not_contains':
        return `!String(getField('${field}') || '').toLowerCase().includes('${value}'.toLowerCase())`
      case 'is_empty':
        return `!getField('${field}') || getField('${field}') === ''`
      case 'is_not_empty':
        return `getField('${field}') && getField('${field}') !== ''`
      case 'greater_than':
        return `Number(getField('${field}')) > ${Number(value) || 0}`
      case 'less_than':
        return `Number(getField('${field}')) < ${Number(value) || 0}`
      default:
        return `getField('${field}') === '${value}'`
    }
  }

  // Helper function to generate action code
  const generateActionCode = (action, fieldName) => {
    switch (action) {
      case 'show': return `showField('${fieldName}')`
      case 'hide': return `hideField('${fieldName}')`
      case 'enable': return `enableField('${fieldName}')`
      case 'disable': return `disableField('${fieldName}')`
      default: return `showField('${fieldName}')`
    }
  }

  // Helper function to generate inverse action code
  const generateInverseActionCode = (action, fieldName) => {
    switch (action) {
      case 'show': return `hideField('${fieldName}')`
      case 'hide': return `showField('${fieldName}')`
      case 'enable': return `disableField('${fieldName}')`
      case 'disable': return `enableField('${fieldName}')`
      default: return `hideField('${fieldName}')`
    }
  }

  // Generate condition checks
  const conditionChecks = conditions.map(generateConditionCheck).join(` ${getJavaScriptOperator(operator)} `)

  // Generate action functions
  const actionCode = generateActionCode(action, fieldName)
  const inverseActionCode = generateInverseActionCode(action, fieldName)

  // Generate field change listeners - note about optimization
  const watchedFields = [...new Set(conditions.map(c => c.field).filter(Boolean))]

  // Add helpful comment about optimization when multiple fields watch the same condition
  const optimizationNote = watchedFields.length > 1 ?
    `// NOTE: When multiple fields use the same trigger field, the FormBuilder automatically\n// optimizes by grouping these handlers to avoid duplicate onFieldChange listeners.\n\n` :
    ''

  const listenerCode = watchedFields.map(field =>
    `onFieldChange('${field}', function() {
  if (${conditionChecks}) {
    ${actionCode};
  } else {
    ${inverseActionCode};
  }
});`
  ).join('\n\n')

  return optimizationNote + (listenerCode || '// Invalid configuration')
}

const handleSave = () => {
  console.log('Saving component with linkProcessId:', configModel.value.linkProcessId);
  console.log('Full configModel:', configModel.value);
  emit('update-component', { ...props.component, props: configModel.value })
  handleClose()
}

const showResetConfirmation = () => {
  showResetModal.value = true;
};

const cancelReset = () => {
  showResetModal.value = false;
};

const confirmReset = () => {
  handleReset();
  showResetModal.value = false;
};

const handleReset = () => {
  if (props.component) {
    // Reset to default props from the component definition
    const defaultComponent = {
      ...props.component,
      props: props.component.defaultProps || {}
    }
    configModel.value = {
      ...defaultComponent.props,
      // Ensure conditionalLogic is properly initialized
      conditionalLogic: defaultComponent.props.conditionalLogic || {
        enabled: false,
        conditions: [],
        action: 'show',
        operator: 'and'
      }
    }
  }
}

// Handle action type change
const handleActionTypeChange = (newActionType) => {
  // Update both actionType and linkType for backward compatibility
  configModel.value.actionType = newActionType;
  configModel.value.linkType = newActionType;
  
  // Set appropriate action property - map all action types to their corresponding values
  if (['submit', 'open-modal', 'close-modal'].includes(newActionType)) {
    configModel.value.action = newActionType;
  } else {
    configModel.value.action = '';
  }
  
  // Clear previous action-specific settings when changing action type
  if (newActionType !== 'open-modal') {
    configModel.value.targetModal = '';
  }
  if (newActionType !== 'url') {
    configModel.value.linkUrl = '';
    configModel.value.linkTarget = '';
  }
  if (newActionType !== 'process') {
    configModel.value.linkProcessId = '';
    configModel.value.linkTarget = '';
    configModel.value.iframeDebug = false;
    configModel.value.iframeHideComplete = false;
    configModel.value.iframeTheme = '';
    configModel.value.iframeCustomParams = '';
  }
  if (newActionType !== 'javascript') {
    configModel.value.onClick = '';
  }
};

// Button script template helper
const insertButtonScriptTemplate = (templateType) => {
  let template = '';

  switch (templateType) {
    case 'validation':
      template = `// Form validation example
const name = getField('name');
const email = getField('email');
const phone = getField('phone');

// Validate required fields
if (!name || !email) {
  showError('Please fill in all required fields');
  return;
}

// Validate email format
if (email && !email.includes('@')) {
  showError('Please enter a valid email address');
  return;
}

// Success message
showSuccess('Form validation passed!');
`;
      break;
    case 'calculation':
      template = `// Calculation example
const quantity = Number(getField('quantity') || 0);
const price = Number(getField('price') || 0);
const taxRate = 0.08; // 8% tax

// Calculate subtotal
const subtotal = quantity * price;
setField('subtotal', subtotal.toFixed(2));

// Calculate tax
const tax = subtotal * taxRate;
setField('tax', tax.toFixed(2));

// Calculate total
const total = subtotal + tax;
setField('total', total.toFixed(2));

showInfo('Calculation completed');
`;
      break;
    case 'toggle':
      template = `// Toggle fields visibility example
const selectedOption = getField('options');

// Hide all detail fields first
hideField('details_option_1');
hideField('details_option_2');
hideField('details_option_3');

// Show only the relevant detail field
if (selectedOption === 'option_1') {
  showField('details_option_1');
} else if (selectedOption === 'option_2') {
  showField('details_option_2');
} else if (selectedOption === 'option_3') {
  showField('details_option_3');
}
`;
      break;
    default:
      return;
  }

  configModel.value.onClick = template;
};

const handleClose = () => {
  isOpen.value = false
  emit('close')
}

// Table column management for repeating-table
const addTableColumn = () => {
  if (!configModel.value.columns) {
    configModel.value.columns = []
  }
  configModel.value.columns.push({
    name: `column_${configModel.value.columns.length + 1}`,
    label: `Column ${configModel.value.columns.length + 1}`,
    type: 'text',
    required: false,
    placeholder: 'Enter value...',
    validation: '',
    width: '200px',
    options: [],
    // Custom HTML properties
    htmlTemplate: '',
    allowScripts: false,
    sanitizeHtml: true,
    // Column visibility and editing control
    hideFromTable: false,
    allowInlineEdit: true,
    alwaysEditable: false
  })
}

const removeTableColumn = (index) => {
  if (configModel.value.columns) {
    configModel.value.columns.splice(index, 1)
  }
}

const addColumnOption = (columnIndex) => {
  if (!configModel.value.columns[columnIndex].options) {
    configModel.value.columns[columnIndex].options = []
  }
  configModel.value.columns[columnIndex].options.push({
    label: `Option ${configModel.value.columns[columnIndex].options.length + 1}`,
    value: `option_${configModel.value.columns[columnIndex].options.length + 1}`
  })
}

const removeColumnOption = (columnIndex, optionIndex) => {
  if (configModel.value.columns[columnIndex].options) {
    configModel.value.columns[columnIndex].options.splice(optionIndex, 1)
  }
}

// Custom HTML Preview for datatable columns
const getCustomHtmlPreview = (htmlTemplate) => {
  if (!htmlTemplate) return ''
  
  // Sample data for preview
  const sampleData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    status: 'Active',
    progress: 75,
    date: '2024-01-15',
    rowIndex: 1
  }
  
  // Replace template variables with sample data
  let preview = htmlTemplate
  Object.keys(sampleData).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    preview = preview.replace(regex, sampleData[key])
  })
  
  return preview
}

// Custom actions management for repeating-table
const addCustomAction = () => {
  if (!configModel.value.customActions) {
    configModel.value.customActions = []
  }
  configModel.value.customActions.push({
    label: 'New Action',
    url: '/action/{id}',
    urlType: 'dynamic',
    variant: 'primary',
    target: '_self',
    icon: '',
    confirmMessage: '',
    showWhen: {
      enabled: false,
      conditions: [],
      operator: 'and'
    }
  })
}

const removeCustomAction = (index) => {
  if (configModel.value.customActions) {
    configModel.value.customActions.splice(index, 1)
  }
}

// Sample data management for repeating-table
const addSampleDataRow = () => {
  if (!configModel.value.defaultData) {
    configModel.value.defaultData = []
  }
  
  // Create new row with empty values for each column
  const newRow = {}
  configModel.value.columns?.forEach(column => {
    newRow[column.name] = getSampleDefaultValue(column)
  })
  
  configModel.value.defaultData.push(newRow)
}

const removeSampleDataRow = (index) => {
  if (configModel.value.defaultData) {
    configModel.value.defaultData.splice(index, 1)
  }
}

const clearAllSampleData = () => {
  configModel.value.defaultData = []
}

// Get appropriate FormKit input type for sample data entry
const getSampleInputType = (column) => {
  const typeMap = {
    text: 'text',
    number: 'number',
    email: 'email',
    tel: 'tel',
    date: 'date',
    time: 'time',
    url: 'url',
    select: 'select',
    checkbox: 'native-checkbox', // Use native checkbox instead of FormKit
    radio: 'native-radio', // Use native radio instead of FormKit
    textarea: 'textarea'
  }
  return typeMap[column.type] || 'text'
}

// Get placeholder text for sample inputs
const getSampleInputPlaceholder = (column) => {
  const placeholders = {
    text: 'Enter text...',
    number: 'Enter number...',
    email: 'Enter email...',
    tel: 'Enter phone...',
    url: 'Enter URL...',
    date: 'Select date...',
    time: 'Select time...',
    textarea: 'Enter text...'
  }
  return placeholders[column.type] || 'Enter value...'
}

// Get default value for new sample data row
const getSampleDefaultValue = (column) => {
  switch (column.type) {
    case 'number':
      return null
    case 'checkbox':
      return column.options && column.options.length > 0 ? [] : null
    case 'radio':
      return null // Default to null so user can select
    case 'select':
      return column.options && column.options.length > 0 ? column.options[0].value : ''
    case 'date':
    case 'time':
      return ''
    default:
      return ''
  }
}

// Handle checkbox option toggling for sample data
const toggleCheckboxOption = (row, columnName, optionValue) => {
  if (!Array.isArray(row[columnName])) {
    row[columnName] = []
  }
  
  const currentValues = [...row[columnName]]
  const index = currentValues.indexOf(optionValue)
  
  if (index > -1) {
    // Remove the value if it exists
    currentValues.splice(index, 1)
  } else {
    // Add the value if it doesn't exist
    currentValues.push(optionValue)
  }
  
  row[columnName] = currentValues
}


const removeNestedComponent = (index) => {
  if (configModel.value.children) {
    configModel.value.children.splice(index, 1)
  }
}

// Repeating group field management
const addGroupField = () => {
  if (!configModel.value.fields) {
    configModel.value.fields = []
  }

  configModel.value.fields.push({
    type: 'text',
    name: `field_${configModel.value.fields.length + 1}`,
    label: `Field ${configModel.value.fields.length + 1}`,
    placeholder: 'Enter value'
  })
}

const removeGroupField = (index) => {
  if (configModel.value.fields) {
    configModel.value.fields.splice(index, 1)
  }
}

const addFieldOption = (field) => {
  if (!field.options) {
    field.options = []
  }
  field.options.push({
    label: `Option ${field.options.length + 1}`,
    value: `option_${field.options.length + 1}`
  })
}

const removeFieldOption = (field, optionIndex) => {
  if (field.options) {
    field.options.splice(optionIndex, 1)
  }
}

// Type changing methods
const handleTypeChange = (newType) => {
  if (newType === props.component.type) return

  pendingTypeChange.value = newType
  showTypeChangePreview.value = true
}

const confirmTypeChange = () => {
  if (!pendingTypeChange.value) return

  const newType = pendingTypeChange.value
  const preservedProps = getPreservedProperties(props.component.type, newType)

  // Create new component configuration with preserved properties
  const newProps = {}

  // Preserve common properties
  preservedProps.forEach(prop => {
    if (configModel.value[prop] !== undefined) {
      newProps[prop] = configModel.value[prop]
    }
  })

  // Add default properties for the new type that aren't being preserved
  const newTypeDefaults = getDefaultPropsForType(newType)
  Object.keys(newTypeDefaults).forEach(prop => {
    if (newProps[prop] === undefined) {
      newProps[prop] = newTypeDefaults[prop]
    }
  })

  // Update the component type and properties
  const updatedComponent = {
    ...props.component,
    type: newType,
    props: newProps
  }

  // Emit the updated component
  emit('update-component', updatedComponent)

  // Reset state
  pendingTypeChange.value = null
  showTypeChangePreview.value = false

  // Close modal after change
  handleClose()
}

const cancelTypeChange = () => {
  pendingTypeChange.value = null
  showTypeChangePreview.value = false
}

// Get default properties for a specific component type
// Layout Grid Presets
const layoutPresets = {
  'sidebar-right': {
    rows: 2,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-1', row: 0, col: 1, rowSpan: 2, colSpan: 1, component: null },
      { id: 'cell-2', row: 1, col: 0, rowSpan: 1, colSpan: 1, component: null }
    ]
  },
  'sidebar-left': {
    rows: 2,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 2, colSpan: 1, component: null },
      { id: 'cell-1', row: 0, col: 1, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 1, col: 1, rowSpan: 1, colSpan: 1, component: null }
    ]
  },
  'header-content': {
    rows: 2,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 2, component: null },
      { id: 'cell-1', row: 1, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 1, col: 1, rowSpan: 1, colSpan: 1, component: null }
    ]
  },
  'three-column': {
    rows: 1,
    columns: 3,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-1', row: 0, col: 1, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 0, col: 2, rowSpan: 1, colSpan: 1, component: null }
    ]
  },
  'two-by-two': {
    rows: 2,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-1', row: 0, col: 1, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 1, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-3', row: 1, col: 1, rowSpan: 1, colSpan: 1, component: null }
    ]
  },
  'form-layout': {
    rows: 3,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-1', row: 0, col: 1, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 1, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-3', row: 1, col: 1, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-4', row: 2, col: 0, rowSpan: 1, colSpan: 2, component: null }
    ]
  },
  'header-sidebar': {
    rows: 3,
    columns: 2,
    cells: [
      { id: 'cell-0', row: 0, col: 0, rowSpan: 1, colSpan: 2, component: null },
      { id: 'cell-1', row: 1, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-2', row: 2, col: 0, rowSpan: 1, colSpan: 1, component: null },
      { id: 'cell-3', row: 1, col: 1, rowSpan: 2, colSpan: 1, component: null }
    ]
  }
}

const currentPreset = ref('')

// Apply a layout preset
const applyPreset = (presetName) => {
  if (!props.component || props.component.type !== 'layout-grid') return

  const preset = layoutPresets[presetName]
  if (!preset) return

  // Update the component configuration
  configModel.value.rows = preset.rows
  configModel.value.columns = preset.columns
  configModel.value.cells = [...preset.cells] // Create a copy to avoid reference issues

  currentPreset.value = presetName
}

// Check if current layout matches a preset
const isCurrentPreset = (presetName) => {
  if (!props.component || props.component.type !== 'layout-grid') return false

  const preset = layoutPresets[presetName]
  if (!preset) return false

  return (
    configModel.value.rows === preset.rows &&
    configModel.value.columns === preset.columns &&
    JSON.stringify(configModel.value.cells) === JSON.stringify(preset.cells)
  )
}

// Layout Grid Cell Management
const addCell = () => {
  if (!configModel.value.cells) {
    configModel.value.cells = []
  }

  // Find the next available position
  const rows = configModel.value.rows || 2
  const cols = configModel.value.columns || 2
  let newRow = 0
  let newCol = 0

  // Find first empty position
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isOccupied = configModel.value.cells.some(cell =>
        cell.row === row && cell.col === col
      )
      if (!isOccupied) {
        newRow = row
        newCol = col
        break
      }
    }
    if (newRow !== 0 || newCol !== 0) break
  }

  const newCell = {
    id: `cell-${Date.now()}`,
    row: newRow,
    col: newCol,
    rowSpan: 1,
    colSpan: 1,
    component: null
  }

  configModel.value.cells.push(newCell)
}

const removeCell = (index) => {
  if (configModel.value.cells && index >= 0 && index < configModel.value.cells.length) {
    configModel.value.cells.splice(index, 1)
  }
}

// Get total components in layout grid
const getTotalComponents = () => {
  if (props.component && props.component.type === 'layout-grid' && props.component.props.cells) {
    return props.component.props.cells.filter(cell => cell.component).length
  }
  return 0
}

const getDefaultPropsForType = (type) => {
  const defaults = {
    text: {
      type: 'text',
      placeholder: 'Enter text...',
      validation: ''
    },
    textarea: {
      type: 'textarea',
      placeholder: 'Enter text...',
      validation: '',
      rows: 3
    },
    email: {
      type: 'email',
      placeholder: 'email@example.com',
      validation: 'email'
    },
    password: {
      type: 'password',
      placeholder: 'Enter password...',
      validation: ''
    },
    url: {
      type: 'url',
      placeholder: 'https://example.com',
      validation: 'url'
    },
    tel: {
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      validation: ''
    },
    mask: {
      type: 'mask',
      placeholder: 'Enter value...',
      mask: '###-###-####',
      validation: ''
    },
    select: {
      type: 'select',
      placeholder: 'Select an option',
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' }
      ],
      validation: ''
    },
    searchSelect: {
      type: 'searchSelect',
      placeholder: 'Search and select an option',
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
        { label: 'Option 3', value: 'option_3' }
      ],
      validation: ''
    },
    radio: {
      type: 'radio',
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' }
      ],
      validation: ''
    },
    checkbox: {
      type: 'checkbox',
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' }
      ],
      validation: ''
    },
    date: {
      type: 'date',
      validation: ''
    },
    time: {
      type: 'time',
      validation: ''
    },
    'datetime-local': {
      type: 'datetime-local',
      validation: ''
    },
    number: {
      type: 'number',
      placeholder: '0',
      validation: ''
    },
    range: {
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      validation: ''
    },
    file: {
      type: 'file',
      accept: '*/*',
      validation: ''
    },
    dropzone: {
      type: 'dropzone',
      accept: 'image/*,.pdf,.doc,.docx',
      multiple: true,
      maxSize: 5242880,
      maxFiles: 5,
      validation: ''
    },
    switch: {
      type: 'switch',
      value: false,
      validation: ''
    },
    color: {
      type: 'color',
      value: '#3b82f6',
      validation: ''
    },
    otp: {
      type: 'otp',
      digits: 6,
      validation: 'required'
    },
    hidden: {
      type: 'hidden',
      value: ''
    },
    heading: {
      value: 'Section Heading',
      level: 2
    },
    paragraph: {
      value: 'Enter some descriptive text here.'
    },
    button: {
      type: 'button',
      buttonType: 'button',
      variant: 'primary',
      size: 'md',
      showLabel: false,
      showButtonText: true,
      buttonText: '',
      icon: '',
      linkType: 'none', // 'none', 'url', 'process'
      linkUrl: '',
      linkProcessId: '',
      linkTarget: '_self', // '_self', '_blank'
      iframeDebug: false, // Show/hide debug UI
      iframeHideComplete: false, // Hide completion message
      iframeTheme: '', // Custom theme
      iframeCustomParams: '' // Additional URL parameters
    }
  }

  // Ensure width and gridColumn are included for all types
  const baseDefaults = {
    width: '100%',
    gridColumn: 'span 12'
  }

  return { ...baseDefaults, ...(defaults[type] || {}) }
}

// Pagination helper functions
const currentPresetSelection = ref('10') // Track the current preset selection
const isCustomRowsPerPage = ref(false) // Direct ref instead of computed

const getRowsPerPagePreset = (value) => {
  if (!value) return 10 // default
  const presets = [0, 1, 5, 10, 15, 20, 25, 50, 100]
  const preset = presets.includes(value) ? value : 'custom'
  currentPresetSelection.value = preset.toString()
  return preset
}

const handleRowsPerPagePresetChange = (value) => {
  console.log('Preset changed to:', value) // Debug log
  currentPresetSelection.value = value.toString()
  
  if (value === 'custom') {
    // Show the custom input field
    isCustomRowsPerPage.value = true
    console.log('Showing custom input, isCustomRowsPerPage:', isCustomRowsPerPage.value) // Debug log
  } else {
    // Hide the custom input and set the preset value
    isCustomRowsPerPage.value = false
    configModel.value.rowsPerPage = value
    console.log('Set rowsPerPage to:', value, 'isCustomRowsPerPage:', isCustomRowsPerPage.value) // Debug log
  }
}

// Process pagination options text input
const processPageSizeOptions = (text) => {
  if (!text || text.trim() === '') {
    return [1, 5, 10, 15, 20, 25, 50, 100, 0] // Default options
  }
  
  const options = text.split(',')
    .map(option => {
      const trimmed = option.trim()
      if (trimmed.toLowerCase() === 'show all' || trimmed === '0') return 0
      const parsed = parseInt(trimmed)
      return isNaN(parsed) || parsed < 0 ? null : parsed
    })
    .filter(option => option !== null)
    .sort((a, b) => a === 0 ? 1 : b === 0 ? -1 : a - b) // Sort with 0 at the end
  
  // Always ensure "Show all" (0) is included
  if (!options.includes(0)) {
    options.push(0)
  }
  
  return options.length > 0 ? options : [1, 5, 10, 15, 20, 25, 50, 100, 0]
}

// Watch for changes in pagination options text and update the array
watch(() => configModel.value.pageSizeOptionsText, (newText) => {
  configModel.value.pageSizeOptions = processPageSizeOptions(newText)
}, { immediate: true })

// Initialize preset selection when component loads (only once, not on every rowsPerPage change)
const initializePresetSelection = () => {
  const presets = [0, 1, 5, 10, 15, 20, 25, 50, 100]
  const preset = presets.includes(configModel.value.rowsPerPage) ? configModel.value.rowsPerPage : 'custom'
  currentPresetSelection.value = preset.toString()
  isCustomRowsPerPage.value = preset === 'custom'
  console.log('Initialized:', 'preset:', preset, 'isCustomRowsPerPage:', isCustomRowsPerPage.value)
}

// Initialize on component mount
onMounted(() => {
  initializePresetSelection()
})
</script>

<style scoped>
.field-settings-modal {
  max-height: 80vh;
  overflow-y: auto;
}

/* Section Styling */
.settings-section {
  @apply border border-gray-200 rounded-lg overflow-hidden;
}

.section-header {
  @apply bg-gray-50 px-4 py-3 border-b border-gray-200;
}

.section-title {
  @apply text-sm font-semibold text-gray-800 flex items-center;
}

.section-description {
  @apply text-xs text-gray-600 mt-1;
}

.section-content {
  @apply p-4 space-y-4;
}

/* Width Selection */
.width-selector {
  @apply space-y-2;
}

.width-option {
  @apply border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:border-blue-300 hover:bg-gray-50 cursor-pointer flex items-center space-x-4;
}

.width-option.selected {
  @apply border-blue-500 bg-gray-50 ring-2 ring-blue-200;
}

.width-option.recommended {
  @apply ring-2 ring-green-200 border-green-300;
}

.width-option.selected.recommended {
  @apply border-green-500 bg-gray-50 ring-2 ring-green-200;
}

.grid-preview {
  @apply flex-shrink-0;
}

.grid-container-mini {
  @apply grid grid-cols-12 gap-1 w-32;
}

.grid-cell {
  @apply h-2 rounded-sm transition-colors duration-200;
}

.grid-cell.active {
  @apply bg-gray-500;
}

.grid-cell.inactive {
  @apply bg-gray-200;
}

.option-info {
  @apply flex-1 text-left min-w-0;
}

.option-name {
  @apply text-base font-semibold text-gray-800 mb-1 flex items-center;
}

.option-description {
  @apply text-sm text-gray-600 mb-1;
}

.option-use-case {
  @apply text-xs text-gray-500 italic;
}

.recommended-badge {
  @apply inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-800 border border-gray-200 bg-white rounded-full ml-2;
}

.current-selection-feedback {
  @apply mt-4 p-3 bg-gray-50 rounded-lg border;
}

.feedback-row {
  @apply flex justify-between items-center py-1;
}

/* Compact Width Selection - New Styles */
.width-selector-compact {
  @apply space-y-4;
}

.width-buttons {
  @apply flex flex-wrap gap-2;
}

.width-button {
  @apply flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer text-center relative;
}

.width-button.active {
  @apply border-blue-500 bg-gray-50 ring-1 ring-blue-200;
}

.width-button.recommended::before {
  content: '';
  @apply absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full;
}

.width-button.active.recommended {
  @apply border-green-500 bg-gray-50 ring-1 ring-green-200;
}

.width-visual {
  @apply w-full h-1.5 bg-gray-100 rounded-sm mb-2 overflow-hidden;
}

.width-bar {
  @apply h-full bg-gray-500 rounded-sm transition-all duration-300;
}

.width-button.active .width-bar {
  @apply bg-blue-600;
}

.width-button.recommended .width-bar {
  @apply bg-gray-500;
}

.width-button.active.recommended .width-bar {
  @apply bg-green-600;
}

.width-label {
  @apply text-sm font-medium text-gray-700;
}

.width-button.active .width-label {
  @apply text-blue-700;
}

.width-button.recommended .width-label {
  @apply text-green-700;
}

.width-preview {
  @apply mt-4 p-3 bg-gray-50 rounded-lg border;
}

.preview-container {
  @apply w-full bg-white rounded border p-2 mb-2;
}

.preview-field {
  @apply transition-all duration-300;
}

.preview-input {
  @apply w-full h-8 border border-gray-100 rounded px-2 bg-blue-600;
}

.preview-info {
  @apply text-sm text-gray-600 text-center;
}

.feedback-label {
  @apply text-sm font-medium text-gray-600;
}

.feedback-value {
  @apply text-sm font-semibold text-gray-800;
}

.current-width-visual {
  @apply mt-3 pt-3 border-t border-gray-200;
}

.visual-grid {
  @apply grid grid-cols-12 gap-1 w-full mb-2;
}

.visual-cell {
  @apply h-2 rounded-sm transition-colors duration-200;
}

.visual-cell.filled {
  @apply bg-gray-500;
}

.visual-cell.empty {
  @apply bg-gray-200;
}

.visual-label {
  @apply text-center text-xs text-gray-600;
}

/* Options Management */
.options-manager {
  @apply border border-gray-200 rounded-lg;
}

.options-header {
  @apply flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200;
}

.add-option-btn {
  @apply inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-gray-50 rounded-md hover:bg-gray-50 transition-colors;
}

.options-list {
  @apply divide-y divide-gray-200;
}

.option-item {
  @apply flex items-center p-3 hover:bg-gray-50;
}

.option-drag-handle {
  @apply mr-3 cursor-move;
}

.option-content {
  @apply flex-1 grid grid-cols-2 gap-3;
}

.option-field {
  @apply mb-0;
}

.option-input {
  @apply text-sm;
}

.option-remove-btn {
  @apply ml-3 p-1 text-red-400 hover:text-red-600 rounded transition-colors;
}

.empty-options {
  @apply text-center py-8;
}

.empty-add-btn {
  @apply inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors;
}

/* Validation Styling */
.validation-options {
  @apply space-y-4;
}

.validation-item {
  @apply border border-gray-200 rounded-lg p-4;
}

.validation-toggle {
  @apply flex items-center cursor-pointer;
}

.validation-toggle input[type="checkbox"] {
  @apply sr-only;
}

.toggle-slider {
  @apply relative inline-block w-10 h-6 mr-3 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out;
}

.validation-toggle input:checked+.toggle-slider {
  @apply bg-blue-600;
}

.toggle-slider::before {
  @apply absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out;
  content: '';
}

.validation-toggle input:checked+.toggle-slider::before {
  @apply transform translate-x-4;
}

.validation-info {
  @apply flex-1;
}

.validation-title {
  @apply block text-sm font-medium text-gray-900;
}

.validation-desc {
  @apply block text-xs text-gray-500 mt-1;
}

.validation-details {
  @apply mt-4 pt-4 border-t border-gray-200;
}

/* Layout Grid Presets */
.preset-button {
  @apply flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-gray-50 transition-all duration-200;
}

.preset-button.preset-active {
  @apply border-blue-500 bg-white;
}

.preset-preview {
  @apply w-full h-16 mb-2 bg-gray-100 rounded border border-gray-200 relative;
}

.preset-label {
  @apply text-xs font-medium text-gray-700;
}

/* Preset Preview Layouts */
.sidebar-right-preview {
  background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 50%, #d1d5db 50%, #d1d5db 100%);
  background-size: 100% 50%;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
}

.sidebar-left-preview {
  background: linear-gradient(90deg, #d1d5db 0%, #d1d5db 50%, #e5e7eb 50%, #e5e7eb 100%);
  background-size: 100% 50%;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
}

.header-content-preview {
  background: linear-gradient(180deg, #d1d5db 0%, #d1d5db 50%, #e5e7eb 50%, #e5e7eb 100%);
}

.three-column-preview {
  background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 33.33%, #d1d5db 33.33%, #d1d5db 66.66%, #f3f4f6 66.66%, #f3f4f6 100%);
}

.two-by-two-preview {
  background:
    linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 50%, #d1d5db 50%, #d1d5db 100%) 0 0,
    linear-gradient(90deg, #d1d5db 0%, #d1d5db 50%, #e5e7eb 50%, #e5e7eb 100%) 0 100%;
  background-size: 100% 50%;
  background-repeat: no-repeat;
}

.form-layout-preview {
  background:
    linear-gradient(90deg, #d1d5db 0%, #d1d5db 100%) 0 0,
    linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 50%, #d1d5db 50%, #d1d5db 100%) 0 33.33%,
    linear-gradient(90deg, #f3f4f6 0%, #f3f4f6 100%) 0 66.66%;
  background-size: 100% 33.33%;
  background-repeat: no-repeat;
}

.header-sidebar-preview {
  background:
    linear-gradient(90deg, #d1d5db 0%, #d1d5db 100%) 0 0,
    linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 50%, #f3f4f6 50%, #f3f4f6 100%) 0 33.33%,
    linear-gradient(90deg, #d1d5db 0%, #d1d5db 50%, #f3f4f6 50%, #f3f4f6 100%) 0 66.66%;
  background-size: 100% 33.33%;
  background-repeat: no-repeat;
}

/* Layout Grid Cell Spanning Controls */
.cell-span-control {
  @apply transition-all duration-200;
}

.cell-span-control:hover {
  @apply transform scale-[1.02];
}

.cell-span-control input[type="number"] {
  @apply text-center;
}

.cell-span-control input[type="number"]:focus {
  @apply border-blue-500 ring-1 ring-blue-500;
}

/* Toggle Switch */
.toggle-switch {
  @apply flex items-center;
}

.toggle-switch input[type="checkbox"] {
  @apply sr-only;
}

.toggle-switch .toggle-slider {
  @apply relative inline-block w-10 h-6 mr-3 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out;
}

.toggle-switch input:checked+.toggle-slider {
  @apply bg-green-600;
}

.toggle-switch .toggle-slider::before {
  @apply absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out;
  content: '';
}

.toggle-switch input:checked+.toggle-slider::before {
  @apply transform translate-x-4;
}

.toggle-label {
  @apply text-sm font-medium text-gray-700;
}

/* Button Styling */
.cancel-btn {
  @apply px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors;
}

.reset-btn {
  @apply inline-flex items-center px-4 py-2 text-sm font-medium text-orange-700 border border-gray-200 bg-white rounded-md hover:bg-gray-50 transition-colors;
}

.save-btn {
  @apply inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors;
}

/* Tab Content */
.tab-content {
  @apply block min-h-0 w-full;
}

/* Field Wrapper */
.field-wrapper {
  @apply mb-0;
}

/* Type Changer Styles */
.type-changer-section {
  @apply mb-6 p-4 border-2 border-dashed border-blue-200 rounded-lg bg-gray-50;
}

.type-change-preview {
  @apply mt-4 p-4 bg-white border border-blue-300 rounded-lg;
}

.preview-header {
  @apply flex items-center space-x-2 mb-3 pb-2 border-b border-gray-200;
}

.preview-content {
  @apply space-y-2 mb-4;
}

.preview-item {
  @apply flex items-center justify-between text-sm;
}

.preview-label {
  @apply font-medium text-gray-600;
}

.preview-value {
  @apply text-gray-800 border border-gray-200 bg-white px-2 py-1 rounded text-xs;
}

.preview-actions {
  @apply flex items-center space-x-2 pt-3 border-t border-gray-200;
}

/* Mask Examples */
.mask-examples {
  @apply mt-3 p-3 bg-gray-50 rounded-lg;
}

.example-button {
  @apply text-left p-2 text-xs bg-white border border-gray-200 rounded hover:border-blue-300 hover:bg-gray-50 transition-colors;
}

/* Validation Guide Styles */
.validation-rule {
  @apply flex flex-col space-y-1 p-2 bg-white rounded border border-blue-100;
}

.rule-code {
  @apply font-mono text-xs font-semibold text-blue-800 border border-gray-200 bg-white px-2 py-1 rounded;
}

.rule-desc {
  @apply text-gray-600;
}

.example-item {
  @apply flex flex-col space-y-1 p-2 bg-white rounded border border-blue-100;
}

.example-code {
  @apply font-mono text-xs font-semibold text-green-800 border border-gray-200 bg-white px-2 py-1 rounded;
}

.example-desc {
  @apply text-gray-600;
}

/* Sample Data Table Styles */
.sample-data-table {
  @apply border border-gray-200 rounded-lg overflow-hidden bg-white;
}

.sample-row {
  @apply flex items-stretch border-b border-gray-100 last:border-b-0;
}

.sample-header {
  @apply bg-gray-50 font-medium text-sm text-gray-700;
}

.sample-cell {
  @apply flex-1 p-2 border-r border-gray-100 last:border-r-0 min-w-0;
}

.header-cell {
  @apply flex items-center justify-center text-center;
}

.header-content {
  @apply flex flex-col;
}

.column-name {
  @apply text-sm font-medium text-gray-800;
}

.column-type {
  @apply text-xs text-gray-500 mt-1;
}

.row-number {
  @apply flex items-center justify-center w-10 p-2 bg-gray-50 border-r border-gray-100 text-sm font-medium text-gray-600;
}

.row-controls-header {
  @apply flex items-center justify-center w-16 p-2 text-center font-medium;
}

.row-controls {
  @apply flex items-center justify-center w-16 p-2 border-l border-gray-100;
}

.remove-row-btn {
  @apply p-1 text-red-500 hover:text-red-700 hover:bg-gray-50 rounded transition-colors;
}

.sample-field-wrapper {
  @apply mb-0;
}

.sample-field-wrapper :deep(.formkit-outer) {
  @apply mb-0;
}

.sample-field-wrapper :deep(.formkit-wrapper) {
  @apply mb-0;
}

/* Native checkbox styling for sample data */
.checkbox-container {
  @apply w-full min-h-[2rem] flex items-center justify-start;
}

.checkbox-container label {
  @apply text-xs text-gray-700 cursor-pointer;
}

.checkbox-container input[type="checkbox"] {
  @apply flex-shrink-0;
}

/* Multiple checkbox options in sample data */
.checkbox-container .space-y-1 {
  @apply w-full;
}

.checkbox-container .space-y-1 label {
  @apply flex items-center whitespace-nowrap;
}

/* Native radio styling for sample data */
.radio-container {
  @apply w-full min-h-[2rem] flex items-center justify-start;
}

.radio-container label {
  @apply text-xs text-gray-700 cursor-pointer;
}

.radio-container input[type="radio"] {
  @apply flex-shrink-0;
}

/* Multiple radio options in sample data */
.radio-container .space-y-1 {
  @apply w-full;
}

.radio-container .space-y-1 label {
  @apply flex items-center whitespace-nowrap;
}

.sample-field-wrapper :deep(.formkit-input) {
  @apply text-sm min-h-[2rem] py-1 px-2;
}
</style>