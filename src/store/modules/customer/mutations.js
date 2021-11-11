import _ from 'lodash'
import * as types from './types'
const mutations = {
  [types.SET_CLIENTS] (state, payload) {
    Object.assign(state, { clients: payload })
  },
  [types.SET_CLIENTS_TEMPLATE] (state, payload) {
    Object.assign(state, { template: payload })
  },
  [types.SET_CLIENTS_SERVICE_TEMPLATE] (state, payload) {
    Object.assign(state, { serviceTemplate: payload })
  },
  [types.SET_CLIENT] (state, payload) {
    Object.assign(state, { clientDetail: payload })
  },
  [types.SET_CLIENT_NOTES] (state, payload) {
    Object.assign(state, { notes: payload })
  },
  [types.SET_CLIENT_IDENTIFIER] (state, payload) {
    Object.assign(state, { identifiers: payload })
  },
  [types.SET_IDENTIFIER_TEMPLATE] (state, payload) {
    Object.assign(state, { identifierTemplate: payload })
  },
  [types.SET_IDENTIFIER_DOCUMENT] (state, payload) {
    const identifiers = _.cloneDeep(state.identifiers);
    const index = _.findIndex(identifiers, {id: payload.identifierId});
    identifiers[index].document = payload.data;
    Object.assign(state, { identifiers: identifiers })
  },
  [types.SET_CLIENT_DOCUMENT] (state, payload) {
    Object.assign(state, { clientDocuments: payload })
  },
  [types.UPDATE_TAX_EXEMPTION] (state, payload) {
    let clientDetail = _.cloneDeep(state.clientDetail);
    clientDetail.taxExemption = payload;
    Object.assign(state, { clientDetail: clientDetail })
  },
  [types.SET_BILL_PROFILE_DATA] (state, payload) {
    Object.assign(state, { clientBillProfile: payload })
  },
  [types.SET_CLIENT_CHILD] (state, payload) {
    Object.assign(state, { childList: payload })
  },
  [types.SET_CLIENT_TICKETS] (state, payload) {
    Object.assign(state, { tickets: payload })
  },
  [types.SET_TICKET_TEMPLATE] (state, payload) {
    Object.assign(state, { ticketTemplate: payload })
  },
  [types.SET_CLIENT_EVENT_ORDERS] (state, payload) {
    Object.assign(state, { eventOrders: payload })
  },
  [types.SET_TRANSACTION_DETAILS] (state, payload) {
    Object.assign(state, { transactionDetails: payload })
  },
  [types.SET_CLIENT_BILL_MASTER_DATA] (state, payload) {
    Object.assign(state, { billMaster: payload })
  },
  [types.SET_CREDIT_CARD_DETAILS] (state, payload) {
    Object.assign(state, { creditCardDetails: payload })
  },
  [types.SET_CLIENT_ADDITIONAL_INFO] (state, payload) {
    Object.assign(state, { additionalInfo: payload })
  },
  [types.SET_ONE_TIME_SALES] (state, payload) {
    Object.assign(state, { oneTimeSales: payload })
  },
  [types.SET_ORDER] (state, payload) {
    Object.assign(state, { orderDetail: payload })
  },


}

export default mutations
