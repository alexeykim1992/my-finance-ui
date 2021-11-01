<template>
  <custom-dialog
      v-model:show="show"
      @update:show="this.$emit('update:show', false);">
    <div class="add-account-dialog">
      <div class="add-account-dialog__header">
        <h3 class="add-account-dialog__header-title">{{ dialogTitle }}</h3>
        <a @click="this.$emit('update:show', false);">
          <i class="add-account-dialog__header-exit far fa-times-circle"></i>
        </a>
      </div>
      <input type="text" name="accountName" class="add-account-dialog__input"
             v-model="newValue.name">
      <div class="add-account-dialog__icons-panel">
        <div class="add-account-dialog__icon"
             v-for="icon in icons"
             @click="newValue.icon = icon">
          <i v-if="icon === newValue.icon"
             class="icon-selected"
             :class="[icon, this.accountType]"/>
          <i v-else
             :class="icon"/>
        </div>
      </div>
      <button class="add-account-dialog__button" @click="commit">{{ buttonTitle }}</button>
    </div>
  </custom-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      newValue: {
        id: '',
        name: '',
        type: this.accountType,
        icon: ''
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    accountType: {
      type: String,
      required: true
    },
    account: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      icons: 'icon/getIcons'
    }),
    dialogTitle() {
      let result = this.account === null ? 'Добавить ' : 'Изменить ';
      if (this.accountType === 'account-revenue') {
        return result + 'доход';
      } else if (this.accountType === 'account-asset') {
        return result + 'счёт';
      } else if (this.accountType === 'account-expense') {
        return result + 'расход';
      } else {
        return 'неизвестно';
      }
    },
    buttonTitle() {
      return this.account === null ? 'Добавить' : 'Изменить';
    }
  },
  methods: {
    ...mapActions({
      addAccount: 'account/addAccount',
      editAccount: 'account/editAccount'
    }),
    commit() {
      if (this.newValue.name !== '') {
        if (this.account === null) {
          this.newValue.id = Date.now();
          this.addAccount({...this.newValue});
        } else {
          this.editAccount({...this.newValue});
        }
        this.newValue.name = '';
        this.newValue.icon = this.icons[0];
        this.$emit('update:show', false)
      }
    },
  },
  mounted() {
    if (this.account === null) {
      this.newValue.icon = this.icons[0];
    }
  },
  watch: {
    show() {
      if (this.account === null) {
        this.newValue = {
          id: '',
          name: '',
          type: this.accountType,
          icon: this.icons[0]
        }
      } else {
        this.newValue = {...this.account};
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-account-dialog {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 25px;
      line-height: 18px;
    }

    &-exit {
      font-size: 30px;
      color: red;
    }
  }


  &__input {
    font-size: 16px;
    padding: 5px 15px;
    margin: 15px 0;
  }

  &__icons-panel {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 20px;
  }

  &__icon {
    width: 60px;
    height: 60px;
    font-size: 40px;

    & i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    & .icon-selected {
      background: gray;

      &.account-revenue {
        background: lightblue;
      }

      &.account-asset {
        background: yellow;
      }

      &.account-expense {
        background: orange;
      }

    }
  }

  &__button {
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
  }
}
</style>