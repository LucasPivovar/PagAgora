<template>
  <AdminLayout>
    <div class="flex flex-col gap-8 font-outfit text-left mb-10 pb-20">
      <!-- Header with Search and Add -->
      <div class="px-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <h1 class="text-2xl font-black text-[white]">Meus Produtos</h1>
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div class="relative w-full sm:flex-1 lg:w-[280px]">
            <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Buscar por nome..." class="w-full pl-10 pr-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[white] focus:outline-none focus:border-[#D7FF00] transition-all shadow-sm" />
          </div>
          <button class="px-6 py-2 bg-[#D7FF00] text-black font-bold text-[14px] rounded-xl flex items-center gap-2 hover:bg-[#E5FF4D] transition-all whitespace-nowrap shadow-sm">
            <Plus :size="18" stroke-width="3" />
            Novo Produto
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="px-2">
        <div class="bg-[#0A0A0A] rounded-[20px] shadow-sm border border-[#1A1A1A] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-[#1A1A1A]/50">
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-24">Imagem</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[200px]">Nome</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] min-w-[120px]">Preço</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-32">Status</th>
                  <th class="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] w-20"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1A1A1A] font-bold">
                <tr v-for="(product, index) in products" :key="index" class="hover:bg-[#1A1A1A]/50 transition-all cursor-pointer group">
                  <td class="px-8 py-4">
                    <div 
                      @click="zoomImage(product.image)"
                      class="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center overflow-hidden border border-[#1A1A1A] group-hover:border-[#D7FF00] transition-all cursor-zoom-in"
                    >
                      <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                      <Package v-else :size="20" class="text-gray-500" />
                    </div>
                  </td>
                  <td class="px-8 py-4">
                    <span class="text-[14px] text-[white]">{{ product.name }}</span>
                  </td>
                  <td class="px-8 py-4">
                    <span class="text-[14px] text-[white]">R$ {{ product.price }}</span>
                  </td>
                  <td class="px-8 py-4">
                    <span class="px-3 py-1 bg-[#D7FF00]/10 text-[#D7FF00] text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Ativo
                    </span>
                  </td>
                  <td class="px-8 py-4 text-right">
                    <button class="p-2 text-gray-500 hover:text-[white] transition-all">
                      <MoreVertical :size="18" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-8 py-6 border-t border-[#1A1A1A] flex justify-end items-center gap-4">
            <button class="text-[12px] font-bold text-gray-500 hover:text-[white] transition-all uppercase tracking-widest">Anterior</button>
            <div class="flex items-center gap-1">
               <button class="w-8 h-8 rounded-lg bg-[#D7FF00]/10 text-[#D7FF00] font-bold text-[12px]">1</button>
            </div>
            <button class="text-[12px] font-bold text-gray-500 hover:text-[white] transition-all uppercase tracking-widest">Próximo</button>
          </div>
        </div>
      </div>

      <!-- Image Zoom Modal -->
      <div v-if="zoomedImage" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all" @click="zoomedImage = null">
         <div class="relative max-w-4xl w-full h-full flex items-center justify-center" @click.stop>
            <button @click="zoomedImage = null" class="absolute top-4 right-4 w-10 h-10 bg-[#0A0A0A]/10 hover:bg-[#0A0A0A]/20 text-white rounded-full flex items-center justify-center transition-all">
               <X :size="24" />
            </button>
            <img :src="zoomedImage" class="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border-4 border-white/10" />
         </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Plus, Package, MoreVertical, X, Search } from 'lucide-vue-next'

export default {
  name: 'UserProducts',
  components: {
    AdminLayout, Plus, Package, MoreVertical, X, Search
  },
  data() {
    return {
      zoomedImage: null,
      products: [
        { name: 'Produto de teste', price: '1,00', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60' }
      ]
    }
  },
  methods: {
    zoomImage(img) {
      if (img) {
        this.zoomedImage = img
      }
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

@keyframes zoom-in-95 {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-in {
  animation-fill-mode: forwards;
}

.zoom-in-95 {
  animation: zoom-in-95 0.3s ease-out;
}
</style>
