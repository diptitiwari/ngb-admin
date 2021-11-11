import { SET_TRANSACTION_HISTORY_OFFICE } from './types'

export default {
  setTransactionHistoryOffice({ commit }, data) {
    commit(SET_TRANSACTION_HISTORY_OFFICE, data);
  }
}
