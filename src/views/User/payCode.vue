<template>
  <div class="container">
    <!-- <div class="pay-type">微信支付</div> -->
    <div class="top-box">订单号：273654671235367542</div>
    <div class="top-text-box">
      <span>支付确认时，确保与订单支付金额保持一致</span>
      <i></i>
    </div>
    <div class="content-box">
      <div class="price">¥2000</div>
      <div class="code-box">
        <img src="http://ipfsoss.oss-cn-hongkong.aliyuncs.com/ipfsoss/sysCurrency/2019/08/16/3cc6d370-3393-4249-99c5-e81c260238a1.jpg" alt />
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
          <span v-if="payType=='wechant'">打开微信扫一扫，相册识别</span>
          <span v-else>打开支付宝扫一扫，相册识别</span>
        </div>
        <div class="list-box">
          <p>3</p>
          <span>进行支付确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payCode",
  data() {
    return {
      payType: "wechant" //alipay为支付宝支付，wechant为微信支付
    };
  },
  created() {
    this.$store.commit("setPageTitle", "微信支付");
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  height: 100%;
  overflow-y: auto;
  padding: 0 40px;
  .pay-type {
    color: #36333c;
    padding: 47px 0;
    text-align: center;
    background-color: #fff;
  }
  .top-box {
    color: $gray;
    padding: 22px 42px;
    background-color: #35333b;
    font-size: 26px;
    margin: 25px 0;
  }
  .top-text-box {
    background-color: #ffc444;
    position: relative;
    text-align: center;
    padding: 24px 0;
    span {
      color: #000;
      font-size: 33px;
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
      padding: 45px 0;
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
        }
        span {
          padding-left: 28px;
          color: $gray;
          font-size: 33px;
        }
      }
    }
  }
}
</style>

<style lang="css" scoped>
</style>