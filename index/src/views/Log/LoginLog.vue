<template>
  <el-card class="box-card">
    <!-- 设置标题登录日志 -->
    <div slot="header" class="clearfix">
      <span>登录日志</span>
    </div>

    <el-table v-loading="loglistLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录账号">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录IP">
        <template slot-scope="scope">
          <span>{{ scope.row.ipAddress}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="浏览器类型">
        <template slot-scope="scope">
          <span>{{ scope.row.browserType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作系统">
        <template slot-scope="scope">
          <span>{{ scope.row.os}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)">
            {{ map[scope.row.status ] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteLog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

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
import {logList,deleteLog} from "@/api/loginlog";

export default {
  name: "LoginLog",
  data() {
    return {
      list: null,
      loglistLoading: true,
      count: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      map: {
        0: '登录成功',
        1: '登录失败'
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList() {
     this.loglistLoading = true
      var body = this.listQuery
     logList({body }).then(response => {
       this.list = response.data.result
       this.count = response.data.totalSize
       this.loglistLoading = false
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
    deleteLog(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        deleteLog(id).then(response => {
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
          message: '你已经取消本次删除！'
        })
      })
    }
  },

  computed: {
    tagType() {
      return function(type) {
        switch (type) {
          case 0:
            return "success";
          case 1:
            return "warning";
        }
      };
    }
  },
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
