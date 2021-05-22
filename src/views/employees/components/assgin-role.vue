<template>
  <el-dialog title="分配角色" :visible="ShowRoleDialog" @close="isCancel">
    <el-checkbox-group v-model="rolesId">
      <!-- 默认情况写label是值也是显示的文本 有差值表达是label就是值 -->
    <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
  </el-checkbox-group>
  <el-row type="flex" justify="center" slot="footer">
    <el-col :span="6">
      <el-button @click="isCancel">取消</el-button>
      <el-button type="primary" @click="isOk" :loading="btnLoading">确定</el-button>
    </el-col>
  </el-row>
  </el-dialog>
</template>

<script>
import { getRole } from '@/api/setting'
import { getBaseUserInfo } from '@/api/user'
import { assginRoles } from '@/api/employees'
export default {
  name: 'assginRoles',
  components: {},
  props: {
    ShowRoleDialog: {
      type: Boolean,
      isRequired: true,
      default: false
    },
    userId: {
      type: String,
      isRequired: true
    }
  },
  data () {
    return {
      list: [], // 获取角色的列表
      rolesId: [], // 存储放置rolesId的列表
      btnLoading: false // 确定按钮的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化获取角色列表
    this.getRole()
  },
  mounted () {},
  methods: {
   async getRole () {
    const { rows } = await getRole({page: 1,pagesize:20}) // 这里没有一次性获取所有角色列表的接口我们设置为20条，因为角色一般不会太多，这样就获取了全部的角色列表
    this.list = rows
    console.log(this.list)
    },
    // 取消按钮
    isCancel () {
       // 清空数据(为了稳妥还是清空数据)
      this.rolesId = []
      this.$emit('update:ShowRoleDialog', false)
    },
    // 获取员工基本信息 注意这里不能直接使用prop中的userId 因为prop是异步的 一上来使用的话拿不到id获取不到数据
    // 所以我们采用父组件调用子组件的方法这样就能获取到id得到数据
 async getBaseUserInfo (id) {
  const { roleIds } = await getBaseUserInfo(id)
  // 将数据放在rolesId实现数据回写
  this.rolesId = roleIds
  },
  // 给角色分配权限
  async isOk () {
    this.btnLoading = true
    // 这个时候prop中是有userId的
   await assginRoles({id: this.userId, roleIds: this.rolesId})
    // 通知父组件关闭弹窗
  //  this.$parent.showRole = false
  this.$emit('update:ShowRoleDialog', false) // 关闭弹窗会触发close事件，close事件会触发isCansle事件清空数据
   this.btnLoading = false
   this.$message.success('分配权限成功')
  }
  }
}
</script>

<style scoped lang="less"></style>