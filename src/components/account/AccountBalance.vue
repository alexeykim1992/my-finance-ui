<template>
  <div class="account-balance" :class="getElement.type">
    <div class="account-balance__title">{{ getElement.name }}</div>
    <div class="account-balance__icon" :class="getElement.icon"></div>
    <div class="account-balance__title"
         v-show="getElement.type!=='account-add'">
      {{ getBalance }}
    </div>
    <progress class="account-balance__progress" max="100" :value="getProgress(this.accountId)"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Account from "@/components/account/Account";

export default {
  name: "account-balance",
  components: {Account},
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
      getAccount: 'account/getAccount',
      getAccountBalance: 'account/getBalance',
      getProgress: 'account/getProgress'
    }),
    getBalance() {
      return this.getAccountBalance(this.accountId);
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
.account-balance {
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 120px;
  height: 120px;
  border-radius: 5px;

  &:hover {
    border: 1px solid blue;
    box-shadow: 0 0 7px 4px rgba(0, 0, 255, 0.4);
  }

  &__icon {
    font-size: 50px;
    margin: 5px 0;
  }

  &__title {
    font-size: 18px;
    text-align: center;
    width: max-content;
  }

  &__progress {
    display: block;
    appearance: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: rotate(-90deg);
  }


  &.account-asset {
    background: transparent;
    //background: yellow;

    & .account-balance__progress {
      background: lightgreen;

      &::-moz-progress-bar {
        background: lightgreen;
      }

      &::-webkit-progress-bar {
        background: lightgreen;
      }

      &::-webkit-progress-value {
        background: yellow;
      }
    }
  }

  &.account-revenue {
    background: transparent;
    //background: lightblue;

    & .account-balance__progress {
      background: lightblue;

      &::-moz-progress-bar {
        background: aquamarine;
      }

      &::-webkit-progress-bar {
        background: aquamarine;
      }

      &::-webkit-progress-value {
        background: lightblue;
      }
    }
  }

  &.account-expense {
    background: transparent;
    //background: orange;

    & .account-balance__progress {
      background: orange;

      &::-moz-progress-bar {
        background: darkorange;
      }

      &::-webkit-progress-bar {
        background: darkorange;
      }

      &::-webkit-progress-value {
        background: orange;
      }
    }
  }

  &.account-add {
    background: darkgray;
  }
}
</style>