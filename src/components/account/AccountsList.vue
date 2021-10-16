<template>
  <div class="account-list">
    <account-dialog
        v-model:show="dialogVisible"
        :account-type="type"
        @update:show="dialogVisible"
    />
    <h3 class="account-list__title">{{ name }}</h3>
    <div class="account-list__grid">
      <account-balance
          v-for="account in accounts(type)"
          :account-id="account.id"/>
      <account :account-id="-1" @click="openDialog"/>
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
      dialogVisible: false
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
    openDialog() {
      this.dialogVisible = true;
    },
  },
  computed: {
    ...mapGetters({
      accounts: 'account/getAccounts'
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