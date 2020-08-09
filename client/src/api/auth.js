import instance from './index'

export default {
  // LOGIN relevant functions
  login(username, password) {
    return instance.post('/login/', {
      username,
      password
    })
  },
  logout() {
    return instance.post('/logout/', {})
  },
  // REGISTER relevant functions
  createAccount(username, password, passwordConfirmation) {
    return instance.post('/register/',{
      username,
      password,
      passwordConfirmation
    })
  },
  getArticle(keys) {
    return instance.get('/search/', {
      params: {
        keys
      }
    })
  }
}
