import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dates: [new Date(2019, 11, 1), new Date(2019, 11, 5)],
        tableData: [],
        chartData: [],
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
        getFormatedDates(state) {
            // convert dates to readable format
            let addedDate = state.dates[0];
            let dates = [];
            while (addedDate <= state.dates[1]) {
                dates.push(addedDate.getDate() + "/" + (addedDate.getMonth() + 1));
                addedDate = new Date(addedDate.setDate(addedDate.getDate() + 1));
            }
            return dates;
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
            commit('SET_CHART_DATA', id);
        }
    },
    mutations: {
        SET_TABLE_DATA(state, tableData) {
            state.tableData = tableData;
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
        }
    }
});
