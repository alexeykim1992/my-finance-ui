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
    border: 1px solid $hover-border;
    box-shadow: 0 0 7px 4px $hover-shadow;
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

    & .account-balance__progress {
      background: $asset-value-clr;

      &::-moz-progress-bar {
        background: $asset-progress-clr;
      }

      &::-webkit-progress-bar {
        background: $asset-progress-clr;
      }

      &::-webkit-progress-value {
        background: $asset-value-clr;
      }
    }
  }

  &.account-revenue {
    background: transparent;

    & .account-balance__progress {
      background: $revenue-value-clr;

      &::-moz-progress-bar {
        background: $revenue-progress-clr;
      }

      &::-webkit-progress-bar {
        background: $revenue-progress-clr;
      }

      &::-webkit-progress-value {
        background: $revenue-value-clr;
      }
    }
  }

  &.account-expense {
    background: transparent;

    & .account-balance__progress {
      background: $expense-value-clr;

      &::-moz-progress-bar {
        background: $expense-progress-clr;
      }

      &::-webkit-progress-bar {
        background: $expense-progress-clr;
      }

      &::-webkit-progress-value {
        background: $expense-value-clr;
      }
    }
  }

  &.account-add {
    background: $add-account-btn-clr;
  }
}
</style>