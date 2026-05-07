<template>
  <div class="min-h-screen flex items-center justify-center bg-black font-outfit px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="bg-[#0A0A0A] rounded-[20px] sm:rounded-[24px] shadow-sm border border-[#1A1A1A] p-6 sm:p-10 transition-all hover:shadow-md">
        <!-- Logo Inside Card -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagAgora" class="h-10 sm:h-12 w-auto object-contain" />
        </div>

        <div class="mb-6 sm:mb-8 text-center">
          <h1 class="text-xl sm:text-2xl font-black text-white mb-1.5 sm:mb-2">Autenticação de Dois Fatores</h1>
          <p class="text-[13px] sm:text-[15px] leading-relaxed text-gray-500 font-medium">
            Digite o código de 6 dígitos gerado pelo seu <br class="hidden sm:block"/>
            aplicativo autenticador ou enviado por e-mail.
          </p>
        </div>

        <form @submit.prevent="handleVerify" class="space-y-6">
          <!-- Code Fields -->
          <div class="space-y-3 mb-8">
            <label class="block text-sm font-bold text-white text-center">Código de Verificação</label>
            <div class="flex justify-center gap-2 sm:gap-3">
              <input 
                v-for="(digit, index) in code" 
                :key="index"
                ref="codeInputs"
                v-model="code[index]"
                type="text" 
                maxlength="1"
                class="w-11 h-12 sm:w-12 sm:h-14 text-center font-outfit text-xl sm:text-2xl font-bold bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] focus:ring-2 focus:ring-[#D7FF00]/10 transition-all shadow-sm text-white"
                @input="handleInput($event, index)"
                @keydown.delete="handleDelete($event, index)"
                @paste="handlePaste"
              >
            </div>
          </div>

          <!-- Verify Button -->
          <button 
            type="submit" 
            :disabled="isLoading || fullCode.length < 6"
            class="w-full bg-[#D7FF00] text-black py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-green-900/10 hover:bg-[#E5FF4D] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
            <span v-else>Verificar Código</span>
          </button>
        </form>

        <div class="mt-6 sm:mt-8 text-center pt-5 sm:pt-6 border-t border-dashed border-[#1A1A1A]">
          <p class="text-[13px] sm:text-sm text-gray-500 font-medium mb-4">
            Não conseguiu o código? 
            <button class="text-[#D7FF00] font-bold hover:underline cursor-pointer">Reenviar</button>
          </p>
          <router-link to="/login" class="inline-flex items-center gap-2 text-gray-500 font-bold text-[13px] hover:text-gray-600 hover:gap-3 transition-all">
            <ArrowLeft :size="16" />
            Voltar para o login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader2, ArrowLeft } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

export default {
  name: 'TwoFactorView',
  components: {
    Loader2,
    ArrowLeft
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      code: ['', '', '', '', '', ''],
      isLoading: false
    }
  },
  computed: {
    fullCode() {
      return this.code.join('');
    }
  },
  methods: {
    handleInput(event, index) {
      const val = event.target.value;
      // Allow only numbers
      if (!/^\d$/.test(val)) {
        this.code[index] = '';
        return;
      }
      this.code[index] = val;
      
      // Auto-focus next input
      if (index < 5 && val !== '') {
        this.$nextTick(() => {
          this.$refs.codeInputs[index + 1].focus();
        });
      }
    },
    handleDelete(event, index) {
      if (this.code[index] === '' && index > 0) {
        // If current is empty and backspace is pressed, go to previous
        this.$refs.codeInputs[index - 1].focus();
        this.code[index - 1] = '';
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (pasteData) {
        for (let i = 0; i < pasteData.length; i++) {
          this.code[i] = pasteData[i];
        }
        // Focus the appropriate input
        const focusIndex = Math.min(pasteData.length, 5);
        if(focusIndex < 6) {
          this.$refs.codeInputs[focusIndex].focus();
        } else {
          this.$refs.codeInputs[5].focus();
        }
      }
    },
    handleVerify() {
      if (this.fullCode.length !== 6) return
      
      this.isLoading = true
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false
        this.showToast('Login realizado com sucesso!', 'success')
        
        // Redirect to dashboard
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
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
