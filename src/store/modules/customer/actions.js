import { SET_CLIENTS, SET_CLIENTS_TEMPLATE, SET_CLIENT, SET_CLIENT_NOTES, SET_CLIENT_IDENTIFIER,
  SET_IDENTIFIER_TEMPLATE, SET_IDENTIFIER_DOCUMENT, SET_CLIENT_DOCUMENT, UPDATE_TAX_EXEMPTION,
  SET_BILL_PROFILE_DATA, SET_CLIENT_CHILD, SET_CLIENT_TICKETS, SET_TICKET_TEMPLATE, SET_CLIENT_EVENT_ORDERS,
  SET_EVENT_ORDER_TEMPLATE, SET_TRANSACTION_DETAILS, SET_CLIENT_BILL_MASTER_DATA, SET_CLIENTS_SERVICE_TEMPLATE,
  SET_CREDIT_CARD_DETAILS, SET_CLIENT_ADDITIONAL_INFO,SET_ONE_TIME_SALES,SET_ORDER } from './types';

export default {
  setClient ({ commit }, data) {
    commit(SET_CLIENTS, data)
  },
  setClientTemplate ({ commit }, data) {
    commit(SET_CLIENTS_TEMPLATE, data)
  },
  setClientServiceTemplate ({ commit }, data) {
    commit(SET_CLIENTS_SERVICE_TEMPLATE, data)
  },
  setClientDetail({ commit }, data) {
    commit(SET_CLIENT, data)
  },
  setClientNotes({ commit }, data) {
    commit(SET_CLIENT_NOTES, data)
  },
  setClientIdentifier ({ commit }, data) {
    commit(SET_CLIENT_IDENTIFIER, data)
  },
  setIdentifierTemplate ({ commit }, data) {
    commit(SET_IDENTIFIER_TEMPLATE, data)
  },
  setIdentifierDocument ({ commit }, data) {
    commit(SET_IDENTIFIER_DOCUMENT, data)
  },
  setClientDocuments({ commit }, data) {
    commit(SET_CLIENT_DOCUMENT, data)
  },
  updateTaxExemption({ commit }, data) {
    commit(UPDATE_TAX_EXEMPTION, data)
  },
  setBillProfileData({ commit }, data) {
    commit(SET_BILL_PROFILE_DATA, data)
  },
  setClientChild({ commit }, data) {
    commit(SET_CLIENT_CHILD, data)
  },
  setClientTickets ({ commit }, data) {
    commit(SET_CLIENT_TICKETS, data)
  },
  setTicketTemplate ({ commit }, data) {
    commit(SET_TICKET_TEMPLATE, data)
  },
  setClientEventOrders({ commit }, data) {
    commit(SET_CLIENT_EVENT_ORDERS, data)
  },
  setEventOrderTemplate({ commit }, data) {
    commit(SET_EVENT_ORDER_TEMPLATE, data)
  },
  setTransactionDetails({ commit }, data) {
    commit(SET_TRANSACTION_DETAILS, data)
  },
  setBillMasterData({ commit }, data) {
    commit(SET_CLIENT_BILL_MASTER_DATA, data)
  },
  setCreditCardDetails({ commit }, data) {
    commit(SET_CREDIT_CARD_DETAILS, data)
  },
  setAdditionalInfo({ commit }, data) {
    commit(SET_CLIENT_ADDITIONAL_INFO, data)
  },
  setOneTimeSales({ commit }, data) {
    commit(SET_ONE_TIME_SALES, data)
  },
  setOrderDetail({ commit }, data) {
    commit(SET_ORDER, data)
  },
}
