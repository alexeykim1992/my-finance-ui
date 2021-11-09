<template>
  <div class="account" :class="getElement.type">
    <div class="account__icon" :class="getElement.icon"></div>
    <div class="account__title">{{ getElement.name }}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "account",
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAccount: "account/getAccount"
    }),
    getElement() {
      let result = this.getAccount(this.accountId);
      return result !== undefined ? result : {
        id: 0,
        name: "Добавить",
        type: "account-add",
        icon: "far fa-plus-circle"
      };
    }
  }
}
</script>

<style scoped lang="scss">
.account {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 120px;
  height: 120px;
  color: $account-text-clr;

  &__icon {
    font-size: 50px;
    margin: 5px 0;
  }

  &__title {
    font-size: 18px;
    margin-top: 5px;
    text-align: center;
    width: max-content;
  }

  &.account-asset {
    background: $asset-clr;
  }

  &.account-revenue {
    background: $revenue-clr;
  }

  &.account-expense {
    background: $expense-clr;
  }

  &.account-add {
    background: $add-account-btn-clr;
    border-radius: 5px;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>