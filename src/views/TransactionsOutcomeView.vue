<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-[#1A1A1A] flex-1">
          <div 
            class="pb-4 text-lg font-black transition-all text-[#D7FF00] border-b-2 border-[#D7FF00]"
          >
            Saídas
          </div>
        </div>
        <button 
          @click="showModal = true"
          class="bg-[#D7FF00] text-black px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus :size="18" stroke-width="3" />
          Criar transação
        </button>
      </div>

      <!-- Registration Modal -->
      <CreateTransactionModal 
        :is-open="showModal" 
        @close="showModal = false"
        @save="handleSaveTransaction"
      />

      <!-- Content for Saídas Tab -->
      <div class="flex flex-col gap-8">
        <!-- Top KPI Cards Row 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          <div v-for="kpi in kpisRow1" :key="kpi.label" class="bg-[#0A0A0A] p-5 rounded-[20px] border border-[#1A1A1A] border-l-4 border-l-[#991b1b] flex justify-between items-center shadow-sm">
            <div class="flex flex-col">
              <div class="text-[24px] font-black text-[white]">{{ kpi.value }}</div>
              <div class="text-[12px] text-gray-500 font-bold">{{ kpi.label }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#991b1b]">
              <component :is="kpi.icon" :size="20" stroke-width="3" />
            </div>
          </div>
        </div>

        <!-- Top KPI Cards Row 2 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
          <div v-for="kpi in kpisRow2" :key="kpi.label" class="bg-[#0A0A0A] p-5 rounded-[20px] border border-[#1A1A1A] border-l-4 border-l-[#991b1b] flex justify-between items-center shadow-sm h-[110px]">
            <div class="flex flex-col">
              <div class="text-[24px] font-black text-[white]">R$ {{ kpi.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
              <div class="text-[12px] text-gray-500 font-bold">{{ kpi.label }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#991b1b]">
              <ArrowUpRight :size="20" stroke-width="3" />
            </div>
          </div>
        </div>

        <!-- Transaction Table -->
        <div class="px-2">
          <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#1A1A1A] overflow-hidden text-left">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="text-left border-b border-[#1A1A1A]">
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Meio</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">User ID</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Transação ID</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in paginatedTransactions" :key="tx.id" class="border-b border-[#1A1A1A] transition-all hover:bg-[#1A1A1A]/50">
                    <td class="px-6 py-4">
                      <div class="text-gray-500">
                        <ArrowUpRight :size="18" />
                      </div>
                    </td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white]">{{ tx.userId }}</td>
                    <td class="px-6 py-4 text-[12px] text-gray-500 font-medium truncate max-w-[150px]">{{ tx.txId }}</td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white]">R$ {{ tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                    <td class="px-6 py-4 text-center">
                      <span class="bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                        {{ tx.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-[12px] text-gray-500 font-medium">{{ tx.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Container -->
            <div v-if="transactions.length > 9" class="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-8 border-t border-[#1A1A1A] text-center md:text-left">
              <span class="text-sm font-medium text-gray-500">Mostrando {{ paginatedTransactions.length }} de {{ transactions.length }} transações</span>
              <div class="flex flex-wrap justify-center gap-2">
                <button @click="currentPage = Math.max(1, currentPage - 1)" class="pagination-btn" :disabled="currentPage === 1">Anterior</button>
                <button 
                  v-for="p in totalPages" 
                  :key="p" 
                  @click="currentPage = p" 
                  class="pagination-btn" 
                  :class="{'active': currentPage === p}"
                >{{ p }}</button>
                <button @click="currentPage = Math.min(totalPages, currentPage + 1)" class="pagination-btn" :disabled="currentPage === totalPages">Próximo</button>
              </div>
            </div>
            <div v-else-if="transactions.length > 0" class="px-6 py-4 border-t border-[#1A1A1A] text-left">
              <span class="text-sm font-medium text-gray-500">Mostrando todas as {{ transactions.length }} transações</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../components/AdminLayout.vue'
import CreateTransactionModal from '../components/modals/CreateTransactionModal.vue'
import { ArrowUpRight, Plus, RefreshCw, XCircle } from 'lucide-vue-next'

export default {
  name: 'TransactionsOutcomeView',
  components: {
    AdminLayout,
    CreateTransactionModal,
    ArrowUpRight,
    Plus,
    RefreshCw,
    XCircle
  },
  data() {
    return {
      currentPage: 1,
      showModal: false,
      kpisRow1: [
        { label: 'Saídas (Total)', value: 452, icon: 'ArrowUpRight' },
        { label: 'Saídas (Hoje)', value: 0, icon: 'ArrowUpRight' },
        { label: 'Saídas (Mês)', value: 0, icon: 'ArrowUpRight' },
        { label: 'Falhas/Canceladas', value: 12, icon: 'XCircle' }
      ],
      kpisRow2: [
        { label: 'Total Sacado (Bruto)', value: 15420.50 },
        { label: 'Sacado (Hoje)', value: 0.00 },
        { label: 'Sacado (Mês)', value: 0.00 }
      ],
      transactions: [
        { id: 1, userId: 'lucas_pivo', txId: 'out_d0f5b412-498c-4ddf', value: 500.00, status: 'Pendente', date: '19/03/2026 às 14:13:15' },
        { id: 2, userId: 'admin_test', txId: 'out_a7971f4c-e7be-4317', value: 1250.00, status: 'Pendente', date: '18/03/2026 às 10:41:27' },
        { id: 3, userId: 'user_01', txId: 'out_961c34e7-3317-4427', value: 50.00, status: 'Aprovada', date: '17/03/2026 às 08:27:50' },
        { id: 4, userId: 'lucas_pivo', txId: 'out_1f0c898a-8627-476d', value: 100.00, status: 'Pendente', date: '16/03/2026 às 17:55:26' },
      ]
    }
  },
  methods: {
    handleSaveTransaction(newTx) {
      if (newTx.type !== 'outcome') return

      const now = new Date()
      const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      
      const transaction = {
        id: this.transactions.length + 1,
        userId: newTx.userId,
        txId: 'out_' + Math.random().toString(36).substring(2, 10),
        value: newTx.value,
        status: newTx.status,
        date: formattedDate
      }

      this.transactions.unshift(transaction)
      this.showModal = false
    }
  },
  computed: {
    paginatedTransactions() {
      const start = (this.currentPage - 1) * 9;
      const end = start + 9;
      return this.transactions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.transactions.length / 9);
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.pagination-btn {
  @apply px-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm font-bold text-gray-500 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}

.pagination-btn:not(:disabled) {
  @apply text-gray-600 border-gray-500 hover:border-[#D7FF00] hover:text-[#D7FF00];
}

.pagination-btn.active {
  @apply bg-[#D7FF00] text-black border-[#D7FF00] shadow-lg shadow-green-900/10 scale-105;
}

::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
