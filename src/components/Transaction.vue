<template>
  <div class="transaction">
    <account :accountId="transaction.from"></account>
    <div class="transaction__info">
      <div
          class="transaction__value"
          :class="transactionType">
        {{ transaction.value }}
      </div>
      <p class="transaction__description">{{ transaction.description }}</p>
    </div>
    <account :accountId="transaction.to"></account>
  </div>
</template>

<script>
import Account from "@/components/UI/Account";
import {mapGetters} from "vuex";

export default {
  components: {Account},
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  computed: {
    transactionType() {
      return this.getTransactionType(this.transaction)
    },
    ...mapGetters({
      getTransactionType: 'transaction/getTransactionType'
    })
  }
}
</script>

<style scoped lang="scss">
.transaction {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  border: 1px solid darkgray;
  border-bottom: none;
  width: 100%;

  &__info {
    background: antiquewhite;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  &__value {
    font-size: 30px;
    font-weight: 800;

    &.value-asset {
      color: #646464;
    }

    &.value-revenue {
      color: green;

      &:before {
        content: "+";
      }
    }

    &.value-expense {
      color: red;

      &:before {
        content: "-";
      }

    }
  }

  &__description {
    font-size: 16px;
    color: gray;
  }
}
</style>