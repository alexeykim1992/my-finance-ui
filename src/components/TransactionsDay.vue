<template>
  <div class="transactions-day">
    <div class="transactions-day__date">{{ transactionsDay.date.toLocaleDateString() }}</div>
    <transaction
        v-for="transaction in transactionsDay.transactions"
        :transaction="transaction"
        :key="transaction.id"
    />
    <div class="transactions-day__sum"
         :class="dayBalance > 0 ? 'sum-profit' : 'sum-loss'"
    >
      <span class="transactions-day__sum-span">Итого:</span>
      {{ dayBalance }}
    </div>
  </div>
</template>

<script>
import Transaction from "@/components/Transaction";
import {mapGetters} from "vuex";

export default {
  components: {Transaction},
  props: {
    transactionsDay: {
      date: {
        type: Date,
        required: true
      },
      transactions: {
        type: Array,
        required: true
      }
    }
  },
  computed: {
    dayBalance() {
      return this.getDayBalance(this.transactionsDay.date);
    },
    ...mapGetters({
      getDayBalance: "transaction/getDayBalance"
    })
  }
}
</script>

<style scoped>
.transactions-day {
  width: 500px;
  margin: 20px 0;
}

.transactions-day__date {
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin: 15px 15px 10px;
}

.transactions-day__sum {
  background: bisque;
  padding: 15px;
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid darkgray;
}

.transactions-day__sum.sum-profit {
  color: green;
}

.transactions-day__sum.sum-loss {
  color: red;
}

.transactions-day__sum-span {
  font-weight: 400;
  color: black;
}
</style>