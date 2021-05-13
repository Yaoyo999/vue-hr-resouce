<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 自定义插槽组件 -->
      <page-tools :isShowBefore="true">
        <!-- 前面的内容 -->
        <span slot="beforeSlot">共找到{{total}}条员工信息</span>
        <!-- 后面的内容 两种插槽的使用都可以-->
        <template v-slot:afterSlot>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 数据列表 -->
      <el-card>
        <el-table
          border
          style="width: 100%"
          :data="list"
          v-loading="loading"
          >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          sortable=""
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          sortable=""
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="workNumber"
          label="工号"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="formOfEmployment"
          :formatter="formatterForm"
          label="聘用形式"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="departmentName"
          label="部门"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          label="入职时间"
          sortable=""
          >
          <!-- 过滤器格式化时间 要格式化的数据 | 过滤器函数 -->
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
          </el-table-column>
           <el-table-column
           align="center"
          prop="enableState"
          label="账户状态"
          sortable=""
          >
          <template slot-scope="{ row }">
            <!-- 这里的强制绑定value值和v-model是一个道理但v-model中不能进行js运算只能绑定数据 -->
            <el-switch
              :value="row.enableState === 1"
              >
            </el-switch>
          </template>
        </el-table-column>
           <el-table-column
           align="center"
          prop="address"
          label="操作"
          sortable=""
          fixed="right" width="280"
          >
          <template slot-scope="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            background
            :page-size="dataForm.size"
            :current-page="dataForm.page"
            @current-change="changePage"
            >
      </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployee, deleteEmployee } from '@/api/employees'
// 导入枚举数据(注意这里是引入的数据不能直接使用，模板上能直接使用的数据有data,prop,computed里的数据)
import EmployeeEnum from '@/api/constant/employees'
export default {
  name: 'employeeIndex',
  components: {},
  props: {},
  data () {
    return {
      list: [], // 员工数据列表
      dataForm: {
        page: 1, // 第一页
        size: 10 // 每页十条
      },
      total: 0,  // 总条数
      EmployeeEnum // 枚举的数据es6写法
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化员工列表
    this.getEmployee()
  },
  mounted () {},
  methods: {
    // 获取员工列表
   async getEmployee() {
    // loading加载状态
    this.loading = true
    const { total, rows } =  await getEmployee(this.dataForm)
    // 赋值数据展示
    this.total = total
    this.list = rows
    // 关闭加载状态
    this.loading = false
    },
    // 改变页码获取数据
    changePage(page) {
      // 新的页码赋值给page
      this.dataForm.page = page
      // 重新获取数据
      this.getEmployee()
    },
    // 处理聘用形式
    formatterForm(row, column, cellValue, index) {
      // console.log(arguments)
      // return 1 return什么当前的数据列就显示什么 find方法返回的是满足条件的元素(对象)
     const obj = this.EmployeeEnum.hireType.find(item => item.id === cellValue)
      // return obj.id === 1 ? '正式' : '非正式' 如果没有找到obj那么obj.id 就相当于undefined.id 报错
      return obj ? obj.value : '未知'
    },
    // 删除员工
    deleteEmployee(row) {
      this.$confirm(`确定删除${row.username}吗?`, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async()=>{
          await deleteEmployee(row.id)
          // 刷新获取新的列表
          this.getEmployee()
          // 提示
          this.$message.success('删除成功')
      })
    }
  }
}
</script>

<style scoped lang="less"></style>