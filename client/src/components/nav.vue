<template>
  <div id="nav">
    <nav class="navbar">
      <router-link to="/home/search" class="navbar-brand">
        <img src="@/assets/images/1.png">
      </router-link>
      <style-button v-for="style in styles" :key="style"
        :colorStyle="style">
      </style-button>
      <template v-if="this.$route.name=='Article'">
        <search-input class="nav-input"></search-input>
      </template>
      <template v-if="userExist">
        <template v-if="userAvatarNotExist">
          <div class="navbar-avatar">
            <a @click="changeShowState">
              <img src="@/assets/images/icon4.png">
            </a>
            <transition name="fade">
              <div v-if="showUserInfo" class="user-box">
                <ul>
                  <li>{{user.name}}</li>
                  <li>{{user.createTime}}</li>
                </ul>
              </div>
            </transition>
          </div>
        </template>
        
        <a @click="logout" class="login-button">
            Log out
        </a>
      </template>
      <template v-else>
        <template v-if="this.$route.name=='Search'">
          <router-link to="/home/login" class="login-button">
            Log in
          </router-link>
        </template>
      </template>
    </nav>
  </div>
</template>

<script>
  import styleButton from '@/components/styleButton'
  import SearchInput from '@/components/SearchInput'
  export default {
    name: 'NavBar',
    data() {
      return {
        showUserInfo: false,
        styles: [
          'sky',
          'nature',
          'planet',
          'twilight'
        ]     
      }
    },
    components: {
      styleButton,
      SearchInput
    }, 
    computed: {
      userExist() {
        return this.$store.getters['auth/isAuthenticated']
      },
      userAvatarNotExist() {
        return this.$store.getters['auth/userInfo'].avatar === ''
      },
      user() {
        return this.$store.getters['auth/userInfo']
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
          .then(() => this.$router.push('/home/login'))
      },
      changeShowState() {
        this.showUserInfo = !this.showUserInfo
      }, 
      getAvatar(event) {
        console.log(event.target.files[0])
        let formData = new FormData()
        formData.append('file', event.target.files[0], 'avatar')
       this.$store.dispatch('upload/uploadFile', formData)
      }
    }
  }
</script>

<style lang="scss">
  #nav {
    .navbar {
      height: 90px;
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      z-index: 1020;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      padding: .5rem 1rem;
      box-sizing: border-box;
      
      .nav-input {
        height: 20px;
        align-items: flex-start;
        margin-left: 20px;
        align-self: center;
        input {
          width: 45%;
          &::placeholder {
            font-size: 20px;
          }
        }
      }
    }
    .navbar-brand {
      display: inline-block;
      padding-top: .3125rem;
      padding-bottom: .3125rem;
      margin-right: 1rem;
      font-size: 1.25rem;
      line-height: inherit;
      white-space: nowrap;
    }
    .navbar-avatar {
      position: absolute;
      min-width: 200px;
      right: 20px;
      margin-top: 5px;
      align-items: center;
      transition-duration: 0.3s;
      a:hover {
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
      .user-box {
        border-radius: 10px;
        margin: 0px auto;
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        color: white;
        box-shadow: 1px 1px 5px black;
        ul {
          list-style: none;
          margin: auto;
          text-align: center;
          .avatar-button {
            transition-duration: 0.3s;
            margin-top: 15px;
            font-size: 20px;
            &:hover {
              cursor: pointer;
              color: black;
              transform: scale(1.1, 1.1);
            }
          }
        }
      }
    }
    img {
      width: 60px;
      height: 60px;
    }
    .chooseButton {
      border-radius: 50%;
      margin: 0 5px;
    }
    .login-button {
      position: absolute;
      right: 8px;
      margin-right: 20px;
      color: white;
      margin-top: 19px;
      transition-duration: 0.3s;
      font: {
        weight: 600;
        size: 24px;
      }
      &:hover {
        color: black;
        cursor: pointer;
        transform: scale(1.1, 1.1);
      }
    }
  }
</style>