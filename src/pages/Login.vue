<template>
  <q-page class="flex login">
    <q-card class="login-card">
      <div class="login-card__header">
        <h1>Login</h1>
      </div>
      <q-form ref="loginForm" @submit="onSubmit">
      <div class="login-card__content">
          <q-input v-model="phoneNumber" @keydown="onKeyDown" rounded outlined placeholder="Phone number" type="text"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type you phone number']"
          />
          <q-input v-model="password" rounded outlined placeholder="Password" type="password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type you password']"
          />
        </div>
        <div class="login-card__action">
          <q-btn push rounded color="primary" type="submit" label="LOGIN" />
        </div>
      </q-form>
      <div class="login-card__footer">
        <span>Not yet registered, <span class="login-card-register" @click="linkRegister">Register here</span> </span>

      </div>
    </q-card>
  </q-page>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Platform, Loading, LocalStorage, SessionStorage, Notify } from 'quasar'
import { uuid } from 'vue-uuid'
import { objectToFormData } from 'object-to-formdata'

export default {
  name: 'login',
  data () {
    return {
      phoneNumber: '',
      password: '',
      latLong: '-7.797068,110.370529',
      deviceToken: uuid.v1(),
      deviceType: Platform.is.ios ? 0 : Platform.is.android ? 1 : 2
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    console.log(this.test)
  },
  methods: {
    linkRegister () {
      this.$router.push('/register')
    },
    onKeyDown (event) {
      const char = String.fromCharCode(event.keyCode)
      const regex = /^[0-9,\b][0-9,\b]*$/
      if (!regex.test(char)) {
        event.preventDefault()
      }
    },
    onSubmit () {
      Loading.show()
      const dataForm = {
        phone: this.phoneNumber,
        password: this.password,
        latlong: this.latLong,
        device_token: this.deviceToken,
        device_type: this.deviceType
      }
      this.$axios.post('/api/v1/oauth/sign_in', objectToFormData(dataForm))
        .then(({ data }) => {
          Loading.hide()
          LocalStorage.set('access_token', data.data.user.access_token)
          this.$router.push('/')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
          Notify.create({
            message: 'Error login, Please try again'
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login {
    justify-content: center;
    min-height: 100px !important;
    .login-card {
      display : inline-block;
      margin : 20px;
      padding : 20px 30px;;
      min-width : 300px;
      min-height : 100px;
      border-radius: 20px;
      box-shadow : 0px 0px 5px rgba(0, 0, 0, 0.2),
                  0 2px 2px rgba(0, 0, 0, 0),
                  0 10px 1px -2px rgba(0, 0, 0, 0);
      .login-card__header {
        h1 {
          font-size : 18px;
          font-weight : bold;
        }
      }
      .login-card__content {
        padding: 10px 0;
        .q-field {
          margin: 10px 0;
        }
      }
      .login-card__action {
        button {
          width : 100%;
          padding: 10px;
          background-color: #5458F7 !important;
        }
      }
      .login-card__footer {
        margin : 15px;
        text-align : center;
        font-size : 12px;
      }
    }
    .login-card-register {
      color: #5458F7;
      cursor: pointer;
    }
  }
</style>
