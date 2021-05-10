<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card tree-card">
        <!--头部结构 -->
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
        <!-- 树形内容 -->
        <el-tree :data="departs" :props="defaultProps">
         <tree-tools slot-scope="{ data }" :treeNode="data"></tree-tools>
        </el-tree>
      </el-card> 
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTree } from '@/utils/index'
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
      company: {},
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartments()
  },
  mounted () {},
  methods: {
   async getDepartments(){
    const result = await getDepartments()
    console.log(result)
    // 获取到的公司信息更新到data中
    this.company = {name: result.companyName, manager: '负责人'}
    // 获取到的组织结构更新到data中 获取到的数据是一条一条的 我们观察发现pid没有值的是一级节点，pid和id相等的是它的子节点
    this.departs = transListToTree(result.depts, '')
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>