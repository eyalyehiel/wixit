import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import siteApp from '../views/site-app.vue';
import siteEdit from '../views/site-edit.vue';

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
        // {
        //     path: '/site/:id',
        //     name: 'sitePreview',
        //     component: ,
        // },
        {
            path: '/site/edit/:id?',
            name: 'edit',
            component: siteEdit,
        },
    ],
});

export default router;
