<template>
    <div class="chart">
        <p>
            <span @click="isChartCount = true" :class="{ active: isChartCount }">Количество</span> /
            <span @click="isChartCount = false" :class="{ active: !isChartCount }">Разница</span>
        </p>
        <BarChart
            :options="getChartOptions"
            :chart-data="getChartData"
            :styles="getChartStyles"
            class="barChart"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from './BarChart.js';

export default {
    name: "Chart",
    components: {
      BarChart
    },
    data: () => ({
        isChartCount: true
    }),
    computed: {
        ...mapGetters(["getFormatedDates","getCurrentChartData","getCurrentChartDifference"]),
        getChartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
            }
        },
        getChartData() {
            return {
                labels: this.getFormatedDates,
                datasets: [{
                    label: (this.isChartCount) ? 'Количетво' : 'Разница %',
                    data: (this.isChartCount) ? this.getCurrentChartData : this.getCurrentChartDifference,
                    backgroundColor: '#2dd3aa',
                }]
            }
        },
        getChartStyles() {
            return {
                position: 'relative',
                height: '450px',
                top: '20px',
                margin: '0 auto 45px auto',
            }
        }
    }
};
</script>

<style scoped lang="scss">
.chart {
    width: 100%;
}
p span {
    cursor: pointer;
    &.active {
        color: #2dd3aa;
    }
}
</style>
