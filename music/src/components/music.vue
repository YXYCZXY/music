<template>
  <div class="bg">
    <Header></Header>
    <Major></Major>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Major from '../components/major.vue'
import Footer from '../components/footer.vue'

export default {
  components: {
    Header,
    Major,
    Footer
  }
}
</script>

<style scoped>
body,html{
  height: 100%;
  width: 100%;
}

</style>
