<template>
  <navbar/>
  <router-view></router-view>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {Navbar}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Verdana, serif;
}

a {
  color: black;
  text-decoration: none;
}

ul {
  list-style: none;
}
</style>