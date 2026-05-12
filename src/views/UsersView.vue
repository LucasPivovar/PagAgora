<template>
  <AdminLayout>
    <div class="flex flex-col gap-8">
      <!-- Internal Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 sm:px-6 gap-4">
        <h2 class="text-2xl font-black text-[white]">Usuários</h2>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div class="relative text-left w-full sm:w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" :size="20" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Pesquisar usuários..." 
              class="pl-11 pr-4 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] w-full shadow-sm placeholder:text-gray-500"
            >
          </div>
          <select v-model="filterStatus" class="px-4 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] shadow-sm text-gray-500 font-medium cursor-pointer min-h-[44px]">
            <option value="Todos">Todos</option>
            <option value="Ativo">Ativos</option>
            <option value="Análise">Em Análise</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
        </div>
      </div>

      <!-- KPI Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-6">
        <div v-for="(kpi, index) in kpis" :key="index" class="bg-[#D7FF00]/5 p-6 rounded-[20px] shadow-sm border border-[#D7FF00]/20 flex justify-between items-start hover:shadow-md hover:border-[#D7FF00]/40 transition-all group">
          <div class="text-left font-outfit">
            <div class="text-2xl font-black text-[white]">{{ kpi.value }}</div>
            <div class="text-[12px] text-gray-500 font-bold uppercase tracking-wider">{{ kpi.label }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00] flex-shrink-0 transition-all group-hover:bg-[#D7FF00] group-hover:text-black">
            <component :is="kpi.icon" :size="18" stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Users Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 items-start">
        <div v-for="user in currentUsers" :key="user.id" class="bg-[#0A0A0A] rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col group hover:shadow-md transition-all relative font-outfit text-left">
          <!-- Card Body -->
          <div class="p-4 sm:p-5 pb-0">
            <!-- User Header Row -->
            <div class="flex items-start gap-3 sm:gap-4 mb-1">
              <div class="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[15px] bg-[#82868a] flex items-center justify-center text-white flex-shrink-0">
                <UserIcon :size="28" stroke-width="2.5" />
              </div>
              <div class="flex flex-col flex-1 pt-0.5 min-w-0" style="line-height: 1.2">
                <h4 class="m-0 font-bold text-[white] text-[15px] sm:text-[17px] leading-tight truncate">{{ user.name }}</h4>
                <p class="m-0 text-[13px] sm:text-[15px] text-[white] font-medium mt-0.5 truncate">{{ user.idNumber }}</p>
                <span class="text-[13px] sm:text-[15px] text-gray-500 font-medium mt-0.5">Cliente</span>
              </div>
              <div class="relative">
                <button @click="toggleDropdown(user.id)" class="text-gray-500 hover:text-[#D7FF00] transition-colors p-1.5 rounded-full hover:bg-[#1A1A1A] flex items-center justify-center cursor-pointer">
                  <MoreVertical :size="20" />
                </button>
                
                <!-- Overlay for clicking outside dropdown -->
                <div v-if="activeDropdown === user.id" @click="activeDropdown = null" class="fixed inset-0 z-10"></div>

                <!-- Dropdown Action Menu -->
                <div v-if="activeDropdown === user.id" class="absolute right-0 top-full mt-1 w-[160px] sm:w-48 bg-[#0A0A0A] rounded-xl shadow-2xl border border-[#1A1A1A] py-2 z-20 font-outfit text-left">
                  <button @click="openViewModal(user)" class="w-full text-left px-3 sm:px-4 py-2 text-[14px] sm:text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <Eye :size="18" class="text-[#D7FF00]" />
                    <span class="font-medium">Visualizar</span>
                  </button>
                  <button @click="openEditModal(user)" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <Edit3 :size="18" class="text-[#D7FF00]" />
                    <span class="font-medium">Editar</span>
                  </button>
                  <button @click="openPasswordModal(user)" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <Lock :size="18" class="text-[#D7FF00]" />
                    <span class="font-medium">Senha</span>
                  </button>

                  <div class="my-1 border-b border-dashed border-[#1A1A1A]"></div>

                  <button @click="handleStatusChange(user, 'Ativo')" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <CheckCircle :size="18" class="text-[#D7FF00]" />
                    <span class="font-medium">Aprovar</span>
                  </button>
                  <button @click="handleStatusChange(user, 'Recusado')" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <CircleOff :size="18" class="text-[#f59e0b]" />
                    <span class="font-medium">Reprovar</span>
                  </button>
                  <button @click="handleStatusChange(user, 'Bloqueado')" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <UserX :size="18" class="text-[#ef4444]" />
                    <span class="font-medium">Banir</span>
                  </button>

                  <div class="my-1 border-b border-dashed border-[#1A1A1A]"></div>

                  <button @click="handleDelete(user)" class="w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-[#1A1A1A] flex items-center gap-3 cursor-pointer">
                    <Trash2 :size="18" class="text-[#D7FF00]" />
                    <span class="font-medium">Excluir</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sales Section -->
            <div class="mb-0 mt-2">
              <p class="text-[13px] sm:text-[15px] text-gray-500 mb-0.5 font-medium">Vendas últimos 7 dias</p>
              <h2 class="text-[20px] sm:text-[24px] font-black text-[white] tracking-tighter leading-none mb-1">{{ user.sales }}</h2>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px bg-[#1A1A1A] mx-0 mt-0 px-0"></div>

          <!-- Card Footer -->
          <div class="px-4 sm:px-5 pt-1.5 pb-5 grid grid-cols-2 min-[450px]:grid-cols-3 gap-2 text-left">
            <div class="flex flex-col gap-1.5 sm:gap-2">
              <span class="text-[12px] sm:text-[14px] font-bold text-[white]">Status</span>
              <span :class="getStatusBadgeClass(user.status)">{{ user.status }}</span>
            </div>
            <div class="flex flex-col gap-1.5 sm:gap-2">
              <span class="text-[12px] sm:text-[14px] font-bold text-[white]">Documento</span>
              <span :class="getDocBadgeClass(user.docStatus)">{{ user.docStatus }}</span>
            </div>
            <div class="flex flex-col gap-1.5 sm:gap-2 col-span-2 min-[450px]:col-span-1 border-t min-[450px]:border-t-0 pt-2 min-[450px]:pt-0 mt-1 min-[450px]:mt-0">
              <span class="text-[12px] sm:text-[14px] font-bold text-[white]">Criado em</span>
              <span class="text-[12px] sm:text-[13px] font-medium text-gray-700 pt-1 leading-tight">{{ user.createdAtFull || '14/10/2025 às 05:52' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredUsers.length > 9" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 px-4 py-8 border-t border-[#1A1A1A] text-center md:text-left">
        <span class="text-sm font-medium text-gray-500">Mostrando {{ currentUsers.length }} de {{ filteredUsers.length }} usuários</span>
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
      <div v-else-if="filteredUsers.length > 0" class="mt-6 px-4 py-8 border-t border-[#1A1A1A]">
        <span class="text-sm font-medium text-gray-500">Mostrando todos os {{ filteredUsers.length }} usuários filtrados</span>
      </div>
      <!-- Modals Teleported outside layout to overlay sidebar -->
      <Teleport to="body">
        <UserViewModal 
          :is-open="isViewModalOpen" 
          :user="selectedUser" 
          @close="isViewModalOpen = false" 
        />
        <UserEditModal 
          :is-open="isEditModalOpen" 
          :user="selectedUser" 
          @close="isEditModalOpen = false" 
          @save="handleSaveEdit"
        />
        <UserPasswordModal 
          :is-open="isPasswordModalOpen" 
          :user="selectedUser" 
          @close="isPasswordModalOpen = false" 
          @save="handleSavePassword"
        />
        
        <!-- Image Preview Modal -->
        <Transition name="img-modal">
          <div 
            v-if="imagePreviewUrl" 
            class="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            @click.self="imagePreviewUrl = null"
          >
            <div class="relative max-w-[90vw] max-h-[90vh]">
              <button 
                @click="imagePreviewUrl = null"
                class="absolute -top-4 -right-4 w-9 h-9 bg-[#0A0A0A] rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-xl z-10 cursor-pointer transition-all hover:scale-110"
              >
                <X :size="18" />
              </button>
              <img 
                :src="imagePreviewUrl" 
                class="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" 
                alt="Preview"
              />
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../components/AdminLayout.vue'
import { 
  Users as UsersIcon, Clock, Ban, Search, 
  MoreVertical, User as UserIcon,
  Eye, Edit3, Lock, CircleOff, UserX, Trash2, CheckCircle, Wallet
} from 'lucide-vue-next'

import UserViewModal from '../components/modals/UserViewModal.vue'
import UserEditModal from '../components/modals/UserEditModal.vue'
import UserPasswordModal from '../components/modals/UserPasswordModal.vue'
import { useToast } from '../composables/useToast'

export default {
  name: 'UsersView',
  components: {
    AdminLayout,
    Search,
    MoreVertical,
    UserIcon,
    Eye, Edit3, Lock, CircleOff, UserX, Trash2, CheckCircle,
    UserViewModal,
    UserEditModal,
    UserPasswordModal
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      searchQuery: '',
      filterStatus: 'Todos',
      activeDropdown: null,
      isViewModalOpen: false,
      isEditModalOpen: false,
      isPasswordModalOpen: false,
      selectedUser: null,
      currentPage: 1,
      users: [
        { id: 1, name: 'Filipe Rodrigo Conceição santos', idNumber: '037.404.955-61', email: 'filipe@exemplo.com', sales: 'R$ 0,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '14/10/2025 às 05:52' },
        { id: 2, name: 'Vennyr Heringer', idNumber: '822.483.289-90', email: 'vennyr@exemplo.com', sales: 'R$ 0,00', status: 'Bloqueado', docStatus: 'Análise', createdAtFull: '13/10/2025 às 08:13' },
        { id: 3, name: 'João Silva', idNumber: '123.456.789-00', email: 'joao@exemplo.com', sales: 'R$ 1.250,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '12/03/24 às 10:15' },
        { id: 4, name: 'Maria Oliveira', idNumber: '987.654.321-11', email: 'maria@exemplo.com', sales: 'R$ 0,00', status: 'Análise', docStatus: 'Análise', createdAtFull: '14/03/24 às 15:30' },
        { id: 5, name: 'Carlos Santos', idNumber: '456.789.123-22', email: 'carlos@exemplo.com', sales: 'R$ 45.900,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '10/03/24 às 09:12' },
        { id: 6, name: 'Ana Costa', idNumber: '321.654.987-33', email: 'ana@exemplo.com', sales: 'R$ 2.400,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '08/03/24 às 11:45' },
        { id: 7, name: 'Ricardo Lima', idNumber: '789.123.456-44', email: 'ricardo@exemplo.com', sales: 'R$ 0,00', status: 'Análise', docStatus: 'Análise', createdAtFull: '16/03/24 às 16:20' },
        { id: 8, name: 'Beatriz Souza', idNumber: '654.321.789-55', email: 'beatriz@exemplo.com', sales: 'R$ 8.900,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '05/03/24 às 12:00' },
        { id: 9, name: 'Fernando Dias', idNumber: '147.258.369-66', email: 'fernando@exemplo.com', sales: 'R$ 0,00', status: 'Bloqueado', docStatus: 'Recusado', createdAtFull: '01/03/24 às 08:13' },
        { id: 10, name: 'Roberto Alencar', idNumber: '111.222.333-44', email: 'roberto@exemplo.com', sales: 'R$ 500,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '20/02/24 às 11:30' },
        { id: 11, name: 'Juliana Paes', idNumber: '555.666.777-88', email: 'juliana@exemplo.com', sales: 'R$ 0,00', status: 'Análise', docStatus: 'Análise', createdAtFull: '22/02/24 às 14:45' },
        { id: 12, name: 'Marcos Vinicius', idNumber: '999.000.111-22', email: 'marcos@exemplo.com', sales: 'R$ 3.200,00', status: 'Ativo', docStatus: 'Verificado', createdAtFull: '18/02/24 às 09:00' }
      ]
    }
  },
  computed: {
    kpis() {
      return [
        { label: 'Cadastros totais', value: this.users.length.toString(), icon: UsersIcon },
        { label: 'Cadastros Mês', value: '3', icon: Wallet },
        { label: 'Cadastros Pendentes', value: this.users.filter(u => u.status === 'Análise').length.toString(), icon: Clock },
        { label: 'Usuários banidos', value: this.users.filter(u => u.status === 'Bloqueado').length.toString(), icon: Ban }
      ]
    },
    filteredUsers() {
      return this.users.filter(user => {
        const query = this.searchQuery.toLowerCase();
        const matchesSearch = user.name.toLowerCase().includes(query) || 
                              user.idNumber.includes(query);
        const matchesStatus = this.filterStatus === 'Todos' || user.status === this.filterStatus;
        return matchesSearch && matchesStatus;
      });
    },
    currentUsers() {
      const start = (this.currentPage - 1) * 9;
      const end = start + 9;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / 9);
    }
  },
  methods: {
    toggleDropdown(userId) {
      if (this.activeDropdown === userId) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = userId;
      }
    },
    openViewModal(user) {
      this.selectedUser = user;
      this.isViewModalOpen = true;
      this.activeDropdown = null;
    },
    openEditModal(user) {
      this.selectedUser = user;
      this.isEditModalOpen = true;
      this.activeDropdown = null;
    },
    openPasswordModal(user) {
      this.selectedUser = user;
      this.isPasswordModalOpen = true;
      this.activeDropdown = null;
    },
    handleSaveEdit(updatedUser) {
      if (!updatedUser || !updatedUser.id) return
      
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser }
      }
      
      if (this.selectedUser && this.selectedUser.id === updatedUser.id) {
        this.selectedUser = { ...this.selectedUser, ...updatedUser }
      }
      
      this.isEditModalOpen = false;
      this.showToast('Usuário salvo com sucesso!')
    },
    handleSavePassword() {
      this.isPasswordModalOpen = false
      this.showToast('Senha alterada com sucesso!')
    },
    handleStatusChange(user, newStatus) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users[index].status = newStatus
        this.showToast(`Status do usuário alterado para ${newStatus}`)
      }
      this.activeDropdown = null
    },
    handleDelete(user) {
      this.users = this.users.filter(u => u.id !== user.id)
      this.showToast('Usuário excluído com sucesso')
      this.activeDropdown = null
    },
    getStatusBadgeClass(status) {
      const base = 'px-2 py-0.5 rounded-[5px] text-[11px] font-black uppercase tracking-wider inline-block w-fit min-w-[55px] text-center border'
      if (status === 'Ativo') return `${base} bg-[#D7FF00]/10 text-[#D7FF00] border-[#D7FF00]/30`
      if (status === 'Análise') return `${base} bg-amber-400/10 text-amber-500 border-amber-500/30`
      if (status === 'Bloqueado') return `${base} bg-rose-400/10 text-rose-500 border-rose-500/30`
      if (status === 'Recusado') return `${base} bg-rose-400/10 text-rose-500 border-rose-500/30`
      return `${base} bg-[#1A1A1A] text-gray-500 border-[#1A1A1A]`
    },
    getDocBadgeClass(status) {
      const base = 'px-2 py-0.5 rounded-[5px] text-[11px] font-black uppercase tracking-wider inline-block w-fit min-w-[55px] text-center border'
      if (status === 'Verificado') return `${base} bg-[#D7FF00]/10 text-[#D7FF00] border-[#D7FF00]/30`
      if (status === 'Análise') return `${base} bg-amber-400/10 text-amber-500 border-amber-500/30`
      if (status === 'Recusado') return `${base} bg-rose-400/10 text-rose-500 border-rose-500/30`
      return `${base} bg-amber-400/10 text-amber-500 border-amber-500/30`
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

/* Image Preview Modal Animation */
.img-modal-enter-active { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.img-modal-leave-active { transition: opacity 0.2s ease; }
.img-modal-enter-from { opacity: 0; transform: scale(0.92); }
.img-modal-leave-to { opacity: 0; }
</style>
