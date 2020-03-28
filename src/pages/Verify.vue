<template>
  <q-page class="flex verify">
    <q-card class="verify-card">
      <div class="verify-card__header">
        <h1>verify</h1>
      </div>
      <q-form @submit="onVerify">
      <div class="verify-card__content">
        <div class="row">
          <div class="col-xs-3">
            <q-input rounded outlined  class="text-center text-white" @focus="onFocus" @keyup="autoTab" maxlength="1" size="1" min="0" max="9" pattern="[0-9]{1}" type="tel" v-model="code[0]"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']" />
          </div>
          <div class="col-xs-3">
            <q-input rounded outlined  class="text-center text-white" @focus="onFocus" @keyup="autoTab" maxlength="1" size="1" min="0" max="9" pattern="[0-9]{1}" type="tel" v-model="code[1]"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"/>
          </div>
          <div class="col-xs-3">
            <q-input rounded outlined  class="text-center text-white" @focus="onFocus" @keyup="autoTab" maxlength="1" size="1" min="0" max="9" pattern="[0-9]{1}" type="tel" v-model="code[2]"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"/>
          </div>
          <div class="col-xs-3">
            <q-input rounded outlined  class="text-center text-white" @focus="onFocus" @keyup="autoTab" maxlength="1" size="1" min="0" max="9" pattern="[0-9]{1}" type="tel" v-model="code[3]" ref="verify"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"/>
          </div>
          <!-- <span v-if="error_otp" class="error_label">You have enter an invalid OTP, please try again</span> -->
        </div>
      </div>
      <div class="verify-card__action">
        <q-btn push rounded color="primary" label="verify" type="submit" />
      </div>
      </q-form>
      <div class="verify-card-resend" @click="openModal">resend code</div>
    </q-card>
    <q-dialog v-model="isResend">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Phone number</div>
        </q-card-section>
        <q-form @submit="onSendCode">
        <q-card-section class="q-pt-none">
            <q-input dense v-model="phoneNumber" autofocus
            lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type you phone number']" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Send" type="submit" />
        </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { Platform, Loading, LocalStorage, SessionStorage, Notify } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { objectToFormData } from 'object-to-formdata'
export default {
  name: 'verify',
  data () {
    return {
      test: '',
      code: ['', '', '', ''],
      isResend: false,
      phoneNumber: '',
      secondDialog: false
    }
  },
  watch: {
    code: function (newVal) {
      if (newVal[0] !== '' && newVal[1] !== '' && newVal[2] !== '' && newVal[3] !== '') {
        // this.error_otp = false
      }
    },
    msgPopup: function (newVal) {
      console.log(newVal)
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    console.log(this.test)
  },
  methods: {
    onVerify () {
      Loading.show()
      if (LocalStorage.getItem('user_id') === undefined || LocalStorage.getItem('user_id') === null) {
        Loading.hide()
        Notify.create({
          message: 'Your code expired or not valid, please resend code'
        })
        return
      }
      const formData = {
        user_id: LocalStorage.getItem('user_id'),
        otp_code: this.code[0] + this.code[1] + this.code[2] + this.code[3]
      }
      this.$axios.post(this.$API + '/register/otp/match', objectToFormData(formData))
        .then(({ data }) => {
          Loading.hide()
          // eslint-disable-next-line prefer-const
          console.log(data)
          LocalStorage.set('access_token', data.data.user.access_token)
          this.$router.push('/')
        })
      // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
          Notify.create({
            message: 'Wrong code'
          })
        })
    },
    openModal () {
      this.isResend = true
    },
    onSendCode () {
      Loading.show()
      this.$axios.post(this.$API + '/register/otp/request', 'phone=' + this.phoneNumber)
        .then(({ data }) => {
          Loading.hide()
          // eslint-disable-next-line prefer-const
          if (data.data.user !== null) {
            LocalStorage.set('user_id', data.data.user.id)
          }
          if (data.data.user === null) {
            Notify.create({
              message: 'Wrong phone number'
            })
            return
          }
          this.isResend = false
          Notify.create({
            message: 'Please check message to see new code'
          })
        })
      // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          this.isResend = false
          console.log(err)
        })
    },
    autoTab (e, a) {
      var target = e.srcElement || e.target
      var maxLength = 1
      var myLength = target.value.length
      if (myLength >= maxLength) {
        var next = target.closest('.col-xs-3')
        // eslint-disable-next-line no-cond-assign
        while (next = next.nextElementSibling) {
          if (next == null) { break }
          if (next.querySelector('input').tagName.toLowerCase() === 'input') {
            next.querySelector('input').focus()
            break
          }
        }
      // eslint-disable-next-line brace-style
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        var previous = target.closest('.col-xs-3')
        // eslint-disable-next-line no-cond-assign
        while (previous = previous.previousElementSibling) {
          if (previous == null) { break }
          if (previous.querySelector('input').tagName.toLowerCase() === 'input') {
            previous.querySelector('input').focus()
            break
          }
        }
      }
    },
    onFocus () {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }
}
</script>
<style lang="stylus">
  .verify {
    justify-content: center;
    min-height: 100px !important;
    input {
      text-align: center;
      font-size: 30px;
    }
    .verify-card {
      display : inline-block;
      margin : 20px;
      padding : 20px 30px;;
      min-width : 300px;
      min-height : 100px;
      border-radius: 20px;
      box-shadow : 0px 0px 5px rgba(0, 0, 0, 0.2),
                  0 2px 2px rgba(0, 0, 0, 0),
                  0 10px 1px -2px rgba(0, 0, 0, 0);
      .verify-card__header {
        h1 {
          font-size : 18px;
          font-weight : bold;
        }
      }
      .verify-card__content {
        padding: 10px 0;
        .q-field {
          margin: 10px 0;
        }
        .col-xs-3 {
          width: calc(25% - 5px);
          margin-right: 5px;
        }
      }
      .verify-card__action {
        button {
          width : 100%;
          padding: 10px;
          background-color: #5458F7 !important;
        }
      }
      .verify-card-resend {
        text-align: center;
        padding : 10px;
        color : #5458F7;
        cursor : pointer;
      }
    }
  }
</style>
