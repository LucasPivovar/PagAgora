<template>
  <div class="min-h-screen flex items-center justify-center bg-black font-outfit px-4 py-12">
    <div class="max-w-[640px] w-full">
      <div class="bg-[#0A0A0A] rounded-[24px] shadow-sm border border-[#1A1A1A] p-8 sm:p-10 transition-all hover:shadow-md">
        
        <!-- Top: Logo Centered -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagAgora" class="h-10 sm:h-12 w-auto object-contain" />
        </div>

        <div class="flex flex-col items-center gap-3 mb-6 sm:mb-8 text-center">
          <div class="w-12 h-12 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00]">
            <FileCheck :size="24" stroke-width="2" />
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Processo KYC</h1>
          <p class="text-[13px] sm:text-[14px] leading-relaxed text-gray-400 font-medium mt-1">
            Para garantir a segurança da plataforma, precisamos validar sua identidade enviando um documento com foto.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="flex flex-col gap-2">
                <label class="text-[12px] text-gray-400 uppercase tracking-widest font-bold ml-1">Documento de Identidade</label>
                <div class="border border-[#1A1A1A] bg-[#1A1A1A]/30 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#D7FF00]/50 hover:bg-[#1A1A1A]/60 transition-all text-center h-32 group">
                    <Upload :size="24" class="text-[#D7FF00] group-hover:scale-110 transition-transform" />
                    <span class="text-[12px] text-gray-400 font-medium">Clique para fazer upload</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-[12px] text-gray-400 uppercase tracking-widest font-bold ml-1">Selfie com Documento</label>
                <div class="border border-[#1A1A1A] bg-[#1A1A1A]/30 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#D7FF00]/50 hover:bg-[#1A1A1A]/60 transition-all text-center h-32 group">
                    <Camera :size="24" class="text-[#D7FF00] group-hover:scale-110 transition-transform" />
                    <span class="text-[12px] text-gray-400 font-medium">Tirar foto ou upload</span>
                </div>
            </div>
        </div>

        <button class="w-full bg-[#D7FF00] text-black py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-green-900/10 hover:bg-[#E5FF4D] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mb-6">
           Enviar Documentos
        </button>

        <div class="flex justify-start pt-6 border-t border-dashed border-[#1A1A1A]">
          <router-link to="/dashboard" class="inline-flex items-center gap-2 text-gray-500 font-bold text-[13px] hover:text-gray-400 transition-all">
            Fazer isso depois
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { FileCheck, Upload, Camera } from 'lucide-vue-next'

export default {
  name: 'KYCView',
  components: {
    FileCheck, Upload, Camera
  }
}
</script>

<style scoped>
@reference "tailwindcss";
</style>
