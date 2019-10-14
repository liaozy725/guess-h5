<template>
  <div class="container">
    <div class="list-box">
      <div class="label-text" v-if="$store.state.userInfo&&$store.state.userInfo.mobileNo">修改手机：</div>
      <div class="label-text" v-else>绑定手机：</div>
      <div class="label-content">
        <input type="number" v-model="mobileNo"  placeholder="请输入手机号" />
      </div>
    </div>
    <!-- <div class="list-box">
      <div class="label-text">验证码：</div>
      <div class="label-content label-content-code">
        <input type="text" v-model="bankCard" placeholder="请输入验证码" />
        <span class="send-code" @click="sendCode">{{codeText}}</span>
      </div>
    </div> -->

    <div class="sure-big-btn" @click="submit">确认绑定</div>
  </div>
</template>

<script>
import { regPhone } from "@/utils/utils.js";
import {uploadUserInfo} from '@/utils/utils.js';
let iconSuccess = require('@/assets/icon-success.png');
let iconWarning = require('@/assets/icon-warning.png');
export default {
  name: "ChangeMobile",
  data() {
    return {
      mobileNo: "", //手机号
      codeText: "发送验证码",
      disabled: false, //判断验证码按钮是否能点击
      userInfo:null,//用户信息
    };
  },
  created() {
    if(this.$store.state.userInfo&&this.$store.state.userInfo.mobileNo){
      this.$store.commit("setPageTitle", "修改手机");
    }else{
      this.$store.commit("setPageTitle", "绑定手机");
    }
    
    this.userInfo=this.$store.state.userInfo||null;
    console.log(this.userInfo)
  },
  mounted() {},
  methods: {
    uploadUserInfo:uploadUserInfo,//获取用户详情
    //点击确认
    submit() {
      if (!regPhone(this.mobileNo)) {
        return this.$toast({
          duration: 1000,
          forbidClick: true, // 禁用背景点击
          icon: iconWarning,
          message: "请输入正确的手机号码"
        });
      }
      let params={
        token:this.$store.state.token,
        mobileNo:this.mobileNo
      }
      this.$http.post("userInfo/bindMobileNo", params).then(res => {
        if (res.retCode == 0) {
          this.$toast.success({
            duration: 1000,
            icon: iconSuccess,
            forbidClick: true, // 禁用背景点击
            message: "操作成功！"
          });
           this.uploadUserInfo();
          this.$router.go(-1);//返回上一层
        }
      });
    },
    // 发送验证码
    sendCode() {
      this.$http.post("userBank/info", params).then(res => {
        if (res.retCode == 0) {
          this.disabled = true;
          let currentTime = 60;
          // 设置发送验证码按钮样式
          let interval = null;
          let _this = this;
          interval = setInterval(function() {
            currentTime--;
            _this.codeText = currentTime + "s后重送";
            if (currentTime <= 0) {
              clearInterval(interval);
              _this.codeText = "获取验证码";
              _this.disabled = false;
            }
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
a {
  display: block;
}
.container {
  padding: 0 40px;
  .list-box {
    // height: 100px;
    display: flex;
    border-bottom: 1px solid $border-color;
    align-items: center;
    .label-text,
    .label-content {
      color: $gray;
      font-size: 27px;
      height: 100px;
      line-height: 100px;
    }
    .label-text {
      width: 200px;
      float: left;
    }
    .label-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      input {
        width: 100%;
        font-size: 27px;
      }
      .gray-text,
      .check-text {
        font-size: 27px;
        color: #777;
      }
      .check-text {
        color: $gray;
      }
      &.label-content-code {
        display: flex;
        align-items: center;
        input {
          flex: 1;
        }
        .send-code {
          font-size: 24px;
          border-radius: 10px;
          border: 1px solid $yellow;
          color: $yellow;
          height: 60px;
          line-height: 56px;
          width: 160px;
          text-align: center;
        }
      }
    }
  }
  .sure-big-btn {
    margin-top: 247px;
  }
}
</style>

<style lang="css" scoped>
.van-password-input >>> .van-password-input__security li {
  height: 70px;
}
</style>