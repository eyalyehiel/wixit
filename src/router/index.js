<<<<<<< HEAD
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
=======
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import siteApp from '../views/site-app.vue';
import graphicDesignerHome from '../components/graphic-designer/graphic-designer-home.vue';
>>>>>>> 6bfb81b565b5589b48c7febd706c86af80a3e8ec

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/site',
            name: 'site',
            component: siteApp,
        },
        {
            path: '/site/:id',
            name: 'sitePreview',
            component: graphicDesignerHome,
        },
    ],
});

export default router;
