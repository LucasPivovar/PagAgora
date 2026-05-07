<template>
  <Transition name="toast">
    <div v-if="state.show" class="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border font-outfit min-w-[300px]" :class="typeClasses">
      <div class="flex-shrink-0">
        <CheckCircle v-if="state.type === 'success'" :size="20" />
        <AlertCircle v-else-if="state.type === 'error'" :size="20" />
        <AlertTriangle v-else-if="state.type === 'warning'" :size="20" />
        <Info v-else :size="20" />
      </div>
      <div class="flex-1 text-[15px] font-bold">
        {{ state.message }}
      </div>
      <button @click="state.show = false" class="text-current opacity-50 hover:opacity-100 transition-opacity">
        <X :size="16" />
      </button>
    </div>
  </Transition>
</template>

<script>
import { useToast } from '../composables/useToast'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { computed } from 'vue'

export default {
  name: 'ToastNotification',
  components: {
    CheckCircle, AlertCircle, AlertTriangle, Info, X
  },
  setup() {
    const { state } = useToast()

    const typeClasses = computed(() => {
      switch (state.type) {
        case 'success':
          return 'bg-[#0A0A0A] border-[#bcf1d3] text-[#15803d]'
        case 'error':
          return 'bg-[#fef2f2] border-[#fecaca] text-[#b91c1c]'
        case 'warning':
          return 'bg-[#fffbeb] border-[#fef3c7] text-[#92400e]'
        case 'info':
          return 'bg-[#eff6ff] border-[#dbeafe] text-[#1d4ed8]'
        default:
          return 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-800'
      }
    })

    return {
      state,
      typeClasses
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
</style>
