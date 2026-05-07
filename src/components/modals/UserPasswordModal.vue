<template>
  <div v-if="isOpen" @click.self="close" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 font-outfit px-2 sm:px-4 py-4 sm:py-8">
    <div class="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#1A1A1A] w-full sm:w-[80vw] max-w-lg overflow-hidden transition-all scale-100 active:scale-95">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 sm:p-6 border-b border-[#1A1A1A]">
        <h3 class="text-xl font-black text-[white] tracking-tight">Alterar senha</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-[#1A1A1A]">
          <X :size="24" stroke-width="2.5" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6 sm:p-8">
        <div class="flex flex-col gap-2">
          <label class="text-[13px] text-gray-500 font-bold uppercase tracking-wider">Nova senha</label>
          <input 
            type="password" 
            v-model="newPassword"
            placeholder="Digite a nova senha..."
            class="px-4 py-3 bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all shadow-sm w-full font-medium"
          >
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-6 sm:p-8 pt-2 sm:pt-4">
        <button 
          @click="close" 
          class="px-8 py-3 bg-[#f3f4f6] text-gray-700 text-[15px] font-bold rounded-xl hover:bg-[#e5e7eb] transition-all cursor-pointer order-2 sm:order-1"
        >
          Cancelar
        </button>
        <button 
          @click="save" 
          class="px-8 py-3 bg-[#D7FF00] text-black text-[15px] font-bold rounded-xl hover:bg-[#004747] shadow-lg shadow-green-900/10 transition-all active:scale-95 cursor-pointer order-1 sm:order-2"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next'

export default {
  name: 'UserPasswordModal',
  components: {
    X
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newPassword: ''
    }
  },
  methods: {
    close() {
      this.newPassword = ''
      this.$emit('close')
    },
    save() {
      // API call to save password
      this.$emit('save', this.newPassword)
      this.close()
    }
  }
}
</script>
