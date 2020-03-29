// eslint-disable-next-line no-unused-vars
import { Loading, LocalStorage, Notify } from 'quasar'
import axios from 'axios'

export default {
  state: {
    isLogin: !(LocalStorage.getItem('access_token') === undefined || LocalStorage.getItem('access_token') === null),
    token: LocalStorage.getItem('access_token') || '',
    user: '',
    status: ''
  },
  getters: {
    getIsLogin (state) {
      return !!state.token
    }
  },
  mutations: {
    AUTH_SUCCESS (state, token, user) {
      state.token = token
      state.status = 'success'
      state.user = user
    },
    AUTH_LOGOUT (state) {
      state.token = ''
      state.status = 'logout'
      state.user = ''
    }
  },
  actions: {
    login ({ commit, state }, payload) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        Loading.show()
        await this._vm.$fetchApi('/api/v1/oauth/sign_in', 'post', payload)
          .then(({ data }) => {
            Loading.hide()
            const token = LocalStorage.set('access_token', data.data.user.access_token)
            const user = data.data.user
            commit('AUTH_SUCCESS', token, user)
            resolve(data)
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            console.log(err)
            Notify.create({
              message: 'Error login, Please try again'
            })
            localStorage.removeItem('access_token')
            reject(err)
          })
      })
    },
    logout ({ commit, state }, payload) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        Loading.show()
        await this._vm.$fetchApi('/api/v1/oauth/revoke', 'post', payload)
          .then(({ data }) => {
            console.log(data)
            Loading.hide()
            resolve()
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            commit('AUTH_LOGOUT')
            console.log(err.error.code)
            // eslint-disable-next-line dot-notation
            delete axios.defaults.headers.common['Authorization']
            Notify.create({
              message: 'Logout success'
            })
            localStorage.removeItem('access_token')
            reject()
          })
      })
    }
  }
}
