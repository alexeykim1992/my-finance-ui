<template>
  <div class="transaction">
    <account :accountId="transaction.from"></account>
    <div class="transaction_info">
      <div
          class="transaction_value"
          :class="transaction.value > 0 ? 'value-revenue' : 'value-expires'">
        {{ transaction.value }}
      </div>
      <p class="transaction_description">{{ transaction.description }}</p>
    </div>
    <account :accountId="transaction.to"></account>
  </div>
</template>

<script>
import Account from "@/components/UI/Account";

export default {
  components: {Account},
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.transaction {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  border: 1px solid darkgray;
  border-bottom: none;
  width: 100%;
}

.transaction_info {
  background: antiquewhite;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.transaction_value {
  font-size: 30px;
  font-weight: 800;
}

.transaction_value.value-revenue {
  color: green;
}

.transaction_value.value-expires {
  color: red;
}

.transaction_description {
  font-size: 16px;
  color: gray;
}
</style>