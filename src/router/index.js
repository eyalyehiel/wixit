import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import siteApp from '../views/site-app.vue';
import graphicDesignerHome from '../components/graphic-designer/graphic-designer-home';

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
