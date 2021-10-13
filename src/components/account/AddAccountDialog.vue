<template>
  <custom-dialog
      v-model:show="show"
      @update:show="this.$emit('update:show', false);"
  >
    <div class="add-account-dialog">
      <div class="add-account-dialog__header">
        <h3 class="add-account-dialog__header-title">Добавить счет</h3>
        <a @click="this.$emit('update:show', false);">
          <i class="add-account-dialog__header-exit far fa-times-circle"></i>
        </a>
      </div>
      <input type="text" name="accountName" class="add-account-dialog__input"
             v-model="account.name">
      <div class="add-account-dialog__icons-panel">
        <div class="add-account-dialog__icon"
             v-for="icon in icons"
             @click="account.icon = icon"
        >
          <i v-if="icon === account.icon"
             class="icon-selected"
             :class="icon"
          />
          <i v-else
             :class="icon"
          />
        </div>
      </div>
      <button class="add-account-dialog__button" @click="addItem">Выбрать</button>
    </div>
  </custom-dialog>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      account: {
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
    }
  },
  computed:{
    ...mapGetters({
      icons: 'icon/getIcons'
    })
  },
  methods: {
    ...mapMutations({
      addAccount: 'account/addAccount'
    }),
    addItem() {
      if (this.account.name !== '') {
        this.account.id = Date.now();
        this.addAccount({...this.account});
        this.account.name = '';
        this.account.icon = this.icons[0];
        this.$emit('update:show', false)
      }
    }
  },
  mounted() {
    this.account.icon = this.icons[0];
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
      background: orange;
    }
  }

  &__button {
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
  }
}
</style>