<template>
  <div class="container guess-history">
    <van-tabs class="tabs games" v-model="activeTab" :border="false">
      <van-tab>
        <div slot="title" class="game">
          <img src="../../assets/all.png" alt />
        </div>
      </van-tab>
      <van-tab v-for="item in gameList">
        <div slot="title" class="game">
          <img :src="item.gamePic" alt />
        </div>
      </van-tab>
    </van-tabs>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <ul class="guess-list">
        <li v-for="(item,index) in listData">
          <div class="list-tit">
            <img src="../../assets/game.png" alt class="tit-logo" />
            <span>LOL-TCL LPL/BO1 {{index}}</span>
            <span class="more-res" @click="moreRes(item)">更多赛果</span>
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
                  <img src="../../assets/win.png" alt class="win" />
                </div>
                <span class="num" @click="addShopCar(item)">1.33</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "GuessHistory",
  data() {
    return {
      activeTab: "",
      loading: false,
      finished: false,
      listData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      gameList:[]
    };
  },
  created() {
    this.$store.commit("setPageTitle", "赛果");
    this.getGameList();
  },
  methods: {
    getList() {
      setTimeout(() => {
        this.listData = this.listData.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        this.loading = false;
      }, 500);
    },
    // 更多赛果
    moreRes(item){
      this.$router.push({
        path:'/layout/GuessDetail',
        query:{
          type:'guessRes'
        }
      })
    },
    // 获取游戏列表
    getGameList(){
      this.$http.post('home/gameList',{token:this.$store.state.token}).then(res=>{
        if(res.retCode==0){
          this.gameList = res.data;
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  padding-top: 100px;
  .games {
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #252426;
    width: 100%;
    overflow-x: auto;
    padding: 0;
    position: fixed;
    top: 100px;
    left: 0;
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
  .guess-list {
    padding: 27px 27px 0;
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
          flex: 1;
        }
        .more-res{
          text-align: right;
          flex: none;
          height: 53px;
          line-height: 53px;
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
            .win {
              float: right;
              width: 64px;
              height: auto;
              margin-right: 60px;
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
<style scoped>
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
.van-tab .game img{
  opacity: 0.4;
}
.van-tab--active .game img{
  opacity: 1;
}
</style>