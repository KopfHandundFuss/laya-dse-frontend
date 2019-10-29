import Vue from 'vue'
import Vuex from 'vuex'

/* modules */
import auth from './modules/auth.js'
import note from './modules/note.js'
import profile from './modules/profile.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log(debug ? 'vuex in debug mode' : '')

export default new Vuex.Store({
  modules: {
    auth,
    note,
    profile
  },
  strict: debug
})
