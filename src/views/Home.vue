<template>
  <div class="dashboard">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" width="40" height="40">
      </a>
      <div>
        <img :src="$auth.user.picture" width="30" height="30">
        <span class="text-muted font-weight-light px-2">{{$auth.user.name}}</span>
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="$auth.logout()">Logout</button>
      </div>
    </nav>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
  </div>
</template>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
