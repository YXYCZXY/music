import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/music',
      name: 'music',
      component: Music
    }
  ]
})
