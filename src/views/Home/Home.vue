<template>
  <div class="container home" @scroll="onPageScroll" :style="isFixed?'padding-top:'+fixedHeight +'px':''">
    <!-- <div class="swiper">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item></van-swipe-item>
        <van-swipe-item></van-swipe-item>
      </van-swipe>
    </div>-->
    <div class="navs-box" ref="navsBox" :class="isFixed&&'fixed'" :style="isFixed?'margin-top:'+baseHeight +'px':''">
      <van-tabs v-model="activeGame" line-height="0" :border="false" class="games" @change="gameChange">
        <van-tab name="all">
          <div slot="title" class="game">
            <img src="../../assets/all.png" alt />
          </div>
        </van-tab>
        <van-tab v-for="(item,index) in gameList" :name="item.id" :key="index">
          <div slot="title" class="game">
            <img :src="item.gamePic" alt />
          </div>
        </van-tab>
      </van-tabs>
      <div class="guess-nav-type">
        <ul class="guess-ul">
          <li :class="playType==''?'active':''" @click="changeType('')" >全部</li>
          <li :class="playType==2?'active':''" @click="changeType(2)">早盘</li>
          <li :class="playType==1?'active':''" @click="changeType(1)">滚盘</li>
        </ul>
        <router-link to="/layout/GuessRes" class="result-btn">赛果</router-link>
      </div>
    </div>
    <van-list class="guess-list" v-model="loading" :finished="finished" :offset="20" finished-text="没有更多了" @load="getGuessList">
      <div class="list-box">
        <div class="li" v-for="(item,i) in guessList" @click="guessInfo(item)" :key="i">
          <div class="list-tit">
            <img :src="item.gamePic" alt class="tit-logo" />
            <span>{{item.gameName}}-{{item.matchName}}</span>
          </div>
          <div class="list-main">
            <div class="time">
              <div>
                <span>{{item.matchTime | parseTime('{m}-{d}')}}</span>
                <span>{{item.matchTime | parseTime('{h}:{i}')}}</span>
              </div>
            </div>
            <div class="main-r">
              <div v-for="guess in item.homeListReps" :class="isInGuessCar(item,guess) && 'main-r-active'">
                <div class="team">
                  <img :src="guess.teamPic" alt />
                  <span>{{guess.gameTeamName}}</span>
                </div>
                <span class="num" @click.stop="addShopCar(item,guess)">{{guess.oddsAmount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <guess-car :carData="carData" :showPopup="showPopup" @popupClose="showPopup=false" @deleteGuess="deleteGuess" @uploadCarData="uploadCarData"></guess-car>
  </div>
</template>

<script>
import GuessCar from "@/components/GuessCar.vue";
export default {
  name: "home",
  data() {
    return {
      activeGame: "",
      playType: "",
      baseHeight: 0,
      fixedHeight: 0,
      isFixed: false,
      showPopup: false,
      gameList: [], // 游戏列表
      guessList: [], // 竞猜列表
      carData: [], // 购物车数据
      carDataIds:[], // 购物车id集合
      pageNum: 0,
      pageSize: 10,
      loading:false,//加载中
      finished:false,//没有更多数据
    };
  },
  components: { GuessCar },
  created() {
    this.$store.commit("setPageTitle", "首页");
    this.getGameList();
    // this.getGuessList();
  },
  mounted() {
    this.baseHeight = document.getElementById("navigation").offsetHeight;
    this.fixedHeight = this.$refs.navsBox.offsetHeight;
  },
  computed:{
    // 判断是否在里面
    isInGuessCar(){
      return (item,guess)=>{
        let idx =  this.carData.findIndex((el)=>(el.guessId == item.id &&el.guessInfoId == guess.guessInfoId && el.gameTeamId == guess.gameTeamId));
        return idx >= 0;
      }
    }
  },
  methods: {
    // 页面滚动
    onPageScroll(e) {
      this.isFixed = e.target.scrollTop > this.fixedHeight - 1;
    },
    // 改变早盘、滚盘
    changeType(type) {
      this.playType = type;
      this.pageNum=0;
      this.guessList=[];
      this.finished = false;

      this.getGuessList();
    },
    // 添加购物车
    addShopCar(item,guess) {
      let teams = [];
      item.homeListReps.forEach(el => {
        teams.push(el.gameTeamName)
      });
      let guessObj = {
        guessId: item.id,
        name: item.name,
        guessInfoId: guess.guessInfoId,
        gameTeamId: guess.gameTeamId,
        gameTeamName: guess.gameTeamName,
        oddsAmount: guess.oddsAmount,
        number:0,
        teams: teams
      }
      this.showPopup = true;
      let idx = this.carData.findIndex((el)=>(el.guessId == guessObj.guessId && el.guessInfoId == guessObj.guessInfoId && el.gameTeamId == guessObj.gameTeamId))

      if(idx<0){
        this.carData.push(guessObj)
      }else{
        this.carData.splice(idx,1);
      }
    },
    // 跳转到竞猜详情
    guessInfo(item) {
      this.$router.push({
        path: "/layout/GuessDetail",
        id: item.id
      });
    },
    // 获取游戏列表
    getGameList() {
      this.$http.post("home/gameList", {}).then(res => {
          if (res.retCode == 0) {
            this.gameList = res.data;
          }
        });
    },
    // 获取竞猜列表
    getGuessList(gameId) {
      let params = {
        gameId: this.activeGame=="all"?'':this.activeGame,
        playType: this.playType,
        isSealed: "n",
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.loading = true;
      this.$http.post("home/homeList", params).then(res => {
        if (res.retCode == 0) {
          if (res.retCode == 0) {
         this.guessList = this.guessList.concat(res.data);
         this.pageNum++;
          if(res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
        }
      });
    },
    // 标签改变
    gameChange(name) {
      this.activeGame = name;
      this.pageNum=0;
      this.guessList=[];
      this.finished = false;
      this.getGuessList();
    },
    // 购物车删除回调
    deleteGuess(res) {
      this.carData.splice(res.index, 1);
    },
    // 更新购物车数据
    uploadCarData(){
      this.carData = [];
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
          width: 100%;
          object-fit: contain;
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
    .li {
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
          border-right: 1px solid #8b6c2b;
          // padding-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 20px;
            line-height: 40px;
            color: #fff1d3;
            display: block;
          }
        }
        .main-r {
          flex: 1;
          > div {
            height: 74px;
            display: flex;
            align-items: center;
            padding-left: 26px;
            border-bottom: 1px solid #8b6c2b /*no*/;
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
            &:last-child {
              border-bottom: 0;
            }
            &.main-r-active{
              .num{
                background: rgba(255,196,68,0.7);
                color: $black;
              }
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
.van-tab .game img {
  opacity: 0.4;
}
.van-tab--active .game img {
  opacity: 1;
}
</style>