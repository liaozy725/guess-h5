<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
    <van-cell v-for="(item,index) in listData" :key="index">
      <template slot="title">
        <p class="between">
          <span class="title">{{item.title}}</span>
          <span>{{item.createTime|parseTime}}</span>
        </p>
        <div class="content" :class="item.isShow&&'show'" @click="toggleShow(item)" >{{item.content}}</div>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  data() {
    return {
      loading:false,//加载中
      finished:false,//没有更多数据
      pageNum:0,
      pageSize:20,
      listData: [],
    };
  },
  created(){
    this.$store.commit("setPageTitle","系统消息");
  },
  methods: {
    getList(){
      var params={
        token:this.$store.state.token,
        pageSize:this.pageSize,
        pageNum:this.pageNum,
      }
      this.loading = true;
      this.$http.post("sysNotice/list", params).then(res => {
        if (res.retCode == 0) {
         this.listData = this.listData.concat(res.data);
         this.pageNum++;
          if(res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
      });
    },
    // 显示内容详情
    toggleShow(item){
      this.$set(item,'isShow',!item.isShow);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.van-cell {
  background-color: transparent !important;
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
  span {
    font-size: 22px;
    color: #8a8791;
    &.title {
      font-size: 28px;
      color: #fff;
    }
  }
  .content {
    font-size: 26px;
    color: $gray;
    line-height: 40px;
    margin-top: 12px;
    // height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.show {
      height: auto;
      text-overflow: clip;
      white-space: normal;
    }
  }
}
</style>
<style scoped>
.van-cell >>> .van-cell__title {
  display: block;
  flex: none;
  width: 100%;
}
.van-cell::after {
  right: 30px;
  left: 30px;
  border-color: #35333b;
}
</style>