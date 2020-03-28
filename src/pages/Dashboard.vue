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
          <div class="d-msg d-profile-pd"><q-btn rounded  class="d-btn" label="Message" /></div>
          <div class="d-inbox d-profile-pd"><q-btn outline class="d-btn d-btn__outline" rounded>
            <q-icon name="inbox"></q-icon>
          </q-btn>
          </div>
          <div class="d-logout d-profile-pd"><q-btn outline class="d-btn d-btn__outline d-btn__grey" rounded label="Logout" /></div>
        </div>
        <h1>Anung Aninditha</h1>
        <h2>Indonesia</h2>
      </div>
      <div class="d-about">
        <h1 class="d-about__title d-title">About</h1>
        <div class="d-about__content">
          <p>I have excellent experience Frontend developer and exited with ui/ux. Dedicated and passionate software engineer, Badminton addict. Currently very interested in web technology. Fun experiment with new technology. "Talk Less Do More"</p>
        </div>
      </div>
      <section class="d-card d-education">
        <q-btn rounded  class="d-btn d-card-btn" label="Update" />
        <h1 class="d-about__title d-title">Educations</h1>
        <div class="flex d-card-item">
          <div class="d-card-item__avatar d-education-avatar">
            <span>ED</span>
          </div>
          <div class="d-card-item__content">
            <h1>SMP 3 MOJOSONGO BOYOLALI</h1>
            <span>2007</span>
          </div>
        </div>
      </section>
      <section class="d-card d-career">
        <q-btn rounded  class="d-btn d-card-btn" label="Update" />
        <h1 class="d-about__title d-title">Careers</h1>
        <div class="flex d-card-item">
          <div class="d-card-item__avatar d-career-avatar">
            <span>ED</span>
          </div>
          <div class="d-card-item__content">
            <h1>OKTAGON</h1>
            <h2>Frontend Web Developer</h2>
            <span>2007 - 2010</span>
          </div>
        </div>
        <div class="flex d-card-item">
          <div class="d-card-item__avatar d-career-avatar">
            <span>ED</span>
          </div>
          <div class="d-card-item__content">
            <h1>OKTAGON</h1>
            <h2>Frontend Web Developer</h2>
            <span>2007 - 2010</span>
          </div>
        </div>
        <div class="flex d-card-item">
          <div class="d-card-item__avatar d-career-avatar">
            <span>ED</span>
          </div>
          <div class="d-card-item__content">
            <h1>OKTAGON</h1>
            <h2>Frontend Web Developer</h2>
            <span>2007 - 2010</span>
          </div>
        </div>
      </section>
      <section class="d-card d-gallery">
        <h1 class="d-about__title d-title">Photos</h1>
        <div class="row">
          <div class="col-4">
            <div class="d-gallery-item">
              <img src="statics/avatar-sample.jpeg" alt="">
            </div>
          </div>
          <div class="col-4">
            <div class="d-gallery-item">
              <img src="statics/avatar-sample.jpeg" alt="">
            </div>
          </div>
          <div class="col-4">
            <div class="d-gallery-item">
              <img src="statics/avatar-sample.jpeg" alt="">
            </div>
          </div>
          <div class="col-4">
            <div class="d-gallery-item">
              <img src="statics/avatar-sample.jpeg" alt="">
            </div>
          </div>
          <!-- <div class="col-4">
            <div class="d-gallery-item">
              <img src="statics/cover-sample.jpeg" alt="">
              <div class="d-img-overlay"></div>
              <div class="d-img-blur" style="background-image:url('statics/cover-sample.jpeg')"></div>
            </div>
          </div> -->
        </div>
        <div class="d-gallery-btn">
          <q-btn rounded  class="d-btn" label="Upload" />
        </div>
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
  name: 'login',
  data () {
    return {
      test: '',
      dataProfile: {}
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
    initProfile () {
      Loading.show()
      console.log(LocalStorage.getItem('access_token'))
      // const config = {
      //   auth: 'test ' + LocalStorage.getItem('access_token')
      // }
      this.$axios.defaults.headers.common.Authorization = '757cc833a6910bedc048e0f23637a899a913b52e6e603d5f77314bf6525d4765'
      this.$axios.get(this.$API + '/profile/me')
        .then(({ data }) => {
          Loading.hide()
          this.dataProfile = data
          console.log(data)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Loading.hide()
          console.log(err)
        })
    }
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
          img {
            width : 100%;
            height : 100%;
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
