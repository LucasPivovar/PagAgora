<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-[#1A1A1A] flex-1">
          <div 
            class="pb-4 text-lg font-black transition-all text-[#D7FF00] border-b-2 border-[#D7FF00]"
          >
            Entradas
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

      <!-- Content for Entradas Tab -->
      <div class="flex flex-col gap-8">
        <!-- Top KPI Cards Row 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          <div v-for="kpi in kpisRow1" :key="kpi.label" class="bg-[#0A0A0A] p-5 rounded-[20px] border border-[#1A1A1A] border-l-4 border-l-[#D7FF00] flex justify-between items-center shadow-sm">
            <div class="flex flex-col">
              <div class="text-[24px] font-black text-[white]">{{ kpi.value }}</div>
              <div class="text-[12px] text-gray-500 font-bold">{{ kpi.label }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#D7FF00]">
              <component :is="kpi.icon" :size="20" stroke-width="3" />
            </div>
          </div>
        </div>

        <!-- Top KPI Cards Row 2 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
          <div v-for="kpi in kpisRow2" :key="kpi.label" class="bg-[#0A0A0A] p-5 rounded-[20px] border border-[#1A1A1A] border-l-4 border-l-[#D7FF00] flex justify-between items-center shadow-sm h-[110px]">
            <div class="flex flex-col">
              <div class="text-[24px] font-black text-[white]">R$ {{ kpi.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
              <div class="text-[12px] text-gray-500 font-bold">{{ kpi.label }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#D7FF00]">
              <Check :size="20" stroke-width="3" />
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
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-center">Valor Líquido</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Data</th>
                    <th class="px-6 py-5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Taxa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in paginatedTransactions" :key="tx.id" class="border-b border-[#1A1A1A] transition-all hover:bg-[#1A1A1A]/50">
                    <td class="px-6 py-4">
                      <!-- Official PIX Icon SVG -->
                      <div class="text-[#32BCAD]">
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.917 11.71a2.046 2.046 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.044 2.044 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668h-.253zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.044 2.044 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z" fill="currentColor"/>
                          <path d="m14.377 6.496-1.612-1.612a.307.307 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.448 1.448 0 0 0-1.018-.422h-.9a.306.306 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.305.305 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733c.04 0 .079.01.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z" fill="currentColor"/>
                        </svg>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white]">{{ tx.userId }}</td>
                    <td class="px-6 py-4 text-[12px] text-gray-500 font-medium truncate max-w-[150px]">{{ tx.txId }}</td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white]">{{ tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white] text-center">{{ tx.netValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                    <td class="px-6 py-4 text-center">
                      <span class="bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                        {{ tx.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-[12px] text-gray-500 font-medium">{{ tx.date }}</td>
                    <td class="px-6 py-4 text-[13px] font-bold text-[white]">R$ {{ tx.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
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
import { Check, RefreshCw, Plus } from 'lucide-vue-next'

export default {
  name: 'TransactionsIncomeView',
  components: {
    AdminLayout,
    CreateTransactionModal,
    Check,
    RefreshCw,
    Plus
  },
  data() {
    return {
      currentPage: 1,
      showModal: false,
      kpisRow1: [
        { label: 'Aprovadas (Total)', value: 1259, icon: 'Check' },
        { label: 'Aprovadas (Hoje)', value: 0, icon: 'Check' },
        { label: 'Aprovadas (Mês)', value: 0, icon: 'Check' },
        { label: 'Transações geral', value: 1248, icon: 'RefreshCw' }
      ],
      kpisRow2: [
        { label: 'Aprovadas (Bruto)', value: 29334.17 },
        { label: 'Aprovadas (Hoje)', value: 0.00 },
        { label: 'Aprovadas (Mês)', value: 0.00 }
      ],
      transactions: [
        { id: 1, userId: 'fwfwfw', txId: 'd0f5b412-498c-4ddf-92e3-6d4abba2c787', value: 121.00, netValue: 111.74, status: 'Pendente', date: '28/02/2026 às 19:13:15', fee: 9.26 },
        { id: 2, userId: 'Marcha', txId: 'a7971f4c-e7be-4317-ac42-72e0b00bffca', value: 25.50, netValue: 24.74, status: 'Pendente', date: '17/01/2026 às 19:41:27', fee: 0.76 },
        { id: 3, userId: 'Marcha', txId: '961c34e7-3317-4427-a690-2b5d9997df0c', value: 25.50, netValue: 24.74, status: 'Pendente', date: '15/01/2026 às 18:27:50', fee: 0.76 },
        { id: 4, userId: 'Marcha', txId: '1f0c898a-8627-476d-a00e-1e3c2900c5e6', value: 25.50, netValue: 24.74, status: 'Pendente', date: '14/01/2026 às 17:55:26', fee: 0.76 },
        { id: 5, userId: 'Marcha', txId: 'e683ee4c-bf54-40ab-839c-62ebdc056ef6', value: 25.50, netValue: 24.74, status: 'Pendente', date: '13/01/2026 às 17:36:16', fee: 0.76 },
        { id: 6, userId: 'Marcha', txId: '4f164717-291e-4b9b-bc13-71a117d0d069', value: 20.00, netValue: 19.40, status: 'Pendente', date: '13/01/2026 às 16:07:29', fee: 0.60 },
        { id: 7, userId: 'aureapag', txId: '083985c0-a3d0-4ad7-b1aa-52107d7e4e54', value: 18.40, netValue: 17.50, status: 'Pendente', date: '13/01/2026 às 16:06:24', fee: 0.90 },
        { id: 8, userId: 'Marcha', txId: 'bfdf003d-32ec-4631-845a-85f0953d9045', value: 2.00, netValue: 1.94, status: 'Pendente', date: '13/01/2026 às 15:49:04', fee: 0.06 },
        { id: 9, userId: 'aureapag', txId: 'b2775d82-ebf6-4c85-bc6d-00b798417bcb', value: 5.00, netValue: 4.10, status: 'Pendente', date: '13/01/2026 às 15:38:41', fee: 0.90 },
        { id: 10, userId: 'Fernandamegahair', txId: '6426f283-d113-46aa-8627-74f27d450d5f', value: 1500.00, netValue: 1394.35, status: 'Pendente', date: '08/01/2026 às 17:18:15', fee: 105.65 },
        { id: 11, userId: 'Marcha', txId: '7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p', value: 45.00, netValue: 43.65, status: 'Pendente', date: '05/01/2026 às 14:20:10', fee: 1.35 },
        { id: 12, userId: 'fwfwfw', txId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', value: 89.90, netValue: 87.20, status: 'Pendente', date: '03/01/2026 às 09:15:45', fee: 2.70 },
        { id: 13, userId: 'aureapag', txId: '9z8y7x6w-5v4u-3t2s-1r0q-p9o8n7m6l5k4', value: 12.50, netValue: 12.12, status: 'Pendente', date: '02/01/2026 às 11:30:22', fee: 0.38 },
        { id: 14, userId: 'Marcha', txId: 'm1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6', value: 250.00, netValue: 242.50, status: 'Pendente', date: '01/01/2026 às 16:45:00', fee: 7.50 },
        { id: 15, userId: 'Fernandamegahair', txId: 'p9o8i7u6-y5t4-r3e2-w1q0-l9k8j7h6g5f4', value: 50.00, netValue: 48.50, status: 'Pendente', date: '01/01/2026 às 10:05:12', fee: 1.50 }
      ]
    }
  },
  methods: {
    handleSaveTransaction(newTx) {
      if (newTx.type !== 'income') return

      const now = new Date()
      const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      
      const transaction = {
        id: this.transactions.length + 1,
        userId: newTx.userId,
        txId: Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15),
        value: newTx.value,
        netValue: newTx.value * 0.93, // Simulating a fixed fee for demo
        status: newTx.status,
        date: formattedDate,
        fee: newTx.value * 0.07 // Simulating a fee
      }

      this.transactions.unshift(transaction)
      this.showModal = false
      
      // Update KPIs if approved
      if (newTx.status === 'Aprovada') {
        const kpiIndexTotal = this.kpisRow1.findIndex(k => k.label === 'Aprovadas (Total)')
        if (kpiIndexTotal !== -1) this.kpisRow1[kpiIndexTotal].value++

        const kpiIndexGross = this.kpisRow2.findIndex(k => k.label === 'Aprovadas (Bruto)')
        if (kpiIndexGross !== -1) this.kpisRow2[kpiIndexGross].value += newTx.value
      }
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

/* Custom scrollbar for table on mobile */
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
