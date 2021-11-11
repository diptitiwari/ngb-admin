import * as types from './types'

const mutations = {
  [types.SET_TRANSACTION_HISTORY_OFFICE] (state, payload) {
    Object.assign(state, {transactionHistoryOffice: payload});
  }
}

export default mutations
