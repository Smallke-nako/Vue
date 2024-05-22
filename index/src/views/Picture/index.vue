<template>
  <div id="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>危险行为记录</span>
      </div>
    <el-table v-loading="picturelistLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">

      <el-table-column align="center" label="ID" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="图像">
        <template slot-scope="scope">
          <img style="width: 640px;height: 480px" :src="scope.row.image">
        </template>
      </el-table-column>


      <el-table-column align="center" label="记录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.recorddata }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="未佩戴安全帽人数">
        <template slot-scope="scope">
          <span>{{ scope.row.person}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deletePicture(scope.row.id)">删除</el-button>
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
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>
  </div>
</template>

<script>
import {deletePicture, warnList} from "@/api/picture";
import axios from "axios";
import {deleteUser} from "@/api/user";

export default {
  name: "index",
  data() {
    return {
      list: null,
      picturelistLoading: true,
      count: 0,
      listQuery: {
        pageNum:1,
        pageSize:10
      },
      addDialogVisible: false,
      updateDialogVisible: false,
      imageForm: {
        id: null,
        image: '',
        recorddata: '',
        person:''
      }
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.picturelistLoading = true
      var body = this.listQuery
      var _this = this
      warnList({body }).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        _this.list.forEach(element =>{
          element.image = 'data:image/jpg;base64,'+element.image
        })
        this.picturelistLoading = false
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
    // 删除图片
    deletePicture(id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        deletePicture(id).then(response => {
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
    },
  }
}
</script>

<style scoped>
.box-card {
  width: 98%;
  margin: 1%;
  border-radius: 12px;
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
.pagination-container {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  margin-left: 35%;
}
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
}
span{
  font-size: 20px;
}
</style>
