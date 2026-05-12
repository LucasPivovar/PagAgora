<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <nav class="sidebar-nav py-4 font-outfit flex-1 overflow-y-auto overflow-x-hidden bg-[#0A0A0A] border-r border-dashed border-[#1A1A1A] transition-all duration-300 flex flex-col">
      <!-- Goal Progress Section -->
      <div v-show="!isCollapsed" class="px-7 mb-6 mt-2 transition-all duration-300">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">Meta Mensal</span>
          <span class="text-[10px] font-semibold text-[#D7FF00]">0%</span>
        </div>
        <div class="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden mb-2 border border-[#222]">
          <div class="bg-[#D7FF00] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(215,255,0,0.3)]" style="width: 5%"></div>
        </div>
        <div class="text-[10px] font-medium text-gray-500 flex justify-between">
          <span>R$ 0,00</span>
          <span class="text-white">R$ 10.000,00</span>
        </div>
      </div>

      <div class="px-3 flex flex-col gap-8">
        <!-- New Principal Section for Users -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.25em] text-left block mb-2">USUÁRIO</span>
          
          <router-link to="/dashboard" class="nav-item group">
            <LayoutDashboard :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Visão Geral</span>
          </router-link>

          <!-- Transações Submenu (User) -->
          <div class="flex flex-col gap-1">
            <button @click="isExtratosOpen = !isExtratosOpen" class="nav-item group w-full justify-between" :class="{ 'router-link-active': $route.path.includes('/financial/') && !$route.path.includes('/financial/wallets') && !$route.path.includes('/financial/transactions') }">
              <div class="flex items-center gap-4">
                <ArrowLeftRight :size="20" class="flex-shrink-0" />
                <span v-if="!isCollapsed" class="font-bold text-[14px]">Transações</span>
              </div>
              <ChevronDown v-if="!isCollapsed" :size="16" class="transition-transform duration-200" :class="{ 'rotate-180': isExtratosOpen }" />
            </button>
            
            <div v-show="isExtratosOpen && !isCollapsed" class="flex flex-col gap-1 ml-4 mt-1 border-l border-dashed border-[#1A1A1A] pl-2">
              <router-link to="/financial/income" class="nav-item group py-2">
                <ArrowDownCircle :size="17" class="flex-shrink-0" />
                <span class="font-medium text-[12px]">Entrada</span>
              </router-link>
              <router-link to="/financial/outcome" class="nav-item group py-2">
                <ArrowUpCircle :size="17" class="flex-shrink-0" />
                <span class="font-medium text-[12px]">Saída</span>
              </router-link>
            </div>
          </div>

          <router-link to="/wallet" class="nav-item group">
            <Wallet :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Carteira</span>
          </router-link>

          <router-link to="/products" class="nav-item group">
            <Package :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Links de Pagamentos</span>
          </router-link>

          <router-link to="/webhook" class="nav-item group">
            <Webhook :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Webhook</span>
          </router-link>

          <router-link to="/account" class="nav-item group">
            <User :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Minha Conta</span>
          </router-link>
        </div>

        <!-- Dashboard & Core Management -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.25em] text-left block mb-2">ADMINISTRAÇÃO</span>
          <router-link to="/" class="nav-item group">
            <LayoutDashboard :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Dashboard</span>
          </router-link>
          
          <router-link to="/users" class="nav-item group">
            <Users :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Usuários</span>
          </router-link>

          <router-link to="/withdrawals" class="nav-item group">
            <CheckCircle2 :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Saques</span>
          </router-link>

          <!-- Carteiras (Moved here directly) -->
          <router-link to="/financial/wallets" class="nav-item group">
            <Wallet :size="19" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-[13px]">Carteiras</span>
          </router-link>

          <!-- Transactions Submenu (Admin) -->
          <div class="flex flex-col gap-1">
            <button @click="isTransacoesAdminOpen = !isTransacoesAdminOpen" class="nav-item group w-full justify-between" :class="{ 'router-link-active': $route.path.includes('/financial/transactions') }">
              <div class="flex items-center gap-4">
                <ArrowLeftRight :size="19" class="flex-shrink-0" />
                <span v-if="!isCollapsed" class="font-medium text-[13px]">Transações</span>
              </div>
              <ChevronDown v-if="!isCollapsed" :size="15" class="transition-transform duration-200" :class="{ 'rotate-180': isTransacoesAdminOpen }" />
            </button>
            
            <div v-show="isTransacoesAdminOpen && !isCollapsed" class="flex flex-col gap-1 ml-4 mt-1 border-l border-dashed border-[#1A1A1A] pl-2">
              <router-link to="/financial/transactions/income" class="nav-item group py-2">
                 <ArrowDownCircle :size="17" class="flex-shrink-0" />
                 <span class="font-medium text-[12px]">Entradas</span>
              </router-link>
              <router-link to="/financial/transactions/outcome" class="nav-item group py-2">
                 <ArrowUpCircle :size="17" class="flex-shrink-0" />
                 <span class="font-medium text-[12px]">Saídas</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Section: Configurações -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.25em] text-left block mb-2 font-outfit">CONFIGURAÇÕES</span>
          <router-link to="/settings/general" class="nav-item group">
             <Sliders :size="17" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-medium text-[13px]">Gerais</span>
          </router-link>
          <router-link to="/settings/levels" class="nav-item group">
             <ShieldCheck :size="17" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-medium text-[13px]">Níveis</span>
          </router-link>
          <router-link to="/settings/acquirer" class="nav-item group">
             <Zap :size="17" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-medium text-[13px]">Adquirente</span>
          </router-link>
        </div>
      </div>

      <!-- Profile Section at Bottom - Mobile only -->
      <div class="lg:hidden mt-auto px-3 py-6 border-t border-[#1A1A1A] bg-[#1A1A1A]/50">
        <div class="flex items-center p-2 rounded-2xl transition-all duration-200" :class="isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'">
          <div class="w-10 h-10 rounded-full bg-[#D7FF00] flex items-center justify-center text-black font-black text-xs shadow-lg shadow-lime-900/20 flex-shrink-0 border-2 border-black/20">
            AD
          </div>
          <div v-if="!isCollapsed" class="flex flex-col text-left overflow-hidden">
            <span class="text-[14px] font-black text-white whitespace-nowrap">Administrador</span>
            <span class="text-[11px] text-gray-400 font-bold whitespace-nowrap uppercase tracking-wider">Super Admin</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
