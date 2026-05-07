<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-outfit text-left mb-10">
      <!-- Header -->
      <div class="px-2 font-outfit flex flex-col gap-1">
        <h1 class="text-2xl font-black text-[white]">Dashboard</h1>
        <p class="text-[14px] text-gray-500 font-bold">Visão geral das suas vendas e métricas</p>
      </div>

      <!-- Top Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        <div v-for="(card, index) in topCards" :key="index" class="bg-[#0A0A0A] p-5 rounded-[20px] shadow-sm border border-[#1A1A1A] flex justify-between items-start hover:shadow-md transition-all group">
          <div class="flex flex-col gap-1">
            <div class="text-[22px] font-bold text-[white] tracking-tight leading-none">{{ card.value }}</div>
            <div class="text-[13px] text-gray-500 font-bold uppercase tracking-wider">{{ card.label }}</div>
            <div v-if="card.subtext" class="text-[12px] font-bold text-[#D7FF00] mt-1">{{ card.subtext }}</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#D7FF00]/20 flex items-center justify-center text-[#D7FF00] transition-all group-hover:bg-[#D7FF00] group-hover:text-white">
            <component :is="card.icon" :size="20" stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        <!-- Meios de Pagamento -->
        <div class="lg:col-span-2 bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-8">
          <h3 class="text-base font-bold text-[white]">Meios de Pagamento</h3>
          
          <div class="flex flex-col gap-6">
            <div v-for="(payment, index) in paymentMethods" :key="index" class="flex flex-col gap-3">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-gray-500">
                     <component :is="payment.icon" :size="20" />
                  </div>
                  <span class="font-bold text-[white]">{{ payment.name }}</span>
                </div>
                <div class="flex gap-12 text-right">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Aprovação</span>
                    <span class="text-[14px] font-bold text-[white]">{{ payment.approval }}%</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valor</span>
                    <span class="text-[14px] font-bold text-[white]">{{ payment.value }}</span>
                  </div>
                </div>
              </div>
              <div class="w-full bg-[#1A1A1A] h-2.5 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000" 
                     :style="{ width: payment.approval + '%', backgroundColor: '#D7FF00' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Métricas -->
        <div class="bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6">
          <h3 class="text-base font-bold text-[white]">Métricas</h3>
          <div class="flex flex-col gap-4">
            <div v-for="(metric, index) in metrics" :key="index" 
                 class="p-5 rounded-2xl flex flex-col gap-1 transition-all hover:translate-x-1 border border-[#D7FF00]/20 bg-[#D7FF00]/5">
              <span class="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{{ metric.label }}</span>
              <span class="text-[20px] font-bold text-[white]">{{ metric.value }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        <!-- Volume Financeiro (Advanced Chart) -->
        <div class="lg:col-span-2 bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6 relative">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-bold text-[white]">Volume Financeiro</h3>
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Vendas (R$)</span>
          </div>
          
          <div class="relative h-[280px] w-full mt-4 pb-12" @mouseleave="hoveredPoint = null">
            <!-- Y-Axis labels -->
            <div class="absolute left-0 h-[200px] flex flex-col justify-between text-[11px] text-gray-500 font-bold pr-4 pointer-events-none text-right w-10">
              <span>{{ maxChartValue }}</span>
              <span>{{ Math.round(maxChartValue * 0.5) }}</span>
              <span>0</span>
            </div>
            
            <!-- Grid Lines -->
            <div class="ml-12 h-[200px] flex flex-col justify-between border-b border-[#1A1A1A] pointer-events-none">
               <div v-for="i in 2" :key="i" class="w-full border-t border-dashed border-[#1A1A1A] h-0"></div>
            </div>

            <!-- Plotting Area -->
            <div class="absolute top-0 left-12 right-0 h-[200px] overflow-visible text-[#D7FF00]">
              <svg 
                class="w-full h-full overflow-visible" 
                viewBox="0 0 1000 200" 
                preserveAspectRatio="none"
              >
                <!-- Area -->
                <path :d="mainAreaPath" fill="url(#chartGradientHarmonized)" class="chart-path-area" />
                
                <!-- Main Line -->
                <path 
                  :d="mainLinePath" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="5" 
                  stroke-linecap="round"
                  class="chart-line-main"
                />

                <defs>
                  <linearGradient id="chartGradientHarmonized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="currentColor" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="currentColor" stop-opacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- HTML Dots -->
              <div 
                v-for="(point, idx) in chartData" 
                :key="'dot-' + idx"
                class="absolute w-3 h-3 bg-[#D7FF00] border-2 border-white rounded-full shadow-md z-10 transition-all duration-300 dot-grow"
                :class="{ 'scale-150 z-20 shadow-lg': hoveredPoint === idx }"
                :style="{ 
                  left: `${getXPercent(idx)}%`, 
                  top: `${getYPercentInternal(point.value)}%`,
                  transform: 'translate(-50%, -50%)'
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
              ></div>

              <!-- Tooltip Modal -->
              <div 
                v-if="hoveredPoint !== null"
                class="absolute z-50 bg-[#313131] text-white px-3 py-2 rounded-xl text-xs font-bold shadow-2xl pointer-events-none transition-all duration-200 -translate-x-1/2 -translate-y-[145%]"
                :style="{ 
                  left: `${getXPercent(hoveredPoint)}%`, 
                  top: `${getYPercentInternal(chartData[hoveredPoint].value)}%` 
                }"
              >
                <div class="text-gray-500 uppercase text-[10px] tracking-widest mb-0.5">{{ chartData[hoveredPoint].month }}</div>
                <div class="text-[14px]">R$ {{ chartData[hoveredPoint].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</div>
                <div class="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#313131] rotate-45"></div>
              </div>
            </div>

            <!-- Month Labels -->
            <div class="absolute top-[215px] left-12 right-0 flex justify-between text-[11px] text-gray-500 font-bold px-0">
               <span v-for="point in chartData" :key="point.month">{{ point.month }}</span>
            </div>
          </div>
        </div>

        <!-- Atividade Recente -->
        <div class="bg-[#0A0A0A] p-6 rounded-[20px] shadow-sm border border-[#1A1A1A] flex flex-col gap-6">
          <h3 class="text-base font-bold text-[white]">Atividade Recente</h3>
          <div class="flex flex-col">
            <div v-for="(sale, index) in recentSales" :key="index" class="py-4 border-b last:border-0 border-[#1A1A1A] flex justify-between items-center group hover:bg-[#1A1A1A]/50 px-2 rounded-lg transition-all cursor-pointer">
              <div class="text-left flex flex-col gap-0.5">
                <div class="text-[14px] font-bold text-[white]">{{ sale.type }}</div>
                <div class="text-[12px] text-gray-500 font-bold uppercase tracking-wider">{{ sale.date }}</div>
              </div>
              <div class="text-[14px] font-bold text-[white]">{{ sale.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { 
  DollarSign, TrendingUp, ShoppingCart, Ticket, 
  CreditCard, LayoutDashboard, Globe
} from 'lucide-vue-next'

export default {
  name: 'UserOverview',
  components: {
    AdminLayout
  },
  data() {
    return {
      hoveredPoint: null,
      maxChartValue: 12000,
      chartData: [
        { month: '00:00', value: 1000 },
        { month: '04:00', value: 2500 },
        { month: '08:00', value: 4800 },
        { month: '12:00', value: 7200 },
        { month: '16:00', value: 9500 },
        { month: '20:00', value: 11000 },
        { month: '22:00', value: 9000 }
      ],
      topCards: [
        { label: 'Saldo disponível', value: 'R$ 0,00', subtext: 'Pendente: R$ 0,00', icon: DollarSign },
        { label: 'Vendas Realizadas', value: 'R$ 29.294,17', icon: TrendingUp },
        { label: 'Quantidade de vendas', value: '270', icon: ShoppingCart },
        { label: 'Ticket médio', value: 'R$ 108,50', icon: Ticket }
      ],
      paymentMethods: [
        { name: 'Pix', icon: Globe, approval: 21.58, value: 'R$ 29.294,17' },
        { name: 'Boleto', icon: LayoutDashboard, approval: 0.0, value: 'R$ 0,00' },
        { name: 'Cartão', icon: CreditCard, approval: 0.0, value: 'R$ 0,00' }
      ],
      metrics: [
        { label: 'Abandono C.', value: 0 },
        { label: 'Reembolso', value: 0 },
        { label: 'Charge Back', value: 0 },
        { label: 'MED', value: 0 }
      ],
      recentSales: [
        { date: '07/01/2026', type: 'Pagamento recebido', value: 'R$ 5,00' },
        { date: '06/01/2026', type: 'Pagamento recebido', value: 'R$ 11,00' },
        { date: '05/01/2026', type: 'Pagamento recebido', value: 'R$ 10,00' },
        { date: '27/12/2025', type: 'Pagamento recebido', value: 'R$ 20,68' }
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

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

.chart-line-main {
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: draw 2s ease-out forwards;
}

.chart-path-area {
  opacity: 0;
  animation: fadeIn 1.2s ease-out 1s forwards;
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
