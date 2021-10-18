<template>
  <div>
    <table>
      <caption>Итоговый отчет</caption>
      <thead>
      <tr>
        <td>№</td>
        <td>Месяц</td>
        <td>Доход</td>
        <td>Расход</td>
        <td>Итого</td>
      </tr>
      </thead>
      <tr v-for="row in getGeneralReport">
        <td>1</td>
        <td>{{ row.month }}</td>
        <td>{{ row.revenue }}</td>
        <td>{{ row.expense }}</td>
        <td>{{ row.total }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      getGeneralReport: 'report/getGeneralReport'
    })
  }
}
</script>

<style scoped>

</style>