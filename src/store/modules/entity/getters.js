export default {
  getEntityList (state) {
    return state.list
  },
  template (state) {
    return state.template
  },
  getEntityDetail (state) {
    return state.entityDetail
  },
  getEntityTickets (state) {
    return state.tickets
  },  
  getEntityCustomers (state) {
    return state.customers
  },
  getTicketTemplate (state) {
    return state.ticketTemplate
  },
  getCityTemplate (state) {
    return state.cityTemplate
  },
  getAdjustmentsTemplate (state) {
    return state.adjustmentsTemplate
  },
}
