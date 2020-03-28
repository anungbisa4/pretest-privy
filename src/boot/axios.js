import Vue from 'vue'
import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// // eslint-disable-next-line dot-notation
axios.defaults.headers.common.Accept = 'application/json'
// eslint-disable-next-line dot-notation
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error.response)
})

Vue.prototype.$axios = axios
Vue.prototype.$API = 'http://pretest-qa.privydev.id/api/v1'
