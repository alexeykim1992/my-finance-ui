<template>
  <div class="account-list">
    <account-dialog
        v-model:show="isShowDialog"
        :account-type="type"
        :account="currentAccount"
        @update:show="isShowDialog"/>
    <h3 class="account-list__title">{{ name }}</h3>
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
      getAccount: 'account/getAccount'
    })
  }
}
</script>

<style scoped lang="scss">
.account-list {
  margin: 20px 0;

  &__title {
    font-size: 25px;
    margin-left: 30px;
    margin-bottom: 10px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    padding: 15px;
    width: fit-content;
    border: 1px solid lightgray;
  }
}
</style>