<template>
  <div class="nav">
    <div class="container nav__content">
      <ul class="nav__list">
        <li><h1><a href="/welcome" class="nav__logo">
          <i class="far fa-piggy-bank"></i>
          MyFinance
        </a></h1></li>
        <li><a href="/" class="nav__list-link">Главная</a></li>
        <li><a href="/report" class="nav__list-link">Отчет</a></li>
        <li><a href="/about" class="nav__list-link">О приложении</a></li>
      </ul>
      <a href="/user" class="nav__user">
        <p class="nav__user-name">{{ userName }}</p>
        <i class="far fa-user nav__user-icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      userName: state => state.user.current.name
    })
  },
  methods: {
    ...mapActions({
      getUser: 'user/getCurrentUser'
    })
  },
  mounted() {
    this.getUser();
  }
}
</script>

<style scoped lang="scss">
.nav {
  background: white;
  border-bottom: 1px solid darkgray;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
  }

  &__list {
    display: flex;
    align-items: flex-end;

    &-link {
      font-size: 22px;
      font-weight: 600;
      margin-left: 15px;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    font-size: 35px;
    margin-right: 15px;
    line-height: 35px;

    & i {
      font-size: 50px;
      margin-right: 7px;
      line-height: 35px;
    }
  }

  &__user {
    display: flex;
    align-items: center;

    &-name {
      font-size: 20px;
    }

    & i {
      font-size: 40px;
      margin-left: 15px;
    }
  }
}
</style>