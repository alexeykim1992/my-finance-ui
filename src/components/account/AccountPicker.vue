<template>
  <div class="account-picker"
       :class="isShow ? 'opened' : ''">
    <account
        @click="this.$emit('toggleShow')"
        :accountId="pickedAccount"/>
    <div
        class="account-picker__grid"
        v-show="isShow">
      <account
          v-for="account in accounts"
          :accountId="account.id"
          class="account-picker__grid-item"
          @click="this.$emit('select-item', account.id)"/>
    </div>
  </div>
</template>

<script>
import Account from "@/components/account/Account";

export default {
  components: {Account},
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    pickedAccount: {
      type: Number,
      required: true
    },
    accounts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.account-picker {
  position: relative;
  z-index: 3;

  &.opened {
    box-shadow: 3px 3px 3px 2px gray;
  }

  &__grid {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 3px 3px 3px 2px gray;

    &-item {
      border-left: 1px solid darkgray;
      border-bottom: 1px solid darkgray;

      &:nth-of-type(3n) {
        border-right: 1px solid darkgray;
      }

      &:nth-of-type(-n+3) {
        border-top: 1px solid darkgray;
      }
    }
  }
}
</style>