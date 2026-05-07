<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <!-- Page Title -->
      <div class="px-2">
        <h1 class="text-2xl font-black text-[white]">Carteiras</h1>
      </div>

      <!-- Top KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        <!-- Total em carteiras -->
        <div class="bg-[#0A0A0A] p-6 rounded-[24px] shadow-sm border border-[#1A1A1A] flex justify-between items-start hover:shadow-md transition-all h-[150px]">
          <div class="flex flex-col gap-1">
            <div class="text-[12px] text-gray-500 font-bold uppercase tracking-widest">Saldo em carteiras</div>
            <div class="text-[32px] font-black text-[white]">R$ 17.168,21</div>
            <div class="text-[13px] font-bold text-[#D7FF00] mt-1">+12.5% este mês</div>
          </div>
          <div class="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#D7FF00]">
            <Wallet :size="28" stroke-width="2.5" />
          </div>
        </div>

        <!-- Total no gateway -->
        <div class="bg-[#0A0A0A] p-6 rounded-[24px] shadow-sm border border-[#1A1A1A] flex justify-between items-start hover:shadow-md transition-all h-[150px]">
          <div class="flex flex-col gap-1">
            <div class="text-[12px] text-gray-500 font-bold uppercase tracking-widest">Total no gateway</div>
            <div class="text-[32px] font-black text-[white]">R$ 28.430,32</div>
            <div class="text-[13px] font-bold text-[#D7FF00] mt-1">+8.4% este mês</div>
          </div>
          <div class="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#D7FF00]">
            <CreditCard :size="28" stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Top 3 Section -->
      <div class="px-2">
        <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#D7FF00]/20 overflow-hidden">
          <div class="px-6 py-4 border-b border-[#1A1A1A]">
            <h2 class="text-xl font-black text-[white]">TOP 3 com mais vendas</h2>
          </div>
          <div class="p-6">
            <div class="bg-[#1A1A1A]/30 border border-[#1A1A1A] rounded-xl p-6 flex flex-col gap-6 md:gap-4">
              <div v-for="(user, index) in topUsers" :key="index">
                <!-- Mobile Layout (Labels on top, values below, 50/50 split) -->
                <div class="flex md:hidden items-center w-full">
                  <div class="flex-1 flex flex-col uppercase">
                    <span class="text-[11px] font-bold text-gray-500 tracking-widest mb-0.5">User:</span>
                    <span class="text-[14px] font-black text-[#D7FF00] leading-tight">{{ user.name }}</span>
                  </div>
                  <div class="h-6 w-px bg-[#1A1A1A] mx-4"></div>
                  <div class="flex-1 flex flex-col uppercase">
                    <span class="text-[11px] font-bold text-gray-500 tracking-widest mb-0.5">Saldo:</span>
                    <span class="text-[14px] font-black text-[#D7FF00] leading-tight">R$ {{ user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                  </div>
                </div>

                <!-- Desktop Layout (Horizontal) -->
                <div class="hidden md:flex items-center gap-2 font-bold text-[14px]">
                  <span class="text-white">User:</span>
                  <span class="text-[#D7FF00] uppercase">{{ user.name }}</span>
                  <span class="text-gray-500 mx-1">|</span>
                  <span class="text-white">Saldo:</span>
                  <span class="text-[#D7FF00]">R$ {{ user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                  <span class="text-gray-500 ml-1">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Report Table Section -->
      <div class="px-2">
        <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#1A1A1A] overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-[#1A1A1A] flex justify-between items-center">
            <h2 class="text-xl font-black text-[white]">Relatório de Usuários</h2>
          </div>

          <!-- Table Search and Sort -->
          <div class="px-6 py-6 flex flex-col sm:flex-row justify-between items-end gap-4 bg-[#1A1A1A]/30 border-b border-[#1A1A1A]">
            <div class="relative w-full sm:w-[350px]">
              <span class="text-[12px] font-bold text-gray-500 block mb-1.5 ml-1">Pesquisar</span>
              <div class="relative">
                <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" :size="18" />
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Nome, ID ou Email..."
                  class="w-full pl-11 pr-4 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] shadow-sm transition-all"
                >
              </div>
            </div>

            <div class="relative w-full sm:w-[220px]">
              <span class="text-[12px] font-bold text-gray-500 block mb-1.5 ml-1">Ordenar por</span>
              <select v-model="sortBy" class="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] shadow-sm cursor-pointer font-medium text-gray-600 appearance-none">
                <option value="recent">Mais recentes</option>
                <option value="revenue_desc">Maior Faturamento</option>
                <option value="revenue_asc">Menor Faturamento</option>
                <option value="alphabetical">Nome (A-Z)</option>
              </select>
              <div class="absolute right-4 bottom-3 pointer-events-none text-gray-500">
                <ChevronDown :size="14" />
              </div>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="text-left border-b border-[#1A1A1A] bg-[#1A1A1A]/50">
                  <th class="px-6 py-4 text-[13px] font-black text-[white]">User ID</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[white]">Faturamento</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[white]">Email</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[white]">Telefone</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[white] text-center w-[160px]">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id" class="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-all text-[13px] font-medium text-[white]">
                  <td class="px-6 py-4">{{ user.userId }}</td>
                  <td class="px-6 py-4">R$ {{ user.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ user.phone }}</td>
                  <td class="px-6 py-4 text-center">
                      <button class="bg-[#D7FF00] text-black px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all hover:bg-[#E5FF4D] hover:scale-105 active:scale-95 shadow-lg shadow-lime-900/10 cursor-pointer">
                        WHATSAPP
                      </button>
                  </td>
                </tr>
                <!-- Empty State within Table -->
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="5" class="px-6 py-10 text-center text-gray-500 italic">
                    Nenhum usuário encontrado para a pesquisa.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1A1A1A]/20">
            <span class="text-[13px] font-medium text-gray-500">Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }} resultados</span>
            <div class="flex gap-2">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)" 
                class="px-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-gray-600 hover:text-[#D7FF00] hover:border-[#D7FF00] disabled:opacity-50 disabled:text-gray-500 transition-all cursor-pointer disabled:cursor-not-allowed"
                :disabled="currentPage === 1"
              >
                Anterior
              </button>
              <div class="flex gap-1">
                <button 
                  v-for="p in totalPages" 
                  :key="p" 
                  @click="currentPage = p"
                  :class="currentPage === p ? 'bg-[#D7FF00] text-black border-[#D7FF00]' : 'bg-[#0A0A0A] border-[#1A1A1A] text-gray-500'"
                  class="w-10 h-10 flex items-center justify-center border rounded-xl text-[13px] font-bold hover:border-[#D7FF00] transition-all cursor-pointer"
                >
                  {{ p }}
                </button>
              </div>
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)" 
                class="px-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-gray-600 hover:text-[#D7FF00] hover:border-[#D7FF00] disabled:opacity-50 disabled:text-gray-500 transition-all cursor-pointer disabled:cursor-not-allowed"
                :disabled="currentPage === totalPages"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Wallet, CreditCard, Search, ChevronDown } from 'lucide-vue-next'

