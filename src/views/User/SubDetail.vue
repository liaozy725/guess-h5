<template>
  <div class="container sub-detail">
    <van-list class="sub-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <div class="sub-item" v-for="(item,index) in 20" @click="jumpLink(item)">
        <span>王小明</span>
        <p>0.020</p>
      </div>
    </van-list>
    <div class="btn-box">
      <div class="submit-btn">完成</div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      listData: [1, 2, 3, 4],
      pageNum: 0,
      pageSize: 20,
    }
  },
  created() {
    this.$store.commit("setPageTitle", "王小明");
  },
  methods: {
    getList() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.sub-detail {
  padding: 30px;
  padding-bottom: 110px;
  overflow-y: auto;
  .sub-item {
    display: flex;
    height: 100px;
    background: $dark;
    align-items: center;
    border-radius: 6px;
    padding: 0 30px;
    margin-bottom: 15px;
    span {
      font-size: 24px;
      flex: 1;
    }
    p {
      border: 2px solid $yellow;
      font-size: 24px;
      color: $yellow;
      height: 60px;
      line-height: 60px;
      width: 120px;
      border-radius: 6px;
      text-align: center;
    }
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #181819;
    padding: 30px 30px;
    z-index: 9;
    .submit-btn {
      background: $yellow;
      font-size: 24px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      color: $black;
      font-weight: bold;
      border-radius: 10px;
    }
  }
}
</style>