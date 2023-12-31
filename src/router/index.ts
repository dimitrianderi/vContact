import { createRouter, createWebHistory } from 'vue-router'
import TheMain from '@/views/TheMain.vue';
import TheAuth from '@/views/TheAuth.vue';
import TheAuthForm from '@/components/TheFormAuth.vue';
import TheRegForm from '@/components/TheFormReg.vue';
import TheContact from '@/views/TheContact.vue';
import store from './../store'

const isAuthenticated = store.getters.auth;

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
    {
      path: '/contact/:id',
      name: 'Contact',
      component: TheContact,
      props: true
    },
    { path: '/:error(.*)', redirect: '/' },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.auth;
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
