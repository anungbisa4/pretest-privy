<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="header">
        <h1>PRETEST PRIVY ID - FRONTEND DEVELOPER</h1>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {
  },
  beforeEnter: (to, from, next) => {
    next((vm) => {
      console.log(vm)
      if (vm.$store.getters.getIsLogin) {
        vm.$router.push('/')
      }
    })
    next()
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
