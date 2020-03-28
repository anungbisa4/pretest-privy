<template>
  <q-page class="flex dashboard">
    <q-card class="dashboard-card">
      <div class="dashboard-cover">
          <q-icon class="icon-edit" name="create" @click="isUploadSingle = true"></q-icon>
        <div class="dashboard-cover-img">
          <img class="dashboard-cover-img__image" :src="dataProfile && dataProfile.user_picture && dataProfile.cover_picture.url || 'statics/cover-sample.jpeg'" alt="">
        </div>
      </div>
      <div class="flex d-avatar">
        <div class="d-avatar-middle--photo">
          <div class="d-avatar-wrap">
            <q-icon class="icon-edit d-avatar-icon__bottom" name="create" @click="isUploadMultiple = true, isUserPicture = true"></q-icon>
            <button>
              <img class="d-avatar-img__image" :src="dataProfile && dataProfile.user_picture && dataProfile.user_picture.picture.url" alt="">
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
    <q-dialog v-model="isUploadMultiple" @hide="isUserPicture = false">
      <q-card>
        <div class="q-pa-md">
        <Upload :factory="factoryFn" :multiple="isUserPicture ? false: true"/>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUploadSingle">
      <q-card>
        <div class="q-pa-md">
        <Upload :factory="factoryFnSingle" :multiple="false"/>
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
import '../css/pages/dashboard.scss'
import { Loading, LocalStorage, Notify } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { objectToFormData } from 'object-to-formdata'
import Upload from 'src/components/Upload'
import axios from 'axios'
export default {
  name: 'login',
  components: { Upload },
  data () {
    return {
      test: '',
      dataProfile: {},
      isEdit: false,
      isEditCareer: false,
      isUploadMultiple: false,
      isUploadSingle: false,
      isUserPicture: false,
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
    factoryFnSingle (file) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        const fileData = new FormData()
        fileData.append('image', file[0])
        const response = this.$axios.post('/api/v1/uploads/cover', fileData)
        response.then((res) => {
          if (res.status === 201) {
            this.isUploadSingle = false
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
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        const fileData = new FormData()
        fileData.append('image', file[0])
        const response = this.$axios.post('/api/v1/uploads/profile', fileData)
        response.then((res) => {
          if (res.status === 201) {
            this.isUploadMultiple = false
            if (this.isUserPicture) {
              this.isUserPicture = false
              this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
              const response = this.$axios.post('/api/v1/uploads/profile/default', 'id=' + res.data.data.user_picture.id)
              response.then((res) => {
                if (res.status === 201) {
                  this.initProfile()
                  Notify.create({
                    type: 'positif',
                    message: 'Upload Succesfully'
                  })
                }
              })
            } else {
              this.initProfile()
              Notify.create({
                type: 'positif',
                message: 'Upload Succesfully'
              })
            }
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
