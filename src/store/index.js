import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scrollTop: 0,
    isLoading: true
  },
  mutations: {
    getScrollTop(state,payload){
      state.scrollTop = payload
    },
    setLoadingStatus(state,payload){
      state.isLoading = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
