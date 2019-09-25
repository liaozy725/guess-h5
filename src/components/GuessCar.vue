<template>
  <!-- 购物车 -->
  <van-popup v-model="showGuessCar" position="bottom" :style="{width:'100%'}" class="shop-car" safe-area-inset-bottom @close="popupClose">
    <div class="pop-header">
      <div class="header-l">
        <span>投注单：</span>
        <i>1</i>
      </div>
      <img src="../assets/icon-down-y.png" @click="showGuessCar=false;" alt />
    </div>
    <div class="pop-main">
      <ul class="pop-list">
        <li v-for="(item,index) in carData">
          <div class="list-1" @click="deleteItem(item,index)">
            <img src="../assets/icon-close.png" alt />
          </div>
          <div class="list-2">
            <p class="list-tit">RNG</p>
            <p class="list-content">第一局比赛获胜队伍</p>
            <p class="list-content">RNG VS IG</p>
          </div>
          <div class="list-3">1.97</div>
          <div class="list-4">
            <div class="num-input" @click="openKeybroad(item)">2</div>
            <p class="between">
              <span>返还：</span>
              <span>3.94</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="keyboard" v-if="showKeyboard">
        <div class="num-box">
          <span v-for="item in numArr" @click="inputNum(false,item)">{{item}}</span>
        </div>
        <div class="key-bottom">
          <span @click="inputNum(true,500)">500</span>
          <span @click="inputNum(true,1000)">1000</span>
          <span class="icon-jt" @click="unInput">
            <img src="../assets/jt.png" alt />
          </span>
          <span class="sure" @click="sureInput">确认</span>
        </div>
      </div>
      <van-button size="large" color="#ffc444" class="submit-btn" @click="submit">确认投注 {{totalMoney}} RMB</van-button>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    showPopup: {
      default: false
    },
    // 数据
    carData: {
      type:Array,
      default:()=>{
        return [];
      }
    }
  },
  data() {
    return {
      numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      showGuessCar: this.showPopup,
      showKeyboard: false,
      keyboardValue: 0,
      totalMoney:0
    };
  },
  methods: {
    // 弹窗关闭回调
    popupClose() {
      this.$emit("popupClose", false);
    },
    // 关闭键盘
    openKeybroad(itme) {
      this.keyboardValue = itme;
      this.showKeyboard = true;
    },
    // 删除数据
    deleteItem(item, index) {
      this.$emit('deleteGuess',{item:item, index:index});
    },
    // 数字点击输入
    inputNum(clear, num) {
      if(!this.keyboardValue){this.keyboardValue=''}
      this.keyboardValue = clear ? num : this.keyboardValue + "" + num;
    },
    // 输入删除
    unInput() {
      this.keyboardValue = this.keyboardValue + '';
      this.keyboardValue = this.keyboardValue.substring(0,this.keyboardValue.length-1);
    },
    // 输入确认
    sureInput(){
      this.showKeyboard = false;
    },
    // 确认投注
    submit(){
      let params = {
        token: this.$store.state.token,
        guessIds:'', // 竞猜ID多个以（,）号隔开
        guessInfoIds:'', // 竞猜详情Id多个以（,）号隔开
        gameTeamIds:'', // 竞猜队伍Id多个以（,）号隔开
        numbers:'', // 下注多少多个以（,）号隔开
        bettings:'', // 返还多少多个以（,）号隔开
        title:'' // 下注的比赛标题
      }
      this.$http.post('home/userBetting',params).then(res=>{
        if(res.retCode ==0){

        }
      })
    }
  },
  watch: {
    showPopup() {
      this.showGuessCar = this.showPopup;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.shop-car {
  min-height: 90px;
  background: $dark;
  border: 1px solid $yellow;
  .pop-header {
    display: flex;
    height: 90px;
    align-items: center;
    .header-l {
      flex: 1;
      padding-left: 34px;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        font-size: 27px;
        color: $gray;
      }
      i {
        font-size: 27px;
        color: $dark;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        min-width: 40px;
        border-radius: 20px;
        background: $yellow;
        margin-left: 24px;
      }
    }
    img {
      width: 26px;
      height: 16px;
      margin-right: 54px;
    }
  }
  .pop-main {
    .pop-list {
      background: #19181a;
      color: $gray;
      li {
        height: 147px;
        position: relative;
        padding: 22px 25px;
        display: flex;
        &::after {
          content: "";
          position: absolute;
          left: 12px;
          width: 6px;
          height: 100px;
          border-radius: 3px;
          background: $yellow;
        }
        .list-1 {
          width: 56px;
          padding-left: 8px;
          img {
            width: 22px;
          }
        }
        .list-2 {
          flex: 1;
          .list-tit {
            font-size: 28px;
            margin-bottom: 16px;
          }
          p {
            font-size: 20px;
            margin-bottom: 12px;
          }
        }
        .list-3 {
          width: 150px;
          font-size: 28px;
          text-align: center;
          line-height: 60px;
        }
        .list-4 {
          width: 200px;
          .num-input {
            height: 64px;
            line-height: 64px;
            font-size: 28px;
            text-align: center;
            background-color: #252426;
            margin-bottom: 16px;
          }
          span {
            font-size: 20px;
          }
        }
      }
    }
    .keyboard {
      background: $dark;
      border-top: 1px solid $yellow;
      .num-box {
        width: 100%;
      }
      span {
        display: inline-block;
        width: 10%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 32px;
        color: $gray;
        border-left: 1px solid $yellow;
        border-bottom: 1px solid $yellow;
        &:first-child {
          border-left: 0;
        }
      }
      .key-bottom {
        span {
          width: 30%;
        }
        .icon-jt {
          width: 20%;
          img {
            width: 34px;
          }
        }
        .sure {
          width: 20%;
        }
      }
    }
  }
}
</style>

<style lang="css" scoped>
.submit-btn >>> .van-button__text {
  color: #252426;
  font-size: 29px;
}
</style>