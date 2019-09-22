<template>
  <div class="container home" @scroll="onPageScroll" :style="isFixed?'padding-top:'+fixedHeight +'px':''">
    <!-- <div class="swiper">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item></van-swipe-item>
        <van-swipe-item></van-swipe-item>
      </van-swipe>
    </div> -->
    <div class="navs-box" ref="navsBox" :class="isFixed&&'fixed'" :style="isFixed?'margin-top:'+baseHeight +'px':''">
      <van-tabs v-model="activeGame" line-height="0" :border="false" class="games">
        <van-tab>
          <div slot="title" class="game">
            <img src="../../assets/all.png" alt />
          </div>
        </van-tab>
        <van-tab v-for="item in gameList">
          <div slot="title" class="game">
            <img src="../../assets/game.png" alt />
          </div>
        </van-tab>
      </van-tabs>
      <div class="guess-nav-type">
        <ul class="guess-ul">
          <li class="active" @click="changeType('all')">全部</li>
          <li @click="changeType('all')">早盘</li>
          <li @click="changeType('all')">滚盘</li>
        </ul>
        <router-link to="/layout/GuessRes" class="result-btn">赛果</router-link>
      </div>
    </div>

    <ul class="guess-list">
      <li v-for="item in 1" @click="guessInfo(item)">
        <div class="list-tit">
          <img src="../../assets/game.png" alt class="tit-logo" />
          <span>LOL-TCL LPL/BO1</span>
        </div>
        <div class="list-main">
          <div class="time">
            <span>7-28</span>
            <span>23:00</span>
          </div>
          <div class="main-r">
            <div v-for="item in 2">
              <div class="team">
                <img src="../../assets/ig.png" alt />
                <span>IG</span>
              </div>
              <span class="num" @click.stop="addShopCar(item)">1.33</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <guess-car :showPopup="showPopup" @popupClose="showPopup=false"></guess-car>
  </div>
</template>

<script>
import GuessCar from "@/components/GuessCar.vue";
export default {
  name: "home",
  data() {
    return {
      activeGame: "",
      activeTab: "",
      baseHeight: 0,
      fixedHeight: 0,
      isFixed: false,
      showPopup: false,
      gameList:[], // 游戏列表
      guessList:[], // 竞猜
    };
  },
  components: { GuessCar },
  created() {
    this.$store.commit("setPageTitle", "首页");
    this.getGameList();
    this.getGuessList();
  },
  mounted() {
    this.baseHeight = document.getElementById("navigation").offsetHeight;
    this.fixedHeight = this.$refs.navsBox.offsetHeight;
  },
  methods: {
    // 页面滚动
    onPageScroll(e) {
      this.isFixed = e.target.scrollTop >= this.fixedHeight;
    },
    // 改变早盘、滚盘
    changeType(type) { },
    // 添加购物车
    addShopCar(item) {
      this.showPopup = true;
    },
    // 跳转到竞猜详情
    guessInfo(item) {
      this.$router.push('/layout/GuessDetail');
    },
    // 获取游戏列表
    getGameList(){
      this.$http.post('home/gameList',{token:this.$store.state.token}).then(res=>{
        if(res.retCode==0){
          this.gameList = res.data;
        }
      })
    },
    // 获取竞猜列表
    getGuessList(gameId){
      let params = {
        token: this.$store.state.token,
        gameId:this.activeGame
      }
      this.$http.post('home/HomeListReq',params).then(res=>{
        if(res.retCode==0){
          this.guessList = res.data;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  height: 100%;
  overflow-y: scroll;
  .swiper {
    height: 327px;
    background-color: #000000;
    .van-swipe {
      height: 100%;
    }
  }
  .navs-box {
    &.fixed {
      position: fixed;
      top: 0;
      z-index: 99;
      width: 100%;
    }
    .games {
      text-overflow: ellipsis;
      white-space: nowrap;
      background: #252426;
      width: 100%;
      overflow-x: auto;
      padding: 0;
      .game {
        height: 53px;
        display: inline-block;
        img {
          height: 100%;
        }
      }
    }
    .guess-nav-type {
      display: flex;
      height: 110px;
      background-color: #19181a;
      padding: 0 27px;
      align-items: center;
      .guess-ul {
        flex: 1;
        li {
          display: inline-block;
          font-size: 26px;
          color: #89868f;
          width: 124px;
          &.active {
            color: $yellow;
            position: relative;
          }
          &.active::after {
            content: "";
            width: 51px;
            border: 2px solid $yellow;
            left: 0;
            bottom: -16px;
            position: absolute;
          }
        }
      }
      .result-btn {
        width: 133px;
        background-color: $yellow;
        border-radius: 5px;
        line-height: 59px;
        height: 59px;
        color: #000;
        font-size: 24px;
        text-align: center;
      }
    }
  }
  .guess-list {
    padding: 0 27px;
    li {
      margin-bottom: 20px;
      border-radius: 3px;
      overflow: hidden;
      .list-tit {
        background: $yellow;
        padding: 0 13px;
        height: 53px;
        display: flex;
        align-items: center;
        img {
          height: 28px;
          margin-right: 18px;
        }
        span {
          font-size: 20px;
          color: #000;
        }
      }
      .list-main {
        display: flex;
        background-color: #443921;
        .time {
          width: 108px;
          text-align: center;
          height: 148px;
          border-right: 1px solid #8b6c2b;
          padding-top: 40px;
          span {
            font-size: 20px;
            color: #fff1d3;
            display: block;
            margin-bottom: 20px;
          }
        }
        .main-r {
          flex: 1;
          > div {
            height: 74px;
            display: flex;
            align-items: center;
            padding-left: 26px;
            img {
              height: 32px;
              vertical-align: middle;
              margin-right: 22px;
            }
            span {
              font-size: 24px;
              color: #fff1d3;
              vertical-align: middle;
            }
            .team {
              flex: 1;
            }
            .num {
              width: 200px;
              text-align: center;
              height: 100%;
              line-height: 74px;
              border-left: 1px solid #8b6c2b /*no*/;
            }
            &:first-child {
              border-bottom: 1px solid #8b6c2b /*no*/;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="css" scoped>
.games >>> .van-tabs__nav {
  background: transparent;
  padding: 24px 27px;
}
.games >>> .van-tabs__wrap {
  height: 100px;
}
.games >>> .van-tab {
  flex-basis: 106px !important;
  flex: none;
}
.submit-btn >>> .van-button__text {
  color: #252426;
  font-size: 29px;
}
</style>