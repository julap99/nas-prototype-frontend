<template>
  <div class="custom-file-upload">
    <!-- Upload Button (Native-like) -->
    <div class="upload-button-container">
      <input 
        ref="fileInput"
        type="file"
        :accept="context.accept || '*/*'"
        :multiple="context.multiple"
        :disabled="context.disabled || context.readonly"
        style="display: none"
        @change="handleFileSelect"
      />
      
      <RsButton 
        type="button" 
        variant="primary"
        size="md"
        :disabled="context.disabled || context.readonly"
        @click="triggerFileInput"
      >
        <Icon name="material-symbols:upload-file-outline" class="w-4 h-4 mr-2" />
        {{ context.buttonLabel || 'Choose Files' }}
      </RsButton>
      
      <!-- File restrictions info (compact) -->
      <div v-if="showRestrictions" class="restrictions-info-inline">
        <span class="text-xs text-gray-500">
          <span v-if="context.accept && context.accept !== '*/*'">
            {{ formatAcceptedTypes(context.accept) }}
          </span>
          <span v-if="context.maxSize">
            {{ context.accept && context.accept !== '*/*' ? ', ' : '' }}Max: {{ formatFileSize(context.maxSize) }}
          </span>
          <span v-if="context.maxFiles">
            {{ (context.accept && context.accept !== '*/*') || context.maxSize ? ', ' : '' }}Limit: {{ context.maxFiles }} files
          </span>
        </span>
      </div>
    </div>

    <!-- File List -->
    <div v-if="uploadedFiles.length > 0" class="file-list">
      <div class="file-list-header">
        <h4 class="text-sm font-medium text-gray-700">
          {{ context.uploadedFilesText || 'Uploaded Files' }}{{ context.showFileCount !== false ? ` (${uploadedFiles.length}${context.maxFiles ? `/${context.maxFiles}` : ''})` : '' }}
        </h4>
        <button 
          v-if="!context.readonly"
          type="button" 
          class="clear-all-button"
          @click="clearAllFiles"
          title="Remove all files"
        >
          <Icon name="material-symbols:delete-outline" class="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div class="files-grid">
        <div 
          v-for="(file, index) in uploadedFiles" 
          :key="`file-${index}`"
          class="file-item"
        >
          <!-- File Preview -->
          <div class="file-preview">
            <img 
              v-if="file.isImage && file.previewUrl" 
              :src="file.previewUrl"
              :alt="file.name"
              class="file-thumbnail-image"
            />
            <div v-else class="file-thumbnail-placeholder">
              <Icon 
                :name="getFileIcon(file.type)" 
                class="w-8 h-8 text-gray-400"
              />
              <span class="file-extension">{{ getFileExtension(file.name) }}</span>
            </div>
            
            <!-- File actions overlay -->
            <div v-if="!context.readonly" class="file-actions">
              <button 
                type="button"
                class="action-button download-button"
                @click="downloadFile(file)"
                title="Download file"
              >
                <Icon name="material-symbols:download" class="w-3 h-3" />
              </button>
              <button 
                type="button"
                class="action-button remove-button"
                @click="removeFile(index)"
                title="Remove file"
              >
                <Icon name="material-symbols:close" class="w-3 h-3" />
              </button>
            </div>
          </div>

          <!-- File Details -->
          <div class="file-details">
            <div class="file-name" :title="file.name">{{ file.name }}</div>
            <div class="file-meta">
              <span class="file-size">{{ formatFileSize(file.size) }}</span>
              <span v-if="file.lastModified" class="file-date">
                {{ formatDate(file.lastModified) }}
              </span>
            </div>
            
            <!-- Upload status -->
            <div v-if="file.status" class="file-status" :class="`status-${file.status}`">
              <Icon 
                v-if="file.status === 'uploading'" 
                name="material-symbols:hourglass-empty" 
                class="w-3 h-3 animate-spin" 
              />
              <Icon 
                v-else-if="file.status === 'success'" 
                name="material-symbols:check-circle" 
                class="w-3 h-3" 
              />
              <Icon 
                v-else-if="file.status === 'error'" 
                name="material-symbols:error" 
                class="w-3 h-3" 
              />
              <span class="status-text">
                {{ getStatusText(file.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="errors.length > 0" class="error-messages">
      <div v-for="(error, index) in errors" :key="`error-${index}`" class="error-message">
        <Icon name="material-symbols:error" class="w-4 h-4 text-red-500" />
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Hidden input for FormKit value handling -->
    <input 
      :value="formKitValue"
      :name="context.node.name"
      :id="context.id"
      :disabled="context.disabled || context.readonly"
      :required="context.attrs.required"
      type="hidden"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  context: {
    type: Object,
    required: true
  }
})

// Reactive state
const fileInput = ref(null)
const uploadedFiles = ref([])
const errors = ref([])

// Computed properties
const showRestrictions = computed(() => {
  return context.value.showRestrictions !== false && (
    (context.value.accept && context.value.accept !== '*/*') ||
    context.value.maxSize ||
    context.value.maxFiles
  )
})

const context = computed(() => props.context)

const formKitValue = computed(() => {
  return JSON.stringify(uploadedFiles.value.map(file => ({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    dataUrl: file.dataUrl || null
  })))
})

// Watch for external value changes
watch(() => props.context.node._value, (newValue) => {
  if (newValue && typeof newValue === 'string' && newValue !== formKitValue.value) {
    try {
      const parsedFiles = JSON.parse(newValue)
      if (Array.isArray(parsedFiles)) {
        loadExistingFiles(parsedFiles)
      }
    } catch (err) {
      console.warn('Failed to parse file upload value:', err)
    }
  }
}, { immediate: true })

// Methods
const triggerFileInput = () => {
  if (fileInput.value && !context.value.disabled && !context.value.readonly) {
    fileInput.value.click()
  }
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
  // Reset input to allow selecting the same file again or re-selecting files
  event.target.value = ''
}


const processFiles = async (files) => {
  errors.value = []
  
  // If not multiple, clear existing files once before processing new ones
  if (!context.value.multiple) {
    uploadedFiles.value = []
  }
  
  for (const file of files) {
    // Check if we would exceed max files before adding (when in multiple mode)
    if (context.value.multiple && context.value.maxFiles && uploadedFiles.value.length >= parseInt(context.value.maxFiles)) {
      errors.value.push(`Maximum number of files (${context.value.maxFiles}) reached. Cannot add more files.`)
      break
    }
    
    const validation = validateFile(file)
    if (validation.isValid) {
      await addFile(file)
    } else {
      errors.value.push(...validation.errors)
    }
  }
  
  updateFormKitValue()
}

const validateFile = (file) => {
  const errors = []
  
  // Check file type
  if (context.value.accept && context.value.accept !== '*/*') {
    const acceptedTypes = context.value.accept.split(',').map(type => type.trim())
    const isAccepted = acceptedTypes.some(acceptedType => {
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
      }
      return file.type.match(acceptedType.replace('*', '.*'))
    })
    
    if (!isAccepted) {
      errors.push(`File type "${file.type || 'unknown'}" is not allowed`)
    }
  }
  
  // Check file size
  if (context.value.maxSize && file.size > parseInt(context.value.maxSize)) {
    errors.push(`File "${file.name}" is too large (max: ${formatFileSize(context.value.maxSize)})`)
  }
  
  // Note: File count check removed - handled in processFiles for better incremental addition support
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

const addFile = async (file) => {
  const fileObj = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    isImage: file.type.startsWith('image/'),
    status: 'uploading',
    file: file
  }
  
  // Add file to array immediately (clearing is handled in processFiles)
  uploadedFiles.value.push(fileObj)
  
  try {
    // Generate preview and base64 data
    if (fileObj.isImage) {
      fileObj.previewUrl = await createImagePreview(file)
      fileObj.dataUrl = fileObj.previewUrl
    } else {
      fileObj.dataUrl = await convertToBase64(file)
    }
    
    // Mark as completed - convert to base64 is the "upload" process
    fileObj.status = 'success'
    
  } catch (err) {
    console.warn('Failed to process file:', err)
    fileObj.status = 'error'
  }
  
  // FormKit value will be updated by processFiles() after all files are processed
}

