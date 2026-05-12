<template>
  <div class="min-h-screen flex items-center justify-center bg-black font-outfit px-4 py-12">
    <div class="max-w-[480px] w-full">
      <!-- Card -->
      <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#1A1A1A] p-8 sm:p-10 transition-all hover:shadow-md">
        <!-- Top: Logo Centered -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagAgora" class="h-10 sm:h-12 w-auto object-contain" />
        </div>

        <div class="mb-6 sm:mb-8 text-center">
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">Crie sua conta</h1>
          <p class="text-[13px] sm:text-[14px] leading-relaxed text-gray-400 font-medium">Comece a gerenciar suas vendas hoje mesmo</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Field -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-bold text-white ml-1">Nome completo</label>
            <div class="relative">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" :size="20" />
              <input 
                id="name"
                v-model="name"
                type="text" 
                placeholder="Seu nome" 
                class="w-full pl-12 pr-4 py-3.5 bg-[#121212] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] focus:bg-[#1A1A1A] transition-all shadow-sm placeholder:text-gray-600 text-white"
                required
              >
            </div>
          </div>

          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-bold text-white ml-1">E-mail</label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" :size="20" />
              <input 
                id="email"
                v-model="email"
                type="email" 
                placeholder="seu@email.com" 
                class="w-full pl-12 pr-4 py-3.5 bg-[#121212] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] focus:bg-[#1A1A1A] transition-all shadow-sm placeholder:text-gray-600 text-white"
                required
              >
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-bold text-white ml-1">Senha</label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" :size="20" />
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="w-full pl-12 pr-12 py-3.5 bg-[#121212] border border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#D7FF00] focus:bg-[#1A1A1A] transition-all shadow-sm placeholder:text-gray-600 text-white"
                required
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
          </div>

          <!-- Register Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-[#D7FF00] text-black py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-lime-900/10 hover:bg-[#E5FF4D] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
            {{ isLoading ? 'Criando conta...' : 'Criar minha conta' }}
          </button>

          <p class="text-center text-sm text-gray-500 font-medium pt-2">
            Já tem uma conta? 
            <router-link to="/login" class="text-[#D7FF00] font-bold hover:underline">Fazer login</router-link>
          </p>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { Mail, Lock, Eye, EyeOff, Loader2, User } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

export default {
  name: 'RegisterView',
  components: {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    User
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    handleRegister() {
      this.isLoading = true
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false
        this.showToast('Conta criada com sucesso!', 'success')
        this.$router.push('/login')
      }, 1500)
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

input:focus {
  @apply ring-4 ring-[#D7FF00]/10;
}
</style>
