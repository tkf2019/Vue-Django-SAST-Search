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
        <div id="text">
          {{username}}
        </div>
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
        styles: [
          'steelblue',
          'lightseagreen',
          'darkslategray',
          'palevioletred'
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
      username() {
        return this.$store.getters['auth/userInfo'].name
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
          .then(() => this.$router.push('/home/login'))
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
      #text {
        position: absolute;
        right: 120px;
        margin-right: 20px;
        color: white;
        margin-top: 21px;
        font: {
          weight: 600;
          size: 24px;
        }
      }
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