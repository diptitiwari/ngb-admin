import { SET_ENTITIES, SET_TEMPLATE, SET_ENTITIE, SET_ENTITY_TICKETS,SET_ENTITY_CUSTOMERS,SET_TICKET_TEMPLATE, SET_CITY_TEMPLATE ,SET_ADJUSTMENTS_TEMPLATE, UPDATE_ENTITIES} from './types'

export default {
  setEntities({ commit }, data) {
    commit(SET_ENTITIES, data);
  },
  setTemplate({ commit }, data) {
    commit(SET_TEMPLATE, data);
  },
  setEntityDetail({ commit }, data) {
    commit(SET_ENTITIE, data)
  },
  setEntityTickets ({ commit }, data) {
    commit(SET_ENTITY_TICKETS, data)
  },  
  setEntityCustomers ({ commit }, data) {
    commit(SET_ENTITY_CUSTOMERS, data)
  },
  setTicketTemplate ({ commit }, data) {
    commit(SET_TICKET_TEMPLATE, data)
  },
  setAdjustmentsTemplate ({ commit }, data) {
    commit(SET_ADJUSTMENTS_TEMPLATE, data)
  },
  updateEntities({ commit }, data) {
    commit(UPDATE_ENTITIES, data);
},
  // setCityTemplate ({ commit }, data) {
  //   commit(SET_CITY_TEMPLATE, data)
  // },
}
