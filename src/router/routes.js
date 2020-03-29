
const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'edit-profile',
        component: () => import('pages/EditProfile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      next((vm) => {
        if (!vm.$store.getters.getIsLogin) {
          vm.$router.push('/login')
        }
      })
      next()
    }
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('pages/Register.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'verify',
        component: () => import('pages/Verify.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
