export default ({ router, store, Vue }) => {
  // router.beforeEach((to, from, next) => {
  // Now you need to add your authentication logic here, like calling an API endpoin
  // if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   console.log(to, from)
  //   if (store.getters.getIsLogin) {
  //     console.log('login')
  //     next()
  //   }
  //   // eslint-disable-next-line no-useless-return
  // }
  // if (!to.matched.some(record => record.meta.requiresAuth)) {
  //   console.log(to)
  //   console.log(store.getters.getIsLogin)
  //   if (store.getters.getIsLogin && to.path !== '/login') {
  //     console.log('login')
  //     next('/login')
  //   }
  // }
  // next()

  //   if (to.matched.some(record => record.meta.requiresAuth)) {
  //     if (store.getters.isLoggedIn && to.path !== '/login') {
  //       next('/')
  //       return
  //     }
  //     next()
  //   } else {
  //     next()
  //   }
  // })
}
