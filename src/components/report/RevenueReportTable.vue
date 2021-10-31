<template>
  <div class="report">
    <h1 class="report__title">Отчет по доходам</h1>
    <div class="report__table">
      <div class="report__table-row">
        <div class="table-cell">№</div>
        <div class="table-cell"
             v-for="field in getFields">{{ field }}
        </div>
      </div>
      <div class="report__table-row"
           v-for="(row, index) in getRevenueReport">
        <div class="table-cell">{{ index + 1 }}</div>
        <div class="table-cell"
             v-for="key in row">
          {{ key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      getFields: state => state.report.revenueReport.fields
    }),
    ...mapGetters({
      getRevenueReport: 'report/getRevenueReport'
    })
  }
}
</script>

<style scoped lang="scss">
.report__table-row{
  grid-template-columns: 75px repeat(3, 1fr);
}
</style>