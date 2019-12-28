<template>
    <div class="chart">
        <BarChart
            :options="getChartOptions"
            :chart-data="getChartData"
            :styles="getChartStyles"
            class="barChart"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from './BarChart.js';

export default {
    name: "Chart",
    components: {
      BarChart
    },
    data: () => ({
    }),
    async mounted() {
    },
    computed: {
        ...mapGetters(["getFormatedDates","getCurrentChartData"]),
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
                    label: 'Количетво',
                    data: this.getCurrentChartData,
                    backgroundColor: '#2dd3aa',
                }]
            }
        },
        getChartStyles() {
            return {
                position: 'relative',
                height: '500px',
                top: '20px',
                margin: '0 auto 45px auto',
            }
        }
    },
    methods: {
        ...mapActions([])
    }
};
</script>

<style scoped lang="scss">
.chart {
    width: 100%;
}
</style>
