<template>
  <div class="container main-page">
    <div class="main-page__column">
      <accounts-list
          v-for="at in accountTypes"
          :name="at.name"
          :type="at.type"/>
    </div>
    <div class="main-page__column">
      <transactions-day-list
          :transactionsDayList="transactionsDayList"
      />
    </div>
  </div>
</template>

<script>
import TransactionsDayList from "@/components/TransactionsList";
import AccountsList from "@/components/AccountsList";
import {mapGetters} from "vuex";

export default {
  components: {AccountsList, TransactionsDayList},
  computed: {
    ...mapGetters({
      transactionsDayList: 'transaction/getTransactionDays',
      accountTypes: 'account/getTypes'
    })
  }
}
</script>

<style scoped lang="scss">
.main-page {
  display: flex;
  justify-content: center;

  &__column {
    margin: 0 30px;
  }
}
</style>