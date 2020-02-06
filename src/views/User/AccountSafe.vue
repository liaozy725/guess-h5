<template>
  <div class="container">
    <div class="list-box">
      <div class="label-text">绑定手机</div>
      <router-link to="/layout/ChangeMobile" class="label-content">
        <span v-if="$store.state.userInfo&&$store.state.userInfo.mobileNo">{{$store.state.userInfo.mobileNo}}</span>
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div>
    <div class="list-box">
      <div class="label-text">修改密码</div>
      <router-link to="/layout/ChangePwd" class="label-content">
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div>
    <!-- <div class="list-box">
      <div class="label-text">支付密码</div>
      <router-link to="/layout/ChangePayPwd" class="label-content">
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "AccountSafe",
  data() {
    return {
    };
  },
  created() {
    this.$store.commit("setPageTitle", "账户安全");
  },
  mounted() {

  },
  methods: {
    
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
      text-align: right;
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
      &.password-box {
        margin-top: 30px;
      }
      .icon-r {
        width: 14px;
        transform: rotate(180deg);
        vertical-align: middle;
        margin-left: 20px;
      }
      span {
        vertical-align: middle;
        font-size: 24px;
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