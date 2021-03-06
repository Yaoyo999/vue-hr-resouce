<template>
  <el-dialog
  :title="titleName"
  width="30%"
  :visible="departDiag"
  @close="isCancel" 
  >
  <!-- 当diglog点击×和确定按钮时默认会触发diglog的close事件 -->
  <el-form label-width="120px" :model="deptData" :rules="deptRules" ref="deptForm">
    <el-form-item label="部门名称" prop="name">
    <el-input style="width:80%" placeholder="请输入部门名称,1-50个字符" v-model="deptData.name"></el-input>
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
    <el-input style="width:80%" placeholder="请输入部门编码,1-50个字符" v-model="deptData.code"></el-input>
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
    <el-select style="width:80%" placeholder="请选择" v-model="deptData.manager" @focus="getEasyEmployee">
      <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="部门描述" prop="introduce">
    <el-input style="width:80%" placeholder="请输入部门描述1-300个字符" v-model="deptData.introduce"></el-input>
    </el-form-item>
  </el-form>
  <el-row type="flex" justify="center" slot="footer">
    <el-col :span="10">
    <el-button @click="isCancel">取消</el-button>
    <el-button type="primary" @click="isOk">确定</el-button>
    </el-col>
  </el-row>
</el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDetialDept, eidtDepartment} from '@/api/departments'
import { getEasyEmployee } from '@/api/employees'
export default {
  name: 'AddDept',
  components: {},
  props: {
    departDiag: {
      default: false,
      type: Boolean
    },
    treeNode: {
      isRequired: true,
      type: Object
    }
  },
  data () {
    // 定义自定义校验函数
    const checkNameRepeat = async (rule, value, callback) => {
      // 我们需要判断同级部门下是否有与value相同的名字，有校验不通过，没有就校验通过
      // 我们应该在这儿调用获取部门的数据，因为要保证数据是最新的
    const { depts } = await getDepartments()
    // 这里我们需要当前操作部门的信息，只有tree-tools里面有我们需要在弹出显示的时候传递给父组件（父组件存到自己的data中）
    // ，然后传递给当前组件。
    let isRepeat = false
    if (this.deptData.id) {
      // id有值说明数据库中已经存在这一节点，由于我们是修改，所以我们应该排除掉自己 this.treeNode === this.deptData
       isRepeat = depts.filter(item => item.pid === this.deptData.pid && item.id !== this.treeNode.id).some(item => item.name === value)
    } else {
    isRepeat = depts.filter(item => {
      // 查找当前部门的所有子部门
     return item.pid === this.treeNode.id
   }
    ).some(item => item.name === value)
    }
    isRepeat ? callback(new Error(`该部门下已经有${value}部门了`)) : callback()
    }

    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.deptData.id) {
        depts.filter(item => item.code !== this.treeNode.code).some(item => item.code === value)
      } else {
      // 找所有的数据中查找code一样的
       isRepeat = depts.some(item => item.code === value && value)  // 这里加一个value因为我们的部门编码可以有为空的
    }
      isRepeat ? callback(new Error('该部门编码已经存在')) : callback()
    }
    return {
      // 表单数据
      deptData: {
        name: '', // 部门名称
        code: '',  // 部门编码
        manager: '', // 部门负责人
        introduce: '' // 部门描述
      },
      // 各字段验证规则
      deptRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur'},
          {min:1, max: 50, message: '部门名称长度在1-50个字符之间', trigger: 'blur'},
          { validator: checkNameRepeat, trigger: 'blur'} // 自定义函数校验
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur'},
          { min:1, max: 50, message: '部门编码在1-50个字符之间', trigger: 'blur'},
          {validator: checkCodeRepeat, trigger: 'blur'}
        ],
        manager: [
          { required: true, message: '请选择负责人', trigger: 'blur'}
        ],
        introduce: [
          { required: true, message: '请输入部门描述', trigger: 'blur'},
          {min:1, max: 300, message: '部门名称长度在1-300个字符之间', trigger: 'blur'}
        ]
      },
      people: [] // 负责人列表
    }
  },
  computed: {
    titleName () {
      return this.deptData.id ? '编辑部门' : '添加部门'
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 当点击确定按钮的时候手动检验，检验通过后发送请求添加部门
    isOk () {
     try {
       this.$refs.deptForm.validate(async valid => {
        // 验证成功
        if (valid) {
          // 判断是添加操作还是编辑操作
          if (this.deptData.id) {
            // 修改操作
            await eidtDepartment(this.deptData)
            this.$message.success('修改成功')
          } else {
         // 发送请求
       await addDepartment({...this.deptData, pid: this.treeNode.id}) // 调用新增接口 添加父部门的id（这样才能添加到对应的部门下）
         this.$message.success('添加部门成功')
          }
      // 通知父组件更新视图刷新数据
      this.$emit('getDept')
      this.$emit('update:departDiag', false) // 当dialog关闭时会触发close事件
        }
      })
     } catch (error) {
       this.$emit('update:departDiag', false)
       return Promise.reject(error)
     } finally {
      //  关闭弹窗（请求是异步的数据还没发送前就已经被this.$refs.deptForm.resetFields()清空了所以显示不出来数据）
      // this.$emit('update:departDiag', false)
      // 清除输入的数据和验证不通过的提示信息 el组件自带的方法
      // this.$refs.deptForm.resetFields()
     }
    },
    // 获取简单的员工信息username,id
   async getEasyEmployee() {
    //  获取到的数据存储到people中，遍历展示
      this.people = await getEasyEmployee()
  // console.log(result)
    },
    // 点击取消按钮，清空数据，关闭弹出层
    isCancel () {
      this.$emit('update:departDiag', false)
      // 注意表单的resetFields方法只能清楚表单中绑定的数据像id是不能清楚的会导致误判断表单里面有id,所以我们需要手动重置表单
      this.deptData = {
        name: '',
        introduce: '',
        code: '',
        manager: ''

      }
      this.$refs.deptForm.resetFields()
    },
    // 获取部门详情
    async getDetialDept (id) {
      // 注意现在的deprData表单数据里面是有id的
    this.deptData = await getDetialDept(id)
    }
  }
}
</script>

<style scoped lang="less"></style>