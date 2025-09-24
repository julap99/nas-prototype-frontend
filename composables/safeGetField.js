// Utility to safely get a field value from a form data object
export function safeGetField(field, formData, options = {}) {
  if (formData && Object.prototype.hasOwnProperty.call(formData, field)) {
    const value = formData[field];
    // If the value is undefined or null, return empty string for backward compatibility
    if (value === undefined || value === null) {
      return '';
    }
    return value;
  }
  
  // Only warn for specific cases or when explicitly requested
  if (process.env.NODE_ENV !== 'production' && options.warn !== false) {
    // Don't warn for newly added components or fields that haven't been initialized yet
    const isNewField = field && (field.includes('_') && /\d+$/.test(field));
    if (!isNewField) {
      console.warn(`Field '${field}' is missing or inaccessible.`);
    }
  }
  return '';
} 