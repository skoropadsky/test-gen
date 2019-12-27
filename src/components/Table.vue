<template>
    <div class="tabel">
        <table>
            <thead>
                <tr>
                    <th v-for="header of tableHeaders" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="metric of getTableData" :key="metric.id">
                    <td>{{ metric.metricName }}</td>
                    <td>{{ metric.difference }}</td>
                    <td v-for="data of metric.metricData" :key="data.date">
                        {{ data.value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Table",
    data: () => ({
        tableHeaders: ["Показатель", "Разница %"],
        tableMetrics: [],
        dateFrom: new Date(2019, 11, 1),
        dateTo: new Date(2019, 11, 5),
        error: ""
    }),
    async mounted() {
        try {
            await this.loadTableData();
            this.tableHeaders = [...this.tableHeaders, ...this.getDates];
        } catch (error) {
            this.error = error;
        }
    },
    computed: {
        ...mapGetters(["getTableData"]),
        getDates() {
            let addedDate = this.dateTo;
            let dates = [];
            while (addedDate >= this.dateFrom) {
                dates.push(addedDate.getDate() + "/" + (addedDate.getMonth() + 1));
                addedDate = new Date(addedDate.setDate(addedDate.getDate() - 1));
            }
            return dates;
        }
    },
    methods: {
        ...mapActions(["loadTableData"])
    }
};
</script>

<style scoped lang="scss">
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    td,
    th {
        height: 40px;
        border: 1px solid #000;
    }
}
</style>
