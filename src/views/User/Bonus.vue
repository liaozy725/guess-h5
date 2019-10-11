<template>
  <div class="container bonus">
    <div class="header">
      <div class="item">
        <span>可提现奖金</span>
        <p>500.00<span>元</span></p>
      </div>
      <div class="item">
        <span>冻结（竞猜结束后解冻）</span>
        <p>50.24<span>元</span></p>
      </div>
      <router-link to="/layout/withdraw" class="header-btn">
        全部提现
      </router-link>
    </div>
    <div class="code">
      <span class="code-txt">我的邀请码：QRFJJEOIJOIASDFIO</span>
      <span class="code-btn" v-clipboard:copy="'QRFJJEOIJOIASDFIO'" v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError">复制</span>
    </div>
    <div class="list-box">
      <div class="nav">
        <span class="active" @click="changeNav()">历史记录</span>
        <span @click="changeNav()">我的下属</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <!-- 历史记录 -->
        <!-- <ul class="list list-history">
          <li v-for="item in 2">
            <p class="info">
              <span class="time">2019/12/23 23:23</span>
              <span>可提</span>
            </p>
            <p>
              某某某下注某某比赛100元，获得奖金2元
            </p>
          </li>
        </ul> -->
        <!-- 我的下属 -->
        <ul class="list list-team">
          <li v-for="item in 2">
            <span>王小明</span>
            <span>一级下属</span>
            <span>总奖金2345元</span>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: true,
    }
  },
  created() {
    this.$store.commit("setPageTitle", "奖金");
  },
  methods: {
    // 获取列表
    getList() {

    },
    // 切换导航
    changeNav(nav){
      
    },
    // 复制成功
    onCopySuccess() {
      this.$toast({ duration: 2000, forbidClick: true, message: "复制成功" });
    },
    // 复制失败
    onCopyError(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.bonus {
  padding: 58px 30px;
  .header {
    display: flex;
    color: $gray;
    .item {
      flex: 1;
      span {
        font-size: 19px;
      }
      p {
        font-size: 36px;
        margin-top: 42px;
      }
    }
    .header-btn {
      color: $yellow;
      border: 1px solid $yellow /*no*/;
      font-size: 24px;
      line-height: 100px;
      border-radius: 5px;
      width: 148px;
      text-align: center;
      margin-left: 10px;
    }
  }
  .code {
    color: $gray;
    background-color: $border-color;
    margin-top: 46px;
    padding: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    span.code-txt {
      font-size: 24px;
      flex: 1;
    }
    span.code-btn {
      font-size: 24px;
      color: $yellow;
      padding: 8px 16px;
      border: 1px solid $yellow /*no*/;
      border-radius: 5px;
    }
  }
  .list-box {
    color: $gray;
    padding-top: 80px;
    .nav {
      margin-bottom: 35px;
      span {
        font-size: 24px;
        margin-right: 48px;
        &.active {
          font-weight: bold;
        }
      }
    }
    .list-history {
      li {
        background: $border-color;
        padding: 30px;
        margin-bottom: 20px;
        .info {
          display: flex;
          margin-bottom: 24px;
          span {
            font-size: 24px;
          }
          span.time {
            flex: 1;
          }
        }
        p {
          font-size: 24px;
        }
      }
    }
    .list-team {
      padding: 40px 30px 0;
      background: $border-color;
      border-radius: 5px;
      li {
        display: flex;
        padding-bottom: 40px;
        span {
          flex: 1;
          font-size: 24px;
        }
      }
    }
  }
}
</style>