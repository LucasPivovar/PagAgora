import { reactive } from 'vue'

const state = reactive({
  show: false,
  message: '',
  type: 'success' // success, error, warning, info
})

let timeout = null

export function useToast() {
  const showToast = (message, type = 'success', duration = 3000) => {
    if (timeout) clearTimeout(timeout)
    
    state.message = message
    state.type = type
    state.show = true
    
    timeout = setTimeout(() => {
      state.show = false
    }, duration)
  }

  return {
    state,
    showToast
  }
}