import { 
  LayoutDashboard, Users, CheckCircle2, 
  Wallet, ArrowLeftRight,
  ArrowDownCircle,
  ArrowUpCircle,
  ShieldCheck, Zap, Sliders,
  ChevronDown, Package, Webhook, User
} from 'lucide-vue-next'

export default {
  name: 'AdminSidebar',
  emits: ['toggle-sidebar'],
  components: {
    LayoutDashboard, Users, CheckCircle2, 
    Wallet, ArrowDownCircle, ArrowUpCircle,
    ShieldCheck, Zap, ArrowLeftRight, Sliders,
    ChevronDown, Package, Webhook, User
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExtratosOpen: false,
      isTransacoesAdminOpen: false
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.sidebar {
  width: 250px;
  height: calc(100vh - 80px); /* Adjust for navbar height */
  position: fixed;
  left: 0;
  top: 80px; /* Below navbar */
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.collapsed {
  width: 0;
  border-right: none;
}

@media (min-width: 1024px) {
  .collapsed {
    width: 0;
  }
}

@media (max-width: 1023px) {
  .sidebar {
    height: 100vh;
    top: 0;
    transform: translateX(-100%);
    width: 250px;
  }
  .sidebar-open.is-mobile .sidebar {
    transform: translateX(0);
  }
}

.nav-item {
  @apply flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer mx-1 no-underline;
}

.router-link-active {
  @apply bg-[#1A1A1A] text-[#D7FF00] shadow-sm;
}

.router-link-active span {
  @apply text-[#D7FF00];
}

/* Custom transitions for icons in collapsed mode */
.sidebar.collapsed .nav-item {
  @apply px-0 mx-1;
}

/* Custom scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}
.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-nav::-webkit-scrollbar-thumb {
  background: #D7FF00;
  border-radius: 10px;
}
</style>
