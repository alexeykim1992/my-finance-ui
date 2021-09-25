<template>
  <div class="account-list">
    <h3 class="account-list__title">{{ name }}</h3>
    <div class="account-list__grid">
      <account
          v-for="account in accounts"
          :account-id="account.id"/>
      <account :account-id="-1" @click="check"/>
    </div>
  </div>
</template>

<script>
import Account from "@/components/UI/Account";

export default {
  components: {Account},
  props: {
    name: {
      type: String,
      required: true
    },
    accounts: {
      type: Array,
      required: true
    }
  },
  methods: {
    check() {
      console.log('yeah')
    }
  }
}
</script>

<style scoped>
.account-list {
  margin: 20px 0;
}

.account-list__title {
  font-size: 25px;
  margin-left: 30px;
  margin-bottom: 7px;
}

.account-list__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 15px;
  width: fit-content;
  border: 1px solid lightgray;
}
</style>