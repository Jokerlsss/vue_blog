<template>
  <div>
    <div>现在时间：{{timeNow}}</div>
    <div>刷新次数：{{timeCount}}</div>
    <vxe-table :data="countryData" align="center" stripe>
      <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="国家"></vxe-table-column>
      <vxe-table-column field="total.confirm" title="确诊人数"></vxe-table-column>
      <vxe-table-column field="total.suspect" title="疑似病例"></vxe-table-column>
      <vxe-table-column field="total.heal" title="治愈人数"></vxe-table-column>
      <vxe-table-column field="total.dead" title="死亡人数"></vxe-table-column>
    </vxe-table>
    <div style="height:100px"></div>
    <vxe-table :data="provinceData" align="center" stripe>
      <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="省份"></vxe-table-column>
      <vxe-table-column field="total.confirm" title="确诊人数"></vxe-table-column>
      <vxe-table-column field="total.suspect" title="疑似病例"></vxe-table-column>
      <vxe-table-column field="total.heal" title="治愈人数"></vxe-table-column>
      <vxe-table-column field="total.dead" title="死亡人数"></vxe-table-column>
    </vxe-table>
    <div style="height:100px"></div>
    <div style="height:900px" id="main"></div>
  </div>
</template>

<script>
// require('echarts/map/json/world.json')
import { MP } from '../map.js'
// require('echarts')
require('echarts/extension/bmap/bmap')
export default {
  data () {
    return {
      provinceData: null,
      countryData: null,

      timeNow: new Date(),
      timeCount: 0,

      echartsDatas: [],
      temp: {
        name: null,
        value: null
      },

      // convertData: null,
      geoCoordMap: {
        '山东': [117.000923, 36.675807],
        '河北': [115.48333, 38.03333],
        '吉林': [125.35000, 43.88333],
        '黑龙江': [127.63333, 47.75000],
        '辽宁': [123.38333, 41.80000],
        '内蒙古': [111.670801, 41.818311],
        '新疆': [87.68333, 43.76667],
        '甘肃': [103.73333, 36.03333],
        '宁夏': [106.26667, 37.46667],
        '山西': [112.53333, 37.86667],
        '陕西': [108.95000, 34.26667],
        '河南': [113.65000, 34.76667],
        '安徽': [117.283042, 31.86119],
        '江苏': [119.78333, 32.05000],
        '浙江': [120.20000, 30.26667],
        '福建': [118.30000, 26.08333],
        '广东': [113.23333, 23.16667],
        '江西': [115.90000, 28.68333],
        '海南': [110.35000, 20.01667],
        '广西': [108.320004, 22.82402],
        '贵州': [106.71667, 26.56667],
        '湖南': [113.00000, 28.21667],
        '湖北': [114.298572, 30.584355],
        '四川': [104.06667, 30.66667],
        '云南': [102.73333, 25.05000],
        '西藏': [91.00000, 30.60000],
        '青海': [96.75000, 36.56667],
        '天津': [117.20000, 39.13333],
        '上海': [121.55333, 31.20000],
        '重庆': [106.45000, 29.56667],
        '北京': [116.41667, 39.91667],
        '台湾': [121.30, 25.03],
        '香港': [114.10000, 22.20000],
        '澳门': [113.50000, 22.20000]
      }
    }
  },
  created () {
    this.getInfo()
  },
  mounted () {
    // 调用实时刷新的方法
    this.time()
    this.$nextTick(() => {
      MP().then(BMap => {
        console.log('echartsDatas111', this.echartsDatas)
        this.drawChart()
      })
    })
  },
  destroyed () {
    // 销毁时关闭时间器
    clearInterval(this.timer)
  },
  methods: {
    // 获取武汉疫情信息
    getInfo () {
      const timeStamp = new Date().getTime()
      const url = `/api/g2/getOnsInfo?name=disease_h5&callback=&_=${timeStamp}`
      this.$http.get(url).then(res => {
        // 用 JSON.parse 转换成 json 格式的数据
        const subData = JSON.parse(res.data.data)
        // areaTree 取 0 为中国，其他国家需递增
        // ------省份数据------
        const china = subData.areaTree[0]
        this.provinceData = china.children
        // ------国家数据------
        this.countryData = subData.areaTree
        // ------Echarts图-----
        /**
         * data = [
          {
            name: '山东',
            value: 50
          },
         */
        for (var i = 0; i < this.provinceData.length; i++) {
          var geoCoord = this.geoCoordMap[this.provinceData[i].name]
          if (geoCoord) {
            this.temp.name = this.provinceData[i].name
            this.temp.value = geoCoord.concat(this.provinceData[i].total.confirm)
            // ****************未解决数据问题****************
            console.log(this.provinceData[i].name)
            console.log(this.provinceData[i].total.confirm)
            console.log(this.temp)
            this.echartsDatas.push(this.temp)
          }
          /** 设置数组，传进 echartsDatas 中 */
          // this.temp.name = this.provinceData[i].name
          // this.temp.value = this.provinceData[i].total.confirm
          // this.echartsDatas.push(this.temp)
          // console.log('provinceData:', this.provinceData[i].name)
          // console.log('provinceData:', this.provinceData[i].total.confirm)
        }
        // console.log('provinceData:', this.provinceData)
      }).catch(err => {
        console.log(err)
      })
    },
    // 定时刷新，发起请求, 1800000 为毫秒，即为半小时刷新一次
    time () {
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          this.timeNow = new Date()
          this.timeCount += 1
          this.getInfo()
        }, 300000)
      }
    },
    // getconvertData (data) {
    //   var res = []
    //   for (var i = 0; i < data.length; i++) {
    //     var geoCoord = this.geoCoordMap[data[i].name]
    //     if (geoCoord) {
    //       res.push({
    //         name: data[i].name,
    //         value: geoCoord.concat(data[i].value)
    //       })
    //     }
    //   }
    //   return res
    // },
    /**
     * 生成地图的各项
     */
    // renderItem (params, api) {
    //   var echarts = require('echarts')
    //   var points = []
    //   var color = api.visual('color')

    //   return {
    //     type: 'polygon',
    //     shape: {
    //       points: echarts.graphic.clipPointsByRect(points, {
    //         x: params.coordSys.x,
    //         y: params.coordSys.y,
    //         width: params.coordSys.width,
    //         height: params.coordSys.height
    //       })
    //     },
    //     style: api.style({
    //       fill: color,
    //       stroke: echarts.color.lift(color)
    //     })
    //   }
    // },
    /**
     * 画echarts
     */
    drawChart () {
      var echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('main'))
      // var convertData = this.getconvertData(this.echartsDatas)
      // console.log('convertdata', convertData)
      // 指定图表的配置项和数据
      var option = {
        backgroundColor: 'transparent',
        title: {
          text: '新型肺炎疫情实时动态',
          subtext: 'Data from PM25.in',
          sublink: 'http://www.pm25.in',
          left: 'center',
          textStyle: {
            color: '#333333'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          // 首次呈现的地理位置
          center: [104.114129, 37.550339],
          // zoom：放大倍数
          zoom: 5,
          // roam：是否可以拖动地图
          roam: true,
          mapStyle: {
            styleJson: [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#044161'
                }
              },
              {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                  'color': '#004981'
                }
              },
              // 我国边界线颜色
              {
                'featureType': 'boundary',
                'elementType': 'geometry',
                'stylers': {
                  'color': 'fff'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#004981'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#005b96',
                  'lightness': 1
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#004981'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#00508b'
                }
              },
              {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                  'color': '#056197',
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              },
              // 所有国边界线
              {
                'featureType': 'boundary',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#029fd4'
                }
              },
              {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                  'color': '#1a5787'
                }
              },
              {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }
            ]
          }
        },
        series: [
          {
            name: '确诊人数',
            // type：圆点的样式
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            // 0-6 即为排名前六
            data: this.echartsDatas.sort(function (a, b) {
              return b.value - a.value
            }).slice(0, 35),
            symbolSize: function (val) {
              return val[2] / 10
            },
            // 小圆点是否有“范围圈”
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            // 控制圆点在 hover 的时候是否变大
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            // 大圆点颜色
            // shadowcolor 圆点阴影颜色
            itemStyle: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#fff'
            },
            zlevel: 1
          }
          // {
          //   type: 'custom',
          //   coordinateSystem: 'bmap',
          //   renderItem: this.renderItem,
          //   itemStyle: {
          //     opacity: 0.5
          //   },
          //   animation: false,
          //   silent: true,
          //   echartsDatas: [0],
          //   z: -10
          // }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
</style>