const removeFile = (index) => {
  const file = uploadedFiles.value[index]
  if (file.previewUrl && file.previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(file.previewUrl)
  }
  uploadedFiles.value.splice(index, 1)
  updateFormKitValue()
}

const clearAllFiles = () => {
  uploadedFiles.value.forEach(file => {
    if (file.previewUrl && file.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(file.previewUrl)
    }
  })
  uploadedFiles.value = []
  updateFormKitValue()
}

const downloadFile = (file) => {
  if (file.dataUrl) {
    const link = document.createElement('a')
    link.href = file.dataUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else if (file.file) {
    const url = URL.createObjectURL(file.file)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

const updateFormKitValue = () => {
  props.context.node.input(formKitValue.value)
}

const loadExistingFiles = (filesData) => {
  uploadedFiles.value = filesData.map(fileData => ({
    ...fileData,
    isImage: fileData.type?.startsWith('image/') || false,
    status: 'success',
    previewUrl: fileData.dataUrl || null
  }))
}

// Helper methods
const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image file'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString()
}

const formatAcceptedTypes = (accept) => {
  return accept.split(',').map(type => type.trim()).join(', ')
}

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'material-symbols:image'
  if (type.includes('pdf')) return 'material-symbols:picture-as-pdf'
  if (type.includes('word')) return 'material-symbols:description'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'material-symbols:table-chart'
  if (type.includes('video')) return 'material-symbols:video-file'
  if (type.includes('audio')) return 'material-symbols:audio-file'
  return 'material-symbols:file-present'
}

const getFileExtension = (filename) => {
  return filename.split('.').pop()?.toUpperCase() || 'FILE'
}

const getStatusText = (status) => {
  const statusTexts = {
    uploading: 'Uploading...',
    success: 'Ready',
    error: 'Error'
  }
  return statusTexts[status] || status
}

// Cleanup on unmount
onUnmounted(() => {
  uploadedFiles.value.forEach(file => {
    if (file.previewUrl && file.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(file.previewUrl)
    }
  })
})
</script>

<style scoped>
.custom-file-upload {
  @apply w-full;
}

.upload-button-container {
  @apply flex items-center gap-3 flex-wrap;
}

/* RsButton handles all the styling now */

.restrictions-info-inline {
  @apply text-xs text-gray-500;
}

.file-list {
  @apply mt-4 p-4 bg-gray-50 rounded-lg;
}

.file-list-header {
  @apply flex items-center justify-between mb-3;
}

.clear-all-button {
  @apply flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors;
}

.files-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3;
}

