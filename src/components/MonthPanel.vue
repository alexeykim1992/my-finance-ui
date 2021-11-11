<template>
  <div class="month-panel">
    <button class="month-panel__button"
            :class="hasPrevMonth ? '' : 'disabled'"
            :disabled='!hasPrevMonth'
            @click="prevMonth">
      <i class="far fa-arrow-circle-left"></i>
    </button>
    <div class="month-panel__title">{{ getMonth() }}</div>
    <button class="month-panel__button"
            :class="hasNextMonth ? '' : 'disabled'"
            :disabled='!hasNextMonth'
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
      getMonth: 'date/getMonthYearString',
      hasNextMonth: 'date/hasNextMonth',
      hasPrevMonth: 'date/hasPrevMonth'
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

  &__title {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    width: 220px;
    margin: 0 25px;
  }

  &__button {
    font-size: 40px;
    color: gray;
    border: none;

    &.disabled {
      color: darkgray;

      &:active {
        color: darkgray;
      }
    }

    &:hover {
      color: darkgray;
    }

    &:active {
      color: black;
    }
  }
}
</style>