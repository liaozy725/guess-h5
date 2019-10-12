<template>
  <div class="container bonus">
    <div class="header">
      <div class="item">
        <span>可提现奖金</span>
        <p v-if="$store.state.userInfo">{{$store.state.userInfo.userPrize}}<span>元</span></p>
      </div>
      <div class="item">
        <span>冻结（竞猜结束后解冻）</span>
        <p v-if="$store.state.userInfo">{{$store.state.userInfo.userFrozenPrize}}<span>元</span></p>
      </div>
      <router-link :to="{path:'/layout/withdraw',query:{type:'prize'}}" class="header-btn">
        全部提现
      </router-link>
    </div>
    <div class="code">
      <span class="code-txt">我的邀请码：{{$store.state.userInfo.invitationCode}}</span>
      <span class="code-btn" v-clipboard:copy="$store.state.userInfo.invitationCode" v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError">复制</span>
    </div>
    <div class="list-box">
      <div class="nav">
        <span :class="activeNav==1&&'active'" @click="changeNav(1)">历史记录</span>
        <span :class="activeNav==2&&'active'" @click="changeNav(2)">我的下属</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <!-- 历史记录 -->
        <ul class="list list-history" v-if="activeNav==1">
          <li v-for="item in listData">
            <p class="info">
              <span class="time">{{item.createTime|parseTime}}</span>
              <span>{{matchResultObj[item.matchResult]}}</span>
            </p>
            <p>{{item.remark}}</p>
          </li>
        </ul>
        <!-- 我的下属 -->
        <ul class="list list-team" v-else>
          <li v-for="item in listData">
            <span>{{item.accountLogin}}</span>
            <span>{{levelObj[item.level]}}</span>
            <span>总奖金{{item.userPrize}}元</span>
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
      finished: false,
      pageNum: 0,
      pageSize: 10,
      activeNav: 1,
      listData: [],
      levelObj: { 1: '一级下属', 2: '二级下属' },
      matchResultObj: { 1: '可提', 2: '冻结' }
    }
  },
  created() {
    this.$store.commit("setPageTitle", "奖金");
  },
  methods: {
    // 获取列表
    getList() {
      var params = {
        token: this.$store.state.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }
      this.loading = true;
      let url = this.activeNav == 1 ? 'userPrizeInfo/list' : 'userPrizeInfo/levelList';
      this.$http.post(url, params).then(res => {
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.pageNum++;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
      });
    },
    // 切换导航
    changeNav(nav) {
      this.activeNav = nav;
      this.pageNum = 0;
      this.finished = false;
      this.listData = [];
      this.getList();
    },
    // 复制成功
    onCopySuccess() {
      this.$toast({ duration: 2000, forbidClick: true, message: "复制成功" });
    },
    // 复制失败
    onCopyError() {

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
        opacity: 0.5;
        &.active {
          font-weight: bold;
          opacity: 1;
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