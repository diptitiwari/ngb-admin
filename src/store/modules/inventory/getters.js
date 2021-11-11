export default {
  getGoodReceiptList(state) {
    return state.goodReceipt.list;
  },
  goodReceiptIsLoading(state) {
    return state.goodReceipt.isLoading;
  }
}
