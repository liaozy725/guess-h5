<template>
  <div class="container account">

  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  created(){
    this.$store.commit("setPageTitle", "账户");
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
</style>