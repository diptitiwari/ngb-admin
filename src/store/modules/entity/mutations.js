import * as types from './types';
const mutations = {
  [types.SET_ENTITIES] (state, payload) {
    Object.assign(state, {list: payload});
  },
  [types.SET_TEMPLATE] (state, payload) {
    Object.assign(state, {template: payload});
  },
  [types.SET_ENTITIE] (state, payload) {
    Object.assign(state, {entityDetail: payload});
  },
  [types.SET_ENTITY_TICKETS] (state, payload) {
    Object.assign(state, { tickets: payload })
  }, 
  [types.SET_ENTITY_CUSTOMERS] (state, payload) {
    Object.assign(state, { customers: payload })
  },
  [types.SET_TICKET_TEMPLATE] (state, payload) {
    Object.assign(state, { ticketTemplate: payload })
  },
  [types.SET_ADJUSTMENTS_TEMPLATE] (state, payload) {
    Object.assign(state, { adjustmentsTemplate: payload })
  },
  [types.UPDATE_ENTITIES] (state, payload) {
    const list = state.list;
    let index = _.findIndex(list, {ID: payload.ID});
    list[index] = list;
    Object.assign(state, {list});
  },
  
  // [types.SET_CITY_TEMPLATE] (state, payload) {
  //   Object.assign(state, { cityTemplate: payload })
  // },
  
}

export default mutations
