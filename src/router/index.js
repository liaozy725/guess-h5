import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Home.vue'
import store from '@/store/index'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'',
      redirect:'/layout/home'
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children:[
        //首页
        {path:'/layout/home',name:'home',component: Home,meta: { keepAlive: true }},
        // 首页 - 竞猜详情
        {path:'/layout/GuessDetail',name:'GuessDetail',component: () => import('@/views/Home/GuessDetail.vue') ,meta: { keepAlive: true, title:'竞猜' }},
        // 首页 - 赛果
        {path:'/layout/GuessRes',name:'GuessRes',component: () => import('@/views/Home/GuessRes.vue') ,meta: { keepAlive: true, title:'赛果' }},
        // 首页 - 赛果详情
        {path:'/layout/GuessResDetail',name:'GuessResDetail',component: () => import('@/views/Home/GuessResDetail.vue') ,meta: { keepAlive: true, title:'赛果详情' }},
        // 历史竞猜
        {path:'/layout/GuessHistory',name:'GuessHistory',component: () => import('@/views/Home/GuessHistory.vue') ,meta: { keepAlive: true, title:'投注历史' }},
        //用户中心-充值
        {path:'/layout/pay',name:'pay',component: () => import('@/views/User/pay.vue'),meta: { keepAlive: true ,title:'充值',}},
        //用户中心-充值-二维码弹框
        {path:'/layout/payCode',name:'payCode',component: () => import('@/views/User/payCode.vue'),meta: { keepAlive: true ,title:'充值二维码',}},
        //用户中心-系统消息
        {path:'/layout/SystemMsg',name:'SystemMsg',component: () => import('@/views/User/SystemMsg.vue'),meta: { keepAlive: true ,title:'系统消息',}},
        //用户中心-提现
        {path:'/layout/withdraw',name:'withdraw',component: () => import('@/views/User/withdraw.vue'),meta: { keepAlive: true ,title:'提现',}},
        //用户中心-银行卡详情表
        {path:'/layout/BankcardInfo',name:'BankcardInfo',component: () => import('@/views/User/BankcardInfo.vue'),meta: { keepAlive: true ,title:'银行卡',}},
        //用户中心-银行卡编辑
        {path:'/layout/BankcardEdit',name:'BankcardEdit',component: () => import('@/views/User/BankcardEdit.vue'),meta: { keepAlive: true ,title:'编辑银行卡',}},
        //用户中心-财务流水
        {path:'/layout/stream',name:'stream',component: () => import('@/views/User/stream.vue'),meta: { keepAlive: true ,title:'财务流水',}},
        //用户中心-账户安全
        {path:'/layout/AccountSafe',name:'AccountSafe',component: () => import('@/views/User/AccountSafe.vue'),meta: { keepAlive: true ,title:'账户安全',}},
        //用户中心-绑定手机
        {path:'/layout/ChangeMobile',name:'ChangeMobile',component: () => import('@/views/User/ChangeMobile.vue'),meta: { keepAlive: true ,title:'绑定手机',}},
        //用户中心-修改密码
        {path:'/layout/ChangePwd',name:'ChangePwd',component: () => import('@/views/User/ChangePwd.vue'),meta: { keepAlive: true ,title:'修改密码',}},
        //用户中心-修改支付密码
        {path:'/layout/ChangePayPwd',name:'ChangePayPwd',component: () => import('@/views/User/ChangePayPwd.vue'),meta: { keepAlive: true ,title:'修改支付密码',}},
        //用户中心-修改支付密码
        {path:'/layout/Bonus',name:'Bonus',component: () => import('@/views/User/Bonus.vue'),meta: { keepAlive: true ,title:'奖金',}},
        //用户中心-我的直接下属
        {path:'/layout/MySub',name:'MySub',component: () => import('@/views/User/MySub.vue'),meta: { keepAlive: true ,title:'设置',}},
        //用户中心-我的直接下属 - 下属详情
        {path:'/layout/SubDetail',name:'SubDetail',component: () => import('@/views/User/SubDetail.vue'),meta: { keepAlive: true ,title:'下属详情',}},
      ]
    },
    /*******登录********/
    {
      path:'/login',
      name: 'login',
      component: () => import('@/views/Other/Login.vue')
    },
  ]
})

router.beforeEach((to,from,next)=>{
  store.commit('setShowDatePicker',false);
  store.commit('changeTime','');
  next()
})

export default router;