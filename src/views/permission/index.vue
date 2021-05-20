<template>
  <div class="dashboard-container">
    <div class="app-container">
       <page-tools>
         <el-button slot="afterSlot" type="primary" size="small" @click="assginPermission(1, '0')">添加权限</el-button>
       </page-tools>
       <el-card>
         <!-- 如果需要树表， 需要给**el-table**配置**row-key**属性  id -->
         <el-table border :data="list" row-key="id">
           <el-table-column align="center" label="名称" prop="name"></el-table-column>
           <el-table-column align="center" label="标识" prop="code"></el-table-column>
           <el-table-column align="center" label="描述" prop="description"></el-table-column>
           <el-table-column align="center" label="操作">
             <template slot-scope="{ row }">
               <!-- 二级节点只有查看的权限没有添加的权限 type=1的是一级节点，type=2的是二级节点 -->
               <el-button type="text" v-if="row.type === 1" @click="assginPermission(2, row.id)">添加</el-button>
               <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
               <el-button type="text" @click="deltePermission(row.id)">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
       </el-card>
    </div>
    <!-- 新增，编辑的弹层 -->
    <el-dialog :title="`${showTitle}权限点`" :visible="showPerssDiag" @close="isCancel">
      <el-form label-width="120px" :model="formData" :rules="formRules" ref="perForm">
        <el-form-item label="权限名称" prop="name">
          <el-input  style="width:90%" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input  style="width:90%" v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input  style="width:90%" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <!-- 这里绑定的不是boolean值而是字符串  active-value代表打开是的值  inactive-value代表关闭时候的值 swith要v-model后才能使用-->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="isCancel">取消</el-button>
            <el-button type="primary" size="small" @click="isOK">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, deletePermission, getPermissionDetail, updatePermission} from '@/api/permission'
import { transListToTree } from '@/utils/index'
export default {
  name: 'permissionIndex',
  components: {},
  props: {},
  data () {
    return {
      list: [], // 权限列表
      formData: { // 表单数据
        enVisible: '1', // 是否开启 1代表开启 0代表关闭
        name: '',
        code: '',
        description: '',
        type: null, // 点击按钮的时候传过来
        pid: '' // 点击的时候传过来
      },
      formRules: {
        name: [
          { required: 'true', message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: 'true', message: '权限标识不能为空', trigger: 'blur' }
        ]

      },
      showPerssDiag: false
    }
  },
  computed: {
    // 弹出层的标题
    showTitle () {
      return this.formData.id ? '编辑权限' : '添加权限'
    }
  },
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
    },
      // 添加权限，两种可能，1是添加一级节点，二是添加二级节点
    assginPermission (type, id) {
    //  传递过来type 1 或 2 id为添加到哪个节点下 '0' 代表一级节点 row.id 添加到该节点下
     this.showPerssDiag = true
    //  准备数据
     this.formData.type = type
     this.formData.pid = id
    },
    isOK () {
      // 手动检验
      this.$refs.perForm.validate().then(async ()=> {
        if (this.formData.id) {
          return await updatePermission(this.formData)
        }
         //  发送请求 成功的回调执行后返回进入下一个.then
      return await addPermission(this.formData)
      }).then(()=> {
      this.$message.success('操作成功')
      // 关闭弹窗
      this.showPerssDiag = false
      // 刷新数据
      this.getPermissionList()
      })
    },
    isCancel () {
      // 清除表单数据
      this.formData = {
        enVisible: '1', // 是否开启 1代表开启 0代表关闭
        name: '',
        code: '',
        description: '',
        type: null, // 点击按钮的时候传过来
        pid: '' // 点击的时候传过来
      }
      // 清除表单校验规则
      this.$refs.perForm.resetFields()
      // 关闭弹窗
      this.showPerssDiag = false
    },
    // 删除权限
   async deltePermission(id) {
     this.$confirm('确定要删除改权限吗', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
     }).then(async () => {
      await deletePermission(id)
      this.$message.success('删除成功')
      // 刷新数据
      this.getPermissionList()
     })
    },
    // 编辑权限
    async editPermission(id) {
      // 获取详情数据实现数据回写
      this.formData = await getPermissionDetail(id)
      // 展示弹窗
      this.showPerssDiag = true
    }
  }
}
</script>

<style scoped lang="less"></style>