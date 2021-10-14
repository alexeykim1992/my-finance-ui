<template>
  <custom-dialog
      class="edit-transaction-dialog"
      v-model:show="isShowDialog"
                 @update:show="this.$emit('update:show',false)">
    <h3 class="edit-transaction-dialog__title">Изменение транзакции</h3>
    <transaction-dialog
        @update:show="this.$emit('update:show',false)"
        :transaction="transaction"/>
  </custom-dialog>
</template>

<script>
import CustomDialog from "@/components/UI/CustomDialog";
import TransactionDialog from "@/components/transaction/TransactionDialog";

export default {
  components: {TransactionDialog, CustomDialog},
  props: {
    isShowDialog: {
      type: Boolean,
      required: true
    },
    transaction:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.edit-transaction-dialog{

  &__title{
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>