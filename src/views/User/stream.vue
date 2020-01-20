<template>
  <div class="container">
    <van-tabs v-model="active" :border="false" @change="changeTab">
      <van-tab title="全部" name="0"></van-tab>
      <van-tab title="充值" name="1"></van-tab>
      <van-tab title="提现" name="2"></van-tab>
      <van-tab title="结算" name="3"></van-tab>
      <van-tab title="投注" name="4"></van-tab>
      
      <!-- <van-tab title="其他"></van-tab> -->
    </van-tabs>
    <van-list v-model="loading" :finished="finished" :offset="20" finished-text="没有更多了" @load="getList">
      <div class="list-box">
        <div class="list between" v-for="(item,i) in listData" :key="i">
          <div class="list-l">{{item.remark}}</div>
          <div class="list-c">{{item.createTime|parseTime}}</div>
          <div class="list-r" v-if="item.transactionStatus=='add'">+{{item.amount}}</div>
          <div class="list-r" v-if="item.transactionStatus=='sub'">-{{item.amount}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "stream",
  data() {
    return {
      active: '',
      loading:false,//加载中
      finished:false,//没有更多数据
      pageNum:0,
      pageSize:20,
      listData: [],
    };
  },
  created() {
    this.$store.commit("setPageTitle", "财务流水");
  },
  mounted() {},
  methods: {
    //改变tab
    changeTab(val){
      this.pageNum=0;
      this.listData=[];
      this.finished = false;
      this.getList();
    },
    //获取数据
    getList(){
      var params={
        token:this.$store.state.token,
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        transactionType:this.active=="0"?'':this.active,
      }
      this.loading = true;
      this.$http.post("userBalanceInfo/list", params).then(res => {
        if (res.retCode == 0) {
         this.listData = this.listData.concat(res.data);
         this.pageNum++;
          if(res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
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
  .list-box {
    padding: 0 40px;
    .list {
      height: 110px;
      align-items: center;
      border-bottom: 1px solid $border-color;
      .list-c {
        font-size: 21px;
      }
    }
    .list > div {
      color: $gray;
      font-size: 27px;
    }
  }
}
</style>

<style lang="css" scoped>
.van-tabs >>> .van-tabs__wrap--scrollable .van-tab {
  flex: 0 0 20% !important;
  flex-basis: 20% !important;
}
</style>