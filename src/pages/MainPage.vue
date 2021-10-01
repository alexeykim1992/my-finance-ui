<template>
  <div class="main-page">
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
  data() {
    return {
      accountTypes: [{
        name: "Доходы",
        type: "account-revenue"
      }, {
        name: "Счета",
        type: "account-asset"
      }, {
        name: "Расходы",
        type: "account-expense"
      }]
    }
  },
  computed: {
    ...mapGetters({
      transactionsDayList: 'transaction/getTransactionDays'
    })
  }
}
</script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
}

.main-page__column {
  margin: 0 30px;
}
</style>