<template>
  <div id="app">
    <keep-alive>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <router-view v-else></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>


export default {
  
}
</script>

<style lang="scss">
@import "./style/index.scss";
#app{
  height: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}
.van-tab__text{
  font-size: 28px;
}
</style>
