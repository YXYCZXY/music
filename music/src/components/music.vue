<template>
  <div >
    <a href="https://github.com/YXYCZXY/music">
    <img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png" alt="Fork me on Gitee">
    </a>
<particle></particle>
  </div>
</template>

<script>
import particle from '../components/particles.vue'


export default {
  components:{
    particle
  }
}
</script>

<style scoped>
body,html{
  height: 100%;
  width: 100%;
}
particle{
  position: fixed;
  top: 0%
}
</style>
