<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
         <el-tabs v-model="activeName">
            <el-tab-pane label="角色管理" name="first">
              <el-row style="height:60px"><el-button type="primary" size="small" @click="addRole">+新增角色</el-button></el-row>
              <!-- 表格数据 -->
                <el-table
                    border
                    stripe
                    :data="list"
                    style="width: 100%">
                    <el-table-column
                      align="center"
                      width="120"
                      type="index"
                      label="序号"
                      >
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="name"
                      label="角色名称"
                      width="240"
                    >
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="description"
                      label="描述"
                      >
                   </el-table-column>
                   <el-table-column
                      align="center"
                      prop="address"
                      label="操作"
                    >
                    <!-- 结构出每个数据的rows对象 -->
                    <template slot-scope="{ row }"> 
                      <el-button size="small" type="success" @click="assginPermission(row.id)">分配权限</el-button>
                      <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                      <el-button size="small" type="danger" @click="delteRole(row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页器 -->
              <el-row type="flex" justify="center" align="middle" style="height: 60px">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="page.pagesize"
                    background
                    @current-change="changePage"
                  >
                </el-pagination>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="公司信息" name="second">
               <el-alert
                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                type="info"
                show-icon
                :closable="false"
                >
            </el-alert>
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input  disabled style="width:400px" v-model="companyForm.name"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input  disabled style="width:400px"  v-model="companyForm.companyAddress"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input  disabled style="width:400px" v-model="companyForm.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input  disabled style="width:400px"  v-model="companyForm.remarks" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-form>
            </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- diag弹窗-->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      @close="isCancel"
    >
    <el-form label-width="120px" :model="roleForm" :rules="roleRules" ref="diagForm">
      <el-form-item label="角色名称" prop="name"><el-input v-model="roleForm.name"></el-input></el-form-item>
      <el-form-item label="角色描述" prop="description"><el-input v-model="roleForm.description"></el-input></el-form-item>
    </el-form>
    <!-- 底部 -->
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="isCancel">取消</el-button>
        <el-button size="small" type="primary" @click="isOK">确定</el-button>
      </el-col>
    </el-row>
</el-dialog>
<!-- 分配权限的弹窗 -->
<el-dialog :visible="showAssginDiag" title="分配权限" @close="isCancelPerm">
  <el-tree
  ref="permTree"
  :props="defaultProps" 
  :data="permList"
  :show-checkbox="true"
  :default-expand-all="true"
  :check-strictly="true"
  node-key="id"
  :default-checked-keys="permIds"
  >
  </el-tree>
  <el-row type="flex" justify="center" slot="footer">
    <el-col :span="6">
      <el-button size="small" @click="isCancelPerm">取消</el-button>
      <el-button size="small" type="primary" @click="isSurePerm">确定</el-button>
    </el-col>
  </el-row>
</el-dialog>
  </div>
</template>

<script>
import { getRole, addRole, getDetialRole, updateRole, delteRole , getCompanyInfo, assginRolePermission } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  name: 'settingIndex',
  components: {},
  props: {},
  data () {
    return {
      activeName: 'first',
      total: 0, // 总条数
      list: [], // 角色列表
      page: {
        pagesize: 5, // 每页条数
        page: 1
      },
      dialogVisible: false, // 弹出层
      roleForm: { // 角色表单
        name: '',
        description: ''
      },
      companyForm: { // 公司信息表单（只读）
        name: '',
        mailbox: '',
        companyAddress: '',
        remarks: ''
      },
      roleRules: { // 表单校验规则
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写角色描述', trigger: 'blur' }
        ]
      },
      showAssginDiag: false, // 权限分配的弹窗
      permList: [], // 权限点的列表
      permIds: [], // 权限点数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId: '' // 角色id
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  created () {
    this.getRole() // 初始化获取角色列表
    this.getCompanyInfo() // 初始化获取公司信息
  },
  mounted () {},
  methods: {
    // 获取角色列表
   async getRole() {
   const { rows, total } =  await getRole(this.page)
   this.list = rows
   this.total = total
  },
  // 获取公司信息
  async getCompanyInfo() {
    this.companyForm = await getCompanyInfo(this.companyId)
  },
  changePage(page) {
    this.page.page = page
    // 获取新页的数据
    this.getRole()
  },
  // 新增角色
 addRole() {
    // 展示弹层
    this.dialogVisible = true
  },
  // 编辑角色
  async editRole (id) {
    // 获取数据，数据回写展示
  this.roleForm= await getDetialRole(id)
  // 展示弹层
  this.dialogVisible = true
  
  },
  async isOK () {
    try {
    // 手动校验，通过发送请求，不通过阻止 (第二种方式，如果validator方法中不传回调函数则是一个promise对象)
  await this.$refs.diagForm.validate()
    // 校验通过执行这里
    if (this.roleForm.id) {
      // 有id值说明是编辑角色
    await updateRole(this.roleForm)
    } else {
     // 发请求添加数据
  await addRole(this.roleForm)
    }
  // 刷新数据
  this.getRole()
  // 清空表单
  this.roleForm = {
    name: '',
    description: ''
  }
  this.$refs.diagForm.resetFields()
// 关闭弹层
this.dialogVisible = false
this.$message.success('操作成功')
  } catch (error) {
    // 不通过执行这里
    console.log('不通过')
    this.$message.error('添加失败')
  }
  // 关闭弹窗
  this.dialogVisible = false
},
// 取消按钮
isCancel () {
  // 关闭弹层(弹窗关闭会触发close事件)
  this.dialogVisible = false,
  // 清空表单
  this.roleForm = {
    name: '',
    description: '',
  }
  // 清楚校验规则数据
  this.$refs.diagForm.resetFields()
},
// 删除角色
 delteRole (row) {
  this.$confirm(`确定要删除吗${row.name}吗?`,'删除提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async ()=>{
    await delteRole(row.id)
    // 刷新数据
   await this.getRole()
      // 执行成功
  this.$message.success('删除成功')
  }).catch(error => {
    console.log(error)
  })
},

async assginPermission (id) {
  // 弹层打开是获取所有的权限点(保证获取到最新的数据)
 this.permList = transListToTree(await getPermissionList(), '0')
 const { permIds } = await getDetialRole(id)
  // 存储id后续提交试用
  this.roleId = id
 // 通过el-tree的属性实现数据回写
 this.permIds = permIds
 this.showAssginDiag = true
},
  // 取消分配权限
  isCancelPerm() {
  this.showAssginDiag = false
  // 清空数据
  this.permIds = []
  },
  // 确定分配权限
  async isSurePerm() {
  //注意el-tree是单向数据流的 调用el-tree组件的方法获取选择的节点数据
  //  console.log(this.$refs.permTree.getCheckedKeys())
  this.permIds = this.$refs.permTree.getCheckedKeys()
  await assginRolePermission({id: this.roleId, permIds: this.permIds})
  this.showAssginDiag = false
  this.$message.success('分配角色成功')
}
}
}
</script>

<style scoped lang="less"></style>