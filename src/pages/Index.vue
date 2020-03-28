<template>
  <q-page class="flex main-env">
    {{test}}
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      test: process.env.API_PRETEST
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    console.log(this.test)
  }
}
</script>
