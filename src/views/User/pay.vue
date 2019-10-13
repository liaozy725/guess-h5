<template>
  <div class="container">
    <div class="pay-type between">
      <div class="img-box zfb-img" @click="changePay('alipay')" :class="activeTab=='alipay'?'active':''">
        <img src="../../assets/logo-zfb.png" alt="">
        <i></i>
      </div>
      <div class="img-box wx-img" @click="changePay('wechant')" :class="activeTab=='wechant'?'active':''">
        <img src="../../assets/logo-wx.png" alt="">
        <i></i>
      </div>
    </div>
    <!-- 充值框 -->
    <div class="content-box">
      <div class="content-top clearfix">
        <div class="fl content-top-l">
          充值金额范围：100-10000
        </div>
        <div class="rt content-top-r" v-if="$store.state.userInfo&&$store.state.userInfo.userBalance">
          账户余额：{{$store.state.userInfo.userBalance}}
        </div>
      </div>
      <div class="content-body">
        <div class="input-box">
          <!-- <input type="number" v-model="price" placeholder="请输入充值金额"> -->
          <van-field readonly clickable :value="price" placeholder="请输入充值金额" @touchstart.native.stop="show = true" />

        </div>
        <div class="price-list clearfix">
          <div class="price-box fl" @click="assignment(item)" v-for="(item,i) in priceList" :key="i">{{item.number}}</div>
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div class="sure-big-btn" @click="sureBtn">充值</div>
    <div class="prompt">提示：近期充值渠道不太稳定，若遇到充值不成功，请多尝试几次或联系客服，给您带来不便，敬请见谅。</div>
    <!-- 支付确认弹框 -->
    <van-overlay :show="showShopCar" @click="clearModel" />
    <div class="model-box" v-if="showShopCar">
      <div class="title-box">支付</div>
      <p v-if="isFinish">你的支付请求已提交</p>
      <div class="close-btn" @click="clearModel">×</div>
      <div class="model-text between">
        <div class="model-label">充值方式：</div>
        <div class="model-label" v-if='activeTab=="alipay"'>支付宝</div>
        <div class="model-label" v-else>微信</div>
      </div>
      <div class="model-text between">
        <div class="model-label">充值金额：</div>
        <div class="model-label model-price">{{price}}</div>
      </div>

      <div class="btn-box between" v-if="isFinish">
        <div class="btn sure-big-btn" @click="successBtn">支付完成</div>
        <div class="btn sure-big-btn matter-btn">支付遇到问题</div>
      </div>
      <div class="sure-big-btn" v-else @click="submit">确认支付</div>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="price" extra-key="." :show="show" safe-area-inset-bottom :maxlength="10" @blur="show = false" />
    <!-- 二维码弹框 -->
    <van-overlay :show="showCode"  />
    <div class="codePop-box" v-if="showCode">
      <div class="close-box" @click="clearCodeModel"></div>
      <!-- <div class="qrcode" ref="qrcodeContainer"></div> -->
      <!-- <img class="code-img" :src="codeUrl" alt="">
      <p>请扫码支付，长按保存二维码</p> -->
      <div class="top-box">订单号：{{orderNo}}</div>
      <div class="top-text-box">
        <span>支付确认时，确保与订单支付金额保持一致</span>
        <i></i>
      </div>
      <div class="content-box">
        <div class="price">¥{{price}}</div>
        <div class="code-box">
          <img v-if="codeUrl" :src="codeUrl" alt />
        </div>
        <div class="top-text-box">
          <span>重复支付和修改金额无法到账，概不负责</span>
        </div>
        <div class="term-box">
          <div class="list-box">
            <p>1</p>
            <span>长按/截图，保存到相册</span>
          </div>
          <div class="list-box">
            <p>2</p>
            <span v-if="activeTab=='wechant'">打开微信扫一扫，相册识别</span>
            <span v-else>打开支付宝扫一扫，相册识别</span>
          </div>
          <div class="list-box">
            <p>3</p>
            <span>进行支付确认</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';//二维码生成插件
