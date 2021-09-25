<template>
  <transactions-day
      v-for="transactionsDay in transactionsDayList"
      :transactionsDay="transactionsDay"
  />
</template>

<script>
import TransactionsDay from "@/components/TransactionsDay";

export default {
  components: {TransactionsDay},
  props: {
    transactionsDayList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>