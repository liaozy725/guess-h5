<template>
  <div class="layout">
    <Navigation>
      <!-- <router-link v-if="$route.name=='Bonus'" slot='nav-r-slot' class="set-link" to="/layout/MySub">设置</router-link> -->
    </Navigation>
    <keep-alive>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <router-view v-else></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.layout{
  height: 100%;
  position: relative;
  padding-top: 107px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  .set-link{
    font-size: 28px;
    width: 100%;
    text-align: right;
  }
}
</style>