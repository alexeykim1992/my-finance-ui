<template>
  <div class="add-transaction-dialog">
    <account-picker
        class="add-transaction-dialog__picker"
        :isShow="isShowSources"
        :picked-account="newValue.from"
        :accounts="getSources"
        @toggleShow="toggleSources"
        @select-item="selectSource"
    />
    <div class="add-transaction-dialog__form">
      <input type="date" placeholder="дата" v-model="newValue.date"
             class="add-transaction-dialog__form-input input-date"
             required>
      <input type="number" placeholder="сумма" min="1" v-model="newValue.value"
             class="add-transaction-dialog__form-input input-value"
             required>
      <input type="text" placeholder="описание" v-model="newValue.description"
             class="add-transaction-dialog__form-input input-description">
    </div>
    <account-picker
        class="add-transaction-dialog__picker"
        :isShow="isShowDestinations"
        :picked-account="newValue.to"
        :accounts="getDestinations"
        @toggleShow="toggleDestinations"
        @select-item="selectDestination"/>
    <button class="add-transaction-dialog__button" @click="createTransaction">{{ buttonTitle }}</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Account from "@/components/account/Account";
import AccountsGrid from "@/components/account/AccountPicker";
import AccountPicker from "@/components/account/AccountPicker";

export default {
  components: {AccountPicker, AccountsGrid, Account},
  data() {
    return {
      newValue: {
        id: -1,
        date: this.today,
        from: 0,
        to: 0,
        value: '',
        description: ''
      },
      isShowSources: false,
      isShowDestinations: false
    }
  },
  props: {
    transaction: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapActions({
      addTransaction: 'transaction/addTransaction',
      editTransaction: 'transaction/editTransaction'
    }),
    createTransaction() {
      if (this.newValue.value !== '' && this.date !== '') {
        if (this.transaction === null) {
          this.newValue.id = Date.now();
          this.addTransaction({...this.newValue});
        } else {
          this.editTransaction({...this.newValue});
        }
        this.date = this.today;
        this.newValue.value = '';
        this.newValue.description = '';
        this.$emit('update:show', false);
      }
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
      this.newValue.from = accountId;
      this.isShowSources = false;
    },
    selectDestination(accountId) {
      this.newValue.to = accountId;
      this.isShowDestinations = false;
    },
  },
  computed: {
    ...mapGetters({
      getAccount: 'account/getAccount',
      getAccounts: 'account/getAccounts',
      today: 'date/getToday',
      getDate: 'date/getDate'
    }),
    buttonTitle() {
      return this.transaction === null ? 'Добавить' : 'Изменить';
    },
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
      let source = this.getAccount(this.newValue.from);
      if (source !== undefined) {
        if (source.type === 'account-revenue') {
          result = this.getAccounts('account-asset');
        } else {
          result = result.filter(account => account.id !== source.id);
        }
      }
      if (result.find(account => account.id === this.newValue.to) === undefined) {
        this.newValue.to = result.length === 0 ? -1 : result[0].id;
      }
      return result;
    }
  },
  watch: {
    getSources(newSources) {
      if (this.newValue.from === -1 && newSources.length !== 0)
        this.newValue.from = newSources[0].id;
    },
    getDestinations(newDestinations) {
      if (this.newValue.to === -1 && newDestinations.length !== 0)
        this.newValue.to = newDestinations[0].id;
    }
  },
  mounted() {
    if (this.transaction === null) {
      this.newValue.date = this.today;
      this.newValue.from = this.getSources.length === 0 ? -1 : this.getSources[0].id;
      this.newValue.to = this.getDestinations.length === 0 ? -1 : this.getDestinations[0].id;
    } else {
      this.newValue = {...this.transaction};
      this.newValue.date = this.getDate(this.newValue.date);
    }
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

    &:hover {
      background: lightgray;
    }

    &:active {
      background: darkgray;
    }
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