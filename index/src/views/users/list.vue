<template>
  <el-card class="box-card">
    <el-button
      type="primary"

      icon="el-icon-plus"
      @click="addopenModel(null)"
    >
      新增用户
    </el-button>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上次信息修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180" >
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openModel(scope.row)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 添加编辑对话框 -->
    <el-dialog class="Add" :visible.sync="addDialogVisible" width="30%">
      <div slot="title" ref="adduserTitle" class="dialog-title-container" />
      <el-form :model="userForm" :rules="rules" label-width="80px" size="medium">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"  style="width:220px" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" style="width:220px" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" style="width:220px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" style="width:220px" />
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorEditUser">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 修改用户基本信息编辑对话框 -->
    <el-dialog class="update" :visible.sync="updateDialogVisible" width="30%" >
      <div slot="title" ref="userTitle" class="dialog-title-container" />
      <el-form :model="listForm" :rules="rules" label-width="80px" size="medium">
        <el-form-item label="用户名">
          <el-input v-model="listForm.username" :disabled="true" style="width:220px" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="listForm.email" style="width:220px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="listForm.phone" style="width:220px" />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorEditUser">
          确 定
        </el-button>
      </div>

    </el-dialog>

      <!-- 修改用户密码信息编辑对话框 -->
      <el-dialog class="updatepwd" :visible.sync="updatePwdDialogVisible" width="30%" >
        <div slot="title" ref="pwdTitle" class="dialog-title-container" />
        <el-form :model="userForm" :rules="rules" label-width="80px" size="medium">
          <el-form-item label="用户名">
            <el-input v-model="userForm.username" :disabled="true" style="width:220px" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" style="width:220px" />
          </el-form-item>
        </el-form>

      <div slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorEditUser">
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
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
    />

  </el-card>
</template>

<script>
import { userList, deleteUser, addUser, updateUser } from '@/api/user'
import inputCheck from '@/utils/inputCheck'
export default {
  name: 'List',

  data() {
    var passwordCheck = (rule,value,callback) => {
      if (inputCheck.pwd.test(value)) {
        callback(new Error('密码要求首字母且为大写'))
      }
    }
    return {
      list: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      addDialogVisible: false,
      updateDialogVisible: false,
      updatePwdDialogVisible: false,
      userForm: {
        id: null,
        username: '',
        password: '',
        phone: '',
        email: '',
        createTime: '',
        updateTime: '',
      },
      listForm:{
        id: null,
        username: '',
        phone: '',
        email: '',
        createTime: '',
        updateTime: '',
      },
      rules:{
        password:[
          {validator:function (rule,value,callback){
              if (inputCheck.pwd.test(value) === false){
                callback(new Error('密码要求首字母且为大写'))
              }else {callback();}
            },
            trigger: 'blur'
            }
        ],
        phone:[
          {validator:function (rule,value,callback){
              if (inputCheck.phone.test(value) === false){
                callback(new Error('手机号格式不正确'))
              }else {callback();}
            },
            trigger: 'change'
          }
        ],
        email:[
          {validator:function (rule,value,callback){
              if (inputCheck.email.test(value) === false){
                callback(new Error('邮箱格式不正确'))
              }else {callback();}
            },
            trigger: 'change'
          }
        ]
      }
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
      userList({ body }).then(response => {
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
    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(response => {
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
    openModel(user) {
        this.userForm = JSON.parse(JSON.stringify(user))
        this.listForm = JSON.parse(JSON.stringify(user))
        this.$refs.userTitle.innerHTML = '修改用户信息'
        this.updateDialogVisible = true
    },
    pwdModel(user){
      this.pwdForm = JSON.parse(JSON.stringify(user))
      this.pwdForm.password = ''
      this.$refs.userTitle.innerHTML = '修改用户信息'
      this.updatePwdDialogVisible = true
    },
    addopenModel(){
        this.userForm.id = null
        this.userForm.username = ''
        this.userForm.password = ''
        this.userForm.email = ''
        this.userForm.phone = ''
        this.$refs.adduserTitle.innerHTML = '添加新用户'
        this.addDialogVisible = true
    },
    addorEditUser() {
      var body = this.userForm
      var body1 = this.listForm
      if (body.id == null) {
        addUser(body).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      } else {
        updateUser(body1).then(response => {
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
