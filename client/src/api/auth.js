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
  createAccount(username, password, passwordConfirmation, email) {
    return instance.post('/register/',{
      username,
      password,
      passwordConfirmation,
      email
    })
  },
  getArticle(keys, packSize, packIndex) {
    return instance.get('/search/', {
      params: {
        keys,
        packSize,
        packIndex
      }
    })
  }
}
