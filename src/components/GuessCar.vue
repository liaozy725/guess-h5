<template>
  <!-- 购物车 -->
  <van-popup v-model="showGuessCar" :overlay="showAll" position="bottom" :style="{width:'100%'}" :close-on-click-overlay="false" class="shop-car" safe-area-inset-bottom @close="popupClose">
    <div class="pop-header" @click="showAll=!showAll">
      <div class="header-l">
        <span>投注单：</span>
        <i>{{carData.length}}</i>
      </div>
      <img src="../assets/icon-down-y.png" :style="!showAll&&'transform:rotate(180deg)'" alt />
    </div>
    <div class="pop-main" v-show="showAll">
      <ul class="pop-list">
        <li v-for="(item,index) in carData">
          <div class="list-1" @click="deleteItem(item,index)">
            <img src="../assets/icon-close.png" alt />
          </div>
          <div class="list-2">
            <p class="list-tit">{{item.gameTeamName}}</p>
            <p class="list-content">{{item.name}}</p>
            <p class="list-content">{{item.teams.join(' VS ')}}</p>
          </div>
          <div class="list-3">{{item.oddsAmount}}</div>
          <div class="list-4">
            <div class="num-input" @click="openKeybroad(item,index)">{{item.number}}</div>
            <p class="between">
              <span>返还：</span>
              <span>{{(item.oddsAmount * item.number).toFixed(2) || 0}}</span>
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
import { uploadUserInfo } from '@/utils/utils.js'
let iconSuccess = require('@/assets/icon-success.png');
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
      showKeyboard: false, // 显示键盘
      showAll:true, // 显示列表
      keyboardValue: 0,
      activeItemIndex:0
    };
  },
  computed:{
    // 计算总金额
    totalMoney(){
      let total = 0;
      this.carData.forEach(el => {
        total += parseFloat((el.number*el.oddsAmount).toFixed(2))
      });
      return total.toFixed(2)
    }
  },
  methods: {
    // 更新用户数据
    uploadUserInfo:uploadUserInfo,
    // 弹窗关闭回调
    popupClose() {
      this.$emit("popupClose", false);
    },
    // 打开键盘
    openKeybroad(item,index) {
      this.keyboardValue = item.number;
      this.activeItemIndex = index;
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
      this.carData[this.activeItemIndex].number = this.keyboardValue;
    },
    // 输入删除
    unInput() {
      this.keyboardValue = this.keyboardValue == 0 ? '' : this.keyboardValue + '';
      this.keyboardValue = this.keyboardValue.substring(0,this.keyboardValue.length-1) || 0;
      this.carData[this.activeItemIndex].number = this.keyboardValue;
    },
    // 输入确认
    sureInput(){
      this.carData[this.activeItemIndex].number = this.keyboardValue;
      this.showKeyboard = false;
      let item = this.carData[this.activeItemIndex];
      let params = {
        token:this.$store.state.token,
        guessId: item.guessId,
        guessInfoId: item.guessInfoId,
        gameTeamId: item.gameTeamId
      }
    },
    // 确认投注
    submit(){
      let guessIds=[],guessInfoIds=[],gameTeamIds=[],numbers=[],bettings=[];
      this.carData.forEach(el => {
        if(el.number>0){
          guessIds.push(el.guessId);
          guessInfoIds.push(el.guessInfoId);
          gameTeamIds.push(el.gameTeamId);
          numbers.push(el.number);
          bettings.push((el.number*el.oddsAmount).toFixed(2));
        }
      });
      let params = {
        token: this.$store.state.token,
        guessIds:guessIds.join(), // 竞猜ID多个以（,）号隔开
        guessInfoIds:guessInfoIds.join(), // 竞猜详情Id多个以（,）号隔开
        gameTeamIds:gameTeamIds.join(), // 竞猜队伍Id多个以（,）号隔开
        numbers:numbers.join(), // 下注多少多个以（,）号隔开
        bettings:bettings.join() // 返还多少多个以（,）号隔开
      }
      if(guessIds.length<=0){
        return this.$toast({duration: 2000,forbidClick: true,message: "请选择下注数量"});
      }
      this.$http.post('home/userBetting',params).then(res=>{
        if(res.retCode ==0){
          this.$toast({
            duration: 2000,
            forbidClick: true, // 禁用背景点击
            message: "下单成功",
            icon: iconSuccess
          });
          this.uploadUserInfo();
          this.$emit("uploadCarData")
        }
      })
    }
  },
  watch: {
    showPopup() {
      this.showGuessCar = this.showPopup;
    },
    carData(newVal){
      if(this.carData.length == 0){
        this.showGuessCar = false;
        this.showAll = true;
        this.showKeyboard = false;
      }
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
      transition: all linear 0.25s;
    }
  }
  .pop-main {
    .pop-list {
      background: #19181a;
      color: $gray;
      max-height: 588px;
      overflow-y: auto;
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