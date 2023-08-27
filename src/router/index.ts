import { createRouter, createWebHistory } from 'vue-router'
import TheMain from '@/views/TheMain.vue';
import TheAuth from '@/views/TheAuth.vue';
import TheAuthForm from '@/components/TheFormAuth.vue';
import TheRegForm from '@/components/TheFormReg.vue';
import store from './../store'

const isAuthenticated = store.getters.isAuth;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => {
        const path = isAuthenticated ? 'main' : 'auth'
        router.push(path)
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: TheAuth,
      children: [
        {
          path: '',
          name: 'AuthForm',
          component: TheAuthForm,
        },
        {
          path: '/reg',
          name: 'RegForm',
          component: TheRegForm,
        }
      ]
    },
    {
      path: '/main',
      name: 'Main',
      component: TheMain,
    },
    { path: '/:error(.*)', redirect: '/' },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Main' || to.name === 'Contact') {
    if (isAuthenticated) {
      next()
    } else {
      router.push('auth')
    }
  } else {
    if (isAuthenticated) {
      next({ name: 'Main' })
    } else {
      next()
    }
  }

});

export default router
