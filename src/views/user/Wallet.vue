<template>
  <AdminLayout>
    <div class="flex flex-col gap-8 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col gap-1 px-2">
         <h1 class="text-2xl font-black text-[white]">Minha Carteira</h1>
         <p class="text-[14px] text-gray-500 font-bold uppercase tracking-wider">Gerencie seu saldo e solicitações de saque</p>
      </div>

      <!-- Balance Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6 relative overflow-hidden group">
          <div class="flex justify-between items-start z-10">
            <div class="flex flex-col gap-1">
              <span class="text-[13px] text-gray-500 font-bold uppercase tracking-widest">Saldo Disponível</span>
              <h2 class="text-[32px] font-bold text-[white]">R$ 0,00</h2>
            </div>
            <div class="w-12 h-12 rounded-full bg-[#D7FF00]/10 text-[#D7FF00] flex items-center justify-center transition-all group-hover:bg-[#D7FF00] group-hover:text-white">
              <Wallet :size="24" stroke-width="2.5" />
            </div>
          </div>
          <div class="flex flex-col gap-2 z-10">
             <div class="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Progresso para saque</span>
                <span class="text-[#D7FF00]">0%</span>
             </div>
             <div class="w-full bg-[#1A1A1A] h-2.5 rounded-full overflow-hidden">
                <div class="bg-[#D7FF00] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,88,88,0.3)]" style="width: 5%"></div>
             </div>
          </div>
          <div class="absolute -right-4 -bottom-4 opacity-[0.03] text-[#D7FF00] pointer-events-none transform rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110">
             <Wallet :size="160" />
          </div>
        </div>

        <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6 relative overflow-hidden group">
          <div class="flex justify-between items-start z-10">
            <div class="flex flex-col gap-1">
              <span class="text-[13px] text-gray-500 font-bold uppercase tracking-widest">Saldo Pendente</span>
              <h2 class="text-[32px] font-bold text-[white]">R$ 0,00</h2>
            </div>
            <div class="w-12 h-12 rounded-full bg-[#D7FF00]/10 text-[#D7FF00] flex items-center justify-center transition-all group-hover:bg-[#D7FF00] group-hover:text-white">
              <Clock :size="24" stroke-width="2.5" />
            </div>
          </div>
          <p class="text-[13px] text-gray-500 font-bold leading-relaxed z-10 uppercase tracking-wider">Valores que serão liberados após o prazo de liquidação das vendas.</p>
          <div class="absolute -right-4 -bottom-4 opacity-[0.03] text-[#D7FF00] pointer-events-none transform rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110">
             <Clock :size="160" />
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex flex-col sm:flex-row gap-4 px-2">
         <button class="w-full sm:w-auto px-8 py-3.5 bg-[#D7FF00] text-black font-bold rounded-xl flex items-center justify-center sm:justify-start gap-3 hover:bg-[#E5FF4D] transition-all shadow-lg shadow-green-900/10">
            <Plus :size="20" stroke-width="3" />
            Adicionar Saldo
         </button>
         <button class="w-full sm:w-auto px-8 py-3.5 bg-[#0A0A0A] border border-[#1A1A1A] text-[white] font-bold rounded-xl flex items-center justify-center sm:justify-start gap-3 hover:bg-[#1A1A1A] transition-all shadow-sm">
            <ArrowUpRight :size="20" stroke-width="3" />
            Solicitar Saque
         </button>
      </div>

      <!-- Info Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
         <!-- Taxas -->
         <div class="flex flex-col gap-4">
            <h3 class="text-base font-bold text-[white] uppercase tracking-widest ml-1">Taxas e Prazos</h3>
            <div class="bg-[#0A0A0A] rounded-[20px] shadow-sm border border-[#1A1A1A] overflow-hidden font-bold">
               <table class="w-full text-left">
                  <tbody class="divide-y divide-[#1A1A1A]">
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Saque PIX</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">R$ 5,00 por saque</td>
                     </tr>
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Saque TED</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">R$ 10,00 por saque</td>
                     </tr>
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Prazo PIX</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">Instante (24/7)</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <!-- Limites -->
         <div class="flex flex-col gap-4">
            <h3 class="text-base font-bold text-[white] uppercase tracking-widest ml-1">Limites Diários</h3>
            <div class="bg-[#0A0A0A] rounded-[20px] shadow-sm border border-[#1A1A1A] overflow-hidden font-bold">
               <table class="w-full text-left">
                  <tbody class="divide-y divide-[#1A1A1A]">
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Limite diário</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">R$ 50.000,00</td>
                     </tr>
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Mínimo para saque</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">R$ 20,00</td>
                     </tr>
                     <tr class="hover:bg-[#1A1A1A]/50 transition-all">
                        <td class="px-6 py-4 text-[13px] text-gray-500 uppercase tracking-widest">Saques restantes</td>
                        <td class="px-6 py-4 text-[14px] text-[white] text-right font-bold">Ilimitados</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Wallet, Clock, Plus, ArrowUpRight } from 'lucide-vue-next'

export default {
  name: 'UserWallet',
  components: {
    AdminLayout, Wallet, Clock, Plus, ArrowUpRight
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
