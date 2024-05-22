<template>
  <div class="main">
    <div class="container">
      <div class="left">
        <div class="box0">
          <div class="box0-1" @click="LoginLog">
            <svg-icon icon-class="attendance" style="width: 80px;height: 80px"/>
            <span>登录日志</span>
          </div>
          <div class="box0-1" @click="Employee">
            <svg-icon icon-class="employee" style="width: 80px;height: 80px"/>
            <span>员工管理</span>
          </div>
          <div class="box0-1" @click="Attendance">
            <svg-icon icon-class="attendance1" style="width: 80px;height: 80px"/>
            <span>每日考勤</span>
          </div>
          <div class="box0-1" @click="User">
            <svg-icon icon-class="usermanger" style="width: 80px;height: 80px"/>
            <span>用户管理</span>
          </div>
          <div class="box0-1" @click="Camera">
            <svg-icon icon-class="camera" style="width: 80px;height: 80px"/>
            <span>监控界面</span>
          </div>
          <div class="box0-1" @click="Warning">
            <svg-icon icon-class="tree" style="width: 80px;height: 80px"/>
            <span>警戒界面</span>
          </div>
        </div>
        <div class="center">
          <div class="box2">
            <div id="four" style="width: 100%;height: 100%"></div>
          </div>
        </div>
        <div class="foot">
          <div class="box1">
              <div id="one" style="width: 100%;height: 100%"></div>
          </div>
          <div class="box1">
            <div id="two" style="width: 100%;height: 100%"></div>
          </div>
          <div class="box1">
            <div id="three" style="width: 100%;height: 100%"></div>
          </div>
        </div>
      </div>
