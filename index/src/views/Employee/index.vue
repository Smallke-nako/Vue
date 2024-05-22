<template>
  <el-card class="box-card">
    <el-button
      type="primary"

      icon="el-icon-plus"
      @click="addOpenModel(null)"
    >
      新增员工
    </el-button>


    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:15px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="安全帽编号">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属编队">
        <template slot-scope="scope">
          <span>{{ scope.row.team }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180" >
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openModel(scope.row)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteEmployee(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 添加员工编辑对话框 -->
    <el-dialog class="Add" :visible.sync="addDialogVisible" width="30%">
      <div slot="title" ref="addEmployeeTitle" class="dialog-title-container" />
      <el-form :model="employeeForm"  label-width="80px" size="medium">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="employeeForm.name"  style="width:220px" />
        </el-form-item>
        <el-form-item label="安全帽编号" prop="number" style="width: 200px">
          <el-input v-model="employeeForm.number" style="width:220px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="employeeForm.phone" style="width:220px" />
        </el-form-item>
        <el-form-item label="所属队伍" prop="team">
          <el-select v-model="employeeForm.team" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="employeeForm.team" style="width:220px" />-->
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditEmployee">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 修改员工基本信息编辑对话框 -->
    <el-dialog class="update" :visible.sync="updateDialogVisible" width="30%" >
      <div slot="title" ref="employeeTitle" class="dialog-title-container" />
      <el-form :model="employeeForm" label-width="100px" size="medium">
        <el-form-item label="用户名">
          <el-input v-model="employeeForm.name"  style="width:220px" />
        </el-form-item>
        <el-form-item label="安全帽编号" prop="number">
          <el-input v-model="employeeForm.number" :disabled="true" style="width:220px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="employeeForm.phone" style="width:220px" />
        </el-form-item>
        <el-form-item label="所属队伍" prop="team">
          <el-select v-model="employeeForm.team" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="employeeForm.team" style="width:220px" />-->
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditEmployee">
          确 定
        </el-button>
      </div>

    </el-dialog>


    <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.listQuery.pageNum"
      :page-size="this.listQuery.pageSize"
      :total="count"
      :page-sizes="[15, 20, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
    />

  </el-card>
</template>

<script>
import {deleteEmployee, employeeList, addEmployee, updateEmployee} from '@/api/employee';
export default {
  name: "index",
  data() {
    return {
      list: null,
      listLoading: true,
      count: 0,
      options: [{
        value: '1队',
        label: '1队'
      }, {
        value: '2队',
        label: '2队'
      }, {
        value: '3队',
        label: '3队'
      }, {
        value: '4队',
        label: '4队'
      }, {
        value: '5队',
        label: '5队'
      }],
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },

      addDialogVisible: false,
      updateDialogVisible: false,
      updatePwdDialogVisible: false,
      employeeForm: {
        id: null,
        name: '',
        number: '',
        phone: '',
        team: '',
      },
    }
  },

  created() {
    this.getList()
  },
  methods: {
    // 获取数据用户信息
    getList() {
      this.listLoading = true
      var body = this.listQuery
      employeeList({ body }).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.listLoading = false
      })
    },
    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.listQuery.pageNum = pageNum
      this.getList()
    },
    openModel(user) {
      this.employeeForm = JSON.parse(JSON.stringify(user))
      this.$refs.employeeTitle.innerHTML = '修改员工信息'
      this.updateDialogVisible = true
    },
    // 删除用户
    deleteEmployee(id) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        deleteEmployee(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '你已经取消删除该用户！'
        })
      })
    },
    addOpenModel(){
      this.employeeForm.id = null
      this.employeeForm.name = ''
      this.employeeForm.number = ''
      this.employeeForm.phone = ''
      this.employeeForm.team = ''
      this.$refs.addEmployeeTitle.innerHTML = '添加新员工'
      this.addDialogVisible = true
    },
    addOrEditEmployee() {
      var body = this.employeeForm
      if (body.id == null) {
        addEmployee(body).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      } else {
        updateEmployee(body).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }
      this.addDialogVisible = false
      this.updateDialogVisible = false
    }
  }
}
</script>

<style scoped>
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
.box-card {
  width: 98%;
  margin: 1%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix span {
  font-weight: 600;
}

</style>
