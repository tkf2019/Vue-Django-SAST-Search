import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import register from './register'
import search from './search'
import upload from './upload'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    register,
    search,
    upload
  }
})
