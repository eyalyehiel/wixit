import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import siteApp from '../views/site-app.vue';
import siteEdit from '../views/site-edit.vue';
import siteLogin from '../components/login.vue';
import siteSignup from '../components/signUp.vue';
import siteEditDisplay from '../components/site-edit/site-edit-display.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: siteLogin,
        },
        {
            path: '/signup',
            name: 'signup',
            component: siteSignup,
        },
        {
            path: '/site',
            name: 'site',
            component: siteApp,
        },
        {
            path: '/site/edit/:id?',
            name: 'edit',
            component: siteEdit,
        },
        {
            path: '/site/edit/:id/preview',
            name: 'editPreview',
            component: siteEditDisplay,
        },
    ],
});

export default router;
