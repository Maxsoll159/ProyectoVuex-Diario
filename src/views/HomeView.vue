<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <h1>Hola Mundo</h1>
  <button @click="goToDaybook"  class="btn btn-primary">Hola</button>
</template>

<script>

export default {
  methods:{
    goToDaybook(){
      this.$router.push({name: 'no-entry'})
    }
  }
}
</script>

