export default {
  getUser (state) {
    return state.user
  },
  getToken (state) {
    return state.user.base64EncodedAuthenticationKey
  },
  getStatus (state) {
    return state.status
  },
  isLogin (state) {
    return state.isLogin
  },
  isloading (state) {
    return state.loading
  },
  userDetail (state) {
    return state.userDetails;
  }
}
