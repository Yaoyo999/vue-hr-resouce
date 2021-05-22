<template>
  <div>
    <!-- 头部 -->
    <el-row type="flex" justify="end">
      <!-- 需要产生一个数据里面是前后五年的数组 -->
        <el-select
        @change="changeDate"
        size="small" 
        style="width:90px" 
        v-model="currentYear"
        >
          <el-option v-for="item in yearList" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        <el-select
        @change="changeDate" 
        size="small" 
        style="width:90px;margin-left:10px;" 
        v-model="currentMonth"
        >
          <!-- 循环产生月数 -->
          <el-option  v-for="item in 12" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
    </el-row>
    <el-calendar v-model="newDate">
      <!-- 自定义日历组件 -->
      <template slot="dateCell" slot-scope="{ date, data }">
        <!-- date为当前日期对象 -->
        <!-- <span>{{date}}</span> -->
        <!-- data{ type, isSelected, day}，type 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 yyyy-MM-dd 我们可以格式化为自己想要的-->
        <!-- <span>{{data}}</span> -->
        <!-- div.date-content就是每一个单元格 -->
        <div class="date-content">
           <span class="text">{{ data.day | filterDay }}</span>
           <!-- isWeek函数判断是不是周末，传入一个日期对象 -->
          <span v-if="isWeek(date)" class="rest">休</span>
        </div> 
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 该组件需要接受一个日期对象如果没有传则默认值为但当前时间，是一个对象，所有默认值需要使用函数返回，对象，数组等这些
    stateTime: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      // 当前的月数双向数据绑定v-model
      currentMonth: null, // 默认值
      currentYear: null, // 默认值
      yearList: [], // 年份列表
      newDate: null // 选择后的时间
    }
  },
  computed: {},
  watch: {},
  filters: {
    // value值为要格式化的数据也就是 | 前的数据
    filterDay (value) {
      // 字符串split方法可以按照指定的符号分割为字符串数组然后我们只取月份
      return value.split('-')[2].startsWith(0) ? value.split('-')[2].substr(1) : value.split('-')[2]
    }
  },
  created () {
    this.currentMonth = this.stateTime.getMonth() + 1
    this.currentYear = this.stateTime.getFullYear()
    this.currentDate = this.stateTime.getDate()
    // 初始化的时候调用，不管传没有传值都可以
    this.newDate = new Date(`${this.currentYear}/${this.currentMonth}/${this.currentDate}`)
    this.reduceYears()
  },
  mounted () {},
  methods: {
    reduceYears () {
      // 产生一个数组 Array.from()可以生成你想要得值，第一个参数接收一个数组，第二个参数为一个回调函数（值和索引）
    this.yearList =  Array.from(Array(11),  (value, index) => {
        // console.log(value) value值为传入数组的值 return的值为新数组的值
        return  this.currentYear + index - 5
      })
    },
    // 当月份或者年份发生变化的时候重新计算生成日期对象
    changeDate () {
      const changeYear = this.currentYear
      const changeMonth = this.currentMonth
      // 生成日期对象
      this.newDate = new Date(`${changeYear}/${changeMonth}/1`)
    },
    //是否为周末
    isWeek(date) {
      // 通过日期对象的getDay判断周一到周日分别对应 1,2,3,4,5,6,0通过判断是不是6,0来返回true还是false
      return ( date.getDay() === 6 || date.getDay() === 0) ? true : false
    } 
  }
}
</script>

<style scoped>
::v-deep .el-calendar-day {
  height:  auto;
 }
::v-deep .el-calendar-table__row td,::v-deep.el-calendar-table tr td:first-child, ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
/* ::v-deep .el-calendar-day {
   height: 40px;
 } */
.date-content {
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
::v-deep .el-calendar__header {
   display: none
 }
</style>