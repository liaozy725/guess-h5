import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle:'',
    userInfo: null,
    token: ''
  },
  mutations: {
    // 设置页面标题
    setPageTitle(state,title){
      state.pageTitle = title;
    },
    // 设置用户信息
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
      localStorage.setItem('userInfo',JSON.stringify(userInfo));
    },
    // 设置 token
    setToken(state,token){
      state.token = token;
      localStorage.setItem('token',token);
    },
  },
  actions: {

  }
})
