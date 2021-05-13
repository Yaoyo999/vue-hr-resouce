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
          prop="timeOfEntry"
          label="入职时间"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="enableState"
          label="账户状态"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="address"
          label="操作"
          sortable=""
          fixed="right" width="280"
          >
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
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
import { getEmployee } from '@/api/employees'
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
      total: 0  // 总条数
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
    }
  }
}
</script>

<style scoped lang="less"></style>