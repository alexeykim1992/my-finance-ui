<template>
  <div class="report">
    <h1 class="report__title">Итоговый отчет</h1>
    <div class="report__table">
      <div class="report__table-row">
        <div class="table-cell">№</div>
        <div class="table-cell"
             v-for="field in getFields">{{ field }}
        </div>
      </div>
      <div class="report__table-row"
           v-for="(row, index) in getGeneralReport">
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
      getFields: state => state.report.fields
    }),
    ...mapGetters({
      getGeneralReport: 'report/getGeneralReport'
    })
  }
}
</script>

<style scoped lang="scss">
.report {
  margin: 30px 0;
  width: 100%;

  &__title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }

  &__table {

    outline: 1px solid #ddd;

    &-row {
      font-size: 16px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      &:nth-of-type(2n){
        background: #f6f6f6;
      }

      &:nth-of-type(2n+1){
        background: #e9e9e9;
      }

      &:first-of-type{
        color: white;
        background: #27ae60;
        font-weight: 600;
      }

      & .table-cell {
        font-size: 16px;
        padding: 7px 15px;
        border: 1px solid darkgray;
      }
    }
  }
}
</style>