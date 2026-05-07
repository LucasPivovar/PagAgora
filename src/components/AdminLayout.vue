<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': isCollapsed, 'is-mobile': isMobile, 'sidebar-open': !isCollapsed && isMobile }">
    <div v-if="isMobile && !isCollapsed" class="sidebar-overlay" @click="toggleSidebar"></div>
    <AdminSidebar :is-collapsed="isCollapsed" @toggle-sidebar="toggleSidebar" />
    <AdminNavbar :is-collapsed="isCollapsed" :notification-count="notificationCount" @toggle-sidebar="toggleSidebar" @toggle-notifications="isNotificationsOpen = !isNotificationsOpen" />
    <NotificationDrawer :is-open="isNotificationsOpen" @close="isNotificationsOpen = false" @update:count="notificationCount = $event" />
    <div class="main-content">
      <main class="page-container">
        <slot></slot>
      </main>
    </div>

    <!-- Floating Chat Button -->
    <button class="fixed right-[25px] bottom-[25px] w-14 h-14 bg-[#D7FF00] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[9999] border-4 border-black/20">
       <MessageSquare :size="24" stroke-width="2.5" />
    </button>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue'
import AdminNavbar from './AdminNavbar.vue'
import NotificationDrawer from './NotificationDrawer.vue'
import { MessageSquare } from 'lucide-vue-next'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar,
    AdminNavbar,
    NotificationDrawer,
    MessageSquare
  },
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
      isNotificationsOpen: false,
      notificationCount: 0
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 1024
      if (this.isMobile) {
        this.isCollapsed = true
      }
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style scoped>
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

.admin-layout {
  display: flex;
  min-height: 100vh;
  transition: all 0.3s ease;
  overflow-x: hidden;
  width: 100vw;
  max-width: 100%;
  background-color: #000000 !important;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  margin-top: 80px; /* Offset for fixed navbar */
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  max-width: 100%;
}

/* Allow main content to take full width when sidebar is collapsed */
@media (min-width: 1024px) {
  .sidebar-collapsed .main-content {
    margin-left: 0;
  }
}

.is-mobile .main-content {
  margin-left: 0 !important;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 90;
}

.page-container {
  padding: 2rem 1rem;
  flex: 1;
  background-color: #000000 !important;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 640px) {
  .page-container {
    padding: 1.5rem 0.5rem;
  }
}
</style>
