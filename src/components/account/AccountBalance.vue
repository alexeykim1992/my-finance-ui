<template>
  <div class="account-balance" :class="getElement.type">
    <div class="account-balance__container">
      <div class="account-balance__title">{{ getElement.name }}</div>
      <div class="account-balance__icon" :class="getElement.icon"></div>
      <div class="account-balance__title"
           v-show="getElement.type!=='account-add'">
        {{ getBalance }}
      </div>
    </div>
    <progress class="account-balance__progress" max="100"
              :value="getProgress(this.accountId)"/>
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
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 5px;
  color: $account-text-clr;

  &:hover {
    transform: scale(1.1);
    box-shadow: 2px 2px 4px 2px gray;
  }

  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    width: 100%;
    height: 100%;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
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