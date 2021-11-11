<template>
  <div class="account-list">
    <account-dialog
        v-model:show="isShowDialog"
        :account-type="type"
        :account="currentAccount"
        @update:show="isShowDialog"/>
    <div class="account-list__top">
      <h3 class="account-list__top-title">{{ name }}</h3>
      <div class="account-list__top-total"> Итого:
        <span class="account-list__top-total-span">
          {{ getTotalBalance(this.type) }}
        </span>
      </div>
    </div>
    <div class="account-list__grid">
      <account-balance
          v-for="account in accounts(type)"
          :account-id="account.id"
          @click="openEditDialog(account.id)"/>
      <account :account-id="-1" @click="openCreateDialog"/>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import Account from "@/components/account/Account";
import AccountBalance from "@/components/account/AccountBalance";
import AccountDialog from "@/components/account/AccountDialog";

export default {
  components: {AccountDialog, Account, AccountBalance},
  data() {
    return {
      isShowDialog: false,
      currentAccount: null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    openCreateDialog() {
      this.currentAccount = null;
      this.isShowDialog = true;
    },
    openEditDialog(accountId) {
      this.currentAccount = this.getAccount(accountId);
      this.isShowDialog = true;
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'account/getAccounts',
      getAccount: 'account/getAccount',
      getTotalBalance: 'account/getTotalBalance'
    })
  }
}
</script>

<style scoped lang="scss">
.account-list {
  margin: 20px 0;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px 10px 30px;

    &-title {
      font-size: 28px;
      font-weight: 800;
    }

    &-total {
      font-size: 22px;
      color: darkgray;

      &-span {
        color: black;
        font-weight: 700;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    padding: 15px;
    width: fit-content;
    border: 1px solid lightgray;
    background: white;
  }
}
</style>