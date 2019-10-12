<template>
  <div class="container guess-history">
    <van-tabs class="tabs" v-model="activeTab" :border="false" @change="changeTab">
      <van-tab title="未结算" name="2"></van-tab>
      <van-tab title="已结算" name="1"></van-tab>
    </van-tabs>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <ul class="guess-list">
        <li v-for="(item,index) in listData" :key="index">
          <div class="list-tit">
            <img src="../../assets/game.png" alt class="tit-logo" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-main">
            <div class="time">
              <div>
                <span>{{item.matchTime | parseTime('{m}-{d}')}}</span>
                <span>{{item.matchTime | parseTime('{h}:{i}')}}</span>
              </div>
            </div>
            <div class="main-r">
              <div v-for="(row,i) in item.userBettingListInfoReps" :key="i" :class="row.isBetting == 'y' && 'betting'">
                <div class="team">
                  <img :src="row.teamPic" alt />
                  <span>{{row.gameTeamName}}</span>
                  <img v-if="row.isWin=='win'" src="../../assets/win.png" alt="" class="win">
                </div>
                <span class="num">{{row.odds}}</span>
              </div>
            </div>
          </div>
          <div class="list-footer between">
            <span>投注 {{item.number}}</span>
            <span>返还 {{item.returnNumber}}</span>
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
      activeTab: 2,
      loading: false,//加载中
      finished: false,//没有更多数据
      pageNum: 0,
      pageSize: 10,
      listData: []
    };
  },
  created() {
    this.$store.commit("setPageTitle", "投注历史");
  },
  methods: {
    // 获取投注历史
    getList() {
      let params = {
        token: this.$store.state.token,
        matchResult: this.activeTab
      }
      this.loading = true;
      this.$http.post('home/userBettingList', params).then(res => {
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.loading = false;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
      })
    },
    // 改变标签
    changeTab() {
      this.pageNum = 0;
      this.finished = false;
      this.listData = [];
      this.getList()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
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
              height: 20px;
              float: right;
              vertical-align: middle;
              margin-top: 4px;
            }
            .team {
              flex: 1;
            }
            .num {
              width: 200px;
              text-align: center;
              height: 100%;
              line-height: 74px;
              // border-left: 1px solid #8b6c2b /*no*/;
            }
            &:not(:first-child) {
              border-top: 1px solid #8b6c2b /*no*/;
            }
            &.betting{
              background: #8b6c2b;
            }
          }
        }
      }
      .list-footer {
        background: $yellow;
        padding: 0 24px;
        span {
          font-size: 24px;
          color: $black;
          line-height: 56px;
        }
      }
    }
  }
}
</style>
<style scoped>
>>> .van-tab {
  flex: none;
  margin-right: 100px;
}
</style>