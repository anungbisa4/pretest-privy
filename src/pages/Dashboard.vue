<template>
  <q-page class="flex dashboard">
    <q-card class="dashboard-card">
      <div class="dashboard-cover">
          <q-icon class="icon-edit" name="create"></q-icon>
        <div class="dashboard-cover-img">
          <img class="dashboard-cover-img__image" src="statics/cover-sample.jpeg" alt="">
        </div>
      </div>
      <div class="flex d-avatar">
        <div class="d-avatar-middle--photo">
          <div class="d-avatar-wrap">
            <q-icon class="icon-edit d-avatar-icon__bottom" name="create"></q-icon>
            <button>
              <img class="d-avatar-img__image" src="statics/avatar-sample.jpeg" alt="">
            </button>
          </div>
        </div>
      </div>
      <div class="d-profile">
        <div class="flex d-profile-abs">
          <div class="d-msg d-profile-pd"><q-btn rounded  class="d-btn" label="Edit profile" /></div>
          <div class="d-inbox d-profile-pd"><q-btn outline class="d-btn d-btn__outline" rounded>
            <q-icon name="inbox"></q-icon>
          </q-btn>
          </div>
          <div class="d-logout d-profile-pd"><q-btn outline class="d-btn d-btn__outline d-btn__grey" rounded label="Logout" /></div>
        </div>
        <h1>{{dataProfile.name}}</h1>
        <h2>{{dataProfile.gender || 'Your Gender '}},{{ dataProfile.hometown || ' Hometown' }}</h2>
      </div>
      <div class="d-about">
        <h1 class="d-about__title d-title">About</h1>
        <div class="d-about__content" :style="dataProfile.bio !== null ? '' : 'text-align: center;'">
          <p v-if="dataProfile.bio !== null">{{dataProfile.bio}}</p>
          <div v-else>
            <router-link to="/edit-profile"><q-btn rounded outline  class="d-btn d-btn__outline d-btn__grey d-btn-margin" label="Edit Bio" /></router-link>
          </div>
        </div>
      </div>
      <section class="d-card d-education">
        <h1 class="d-about__title d-title">Educations</h1>
        <div v-if="isEdit">
          <q-form ref="editForm" @submit="onSubmitEdit('education')">
          <q-input v-model="educationForm.school_name" rounded outlined placeholder="School" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you fullname']"
            />
          <q-input rounded outlined v-model="educationForm.graduation_time" placeholder="Graduation tine" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="educationForm.graduation_time" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          <div style="text-align: center">
            <q-btn rounded  class="d-btn d-btn-large" label="SAVE" type="submit" />
          </div>
          </q-form>
        </div>
        <div v-if="!isEdit">
          <div v-if="dataProfile.education && dataProfile.education.school_name === null" :style="dataProfile.education && dataProfile.education.school_name !== null ? '' : 'text-align: center;'">
          <q-btn rounded outline  class="d-btn d-btn__outline d-btn__grey d-btn-margin" label="Edit Education" @click="isEdit = true"/>
        </div>
        <div v-if="dataProfile.education && dataProfile.education.school_name !== null" class="flex d-card-item">
          <q-btn rounded  class="d-btn d-card-btn" label="Update" @click="isEdit = true"/>
          <div class="d-card-item__avatar d-education-avatar">
            <span>ED</span>
          </div>
          <div class="d-card-item__content">
            <h1>{{ dataProfile.education && dataProfile.education.school_name }}</h1>
            <span>{{dataProfile.education && dataProfile.education.graduation_time}}</span>
          </div>
        </div>
        </div>
      </section>
      <section class="d-card d-career">
        <h1 class="d-about__title d-title">Careers</h1>
        <div v-if="isEditCareer">
        <q-form ref="editForm" @submit="onSubmitEdit('career')">
          <q-input v-model="careerForm.position" rounded outlined placeholder="Position" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you position']"
            />
          <q-input v-model="careerForm.company_name" rounded outlined placeholder="Company name" type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type you position']"
            />
          <q-input rounded outlined v-model="careerForm.starting_from" placeholder="Starting from" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="careerForm.starting_from" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          <q-input rounded outlined v-model="careerForm.ending_in" placeholder="End in" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="careerForm.ending_in" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          <div style="text-align: center">
            <q-btn rounded  class="d-btn d-btn-large" label="SAVE" type="submit" />
          </div>
          </q-form>
        </div>
        <div v-if="!isEditCareer">
        <div v-if="dataProfile.career && dataProfile.career.company_name === null" :style="dataProfile.career && dataProfile.career.company_name !== null ? '' : 'text-align: center;'">
          <q-btn rounded outline  class="d-btn d-btn__outline d-btn__grey d-btn-margin" label="Edit Career" @click="isEditCareer = true"/>
        </div>
        <div v-if="dataProfile.career && dataProfile.career.company_name !== null" class="flex d-card-item">
          <q-btn rounded  class="d-btn d-card-btn" label="Update" @click="isEditCareer = true"/>
          <div class="d-card-item__avatar d-career-avatar">
            <span>CA</span>
          </div>
          <div class="d-card-item__content">
            <h1>{{dataProfile.career && dataProfile.career.company_name}}</h1>
            <!-- <h2>dataProfile.career.company_name</h2> -->
            <span>{{dataProfile.career && dataProfile.career.starting_from}} - {{dataProfile.career && dataProfile.career.ending_in}}</span>
          </div>
        </div>
        </div>
      </section>
      <section class="d-card d-gallery">
        <h1 class="d-about__title d-title">Photos</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in dataProfile.user_pictures" :key="index">
            <div class="d-gallery-item">
              <img :src="item.picture.url" :alt="index">
            </div>
          </div>
          <!-- <div class="col-4" v-for="(item, index) in dataProfile.user_pictures" :key="index">
            <div class="d-gallery-item">
              <img :src="item.picture.url" :alt="index">
              <div class="d-img-overlay"></div>
              <div class="d-img-blur" style="background-image:url('statics/cover-sample.jpeg')"></div>
            </div>
          </div> -->
        </div>
        <div class="d-gallery-btn">
        <q-btn rounded  class="d-btn" label="Upload" @click="isUploadMultiple = true"/>
        </div>
      </section>
    </q-card>
    <q-dialog v-model="isUploadMultiple">
      <q-card>
        <div class="q-pa-md">
      <q-uploader
      url="http://localhost:8080/uploads"
      label="Upload your images"
      :factory="factoryFn"
      multiple
    >
      <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

        </q-list>
      </template>
    </q-uploader>
          </div>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Loading, LocalStorage, Notify } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { objectToFormData } from 'object-to-formdata'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      test: '',
      dataProfile: {},
      isEdit: false,
      isEditCareer: false,
      isUploadMultiple: false,
      educationForm: {
        school_name: '',
        company_name: ''
      },
      careerForm: {
        position: '',
        company_name: '',
        starting_from: '',
        ending_in: ''
      }
    }
  },
  created () {
    this.initProfile()
  },
  mounted () {
    // eslint-disable-next-line no-undef
    console.log(this.$store)
  },
  methods: {
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        const fileData = new FormData()
        fileData.append('image', file[0])
        const response = this.$axios.post('/api/v1/uploads/profile', fileData)
        response.then((res) => {
          if (res.status === 201) {
            this.isUploadMultiple = false
            this.initProfile()
            Notify.create({
              type: 'positif',
              message: 'Upload Succesfully'
            })
          }
        })
        resolve(response)
      })
    },
    onSubmitEdit (value) {
      if (value === 'education') {
        Loading.show()
        this.$axios.post('/api/v1/profile/education', objectToFormData(this.educationForm))
          .then(({ data }) => {
            Loading.hide()
            this.isEdit = false
            this.initProfile()
            Notify.create({
              type: 'positif',
              message: 'Succesfully'
            })
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            this.isEdit = false
            console.log(err)
            Notify.create({
              type: 'warning',
              message: err.error.errors[0]
            })
          })
      }
      if (value === 'career') {
        Loading.show()
        this.$axios.post('/api/v1/profile/career', objectToFormData(this.careerForm))
          .then(({ data }) => {
            Loading.hide()
            this.isEditCareer = false
            this.initProfile()
            Notify.create({
              type: 'positif',
              message: 'Succesfully'
            })
          })
        // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            Loading.hide()
            this.isEditCareer = false
            console.log(err)
            Notify.create({
              type: 'warning',
              message: err.error.errors[0]
            })
          })
      }
    },
    initProfile () {
      Loading.show()
      axios.defaults.headers.common.Authorization = LocalStorage.getItem('access_token')
      axios.get('/api/v1/profile/me')
        .then(({ data }) => {
          Loading.hide()
          this.dataProfile = data.data.user
          console.log(data.data)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
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
      .dashboard-cover {
        position : relative;
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        width: 100%;
        padding-bottom: 25%;
        .dashboard-cover-img {
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        .dashboard-cover-img__image {
          width: 100%;
          height : 100%;
        }
      }
      .d-avatar {
        position : relative;
        justify-content: center;
        margin-top: -80px;
        .d-avatar-icon__bottom {
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
        .d-avatar-middle--photo {
          width: 160px;
          height: 160px;
          box-sizing: border-box;
          background-clip: content-box;
          border: 0 solid transparent;
          border-radius: 49.9%;
          background-color: rgba(243,246,248,.94);
          box-shadow: inset 0 1.5px 3px 0 rgba(0,0,0,.15), 0 1.5px 3px 0 rgba(0,0,0,.15);
          margin: auto;
          position: relative;
          .d-avatar-wrap {
            background-color: transparent;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            margin: 0 auto;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            button {
              background: none;
              border: none;
              padding: 0;
              line-height: 0;
              margin: 0;
              width: 100%;
              height: 100%;
            }
            .d-avatar-img__image {
              border-radius: 50%;
              width: 152px;
              height: 152px;
            }
          }
        }
      }
      .d-profile {
        position: relative;
        text-align : center;
        padding : 10px;
        .d-profile-abs {
          position : absolute;
          right: 30px;
        }
        .d-profile-pd {
          padding: 0 5px;
        }
        h1 {
          font-size: 20px;
        }
        h2 {
          font-size: 14px;
          line-height: normal;
          text-align: center;
          margin: 0;
          color : #9597A1;
        }
      }
      .d-about {
        width: 50%;
        margin: 0 auto;
        background-color: #ececee;
        border-radius: 16px;
        padding: 10px 20px;
        font-size: 12px;
      }
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
      .d-career {
        .d-career-avatar {
          background-color : #eae5ff !important;
          color : #B2A1FF !important;
        }
        h2 {
          font-size: 12px;
          margin: 0;
          line-height: normal;
          color: #9597A1 !important;
        }
      }
      .d-gallery {
        .col-4 {
          padding: 1px;
          position : relative;
        }
        .d-gallery-item {
          height: 200px;
          position: relative;
          background: #f8f9fa;
          img {
              max-height: 100%;
              max-width: 100%;
              width: auto;
              height: auto;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
          }
        }
        .d-gallery-btn {
            text-align: center;
            padding: 20px;
          button {
            padding: 0 25px;
          }
        }
      }
    }
  }
</style>
