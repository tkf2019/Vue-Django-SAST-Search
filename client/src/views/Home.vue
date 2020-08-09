<template>
  <div id="home">
    <div id="main">
      <nav-bar></nav-bar>
      <template v-if="isHome">
        <router-link to="/home/search" class="start-button" replace>
          <p>Start Now</p>
        </router-link>
      </template>
      <router-view></router-view>
    </div>
    <footer>
      <p>
        @SAST <a href="">TKF</a> Vue-Django-Search-Project
      </p>
    </footer>
  </div>
</template>

<script>
  import NavBar from '@/components/nav'
  export default {
    name: 'Home',
    components: {
      NavBar
    },
    computed: {
      isHome() {
        if (this.$route.name === 'Home') {
          return true
        }
      }
    }
  }
</script>

<style lang="scss">
  #home {
    width: 100%;
    height: 100%;
    #main {
      min-height: calc(100vh - 80px);
      .start-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 180px;
        color: white;
        p {
          transition-duration: 0.3s;
          font: {
            size: 48px;
            weight: 800;
          }
        }
        p:hover {
          color: black;
          transform: scale(1.1, 1.1);
        }
      }
    }
    footer {
      width: 100%;
      bottom: 0;
      text-align: center;
      height: 80px;
      p {
        font-size: 16px;
        padding: 20px 0;
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }
  }

   .button-box {
      display: flex;
      a {
        margin:20px 50px;
        transition-duration: 0.3s;
        color: white;
        font-size: 18px;
        &:hover {
          color: black;
          transform: scale(1.1, 1.1);
          cursor: pointer;
        }
      }
    }
</style>


