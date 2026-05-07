<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 gap-6">
         <h1 class="text-2xl font-black text-[white]">Entradas</h1>
         
         <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <!-- Search -->
            <div class="relative w-full sm:flex-1 lg:w-[280px]">
              <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Buscar por ID..." 
                class="w-full pl-10 pr-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all shadow-sm" 
              />
            </div>
            
            <!-- Filter -->
            <div class="relative w-full sm:w-[160px]">
              <Filter :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <select 
                v-model="statusFilter" 
                class="w-full pl-10 pr-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="all">Todos Status</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <ChevronDown :size="14" class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
         </div>
      </div>

      <div class="px-2">
        <div class="bg-[#0A0A0A] rounded-[20px] shadow-sm border border-[#1A1A1A] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-[#1A1A1A]/50">
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-20">Meio</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[200px]">Transação ID</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[120px]">Valor Bruto</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[120px]">Valor Líquido</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-32">Status</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[150px]">Data</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1A1A1A] font-bold">
                <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-[#1A1A1A]/50 transition-all cursor-pointer group">
                  <td class="px-8 py-5 text-[#D7FF00]">
                    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.917 11.71a2.046 2.046 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.044 2.044 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668h-.253zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.044 2.044 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z" fill="currentColor"/>
                      <path d="m14.377 6.496-1.612-1.612a.307.307 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.448 1.448 0 0 0-1.018-.422h-.9a.306.306 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.305.305 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733c.04 0 .079.01.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z" fill="currentColor"/>
                    </svg>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[12px] text-gray-500 font-mono">{{ tx.txId }}</span>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[14px] text-[white]">R$ {{ tx.value }}</span>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[14px] text-[#D7FF00]">R$ {{ tx.netValue }}</span>
                  </td>
                  <td class="px-8 py-5">
                    <span class="px-3 py-1 bg-[#D7FF00]/10 text-[#D7FF00] text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {{ tx.status }}
                    </span>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[12px] text-gray-500 whitespace-nowrap">{{ tx.date }}</span>
                  </td>
                </tr>
                <tr v-if="filteredTransactions.length === 0">
                   <td colspan="6" class="px-8 py-10 text-center text-gray-500 font-bold">Nenhuma transação encontrada.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Search, Filter, ChevronDown } from 'lucide-vue-next'

export default {
  name: 'UserIncome',
  components: {
    AdminLayout, Search, Filter, ChevronDown
  },
  data() {
    return {
      searchQuery: '',
      statusFilter: 'all',
      transactions: [
        { id: 1, txId: 'f0f5b412-498c-4ddf-92e3-6d4abba2c787', value: '121,00', netValue: '111,74', status: 'Aprovado', date: '07/01/2026 às 15:25:36' },
        { id: 2, txId: 'a7971f4c-e7be-4317-ac42-72e0b00bffca', value: '25,50', netValue: '24,74', status: 'Aprovado', date: '06/01/2026 às 13:16:58' },
        { id: 3, txId: '961c34e7-3317-4427-a690-2b5d9997df0c', value: '25,50', netValue: '24,74', status: 'Pendente', date: '05/01/2026 às 18:28:00' },
        { id: 4, txId: '1f0c898a-8627-476d-a00e-1e3c2900c5e6', value: '20,68', netValue: '19,23', status: 'Aprovado', date: '27/12/2025 às 16:58:06' }
      ]
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(tx => {
        const matchesSearch = tx.txId.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesStatus = this.statusFilter === 'all' || tx.status === this.statusFilter
        return matchesSearch && matchesStatus
      })
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
