<template>
  <div class="transactions-day">
    <div class="transactions-day__date">{{ transactionsDay.date.toLocaleDateString() }}</div>
    <transaction
        v-for="transaction in transactionsDay.transactions"
        :transaction="transaction"
        :key="transaction.id"/>
    <div class="transactions-day__sum">
      <span class="transactions-day__sum-title">Итого:</span>
      <span class="transactions-day__sum-value"
            :class="dayBalanceStyle">
        {{ dayBalance }}
      </span>
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
    dayBalanceStyle() {
      return this.dayBalance > 0 ? 'sum-profit'
          : this.dayBalance < 0 ? 'sum-loss' : '';
    },
    ...mapGetters({
      getDayBalance: "transaction/getDayBalance"
    })
  }
}
</script>

<style scoped lang="scss">
.transactions-day {
  width: 500px;
  margin: 20px 0;

  &__date {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    margin: 15px 15px 10px;
  }

  &__sum {
    background: bisque;
    padding: 15px;
    text-align: right;
    font-size: 20px;
    font-weight: 600;
    border: 1px solid darkgray;

    &-title {
      margin-right: 15px;
    }

    &-value {
      &.sum-profit {
        color: green;

        &:before {
          content: "+";
        }
      }

      &.sum-loss {
        color: red;
      }

      &-span {
        font-weight: 400;
        color: black;
      }
    }
  }
}
</style>