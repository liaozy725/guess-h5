<template>
  <div class="container sub-detail">
    <van-list class="sub-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <div class="sub-item" v-for="(item,index) in listData" @click="jumpLink(item)">
        <span>王小明</span>
        <p>0.020</p>
      </div>
    </van-list>
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
  created(){
    this.$store.commit("setPageTitle","王小明");
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
    p{
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
}
</style>