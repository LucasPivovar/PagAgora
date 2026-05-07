<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10 pb-20">
      <!-- Page Header -->
      <div class="px-2">
        <h1 class="text-[22px] font-black text-[white]">Ajuste de Níveis</h1>
      </div>

      <!-- Status Toggle Bar (Slider) -->
      <div class="px-2">
        <div class="bg-[#0A0A0A] p-5 rounded-2xl border border-[#1A1A1A] shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-4">
             <div class="w-10 h-10 rounded-full bg-[#00A86B]/15 flex items-center justify-center text-[#00A86B]">
                <Activity :size="20" stroke-width="2.5" />
             </div>
             <div class="flex flex-col">
                <span class="text-[14px] font-black text-[white]">Sistema de níveis ativo</span>
                <span class="text-[11px] text-gray-500 font-medium italic">Ative para habilitar as regras de faturamento por nível</span>
             </div>
          </div>
          
          <label class="relative inline-flex items-center cursor-pointer group">
            <input type="checkbox" v-model="isSystemActive" class="sr-only peer">
            <div class="w-16 h-8 bg-[#1A1A1A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-[#0A0A0A] after:border-[#1A1A1A] after:border after:rounded-full after:h-6 after:w-8 after:transition-all peer-checked:bg-[#00A86B] shadow-inner transition-all group-hover:after:scale-95"></div>
          </label>
        </div>
      </div>

      <!-- Levels Card Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 mt-4">
        <!-- Level Cards -->
        <div v-for="(level, index) in levels" :key="level.id" class="bg-[#0A0A0A] rounded-[24px] border border-[#1A1A1A] shadow-sm flex flex-col p-6 gap-5 hover:shadow-md transition-all group relative overflow-hidden">
          <!-- Animated highlight on top -->
          <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: level.color }"></div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome</label>
            <input type="text" v-model="level.name" class="w-full bg-[#1A1A1A]/50 border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Mínimo (R$)</label>
            <input type="text" v-model="level.min" class="w-full bg-[#1A1A1A]/50 border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Máximo (R$)</label>
            <input type="text" v-model="level.max" class="w-full bg-[#1A1A1A]/50 border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-bold text-[white] focus:outline-none focus:border-[#D7FF00] focus:bg-[#0A0A0A] transition-all" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Cor do Nível</label>
            <div class="flex items-center gap-3">
               <div 
                 @click="$refs['colorPicker-' + index][0].click()"
                 class="w-full h-11 rounded-xl cursor-pointer transition-all hover:scale-[1.03] border-2 border-[#1A1A1A] shadow-sm flex items-center justify-center px-4 group/color"
                 :style="{ backgroundColor: level.color }"
               >
                 <div class="w-5 h-5 rounded-full bg-[#0A0A0A]/30 border border-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity">
                    <Plus class="text-white" :size="12" stroke-width="4" />
                 </div>
               </div>
               <input 
                 type="color" 
                 :ref="'colorPicker-' + index" 
                 v-model="level.color" 
                 class="sr-only" 
               />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-2">
            <button 
              @click="deleteLevel(level.id)"
              class="flex items-center justify-center gap-2 bg-[#ef4444] text-white px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-900/10 active:scale-95 transition-all cursor-pointer"
            >
              <Trash2 :size="14" />
              Excluir
            </button>
            <button 
              @click="saveLevel(level.id)"
              class="flex items-center justify-center gap-2 bg-[#00A86B] text-white px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-900/10 active:scale-95 transition-all cursor-pointer"
            >
              <Save :size="14" />
              Salvar
            </button>
          </div>
        </div>

        <!-- Add Level Card -->
        <div 
          @click="addLevel"
          class="bg-[#0A0A0A] rounded-[24px] border-2 border-dashed border-[#1A1A1A] flex flex-col items-center justify-center p-6 min-h-[440px] gap-4 group cursor-pointer hover:border-[#D7FF00] hover:bg-[#1A1A1A]/50 transition-all shadow-sm shadow-black/[0.02]"
        >
          <div class="w-20 h-20 rounded-full bg-[#1A1A1A] group-hover:bg-[#D7FF00]/10 flex items-center justify-center text-gray-500 group-hover:text-[#D7FF00] transition-all transform group-hover:scale-110">
            <Plus :size="40" stroke-width="3" />
          </div>
          <div class="flex flex-col items-center">
             <span class="text-[14px] font-black text-gray-500 uppercase tracking-widest group-hover:text-[white] transition-colors">Novo Nível</span>
             <span class="text-[11px] text-gray-500 font-bold group-hover:text-gray-500 mt-1">Clique para criar</span>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Plus, Trash2, Save, Activity } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

export default {
  name: 'SettingsLevelsView',
  components: {
    AdminLayout,
    Plus, Trash2, Save, Activity
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      isSystemActive: true,
      levels: [
        { id: 1, name: 'Bronze', min: '0.00', max: '10000.00', color: '#000000' },
        { id: 2, name: 'Prata', min: '10001.00', max: '100000.00', color: '#6b7280' },
        { id: 3, name: 'Ouro', min: '100001.00', max: '500000.00', color: '#eab308' },
        { id: 4, name: 'Platina', min: '500001.00', max: '1000000.00', color: '#262626' }
      ]
    }
  },
  methods: {
    addLevel() {
      const newId = this.levels.length > 0 ? Math.max(...this.levels.map(l => l.id)) + 1 : 1
      this.levels.push({
        id: newId,
        name: 'Novo Nível',
        min: '0.00',
        max: '0.00',
        color: '#D7FF00'
      })
      this.showToast('Novo nível adicionado', 'success')
    },
    deleteLevel(id) {
      this.levels = this.levels.filter(l => l.id !== id)
      this.showToast('Nível excluído', 'success')
    },
    saveLevel(id) {
      const level = this.levels.find(l => l.id === id)
      this.showToast(`Nível ${level.name} salvo com sucesso!`, 'success')
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

input:focus {
  @apply ring-4 ring-[#D7FF00]/5 border-[#D7FF00];
}

/* Custom scrollbar for cards if needed */
.grid::-webkit-scrollbar {
  width: 6px;
}
.grid::-webkit-scrollbar-track {
  background: transparent;
}
.grid::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
