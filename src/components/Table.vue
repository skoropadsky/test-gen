<template>
    <div class="tabel">
        <form>
            <span>Фильтр: </span>
            <label v-for="metric of getMetrics" :key="metric.id">
                <input type="checkbox" @click="filterTableMetrics(metric.id)" checked="on" />
                {{ metric.metricName }}
            </label>
        </form>
        <table>
            <thead>
                <tr>
                    <th v-for="header of tableHeaders" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="metric of getTableData"
                    :key="metric.id"
                    @click="drawChart(metric.id); activeRow = metric.id"
                    :class="(metric.id === activeRow) ? 'active': ''"
                >
                    <td>{{ metric.metricName }}</td>
                    <td>{{ metric.difference }}</td>
                    <td v-for="data of metric.metricData" :key="data.date">
                        <input
                            type="number"
                            step="100"
                            :value="data.value"
                            @change="editMetric({ id: metric.id, date: data.date, value: $event.target.value })"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Table",
    data: () => ({
        tableHeaders: ["Показатель", "Разница %"],
        dates: [new Date(2019, 11, 1), new Date(2019, 11, 5)], // defalt deapason date
        activeRow: 0,
        error: ""
    }),
    async mounted() {
        this.tableHeaders = [...this.tableHeaders, ...this.getFormatedDates.reverse()];

        try {
            await this.loadTableData(this.dates);
        } catch (error) {
            this.error = error;
        }
    },
    computed: {
        ...mapGetters(["getTableData","getFormatedDates","getMetrics"])
    },
    methods: {
        ...mapActions(["loadTableData","editMetric","drawChart","filterTableMetrics"])
    }
};
</script>

<style scoped lang="scss">
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 20px auto 0 auto;
    tr {
        cursor: pointer;
        &.active {
            color: #2dd3aa;
            font-weight: 600;
            input {
                color: #2dd3aa;
                font-weight: 600;
            }
        }
    }
    td, th {
        padding: 0;
        height: 40px;
        border: 1px solid #000;
        input {
            height: 100%;
            width: 100%;
            border: none;
            text-align: center;
        }
    }
}
form {
    text-align: left;
    label {
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
