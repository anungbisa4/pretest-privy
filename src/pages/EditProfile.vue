<template>
  <q-page class="flex dashboard">
    <q-card class="dashboard-card">
      <section class="d-card d-edit-profile">
        <h1 class="d-about__title d-title">Edit Profile</h1>
        <q-form ref="editForm" @submit="onSubmit">
          <div class="register-card__content">
            <q-input v-model="dataForm.name" rounded outlined placeholder="Full name" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you fullname']"
            />
            <q-select v-model="dataForm.gender" rounded outlined placeholder="Gender" :options="options"
            emit-value
            map-options
            lazy-rules
            label="Gender"
            :rules="[]"
            />
            <q-input rounded outlined v-model="dataForm.birthday" placeholder="1990/1/1" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="dataForm.birthday" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input v-model="dataForm.hometown" rounded outlined placeholder="Hometown" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you hometown']"
            />
            <q-input v-model="dataForm.bio" autogrow rounded outlined placeholder="Bio" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you bio' ]"
            />
          </div>
          <div style="text-align: center">
            <q-btn rounded  class="d-btn d-btn-large" label="SAVE" type="submit" />
          </div>
        </q-form>
      </section>
    </q-card>
  </q-page>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Loading, LocalStorage, Notify } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { objectToFormData } from 'object-to-formdata'
export default {
  name: 'editProfile',
  data () {
    return {
      test: '',
      dataProfile: {},
      dataForm: {
        name: '',
        gender: '',
        birthday: '',
        hometown: '',
        bio: ''
      },
      options: [
        {
          label: 'Super Man',
          value: 0
        },
        {
          label: 'Wonder Woman',
          value: 1
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    // eslint-disable-next-line no-undef
    console.log(this.$store)
  },
  methods: {
    onSubmit () {
      Loading.show()
      this.$axios.post('/api/v1/profile', objectToFormData(this.dataForm))
        .then(({ data }) => {
          Loading.hide()
          Notify.create({
            type: 'positif',
            message: 'Succesfully'
          })
          this.$router.push('/')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
          Notify.create({
            type: 'warning',
            message: err.error.errors[0]
          })
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      console.log(vm.$store)
      if (!vm.$store.getters.getIsLogin) {
        vm.$router.push('/login')
      }
    })
    next()
  }
}
</script>
<style lang="stylus" scoped>
// 1px 8px 16px rgba(0, 0, 0, .08)
  .dashboard {
    justify-content: center;
    .icon-edit {
      z-index: 1;
      background-color: #5458F7;
      color: #ffffff;
      padding: 10px;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .d-img-overlay{
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: #00000061;
    }
    .d-img-blur{
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-size: cover;
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
    .d-btn {
      background-color: #5458F7;
      color: #ffffff;
      font-size: 12px;
      text-transform: capitalize;
      &.d-btn__outline {
        color : #5458F7;
      }
      &.d-btn__grey {
        color : #9597A1;
      }
      &.d-btn-margin {
        margin:30px;
      }
      &.d-btn-large {
        padding: 5px 30px;
      }
    }
    .d-title {
      color : #9597A1;
      font-size: 12px;
    }
    .dashboard-card {
      margin : 20px;
      width : 100%;
      border-radius: 20px;
      padding-bottom: 50px;
      box-shadow : 0px 0px 5px rgba(0, 0, 0, 0.2),
                  0 2px 2px rgba(0, 0, 0, 0),
                  0 10px 1px -2px rgba(0, 0, 0, 0);
      .d-card {
        position : relative;
        width: 50%;
        margin: 30px auto 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        padding: 10px 20px;
        font-size: 12px;
        box-shadow : 1px 8px 16px rgba(0, 0, 0, .08);
        .d-card-btn {
          position : absolute;
          right: 30px;
          bottom: -15px;
        }
        .d-card-item {
          margin: 0 10px;
          align-items: center;
          &:not(:last-child) {
          border-bottom: 1px solid #f4f4f4;
           }
            .d-card-item__avatar {
              position: relative;
              width: 40px;
              height: 40px;
              background: #cdf4e9;
              color: #00CC99;
              text-transform: uppercase;
              border-radius: 50px;
              span {
                position : absolute;
                left: 50%;
                top : 50%;
                transform : translate(-50%, -50%);
              }
            }
            .d-card-item__content {
              padding: 10px;
              h1 {
                line-height : normal;
                font-size: 14px;
                font-weight: 300;
              }
              span {
                font-size : 12px;
                font-weight: 300;
                color : #9597A1;
              }
            }
        }
      }
    }
  }
</style>
