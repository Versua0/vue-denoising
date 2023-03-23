<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { UploadProps, UploadUserFile,ElMessageBox,UploadInstance   } from 'element-plus'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:80/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const fileList = ref<UploadUserFile[]>([  // 上传文件的列表
])
let srcList=ref([])
let url=ref()  //默认图片


const dialogVisible = ref(false)
const uploadRef = ref<UploadInstance>()
const submitUpload = () => {
  uploadRef.value!.submit()
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}


//axios
function uploadCompleted(){
 axios('/uploadCompleted')
}


function getResult(){
  axios('/getResult').then((response)=>{
    let res=Object.values(response.data)
    srcList.value= (res as any)[2]
    console.log(srcList.value[0])
    url.value=srcList.value[0]
  })
}







</script>

<template>
  <a-layout class="content">

<body>
  <el-button type="info" @click="dialogVisible = true">
    上传
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="文件上传"
    width="40%"
    
  >
   
  <el-upload
  v-model:file-list="fileList"
    class="upload-demo"
    ref="uploadRef"
    action="http://localhost:80/api/upload"
    method="post"
    multiple="ture"
    list-type="text"
    :auto-upload="false"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
  >
    <el-button type="primary">Click to upload</el-button>
    
  </el-upload>
  <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button class="ml-3" type="success" @click="submitUpload(),dialogVisible=false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-button type="primary" @click=uploadCompleted()>Primary</el-button>
  <div class="demo-image__preview">
    <el-image
      style="width: 200px; height: 200px"
      :src="url"
      :zoom-rate="1.2"
      :preview-src-list="srcList"
      :initial-index="0"
      fit="cover"
    />
  </div>
  <el-button type="primary" @click="getResult()">获取结果</el-button>


          
  </body>
</a-layout>

</template>

<style >
    .content {
  display: flex;
  flex-direction: column;
  background-image: url("/src/assets/pexels-photo.webp");
  background-size: 100% 100%;
  background-attachment: fixed;
 
  width: 100%;
  height: 100%;
  min-width: 900px;
  min-height: 1000px;
 
  /* justify-content: center;
  align-items: center; */
}
    .demo-image__error .image-slot {
  font-size: 30px;
}
    .demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
    .demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>