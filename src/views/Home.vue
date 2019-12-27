<template>
  <div class="home">
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";

export default {
  name: "home",
  components: {
    Table
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
