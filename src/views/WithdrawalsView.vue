<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left pb-10">
      <div class="px-4 mt-2">
        <h2 class="text-[22px] font-black text-[white]">Saques pendentes</h2>
      </div>
      
      <div class="px-4">
        <div class="bg-[#0A0A0A] p-6 rounded-[24px] shadow-sm border border-[#1A1A1A]">
          <!-- Filters Section - Right Aligned -->
          <div class="flex flex-col sm:flex-row justify-end items-center mb-6 gap-3">
            <!-- Search -->
            <div class="relative w-full sm:w-[280px]">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Pesquisar..." 
                class="w-full pl-10 pr-4 py-2.5 border border-[#1A1A1A] rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-[#D7FF00] transition-all hover:border-[#1A1A1A] shadow-sm" 
              />
              <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <Search :size="16" />
              </div>
            </div>

            <!-- Date Filter -->
            <div class="relative w-full sm:w-[160px]">
              <select v-model="filterDate" class="w-full pl-10 pr-8 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-gray-600 focus:outline-none focus:border-[#D7FF00] appearance-none cursor-pointer transition-all hover:border-[#1A1A1A] shadow-sm">
                <option value="all">Tudo</option>
                <option value="today">Hoje</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="year">Este ano</option>
              </select>
              <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D7FF00]">
                 <Calendar :size="14" />
              </div>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto min-h-[400px]">
            <table class="w-full text-left text-[13px] whitespace-nowrap border-collapse">
              <thead class="text-gray-500 border-b border-[#1A1A1A] uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-4 px-4 font-bold">Cliente ID</th>
                  <th class="py-4 px-4 font-bold">Transação ID</th>
                  <th class="py-4 px-4 font-bold">Chave PIX</th>
                  <th class="py-4 px-4 font-bold">Valor Total</th>
                  <th class="py-4 px-4 font-bold">Valor Liquido</th>
                  <th class="py-4 px-4 font-bold">Status</th>
                  <th class="py-4 px-4 font-bold">Data</th>
                  <th class="py-4 px-4 font-bold text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="text-[white]">
                <tr v-for="withdrawal in currentWithdrawals" :key="withdrawal.id" class="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A]/50 transition-colors">
                  <td class="py-4 px-4 font-bold">{{ withdrawal.clientId || '---' }}</td>
                  <td class="py-4 px-4 font-medium text-[11px] text-gray-500">{{ withdrawal.transactionId }}</td>
                  <td class="py-4 px-4 font-medium">{{ withdrawal.pixKey }}</td>
                  <td class="py-4 px-4 font-black">R$ {{ withdrawal.totalValue.replace('R$ ', '') }}</td>
                  <td class="py-4 px-4 font-black text-[#D7FF00]">R$ {{ withdrawal.netValue.replace('R$ ', '') }}</td>
                  <td class="py-4 px-4">
                    <span :class="{
                      'bg-amber-400/10 text-amber-500 border border-amber-500/30': withdrawal.status === 'Pendente',
                      'bg-[#D7FF00]/10 text-[#D7FF00] border border-[#D7FF00]/30': withdrawal.status === 'Aprovado',
                      'bg-rose-400/10 text-rose-500 border border-rose-500/30': withdrawal.status === 'Rejeitado'
                    }" class="px-2.5 py-1 rounded-lg inline-block text-[10px] font-black uppercase tracking-wider">
                      {{ withdrawal.status }}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-gray-500 font-medium">{{ withdrawal.date }}</td>
                  <td class="py-4 px-4">
                    <div class="flex gap-2 justify-center" v-if="withdrawal.status === 'Pendente'">
                      <button 
                        @click="updateStatus(withdrawal, 'Aprovado')"
                        class="bg-[#D7FF00] text-black px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all hover:bg-[#E5FF4D] hover:scale-105 active:scale-95 shadow-lg shadow-lime-900/10 cursor-pointer"
                      >
                        Aprovar
                      </button>
                      <button 
                        @click="updateStatus(withdrawal, 'Rejeitado')"
                        class="bg-[#0A0A0A] border border-[#1A1A1A] text-gray-500 hover:text-rose-600 hover:border-rose-200 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                      >
                        Rejeitar
                      </button>
                    </div>
                    <div v-else class="text-center text-gray-500 text-[11px] italic font-bold">
                      FINALIZADO
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div v-if="filteredWithdrawals.length > 10" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-8 border-t border-[#1A1A1A]">
            <span class="text-sm font-medium text-gray-500">Mostrando {{ currentWithdrawals.length }} de {{ filteredWithdrawals.length }} saques</span>
            <div class="flex flex-wrap justify-center gap-2">
              <button @click="currentPage = Math.max(1, currentPage - 1)" class="pagination-btn" :disabled="currentPage === 1">Anterior</button>
              <button 
                v-for="p in totalPages" 
                :key="p" 
                @click="currentPage = p" 
                class="pagination-btn" 
                :class="{ 'active': currentPage === p }"
              >{{ p }}</button>
              <button @click="currentPage = Math.min(totalPages, currentPage + 1)" class="pagination-btn" :disabled="currentPage === totalPages">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../components/AdminLayout.vue'
import { Search, Calendar } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

export default {
  name: 'WithdrawalsView',
  components: {
    AdminLayout,
    Search,
    Calendar
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      searchQuery: '',
      filterDate: 'all',
      currentPage: 1,
      withdrawals: [
        { id: 1, clientId: 'fwfwfw', transactionId: '7db7bc4b-b6d1-447b-9286-56b378061df1', pixKey: '1kindyt@gmailc.com', totalValue: 'R$ 34,00', netValue: 'R$ 29,00', status: 'Pendente', date: '19/03/2026 às 11:31:52' },
        { id: 2, clientId: 'fwfwfw', transactionId: '9a1d238d-07e1-43d9-a157-cbe2a1bfa7c9', pixKey: '1kindyt@gmail.com', totalValue: 'R$ 20,00', netValue: 'R$ 15,00', status: 'Pendente', date: '19/03/2026 às 10:27:30' },
        { id: 3, clientId: 'Gisi Dias', transactionId: '3920cab609b24a40b56ff3f2304937f9', pixKey: '62.170.138/0001-96', totalValue: 'R$ 10,00', netValue: 'R$ 10,00', status: 'Aprovado', date: '18/03/2026 às 17:52:55' },
        { id: 4, clientId: '', transactionId: '85423a67-1074-4c83-81b3-3976ca060ee3', pixKey: '15351763931', totalValue: 'R$ 10,00', netValue: 'R$ 10,00', status: 'Pendente', date: '17/03/2026 às 10:37:44' },
        { id: 5, clientId: '', transactionId: 'cf774499-a564-4d79-b23b-351349e83d87', pixKey: '15351763931', totalValue: 'R$ 10,00', netValue: 'R$ 10,00', status: 'Pendente', date: '16/03/2026 às 18:28:04' },
        { id: 6, clientId: '', transactionId: '064de270-df97-4742-aac6-5ce6d5779011', pixKey: '15351763931', totalValue: 'R$ 12,00', netValue: 'R$ 12,00', status: 'Pendente', date: '10/03/2026 às 11:22:35' },
        { id: 7, clientId: '', transactionId: '4c03b8e3-fc50-4032-a6f4-249f05d9e703', pixKey: '15351763931', totalValue: 'R$ 10,00', netValue: 'R$ 10,00', status: 'Pendente', date: '01/03/2026 às 16:50:02' },
        { id: 8, clientId: 'sigmapay', transactionId: 'bc85cb25-ae98-4d9e-9372-32116fcdf576', pixKey: 'sigmapaybr@gmail.com', totalValue: 'R$ 209,71', netValue: 'R$ 209,21', status: 'Pendente', date: '15/02/2026 às 14:39:13' },
        { id: 9, clientId: 'Bene', transactionId: 'ea080811-083d-4b6d-b888-7f1a348fbc7c', pixKey: '11608162630', totalValue: 'R$ 260,00', netValue: 'R$ 259,00', status: 'Pendente', date: '05/01/2026 às 18:28:56' },
        { id: 10, clientId: 'Bene', transactionId: 'b9626531-e31a-4073-832b-3d8b94b6fece', pixKey: 'jdavi2369@gmail.com', totalValue: 'R$ 103,50', netValue: 'R$ 102,50', status: 'Pendente', date: '05/12/2025 às 07:52:24' },
        { id: 11, clientId: 'Carlos M.', transactionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', pixKey: 'carlos@email.com', totalValue: 'R$ 500,00', netValue: 'R$ 495,00', status: 'Pendente', date: '02/12/2025 às 09:10:00' },
        { id: 12, clientId: 'Ana P.', transactionId: 'f0e1d2c3-b4a5-6789-fedc-ba9876543210', pixKey: '98765432100', totalValue: 'R$ 75,00', netValue: 'R$ 72,00', status: 'Rejeitado', date: '01/12/2025 às 14:30:00' },
        { id: 13, clientId: '', transactionId: '11223344-5566-7788-99aa-bbccddeeff00', pixKey: 'contato@loja.com', totalValue: 'R$ 1.200,00', netValue: 'R$ 1.190,00', status: 'Pendente', date: '28/11/2025 às 11:05:00' },
        { id: 14, clientId: 'Joao V.', transactionId: 'aabbccdd-eeff-0011-2233-445566778899', pixKey: '12312312312', totalValue: 'R$ 45,00', netValue: 'R$ 43,00', status: 'Aprovado', date: '25/11/2025 às 16:45:00' },
        { id: 15, clientId: 'LojaTech', transactionId: '99887766-5544-3322-1100-ffeeddccbbaa', pixKey: 'financeiro@loja.com.br', totalValue: 'R$ 850,00', netValue: 'R$ 842,00', status: 'Pendente', date: '20/11/2025 às 08:00:00' }
      ]
    }
  },
  computed: {
    filteredWithdrawals() {
      // Mock logic for date filtering
      const today = '19/03/2026'
      const thisMonth = '/03/2026'
      const thisYear = '/2026'
      
      return this.withdrawals.filter(w => {
        const matchesSearch = w.pixKey.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                             w.transactionId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             (w.clientId && w.clientId.toLowerCase().includes(this.searchQuery.toLowerCase()))
        
        if (!matchesSearch) return false

        if (this.filterDate === 'today') return w.date.startsWith(today)
        if (this.filterDate === 'week') return w.date.includes(thisMonth) && parseInt(w.date.substring(0, 2)) >= 13 // Mock week
        if (this.filterDate === 'month') return w.date.includes(thisMonth)
        if (this.filterDate === 'year') return w.date.includes(thisYear)
        
        return true
      })
    },
    currentWithdrawals() {
      const start = (this.currentPage - 1) * 10
      return this.filteredWithdrawals.slice(start, start + 10)
    },
    totalPages() {
      return Math.ceil(this.filteredWithdrawals.length / 10)
    }
  },
  watch: {
    searchQuery() { this.currentPage = 1 },
    filterDate() { this.currentPage = 1 }
  },
  methods: {
    updateStatus(withdrawal, newStatus) {
      withdrawal.status = newStatus
      
      const isSuccess = newStatus === 'Aprovado'
      const message = isSuccess ? 'Saque aprovado com sucesso!' : 'Saque rejeitado.'
      const type = isSuccess ? 'success' : 'error'
      
      this.showToast(message, type)
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

table th {
  font-weight: 700;
  color: white;
}

.pagination-btn {
  @apply px-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm font-bold text-gray-500 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}

.pagination-btn:not(:disabled) {
  @apply text-gray-600 border-gray-500 hover:border-[#D7FF00] hover:text-[#D7FF00];
}

.pagination-btn.active {
  @apply bg-[#D7FF00] text-black border-[#D7FF00] shadow-lg shadow-green-900/10 scale-105;
}
</style>
