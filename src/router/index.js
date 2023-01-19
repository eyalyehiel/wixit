import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import siteApp from '../views/site-app.vue';
import siteEdit from '../views/site-edit.vue'
import siteLogin from '../components/login.vue'
// import graphicDesignerHome from '../components/graphic-designer/graphic-designer-home.vue';


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
            path: '/site',
            name: 'site',
            component: siteApp,
        },
        // {
        //     path: '/site/:id',
        //     name: 'sitePreview',
        //     component: graphicDesignerHome,
        // },
        {
            path: "/site/edit/:id?",
            name: "edit",
            component: siteEdit,
        },
    ],
});

export default router;
