import { SET_TOKEN, SET_USER, LOGOUT, SET_USER_DETAIL } from './types'

export default {
  setUser ({ commit }, data) {
    commit(SET_USER, data);
  },
  setToken ({ commit }, data) {
    commit(SET_TOKEN, data);
  },
  logout ({ commit }) {
    commit(LOGOUT);
  },
  setUserDetail({ commit }, data) {
    commit(SET_USER_DETAIL, data);
  },
}
