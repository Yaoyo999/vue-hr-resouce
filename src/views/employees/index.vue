<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 自定义插槽组件 -->
      <page-tools :isShowBefore="true">
        <!-- 前面的内容 -->
        <span slot="beforeSlot">共找到{{total}}条员工信息</span>
        <!-- 后面的内容 两种插槽的使用都可以-->
        <template v-slot:afterSlot>
          <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="employeeDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 数据列表 -->
      <el-card>
        <el-table
          border
          style="width: 100%"
          :data="list"
          v-loading="loading"
          >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          sortable=""
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          sortable=""
          >
        </el-table-column>
        <el-table-column width="120px" label="头像" align="center">
          <template slot-scope="{ row }">
            <img 
            :src="row.staffPhoto" 
            style="border-radius:50%;width:100px;height:100px;padding:10px" 
            v-imgerror="imgSrc"
            @click="showCode(row.staffPhoto)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="workNumber"
          label="工号"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="formOfEmployment"
          :formatter="formatterForm"
          label="聘用形式"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          prop="departmentName"
          label="部门"
          sortable=""
          >
        </el-table-column>
           <el-table-column
           align="center"
          label="入职时间"
          sortable=""
          >
          <!-- 过滤器格式化时间 要格式化的数据 | 过滤器函数 -->
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
          </el-table-column>
           <el-table-column
           align="center"
          prop="enableState"
          label="账户状态"
          sortable=""
          >
          <template slot-scope="{ row }">
            <!-- 这里的强制绑定value值和v-model是一个道理但v-model中不能进行js运算只能绑定数据 -->
            <el-switch
              :value="row.enableState === 1"
              >
            </el-switch>
          </template>
        </el-table-column>
           <el-table-column
           align="center"
          prop="address"
          label="操作"
          sortable=""
          fixed="right" width="280"
          >
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="assginRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            background
            :page-size="dataForm.size"
            :current-page="dataForm.page"
            @current-change="changePage"
            >
      </el-pagination>
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工组件 -->
  <add-employee :employeeDialog.sync="employeeDialog"/>
    <!-- 二维码弹层 -->
  <el-dialog title="二维码" :visible.sync="showQrCode">
    <el-row type="flex" justify="center">
      <canvas ref="qrDom"></canvas>
    </el-row>
  </el-dialog>
  <!-- 分配角色的弹层 -->
  <assgin-role :ShowRoleDialog.sync="showRole" :userId="userId" ref="assginRole"/>
  </div>
</template>

