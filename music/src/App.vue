<template>
  <div id="app">
    <music></music>
  </div>
</template>

<script>
import Music from '../src/components/music.vue'
export default {
  name: 'App',
   components: {
    Music
  }
}
</script>

<style>
body,html,#app {
margin: 0%;
padding: 0%;
height: 100%;
text-align: center;
background-image: url("./assets/sky.jpg");
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>
