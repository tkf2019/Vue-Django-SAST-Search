<template>
  <div id="register">
    <div class="register-box">
      <h1>
        Register
      </h1>
      <p>
        SAST Search, Search Whatever You Want.
      </p>
    </div>
    <div id="register-form">
      <template v-if="registrationLoading">
        <h3 class="loading">Loading...</h3>
      </template>
      <template v-else-if="!registrationCompleted">
        <div v-for="(value, key) in errorForm" :key="key">
          <user-input :placeHolder="key"
            @input="catchInput"></user-input>
          <div v-for="err in value" :key="err" id="error">
            {{err}}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="button-box">
          <router-link to="/home/login" replace>
            Log in Now
          </router-link>
        </div>
      </template>

      <div class="button-box">
        <router-link to="/home/login" replace>
          Back
        </router-link>
        <a @click="create(registerForm)">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserInput from '@/components/UserInput'
import Validator from "@/utils/validator"

export default {
  name: 'UserRegister',
  components: {
    UserInput
  },
  data() {
    return {
      errorForm: {
        'Username': [],
        'Password': [],
        'Password Confirm': [],
        'Email': []
      },
      registerForm: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: ''
      },
      validator: new Validator()
    }
  },
  computed: mapState('register', [
    'registrationCompleted',
    'registrationError',
    'registrationLoading'
  ]),
  methods: {
    routeJump(type) {
      if (type === 'back') {
        this.$router.go(-1)
      } else if (type === 'login') {
        this.$router.replace('/user/login')
      }
    },
    catchInput(event, value, type) {
      let user = this.registerForm
      this.errorForm[type].splice(0, this.errorForm[type].length)
      
      if (type === "Username") {
        this.registerForm.username = value
        this.validator.add(user.username, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Username Cannot be Empty!'
        }])
      } else if (type === "Password") {
        this.registerForm.password = value
        this.validator.add(user.password, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Password Cannot be Empty!'
        }])
      } else if (type === "Password Confirm") {
        this.registerForm.passwordConfirm = value
        let str = 'compare:' + this.registerForm.password
        this.validator.add(user.passwordConfirm, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Password Confirm Cannot be Empty!'
        }, {
          strategy: str,
          errorMessage: 'Entered Passwords Differ!'
        }])
      } else if (type === "Email") {
        this.registerForm.email = value
        this.validator.add(user.email, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Email Cannot be Empty!'
        }, {
          strategy: 'isEmail',
          errorMessage: 'Please Enter a Valid Email!'
        }])
      }
      this.validator.check(event, () => {}, err => {
        this.errorForm[type].push(err)
      })
    },
    create(form) {
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
        this.createAccount(form)
      } else {
        alert('Wrong Input!')
      }
    },
    ...mapActions('register', [
      'createAccount',
      'clearRegistrationStatus'
    ])
  },
  beforeRouteLeave(to, from, next) {
    this.clearRegistrationStatus()
    next()
  }
}
</script>

<style lang="scss">
  #register {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .register-box {
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
    #register-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      #error {
        color: red;
      }
    }
  }
</style>
