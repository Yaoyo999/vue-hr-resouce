<template>
    <el-row slot-scope="{treeNode}" type="flex" justify="space-between" align="middle" style="height:40px;fontSize:14px;width:100%;">
          <el-col>
            <span>{{treeNode.name}}</span>
          </el-col>
          <el-col :span="4">
            <el-row justify="end" type="flex">
              <el-col>{{treeNode.manager}}</el-col>
              <el-col>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
                      <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
</template>

<script>
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
  methods: {}
}
</script>

<style scoped lang="less"></style>