<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="px-2">
        <h1 class="text-[22px] font-black text-[white]">Ajuste de adquirentes</h1>
      </div>

      <div class="flex flex-col gap-8 px-2">
        <!-- Default Acquirer Selection -->
        <div class="bg-[#0A0A0A] rounded-[20px] p-6 border border-[#1A1A1A] shadow-sm">
          <div class="flex flex-col gap-1.5 max-w-sm">
            <label class="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Adquirente padrão</label>
            <div class="relative group">
              <select v-model="defaultAcquirer" class="w-full bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] appearance-none cursor-pointer shadow-sm">
                <option value="ColdFy">ColdFy</option>
                <option value="Cashtime">Cashtime</option>
                <option value="Mercado Pago">Mercado Pago</option>
                <option value="PagarMe">PagarMe</option>
                <option value="Efí">Efí</option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-[#D7FF00] transition-colors">
                <ChevronDown :size="16" stroke-width="3" />
              </div>
            </div>
          </div>
        </div>

        <!-- Section: ColdFy -->
        <div class="bg-[#0A0A0A] rounded-[24px] border border-[#1A1A1A] shadow-sm overflow-hidden">
          <div class="px-8 py-4 bg-[#1A1A1A]/50 border-b border-[#1A1A1A] flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-[#D7FF00]"></div>
             <h3 class="text-[14px] font-black text-[white] uppercase tracking-wider">ColdFy</h3>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Webhook URL</label>
                <div class="relative">
                  <input type="text" v-model="coldfy.webhookUrl" class="w-full bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-xs font-mono text-[#D7FF00] focus:outline-none" readonly />
                  <button @click="copyToClipboard(coldfy.webhookUrl)" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D7FF00]">
                    <Copy :size="14" />
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="flex flex-col gap-1.5">
                    <label class="text-[11px] font-bold text-gray-500 ml-1">Secret Key</label>
                    <input type="password" v-model="coldfy.secretKey" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-semibold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
                 <div class="flex flex-col gap-1.5">
                    <label class="text-[11px] font-bold text-gray-500 ml-1">Company ID</label>
                    <input type="text" v-model="coldfy.companyId" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-semibold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                 </div>
              </div>

              <!-- ColdFy Fees -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                 <div class="p-4 rounded-2xl bg-[#0A0A0A] border border-[#D7FF00]/30 shadow-lg shadow-lime-900/10">
                    <span class="text-[10px] font-black text-[#D7FF00] uppercase tracking-widest block mb-2">PIX (Taxas)</span>
                    <div class="flex flex-col gap-2">
                       <div class="flex justify-between items-center text-xs font-bold text-[white]">
                         <span>Cash In (%):</span>
                         <input type="text" v-model="coldfy.pixIn" class="w-16 bg-[#0A0A0A] border-b border-white/0 focus:border-[#D7FF00] focus:outline-none text-right text-[#D7FF00]" />
                       </div>
                       <div class="flex justify-between items-center text-xs font-bold text-[white]">
                         <span>Cash Out (%):</span>
                         <input type="text" v-model="coldfy.pixOut" class="w-16 bg-[#0A0A0A] border-b border-white/0 focus:border-[#D7FF00] focus:outline-none text-right text-[#D7FF00]" />
                       </div>
                    </div>
                 </div>
                 <div class="p-4 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A]">
                    <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Cartão (Taxas)</span>
                    <div class="flex justify-between items-center text-xs font-bold text-[white]">
                       <span>Cash In (%):</span>
                       <input type="text" v-model="coldfy.cardIn" class="w-16 bg-[#0A0A0A] border-b border-[#1A1A1A] focus:border-[#D7FF00] focus:outline-none text-right" />
                    </div>
                 </div>
                 <div class="p-4 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A]">
                    <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Boleto (Taxas)</span>
                    <div class="flex justify-between items-center text-xs font-bold text-[white]">
                       <span>Cash In (%):</span>
                       <input type="text" v-model="coldfy.boletoIn" class="w-16 bg-[#0A0A0A] border-b border-[#1A1A1A] focus:border-[#D7FF00] focus:outline-none text-right" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Mercado Pago -->
        <div class="bg-[#0A0A0A] rounded-[24px] border border-[#1A1A1A] shadow-sm overflow-hidden">
          <div class="px-8 py-4 bg-[#1A1A1A]/50 border-b border-[#1A1A1A] flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-[#D7FF00]"></div>
             <h3 class="text-[14px] font-black text-[white] uppercase tracking-wider">Mercado Pago</h3>
          </div>
          <div class="p-8">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Access Token</label>
              <input type="password" v-model="mercadoPago.accessToken" placeholder="TEST-..." class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-semibold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
            </div>
          </div>
        </div>

        <!-- Section: PagarMe -->
        <div class="bg-[#0A0A0A] rounded-[24px] border border-[#1A1A1A] shadow-sm overflow-hidden">
          <div class="px-8 py-4 bg-[#1A1A1A]/50 border-b border-[#1A1A1A] flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-[#D7FF00]"></div>
             <h3 class="text-[14px] font-black text-[white] uppercase tracking-wider">PagarMe</h3>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 gap-6">
              <div class="p-4 border border-[#D7FF00]/20 bg-[#D7FF00]/5 rounded-2xl text-[12px] font-bold text-[#D7FF00] flex items-center gap-3">
                 <AlertCircle :size="18" />
                 Registrar o webhook no painel da pagar.me: https://PagAgorasegura.com/pagarme/webhook
              </div>

              <div class="flex flex-col gap-1.5">
                 <label class="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Chave Secreta</label>
                 <input type="password" v-model="pagarme.secretKey" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-semibold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
              </div>

               <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-1.5 text-left">
                     <label class="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Taxa (PIX-IN)</label>
                     <input type="text" v-model="pagarme.taxPixIn" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm font-black text-[white] focus:outline-none focus:border-[#D7FF00]" />
                  </div>
                  <div class="flex flex-col gap-1.5 text-left">
                     <label class="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Taxa (PIX-OUT)</label>
                     <input type="text" v-model="pagarme.taxPixOut" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm font-black text-[white] focus:outline-none focus:border-[#D7FF00]" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Section: EFÍ (Gerencianet) -->
        <div class="bg-[#0A0A0A] rounded-[24px] border border-[#1A1A1A] shadow-sm overflow-hidden border-b-8 border-b-[#D7FF00]/10">
          <div class="px-8 py-4 bg-[#1A1A1A]/50 border-b border-[#1A1A1A] flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-[#D7FF00]"></div>
             <h3 class="text-[14px] font-black text-[white] uppercase tracking-wider">Efí</h3>
          </div>
          <div class="p-8">
            <div class="flex flex-col gap-8">
              <!-- Keys Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="key in efiFields" :key="key.label" class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-widest">{{ key.label }}</label>
                  <input type="text" v-model="efi[key.id]" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all" />
                </div>
              </div>

              <!-- Certificate Upload -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-gray-500 ml-1">Certificado (.p12 / .pem)</label>
                <div 
                  @click="$refs.certInput.click()"
                  class="w-full border-2 border-dashed border-[#1A1A1A] rounded-xl p-8 bg-[#1A1A1A]/50 flex flex-col items-center justify-center gap-3 text-gray-500 group hover:border-[#D7FF00] hover:bg-[#0A0A0A] transition-all cursor-pointer"
                >
                   <div class="w-12 h-12 rounded-full bg-[#0A0A0A] shadow-sm flex items-center justify-center text-gray-500 group-hover:text-[#D7FF00] group-hover:scale-110 transition-all">
                      <Upload :size="24" stroke-width="2.5" />
                   </div>
                   <div class="flex flex-col items-center">
                      <span class="text-[11px] font-black uppercase tracking-widest group-hover:text-[white]">Selecionar Certificado</span>
                      <span class="text-[10px] font-medium text-gray-500 mt-1" v-if="!efi.certificate">Nenhum arquivo selecionado</span>
                      <span class="text-[10px] font-bold text-[#D7FF00] mt-1" v-else>{{ efi.certificate.name }}</span>
                   </div>
                   <input type="file" ref="certInput" class="sr-only" @change="e => efi.certificate = e.target.files[0]" />
                </div>
              </div>

              <!-- Taxas e Prazos EFÍ -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Boleto -->
                 <div class="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#1A1A1A] flex flex-col gap-5 hover:bg-[#0A0A0A] transition-all">
                    <div class="flex items-center gap-2 border-b border-[#1A1A1A] pb-2">
                       <FileText :size="16" class="text-indigo-500" />
                       <h4 class="text-[13px] font-black text-[white] uppercase tracking-widest">Boleto</h4>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Taxa (%)</label>
                          <input type="text" v-model="efi.boletoRate" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] focus:border-[#D7FF00] focus:outline-none" />
                       </div>
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Fixa (R$)</label>
                          <input type="text" v-model="efi.boletoFixed" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] focus:border-[#D7FF00] focus:outline-none" />
                       </div>
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Liberação</label>
                          <div class="flex items-center gap-1.5">
                             <span class="text-[10px] font-black text-gray-500">D+</span>
                             <input type="text" v-model="efi.boletoDays" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] text-center focus:border-[#D7FF00] focus:outline-none" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- Cartão -->
                 <div class="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#1A1A1A] flex flex-col gap-5 hover:bg-[#0A0A0A] transition-all">
                    <div class="flex items-center gap-2 border-b border-[#1A1A1A] pb-2">
                       <CreditCard :size="16" class="text-[#D7FF00]" />
                       <h4 class="text-[13px] font-black text-[white] uppercase tracking-widest">Cartão</h4>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Taxa (%)</label>
                          <input type="text" v-model="efi.cardRate" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] focus:border-[#D7FF00] focus:outline-none" />
                       </div>
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Fixa (R$)</label>
                          <input type="text" v-model="efi.cardFixed" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] focus:border-[#D7FF00] focus:outline-none" />
                       </div>
                       <div class="flex flex-col gap-1.5">
                          <label class="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Liberação</label>
                          <div class="flex items-center gap-1.5">
                             <span class="text-[10px] font-black text-gray-500">D+</span>
                             <input type="text" v-model="efi.cardDays" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-3 py-2 text-xs font-black text-[white] text-center focus:border-[#D7FF00] focus:outline-none" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       <!-- Footer Action (Relative at bottom) -->
       <div class="flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 mb-10 px-2 pb-10">
         <button 
            class="w-full sm:w-auto bg-[#0A0A0A] text-gray-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-[#1A1A1A] shadow-sm hover:bg-[#1A1A1A] transition-all cursor-pointer"
         >
           Resetar
         </button>
         <button 
           @click="saveAcquirer"
           class="w-full sm:w-auto bg-[#D7FF00] text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,88,88,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/10"
         >
           <Zap :size="18" stroke-width="3" />
           Salvar Adquirentes
         </button>
       </div>
     </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { ChevronDown, Zap, AlertCircle, Upload, Copy, FileText, CreditCard } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

export default {
  name: 'SettingsAcquirerView',
  components: {
    AdminLayout,
    ChevronDown, Zap, AlertCircle, Upload, Copy, FileText, CreditCard
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      defaultAcquirer: 'ColdFy',
      coldfy: {
        webhookUrl: 'https://PagAgorasegura.com/coldfy/callback/deposit',
        secretKey: 'sk_live_E8VLBqnXEtPqULnCdDtCovlSfZZz2ce27rTgHa2Tw4JfSO+Ti5HGC9+dcBj8Xw0PwKyrDRrdo9/85geRW1OwF1LN3oM2fbiVKOt+klGAwynlhgokFLFsrHij1xzqGZXZANZWmFErwcfHIpTUomR8HzC41G6ROvSDQfY7BALK8kg=',
        companyId: 'd0e459e1-867f-4c32-892b-932db58b5880',
        pixIn: '1,20',
        pixOut: '0,00',
        cardIn: '4,47',
        boletoIn: '4,90'
      },
      mercadoPago: {
        accessToken: ''
      },
      pagarme: {
        secretKey: '',
        taxPixIn: '0.00',
        taxPixOut: '0.00'
      },
      efi: {
        clientId: '',
        secret: '',
        pixKey: '',
        accountId: '',
        certificate: null,
        boletoRate: '0.33',
        boletoFixed: '1.00',
        boletoDays: '5',
        cardRate: '10.29',
        cardFixed: '50.99',
        cardDays: '21'
      },
      efiFields: [
        { id: 'clientId', label: 'Client ID' },
        { id: 'secret', label: 'Client Secret' },
        { id: 'pixKey', label: 'Chave PIX' },
        { id: 'accountId', label: 'Identificador de conta' }
      ]
    }
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
      this.showToast('URL copiada para a área de transferência', 'success')
    },
    saveAcquirer() {
      this.showToast('Configurações de adquirentes salvas com sucesso!', 'success')
      console.log('Saving acquirer settings:', { 
        default: this.defaultAcquirer, 
        coldfy: this.coldfy, 
        mercadoPago: this.mercadoPago,
        pagarme: this.pagarme,
        efi: this.efi 
      })
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

input:focus {
  @apply ring-4 ring-[#D7FF00]/5 border-[#D7FF00];
}

select:focus {
  @apply ring-4 ring-[#D7FF00]/5 border-[#D7FF00];
}
</style>
