import auth from '../api/auth'
import user from './auth.js'

import {
  UPLOAD_BEGIN,
  UPLOAD_SUCCESS
} from './types'

const state = {
  loading: false,
  error: false
}

const actions = {
  uploadFile({ commit }, file) {
    commit(UPLOAD_BEGIN)
    return auth.upload(file)
      .then(response => {
        let status = response.data.status
        if (status === 'success') {
          user.state.avatar = file
          sessionStorage.setItem('USER_AVATAR', file)
          commit(UPLOAD_SUCCESS)
        }
      })
  }
}

const mutations = {
  [UPLOAD_BEGIN] (state) {
    state.loading = true
    state.error = false
  },
  [UPLOAD_SUCCESS] (state) {
    state.loading = false
    state.error = false
  }
}

export default {
  state,
  actions,
  mutations
}






