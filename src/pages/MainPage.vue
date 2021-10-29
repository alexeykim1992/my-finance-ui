<template>
  <div class="container main-page">
    <div class="main-page__top-panel">
      <month-panel class="main-page__top-panel-month"/>
      <transaction-dialog class="main-page__top-panel-dialog"/>
    </div>
    <div class="main-page__column column-left">
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
import {mapActions, mapGetters} from "vuex";
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
  },
  methods: {
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
.main-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 60px;

  &__column {
    &.column-left {
      justify-self: self-end;
    }
  }

  &__top-panel {
    grid-column: span 2;
    display: flex;
    justify-content: center;
    align-items: center;

    &-month{
      padding: 0 20px;
    }
  }
}
</style>