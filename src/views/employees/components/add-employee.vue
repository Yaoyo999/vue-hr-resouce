<template>
  <el-dialog
  title="新增员工"
  :visible="employeeDialog"
  @close="isCancel"
>
  <el-form label-width="120px" :model="dataForm" :rules="rulesForm" ref="employeeForm">
    <el-form-item label="姓名" prop="username"><el-input style="width:50%" placeholder="请填写姓名" v-model="dataForm.username"></el-input></el-form-item>
    <el-form-item label="手机" prop="mobile"><el-input style="width:50%" placeholder="请填写手机号" v-model="dataForm.mobile"></el-input></el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry"><el-date-picker v-model="dataForm.timeOfEntry" style="width:50%" placeholder="请填写入职时间"></el-date-picker></el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="dataForm.formOfEmployment" style="width:50%" placeholder="请填写聘用形式">
        <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
      </el-select>
      </el-form-item>
    <el-form-item label="工号" prop="workNumber"><el-input v-model="dataForm.workNumber" style="width:50%" placeholder="请填写工号"></el-input></el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="dataForm.departmentName" style="width:50%" placeholder="请填写部门" @focus="getDepts"></el-input>
      <el-tree 
      :data="treeDepts" 
      :props="{label: 'name'}" 
      v-if="isTreeData" 
      v-loading="loading" 
      :default-expand-all="true"
      @node-click="checkDept"
      ></el-tree>
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime"><el-date-picker v-model="dataForm.correctionTime" style="width:50%" placeholder="请填写转正时间"></el-date-picker></el-form-item>
  </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-button @click="isCancel">取 消</el-button>
        <el-button type="primary" @click="isOK" :loading="btnLoading">确 定</el-button>
    </el-col>
    </el-row>
   
</el-dialog>
</template>

<script>
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
import { transListToTree } from '@/utils/index'
import EmployeeEnum from '@/api/constant/employees'
export default {
  name: 'employeeDialog',
  data () {
    return {
      EmployeeEnum,
      dataForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime:''
      },
      // 表单校验规则
      rulesForm: {
        username: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 1, max: 4, message: '长度在1-4个字符', trigger: 'blur' },
        ],
        mobile: [
           { required: true, message: '请填写手机', trigger: 'blur' },
           {pattern: /^1[3|5|7|8|9]\d{9}/, message: '请填写正确的手机格式',trigger: 'blur'}
        ],
        formOfEmployment: [
          { required: true, message: '请填写入职时间', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '请填写工号', trigger: 'blur' }
        ],
        // 因为我们在获取焦点的时候加载数据显示在el-tree上当我们去点击el-tree选择节点的时候已经失去焦点如果采用blur就已经校验完，
        // 所以这里因该采取change
        departmentName: [
          { required: true, message: '请填写部门', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请填写入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请填写转正时间', trigger: 'blur' }
        ]
      },
      // 树形化后的部门数据
      treeDepts: [],
      isTreeData: false, // 是否有树形数据
      loading: false, // 数据加载状态
      btnLoading: false // 确定按钮loading
    }
  },
    props: {
    employeeDialog: {
      default: false,
      type: Boolean
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
   async isOK () {
      try {
       await this.$refs.employeeForm.validate()
      //  通过校验执行这里
      // 发请求，添加员工
      this.btnLoading = true
      await addEmployee(this.dataForm)
      this.btnLoading = false
      //调用父组件获取员工数据列表
      this.$parent.getEmployee()
      // 提示消息
      this.$message.success('添加员工成功')
      } catch (error) {
        console.log(error)
      } finally {
      // 关闭弹出层
      this.$emit('update:employeeDialog', false)  // 关闭弹层的时候默认会触发close事件所以我们只需要取消按钮处统一做首尾工作
        // 关闭弹层
        this.loading = false
      }
    },
    // 获取部门信息并且树形化数据
   async getDepts () {
     this.loading = true
    // 获取数据
   const { depts } = await getDepartments()
    // 转化数据并且存在数据中
   this.treeDepts = transListToTree(depts, '')
   this.loading = false
   this.isTreeData = true
    },
    // el-tree点击子节点时
    checkDept (dept) {
      //该函数 接收三个参数 console.log(arguments)
      // 将选择节点的值赋值给部门input
      this.dataForm.departmentName = dept.name
      // 关闭el-tree组件
      this.isTreeData = false
    },
    // 取消按钮
    isCancel() {
      // 关闭弹层
      this.$parent.employeeDialog = false
      this.dataForm = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime:''
      }
      // 清空校验规则
      this.$refs.employeeForm.resetFields()
    }
  }
}
</script>

<style scoped lang="less"></style>