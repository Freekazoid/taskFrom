import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: '',
    DB: [],
    total_count: 0,
    per_page: 10,
    currentPage: 1,
    loader: false
  },
  mutations: {
    set_loader(state, data) {
      state.loader = data
    },
    setSearch(state, data) {
      state.search = data
    },
    add_DB(state, data) {
      state.DB = data
    },
    add_count_DB(state, data){
      state.total_count = data
    },
    toggle_per_page(state, data){
      state.per_page = data
    },
    toggle_current_page(state, data) {
      state.currentPage = data
    }
  },
  actions: {
    setTextSearch({ commit }, data) {
      commit('setSearch', data);
    },
    togglePerPage({ commit }, data) {
      commit('toggle_per_page', data);
    },
    togglePerPage({ commit }, data) {
      commit('toggle_per_page', data);
    },
    toggleCountDB({ commit }, data) {
      commit('add_count_DB', data);
    },
    toggleCurrentPage({ commit }, data) {
      commit('toggle_current_page', data);
    },
    setDB({ commit }, data) {
      commit('add_DB', data);
    },
    getDB({ commit, state }, query) {
      commit('set_loader', true)
      return new Promise((resolve, reject) => {
        axios({
          url: `https://api.github.com/search/repositories?q=${query}&per_page=${state.per_page}&page=${state.currentPage}`,
          method: 'GET'
        })
          .then(resp => {
            const DB = resp.data.items.map(item => {
              return {
                id: item.id, 
                name: item.name,
                description: item.description,
                owner: item.owner,
                stargazers_count: item.stargazers_count,
                watchers_count: item.watchers_count,
                html_url: item.html_url,
                comment: []
              }
            })
            localStorage.setItem('DB', JSON.stringify(DB))
            localStorage.setItem('total_count', JSON.stringify(resp.data.total_count))
            localStorage.setItem('search', query)
            localStorage.setItem('per_page', state.per_page)
            localStorage.setItem('current_page', state.currentPage)
            commit('add_DB', DB)
            commit('add_count_DB', resp.data.total_count)
            commit('setSearch', query)
            

            commit('set_loader', false)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    saveCommentToCard({ commit, state }, data) {
      state.DB.forEach(item => {
        if(item.id === data.id)
          item.comment.push(data.comment)
      })
      localStorage.setItem('DB', JSON.stringify(state.DB))
      commit('add_DB', state.DB)
    }
  },
  getters: {
    ifRequest(state) {
      let DBstor = localStorage.getItem('DB'),
        totalCount = localStorage.getItem('total_count'),
        search = localStorage.getItem('search'),
        per_page = localStorage.getItem('per_page')

      if (DBstor !== null && totalCount !== null && state.search === search) {
        DBstor = JSON.parse(DBstor)
        totalCount = JSON.parse(totalCount)
        return false
      } else {
        return true
      }
    }
  },
  modules: {}
})