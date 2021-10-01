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
      }],
      transactionsDayList:
          [{
            date: new Date('2021-09-25'),
            transactions: [
              {
                id: 1,
                from: 1,
                to: 2,
                value: -100,
                description: "покупки в магазине"
              }, {
                id: 2,
                from: 3,
                to: 4,
                value: -10,
                description: "на работу"
              }, {
                id: 3,
                from: 7,
                to: 1,
                value: 1000,
                description: "Зарплата"
              }]
          }, {
            date: new Date('2021-09-27'),
            transactions: [{
              id: 1,
              from: 1,
              to: 2,
              value: -75,
              description: "покупки в магазине"
            }, {
              id: 2,
              from: 1,
              to: 4,
              value: -30,
              description: "на работу"
            }]
          }, {
            date: new Date('2021-09-23'),
            transactions: [{
              id: 1,
              from: 1,
              to: 2,
              value: -55,
              description: "покупки в магазине"
            }, {
              id: 2,
              from: 3,
              to: 5,
              value: -15,
              description: "Интернет"
            }, {
              id: 3,
              from: 1,
              to: 6,
              value: -300,
              description: "Курсы"
            }]
          }]
    }
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