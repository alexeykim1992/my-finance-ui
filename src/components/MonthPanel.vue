<template>
  <div class="month-panel">
    <button class="month-panel__button"
            @click="prevMonth">
      <i class="far fa-arrow-circle-left"></i>
    </button>
    <div class="month-panel__title">{{ getMonth }}</div>
    <button class="month-panel__button"
            @click="nextMonth">
      <i class="far fa-arrow-circle-right"></i>
    </button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    ...mapGetters({
      getMonth: 'date/getMonthYearString'
    })
  },
  methods: {
    ...mapMutations({
      prevMonth: 'date/prevMonth',
      nextMonth: 'date/nextMonth'
    })
  }
}
</script>

<style scoped lang="scss">
.month-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  &__title {
    font-size: 23px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    width: 220px;
    margin: 0 25px;
  }

  &__button {
    font-size: 40px;
    color: gray;
    border: none;

    &:hover {
      color: darkgray;
    }

    &:active {
      color: black;
    }
  }
}
</style>