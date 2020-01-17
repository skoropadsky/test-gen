import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dates: [new Date(2019, 11, 1), new Date(2019, 11, 5)],
        tableData: [],
        chartData: [],
        metrics: []
    },
    getters: {
        getTableData(state) {
            // calc difference of last 2 metric's value and add it to metric object
            state.tableData.forEach(metric => {
                metric.difference = -(100 - (metric.metricData[0].value / metric.metricData[1].value) * 100).toFixed(1);
            });
            return state.tableData;
        },
        getCurrentChartData(state) {
            return state.chartData.map(metricData => metricData.value).reverse();
        },
        getCurrentChartDifference(state) {
            return state.chartData
                .map((metricData, i, arr) => {
                    // if we have data for previos day
                    if (arr[i + 1]) {
                        // calc difference between this day and previos
                        return -(100 - (metricData.value / arr[i + 1].value) * 100).toFixed(1);
                    } else {
                        return 0;
                    }
                })
                .reverse();
        },
        getFormatedDates(state) {
            // convert dates to readable format
            let addedDate = state.dates[0];
            let dates = [];
            while (addedDate <= state.dates[1]) {
                dates.push(addedDate.getDate() + "/" + (addedDate.getMonth() + 1));
                addedDate = new Date(addedDate.setDate(addedDate.getDate() + 1));
            }
            return dates;
        },
        getMetrics(state) {
            return state.metrics;
        }
    },
    actions: {
        async loadTableData({ commit }, dates) {
            // add user dates to state
            commit("SET_DATES", dates);
            // here must be getting data from API for current period, but now it loads from json file
            try {
                let tableData = await Vue.axios.get("/data.json", { params: { dates } });
                commit("SET_TABLE_DATA", tableData.data);
            } catch (error) {
                throw error;
            }
        },
        editMetric({ commit }, dataToEdit) {
            // here must be API-request to edit data
            // if it was successful - commit changes to state
            commit("EDIT_TABLE_DATA", dataToEdit);
        },
        drawChart({ commit }, id) {
            // here may be API-method to load data for current metric
            commit("SET_CHART_DATA", id);
        },
        filterTableMetrics({ commit }, id) {
            // here may be API-method to hide metric
            commit("FILTER_METRICS", id);
        }
    },
    mutations: {
        SET_TABLE_DATA(state, tableData) {
            state.tableData = tableData;
            state.metrics = tableData;
        },
        EDIT_TABLE_DATA(state, dataToEdit) {
            state.tableData.forEach(metric => {
                if (metric.id === dataToEdit.id) {
                    metric.metricData.forEach(data => {
                        if (data.date === dataToEdit.date) data.value = dataToEdit.value;
                    });
                }
            });
        },
        SET_DATES(state, dates) {
            state.dates = dates;
        },
        SET_CHART_DATA(state, id) {
            state.chartData = state.tableData.find(metric => metric.id === id).metricData || [];
        },
        FILTER_METRICS(state, id) {
            let metric = state.tableData.find(metric => metric.id === id);
            // if this metric exist in table data
            if (metric) {
                // remove metric from tableData
                state.tableData = state.tableData.filter(metric => metric.id !== id);
            } else {
                // add metric to tableData
                state.tableData.splice(
                    id - 1,
                    0,
                    state.metrics.find(metric => metric.id === id)
                );
            }
        }
    }
});
