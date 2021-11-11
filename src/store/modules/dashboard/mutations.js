import * as types from './types'

const mutations = {
  [types.SET_DASHBOARD_DATA] (state, payload) {
    Object.assign(state, {data: payload});
  },
  [types.SET_CLIENT_COUNTS] (state, payload) {
    Object.assign(state, {clientCounts: payload});
  },
  [types.SET_STB_COUNTS] (state, payload) {
    Object.assign(state, {stbCounts: payload});
  }
}

export default mutations
