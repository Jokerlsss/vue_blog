<!--博客主页-->
<template>
  <el-container>
    <!-- 顶部 -->
    <!-- <button @click="getInfo">获取武汉信息</button> -->
    <el-header height="80px">
      <!-- gutter是col之间的空隙大小 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 博客名称 -->
          <div class="grid-content bg-purple">
            <i class="el-icon-monitor" style="color:#1296DB"></i>
            &nbsp;
            <span class="title">刘铄的博客</span>
            <!-- <el-card style="font-weight:bold;display:flex;">刘铄的博客</el-card> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- 导航栏 -->
            <vNavMenu />
          </div>
        </el-col>
        <el-col :span="6">
          <!-- 搜索 -->
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左边栏 -->
      <el-aside>
        <!-- 竖列布局 -->
        <el-row>
          <el-col :span="24">
            <vCard />
          </el-col>
          <el-col :span="24">
            <vCard />
          </el-col>
        </el-row>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <vArticle />
        <vArticle class="vArticle" />
        <vArticle class="vArticle" />
        <vArticle class="vArticle" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vCard from './v-card'
import vNavMenu from './v-navMenu'
import vArticle from './v-article'
export default {
  components: {
    vCard,
    vNavMenu,
    vArticle
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/********* 总体 Layout 布局 *********/
.el-header,
.el-footer {
  /* background-color: #b3c0d1;
  color: #333; */
  /* text-align: center; */
  line-height: 70px;
  font-size: 24px;
}

.el-aside {
  display: flex;
  justify-content: center;
  /* background-color: #d3dce6;
  color: #333; */
}

.el-main {
  /* background-color: #e9eef3;
  color: #333; */
  /* text-align: center; */
  display: flex;
  flex-wrap: wrap;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/********* 左边侧栏 Layout 布局  *********/
.el-row {
  margin-bottom: 20px;
}
.el-col {
  margin-top: 20px;
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* background: #d3dce6; */
}
.bg-purple-light {
  /* background: #e5e9f2; */
}
.grid-content {
  border-radius: 4px;
  min-height: 45px;
}
.row-bg {
  /* padding: 10px 0; */
  background-color: #f9fafc;
}
/** 文章间隙 */
.vArticle {
  margin-top: 20px;
}
.title {
  font-family: 'PingFang SC';
  font-weight: bold;
}
</style>
