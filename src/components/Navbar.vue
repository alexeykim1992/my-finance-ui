<template>
  <div class="nav">
    <ul class="nav__list">
      <li><h1><a href="/welcome" class="nav__logo">
        <i class="far fa-piggy-bank"></i>
        MyFinance
      </a></h1></li>
      <li><a href="/" class="nav__list-link">Главная</a></li>
      <li><a href="/about" class="nav__list-link">О приложении</a></li>
    </ul>


    <a href="/user" class="nav__user">
      <p class="nav__user-name">CurrentUser</p>
      <i class="far fa-user nav__user-icon"></i>
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px;
  border-bottom: 1px solid darkgray;
}

.nav__list{
  display: flex;
  align-items: flex-end;
}

.nav__list-link {
  font-size: 20px;
  font-weight: 600;
  margin-left: 15px;
}

.nav__logo {
  display: flex;
  align-items: center;
  font-size: 35px;
  margin-right: 15px;
  line-height: 35px;
}

.nav__logo i {
  font-size: 50px;
  margin-right: 7px;
  line-height: 35px;
}

.nav__user {
  display: flex;
  align-items: center;
}

.nav__user-name{
  font-size: 20px;
}

.nav__user i{
  font-size: 40px;
  margin-left: 15px;
}
</style>