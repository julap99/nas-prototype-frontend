import { ref, watch } from 'vue'

/**
 * Creates a debounced version of a function
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function useDebounceFn(fn, delay = 300) {
  let timeoutId = null

  const debouncedFn = (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  const cancel = () => {
    clearTimeout(timeoutId)
  }

  return Object.assign(debouncedFn, { cancel })
}

/**
 * Creates a debounced ref value
 * @param {any} value - Initial value
 * @param {number} delay - The delay in milliseconds
 * @returns {Object} - Object containing debounced value and original value refs
 */
export function useDebounceRef(value, delay = 300) {
  const original = ref(value)
  const debounced = ref(value)

  let timeoutId = null

  const updateDebounced = (newValue) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  }

  // Watch for changes in original value
  watch(original, (newValue) => {
    updateDebounced(newValue)
  }, { immediate: true })

  return {
    original,
    debounced
  }
} 