export default {
  name: 'WalletsView',
  components: {
    AdminLayout,
    Wallet,
    CreditCard,
    Search,
    ChevronDown
  },
  data() {
    return {
      searchQuery: '',
      sortBy: 'recent',
      currentPage: 1,
      itemsPerPage: 8,
      topUsers: [
        { name: 'vvv vvv', balance: 10015.00 },
        { name: 'TIAGO RIBEIRO BORGES', balance: 7705.76 },
        { name: 'GIWAGO CAVALCANTI OLIVEIRA', balance: 4874.77 }
      ],
      userData: [
        { id: 1, userId: 'leandroprivovar', revenue: 0.00, email: 'leandroprivovar@hotmail.com', phone: '41998902754' },
        { id: 2, userId: 'lpato', revenue: 0.00, email: 'lpato9766@gmail.com', phone: '11958373629' },
        { id: 3, userId: 'ellzade', revenue: 0.00, email: 'ellzadebortollladv@gmail.com', phone: '47997030202' },
        { id: 4, userId: 'ocaradoscanais', revenue: 0.00, email: 'emershow.ads@gmail.com', phone: '51994133933' },
        { id: 5, userId: 'josecmkt', revenue: 5.00, email: 'junior.jc7544@gmail.com', phone: '(49) 00000-0000' },
        { id: 6, userId: 'waytec', revenue: 0.00, email: 'lucaswallysson2003@gmail.com', phone: '41996042257' },
        { id: 7, userId: 'cristielymaria', revenue: 6.00, email: 'agriculturepatricia@gmail.com', phone: '19 98349-8335' },
        { id: 8, userId: 'leorof', revenue: 0.00, email: '3leorodrigues@gmail.com', phone: '11953561836' },
        // Extra mock data for pagination
        { id: 9, userId: 'thiago_borges', revenue: 7705.76, email: 'thiago@example.com', phone: '11988887777' },
        { id: 10, userId: 'giwago_oliveira', revenue: 4874.77, email: 'giwago@example.com', phone: '21977776666' },
        { id: 11, userId: 'vvv_user', revenue: 10015.00, email: 'vvv@example.com', phone: '31966665555' },
        { id: 12, userId: 'admin_test', revenue: 150.00, email: 'admin@PagAgoras.com', phone: '11900001111' }
      ]
    }
  },
  computed: {
    filteredUsers() {
      let result = [...this.userData]
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(u => 
          u.userId.toLowerCase().includes(query) || 
          u.email.toLowerCase().includes(query) || 
          u.phone.includes(query)
        )
      }

      // Sort results
      switch (this.sortBy) {
        case 'revenue_desc':
          result.sort((a, b) => b.revenue - a.revenue)
          break
        case 'revenue_asc':
          result.sort((a, b) => a.revenue - b.revenue)
          break
        case 'alphabetical':
          result.sort((a, b) => a.userId.localeCompare(b.userId))
          break
        case 'recent':
          result.sort((a, b) => b.id - a.id) // Assuming ID is a proxy for recent
          break
      }

      return result
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage) || 1
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    sortBy() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

/* Optional: Subtle row animation */
tbody tr {
  transition: all 0.2s ease;
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
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
