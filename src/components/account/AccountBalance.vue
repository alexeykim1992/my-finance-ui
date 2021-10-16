<template>
  <div class="account" :class="getElement.type">
    <div class="account__title">{{ getElement.name }}</div>
    <div class="account__icon" :class="getElement.icon"></div>
    <div class="account__title"
         v-show="getElement.type!=='account-add'">
      {{ getBalance }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "account",
  data() {
    return {
      isShowDialog: false
    }
  },
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAccount: "account/getAccount",
      getAccountBalance: "account/getBalance"
    }),
    getBalance() {
      return this.getAccountBalance(this.accountId, new Date('2021-09-10'));
    },
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

  &:hover{
    border: 1px solid blue;
    box-shadow: 0 0 7px 4px rgba(0, 0, 255, 0.4);
  }

  &__icon {
    font-size: 50px;
    margin: 5px 0;
  }

  &__title {
    font-size: 18px;
  }

  &.account-asset {
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