<!--      <div class="right">-->
<!--        <div class="box4">-->
<!--        </div>-->
<!--        <div class="box5">-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    EmployeeCount() {
      const option = {
        title: {
          text: '员工总数',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          position: [10,10]
        },
        legend: {
          top: '5%',
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.employeeValue, name: this.employeeName },
              { value: this.OneTeamValue, name: this.OneTeamName },
              { value: this.TwoTeamValue, name: this.TwoTeamName },
              { value: this.ThreeTeamValue, name: this.ThreeTeamName },
              { value: this.FourTeamValue, name: this.FourTeamName },
              { value: this.FiveTeamValue, name: this.FiveTeamName },
            ]
          }
        ]
      };
      var myChartOne = this.$echarts.init(document.getElementById("one")); //图标初始化\
      myChartOne.setOption(option);
      window.addEventListener('resize', () => {
        myChartOne.resize()
      })
    },
    SystemLoginCount() {
      const option = {
        title: {
          text: '系统登录日志记录',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              {
                value:this.SystemLoginSuccessCount,
                name:'登录成功',
              },
              {value:this.SystemLoginFailCount,
                name: '登录失败',
              },
              {value:this.SystemLoginAllCount,
                name: '登录总数',
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      var myChartOne = this.$echarts.init(document.getElementById("two")); //图标初始化\
      myChartOne.setOption(option);
      window.addEventListener('resize', () => {
        myChartOne.resize()
      })
    },
    AttendanceCount() {
      const option = {
        title: {
          text: '今日签到情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          orient: 'vertical',
          left: 'left'
        },
        color: ['#fac859', '#546fc6'],
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              {value: this.value1,name:this.name},
              {value: this.value2,name:this.name2}
              ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      var myChartOne = this.$echarts.init(document.getElementById("three")); //图标初始化\
      myChartOne.setOption(option);
      window.addEventListener('resize', () => {
        myChartOne.resize()
      })
    },
    MainCount() {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['五队', '四队', '三队', '二队', '一队','总支队']
        },
        series: [
          {
            name: '总人数',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              {value:this.FiveTeamValue},
              {value:this.FourTeamValue},
              {value:this.ThreeTeamValue},
              {value:this.TwoTeamValue},
              {value:this.OneTeamValue},
              {value:this.employeeValue}
            ]
          },
          {
            name: '今日签到人数',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              {value:this.fiveTeamAtCount},
              {value:this.fourTeamAtCount},
              {value:this.threeTeamAtCount},
              {value:this.twoTeamAtCount},
              {value:this.oneTeamAtCount},
              {value:this.value1}
            ]
          },
          {
            name: '今日未签到人数',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              {value:this.fiveTeamUnAtCount},
              {value:this.fourTeamUnAtCount},
              {value:this.threeTeamUnAtCount},
              {value:this.twoTeamUnAtCount},
              {value:this.oneTeamUnAtCount},
              {value: this.value2}
            ]
          }
        ]
      };
      var myChartOne = this.$echarts.init(document.getElementById("four")); //图标初始化\
      myChartOne.setOption(option);
      window.addEventListener('resize', () => {
        myChartOne.resize()
      })
    },
    LoginLog() {
      this.$router.push('/log/loginlog')
    },
    Employee() {
      this.$router.push('/employee/index')
    },
    Attendance() {
      this.$router.push('/attendance/index')
    },
    User() {
      this.$router.push('/user/list')
    },
    Camera() {
      this.$router.push('/video/record1')
    },
    Warning() {
      this.$router.push('/warn/picture')
    }
  },
  mounted: function() {
    this.$axios.get(this.$url + 'echarts/employeeCount').then((res) => {
      var employee = res.data.employeeCount
      for(var i = 0; i < employee.length; i++) {
        var d = {name: '', value: 0}
        d.name = employee[i].name
        d.value = employee[i].count
      }
      this.employeeName = d.name
      this.employeeValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/oneTeamCount').then((res) => {
      var OneTeam = res.data.oneTeamCount
      for(var i = 0; i < OneTeam.length; i++) {
        var d = {name: '', value: 0}
        d.name = OneTeam[i].name
        d.value = OneTeam[i].count
      }
      this.OneTeamName = d.name
      this.OneTeamValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/twoTeamCount').then((res) => {
      var TwoTeam = res.data.twoTeamCount
      for(var i = 0; i < TwoTeam.length; i++) {
        var d = {name: '', value: 0}
        d.name = TwoTeam[i].name
        d.value = TwoTeam[i].count
      }
      this.TwoTeamName = d.name
      this.TwoTeamValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/threeTeamCount').then((res) => {
      var ThreeTeam = res.data.threeTeamCount
      for(var i = 0; i < ThreeTeam.length; i++) {
        var d = {name: '', value: 0}
        d.name = ThreeTeam[i].name
        d.value = ThreeTeam[i].count
      }
      this.ThreeTeamName = d.name
      this.ThreeTeamValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fourTeamCount').then((res) => {
      var FourTeam = res.data.fourTeamCount
      for(var i = 0; i < FourTeam.length; i++) {
        var d = {name: '', value: 0}
        d.name = FourTeam[i].name
        d.value = FourTeam[i].count
      }
      this.FourTeamName = d.name
      this.FourTeamValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fiveTeamCount').then((res) => {
      var FiveTeam = res.data.fiveTeamCount
      for(var i = 0; i < FiveTeam.length; i++) {
        var d = {name: '', value: 0}
        d.name = FiveTeam[i].name
        d.value = FiveTeam[i].count
      }
      this.FiveTeamName = d.name
      this.FiveTeamValue = d.value
      this.EmployeeCount()
      this.MainCount()
    })

    this.$axios.get(this.$url + 'echarts/UsersCount').then((res) => {
      var Users = res.data.UsersCount
      var data =[]
      for(var i = 0; i < Users.length; i++) {
        var d = {name: '', value: 0}
        d.name = Users[i].name
        d.value = Users[i].count
        // 往data数组中添加数据
        data.push(d)
      }
      this.data1 = data
      this.UsersCount()
    })
    this.$axios.get(this.$url + 'echarts/AttendanceCount').then((res) => {
      var attendance = res.data.AttendanceCount
      var data =[]
      for(var i = 0; i < attendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = attendance[i].name
        d.value = attendance[i].count
      }
      this.value1 = d.value
      this.name = d.name
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/oneTeamAttendanceCount').then((res) => {
      var oneTeamAttendance = res.data.oneTeamAttendanceCount
      var data =[]
      for(var i = 0; i < oneTeamAttendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = oneTeamAttendance[i].name
        d.value = oneTeamAttendance[i].count
      }
      this.oneTeamAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/twoTeamAttendanceCount').then((res) => {
      var twoTeamAttendance = res.data.twoTeamAttendanceCount
      var data =[]
      for(var i = 0; i < twoTeamAttendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = twoTeamAttendance[i].name
        d.value = twoTeamAttendance[i].count
      }
      this.twoTeamAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/threeTeamAttendanceCount').then((res) => {
      var threeTeamAttendance = res.data.threeTeamAttendanceCount
      var data =[]
      for(var i = 0; i < threeTeamAttendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = threeTeamAttendance[i].name
        d.value = threeTeamAttendance[i].count
      }
      this.threeTeamAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fourTeamAttendanceCount').then((res) => {
      var fourTeamAttendance = res.data.fourTeamAttendanceCount
      var data =[]
      for(var i = 0; i < fourTeamAttendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = fourTeamAttendance[i].name
        d.value = fourTeamAttendance[i].count
      }
      this.fourTeamAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fiveTeamAttendanceCount').then((res) => {
      var fiveTeamAttendance = res.data.fiveTeamAttendanceCount
      var data =[]
      for(var i = 0; i < fiveTeamAttendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = fiveTeamAttendance[i].name
        d.value = fiveTeamAttendance[i].count
      }
      this.fiveTeamAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/UnAttendanceCount').then((res) => {
      var unattendance = res.data.UnAttendanceCount
      var data =[]
      for(var i = 0; i < unattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = unattendance[i].name
        d.value = unattendance[i].count
      }
      this.value2 = d.value
      this.name2 = d.name
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/oneTeamUnAttendanceCount').then((res) => {
      var oneTeamUnattendance = res.data.oneTeamUnAttendanceCount
      var data =[]
      for(var i = 0; i < oneTeamUnattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = oneTeamUnattendance[i].name
        d.value = oneTeamUnattendance[i].count
      }
      this.oneTeamUnAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/twoTeamUnAttendanceCount').then((res) => {
      var twoTeamUnattendance = res.data.twoTeamUnAttendanceCount
      var data =[]
      for(var i = 0; i < twoTeamUnattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = twoTeamUnattendance[i].name
        d.value = twoTeamUnattendance[i].count
      }
      this.twoTeamUnAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/threeTeamUnAttendanceCount').then((res) => {
      var threeTeamUnattendance = res.data.threeTeamUnAttendanceCount
      var data =[]
      for(var i = 0; i < threeTeamUnattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = threeTeamUnattendance[i].name
        d.value = threeTeamUnattendance[i].count
      }
      this.threeTeamUnAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fourTeamUnAttendanceCount').then((res) => {
      var fourTeamUnattendance = res.data.fourTeamUnAttendanceCount
      var data =[]
      for(var i = 0; i < fourTeamUnattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = fourTeamUnattendance[i].name
        d.value = fourTeamUnattendance[i].count
      }
      this.fourTeamUnAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/fiveTeamUnAttendanceCount').then((res) => {
      var fiveTeamUnattendance = res.data.fiveTeamUnAttendanceCount
      var data =[]
      for(var i = 0; i < fiveTeamUnattendance.length; i++) {
        var d = {name: '', value: 0}
        d.name = fiveTeamUnattendance[i].name
        d.value = fiveTeamUnattendance[i].count
      }
      this.fiveTeamUnAtCount = d.value
      this.AttendanceCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/SystemLoginSuccessCount').then((res) => {
      var SystemLoginCount = res.data.SystemLoginSuccessCount
      var data =[]
      for(var i = 0; i < SystemLoginCount.length; i++) {
        var d = {name: '', value: 0}
        d.name = SystemLoginCount[i].name
        d.value = SystemLoginCount[i].count
      }
      this.SystemLoginSuccessCount = d.name
      this.SystemLoginSuccessCount = d.value
      this.SystemLoginCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/SystemLoginFailCount').then((res) => {
      var SystemLoginFailCount = res.data.SystemLoginFailCount
      var data =[]
      for(var i = 0; i < SystemLoginFailCount.length; i++) {
        var d = {name: '', value: 0}
        d.name = SystemLoginFailCount[i].name
        d.value = SystemLoginFailCount[i].count
      }
      this.SystemLoginFailName = d.name
      this.SystemLoginFailCount = d.value
      this.SystemLoginCount()
      this.MainCount()
    })
    this.$axios.get(this.$url + 'echarts/SystemLoginCount').then((res) => {
      var SystemLoginAllCount = res.data.SystemLoginAllCount
      var data =[]
      for(var i = 0; i < SystemLoginAllCount.length; i++) {
        var d = {name: '', value: 0}
        d.name = SystemLoginAllCount[i].name
        d.value = SystemLoginAllCount[i].count
      }
      this.SystemLoginAllCount = d.name
      this.SystemLoginAllCount = d.value
      this.SystemLoginCount()
      this.MainCount()
    })
    this.UsersCount()
    this.AttendanceCount()
  }
}
</script>
<style scoped>
@import "../../css/dashboard.scss";
</style>
