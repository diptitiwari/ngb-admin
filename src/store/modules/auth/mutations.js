import * as types from './types'

const mutations = {
  [types.SET_USER] (state, payload) {
    Object.assign(state, {isLogin: true, user: payload});
  },
  [types.SET_TOKEN] (state, payload) {
    state.token = payload;
  },
  [types.LOGOUT] (state) {
    Object.assign(state,{isLogin: false, user: {}});
  },
  [types.SET_USER_DETAIL] (state, payload) {
    Object.assign(state,{userDetails: payload});
  }
}

export default mutations
