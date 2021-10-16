<template>
  <div class="container main-page">
    <transaction-dialog class="container main-page__add-dialog"/>
    <div class="main-page__column column-left">
      <month-panel/>
      <accounts-list
          v-for="at in accountTypes"
          :name="at.name"
          :type="at.type"/>
    </div>
    <div class="main-page__column column-right">
      <transactions-day-list
          :transactionsDayList="transactionsDayList"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionsDayList from "@/components/transaction/TransactionsList";
import AccountsList from "@/components/account/AccountsList";
import TransactionDialog from "@/components/transaction/TransactionDialog";
import MonthPanel from "@/components/MonthPanel";

export default {
  components: {MonthPanel, TransactionDialog, AccountsList, TransactionsDayList},
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 60px;

  &__column {
    &.column-left {
      justify-self: self-end;
    }
  }

  &__add-dialog {
    grid-column: span 2;
  }
}
</style>