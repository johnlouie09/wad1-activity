import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/home',
            component: () => import('../pages/HomePage.vue')
        },

        {
            path: '/post',
            component: () => import('../pages/Posts.vue')
        },

        {
            path: '/about',
            component: () => import('../pages/AboutPage.vue')
        },

        {
            path: '/contact',
            component: () => import('../pages/ContactUsPage.vue')
        }
    ]
});

export default router;