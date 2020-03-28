// eslint-disable-next-line no-unused-vars
import { Loading, LocalStorage, Notify } from 'quasar'

export default {
  state: {
    isLogin: !(LocalStorage.getItem('access_token') === undefined || LocalStorage.getItem('access_token') === null)
  },
  getters: {
    getIsLogin (state) {
      return state.isLogin
    }
  },
  mutations: {

  }
  // actions: {
  //   setAction({commit, state}) {}
  // }
}
