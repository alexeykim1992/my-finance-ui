<template>
  <div class="add-transaction-dialog">
    <account-picker
        class="add-transaction-dialog__picker"
        :isShow="isShowSources"
        :picked-account="sourceId"
        :accounts="getSources"
        @toggleShow="toggleSources"
        @select-item="selectSource"
    />
    <div class="add-transaction-dialog__form">
      <input type="date" placeholder="дата" v-model="date"
             class="add-transaction-dialog__form-input input-date"
             required>
      <input type="number" placeholder="сумма" min="1" v-model="value"
             class="add-transaction-dialog__form-input input-value"
             required>
      <input type="text" placeholder="описание" v-model="description"
             class="add-transaction-dialog__form-input input-description">
    </div>
    <account-picker
        class="add-transaction-dialog__picker"
        :isShow="isShowDestinations"
        :picked-account="destinationId"
        :accounts="getDestinations"
        @toggleShow="toggleDestinations"
        @select-item="selectDestination"/>
    <button class="add-transaction-dialog__button" @click="createTransaction">Добавить</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import Account from "@/components/UI/Account";
import AccountsGrid from "@/components/AccountPicker";
import AccountPicker from "@/components/AccountPicker";

export default {
  components: {AccountPicker, AccountsGrid, Account},
  data() {
    return {
      sourceId: 0,
      destinationId: 0,
      date: this.today,
      value: '',
      description: '',
      isShowSources: false,
      isShowDestinations: false
    }
  },
  methods: {
    ...mapMutations({
      addTransaction: 'transaction/addTransaction'
    }),
    createTransaction() {
      this.addTransaction({
        date: new Date(this.date),
        transaction: {
          id: Date.now(),
          from: this.sourceId,
          to: this.destinationId,
          value: this.value,
          description: this.description
        }
      })
      this.date = this.today;
      this.value = '';
      this.description = '';
    },
    toggleSources() {
      this.isShowSources = !this.isShowSources;
      this.isShowDestinations = false;
    },
    toggleDestinations() {
      this.isShowDestinations = !this.isShowDestinations;
      this.isShowSources = false;
    },
    selectSource(accountId) {
      this.sourceId = accountId;
      this.isShowSources = false;
    },
    selectDestination(accountId) {
      this.destinationId = accountId;
      this.isShowDestinations = false;
    }
  },
  computed: {
    ...mapGetters({
      getAccount: 'account/getAccount',
      getAccounts: 'account/getAccounts',
      today: 'date/getToday'
    }),
    getSources() {
      return [
        ...this.getAccounts('account-revenue'),
        ...this.getAccounts('account-asset')
      ]
    },
    getDestinations() {
      let result = [
        ...this.getAccounts('account-asset'),
        ...this.getAccounts('account-expense')
      ];
      let source = this.getAccount(this.sourceId);
      if (source !== undefined) {
        if (source.type === 'account-revenue')
          result = this.getAccounts('account-asset');
      }
      if (result.find(account => account.id === this.destinationId) === undefined) {
        this.destinationId = result[0].id;
      }
      return result;
    }
  },
  mounted() {
    this.date = this.today;
    this.sourceId = this.getSources[0].id;
    this.destinationId = this.getDestinations[0].id;
  }
}
</script>

<style scoped lang="scss">
.add-transaction-dialog {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 2fr;
  width: 800px;

  &__form {
    display: flex;
    flex-direction: column;

    &-input {
      font-size: 18px;
      text-align: end;
      padding: 7px 30px;
      border: 1px solid lightgray;

      &.input-value {
        font-size: 20px;
        font-weight: 600;
      }

      &.input-description {
        color: darkgray;
      }

      &:focus {
        outline: none !important;
        border: 1px solid darkgray;
        box-shadow: 0 0 10px #719ECE;
      }
    }
  }

  &__button {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    border: 1px solid darkgray;
  }

  &__picker {
    position: relative;

    &-grid {
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>