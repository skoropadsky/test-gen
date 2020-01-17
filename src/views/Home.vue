<template>
    <div class="home">
        <Chart />
        <Table />
    </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";
import Chart from "@/components/Chart.vue";

export default {
    name: "home",
    components: {
        Table,
        Chart
    }
};
</script>

<style scoped lang="scss">
.home {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
</style>
