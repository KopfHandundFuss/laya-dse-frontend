import http from 'axios'

import roles from '../../misc/roles.js'

export default {
  state: {
    userId: 0,
    online: false,
    role: roles.STUDENT
  },
  getters: {
    isAuthor (state) {
      return state.role === roles.AUTHOR
    }
  },
  mutations: {
    setRole (state, role) {
      state.role = role
    },
    login (state, {id, userId}) {
      state.online = true
      state.userId = userId

      http.defaults.headers.common['Authorization'] = id
    },
    logout (state) {
      state.online = false
      state.userId = -1
      state.role = roles.STUDENT

      delete http.defaults.headers.common['Authorization']
    }
  },
  actions: {
    fetchRole ({commit, state}) {
      http.get(`accounts/${state.userId}/role`)
        .then(({data}) => commit('setRole', data.role))
        .catch(err => console.error(err))
    }
  }
}
