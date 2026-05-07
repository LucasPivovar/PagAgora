<template>
  <div v-if="isOpen" @click.self="$emit('close')" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm font-outfit px-4 py-6">
    <div class="bg-[#0A0A0A] rounded-[32px] shadow-2xl border border-[#1A1A1A] w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
      <!-- Header -->
      <div class="flex items-center justify-between p-8 border-b border-[#1A1A1A] bg-[#1A1A1A]/30">
        <div class="flex flex-col">
          <h3 class="text-2xl font-black text-[white]">Criar Transação</h3>
          <p class="text-[13px] text-gray-500 font-bold">Preencha os dados abaixo</p>
        </div>
        <button @click="$emit('close')" class="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-[#1A1A1A] transition-all cursor-pointer">
          <X :size="24" stroke-width="3" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-8">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <!-- User ID Input -->
          <div class="flex flex-col gap-2 text-left">
            <label class="text-[11px] text-gray-500 font-black uppercase tracking-[0.1em] ml-1">ID do Usuário</label>
            <div class="relative group">
              <User :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D7FF00] transition-colors" />
              <input 
                v-model="formData.userId" 
                type="text" 
                required
                placeholder="Ex: joao123"
                class="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#1A1A1A] rounded-2xl text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all shadow-sm"
              />
            </div>
          </div>

          <!-- Value Input -->
          <div class="flex flex-col gap-2 text-left">
            <label class="text-[11px] text-gray-500 font-black uppercase tracking-[0.1em] ml-1">Valor Total (R$)</label>
            <div class="relative group">
              <DollarSign :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D7FF00] transition-colors" />
              <input 
                v-model.number="formData.value" 
                type="number" 
                step="0.01"
                required
                placeholder="0,00"
                class="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#1A1A1A] rounded-2xl text-[16px] font-black text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all shadow-sm"
              />
            </div>
            <!-- Dynamic Info -->
            <div v-if="formData.value" class="flex justify-between px-1 mt-1">
              <span class="text-[12px] text-gray-500 font-bold">Taxa estimada (7%)</span>
              <span class="text-[12px] text-red-400 font-bold">- R$ {{ (formData.value * 0.07).toFixed(2) }}</span>
            </div>
            <div v-if="formData.value" class="flex justify-between px-1">
              <span class="text-[12px] text-gray-500 font-bold">Recebimento líquido</span>
              <span class="text-[12px] text-[#D7FF00] font-black">R$ {{ (formData.value * 0.93).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Type Selection -->
          <div class="flex flex-col gap-2 text-left">
            <label class="text-[11px] text-gray-500 font-black uppercase tracking-[0.1em] ml-1">Tipo de Transação</label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button"
                @click="formData.type = 'income'"
                :class="formData.type === 'income' ? 'bg-[#D7FF00] text-black shadow-lg shadow-green-900/20' : 'bg-[#0A0A0A] text-gray-500 border border-[#1A1A1A] hover:bg-[#1A1A1A]'"
                class="py-4 rounded-2xl text-[13px] font-black transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowDownCircle :size="18" />
                Entrada
              </button>
              <button 
                type="button"
                @click="formData.type = 'outcome'"
                :class="formData.type === 'outcome' ? 'bg-[#D7FF00] text-black shadow-lg shadow-green-900/20' : 'bg-[#0A0A0A] text-gray-500 border border-[#1A1A1A] hover:bg-[#1A1A1A]'"
                class="py-4 rounded-2xl text-[13px] font-black transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowUpCircle :size="18" />
                Saída
              </button>
            </div>
          </div>

          <!-- Status Selection -->
          <div class="flex flex-col gap-2 text-left">
            <label class="text-[11px] text-gray-500 font-black uppercase tracking-[0.1em] ml-1">Status Inicial</label>
            <div class="relative group">
              <Activity :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D7FF00] transition-colors" />
              <select 
                v-model="formData.status"
                class="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#1A1A1A] rounded-2xl text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="Pendente">Pendente</option>
                <option value="Aprovada">Aprovada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex gap-4 mt-6">
            <button 
              type="button"
              @click="$emit('close')"
              class="flex-1 px-6 py-4 border border-[#1A1A1A] text-gray-500 font-black rounded-2xl hover:bg-[#1A1A1A] transition-all cursor-pointer uppercase tracking-wider text-[11px]"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="flex-2 px-6 py-4 bg-[#D7FF00] text-black font-black rounded-2xl shadow-xl shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-widest text-[11px]"
            >
              Registrar transação
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X, User, DollarSign, ArrowUpCircle, ArrowDownCircle, Activity } from 'lucide-vue-next'

export default {
  name: 'CreateTransactionModal',
  components: {
    X,
    User,
    DollarSign,
    ArrowUpCircle,
    ArrowDownCircle,
    Activity
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        userId: '',
        value: null,
        type: 'income',
        status: 'Pendente'
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.formData.userId || !this.formData.value) return
      
      this.$emit('save', { ...this.formData })
      // Reset form
      this.formData = {
        userId: '',
        value: null,
        type: 'income',
        status: 'Pendente'
      }
    }
  }
}
</script>
