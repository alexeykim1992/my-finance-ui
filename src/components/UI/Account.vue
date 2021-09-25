<template>
  <div class="account" :class="getElement.type">
    <div class="account__icon" :class="getElement.icon"></div>
    <div class="account__title">{{ getElement.name }}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
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

<style scoped>
.account {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 120px;
  height: 120px;
}

.account.account-asset {
  background: yellow;
}

.account.account-revenue {
  background: lightblue;
}

.account.account-expense {
  background: orange;
}

.account.account-add {
  background: darkgray;
}

.account__icon {
  font-size: 50px;
  margin-bottom: 7px;
}

.account__title {
  font-size: 18px;
}
</style>