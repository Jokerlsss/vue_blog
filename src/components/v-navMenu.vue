<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" @click="toStock">首页</el-menu-item>
    <el-menu-item index="2">关于我</el-menu-item>
    <!-- <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>-->
    <el-menu-item index="3">博客</el-menu-item>
    <el-menu-item index="4">
      个人中心
      <!-- <a href="#" target="_blank">订单管理</a> -->
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toStock: function () {
      this.$router.replace('/Stock')
    }
  }
}
</script>

<style scoped>
</style>
