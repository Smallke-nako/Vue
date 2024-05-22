<template>
  <div class="main">
    <div class="content">
          <div class="centerMain">
                <div class="head">
                      <h1>安全帽检测</h1>
                      <el-button
                      type="primary"
                      v-on:click="true_upload"
                      size="small"
                      style="margin: 10px;height: 50px;width: 150px"
                            >
                      开启摄像头检测
                    </el-button>
                 </div>

              <div class="center">
                <div id="video1">
                  <img src="http://127.0.0.1:5003/video_feed" @error="setErrorImage" alt="" style="width: 100%;height: 100%">
                </div>
              </div>

              <div class="foot"></div>

         </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import errorImage from '@/assets/error.jpg'
export default {
  name: "Index",
  data() {
    return{
      server_url:"http://127.0.0.1:5003",
    };
  },
  methods:{
    setErrorImage(e){
      e.target.src = errorImage
    },
    true_upload() {
      axios.post(this.server_url+"/camera")
    },
    true_upload2() {
      axios.post(this.server_url+"/video")
    },
    submitUpload(){
      this.$refs.upload.submit()
    }
  }
}
</script>

<style scoped>
@import "../../css/video.css";
</style>

<!--    <el-upload-->
<!--      action="http://127.0.0.1:5003/video"-->
<!--      ref="upload"-->
<!--      :auto-upload="false"-->
<!--    >-->
<!--      <el-button-->
<!--        type="primary"-->
<!--        slot="trigger"-->
<!--      >-->
<!--        上传图片or视频检测-->
<!--      </el-button>-->

<!--      <el-button style=";" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->

<!--      <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过500GB</div>-->

<!--    </el-upload>-->
