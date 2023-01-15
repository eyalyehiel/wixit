import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import siteApp from '../views/site-app.vue'
import templates from '../views/templates.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/site',
      name: 'site',
      component: siteApp
    },
    {
      path: '/templates',
      name: 'templates',
      component: templates
    }
  ]
})

export default router
