<template>
  <div class="account" :class="getElement.type">
    <div class="account__icon" :class="getElement.icon"></div>
    <div class="account__title">{{ getElement.name }}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "account",
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.account.accounts
    }),
    getElement() {
      let result = this.accounts.find(account => {
        if (account.id === this.accountId) {
          return account;
        }
      });
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

  &__icon {
    font-size: 50px;
    margin-bottom: 7px;
  }

  &__title {
    font-size: 18px;
  }

  &.account-asset{
    background: yellow;
  }

  &.account-revenue {
    background: lightblue;
  }

  &.account-expense {
    background: orange;
  }

  &.account-add {
    background: darkgray;
  }
}
</style>