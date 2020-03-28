<template>
  <q-page class="flex register">
    <q-card class="register-card">
      <div class="register-card__header">
        <h1>Register</h1>
      </div>
      <q-form ref="loginForm" @submit="onSubmit">
        <div class="register-card__content">
          <q-input v-model="phoneNumber" rounded outlined placeholder="Phone number" type="text"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type you phone number']"
           />
          <q-input v-model="password" rounded outlined placeholder="Password" type="password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type you password']"
           />
          <q-input v-model="country" rounded outlined placeholder="Country" type="text" disable />
        </div>
        <div class="register-card__action">
          <q-btn push rounded color="primary" type="submit" label="REGISTER" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { uuid } from 'vue-uuid'
import { Platform, Loading } from 'quasar'
import { objectToFormData } from 'object-to-formdata'
export default {
  name: 'register',
  data () {
    return {
      phoneNumber: '',
      password: '',
      country: 'INDONESIA',
      latLong: '-7.797068,110.370529',
      deviceToken: uuid.v1(),
      deviceType: Platform.is.ios ? 0 : Platform.is.android ? 1 : 2,
      userId: ''
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef

  },
  methods: {
    async onSubmit () {
      const dataForm = {
        phone: this.phoneNumber,
        password: this.password,
        country: this.country,
        latlong: this.latLong,
        device_token: this.deviceToken,
        device_type: this.deviceType
      }
      Loading.show()
      this.$axios.post(this.$API + '/register', objectToFormData(dataForm))
        .then(({ data }) => {
          this.userId = data.data.user.id
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
        })
        .then(
          this.$axios.post(this.$API + '/register/otp/request', 'phone=' + this.phoneNumber)
            .then(({ data }) => {
              console.log(data)
              Loading.hide()
              this.$router.push('/verify')
            })
          // eslint-disable-next-line handle-callback-err
            .catch((err) => {
              Loading.hide()
              console.log(err)
            })
        )
    }
  }
}
</script>
<style lang="stylus" scoped>
  .register {
    justify-content: center;
    min-height: 100px !important;
    .register-card {
      display : inline-block;
      margin : 20px;
      padding : 20px 30px;;
      min-width : 300px;
      min-height : 100px;
      border-radius: 20px;
      box-shadow : 0px 0px 5px rgba(0, 0, 0, 0.2),
                  0 2px 2px rgba(0, 0, 0, 0),
                  0 10px 1px -2px rgba(0, 0, 0, 0);
      .register-card__header {
        h1 {
          font-size : 18px;
          font-weight : bold;
        }
      }
      .register-card__content {
        padding: 10px 0;
        .q-field {
          margin: 10px 0;
        }
      }
      .register-card__action {
        button {
          width : 100%;
          padding: 10px;
          background-color: #5458F7 !important;
        }
      }
    }
  }
</style>
