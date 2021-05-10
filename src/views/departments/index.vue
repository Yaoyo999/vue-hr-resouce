<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card tree-card">
        <!--头部结构 -->
        <el-row type="flex" justify="space-between" align="middle" style="height:40px;fontSize:14px;">
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row justify="end" type="flex">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 树形内容 -->
        <el-tree :data="departs" :props="defaultProps" @node-click="handleNodeClick">
           <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height:40px;fontSize:14px;width:100%;">
          <el-col>
            <span>{{data.name}}</span>
          </el-col>
          <el-col :span="4">
            <el-row justify="end" type="flex">
              <el-col>{{data.manager}}</el-col>
              <el-col>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        </el-tree>
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
    return {
     defaultProps: {
        children: 'children',
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>