import { SET_CLIENT_COUNTS, SET_DASHBOARD_DATA, SET_STB_COUNTS } from './types';

export default {
  setDashBoardData ({ commit }, data) {
    commit(SET_DASHBOARD_DATA, data)
  },
  setClientCounts ({ commit }, data) {
    commit(SET_CLIENT_COUNTS, data)
  },
  setSTBCounts ({ commit }, data) {
    commit(SET_STB_COUNTS, data)
  }
}
