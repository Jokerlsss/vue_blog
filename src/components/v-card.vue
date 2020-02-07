<template>
  <el-aside>
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toTable">toTable</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toTable: function () {
      this.$router.replace('/v-vexTable')
    }
  }
}
</script>

<style scoped>
/** 分类卡片栏 */
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
  width: 280px;
}
</style>