<script>
import { getEmployee, deleteEmployee } from '@/api/employees'
// 导入枚举数据(注意这里是引入的数据不能直接使用，模板上能直接使用的数据有data,prop,computed里的数据)
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
import AssginRole from './components/assgin-role'
// 注意这里是引入文件中的函数formatDate组件模板中是使用的全局注册过滤器
import { formatDate } from '@/filters/index'
import QrCode from 'qrcode'
export default {
  name: 'employeeIndex',
  components: {
    AddEmployee,
    AssginRole
  },
  props: {},
  data () {
    return {
      list: [], // 员工数据列表
      dataForm: {
        page: 1, // 第一页
        size: 10 // 每页十条
      },
      total: 0,  // 总条数
      EmployeeEnum, // 枚举的数据es6写法
      employeeDialog: false, // 添加员工的弹层
      imgSrc: require('@/assets/common/head.jpg'), // 默认的头像
      showQrCode: false, // 二维码的显示
      showRole: false, // 控制分配角色的状态
      userId: null // user的id
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化员工列表
    this.getEmployee()
  },
  mounted () {},
  methods: {
    // 获取员工列表
   async getEmployee() {
    // loading加载状态
    this.loading = true
    const { total, rows } =  await getEmployee(this.dataForm)
    // 赋值数据展示
    this.total = total
    this.list = rows
    // 关闭加载状态
    this.loading = false
    },
    // 改变页码获取数据
    changePage(page) {
      // 新的页码赋值给page
      this.dataForm.page = page
      // 重新获取数据
      this.getEmployee()
    },
    // 处理聘用形式
    formatterForm(row, column, cellValue, index) {
      // console.log(arguments)
      // return 1 return什么当前的数据列就显示什么 find方法返回的是满足条件的元素(对象)
     const obj = this.EmployeeEnum.hireType.find(item => item.id === cellValue)
      // return obj.id === 1 ? '正式' : '非正式' 如果没有找到obj那么obj.id 就相当于undefined.id 报错
      return obj ? obj.value : '未知'
    },
    // 删除员工
    deleteEmployee(row) {
      this.$confirm(`确定删除${row.username}吗?`, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async()=>{
          await deleteEmployee(row.id)
          // 刷新获取新的列表
          this.getEmployee()
          // 提示
          this.$message.success('删除成功')
      })
    },
    // 导出excel数据
    async exportExcel () {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 获取所有员工信息
      // 由于`js-xlsx`体积还是很大的，导出功能也不是一个非常常用的功能，所以使用的时候建议使用懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployee({page:1,size: this.total})
        // multiHeader里面是一个二维数组，里面的一个元素是一行表头
        // multiHeader中的一行表头中的字段的个数需要和真正的列数相等，假设想要跨列，多余的空间需要定义成空串与headers中的顺序一一对应
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2'] // 我们要实现其合并的效果， 需要设定merges选项,merges的顺序无关
        // 目的获取获取 将[{},{}] => [[],[]]这种形式
         const data =  this.formatData(headers, rows)
        // 导入成功.then .返回一个excel对象
        excel.export_json_to_excel({
          header: Object.keys(headers),// 表头 接收一个数组 ['姓名','年龄'] 必传
          data, // 具体的数据数组 格式为[['jack', 18],['Bob', 20]] 必传
          bookType: 'xlsx', // 文件类型
          autoWidth: true, // 单元格是否要自适应宽度
          filename: '员工信息表',  // 导出文件名
          multiHeader, // 复杂表头的部分
          merges // 合并选项
        })
      })
    },
    formatData (headers, rows) {
     return rows.map(item => {
       // item是对象  => 转化成只有值的数组 => 数组值的顺序依赖headers  {username: '张三'  }
      //   // Object.keys(headers)  => ["姓名", "手机号",...]
       return Object.keys(headers).map(key => {
        //  格式化日期
         if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
           return  formatDate(item[headers[key]])
         } else if (headers[key] === 'formOfEmployment') {
          //  注意这里不能在使用item了外层和里层都有且都有使用item数据不能找外层的会找近作用域的
         const obj = EmployeeEnum.hireType.find(obj => item[headers[key]] === obj.id )
        return obj ? obj.value : '未知'
         }
          // key为中文的键值
         return item[headers[key]]
        })
      })
       // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
      // 需要处理时间格式问题
    },
    // 展示二维码
    showCode (url) {
      // 如果有url才显示弹窗
      if (url) {
      // dom为一个canvas的dom对象(显示的容器)， info为转化二维码的信息（这里为图片的地址字符串都可以转为二维码（'123'）都可以
      // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！1.要么利用nextTick 2.要么利用dialog的回调函数opend事件（Dialog 打开动画结束时的回调）dom就已经存在了
      this.showQrCode = true
      this.$nextTick(()=> {
        // 此时可以确认已经有ref对象了
        QrCode.toCanvas(this.$refs.qrDom, url)
        // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
      })
      //  QrCode.toCanvas(this.$refs.qrDom, '123') // 仅仅这样是不行的 数据变化后dom还没有生成光这样是不行的页面还没加载完毕
      } else {
        // 没有地址提示
        this.$message.warning('该用户还没有上传头像')
      }
  
     
    },
    // openDialog () {
    //   QrCode.toCanvas(this.$refs.qrDom, 'http://www.baidu.com')
    // }
   async assginRole (id) {
      this.userId = id
      // 直接调用时异步的先显示弹窗再显示数据会出现数据闪的一下所以我们把它变成同步的
     await this.$refs.assginRole.getBaseUserInfo(id)
      // 展示弹层
      this.showRole = true
  }
  }
}
</script>

<style scoped lang="less"></style>