<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
         <el-tabs v-model="activeName">
            <el-tab-pane label="角色管理" name="first">
              <el-row style="height:60px"><el-button type="primary" size="small">+新增角色</el-button></el-row>
              <!-- 表格数据 -->
                <el-table
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                      align="center"
                      width="120"
                      prop=""
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
                      prop="address"
                      label="描述"
                      >
                   </el-table-column>
                   <el-table-column
                      align="center"
                      prop="address"
                      label="操作"
                    >
                    <template>
                      <el-button size="small" type="success">分配权限</el-button>
                      <el-button size="small" type="primary">编辑</el-button>
                      <el-button size="small" type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页器 -->
              <el-row type="flex" justify="center" align="middle" style="height: 60px">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="50">
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
                <el-input  disabled style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input  disabled style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input  disabled style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input  disabled style="width:400px" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-form>
            </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>