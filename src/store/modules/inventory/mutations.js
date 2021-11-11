import * as types from "./types"

const mutations = {
  [types.LOADING_GOOD_RECEIPT_DETAILS](state, payload) {
    Object.assign(state.goodReceipt.isLoading, true)
  },
}

export default mutations;
