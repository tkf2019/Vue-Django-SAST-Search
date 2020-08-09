import auth from '@/api/auth'

import {
  SEARCH_BEGIN,
  SEARCH_CLEAR,
  SEARCH_FAILURE,
  SEARCH_SUCCESS
} from './types'

const state = {
  searchCompleted: false,
  searchError: false,
  searchLoading: false,
  searchData: {
    articles: [],
    time: ''
  }
}

const actions = {
  getArticle ({ commit }, keys) {
    commit(SEARCH_BEGIN)
    return auth.getArticle(keys)
      .then(response => {
        commit(SEARCH_SUCCESS)
        state.searchData = response.data
      })
      .catch(() => SEARCH_FAILURE)
  },
  clearSearchStatus ({ commit }) {
    commit(SEARCH_CLEAR)
  }
}

const mutations = {
  [SEARCH_BEGIN] (state) {
    state.searchLoading = true
  },
  [SEARCH_CLEAR] (state) {
    state.searchCompleted = false
    state.searchError = false
    state.searchLoading = false
  },
  [SEARCH_FAILURE] (state) {
    state.searchError = true
    state.searchLoading = false
  },
  [SEARCH_SUCCESS] (state) {
    state.searchCompleted = true
    state.searchError = false
    state.searchLoading = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}