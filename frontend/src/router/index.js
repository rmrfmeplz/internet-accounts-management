import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import {useUserStore} from '@/stores/user.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            meta: {requiresAuth: true}
        }
    ]
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const requiresAuth = to.meta['requiresAuth']
    const isLogin = userStore.isLogin
    if (to.path === '/login' && isLogin) {
        next('/home')
    } else {
        if (requiresAuth) {
            isLogin ? next() : next('/login')
        } else {
            next()
        }
    }
})

export default router