import * as types from "./types"

const mutations = {
  [types.SET_ROLES](state, payload) {
    Object.assign(state, {roles: payload})
  },
  [types.CREATE_ROLE](state, payload) {
    const roles = state.roles;
    roles.push(payload);
    Object.assign(state, {roles})
  },
}

export default mutations;
