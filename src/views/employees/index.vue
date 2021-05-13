<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 自定义插槽组件 -->
      <page-tools :isShowBefore="true">
        <!-- 前面的内容 -->
        <span slot="beforeSlot">共找到0条员工信息</span>
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
          style="width: 100%">
        <el-table-column
          prop="name"
          label="序号"
          sortable=""
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable=""
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="工号"
          sortable=""
          >
        </el-table-column>
           <el-table-column
          prop="address"
          label="聘用形式"
          sortable=""
          >
        </el-table-column>
           <el-table-column
          prop="address"
          label="部门"
          sortable=""
          >
        </el-table-column>
           <el-table-column
          prop="address"
          label="入职时间"
          sortable=""
          >
        </el-table-column>
           <el-table-column
          prop="address"
          label="账户状态"
          sortable=""
          >
        </el-table-column>
           <el-table-column
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
            :total="50"
            background
            >
      </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

<script>
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
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>