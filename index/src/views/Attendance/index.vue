<template>
  <el-card class="box-card">
    <!-- 设置标题登录日志 -->
    <div slot="header" class="clearfix">
      <span>每日打卡记录(每日上午4点生成)</span>
    </div>
    <span>日期选择</span>
    <el-date-picker
      v-model="dateValue"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      style="margin-left: 20px"
      value-format="yyyy-MM-dd"
      @change="searchDate"
    >
    </el-date-picker>
    <el-button
      type="primary"

      icon="el-icon"
      @click="getList()"
    >
      刷新总列表
    </el-button>

    <el-button
      type="primary"

      icon="el-icon"
      @click="deleteTable()"
    >
      清空表格
    </el-button>

    <el-button
      type="primary"

      icon="el-icon"
      @click="createTable()"
    >
      生成每日考勤表
    </el-button>

    <el-table v-loading="attendanceListLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建记录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="安全帽编号">
        <template slot-scope="scope">
          <span>{{ scope.row.number}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="员工电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属队伍">
        <template slot-scope="scope">
          <span>{{ scope.row.team}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="打卡时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="打卡状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)">
            {{ map[scope.row.status ] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="attendanceLog(scope.row)">已签到</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 总列表分页 -->
    <el-pagination
      class="pagination-container"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.listQuery.pageNum"
      :page-size="this.listQuery.pageSize"
      :total="count"
      :page-sizes="[9, 20, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </el-card>
</template>

<script>
import {attendanceList, createTable, deleteTable, searchDate, updateAttendance} from "@/api/attendance";

export default {
  name: "LoginLog",
  data() {
    return {
      list: null,
      attendanceListLoading: true,
      dateValue: '',
      count: 0,
      datalist:{
        id:null,
        name: '',
        number: '',
        phone: null,
        createTime: '',
        updateTime: '',
        status: null,
        team: '',
      },
      listQuery: {
        pageNum: 1,
        pageSize: 9
      },
      dateQuery: {
        pageNum: 1,
        pageSize: 9
      },
      map: {
        0: '未打卡',
        1: '已打卡'
      },
    };
  },
  created() {
    this.getList()
  },
  methods:{
    getList() {
      this.attendanceListLoading = true
      var body = this.listQuery
      this.dateValue = null
      attendanceList({body}).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.attendanceListLoading = false
      })
    },
  deleteTable(){
    this.$confirm('是否清空表?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        deleteTable().then(response => {
          this.$message({
            message: '清空成功',
            type: 'success'
          })
          this.getList()
        })
  })
  },
    createTable(){
      this.$confirm('是否生成每日签到表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createTable().then(response => {
          this.$message({
            message: '生成成功',
            type: 'success'
          })
          this.getList()
        })
      })
    },
    handleSizeChange(pageSize) {
        if (this.dateValue != null){
          this.dateQuery.pageSize = pageSize
          this.searchDate()
        }else {
          this.listQuery.pageSize = pageSize
          this.getList()
        }
    },
    handleCurrentChange(pageNum) {
        if (this.dateValue != null){
          this.dateQuery.pageNum = pageNum
          this.searchDate()
        }else {
          this.listQuery.pageNum = pageNum
          this.getList()
        }
    },
    searchDate() {
      this.attendanceListLoading = true
      var body = this.dateQuery
      searchDate({body},this.dateValue).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.attendanceListLoading = false
      })
    },
    //修改打卡状态
    attendanceLog(data) {
      this.datalist =data;
        // this.datalist = JSON.parse(JSON.stringify(data))
      var body = this.datalist
      this.$confirm('是否修改员工打卡状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateAttendance(body).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        });
      });
    },
  },

  computed: {
    tagType() {
      return function(type) {
        switch (type) {
          case 0:
            return "warning";
          case 1:
            return "success";
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
