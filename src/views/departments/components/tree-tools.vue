<template>
    <el-row slot-scope="{treeNode}" type="flex" justify="space-between" align="middle" style="height:40px;fontSize:14px;width:100%;">
          <el-col>
            <span>{{treeNode.name}}</span>
          </el-col>
          <el-col :span="4">
            <el-row justify="end" type="flex">
              <el-col>{{treeNode.manager}}</el-col>
              <el-col>
                <el-dropdown  @command="deptClick">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="addDept">添加子部门</el-dropdown-item>
                      <el-dropdown-item command="editDept" v-if="!isRoot">编辑部门</el-dropdown-item>
                      <el-dropdown-item command="delDept" v-if="!isRoot">删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
</template>

<script>
import { delDepartment, getDetialDept} from '@/api/departments'
export default {
  name: 'treeTools',
  components: {},
  props: {
    treeNode: {
      isRequired: true,
      type: Object
    },
    // 判断是不是根节点是不需要删除部门和编辑部门的（组件定制）
    isRoot: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 当点击添加，编辑，删除时所触发的函数(根据该回调函数判断时触发的哪种事件进行不同的逻辑)
    async deptClick (type) {
      if (type === 'editDept') {
        // 执行编辑操作
        // 自定义通知父组件改变弹出的状态(显示弹出) 将当前点击的节点数据传递给父组件存储
        this.$emit('editDept',this.treeNode)
      } else if (type === 'delDept') {
        // 执行删除操作
        // 提示用户删除
        this.$confirm(`确定要删除${this.treeNode.name}这个部门吗?`,'删除提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          // 调用接口(成功后)返回一个promise对象可以继续.then进行下一步操作
         return delDepartment(this.treeNode.id).then(()=>{
          // 刷新获取列表
          // getDepartments() 这样调用是不会刷新的因为数据是父组件传递过来的我们应该通知父组件去更新数据
          this.$emit('updateDept') // 触发自定义事件
          this.$message.success('删除部门成功') // 删除成功提示
         })
        })
      } else {
        // 执行添加操作
        // 自定义通知父组件改变弹出的状态(显示弹出) 将当前点击的节点数据传递给父组件存储
        this.$emit('addDept',this.treeNode)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>