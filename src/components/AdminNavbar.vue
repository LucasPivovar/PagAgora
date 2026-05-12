<template>
  <header class="navbar h-[80px] bg-[#0A0A0A] border-b border-[#1A1A1A] flex justify-between items-center fixed top-0 w-full z-50 px-0">
    <div class="navbar-left flex items-center h-full">
      <!-- Logo Container - Fixed width for alignment -->
      <div class="hidden lg:flex items-center justify-center w-[250px] h-full border-r border-dashed border-[#1A1A1A] relative transition-all duration-300"
           :class="{ 'border-none': isCollapsed }">
        <img src="../assets/logo.png" alt="PagAgora" class="h-10 w-auto object-contain transition-all duration-300" />
        
        <!-- Desktop Toggle Button - Positioned on the border -->
        <button @click="$emit('toggle-sidebar')" 
                class="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#0A0A0A] border border-dashed border-gray-700 rounded-full items-center justify-center text-gray-500 hover:text-[#D7FF00] hover:border-[#D7FF00] hover:border-solid shadow-sm transition-all cursor-pointer z-[60]">
          <ChevronLeft v-if="!isCollapsed" :size="16" />
          <ChevronRight v-else :size="16" />
        </button>
      </div>

      <!-- Mobile Logo (Always visible on Left) -->
      <div class="lg:hidden pl-8">
        <img src="../assets/logo.png" alt="Logo" class="h-7 w-auto" />
      </div>
    </div>

    <!-- Meta Mensal Header (Desktop Only) -->
    <div class="hidden lg:flex flex-col flex-1 px-8 items-start">
      <div class="w-full max-w-[200px] mt-1">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Meta Mensal</span>
          <span class="text-[10px] font-black text-[#D7FF00]">5%</span>
        </div>
        <div class="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden mb-1.5 border border-[#222]">
          <div class="bg-[#D7FF00] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(215,255,0,0.3)]" style="width: 5%"></div>
        </div>
        <div class="text-[10px] font-bold text-gray-500 flex justify-between">
          <span>R$ 0,00</span>
          <span class="text-white">R$ 10.000,00</span>
        </div>
      </div>
    </div>

    <div class="navbar-right flex items-center gap-2 pr-4 sm:pr-8">
      <!-- Notification Button -->
      <button 
        @click="$emit('toggle-notifications')"
        class="p-2 rounded-full hover:bg-gray-900 text-gray-500 transition-colors relative group cursor-pointer"
      >
        <Bell :size="22" />
        <!-- Badge with count -->
        <span 
          v-if="notificationCount > 0"
          class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#D7FF00] text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-[#0A0A0A]"
        >
          {{ notificationCount }}
        </span>
      </button>

      <!-- Dropdown Overlay for click-outside relative to fixed navbar -->
      <div v-if="showDropdown" @click="showDropdown = false" class="fixed inset-0 z-40"></div>

      <!-- Desktop Admin Avatar (with dropdown) -->
      <div class="hidden lg:flex items-center pl-2 border-l border-[#1A1A1A] ml-1 relative">
        <div 
          @click="showDropdown = !showDropdown"
          class="w-9 h-9 rounded-full bg-[#D7FF00] flex items-center justify-center text-black font-bold text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity select-none z-50">
          AD
        </div>
        
        <!-- Dropdown Menu -->
        <div 
          v-show="showDropdown"
          class="absolute right-0 top-12 w-36 bg-[#0A0A0A] rounded-xl shadow-lg border border-[#1A1A1A] py-1.5 z-50">
          <button 
            @click="logout"
            class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 text-sm transition-colors cursor-pointer">
            <LogOut :size="16" />
            Sair
          </button>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="$emit('toggle-sidebar')" 
        class="lg:hidden p-2 rounded-lg hover:bg-gray-900 text-gray-500 transition-colors cursor-pointer"
      >
        <Menu :size="24" />
      </button>
    </div>
  </header>
</template>

<script>
import { Menu, ChevronLeft, ChevronRight, Bell, LogOut } from 'lucide-vue-next'

export default {
  name: 'AdminNavbar',
  emits: ['toggle-sidebar', 'toggle-notifications'],
  components: {
    Menu,
    ChevronLeft,
    ChevronRight,
    Bell,
    LogOut
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    notificationCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    logout() {
      this.showDropdown = false
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";
</style>