.file-item {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200;
}

.file-preview {
  @apply relative h-24 flex items-center justify-center bg-gray-100;
}

.file-thumbnail-image {
  @apply w-full h-full object-cover;
}

.file-thumbnail-placeholder {
  @apply flex flex-col items-center justify-center h-full;
}

.file-extension {
  @apply text-xs font-medium text-gray-500 mt-1;
}

.file-actions {
  @apply absolute top-1 right-1 flex space-x-1 opacity-0 transition-opacity duration-200;
}

.file-item:hover .file-actions {
  @apply opacity-100;
}

.action-button {
  @apply p-1 rounded-full transition-colors duration-200;
}

.download-button {
  @apply bg-blue-600 hover:bg-blue-700 text-white;
}

.remove-button {
  @apply bg-red-600 hover:bg-red-700 text-white;
}

.file-details {
  @apply p-3;
}

.file-name {
  @apply font-medium text-gray-900 text-sm truncate;
}

.file-meta {
  @apply flex items-center justify-between text-xs text-gray-500 mt-1;
}

.file-status {
  @apply flex items-center space-x-1 text-xs mt-2;
}

.status-uploading {
  @apply text-blue-600;
}

.status-success {
  @apply text-green-600;
}

.status-error {
  @apply text-red-600;
}

.error-messages {
  @apply mt-3 space-y-2;
}

.error-message {
  @apply flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-2 rounded;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .files-grid {
    @apply grid-cols-1;
  }
  
  .upload-zone {
    @apply p-4;
  }
  
  .upload-icon {
    @apply w-8 h-8;
  }
  
  .upload-button {
    @apply py-2 px-3 text-sm;
  }
}
</style>