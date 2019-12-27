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
        async loadTableData({ commit }, dates) {
            try {
                let tableData = await Vue.axios.get("/data.json", { params: { dates } });
                commit("SET_TABLE_DATA", tableData.data);
            } catch (error) {
                throw error;
            }
        },
        editMetric({ commit }, dataToEdit) {
            // here must be request to backend to edit data
            // if it was successful - commit changes to state
            commit("EDIT_TABLE_DATA", dataToEdit);
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
        }
    }
});
