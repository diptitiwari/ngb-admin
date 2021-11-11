import {SET_ROLES, CREATE_ROLE } from "./types"
import { SET_CLIENT_COUNTS } from '../dashboard/types'

export default {
  setRoles ({ commit }, data) {
    commit(SET_ROLES, data)
  },
  createRole ({ commit }, data) {
    commit(CREATE_ROLE, data)
  }
}
