import {GET_GOOD_RECEIPT_DETAILS, LOADING_GOOD_RECEIPT_DETAILS} from "./types"
import {GetGoodReceiptDetails} from '../../../http/inventory'

export default {
  async setUser({ commit }) {
    commit({LOADING_GOOD_RECEIPT_DETAILS})
    const goodReceiptDetails = await GetGoodReceiptDetails();

    commit(GET_GOOD_RECEIPT_DETAILS, data)
  },
}
