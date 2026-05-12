<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10">
      <!-- Header with Filter -->
      <div class="px-2 font-outfit flex justify-between items-center">
        <h1 class="text-2xl font-black text-white">Dashboard admin</h1>
        
        <!-- Dashboard Date Filter -->
        <div class="relative w-[160px]">
          <select v-model="filterTime" @change="updateDashboardData" class="w-full pl-10 pr-8 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[13px] font-bold text-gray-500 focus:outline-none focus:border-[#D7FF00] appearance-none cursor-pointer transition-all hover:border-gray-700 shadow-sm">
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
            <option value="year">Este ano</option>
          </select>
          <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D7FF00]">
             <Calendar :size="14" />
          </div>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      <!-- Top Stats Grid (4 cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        <div v-for="(card, index) in topCards" :key="index" class="bg-[#D7FF00]/5 p-5 rounded-[20px] shadow-sm border border-[#D7FF00]/20 flex justify-between items-start hover:shadow-md hover:border-[#D7FF00]/40 transition-all group">
          <div class="text-left flex flex-col gap-1">
            <div class="text-[22px] font-bold text-white tracking-tight leading-none">{{ card.value }}</div>
            <div class="text-[13px] text-gray-500 font-bold uppercase tracking-wider">{{ card.label }}</div>
            <div v-if="card.subtext" class="text-[12px] font-bold text-[#D7FF00] mt-1">{{ card.subtext }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00] flex-shrink-0 transition-all group-hover:bg-[#D7FF00] group-hover:text-black">
            <component :is="card.icon" :size="18" stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Middle Section: Chart and Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 px-2">
        <!-- Volume Financeiro (Card 9) -->
        <div class="lg:col-span-2 bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6 relative">
          <h3 class="text-base font-bold text-white">Volume Financeiro</h3>
          
          <div class="relative h-[280px] w-full mt-4 pb-12" @mouseleave="hoveredPoint = null">
            <!-- Y-Axis labels -->
            <div class="absolute left-0 h-[200px] flex flex-col justify-between text-[11px] text-gray-500 font-bold pr-4 pointer-events-none">
              <span>{{ maxChartValue }}</span>
              <span>{{ Math.round(maxChartValue * 0.75) }}</span>
              <span>{{ Math.round(maxChartValue * 0.5) }}</span>
              <span>{{ Math.round(maxChartValue * 0.25) }}</span>
              <span>0</span>
            </div>
            
            <!-- Grid Lines -->
            <div class="ml-12 h-[200px] flex flex-col justify-between border-b border-[#1A1A1A] pointer-events-none">
               <div v-for="i in 4" :key="i" class="w-full border-t border-dashed border-[#1A1A1A] h-0"></div>
            </div>

            <!-- Plotting Area -->
            <div class="absolute top-0 left-12 right-0 h-[200px] overflow-visible">
              <svg 
                :key="filterTime"
                class="w-full h-full overflow-visible" 
                viewBox="0 0 1000 200" 
                preserveAspectRatio="none"
              >
                <!-- Area -->
                <path :d="mainAreaPath" fill="url(#chartGradient)" class="chart-path-area" />
                
                <!-- Main Line -->
                <path 
                  :d="mainLinePath" 
                  fill="none" 
                  stroke="#D7FF00" 
                  stroke-width="5" 
                  stroke-linecap="round"
                  class="chart-line-main"
                />

                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#D7FF00" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="#D7FF00" stop-opacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- HTML Dots -->
              <div 
                v-for="(point, idx) in chartData" 
                :key="'dot-' + idx"
                class="absolute w-3 h-3 bg-[#D7FF00] border-2 border-[#0A0A0A] rounded-full shadow-md z-10 transition-all duration-300 dot-grow"
                :class="{ 'scale-150 z-20 shadow-lg': hoveredPoint === idx }"
                :style="{ 
                  left: `${getXPercent(idx)}%`, 
                  top: `${getYPercentInternal(point.value)}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${idx * 0.1}s`
                }"
              ></div>

              <!-- Hover Interactivity -->
              <div 
                v-for="(point, idx) in chartData" 
                :key="'hover-' + idx"
                class="absolute top-0 h-full cursor-pointer z-10 -translate-x-1/2"
                :style="{ 
                  left: `${getXPercent(idx)}%`, 
                  width: `${100 / (chartData.length - 1)}%`,
                  minWidth: '40px'
                }"
                @mouseenter="hoveredPoint = idx"
                @touchstart.prevent="hoveredPoint = idx"
              ></div>

              <!-- Tooltip Modal -->
              <div 
                v-if="hoveredPoint !== null"
                class="absolute z-50 bg-[#0A0A0A] text-white px-3 py-2 rounded-xl text-xs font-bold shadow-2xl pointer-events-none transition-all duration-200 -translate-x-1/2 -translate-y-[145%]"
                :style="{ 
                  left: `${getXPercent(hoveredPoint)}%`, 
                  top: `${getYPercentInternal(chartData[hoveredPoint].value)}%` 
                }"
              >
                <div class="text-gray-500 uppercase text-[10px] tracking-widest mb-0.5">{{ chartData[hoveredPoint].month }}</div>
                <div class="text-[14px]">R$ {{ chartData[hoveredPoint].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
                <div class="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0A0A] rotate-45"></div>
              </div>
            </div>

            <!-- Month Labels -->
            <div class="absolute top-[215px] left-12 right-0 flex justify-between text-[11px] text-gray-500 font-bold px-0">
              <div 
                v-for="idx in chartData.length" 
                :key="'label-'+idx" 
                class="w-0 overflow-visible flex justify-center"
              >
                <span class="whitespace-nowrap font-outfit">{{ chartData[idx-1].month }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Atividade Recente (Card 10) -->
        <div class="bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6">
          <h3 class="text-base font-bold text-white">Atividade Recente</h3>
          <div class="flex flex-col">
            <div v-for="(activity, index) in activities" :key="index" class="py-4 border-b last:border-0 border-[#1A1A1A] flex justify-between items-center group hover:bg-[#0A0A0A]/5 px-2 rounded-lg transition-all cursor-pointer">
              <div class="text-left flex flex-col gap-0.5">
                <div class="text-[14px] font-bold text-white">{{ activity.user }}</div>
                <div class="text-[12px] text-gray-500 font-medium">{{ activity.type }} • {{ activity.time }}</div>
              </div>
              <div class="text-[14px] font-bold text-white">{{ activity.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats Grid (4 cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 mb-8">
        <div v-for="(card, index) in bottomCards" :key="index" class="bg-[#D7FF00]/5 p-5 rounded-[20px] shadow-sm border border-[#D7FF00]/20 flex justify-between items-start hover:shadow-md hover:border-[#D7FF00]/40 transition-all group text-left">
          <div class="text-left flex flex-col gap-1">
            <div class="text-[22px] font-bold text-white tracking-tight leading-none text-left">{{ card.value }}</div>
            <div class="text-[13px] text-gray-500 font-bold uppercase tracking-wider text-left">{{ card.label }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00] flex-shrink-0 transition-all group-hover:bg-[#D7FF00] group-hover:text-black">
            <component :is="card.icon" :size="18" stroke-width="2.5" />
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../components/AdminLayout.vue'
import { 
  Wallet, DollarSign, RefreshCw, Clock, 
  Users, ArrowLeftRight, Calendar
} from 'lucide-vue-next'

export default {
  name: 'DashboardView',
  components: {
    AdminLayout,
    Calendar
  },
  data() {
    return {
      filterTime: 'month',
      maxChartValue: 10000,
      hoveredPoint: null,
      chartData: [
        { month: 'Sem 1', value: 3800 },
        { month: 'Sem 2', value: 4500 },
        { month: 'Sem 3', value: 5500 },
        { month: 'Sem 4', value: 7800 }
      ],
      topCards: [
        { label: 'Saldo em carteiras', value: 'R$ 16.865,21', subtext: '+12.5% este mês', icon: Wallet },
        { label: 'Lucro Líquido', value: 'R$ 819,94', icon: DollarSign },
        { label: 'Transações aprovadas', value: '1.259', icon: RefreshCw },
        { label: 'Saques pendentes', value: '11', icon: Clock }
      ],
      bottomCards: [
        { label: 'Usuários cadastrados', value: '67', icon: Users },
        { label: 'Usuários em análise', value: '1', icon: Users },
        { label: 'Saques', value: 'R$ 0,00', icon: ArrowLeftRight },
        { label: 'Saques pendentes', value: 'R$ 0,00', icon: ArrowLeftRight }
      ],
      activities: [
        { user: 'Leandro Caetano', type: 'Entrada', time: '19:13', value: 'R$ 121,00' },
        { user: 'Marcha', type: 'Entrada', time: '19:41', value: 'R$ 25,50' },
        { user: 'aureapag', type: 'Saída', time: '16:06', value: 'R$ 18,40' },
        { user: 'Fernandamegahair', type: 'Entrada', time: '17:18', value: 'R$ 1.500,00' },
        { user: 'sigmapay', type: 'Saída', time: '14:39', value: 'R$ 209,71' }
      ]
    }
  },
  computed: {
    mainLinePath() {
      const points = this.chartData.map((d, i) => [this.getX(i), this.getY(d.value)])
      let path = `M ${points[0][0]} ${points[0][1]}`
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i][0] + points[i + 1][0]) / 2
        const yc = (points[i][1] + points[i + 1][1]) / 2
        path += ` Q ${points[i][0]},${points[i][1]} ${xc},${yc}`
      }
      path += ` L ${points[points.length - 1][0]},${points[points.length - 1][1]}`
      return path
    },
    mainAreaPath() {
      return `${this.mainLinePath} L 1000 200 L 0 200 Z`
    }
  },
  methods: {
    updateDashboardData() {
      // Simulation of data update based on filter
      if (this.filterTime === 'today') {
        this.maxChartValue = 2000
        this.topCards[0].value = 'R$ 1.250,50'
        this.topCards[1].value = 'R$ 85,20'
        this.topCards[2].value = '42'
        this.bottomCards[0].value = '2'
        this.bottomCards[2].value = 'R$ 0,00'
        
        this.chartData = [
          { month: '08:00', value: 100 },
          { month: '10:00', value: 450 },
          { month: '12:00', value: 800 },
          { month: '14:00', value: 1250 }
        ]
        
        this.activities = [
          { user: 'Leandro Caetano', type: 'Entrada', time: '11:13', value: 'R$ 121,00' },
          { user: 'Marcha', type: 'Entrada', time: '10:41', value: 'R$ 25,50' }
        ]
      } else if (this.filterTime === 'week') {
        this.maxChartValue = 10000
        this.topCards[0].value = 'R$ 7.890,15'
        this.topCards[1].value = 'R$ 310,05'
        this.topCards[2].value = '312'
        this.bottomCards[0].value = '18'
        this.bottomCards[2].value = 'R$ 450,00'

        this.chartData = [
          { month: 'Seg', value: 1200 },
          { month: 'Ter', value: 2100 },
          { month: 'Qua', value: 1800 },
          { month: 'Qui', value: 3500 },
          { month: 'Sex', value: 4200 },
          { month: 'Sab', value: 3800 },
          { month: 'Dom', value: 5100 }
        ]
        
        this.activities = [
          { user: 'aureapag', type: 'Saída', time: 'Ontem', value: 'R$ 18,40' },
          { user: 'Fernandamegahair', type: 'Entrada', time: 'Terça', value: 'R$ 1.500,00' },
          { user: 'sigmapay', type: 'Saída', time: 'Segunda', value: 'R$ 209,71' }
        ]
      } else if (this.filterTime === 'month') {
        this.maxChartValue = 10000
        this.topCards[0].value = 'R$ 16.865,21'
        this.topCards[1].value = 'R$ 819,94'
        this.topCards[2].value = '1.259'
        this.bottomCards[0].value = '67'
        this.bottomCards[2].value = 'R$ 1.200,00'

        this.chartData = [
          { month: 'Sem 1', value: 3800 },
          { month: 'Sem 2', value: 4500 },
          { month: 'Sem 3', value: 5500 },
          { month: 'Sem 4', value: 7800 }
        ]
        
        this.activities = [
          { user: 'Leandro Caetano', type: 'Entrada', time: '19:13', value: 'R$ 121,00' },
          { user: 'Marcha', type: 'Entrada', time: '19:41', value: 'R$ 25,50' },
          { user: 'aureapag', type: 'Saída', time: '16:06', value: 'R$ 18,40' }
        ]
      } else {
        // Year
        this.maxChartValue = 60000
        this.topCards[0].value = 'R$ 542.120,00'
        this.topCards[1].value = 'R$ 38.450,00'
        this.topCards[2].value = '15.420'
        this.bottomCards[0].value = '842'
        this.bottomCards[2].value = 'R$ 12.500,00'

        this.chartData = [
          { month: 'Jan', value: 15000 },
          { month: 'Mar', value: 25000 },
          { month: 'Mai', value: 18000 },
          { month: 'Jul', value: 35000 },
          { month: 'Set', value: 42000 },
          { month: 'Nov', value: 51200 }
        ]

        this.activities = [
          { user: 'Empresa Alpha', type: 'Entrada', time: 'Fevereiro', value: 'R$ 5.000,00' },
          { user: 'Beta Corp', type: 'Saída', time: 'Janeiro', value: 'R$ 1.200,00' }
        ]
      }
    },
    getX(index) {
      return (index / (this.chartData.length - 1)) * 1000
    },
    getY(value) {
      return 180 - (value / this.maxChartValue) * 160
    },
    getXPercent(index) {
      return (index / (this.chartData.length - 1)) * 100
    },
    getYPercentInternal(value) {
      return ((180 - (value / this.maxChartValue) * 160) / 200) * 100
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.chart-line-main {
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: draw 2s ease-out forwards;
}

.chart-path-area {
  opacity: 0;
  animation: fadeIn 1.2s ease-out 1s forwards;
}

.chart-page-container {
  padding: 2rem 1rem;
  flex: 1;
  background-color: #000000;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
}

.dot-grow {
  opacity: 0;
  animation: grow 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes grow {
  from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
</style>
