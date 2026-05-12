<template>
  <div class="min-h-screen flex items-center justify-center bg-black font-outfit px-4 py-12">
    <div class="max-w-[480px] w-full">
      <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#1A1A1A] p-8 sm:p-10 transition-all hover:shadow-md">
        
        <!-- Top: Logo Centered -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagAgora" class="h-10 sm:h-12 w-auto object-contain" />
        </div>

        <div class="flex flex-col items-center gap-3 mb-6 sm:mb-8 text-center">
          <div class="w-12 h-12 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00]">
            <Smartphone :size="24" stroke-width="2" />
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Confirme seu Telefone</h1>
          <p class="text-[13px] sm:text-[14px] leading-relaxed text-gray-400 font-medium mt-1">
            Digite o código de 6 dígitos enviado por SMS para o seu número de telefone.
          </p>
        </div>
        
        <div class="space-y-3 mb-8">
            <div class="flex justify-between gap-2 sm:gap-3">
              <input 
                v-for="(digit, index) in code" 
                :key="index"
                v-model="code[index]"
                type="text" 
                maxlength="1"
                class="w-full aspect-square text-center font-outfit text-xl sm:text-2xl font-bold bg-[#1A1A1A]/50 border border-[#1A1A1A] rounded-xl focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] focus:ring-2 focus:ring-[#D7FF00]/10 transition-all shadow-sm text-white"
              >
            </div>
        </div>

        <button class="w-full bg-[#D7FF00] text-black py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-green-900/10 hover:bg-[#E5FF4D] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mb-6">
           Confirmar Código
        </button>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-dashed border-[#1A1A1A]">
          <button class="text-[#D7FF00] font-bold text-[13px] hover:underline cursor-pointer order-1 sm:order-2">
            Reenviar SMS
          </button>
          <router-link to="/login" class="inline-flex items-center gap-2 text-gray-500 font-bold text-[13px] hover:text-gray-400 transition-all order-2 sm:order-1">
            <ArrowLeft :size="16" />
            Voltar ao login
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Smartphone, ArrowLeft } from 'lucide-vue-next'

export default {
  name: 'PhoneConfirmationView',
  components: {
    Smartphone, ArrowLeft
  },
  data() {
    return {
      code: ['', '', '', '', '', '']
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
