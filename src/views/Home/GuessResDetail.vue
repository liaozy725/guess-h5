<template>
  <div class="container guess-detail">
    <header class="header">
      <p class="title">
        <img :src="guessData.gamePic" alt />
        <span>{{guessData.gameName}}-{{guessData.matchName}} {{guessData.name}}</span>
      </p>
      <div class="header-main">
        <div class="header-l header-team">
          <div v-if="guessData.team && guessData.team.length==2">
            <img v-if="guessData.team" :src="guessData.team[0].teamPic" alt />
            <p v-if="guessData.team">{{guessData.team[0].teamName}}</p>
          </div>
        </div>
        <div class="header-center">
          <div>
            <p v-if="guessData.team && guessData.team.length==2">
              <span>{{guessData.team[0].teamBiFen}}</span>
              <i></i>
              <span>{{guessData.team[1].teamBiFen}}</span>
            </p>
            <a :href="guessData.url" class="video" target="_blank">
              <img src="../../assets/video.png" alt />
            </a>
          </div>
        </div>
        <div class="header-r header-team">
          <div v-if="guessData.team && guessData.team.length==2">
            <img v-if="guessData.team" :src="guessData.team[1].teamPic" alt />
            <p v-if="guessData.team">{{guessData.team[1].teamName}}</p>
          </div>
        </div>
      </div>
    </header>

    <van-tabs class="tabs" v-model="activeTab" :border="false" @change="tabChange">
      <van-tab v-for="index in guessData.number" :name="index" :title="'第' + index + '局'" :key="index"></van-tab>
    </van-tabs>

    <div class="table-box">
      <div class="tables" :class="item.listReps.length>3?'my-table-over':''" v-for="(item,index) in guessData.guessInfoListReps" :key="index">
        <div class="my-table">
          <ul class="title-ul clearfix">
            <li class="tit">第{{item.number}}局</li>
            <li v-for="(guess,i) in item.listReps" :key="i">{{guess.gameTeamName}}</li>
          </ul>
          <ul class="list-ul clearfix"  >
            <li class="tit">{{item.title}}</li>
            <li class="num" v-for="(guess,k) in item.listReps" :key="k" :class="guess.isWin">
              {{guess.oddsAmount}}
            </li>
            <!-- <li v-for="guess in item.listReps" class="win">{{guess.oddsAmount}}</li> -->
          </ul>
        </div>
        <div class="over-jt" v-if="item.listReps.length>3">
          <img src="../../assets/icon-sjx.png" alt /> 
        </div>
      </div>
    </div>
    <!-- <guess-car :carData="carData" :showPopup="showPopup" @popupClose="showPopup=false" @deleteGuess="deleteGuess" @uploadCarData="uploadCarData"></guess-car> -->
  </div>
</template>

<script>
// import GuessCar from "@/components/GuessCar.vue";
export default {
  data() {
    return {
      showPopup: false,
      activeTab: parseInt(this.$route.query.number) || '',
      id: this.$route.query.id,
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      guessId:this.$route.query.id,
      guessData:{},
      carData:[]
    };
  },
  // components: { GuessCar },
  created(){
    this.$store.commit("setPageTitle","更多赛果");
    this.getGuessDetail();
  },
  computed:{
    // 判断是否在里面
    isInGuessCar(){
      return (item,guess)=>{
        let idx =  this.carData.findIndex((el)=>( el.weiYiZiDuan == guess.weiYiZiDuan));
        return idx >= 0;
      }
    }
  },
  methods:{
    // 获取竞猜详情
    getGuessDetail(){      
      let params = {
        token: this.$store.state.token,
        guessId: this.guessId,
        number: this.activeTab
      }
      this.$http.post('home/guessContentInfo',params).then(res=>{
        if(res.retCode==0){
          try {
            res.data.team = JSON.parse(res.data.team)
          } catch (error) {
            
          }
          this.guessData = res.data;
        }
      })
    },
    // 添加购物车
    addShopCar(item,guess) {
      let teams = [];
      item.listReps.forEach(el => {
        teams.push(el.gameTeamName)
      });
      let guessObj = {
        guessId: this.id,
        name: item.title,
        guessInfoId: guess.guessInfoId,
        gameTeamId: guess.gameTeamId,
        gameTeamName: guess.gameTeamName,
        oddsAmount: guess.oddsAmount,
        number:0, // 竞猜的下注数量
        teams: teams,
        weiYiZiDuan: guess.weiYiZiDuan
      }
      this.showPopup = true;
      let idx = this.carData.findIndex((el)=>(el.weiYiZiDuan == guessObj.weiYiZiDuan))

      if(idx<0){
        this.carData.push(guessObj)
      }else{
        this.carData.splice(idx,1);
      }      
    },
    // 选择局数
    tabChange(tab){
      this.getGuessDetail();
    },
    // 购物车删除回调
    deleteGuess(res) {
      this.carData.splice(res.index, 1);
    },
    // 更新购物车数据
    uploadCarData(){
      this.carData = [];
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  .header {
    height: 340px;
    background: #19181a;
    padding: 36px 52px 0;
    color: $gray;
    .title {
      display: flex;
      align-items: center;
      height: 36px;
      img {
        height: 36px;
        margin-right: 20px;
      }
      span {
        font-size: 20px;
      }
    }
    .header-main {
      display: flex;
      width: 100%;
      .header-team {
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 260px;
        display: flex;
        img {
          height: 90px;
        }
        p {
          font-size: 24px;
          margin-top: 16px;
          text-align: center;
        }
      }
      .header-center {
        height: 260px;
        width: 200px;
        justify-content: center;
        align-items: center;
        display: flex;
        span {
          font-size: 40px;
          text-align: center;
          display: inline-block;
          width: 80px;
          vertical-align: middle;
        }
        i {
          display: inline-block;
          width: 14px;
          height: 4px;
          background: $gray;
          vertical-align: middle;
        }
        .video {
          display: block;
          margin-top: 30px;
          text-align: center;
          img {
            width: 74px;
          }
        }
      }
    }
  }
  .table-box {
    .tables {
      margin-bottom: 30px;
      .my-table {
        ul {
          display: flex;
          li {
            flex: 1;
            height: 108px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid $black;
            border-bottom: 1px solid $black;
            background: $deep-yellow;
            font-size: 24px;
            color: $gray;
            &.win{
              position: relative;
            }
            &.win::after{
              content: '';
              width: 50px;
              height: 16px;
              position: absolute;
              background: url(~@/assets/win.png) no-repeat;
              background-size: 100% 100%;
              transform: translateX(60px)
            }
          }
        }
        .title-ul {
          li {
            height: 84px;
            color: $black;
            background: $yellow;
            &.num-active{
              background: rgba(255,196,68,0.7);
              color: $black;
            }
          }
        }
        .list-ul{
          li{
            &.num-active{
              background: rgba(255,196,68,0.7);
              color: $black;
            }
          }
          
        }
        .tit {
          flex: 0 0 244px !important;
        }
      }
      &.my-table-over {
        position: relative;
        .my-table {
          overflow-x: auto;
          margin-right: 40px;
          ul {
            display: block;
            white-space: nowrap;
            overflow-x: initial;
            li {
              display: inline-flex;
              width: 176px;
            }
            .tit {
              width: 244px;
              flex: 0 0 244px !important;
            }
          }
        }
        .over-jt {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: $yellow;
          display: flex;
          align-items: center;
          justify-content: center;
          border-left: 1px solid $black;
          img {
            width: 14px;
          }
        }
      }
    }
  }
}
</style>