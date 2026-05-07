<template>
  <AdminLayout>
    <div class="flex flex-col gap-8 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col gap-1 px-2">
         <h1 class="text-2xl font-black text-[white]">Webhooks</h1>
         <p class="text-[14px] text-gray-500 font-bold uppercase tracking-wider">Configure seus webhooks para notificações em tempo real</p>
      </div>

      <div class="px-2 flex flex-col gap-6">
        <!-- Top Config Card -->
        <div class="bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A]">
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
              <div class="lg:col-span-4 flex flex-col gap-2 font-bold">
                 <label class="text-[13px] text-[white] uppercase tracking-widest ml-1">Webhook URL</label>
                 <input type="text" placeholder="Digite a URL do webhook" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] focus:outline-none focus:border-[#D7FF00] transition-all shadow-sm" />
              </div>
              <div class="lg:col-span-5 flex flex-col gap-2 font-bold">
                 <label class="text-[13px] text-[white] uppercase tracking-widest ml-1">Eventos</label>
                 <input type="text" placeholder="Selecione os eventos" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] focus:outline-none focus:border-[#D7FF00] transition-all shadow-sm" />
              </div>
              <div class="md:col-span-2 lg:col-span-3">
                 <button class="w-full py-3 bg-[#D7FF00] text-black font-bold rounded-xl hover:bg-[#E5FF4D] transition-all shadow-lg shadow-green-900/10">
                    Salvar
                 </button>
              </div>
           </div>
        </div>

        <!-- Description Card -->
        <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col xl:flex-row justify-between items-start gap-8 relative overflow-hidden group">
           <div class="flex flex-col gap-6 max-w-2xl z-10 w-full">
              <div class="flex flex-col gap-1">
                 <h3 class="text-base font-bold text-[white]">Receberá uma requisição POST no webhook acima</h3>
                 <p class="text-[14px] text-gray-500 font-bold uppercase tracking-wider">Com os seguintes dados no body:</p>
              </div>
              
              <div class="flex flex-col gap-3 font-bold">
                 <div v-for="param in params" :key="param.name" class="flex items-center gap-3 text-[14px]">
                    <span class="text-[white] w-24">{{ param.name }}</span>
                    <span class="text-gray-500">|</span>
                    <span class="text-gray-500 uppercase text-[12px] tracking-widest">{{ param.type }}</span>
                 </div>
              </div>
           </div>

           <button class="px-8 py-3.5 bg-[#D7FF00] text-black font-bold rounded-xl hover:bg-[#E5FF4D] transition-all flex items-center gap-3 shadow-lg shadow-green-900/10 z-10">
              <Send :size="18" stroke-width="3" />
              Enviar Teste De Webhook
           </button>

           <div class="absolute -right-10 -bottom-10 opacity-[0.03] text-[#D7FF00] pointer-events-none transform rotate-12 transition-all group-hover:rotate-0">
              <Send :size="200" />
           </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Send } from 'lucide-vue-next'

export default {
  name: 'UserWebhook',
  components: {
    AdminLayout, Send
  },
  data() {
    return {
      params: [
        { name: 'nome', type: 'Tipo: string' },
        { name: 'cpf', type: 'Tipo: string' },
        { name: 'telefone', type: 'Tipo: string' },
        { name: 'email', type: 'Tipo: string' },
        { name: 'status', type: 'Tipo: pendente | pago' },
        { name: 'idTransaction', type: 'Tipo: string (ID único)' }
      ]
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
