<template>
  <div v-if="isOpen" @click.self="$emit('close')" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 font-outfit px-2 sm:px-4 py-4 sm:py-8">
    <div class="bg-[#0A0A0A] rounded-xl shadow-2xl border border-[#1A1A1A] w-full max-w-5xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-b border-[#1A1A1A] sticky top-0 bg-[#0A0A0A] z-10">
        <h3 class="text-lg sm:text-xl font-bold text-[white]">Editar Usuário</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-600 transition-colors">
          <X :size="24" stroke-width="2" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-4 sm:p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <!-- Row 1 -->
          <div class="sm:col-span-2 flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Nome</label>
            <input type="text" v-model="formData.name" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5 ">
            <label class="text-[13px] text-gray-500 font-medium">CPF/CNPJ</label>
            <input type="text" v-model="formData.idNumber" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Telefone</label>
            <input type="text" v-model="formData.phone" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>

          <!-- Row 2 -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Data nascimento</label>
            <input type="date" v-model="formData.birthDate" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Email</label>
            <input type="email" v-model="formData.email" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Permissão</label>
            <select class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00] bg-[#0A0A0A]">
              <option>usuario</option>
              <option>admin</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Gerente</label>
            <select class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00] bg-[#0A0A0A]">
              <option>Nenhum</option>
            </select>
          </div>

          <!-- Row 3 -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Taxa Cash In (%)</label>
            <input type="text" value="0.00" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Taxa Cash In Fixa (R$)</label>
            <input type="text" value="1.00" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Taxa Cash Out (%)</label>
            <input type="text" value="3.90" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] text-gray-500 font-medium">Taxa Cash Out Fixa (R$)</label>
            <input type="text" value="10.00" class="px-3 py-2 border border-[#1A1A1A] rounded text-sm focus:outline-none focus:border-[#D7FF00]" />
          </div>

          <!-- Row 4 -->
          <div class="sm:col-span-2 flex flex-col gap-1.5 min-w-0">
            <label class="text-[13px] text-gray-500 font-medium">Token</label>
            <div class="flex min-w-0">
              <input type="text" value="8dc43ff2-e65a-4340-a85d-fb4df5078573" class="px-3 py-2 border border-[#1A1A1A] rounded-l text-[12px] sm:text-sm focus:outline-none focus:border-[#D7FF00] flex-1 bg-[#0A0A0A] overflow-hidden text-ellipsis min-w-0" />
              <button class="bg-[#D7FF00] hover:bg-[#004747] text-white px-3 rounded-r flex items-center justify-center transition-colors">
                <RefreshCcw :size="16" />
              </button>
            </div>
          </div>
          <div class="sm:col-span-2 flex flex-col gap-1.5 min-w-0">
            <label class="text-[13px] text-gray-500 font-medium">Secret</label>
            <div class="flex min-w-0">
              <input type="text" value="c39355b3-d7c0-4fc4-8756-3fe9230b839d" class="px-3 py-2 border border-[#1A1A1A] rounded-l text-[12px] sm:text-sm focus:outline-none focus:border-[#D7FF00] flex-1 bg-[#0A0A0A] overflow-hidden text-ellipsis min-w-0" />
              <button class="bg-[#D7FF00] hover:bg-[#004747] text-white px-3 rounded-r flex items-center justify-center transition-colors">
                <RefreshCcw :size="16" />
              </button>
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <!-- Foto RG (Frente) -->
          <div class="flex flex-col gap-2">
            <label class="text-[13px] text-gray-500 font-medium">Foto RG (Frente)</label>
            <div v-if="formData.rgFrente" class="border border-[#1A1A1A] rounded p-2 flex items-center justify-between text-sm text-gray-600 bg-[#0A0A0A]">
              <span class="truncate pr-2 text-[12px]">📝 {{ formData.rgFrenteName || 'rg_frente.png' }}</span>
              <button @click="removeImage('rgFrente')" class="text-purple-600 hover:text-purple-800 cursor-pointer flex-shrink-0"><X :size="16" /></button>
            </div>
            <div 
              class="border border-dashed border-[#1A1A1A] rounded p-1 mt-1 bg-[#1A1A1A] h-[140px] sm:h-[180px] flex items-center justify-center overflow-hidden transition-all hover:bg-[#1A1A1A] cursor-pointer relative"
              @click="$refs.fileFrente.click()"
            >
              <img v-if="formData.rgFrente" :src="formData.rgFrente" alt="RG Frente" class="w-full h-full object-cover rounded opacity-80" />
              <div v-else class="flex flex-col items-center justify-center text-gray-500">
                <Upload :size="32" class="mb-2 opacity-50" />
                <span class="text-sm font-medium">Clique para subir</span>
              </div>
              <input type="file" ref="fileFrente" class="hidden" @change="handleFileUpload($event, 'rgFrente')" accept="image/*" />
            </div>
          </div>
          
          <!-- Foto RG (Verso) -->
          <div class="flex flex-col gap-2">
            <label class="text-[13px] text-gray-500 font-medium">Foto RG (Verso)</label>
            <div v-if="formData.rgVerso" class="border border-[#1A1A1A] rounded p-2 flex items-center justify-between text-sm text-gray-600 bg-[#0A0A0A]">
              <span class="truncate pr-2 text-[12px]">📝 {{ formData.rgVersoName || 'rg_verso.png' }}</span>
              <button @click="removeImage('rgVerso')" class="text-purple-600 hover:text-purple-800 cursor-pointer flex-shrink-0"><X :size="16" /></button>
            </div>
            <div 
              class="border border-dashed border-[#1A1A1A] rounded p-1 mt-1 bg-[#1A1A1A] h-[140px] sm:h-[180px] flex items-center justify-center overflow-hidden transition-all hover:bg-[#1A1A1A] cursor-pointer relative"
              @click="$refs.fileVerso.click()"
            >
              <img v-if="formData.rgVerso" :src="formData.rgVerso" alt="RG Verso" class="w-full h-full object-cover rounded opacity-80" />
              <div v-else class="flex flex-col items-center justify-center text-gray-500">
                <Upload :size="32" class="mb-2 opacity-50" />
                <span class="text-sm font-medium">Clique para subir</span>
              </div>
              <input type="file" ref="fileVerso" class="hidden" @change="handleFileUpload($event, 'rgVerso')" accept="image/*" />
            </div>
          </div>

          <!-- Selfie RG -->
          <div class="flex flex-col gap-2">
            <label class="text-[13px] text-gray-500 font-medium">Selfie RG</label>
            <div v-if="formData.selfie" class="border border-[#1A1A1A] rounded p-2 flex items-center justify-between text-sm text-gray-600 bg-[#0A0A0A]">
              <span class="truncate pr-2 text-[12px]">📝 {{ formData.selfieName || 'selfie.png' }}</span>
              <button @click="removeImage('selfie')" class="text-purple-600 hover:text-purple-800 cursor-pointer flex-shrink-0"><X :size="16" /></button>
            </div>
            <div 
              class="border border-dashed border-[#1A1A1A] rounded p-1 mt-1 bg-[#1A1A1A] h-[140px] sm:h-[180px] flex items-center justify-center overflow-hidden transition-all hover:bg-[#1A1A1A] cursor-pointer relative"
              @click="$refs.fileSelfie.click()"
            >
              <img v-if="formData.selfie" :src="formData.selfie" alt="Selfie RG" class="w-full h-full object-cover rounded opacity-80" />
              <div v-else class="flex flex-col items-center justify-center text-gray-500">
                <Upload :size="32" class="mb-2 opacity-50" />
                <span class="text-sm font-medium">Clique para subir</span>
              </div>
              <input type="file" ref="fileSelfie" class="hidden" @change="handleFileUpload($event, 'selfie')" accept="image/*" />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-4 border-t border-[#1A1A1A] sticky bottom-0 bg-[#0A0A0A] pb-2">
          <button @click="save" class="w-full sm:w-auto px-6 py-2.5 bg-[#D7FF00] hover:bg-[#004747] text-white font-medium rounded text-[15px] transition-colors cursor-pointer">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { X, RefreshCcw, Upload } from 'lucide-vue-next'

export default {
  name: 'UserEditModal',
  components: {
    X,
    RefreshCcw,
    Upload
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = { 
            ...newVal,
            rgFrente: newVal.rgFrente || 'https://picsum.photos/seed/doc1/300/180',
            rgFrenteName: newVal.rgFrenteName || '5a108aa-42bb-480...png',
            rgVerso: newVal.rgVerso || 'https://picsum.photos/seed/doc2/300/180',
            rgVersoName: newVal.rgVersoName || '0986def-4f4e-468...png',
            selfie: newVal.selfie || 'https://picsum.photos/seed/selfie1/300/180',
            selfieName: newVal.selfieName || '702738cd-0188-4a9...png'
          }
        }
      }
    }
  },
  methods: {
    removeImage(field) {
      this.formData[field] = null
      this.formData[field + 'Name'] = null
    },
    handleFileUpload(event, field) {
      const file = event.target.files[0]
      if (file) {
        this.formData[field + 'Name'] = file.name
        const reader = new FileReader()
        reader.onload = (e) => {
          this.formData[field] = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    save() {
      this.$emit('save', this.formData)
    }
  }
}
</script>
