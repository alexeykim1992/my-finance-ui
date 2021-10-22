<template>
  <div class="container">
    <general-report-table/>
    <revenue-report-table/>
  </div>
</template>

<script>
import GeneralReportTable from "@/components/report/GeneralReportTable";
import RevenueReportTable from "@/components/report/RevenueReportTable";
export default {
  components: {RevenueReportTable, GeneralReportTable}
}
</script>

<style scoped>

</style>