import {uploadUserInfo} from '@/utils/utils.js';
let iconSuccess = require('@/assets/icon-success.png');
export default {
  name: "pay",
  data() {
    return {
      activeGame: "",
      activeTab: 'alipay', //alipay为支付宝支付，wechant为微信支付
      showShopCar: false, //遮罩层
      price: "", //金额
      priceList: [
        { number: "100", id: 1 },
        { number: "200", id: 2 },
        { number: "500", id: 3 },
        { number: "1000", id: 4 },
        { number: "2000", id: 5 }
      ], //金额筛选的项
      show: false, //控制弹出数字键盘
      isFinish: false, //判断是否完成
      showCode:false,//控制二维码弹框
      codeUrl:'https://wallimn.iteye.com',//二维码地址
      orderNo:null,//订单号
    };
  },
  created() {
    this.$store.commit("setPageTitle", "充值");
  },
  mounted() {
   // this.showQRCode();
   this.uploadUserInfo();
  },
  methods: {
    uploadUserInfo:uploadUserInfo,//获取用户详情
    //生成二维码
    // vue对象的一个method
    showQRCode() {
      var qrcode = new QRCode(this.$refs.qrcodeContainer, {
        text: "https://wallimn.iteye.com",
        width: 260,
        height: 260,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    //选择支付方式
    changePay(num) {
      if (this.activeTab != num) {
        this.activeTab = num;
      }
    },
    //赋值要充值的金额
    assignment(item) {
      this.price = item.number;
    },
    //关闭充值弹框
    clearModel() {
      this.showShopCar = false;
      this.isFinish = false;
      this.uploadUserInfo();
    },
    //点击充值按钮
    sureBtn() {
      if (!!this.price) {
        if (parseFloat(this.price) <= 10000) {
          
          if(parseFloat(this.price) >= 100){
            this.showShopCar = true;
            this.isFinish = false;
          }else{
            this.$toast({
              duration: 1000,
              forbidClick: true, // 禁用背景点击
              message: "输入金额不能小于100"
            });
          }
        } else {
          this.$toast({
            duration: 1000,
            forbidClick: true, // 禁用背景点击
            message: "输入金额不能大于10000"
          });
          
        }
      }else{
        this.$toast({
          duration: 1000,
          forbidClick: true, // 禁用背景点击
          message: "请输入充值金额"
        });
      }
    },
    //点击确认充值
    submit() {
      let params={
        token:this.$store.state.token,
        transferType:this.activeTab,//充值方式
        amount:parseFloat(this.price),//充值金额
      }
      this.$http.post("orderInfo/recharge",params ).then(res => {
        if (res.retCode == "0") {
         this.codeUrl=res.data.codeUrl;
         this.orderNo=res.data.orderNo;
         this.showShopCar = false;
         this.isFinish = false;
         this.showCode = true;
        } 
      });
    },
    //点击支付完成按钮
    successBtn() {
      let params = {
        token:this.$store.state.token,
        orderNo:this.orderNo
      }
      this.$http.post('orderInfo/paid',params).then(res=>{
        if(res.retCode == 0){
          this.$toast.success({duration: 1000,icon: iconSuccess,forbidClick: true, message: "支付成功！"});
          this.$router.replace({ path: "/layout/home" });
        }
      })
    },
    //关闭二维码弹框
    clearCodeModel(){
      this.showCode=false;
      this.isFinish=true;
      this.showShopCar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  height: 100%;
  overflow-y: auto;
  padding: 0 40px;
  .pay-type {
    padding-top: 38px;
    .img-box {
      width: 331px;
      height: 113px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 3px 5px 3px;
      float: left;
      position: relative;
      i {
        background: url("../../assets/greensaojiao.png") no-repeat;
        background-size: 70px 48px;
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 48px;
      }
    }
    .zfb-img {
      margin-right: 10px;
      background-color: #479ee3;
      img {
        height: 48px;
      }
    }
    .wx-img {
      background-color: #5ecc3e;
      img {
        height: 48px;
      }
    }
    .active {
      i {
        display: block;
      }
    }
  }
  .content-box {
    margin-top: 130px;
    .content-top {
      width: 100%;
      .content-top-l {
        color: $gray;
        font-size: 25px;
      }
      .content-top-r {
        color: $gray;
        font-size: 25px;
      }
    }
    .content-body {
      margin-top: 30px;
      .input-box {
        width: 100%;
        background-color: #35333b;
        border-radius: 3px;
        input {
          padding-left: 28px;
          font-size: 29px;
          color: $gray;
          height: 93px;
        }
      }
      .price-list {
        margin-top: 40px;
        .price-box {
          width: 130px;
          height: 80px;
          background-color: #35333b;
          border-radius: 3px;
          margin-right: 5px;
          line-height: 80px;
          text-align: center;
          font-size: 27px;
          color: $gray;
        }
        .price-box:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .shop-car {
    height: 100vh;
    background: $opacity-dark;
    padding: 0 40px;
  }
  .model-box {
    position: fixed;
    width: 89.33333%;
    min-height: 387px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #252426;
    border-radius: 5px;
    padding: 40px;
    z-index: 20;
    .title-box {
      color: $gray;
      font-size: 29px;
      text-align: center;
      margin-bottom: 40px;
    }
    p {
      color: $gray;
      font-size: 24px;
      text-align: center;
      margin-bottom: 40px;
    }
    .close-btn {
      position: absolute;
      top: 26px;
      right: 34px;
      display: block;
      color: #ffc444;
      font-size: 50px;
      font-weight: 300;
    }
    .model-text {
      margin-bottom: 45px;
      .model-label {
        font-size: 24px;
        color: $gray;
      }
      .model-price {
        color: #ffc444;
      }
    }
    .sure-big-btn {
      margin-top: 60px;
    }
    .btn-box {
      .btn {
        border: solid 2px #ffc444;
        width: 49%;
        line-height: 76px;
        margin-top: 15px;
      }
      .sure-btn {
      }
      .matter-btn {
        background-color: transparent;
        color: $gray;
      }
    }
  }
  .prompt {
    color: $gray;
    font-size: 20px;
    margin-top: 28px;
    line-height: 32px;
  }
  .codePop-box {
    width: 100%;
    transform: translate(-50%);
    top: 140px;
    position: fixed;
    width: 89.33333%;
    left: 50%;
    background-color: #252426;
    border-radius: 5px;
    z-index: 20;
    .top-box {
    color: $gray;
    padding: 22px 42px;
    background-color: #35333b;
    font-size: 26px;
    margin: 25px 0;
    margin-top: 0;
  }
  .top-text-box {
    background-color: #ffc444;
    position: relative;
    text-align: center;
    padding: 20px 0;
    span {
      color: #000;
      font-size: 31px;
    }
    i {
      display: block;
      position: absolute;
      left: 50%;
      bottom: -50px;
      transform: translate(-50%);
      border: 25px solid transparent;
      border-top: 25px solid #ffc444;
    }
  }
  .content-box {
    background-color: #35333b;
    margin-top: 25px;
    .price {
      color: #ff4200;
      font-size: 59px;
      text-align: center;
      padding: 40px 0;
    }
    .code-box {
      text-align: center;
      padding-bottom: 50px;
      img {
        width: 347px;
        height: 347px;
      }
    }
    .top-text-box {
      span {
        font-size: 31px;
      }
    }
    .term-box {
      padding-top: 31px;
      .list-box {
        padding-bottom: 28px;
        padding-left: 110px;
        p {
          width: 44px;
          height: 44px;
          background-color: #ffc444;
          border-radius: 6px;
          font-size: 33px;
          color: #000;
          line-height: 44px;
          text-align: center;
          display: inline-block;
          margin-bottom: 0;
        }
        span {
          padding-left: 28px;
          color: $gray;
          font-size: 33px;
        }
      }
    }
  }
  .close-box{
      position: absolute;
      right: -20px;
      top: -20px;
      width:60px;
      height: 60px;
      background: url('../../assets/icon-close2.png') no-repeat;
      background-size: 100%;
    }
    // .code-img{
    //   width: 540px;
    //   height: 540px;
    // }
    // p{
    //   font-size: 28px;
    //   padding-top: 30px;
    //   margin-bottom: 0;
    // }
    // .close-box{
    //   position: absolute;
    //   left: 50%;
    //   bottom: -120px;
    //   transform: translateX(-50%);
    //   width:70px;
    //   height: 70px;
    //   background: url('../../assets/icon-close2.png') no-repeat;
    //   background-size: 100%;
    // }
  }
}
</style>

<style lang="css" scoped>
.container >>> .van-overlay {
  z-index: 10;
}
</style>