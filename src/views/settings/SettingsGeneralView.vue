<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-[#1A1A1A] flex-1">
          <div 
            class="pb-4 text-[22px] font-black transition-all text-[white]"
          >
            Ajustes gerais
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8 px-2">
        <!-- Taxas Section -->
        <div class="bg-[#0A0A0A] rounded-[15px] border border-[#1A1A1A] shadow-sm overflow-hidden">
          <div class="px-6 py-3 bg-[#1A1A1A]/50 border-b border-[#1A1A1A]">
            <h3 class="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Taxas</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              <div v-for="field in taxaFields" :key="field.label" class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[white] ml-1">{{ field.label }}</label>
                <input 
                  type="text" 
                  v-model="field.value" 
                  class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#D7FF00] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Gerais Section -->
        <div class="bg-[#0A0A0A] rounded-[15px] border border-[#1A1A1A] shadow-sm overflow-hidden">
          <div class="px-6 py-3 bg-[#1A1A1A]/50 border-b border-[#1A1A1A]">
            <h3 class="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Gerais</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <!-- Left side general inputs -->
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Gateway Name</label>
                  <input type="text" v-model="settings.gatewayName" class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#D7FF00] transition-all" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">CNPJ</label>
                  <input 
                    type="text" 
                    v-model="settings.cnpj" 
                    @input="handleCNPJInput"
                    placeholder="00.000.000/0000-00"
                    maxlength="18"
                    class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#D7FF00] transition-all" 
                  />
                </div>
              </div>

              <!-- Right side general inputs -->
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Cor padrão</label>
                  <div class="flex items-center gap-2">
                    <div 
                      @click="$refs.colorInput.click()"
                      class="w-12 h-12 rounded-xl border-2 border-[#1A1A1A] cursor-pointer p-1.5 hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      <div class="w-full h-full rounded-lg shadow-inner" :style="{ backgroundColor: settings.primaryColor }"></div>
                    </div>
                    <input type="color" ref="colorInput" v-model="settings.primaryColor" class="sr-only" />
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Contato (Gerente)</label>
                  <input 
                    type="text" 
                    v-model="settings.managerContact" 
                    @input="handlePhoneInput"
                    placeholder="+55 (00) 0 0000-0000"
                    class="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#D7FF00] transition-all" 
                  />
                </div>
              </div>

              <!-- Asset Uploads (Logo & Icon) -->
              <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Logo -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Logo</label>
                   <div class="border border-[#1A1A1A] rounded-xl overflow-hidden shadow-sm bg-[#1A1A1A]/30">
                      <div v-if="previews.logo" class="px-4 py-2 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <button @click="removeAsset('logo')" class="text-[#D7FF00] hover:scale-110 transition-all cursor-pointer">
                            <X :size="16" stroke-width="3" />
                          </button>
                        </div>
                      </div>
                      <div 
                        @click="triggerUpload('logo')"
                        :class="[
                          'flex items-center justify-center min-h-[180px] border-2 border-dashed border-[#1A1A1A] m-2 rounded-lg relative group transition-all hover:border-[#D7FF00] hover:bg-[#1A1A1A]/50 cursor-pointer overflow-hidden',
                          previews.logo ? 'p-4 bg-[#0A0A0A]' : 'p-8 bg-[#0A0A0A]'
                        ]"
                      >
                         <img v-if="previews.logo" :src="previews.logo" class="max-h-32 w-auto object-contain" alt="Logo" />
                         <div v-else class="flex flex-col items-center gap-2 text-gray-500">
                            <Plus :size="32" stroke-width="2" />
                            <span class="text-[10px] font-black uppercase tracking-widest">Fazer Upload</span>
                         </div>
                         <div v-if="previews.logo" class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus :size="24" class="text-[#D7FF00]" />
                         </div>
                         <input type="file" ref="logoInput" class="sr-only" accept="image/*" @change="e => prepareCrop(e, 'logo')" />
                      </div>
                   </div>
                </div>

                <!-- Icon -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Icone</label>
                   <div class="border border-[#1A1A1A] rounded-xl overflow-hidden shadow-sm bg-[#1A1A1A]/30">
                      <div v-if="previews.icon" class="px-4 py-2 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <button @click="removeAsset('icon')" class="text-[#D7FF00] hover:scale-110 transition-all cursor-pointer">
                            <X :size="16" stroke-width="3" />
                          </button>
                        </div>
                      </div>
                      <div 
                        @click="triggerUpload('icon')"
                        :class="[
                          'flex items-center justify-center min-h-[180px] border-2 border-dashed border-[#1A1A1A] m-2 rounded-lg relative group transition-all hover:border-[#D7FF00] hover:bg-[#1A1A1A]/50 cursor-pointer overflow-hidden',
                          previews.icon ? 'p-4 bg-[#0A0A0A]' : 'p-8 bg-[#0A0A0A]'
                        ]"
                      >
                         <img v-if="previews.icon" :src="previews.icon" class="max-h-24 w-auto object-contain shadow-sm rounded-lg" alt="Icon" />
                         <div v-else class="flex flex-col items-center gap-2 text-gray-500">
                            <Plus :size="32" stroke-width="2" />
                            <span class="text-[10px] font-black uppercase tracking-widest">Fazer Upload</span>
                         </div>
                         <div v-if="previews.icon" class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus :size="24" class="text-[#D7FF00]" />
                         </div>
                         <input type="file" ref="iconInput" class="sr-only" accept="image/*" @change="e => prepareCrop(e, 'icon')" />
                      </div>
                   </div>
                </div>

                <!-- Banner Dashboard (Full Width) -->
                <div class="md:col-span-2 flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[white] ml-1">Banner Dashboard</label>
                   <div class="border border-[#1A1A1A] rounded-xl overflow-hidden shadow-sm bg-[#1A1A1A]/30">
                      <div v-if="previews.banner" class="px-4 py-2 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <button @click="removeAsset('banner')" class="text-[#D7FF00] hover:scale-110 transition-all cursor-pointer">
                            <X :size="16" stroke-width="3" />
                          </button>
                        </div>
                      </div>
                      <div 
                        @click="triggerUpload('banner')"
                        :class="[
                          'm-2 rounded-lg border-2 border-dashed border-[#1A1A1A] overflow-hidden relative group transition-all hover:border-[#D7FF00] hover:bg-[#1A1A1A]/50 cursor-pointer flex items-center justify-center min-h-[160px]',
                          previews.banner ? 'p-0 bg-[#0A0A0A]' : 'p-4 bg-[#0A0A0A]'
                        ]"
                      >
                         <img v-if="previews.banner" :src="previews.banner" class="w-full h-auto max-h-[220px] object-contain rounded-lg shadow-sm" alt="Banner" />
                         <div v-else class="flex flex-col items-center gap-2 text-gray-500">
                            <Plus :size="32" stroke-width="2" />
                            <span class="text-[10px] font-black uppercase tracking-widest">Fazer Upload</span>
                         </div>
                         <div v-if="previews.banner" class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus :size="32" class="text-[#D7FF00]" />
                         </div>
                         <input type="file" ref="bannerInput" class="sr-only" accept="image/*" @change="e => prepareCrop(e, 'banner')" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action (Relative at bottom) -->
      <div class="flex items-center justify-end px-2 mt-4 mb-10 pb-10">
        <button 
          @click="saveSettings"
          class="w-full sm:w-auto bg-[#D7FF00] text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,88,88,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/10"
        >
          <Save :size="18" stroke-width="3" />
          Salvar Alterações
        </button>
      </div>
    </div>

    <!-- Image Crop Modal -->
    <ImageCropModal 
      :show="showCropModal"
      :imageSrc="cropImageSrc"
      :aspectRatio="cropAspectRatio"
      @cancel="showCropModal = false"
      @confirm="onCropConfirm"
    />
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import ImageCropModal from '../../components/modals/ImageCropModal.vue'
import { Save, X, Plus } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

export default {
  name: 'SettingsGeneralView',
   components: {
    AdminLayout,
    ImageCropModal,
    Save, X, Plus
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  mounted() {
    this.settings.cnpj = this.formatCNPJ(this.settings.cnpj)
    this.settings.managerContact = this.formatPhone(this.settings.managerContact)
  },
  data() {
    return {
      taxaFields: [
        { label: 'Taxa Depósito (%)', value: '6.99' },
        { label: 'Taxa Depósito Fixa (R$)', value: '0.80' },
        { label: 'Taxa Saque (%)', value: '0.00' },
        { label: 'Taxa Saque Fixa (R$)', value: '5' },
        { label: 'Taxa Baseline (R$)', value: '0.00' },
        { label: 'Depósito Mínimo', value: '1.00' },
        { label: 'Saque Mínimo', value: '10.00' },
        { label: 'Limite Mensal (P.F)', value: '100000.00' }
      ],
      settings: {
        gatewayName: 'Compra Segura',
        primaryColor: '#00A86B',
        cnpj: '60958780000109',
        managerContact: '42998407843'
      },
      previews: {
        logo: null,
        icon: null,
        banner: null
      },
      assetFiles: {
        logo: null,
        icon: null,
        banner: null
      },
      // Crop modal state
      showCropModal: false,
      cropImageSrc: '',
      cropAspectRatio: 1,
      currentCropType: ''
    }
  },
  methods: {
    triggerUpload(type) {
      this.$refs[type + 'Input'].click()
    },
    prepareCrop(event, type) {
      const file = event.target.files[0]
      if (file) {
        this.currentCropType = type
        this.assetFiles[type] = file
        
        // Settings aspect ratio based on type
        if (type === 'banner') {
          this.cropAspectRatio = 16 / 5
        } else {
          this.cropAspectRatio = 1 / 1
        }
        
        // Read file for cropper
        const reader = new FileReader()
        reader.onload = (e) => {
          this.cropImageSrc = e.target.result
          this.showCropModal = true
        }
        reader.readAsDataURL(file)
      }
    },
    onCropConfirm(croppedBase64) {
      this.previews[this.currentCropType] = croppedBase64
      this.showCropModal = false
      this.showToast(`${this.currentCropType.charAt(0).toUpperCase() + this.currentCropType.slice(1)} recortado com sucesso`, 'success')
    },
    removeAsset(type) {
      this.assetFiles[type] = null
      this.previews[type] = null
      this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} removido`, 'success')
      this.$refs[type + 'Input'].value = ''
    },
    saveSettings() {
      this.showToast('Configurações gerais salvas com sucesso!', 'success')
    },
    handleCNPJInput(e) {
      this.settings.cnpj = this.formatCNPJ(e.target.value)
    },
    handlePhoneInput(e) {
      this.settings.managerContact = this.formatPhone(e.target.value)
    },
    formatCNPJ(value) {
      if (!value) return ''
      value = value.replace(/\D/g, '')
      if (value.length > 14) value = value.slice(0, 14)
      
      return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5")
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4}).*/, "$1.$2.$3/$4")
        .replace(/^(\d{2})(\d{3})(\d{3}).*/, "$1.$2.$3")
        .replace(/^(\d{2})(\d{3}).*/, "$1.$2")
        .replace(/^(\d{2}).*/, "$1")
    },
    formatPhone(value) {
      if (!value) return ''
      // Remove everything except numbers
      let numbers = value.replace(/\D/g, '')
      
      // Brazilian mobile limit (11 digits: 2 for DDD + 9 for number)
      if (numbers.length > 11) numbers = numbers.slice(0, 11)
      
      let formatted = ''
      if (numbers.length > 0) {
        formatted = '(' + numbers.slice(0, 2)
        if (numbers.length > 2) {
          formatted += ') ' + numbers.slice(2, 3)
          if (numbers.length > 3) {
            formatted += ' ' + numbers.slice(3, 7)
            if (numbers.length > 7) {
              formatted += '-' + numbers.slice(7, 11)
            }
          }
        }
      }
      return formatted
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

input:focus {
  @apply ring-4 ring-[#D7FF00]/5;
}
</style>
