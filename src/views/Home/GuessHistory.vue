<template>
  <div class="container guess-history">
    <van-tabs class="tabs" v-model="activeTab" :border="false">
      <van-tab title="未结算"></van-tab>
      <van-tab title="已结算"></van-tab>
    </van-tabs>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <ul class="guess-list">
        <li v-for="(item,index) in listData">
          <div class="list-tit">
            <img src="../../assets/game.png" alt class="tit-logo" />
            <span>LOL-TCL LPL/BO1 {{index}}</span>
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
                  <img src="../../assets/win.png" alt="" class="win">
                </div>
                <span class="num">1.33</span>
              </div>
            </div>
          </div>
          <div class="list-footer between">
            <span>投注 500</span>
            <span>返还 500</span>
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
      loading:false,
      finished:false,
      listData:[1,2,3,4,5,6,7,8,9,0]
    };
  },
  created() {
    this.$store.commit("setPageTitle","投注历史");
  },
  methods: {
    getList(){
      setTimeout(()=>{
        this.listData = this.listData.concat([1,2,3,4,5,6,7,8,9,0]);
        this.loading=false;
      },500)
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
            .win{
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
            &:first-child {
              border-bottom: 1px solid #8b6c2b /*no*/;
            }
          }
        }
      }
      .list-footer{
        background: $yellow;
        padding: 0 24px;
        span{
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
>>> .van-tab{
  flex: none;
  margin-right: 100px;
}
</style>