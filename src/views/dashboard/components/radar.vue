<template>
<!-- echarts图标必须要指定宽高 -->
  <div id="myDiv" ref="myEcharts"></div>
</template>

<script>
// 引入echarts
// import * as echarts from 'echarts'
// 完成加载过程
// var echarts = require('echarts')
import { LegendComponent } from 'echarts/components';
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 在这儿获取dom,这儿dom才能获取到()获取dom
    var myChart = echarts.init(this.$refs.myEcharts)
    echarts.use([LegendComponent]);
    // 准备数据
    var option = {
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
           name: {	
          // textStyle: {
          //   color: '#fff',
          //   backgroundColor: '#999',
          //   borderRadius: 3,
          //   padding: [3, 5]
          // }
        },
        // 每个区域的最高值
        indicator: [
            { name: '工作效率', max: 100},
            { name: '考勤', max: 100},
            { name: '积极性', max: 100},
            { name: '帮助同事', max: 100},
            { name: '自主学习', max: 100},
            { name: '正确率', max: 100}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: '李四'
          }
        ]
    }]
}
 // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  },
  methods: {}
}
</script>

<style scoped lang="scss">
#myDiv {
  width: 500px;
  height: 500px;
}
</style>