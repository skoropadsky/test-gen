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
        error: ""
    }),
    async mounted() {
        this.tableHeaders = [...this.tableHeaders, ...this.getDates];

        try {
            await this.loadTableData(this.dates);
        } catch (error) {
            this.error = error;
        }
    },
    computed: {
        ...mapGetters(["getTableData"]),
        // convert dates to readable format
        getDates() {
            let addedDate = this.dates[1];
            let dates = [];
            while (addedDate >= this.dates[0]) {
                dates.push(addedDate.getDate() + "/" + (addedDate.getMonth() + 1));
                addedDate = new Date(addedDate.setDate(addedDate.getDate() - 1));
            }
            return dates;
        }
    },
    methods: {
        ...mapActions(["loadTableData", "editMetric"])
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
</style>
