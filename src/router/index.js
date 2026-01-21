import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue' // Une page protégée imaginaire

const routes = [
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // On marque cette route comme protégée
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next(); 
    }
});

export default router;