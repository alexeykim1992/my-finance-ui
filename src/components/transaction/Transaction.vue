<template>
  <edit-transaction-dialog
      :isShowDialog="isShowEdit"
      :transaction="transaction"
      @update:show="hideEditDialog"
  />
  <div class="transaction" @click="showEditDialog">
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
import Account from "@/components/account/Account";
import {mapGetters} from "vuex";
import EditTransactionDialog from "@/components/transaction/EditTransactionDialog";

export default {
  components: {EditTransactionDialog, Account},
  data() {
    return {
      isShowEdit: false
    }
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  computed: {
    transactionType() {
      return this.getTransactionStyle(this.transaction);
    },
    ...mapGetters({
      getTransactionStyle: 'transaction/getTransactionStyle'
    })
  },
  methods: {
    showEditDialog() {
      this.isShowEdit = true;
    },
    hideEditDialog() {
      this.isShowEdit = false;
    }
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

  &:hover{
    position: relative;
    z-index: 1;
    border: 1px solid blue;
    box-shadow: 0 0 7px 4px rgba(0, 0, 255, 0.4);
  }

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
    font-weight: 700;

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