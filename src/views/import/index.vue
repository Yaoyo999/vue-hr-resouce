<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'importIndex',
  components: {},
  props: {},
  data () {
    return {
      // 为了让这个页面可以服务更多的导入功能，我们可以在页面中用参数来判断，是否是导入员工
      type: this.$route.query.type
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 导入excel数据
    async success ({header, results}) {
      // 因为这里的导入的数据是中文的格式，所以我们需要把相应的字段变为英文，然后调用接口发送请求
       const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        // 将每个数据对象的中文名换成英文名
        const arr = []
        results.forEach(item => {
          var userInfo = {}
          Object.keys(item).forEach(key => {
            // 处理excel中日期格式的问题
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库 new Date()
            } else {
              userInfo[userRelations[key]] = item[key]
            }
          })
          arr.push(userInfo)
        })
        // 注意这里的接口函数接收的是一个数据，接口文档没有说明
        await importEmployee(arr)
        // 返回员工管理页面
        this.$router.back()
    },
    // 当excel中有日期格式的时候，实际转化的值为一个数字，我们需要一个方法进行转化
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped lang="less"></style>