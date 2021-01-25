import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './store-tasks'
import users from './store-users'
import projects from './store-projects'
import worksheets from './store-worksheets'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks,
      users,
      projects,
      worksheets

    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
