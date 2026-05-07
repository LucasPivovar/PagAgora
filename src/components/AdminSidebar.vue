<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <nav class="sidebar-nav py-4 font-outfit flex-1 overflow-y-auto overflow-x-hidden bg-[#0A0A0A] border-r border-dashed border-[#1A1A1A] transition-all duration-300 flex flex-col">
      <!-- Goal Progress Section -->
      <div v-show="!isCollapsed" class="px-7 mb-8 transition-all duration-300">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Meta Mensal</span>
          <span class="text-[10px] font-black text-[#D7FF00]">0%</span>
        </div>
        <div class="w-full bg-[#1A1A1A] h-2.5 rounded-full overflow-hidden mb-2">
          <div class="bg-[#D7FF00] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(215,255,0,0.3)]" style="width: 5%"></div>
        </div>
        <div class="text-[11px] font-bold text-gray-500">
          R$ 0,00 <span class="text-gray-600 mx-1">/</span> <span class="text-white">R$ 10.000,00</span>
        </div>
      </div>

      <div class="px-3 flex flex-col gap-8">
        <!-- New Principal Section for Users -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] text-left block mb-2">USUÁRIO</span>
          
          <router-link to="/dashboard" class="nav-item group">
            <LayoutDashboard :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Visão Geral</span>
          </router-link>

          <!-- Extratos Submenu -->
          <div class="flex flex-col gap-1">
            <button @click="isExtratosOpen = !isExtratosOpen" class="nav-item group w-full justify-between" :class="{ 'router-link-active': $route.path.includes('/financial/') && !$route.path.includes('/financial/wallets') }">
              <div class="flex items-center gap-4">
                <FileText :size="20" class="flex-shrink-0" />
                <span v-if="!isCollapsed" class="font-bold text-[14px]">Extratos</span>
              </div>
              <ChevronDown v-if="!isCollapsed" :size="16" class="transition-transform duration-200" :class="{ 'rotate-180': isExtratosOpen }" />
            </button>
            
            <div v-show="isExtratosOpen && !isCollapsed" class="flex flex-col gap-1 ml-4 mt-1 border-l border-dashed border-[#1A1A1A] pl-2">
              <router-link to="/financial/income" class="nav-item group py-2">
                <ArrowDownCircle :size="18" class="flex-shrink-0" />
                <span class="font-bold text-[13px]">Entrada</span>
              </router-link>
              <router-link to="/financial/outcome" class="nav-item group py-2">
                <ArrowUpCircle :size="18" class="flex-shrink-0" />
                <span class="font-bold text-[13px]">Saída</span>
              </router-link>
            </div>
          </div>

          <router-link to="/wallet" class="nav-item group">
            <Wallet :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Carteira</span>
          </router-link>

          <router-link to="/products" class="nav-item group">
            <Package :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Meus Produtos</span>
          </router-link>

          <router-link to="/webhook" class="nav-item group">
            <Webhook :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Webhook</span>
          </router-link>

          <router-link to="/account" class="nav-item group">
            <User :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Minha Conta</span>
          </router-link>
        </div>

        <!-- Dashboard & Core Management -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] text-left block mb-2">ADMINISTRAÇÃO</span>
          <router-link to="/" class="nav-item group">
            <LayoutDashboard :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Dashboard</span>
          </router-link>
          
          <router-link to="/users" class="nav-item group">
            <Users :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Usuários</span>
          </router-link>

          <router-link to="/withdrawals" class="nav-item group">
            <CheckCircle2 :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Saques</span>
          </router-link>

          <!-- Carteiras (Moved here directly) -->
          <router-link to="/financial/wallets" class="nav-item group">
            <Wallet :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Carteiras</span>
          </router-link>

          <!-- Transactions Items (Flat instead of dropdown) -->
          <router-link to="/financial/transactions/income" class="nav-item group">
             <ArrowDownCircle :size="20" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-bold text-[14px]">Entradas</span>
          </router-link>
          <router-link to="/financial/transactions/outcome" class="nav-item group">
             <ArrowUpCircle :size="20" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-bold text-[14px]">Saídas</span>
          </router-link>
        </div>

        <!-- Section: Configurações -->
        <div class="flex flex-col gap-1">
          <span v-if="!isCollapsed" class="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] text-left block mb-2 font-outfit">CONFIGURAÇÕES</span>
          <router-link to="/settings/general" class="nav-item group">
             <Sliders :size="18" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-bold text-[14px]">Gerais</span>
          </router-link>
          <router-link to="/settings/levels" class="nav-item group">
             <ShieldCheck :size="18" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-bold text-[14px]">Níveis</span>
          </router-link>
          <router-link to="/settings/acquirer" class="nav-item group">
             <Zap :size="18" class="flex-shrink-0" />
             <span v-if="!isCollapsed" class="font-bold text-[14px]">Adquirente</span>
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
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Sliders, ShieldCheck, Zap,
  FileText, ChevronDown, Package, Webhook, User
} from 'lucide-vue-next'

export default {
  name: 'AdminSidebar',
  emits: ['toggle-sidebar'],
  components: {
    LayoutDashboard, Users, CheckCircle2, 
    Wallet, ArrowDownCircle, ArrowUpCircle,
    Sliders, ShieldCheck, Zap,
    FileText, ChevronDown, Package, Webhook, User
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExtratosOpen: false
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
