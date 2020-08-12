import auth from '@/api/auth'

import {
  REGISTRATION_BEGIN,
  REGISTRATION_CLEAR,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS
} from './types'

const state = {
  registrationCompleted: false,
  registrationError: false,
  registrationLoading: false
}

const actions = {
  createAccount ({ commit }, {
    username, password, passwordConfirmation, email
  }) {
    commit(REGISTRATION_BEGIN)
    return auth.createAccount(
      username, password, passwordConfirmation, email
    )
      .then(response => {
        let status = response.data.status

        if (status === 'create') {
          commit(REGISTRATION_SUCCESS)
        } else if (status === 'existed') {
          alert('Username Existed!')
          commit(REGISTRATION_FAILURE)
        }
      })
      .catch(error => {
        commit(REGISTRATION_FAILURE)
      })
  },
  clearRegistrationStatus ({ commit }) {
    commit(REGISTRATION_CLEAR)
  }
}

const mutations = {
  [REGISTRATION_BEGIN] (state) {
    state.registrationLoading = true
  },
  [REGISTRATION_CLEAR] (state) {
    state.registrationCompleted = false
    state.registrationError = false
    state.registrationLoading = false
  },
  [REGISTRATION_FAILURE] (state) {
    state.registrationError = true
    state.registrationLoading = false
  },
  [REGISTRATION_SUCCESS] (state) {
    state.registrationCompleted = true
    state.registrationError = false
    state.registrationLoading = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
