<template>
  <AdminLayout>
    <div class="flex flex-col gap-10 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col gap-1 px-2">
         <h1 class="text-2xl font-black text-[white]">Minha Conta</h1>
         <p class="text-[14px] text-gray-500 font-bold uppercase tracking-wider">Gerencie suas informações pessoais e segurança</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1 flex flex-col gap-6">
           <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col items-center gap-6 relative group overflow-hidden">
              <div class="relative">
                <div class="w-32 h-32 rounded-full bg-[#D7FF00]/10 flex items-center justify-center border-4 border-[#D7FF00]/20 transition-all group-hover:border-[#D7FF00]/40">
                  <User :size="60" class="text-[#D7FF00]" />
                </div>
                <button class="absolute bottom-1 right-1 w-10 h-10 bg-[#D7FF00] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                  <Camera :size="18" stroke-width="3" />
                </button>
              </div>
              <div class="text-center flex flex-col gap-1">
                 <h2 class="text-xl font-bold text-[white]">Usuário Exemplo</h2>
                 <p class="text-[14px] text-gray-500 font-bold uppercase tracking-widest">ID: #12345</p>
              </div>
              <div class="w-full pt-6 border-t border-[#1A1A1A] flex flex-col gap-4">
                 <div class="flex justify-between items-center px-2">
                    <span class="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Status</span>
                    <span class="px-3 py-1 bg-[#D7FF00]/10 text-[#D7FF00] text-[10px] font-bold uppercase tracking-widest rounded-full">Verificado</span>
                 </div>
                 <div class="flex justify-between items-center px-2">
                    <span class="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Desde</span>
                    <span class="text-[14px] font-bold text-[white]">Jan 2026</span>
                 </div>
              </div>
           </div>

           <!-- Security Quick Card -->
           <div class="bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] text-white flex flex-col gap-4 relative overflow-hidden group">
              <div class="flex items-center gap-3 z-10 text-[#D7FF00]">
                 <ShieldCheck :size="24" />
                 <h3 class="text-base font-bold text-white">Segurança</h3>
              </div>
              <p class="text-[13px] text-gray-400 font-medium z-10 leading-relaxed">Mantenha sua conta protegida ativando a autenticação em duas etapas.</p>
              <button class="mt-2 w-full py-2.5 bg-[#D7FF00] text-black font-bold text-[13px] rounded-xl transition-all z-10 hover:bg-[#E5FF4D] shadow-lg shadow-lime-900/10">
                 Configurar 2FA
              </button>
              <div class="absolute -right-6 -bottom-6 opacity-[0.03] text-[#D7FF00] pointer-events-none transform rotate-12 transition-all group-hover:rotate-0">
                 <ShieldCheck :size="120" />
              </div>
           </div>
        </div>

        <!-- Forms Area -->
        <div class="lg:col-span-2 flex flex-col gap-8">
           <!-- Personal Info -->
           <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-8">
              <div class="flex items-center gap-3 border-b border-[#1A1A1A] pb-4">
                 <User :size="20" class="text-[#D7FF00]" />
                 <h3 class="text-base font-bold text-[white]">Informações Pessoais</h3>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="flex flex-col gap-2 font-bold focus-within:text-[#D7FF00] transition-all">
                    <label class="text-[13px] uppercase tracking-widest ml-1 text-gray-500">Nome Completo</label>
                    <input type="text" placeholder="Seu nome" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
                 <div class="flex flex-col gap-2 font-bold focus-within:text-[#D7FF00] transition-all">
                    <label class="text-[13px] uppercase tracking-widest ml-1 text-gray-500">E-mail</label>
                    <input type="email" placeholder="seu@email.com" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
                 <div class="flex flex-col gap-2 font-bold focus-within:text-[#D7FF00] transition-all">
                    <label class="text-[13px] uppercase tracking-widest ml-1 text-gray-500">CPF</label>
                    <input type="text" placeholder="000.000.000-00" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
                 <div class="flex flex-col gap-2 font-bold focus-within:text-[#D7FF00] transition-all">
                    <label class="text-[13px] uppercase tracking-widest ml-1 text-gray-500">Telefone</label>
                    <input type="text" placeholder="(00) 00000-0000" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-[#1A1A1A]">
                 <button class="px-10 py-3 bg-[#D7FF00] text-black font-bold rounded-xl hover:bg-[#E5FF4D] transition-all shadow-lg shadow-green-900/10">
                    Salvar Alterações
                 </button>
              </div>
           </div>

           <!-- Change Password -->
           <div class="bg-[#0A0A0A] p-8 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-8">
              <div class="flex items-center gap-3 border-b border-[#1A1A1A] pb-4">
                 <Key :size="20" class="text-[#D7FF00]" />
                 <h3 class="text-base font-bold text-[white]">Alterar Senha</h3>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="flex flex-col gap-2 font-bold">
                    <label class="text-[13px] text-gray-500 uppercase tracking-widest ml-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
                 <div class="flex flex-col gap-2 font-bold">
                    <label class="text-[13px] text-gray-500 uppercase tracking-widest ml-1">Nova Senha</label>
                    <input type="password" placeholder="••••••••" class="w-full px-5 py-2.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-[#1A1A1A]">
                 <button class="px-10 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-[white] font-bold rounded-xl hover:bg-[#1A1A1A] transition-all shadow-sm">
                    Atualizar Senha
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { User, Camera, ShieldCheck, Key } from 'lucide-vue-next'

export default {
  name: 'UserAccount',
  components: {
    AdminLayout, User, Camera, ShieldCheck, Key
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
