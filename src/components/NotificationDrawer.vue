<template>
  <Teleport to="body">
    <div 
      class="notification-drawer-wrapper"
      :class="{ 'is-open': isOpen }"
      style="pointer-events: none;"
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[190] overlay-fade"
        @click="$emit('close')"
      ></div>

      <!-- Drawer Panel -->
      <aside class="fixed right-0 top-0 h-full w-[350px] bg-[#0A0A0A] shadow-2xl z-[200] flex flex-col font-outfit panel-slide">
        <!-- Header -->
        <div class="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#1A1A1A]/50">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-[#D7FF00]/10 rounded-lg text-[#D7FF00]">
              <Bell :size="20" />
            </div>
            <h2 class="text-lg font-bold text-white">Notificações</h2>
            <span v-if="notifications.length > 0" class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              +{{ notifications.length }}
            </span>
          </div>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-[#0A0A0A] rounded-full text-gray-500 hover:text-gray-600 transition-all cursor-pointer shadow-sm border border-transparent hover:border-[#1A1A1A]"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <TransitionGroup name="notif-item" tag="div" class="flex flex-col gap-3">
            <div 
              v-for="notif in notifications" 
              :key="notif.id" 
              class="p-4 rounded-xl border border-[#1A1A1A] hover:border-[#D7FF00]/30 hover:bg-[#1A1A1A]/50 transition-all cursor-pointer group"
            >
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                     :class="notif.colorClass">
                  <Info :size="18" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-1">
                    <span class="text-sm font-bold text-white">{{ notif.title }}</span>
                    <span class="text-[10px] text-gray-500 font-bold uppercase mt-0.5">{{ notif.time }}</span>
                  </div>
                  <p class="text-[12px] text-gray-500 leading-relaxed">{{ notif.message }}</p>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Empty State -->
          <div v-if="notifications.length === 0" class="h-48 flex flex-col items-center justify-center opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/></svg>
            <p class="text-sm font-bold text-gray-500">Nenhuma notificação</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-[#1A1A1A] bg-[#1A1A1A]/30">
          <button 
            @click="clearAll" 
            :disabled="notifications.length === 0"
            class="w-full py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white rounded-xl text-xs font-bold hover:bg-[#1A1A1A] transition-colors uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Limpar Tudo
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script>
import { Bell, X, Info } from 'lucide-vue-next'

export default {
  name: 'NotificationDrawer',
  components: { Bell, X, Info },
  emits: ['close', 'update:count'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      notifications: [
        { id: 1, title: 'Novo Saque', message: 'Um novo pedido de saque de R$ 1.500,00 foi solicitado por Leandro Caetano.', time: '2m atrás', colorClass: 'bg-[#D7FF00]/10 text-[#D7FF00]' },
        { id: 2, title: 'Usuário em Análise', message: 'Maria Oliveira enviou documentos para revisão.', time: '15m atrás', colorClass: 'bg-orange-500/10 text-orange-500' },
        { id: 3, title: 'Transação Aprovada', message: 'A transação de R$ 250,00 foi aprovada com sucesso.', time: '1h atrás', colorClass: 'bg-[#D7FF00]/10 text-[#D7FF00]' }
      ]
    }
  },
  computed: {
    notificationCount() {
      return this.notifications.length
    }
  },
  watch: {
    isOpen(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : ''
    },
    notificationCount(val) {
      this.$emit('update:count', val)
    }
  },
  mounted() {
    this.$emit('update:count', this.notificationCount)
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    clearAll() {
      const delay = 120
      const toRemove = [...this.notifications].map(n => n.id)
      toRemove.forEach((id, index) => {
        setTimeout(() => {
          const idx = this.notifications.findIndex(n => n.id === id)
          if (idx !== -1) this.notifications.splice(idx, 1)
        }, index * delay)
      })
    }
  }
}
</script>

<style scoped>
/* Wrapper controls visibility */
.notification-drawer-wrapper .overlay-fade,
.notification-drawer-wrapper .panel-slide {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.notification-drawer-wrapper .panel-slide {
  transform: translateX(100%);
}

.notification-drawer-wrapper.is-open {
  pointer-events: auto;
}
.notification-drawer-wrapper.is-open .overlay-fade,
.notification-drawer-wrapper.is-open .panel-slide {
  opacity: 1;
  pointer-events: auto;
}
.notification-drawer-wrapper.is-open .panel-slide {
  transform: translateX(0);
}

/* TransitionGroup for individual notification items */
.notif-item-enter-active { transition: all 0.3s ease; }
.notif-item-leave-active { transition: all 0.2s ease; }
.notif-item-enter-from { opacity: 0; transform: translateX(20px); }
.notif-item-leave-to { opacity: 0; transform: translateX(-20px); height: 0; margin: 0; padding: 0; }
</style>
