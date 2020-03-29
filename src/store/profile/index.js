// eslint-disable-next-line no-unused-vars
import { Loading, LocalStorage, Notify } from 'quasar'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default {
  state: {
    profile: ''
  },
  getters: {
    getProfile (state) {
      return state.profile
    }
  },
  mutations: {
    GET_USER_PROFILE (state, payload) {
      state.profile = payload
    },
    SET_EDUCATIONS (state, payload) {
      if (state.profile !== '') {
        state.profile.education.school_name = payload.school_name
        state.profile.education.graduation_time = payload.graduation_time
      }
    }
  },
  actions: {
    initProfile ({ commit, state }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        Loading.show()
        await this._vm.$fetchApi('/api/v1/profile/me', 'get')
          .then(({ data }) => {
            Loading.hide()
            commit('GET_USER_PROFILE', data.data.user)
            resolve(data)
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            reject(err)
          })
      })
    },
    updateEducation ({ commit, state }, payload) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        Loading.show()
        await this._vm.$fetchApi('/api/v1/profile/education', 'post', payload)
          .then(({ data }) => {
            Loading.hide()
            commit('GET_USER_PROFILE', data.data.user)
            Notify.create({
              type: 'positif',
              message: 'Succesfully'
            })
            resolve(data)
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            Notify.create({
              type: 'warning',
              message: err.error.errors[0]
            })
            reject(err)
          })
      })
    },
    updateCareer ({ commit, state }, payload) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        Loading.show()
        await this._vm.$fetchApi('/api/v1/profile/career', 'post', payload)
          .then(({ data }) => {
            Loading.hide()
            commit('GET_USER_PROFILE', data.data.user)
            Notify.create({
              type: 'positif',
              message: 'Succesfully'
            })
            resolve(data)
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            Notify.create({
              type: 'warning',
              message: err.error.errors[0]
            })
            reject(err)
          })
      })
    }
  }
}
