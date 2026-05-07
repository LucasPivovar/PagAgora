import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Dashboard admin' }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: { title: 'Usuários' }
  },
  {
    path: '/withdrawals',
    name: 'Withdrawals',
    component: () => import('../views/WithdrawalsView.vue'),
    meta: { title: 'Aprovar saques' }
  },
  {
    path: '/financial/transactions/income',
    name: 'TransactionsIncome',
    component: () => import('../views/TransactionsIncomeView.vue'),
    meta: { title: 'Transações - Entradas' }
  },
  {
    path: '/financial/transactions/outcome',
    name: 'TransactionsOutcome',
    component: () => import('../views/TransactionsOutcomeView.vue'),
    meta: { title: 'Transações - Saídas' }
  },
  {
    path: '/financial/wallets',
    name: 'Wallets',
    component: () => import('../views/submenu/Wallets.vue'),
    meta: { title: 'Carteiras' }
  },
  {
    path: '/settings/general',
    name: 'SettingsGeneral',
    component: () => import('../views/settings/SettingsGeneralView.vue'),
    meta: { title: 'Configurações Gerais' }
  },
  {
    path: '/settings/levels',
    name: 'SettingsLevels',
    component: () => import('../views/settings/SettingsLevelsView.vue'),
    meta: { title: 'Configurações de Níveis' }
  },
  {
    path: '/settings/acquirer',
    name: 'SettingsAcquirer',
    component: () => import('../views/settings/SettingsAcquirerView.vue'),
    meta: { title: 'Configurações do Adquirente' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Cadastro' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: { title: 'Esqueci a Senha' }
  },
  {
    path: '/2fa',
    name: 'TwoFactor',
    component: () => import('../views/TwoFactorView.vue'),
    meta: { title: '2FA' }
  },
  // User Routes
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: () => import('../views/user/Overview.vue'),
    meta: { title: 'Dashboard' }
  },
  {
    path: '/financial/income',
    name: 'UserIncome',
    component: () => import('../views/user/Income.vue'),
    meta: { title: 'Entradas' }
  },
  {
    path: '/financial/outcome',
    name: 'UserOutcome',
    component: () => import('../views/user/Outcome.vue'),
    meta: { title: 'Saídas' }
  },
  {
    path: '/wallet',
    name: 'UserWallet',
    component: () => import('../views/user/Wallet.vue'),
    meta: { title: 'Carteira' }
  },
  {
    path: '/products',
    name: 'UserProducts',
    component: () => import('../views/user/Products.vue'),
    meta: { title: 'Meus Produtos' }
  },
  {
    path: '/webhook',
    name: 'UserWebhook',
    component: () => import('../views/user/Webhook.vue'),
    meta: { title: 'Webhook' }
  },
  {
    path: '/account',
    name: 'UserAccount',
    component: () => import('../views/user/Account.vue'),
    meta: { title: 'Minha Conta' }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `PagAgora - ${to.meta.title}`
  next()
})

export default router
