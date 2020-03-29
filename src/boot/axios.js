import axios from 'axios'
import { LocalStorage } from 'quasar'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// // eslint-disable-next-line dot-notation
export default async ({ app, router, store, Vue }) => {
  // something to do
  axios.defaults.headers.common.Accept = 'application/json'
  // eslint-disable-next-line dot-notation
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  axios.interceptors.request.use(function (config) {
  // Do something before request is sent
    // console.log(config)
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

  function fetchApi (url, method, data) {
    try {
      let response = ''
      axios.defaults.headers.common.Authorization = LocalStorage.getItem('access_token') || ''
      if (method === 'post') {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          try {
            response = await axios.post(url, data)
            resolve(response)
          } catch ({ data }) {
            if (data.error.code === 401) {
              router.push('/login')
            }
            reject(data)
          }
        })
      }
      if (method === 'get') {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          try {
            response = await axios.get(url)
            resolve(response)
          } catch ({ data }) {
            if (data.error.code === 401) {
              router.push('/login')
            }
            reject(data)
          }
        })
      }
      // return response
    } catch (error) {
      console.log(error)
    }
  }

  Vue.prototype.$axios = axios
  Vue.prototype.$API = 'http://pretest-qa.privydev.id/api/v1'
  Vue.prototype.$fetchApi = function (url, method, data) { return fetchApi(url, method, data) }
}
