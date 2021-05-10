<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card tree-card">
        <!--头部结构 -->
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
        <!-- 树形内容 -->
        <el-tree :data="departs" :props="defaultProps" @node-click="handleNodeClick">
         <tree-tools slot-scope="{ data }" :treeNode="data"></tree-tools>
        </el-tree>
      </el-card> 
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  name: '',
  components: {
    TreeTools
  },
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
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
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