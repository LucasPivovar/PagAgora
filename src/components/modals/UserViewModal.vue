<template>
  <div v-if="isOpen" @click.self="$emit('close')" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 font-outfit px-2 sm:px-4 py-4 sm:py-8">
    <div class="bg-[#0A0A0A] rounded-xl shadow-2xl border border-[#1A1A1A] w-full max-w-5xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-b border-[#1A1A1A] sticky top-0 bg-[#0A0A0A] z-10">
        <h3 class="text-lg sm:text-xl font-bold text-[white]">Visualizar usuário</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-600 transition-colors">
          <X :size="24" stroke-width="2" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-4 sm:p-6 pt-2">
        <!-- Grid Data -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 mb-8">
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Usuario:</span>
            <span class="text-[15px] text-[white] break-all">{{ user?.username || 'leandropivovar' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Nome:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.name || 'Leandro Caetano Pivovar' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Email:</span>
            <span class="text-[15px] text-[white] break-all">{{ user?.email || 'leandropivovar@hotmail.com' }}</span>
          </div>
          
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Razão Social:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.razaoSocial || '-' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Nome Fantasia:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.nomeFantasia || '-' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">CPF/CNPJ:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.idNumber || '822.483.289-90' }}</span>
          </div>
          
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">CPF:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.cpf || '-' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Data de Nascimento:</span>
            <span class="text-[15px] text-[white]">{{ user?.birthDate || '2004-11-11' }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Telefone:</span>
            <span class="text-[15px] text-[white] break-words">{{ user?.phone || '41998902754' }}</span>
          </div>

          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[13px] text-gray-500 font-medium">Status:</span>
            <span class="text-[15px] font-medium text-[#f59e0b] break-words">{{ user?.statusDesc || 'Aguardando aprovação' }}</span>
          </div>
          <div class="flex flex-col gap-1.5 min-w-0">
            <span class="text-[13px] text-gray-500 font-bold uppercase tracking-wider">Token:</span>
            <span class="text-[15px] text-[white] font-mono break-all leading-tight bg-[#1A1A1A] p-2 rounded border border-[#1A1A1A]">{{ user?.token || '8dc43ff2-e65a-4340-a85d-fb4df5078573' }}</span>
          </div>
          <div class="flex flex-col gap-1.5 min-w-0">
            <span class="text-[13px] text-gray-500 font-bold uppercase tracking-wider">Secret:</span>
            <span class="text-[15px] text-[white] font-mono break-all leading-tight bg-[#1A1A1A] p-2 rounded border border-[#1A1A1A]">{{ user?.secret || 'c39355b3-d7c0-4fc4-8756-3fe9230b839d' }}</span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 pb-6 border-b border-[#1A1A1A]">
          <button class="px-8 py-3 bg-[#D7FF00] hover:bg-[#004747] text-white font-bold rounded-xl text-[15px] transition-all shadow-lg shadow-green-900/10 active:scale-95 cursor-pointer">
            Aprovar Usuário
          </button>
          <button class="px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl text-[15px] transition-all shadow-lg shadow-orange-900/10 active:scale-95 cursor-pointer">
            Banir Usuário
          </button>
          <div class="sm:ml-4 flex flex-col justify-center">
            <span class="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Data de Cadastro:</span>
            <span class="text-[15px] text-[white] font-medium">{{ user?.createdAtFull || '29/09/2025 12:05' }}</span>
          </div>
        </div>

        <!-- Docs -->
        <div>
          <h4 class="text-[14px] font-black text-[white] mb-6 uppercase tracking-widest border-l-4 border-[#D7FF00] pl-3">Fotos de Documentação</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div class="flex flex-col gap-2">
              <span class="text-[12px] text-gray-500 font-bold uppercase">Frente do RG</span>
              <div 
                class="border-2 border-dashed border-[#1A1A1A] rounded-2xl p-1 bg-[#1A1A1A] h-[200px] flex items-center justify-center overflow-hidden group hover:border-[#D7FF00] transition-colors cursor-zoom-in"
                @click="openDocPreview(user?.rgFrente || 'https://picsum.photos/seed/doc1/800/500')"
              >
                <img :src="user?.rgFrente || 'https://picsum.photos/seed/doc1/300/180'" alt="RG Frente" class="w-full h-full object-cover rounded-[14px] opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[12px] text-gray-500 font-bold uppercase">Verso do RG</span>
              <div 
                class="border-2 border-dashed border-[#1A1A1A] rounded-2xl p-1 bg-[#1A1A1A] h-[200px] flex items-center justify-center overflow-hidden group hover:border-[#D7FF00] transition-colors cursor-zoom-in"
                @click="openDocPreview(user?.rgVerso || 'https://picsum.photos/seed/doc2/800/500')"
              >
                <img :src="user?.rgVerso || 'https://picsum.photos/seed/doc2/300/180'" alt="RG Verso" class="w-full h-full object-cover rounded-[14px] opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[12px] text-gray-500 font-bold uppercase">Selfie</span>
              <div 
                class="border-2 border-dashed border-[#1A1A1A] rounded-2xl p-1 bg-[#1A1A1A] h-[200px] flex items-center justify-center overflow-hidden group hover:border-[#D7FF00] transition-colors cursor-zoom-in"
                @click="openDocPreview(user?.selfie || 'https://picsum.photos/seed/selfie1/800/500')"
              >
                <img :src="user?.selfie || 'https://picsum.photos/seed/selfie1/300/180'" alt="Selfie RG" class="w-full h-full object-cover rounded-[14px] opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Document Image Preview Modal (teleported to body to avoid z-index issues) -->
    <Teleport to="body">
      <Transition name="doc-preview">
        <div 
          v-if="docPreviewUrl"
          class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="docPreviewUrl = null"
        >
          <div class="relative max-w-[92vw] max-h-[92vh]">
            <button 
              @click="docPreviewUrl = null"
              class="absolute -top-4 -right-4 w-10 h-10 bg-[#0A0A0A] rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 shadow-xl z-10 cursor-pointer transition-all hover:scale-110"
            >
              <X :size="18" />
            </button>
            <img 
              :src="docPreviewUrl" 
              class="max-w-full max-h-[92vh] rounded-2xl shadow-2xl object-contain" 
              alt="Documento"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next'

export default {
  name: 'UserViewModal',
  components: {
    X
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
      docPreviewUrl: null
    }
  },
  methods: {
    openDocPreview(url) {
      if (url) this.docPreviewUrl = url
    }
  }
}
</script>

<style scoped>
/* Document preview modal animation */
.doc-preview-enter-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.doc-preview-leave-active { transition: opacity 0.18s ease; }
.doc-preview-enter-from { opacity: 0; transform: scale(0.9); }
.doc-preview-leave-to { opacity: 0; }
</style>
