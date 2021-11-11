export default {
  getClientsList (state) {
    return state.clients
  },
  getClientsTemplate (state) {
    return state.template
  },
  getClientsServiceTemplate (state) {
    return state.serviceTemplate
  },
  getClientDetail (state) {
    return state.clientDetail
  },
  getClientNotes (state) {
    return state.notes
  },
  getClientIdentifiers (state) {
    return state.identifiers
  },
  getIdentifierTemplate (state) {
    return state.identifierTemplate
  },
  getClientDocuments (state) {
    return state.clientDocuments
  },
  getClientBillProfile (state) {
    return state.clientBillProfile
  },
  getClientChild (state) {
    return state.childList
  },
  getClientTickets (state) {
    return state.tickets
  },
  getTicketTemplate (state) {
    return state.ticketTemplate
  },
  getClientEventOrders (state) {
    return state.eventOrders
  },
  getEventOrdersTemplate (state) {
    return state.eventOrderTemplate
  },
  getTransactionDetails (state) {
    return state.transactionDetails
  },
  getBillMasterData (state) {
    return state.billMaster
  },
  getCreditCardDetails (state) {
    return state.creditCardDetails
  },
  getAdditionalInfo (state) {
    return state.additionalInfo
  },
  getOrderDetail (state) {
    return state.orderDetail
  },
}
