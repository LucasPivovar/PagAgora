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
            <Clock :size="24" stroke-width="2" />
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Conta em Análise</h1>
          <p class="text-[13px] sm:text-[14px] leading-relaxed text-gray-400 font-medium mt-1">
            Seus documentos estão sendo analisados por nossa equipe. Você será notificado assim que o processo for concluído.
          </p>
        </div>

        <!-- Bottom: Actions -->
        <div class="flex justify-start pt-6 border-t border-dashed border-[#1A1A1A]">
          <router-link to="/login" class="inline-flex items-center gap-2 text-gray-500 font-bold text-[13px] hover:text-gray-400 transition-all">
            <ArrowLeft :size="16" />
            Voltar ao login
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Clock, ArrowLeft } from 'lucide-vue-next'

export default {
  name: 'AccountUnderAnalysisView',
  components: {
    Clock, ArrowLeft
  }
}
</script>

<style scoped>
@reference "tailwindcss";
</style>
