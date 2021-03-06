// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// vex-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// axios
import axios from 'axios'
// echarts
import echarts from 'echarts'
import world from 'echarts/map/json/world.json'
import china from 'echarts/map/json/china.json'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VXETable)

Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts
echarts.registerMap('world', world)
echarts.registerMap('china', china)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
