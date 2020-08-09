<template>
  <div id="login">
    <div class="login-box">
      <h1>
        Log in
      </h1>
      <p>
        SAST Search, Search Whatever You Want.
      </p>
    </div>
    <div id="login-form" class="login-box">
      <template v-if="authenticating">
        <p class="loading">
          Loading...
        </p>
      </template>

      <template v-else>
        <div v-for="(value, key) in errorForm" :key="key">
          <user-input :placeHolder="key"
            @input="catchInput"></user-input>
          <div v-for="err in value" :key="err" id="error">
            {{err}}
          </div>
        </div>
      </template>

      <div class="button-box">
        <router-link to="/home/register">
          Sign up?
        </router-link>
        <a @click="login(loginForm)">Log in</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import UserInput from '@/components/UserInput'
  import Validator from '@/utils/validator'

  export default {
    name: 'Login',
    components: {
      UserInput
    },
    data() {
      return {
        errorForm: {
          'Username': [],
          'Password': []
        },
        loginForm: {
          username: '',
          password: ''
        },
        validator: new Validator()
      }
    },
    computed: mapState('auth', [
      'authenticating',
      'error'
    ]),
    methods: {
      catchInput(event, value, type) {
        let user = this.loginForm
        this.errorForm[type].splice(0, this.errorForm[type].length)

        if(type === 'Username') {
          this.loginForm.username = value
          this.validator.add(user.username, event, [{
            strategy: 'isNoEmpty',
            errorMessage: 'Username Cannot be Empty!'
          }])
        } else if(type === 'Password') {
          this.loginForm.password = value
          this.validator.add(user.username, event, [{
            strategy: 'isNoEmpty',
            errorMessage: 'Password Cannot be Empty!'
          }])
        }
        this.validator.check(event, ()=>{}, err => {
          this.errorForm[type].push(err)
        })
      },
      login (form) {
        let errorExist = false
        let formBlank = false
        for (let key in this.errorForm) {
          if (this.errorForm[key].length != 0) {
            errorExist = true
            break
          }
        }
        for (let key in form) {
          if (!!form[key]) {
            continue
          } else {
            formBlank = true
          }
        }
        if (!errorExist && !formBlank) {
          this.$store.dispatch('auth/login', form)
            .then(() => this.$router.replace('/home/search'))
        } else {
          alert('Wrong Input!')
        }
      }
    }
  }
</script>

<style lang="scss">
  #login {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 0 0 50%;
      max-width: 50%;
      position: relative;
      width: 100%;
      text-align: center;
      color: white;
      h1 {
        font-size: 48px;
      }
      p {
        font-size: 24px;
        margin-top: 20px;
      }
    }
    #login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 60px;
      
      #error {
        color: red;
      }

     
    }
  }
  
</style>