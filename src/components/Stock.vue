<template>
  <div id="main" style="height:700px"></div>
</template>

<script>
export default {
  data () {
    return {
      rawData: null,
      stockName: null
    }
  },
  created () {
    this.getInfo()
    // this.drawChart()
  },
  mounted () {
    // this.drawChart()
  },
  methods: {
    getInfo () {
      const url = `/stockapi/get`
      this.$http.get(url).then(res => {
        this.rawData = res.data
        this.stockName = res.data[0]
        console.log('res:', res)
        this.drawChart()
      }).catch(err => {
        console.log(err)
      })
    },
    drawChart () {
      var echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('main'))
      // console.log('rawData:', this.rawData)

      var dates = this.rawData.map((item) => {
        return item[0]
      })

      // 开盘、收盘、最低、最高
      var data = this.rawData.map((item) => {
        return [+item[4], +item[1], +item[3], +item[2]]
      })

      var option = {
        title: {
          text: this.stockName,
          left: 50,
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#21202D',
        legend: {
          data: ['日K'],
          inactiveColor: '#777',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          // 鼠标移上去后呈现的竖直线
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          // 距离底部
          bottom: 80
        },
        dataZoom: [{
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          // 底部缩略图的背景色和线条色
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }],
        animation: false,
        series: [
          {
            type: 'candlestick',
            name: '日K',
            data: data,
            itemStyle: {
              color: '#FD1050',
              color0: '#0CF49B',
              // K线上涨的红色线
              borderColor: '#FD1050',
              // K线下跌的绿色线
              borderColor0: '#0CF49B'
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
</style>
