<template>
  <div class="container report-page">
    <general-report-table class="report-page__general"/>
    <revenue-report-table/>
    <expense-report-table/>
  </div>
</template>

<script>
import GeneralReportTable from "@/components/report/GeneralReportTable";
import RevenueReportTable from "@/components/report/RevenueReportTable";
import ExpenseReportTable from "@/components/report/ExpenseReportTable";
import {mapActions} from "vuex";

export default {
  components: {ExpenseReportTable, RevenueReportTable, GeneralReportTable},
  methods:{
    ...mapActions({
      fetchTransactions: 'transaction/fetchTransactions',
      fetchAccounts: 'account/fetchAccounts'
    })
  },
  mounted() {
    this.fetchTransactions();
    this.fetchAccounts();
  }
}
</script>

<style scoped lang="scss">
.report-page{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 60px;

  &__general{
    grid-column: span 2;
  }
}

</style>