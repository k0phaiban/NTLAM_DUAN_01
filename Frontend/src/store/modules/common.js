const state = {
    tenantID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userID: "",
    employeeID: 1,
    token: null,
    listRole: null
  }
  
  const mutations = {
    setTenantID(state,val){
      state.tenantID = val;
    },
    setToken(state,val){
      state.token = val;
    },
    setListRole(state,val){
      state.listRole = val;
    }
  }
  
  const actions = {
    setTenantID({ commit }, val) {
      commit('setTenantID',val)
    },
    setToken({ commit },val){
      commit('setToken',val)
    },
    setListRole({ commit },val){
      commit('setListRole',val)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }