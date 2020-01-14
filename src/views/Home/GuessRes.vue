<template>
  <div class="container guess-history">
    <van-tabs class="tabs games" v-model="activeTab" :border="false" @change="gameChange">
      <van-tab name='all'>
        <div slot="title" class="game">
          <img src="../../assets/all.png" alt />
        </div>
      </van-tab>
      <van-tab v-for="item in gameList" :name="item.id" :key="item.id">
        <div slot="title" class="game">
          <img :src="item.gamePic" alt />
        </div>
      </van-tab>
    </van-tabs>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <ul class="guess-list">
        <li v-for="(item,index) in listData">
          <div class="list-tit">
            <img :src="item.gamePic" alt class="tit-logo" />
            <span>{{item.matchName}} - {{item.name}}</span>
            <span class="more-res" @click="moreRes(item)">更多赛果</span>
          </div>
          <div class="list-main">
            <div class="time">
              <div>
                <span>{{item.matchTime | parseTime('{m}-{d}')}}</span>
                <span>{{item.matchTime | parseTime('{h}:{i}')}}</span>
              </div>
            </div>
            <div class="main-r">
              <div v-for="team in item.userBettingListInfoReps">
                <div class="team">
                  <img :src="team.teamPic" alt />
                  <span>{{team.gameTeamName}}</span>
                  <img v-if="team.isWin=='win'" src="../../assets/win.png" alt class="win" />
                </div>
                <span class="num">{{team.odds}}</span>
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
      listData: [],
      gameList: [],
      pageNum: 0,
      pageSize: 20,
    };
  },
  created() {
    this.$store.commit("setPageTitle", "赛果");
    this.$store.commit("setShowDatePicker", true);
    this.getGameList();
  },
  computed: {
    // 时间选中改变
    changeTimeState() {
      return this.$store.state.time;
    },
  },
  methods: {
    // 更多赛果
    moreRes(item) {
      this.$router.push({
        path: '/layout/GuessResDetail',
        query: {
          type: 'guessRes',
          id: item.guessId
        }
      })
    },
    // 获取游戏列表
    getGameList() {
      this.$http.post('home/gameList', { token: this.$store.state.token }).then(res => {
        if (res.retCode == 0) {
          this.gameList = res.data;
        }
      })
    },
    // 获取赛果列表
    getList() {
      let params = {
        token: this.$store.state.token,
        gameId: this.activeTab == 'all' ? '' : this.activeTab,
        time: this.$store.state.time,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.loading = true;
      this.$http.post('home/guessContentInfoList', params).then(res => {
        this.loading = false;
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.pageNum++;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
      })
    },
    // 游戏选中改变
    gameChange(name) {
      this.listData = [];
      this.pageNum = 0;
      this.finished = false;
      this.getList();
    }
  },
  watch: {
    // 监听头部时间改变
    changeTimeState() {
      this.listData = [];
      this.finished = false;
      this.pageNum = 0;
      this.getList();
    }
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
        .more-res {
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
          border-right: 1px solid #8b6c2b;
          padding-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
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
            &:not(:first-child) {
              border-top: 1px solid #8b6c2b /*no*/;
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
.van-tab .game img {
  opacity: 0.4;
}
.van-tab--active .game img {
  opacity: 1;
}
</style>