<template>
  <div class="navigation" id="navigation">
    <div class="nav home" v-if="$store.state.pageTitle=='首页'">
      <div class="home-l">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="home-r" @click="showUserMenu=true;">
        <img src="../assets/user.png" alt />
      </div>
    </div>
    <div class="nav" v-else>
      <div @click="$router.go(-1)" class="nav-l">
        <img src="../assets/icon-l.png" alt />
      </div>
      <div class="nav-center">
        <span>{{$store.state.pageTitle}}</span>
      </div>
      <div class="nav-r">
        <div class="nav-r-box" v-if="showDatePicker">
          <div class="nav-r-btn">
            <span>{{selectTime}}</span>
            <img src="../assets/icon-down-y.png" alt="">
          </div>
          <ul class="nav-r-menu">
            <li>24小时</li>
            <li>48小时</li>
            <li>自定义</li>
          </ul>
        </div>
      </div>
    </div>

    <van-popup class="user-menu" v-model="showUserMenu" position="right" :style="{ width: '50%',height: '100%'}">
      <div class="header">
        <img src="../assets/ig.png" alt />
        <p class="name" v-if="$store.state.userInfo">{{$store.state.userInfo.accountLogin||''}}</p>
        <div class="header-main">
          <div class="item">
            <label>余额</label>
            <p v-if="$store.state.userInfo">{{$store.state.userInfo.userBalance||0}}</p>
            <p v-else>0</p>
          </div>
          <div class="item">
            <label>可提</label>
            <p v-if="$store.state.userInfo">{{$store.state.userInfo.userBalance}}</p>
            <p v-else>0</p>
          </div>
          <!-- <div class="item">
            <label>奖金</label>
            <p>0.0</p>
          </div> -->
        </div>
      </div>
      <div class="menu-list">
        <div @click='goToRouterLink("/layout/pay")' class="link">充值</div>
        <div @click='goToRouterLink("/layout/withdraw")' class="link">提现</div>
        <div @click='goToRouterLink("/layout/GuessHistory")' class="link">投注历史</div>
        <div @click='goToRouterLink("/layout/stream")' class="link">财务流水</div>
        <div @click='goToRouterLink("/layout/AccountSafe")' class="link">账号安全</div>
        <div @click='goToRouterLink("/layout/SystemMsg")' class="link">系统消息</div>
        <div @click='goToRouterLink("/layout/home")' class="link">联系客服</div>
      </div>
      <div class="logout" @click="logout">退出登录</div>
    </van-popup>

    <vue-better-calendar v-show="showCalendar" mode="range" ref="calendar" ctlColor="#ffc444" :showLunar="false" :hasLine="false" :disableAfterToday="true" @select-range-date="selectDate"></vue-better-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUserMenu: false,
      showDatePicker:false,
      showCalendar:false,
      value1: "",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      selectTime:"24小时"
    };
  },
  created() {
    
  },
  methods: {
    // 登出
    logout() {
      this.$router.replace("/login");
    },
    // 时间选择回调
    selectDate(dateList){
      console.log(dateList);
      
    },
    // 跳转页面
    goToRouterLink(link){
      this.showUserMenu = false;
      this.$router.push(link)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  .nav {
    width: 750px;
    height: 107px;
    background: #19181a;
    display: flex;
    &.home {
      background: #252426;
    }
    > div {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .nav-l {
      width: 100px;
      padding-left: 30px;
      margin-right: 100px;
      img {
        width: 18px;
      }
    }
    .nav-center {
      flex: 1;
      justify-content: center;
      text-align: center;
      span {
        font-size: 34px;
      }
    }
    .nav-r {
      width: 200px;
      padding-right: 30px;
      text-align: right;
      .nav-r-box{
        position: relative;
        width: 200px;
        .nav-r-btn{
          text-align: right;
          span{
            font-size: 24px;
            margin-right: 8px;
            vertical-align: middle;
          }
          img{
            width: 14px;
            vertical-align: middle;
          }
        }
        .nav-r-menu{
          position: absolute;
          width: 160px;
          height: 210px;
          background: #35333b;
          text-align: center;
          top: 66px;
          right: 0px;
          overflow: inherit;
          &::before{
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 50%;
            border:16px solid transparent;
            border-bottom: 16px solid #35333b;
            top: -32px;
            transform: translateX(-50%);
            z-index: 100;
          }
          li{
            height: 70px;
            line-height: 70px;
            font-size: 24px;
            border-bottom: 1px solid $opacity-dark;
          }
        }
      }
    }
    .home-l {
      padding-left: 30px;
      flex: 1;
      img {
        height: 49px;
      }
    }
    .home-r {
      padding-right: 30px;
      img {
        width: 56px;
      }
    }
  }

  .user-menu {
    background-color: #252426;
    z-index: 9999 !important;
    .header {
      text-align: center;
      padding-top: 45px;
      img {
        width: 145px;
        height: 145px;
        background-color: #7b757f;
        border: solid 2px $yellow;
        border-radius: 50%;
      }
      .name {
        font-size: 26px;
        color: #d7d4de;
        margin: 22px 0 40px;
        text-align: center;
        min-height: 30px;
      }
      .header-main {
        display: flex;
        padding: 0 10px;
        .item {
          flex: 1;
          position: relative;
          text-align: center;
          label {
            font-size: 27px;
            color: $gray;
          }
          p {
            font-size: 24px;
            color: $gray;
            margin-top: 10px;
          }
          &:not(:first-child)::after {
            content: "";
            position: absolute;
            left: 0;
            top: 20px;
            height: 28px;
            border-left: 3px solid $gray;
          }
        }
      }
    }
    .menu-list {
      margin-top: 30px;
      .link {
        display: block;
        height: 100px;
        line-height: 100px;
        font-size: 24px;
        color: $gray;
        padding-left: 60px;
      }
    }
    .logout {
      position: fixed;
      bottom: 66px;
      width: 100%;
      color: #89868f;
      font-size: 24px;
      text-align: right;
      padding-right: 68px;
    }
  }
}
</style>

<style scoped>
.vue-better-calendar{
  background: #35333b;
}
.vue-better-calendar >>> .calendar-header .year span{
  color: #d7d4de !important;
  font-size: 24px !important;
}
.vue-better-calendar >>> .weekday span{
  font-size: 28px;
}
.vue-better-calendar >>> .calendar-day {
  background: #252426 !important;
}
.vue-better-calendar >>> .calendar-day.disabled {
  background: #444 !important;
}
.vue-better-calendar >>> .calendar-body .text-day{
  font-size: 28px;
  color: #d7d4de !important;
}
.vue-better-calendar >>> .calendar-body .calendar-dates{
  background-color: #35333b;
}
.vue-better-calendar >>> .calendar-day.selected:after{
  border-color: #ffc444 !important;
}
.vue-better-calendar >>> .calendar-year-panel{
  background-color: #35333b;
}
.vue-better-calendar >>> .calendar-year-panel .item-year {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vue-better-calendar >>> .calendar-year-panel .item-year span{
  font-size: 24px;
}
.vue-better-calendar >>> .calendar-year-panel .item-year.active{
  background: #ffc444;
  border-color: #ffc444;
}
.vue-better-calendar >>> .calendar-year-panel .item-year.active span{
  color: #252426;
}
</style>