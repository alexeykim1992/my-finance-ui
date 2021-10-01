<template>
  <custom-dialog
      v-model:show="show"
      @update:show="this.$emit('update:show', false);"
  >
    <div class="add-account-dialog">
      <h3>Добавить счет</h3>
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
      <button @click="addItem">Выбрать</button>
    </div>
  </custom-dialog>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      icons: [
        "far fa-wallet",
        "far fa-shopping-cart",
        "far fa-credit-card-front",
        "far fa-bus",
        "far fa-globe",
        "far fa-graduation-cap",
        "far fa-briefcase"
      ],
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
  methods: {
    ...mapMutations({
      addAccount: 'account/addAccount'
    }),
    addItem() {
      this.account.id = Date.now();
      this.addAccount({...this.account});
      this.account.name = '';
      this.account.icon = this.icons[0];
      this.$emit('update:show', false)
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

  &__input {
    margin: 15px 0;
  }

  &__icons-panel {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 15px;
  }

  &__icon {
    width: 60px;
    height: 60px;
    font-size: 40px;

    & i {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      width: 100%;
      height: 100%;
    }

    & .icon-selected {
      background: orange;
    }
  }
}
</style>