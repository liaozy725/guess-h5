import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import router from './router/index'
import store from './store/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/style/common.css';
import VueBetterCalendar from 'vue-better-calendar'
import axios from 'axios'
import qs from 'qs';
import {Toast} from 'vant'


if (process.env.NODE_ENV == 'production') {
  // 生产环境
  axios.defaults.baseURL = window.g.baseURL;
} else {
  axios.defaults.baseURL = '/apis/';
}

/* 请求拦截 */
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.withCredentials = true;
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return config;
}, error => {
  // 对请求错误做些什么
  Toast.fail("请求过程中发生了错误");
  console.log("请求过程发生的错误消息：" + error);
  return Promise.reject(error);
});

let iconWarining = require('@/assets/icon-warning.png');

/* 响应处理 */
axios.interceptors.response.use(response=>{
  try {
    if(response.data.retCode=='0'){
      return response.data;
    }else if(response.data.retCode == '10002') {
      Toast({
        message:response.data.errorMsg || '退出登录',
        icon:iconWarining
      });
      router.replace('/login');
      return response.data;
    }else{
      Toast({
        message:response.data.errorMsg || '请求异常，请于管理员联系',
        icon:iconWarining
      });
      return response.data;
    }
  } catch (error) {
    Toast({
      message:'处理返回的数据发生异常',
      icon:iconWarining
    });
  }
},error=>{
  Toast({
    message:"网络连接异常,请稍后再试",
    icon:iconWarining
  });
  return Promise.reject(error);
})

Vue.prototype.$http = axios;
Vue.prototype.qs = qs;

Vue.use(Vant);
Vue.use(VueBetterCalendar)
Vue.config.productionTip = false

// 从本地获取token  userInfo 缓存
try {
  let token = localStorage.getItem('token');
  let userInfo = localStorage.getItem('userInfo');
  if(token) store.commit("setToken",token);
  if(userInfo) store.commit("setUserInfo",JSON.parse(userInfo));
} catch (error) {
  
}
// // 过滤器
import * as myFilter from './utils/filter'

Object.keys(myFilter).forEach(key => {
    Vue.filter(key, myFilter[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
