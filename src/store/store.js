/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import authModule from './modules/auth'
import dashboardModule from './modules/dashboard'
import entityModule from './modules/entity'
import transactionModule from './modules/transaction'
import permissionsModule from './modules/permissions'
import customerModule from './modules/customer'

/* global process */
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      auth: authModule,
      dashboard: dashboardModule,
      entity: entityModule,
      transaction: transactionModule,
      permissions: permissionsModule,
      customer: customerModule
    },
    getters,
    mutations,
    state,
    actions,
    strict: debug,
})
