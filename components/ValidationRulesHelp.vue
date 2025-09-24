<template>
  <div class="validation-rules-help">
    <div class="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded mb-4">
      <div class="flex items-start">
        <Icon name="material-symbols:info" class="w-5 h-5 mr-2 mt-0.5" />
        <div>
          <h4 class="font-medium text-sm">Validation Rules</h4>
          <p class="text-xs mt-1">
            Use the pipe character (|) to separate multiple validation rules. 
            For rules with parameters, use a colon (:) followed by the parameter value.
            Example: <code>required|email|minLength:5</code>
          </p>
          <p class="text-xs mt-1 text-blue-700 font-medium">
            Note: Not all components support validation. Components like Form Section, Repeating Group, 
            Info Display, and other structural/display components do not use validation rules.
          </p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Basic Validation</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>required</code> - Field must not be empty</li>
          <li><code>required:trim</code> - Field must not be empty (ignores whitespace)</li>
          <li><code>email</code> - Must be a valid email address</li>
          <li><code>url</code> - Must be a valid URL</li>
          <li><code>number</code> - Must be a valid number</li>
        </ul>
      </div>
      
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Length & Size</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>minLength:5</code> - Minimum length of 5 characters</li>
          <li><code>maxLength:20</code> - Maximum length of 20 characters</li>
          <li><code>length:5,20</code> - Length between 5 and 20 characters</li>
          <li><code>min:10</code> - Minimum value of 10 (for numbers)</li>
          <li><code>max:100</code> - Maximum value of 100 (for numbers)</li>
          <li><code>between:1,100</code> - Value between 1 and 100</li>
        </ul>
      </div>
      
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Character Types</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>alpha</code> - Only alphabetical characters</li>
          <li><code>alphanumeric</code> - Only letters and numbers</li>
          <li><code>alpha_spaces</code> - Only letters and spaces</li>
          <li><code>contains_lowercase</code> - Has at least one lowercase letter</li>
          <li><code>contains_uppercase</code> - Has at least one uppercase letter</li>
          <li><code>contains_numeric</code> - Has at least one number</li>
          <li><code>contains_symbol</code> - Has at least one symbol</li>
        </ul>
      </div>
      
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Special Validation</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>confirm:password</code> - Must match the field named 'password'</li>
          <li><code>matches:/^[A-Z]+$/</code> - Must match the regex pattern</li>
          <li><code>starts_with:https://</code> - Must start with specific text</li>
          <li><code>ends_with:.com</code> - Must end with specific text</li>
          <li><code>is:option1,option2</code> - Must be one of the listed values</li>
          <li><code>not:admin,root</code> - Must not be one of the listed values</li>
        </ul>
      </div>
      
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Date Validation</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>date_before:2023-12-31</code> - Date before specified date</li>
          <li><code>date_after:2023-01-01</code> - Date after specified date</li>
          <li><code>date_between:2023-01-01,2023-12-31</code> - Date in range</li>
          <li><code>date_format:YYYY-MM-DD</code> - Date in specific format</li>
        </ul>
      </div>
      
      <div>
        <h5 class="text-sm font-medium text-gray-700 mb-2">Validation Hints</h5>
        <ul class="text-xs space-y-1 text-gray-600">
          <li><code>*rule</code> - Force rule to run even if others fail</li>
          <li><code>+rule</code> - Run rule even when field is empty</li>
          <li><code>?rule</code> - Make rule optional (non-blocking)</li>
          <li><code>(200)rule</code> - Debounce rule by 200ms</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.validation-rules-help code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.75rem;
}
</style>