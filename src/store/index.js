import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tableData: []
    },
    getters: {
        getTableData(state) {
            // calc difference of last 2 metric's value and add it to metric object
            state.tableData.forEach(metric => {
                metric.difference = -(100 - (metric.metricData[0].value / metric.metricData[1].value) * 100).toFixed(1);
            });
            return state.tableData;
        }
    },
    actions: {
        async loadTableData({ commit }) {
            try {
                let tableData = await Vue.axios.get("/data.json");
                commit("SET_TABLE_DATA", tableData.data);
            } catch (error) {
                throw error;
            }
        }
    },
    mutations: {
        SET_TABLE_DATA(state, tableData) {
            state.tableData = tableData;
        }
    }
});
