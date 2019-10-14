<template>
  <div class="container">
    <div class="list-box">
      <div class="label-text">旧密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.oldPassword" :change="onInputChange('oldPassword')"  placeholder="请输入旧密码" />
      </div>
    </div>
    <div class="list-box">
      <div class="label-text">新密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.newPassword" :change="onInputChange('newPassword')"  placeholder="6-12位字母或数字" />
      </div>
    </div>
    <div class="list-box">
      <div class="label-text">新密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.confirmPassword" :change="onInputChange('confirmPassword')"  placeholder="请再一次输入您的新密码" />
      </div>
    </div>

    <div class="sure-big-btn" @click="submit">确认修改</div>
  </div>
</template>

<script>
let iconSuccess = require('@/assets/icon-success.png');
let iconWarning = require('@/assets/icon-warning.png');
export default {
  name: "BankcardInfo",
  data() {
    return {
      formData:{
        oldPassword: "", //旧密码
        newPassword: "" ,//新密码
        confirmPassword:'',//确认密码
      }
      
    };
  },
  created() {
    this.$store.commit("setPageTitle", "修改密码");
  },
  mounted() {},
  methods: {
    // 限制输入英文 数字
    onInputChange(key) {
      this.formData[key] = this.formData[key].replace(/[^\a-\z\A-\Z0-9]/g, "");
    },
    //点击确认
    submit() {
      if(!this.formData.oldPassword|| this.formData.oldPassword.length<6){
        return this.$toast({
          duration: 1000,
          icon: iconWarning,
          forbidClick: true, // 禁用背景点击
          message: "请输入正确的旧密码"
        });
      }
      if(!this.formData.newPassword|| this.formData.newPassword.length <6){
        return this.$toast({
          duration: 1000,
          forbidClick: true, // 禁用背景点击
          icon: iconWarning,
          message: "请输入正确的新密码"
        });
      }
      if(this.formData.confirmPassword!=this.formData.newPassword){
        return this.$toast({
          duration: 1000,
          forbidClick: true, // 禁用背景点击
          icon: iconWarning,
          message: "两次密码不一致"
        });
      }
      let params={
        token:this.$store.state.token,
        oldPassword:this.formData.oldPassword,
        newPassword:this.formData.newPassword,
        confirmPassword:this.formData.confirmPassword,
      }
      this.$http.post("userInfo/updateLoginPassword", params).then(res => {
        if (res.retCode == 0) {
          this.$toast.success({
            duration: 1000,
            forbidClick: true, // 禁用背景点击
            icon: iconSuccess,
            message: "操作成功！"
          });
          this.$router.go(-1);//返回上一层
        }
      });
    },
    // 发送验证码
    sendCode() {}
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
        input{
          flex:1;
        }
        .send-code {
          font-size: 24px;
          border-radius: 10px;
          border:1px solid $yellow;
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
.van-oldPassword-input >>> .van-oldPassword-input__security li {
  height: 70px;
}
</style>