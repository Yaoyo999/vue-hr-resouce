<template>
  <div class="dashboard-container">
    <div class="app-container">
       <page-tools>
         <el-button slot="afterSlot" type="primary" size="small">添加权限</el-button>
       </page-tools>
       <el-card>
         <el-table border :data="list" row-key="id">
           <el-table-column align="center" label="名称" prop="name"></el-table-column>
           <el-table-column align="center" label="标识" prop="code"></el-table-column>
           <el-table-column align="center" label="描述" prop="description"></el-table-column>
           <el-table-column align="center" label="操作">
             <template slot-scope="{ row }">
               <!-- 二级节点只有查看的权限没有添加的权限 type=1的是一级节点，type=2的是二级节点 -->
               <el-button type="text" v-if="row.type === 1">添加</el-button>
               <el-button type="text">编辑</el-button>
               <el-button type="text">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
       </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils/index'
export default {
  name: 'permissionIndex',
  components: {},
  props: {},
  data () {
    return {
      list: [] // 权限列表
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化获取权限列表
    this.getPermissionList()
  },
  mounted () {},
  methods: {
    // 获取所有的权限列表
   async getPermissionList() {
   this.list = transListToTree(await getPermissionList(), '0')
    }
  }
}
</script>

<style scoped lang="less"></style>