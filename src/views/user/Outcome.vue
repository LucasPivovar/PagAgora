<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 gap-6">
         <h1 class="text-2xl font-black text-[white]">Saídas</h1>
         
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
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[120px]">Tipo</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[200px]">Transação ID</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[120px]">Valor</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-32">Status</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[150px]">Data</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1A1A1A] font-bold">
                <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-[#1A1A1A]/50 transition-all cursor-pointer group">
                  <td class="px-8 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                         <ArrowUpRight :size="16" stroke-width="3" />
                      </div>
                      <span class="text-[14px] text-[white]">{{ tx.type }}</span>
                    </div>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[12px] text-gray-500 font-mono">{{ tx.txId }}</span>
                  </td>
                  <td class="px-8 py-5">
                    <span class="text-[14px] text-[white]">R$ {{ tx.value }}</span>
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
                   <td colspan="5" class="px-8 py-10 text-center text-gray-500 font-bold">Nenhuma transação encontrada.</td>
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
import { ArrowUpRight, Search, Filter, ChevronDown } from 'lucide-vue-next'

export default {
  name: 'UserOutcome',
  components: {
    AdminLayout, ArrowUpRight, Search, Filter, ChevronDown
  },
  data() {
    return {
      searchQuery: '',
      statusFilter: 'all',
      transactions: [
        { id: 1, type: 'Saída', txId: 'aureapag-1606', value: '18,40', status: 'Aprovado', date: '13/01/2026 às 16:06:24' },
        { id: 2, type: 'Saída', txId: 'sigmapay-1439', value: '209,71', status: 'Aprovado', date: '13/01/2026 às 14:39:10' }
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
