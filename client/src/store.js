import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: "",
    search: "",
    isLogin: false,
    popular: 0,
    mostAnswer: 0,
    allQuestions: 0
  },
  mutations: {
    getIsLogin: function (state, payload) {
      state.isLogin = payload
    },
    getUserEmail: function (state, payload) {
      state.userEmail = payload
    },
    getSearch: function (state, payload) {
      state.search = payload
    },
    getPopular: function (state, payload) {
      state.popular = payload
    },
    getMostAnswer: function (state, payload) {
      state.mostAnswer = payload
    },
    getAllQuestions: function (state, payload) {
      state.allQuestions = payload
    }
  },
  actions: {
    setIslogin: function ({ commit, dispatch }, payload) {
      let token = localStorage.getItem("token")
      if(token) {
        commit("getIsLogin", true)
      } else {
        commit("getIsLogin", false)
      }
    },
    setUserEmail: function ({commit, dispatch}, payload) {
      let email = localStorage.getItem('email')
      commit('getUserEmail', email)
    },
    setSearch: function ({commit, dispatch}, payload) {
      commit("getSearch", payload)
    },
    setPopularQuestion: function ({commit, dispatch}, payload) {
      commit("getPopular", payload)
    },
    setMostAnswer: function ({commit, dispatch}, payload) {
      commit("getMostAnswer", payload)
    },
    setAllQuestions: function ({commit, dispatch}, payload) {
      commit("getAllQuestions", payload)
    }
  }
})
