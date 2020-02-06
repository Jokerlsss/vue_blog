<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章名称</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="toMarkDown">查看</el-button>
    </div>
    <div v-for="o in 1" :key="o" class="text item">{{'文章简介 ' + o }}</div>
  </el-card>
</template>

<script>
export default {
  methods: {
    toMarkDown: function () {
      this.$router.replace('/v-markDown')
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480%;
}
</style>
