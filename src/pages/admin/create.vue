<template>
  <div>
    <el-card class="overflow-hidden overscroll-auto h-88vh" size="large">
      <el-scrollbar height="840px">
        <div>
          <!--点击按钮返回root页面，且删除tab-->
          <el-link type="primary" @click="backRoot()">返回</el-link>
          <el-divider direction="vertical"/>
          <el-link type="primary">荣誉编辑</el-link>
        </div>
        <div class=" flex flex-row h-full mt-5 ">
          <!--  图像识别-->
          <div class="bg-blue h-full w-1/2">
            <div>
              <!--两个按钮一个是开始裁剪，一个是进行OCR识别-->
              <el-button size="large" type="primary" @click="handleImg2Word()">OCR识别</el-button>
            </div>
            <div class="mt-5">
              <!--裁剪区域-->
              <UploadImg v-model:imageUrl="imageUrl" :fileSize="1" height="400px" width="400px">
                <template #tip> 上传图片最大为 3M</template>
              </UploadImg>
            </div>
            <div class="mt-5">
              <el-upload
                  v-model:file-list="fileList"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
              >
                <el-icon>
                  <Plus/>
                </el-icon>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 2mb
                  </div>
                </template>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image"/>
              </el-dialog>
            </div>
            <div>
              <el-tag>上传的第一张照片会作为荣誉推荐的第一张图片,上传文件仅支持jpg, jpeg, png 最多支持6个文件</el-tag>
            </div>
          </div>
          <el-divider direction="vertical" style="height: 800px"></el-divider>
          <!--  信息编辑-->
          <div class="w-1/2">
            <!--form 荣誉信息填写框-->
            <el-form class="w-140" :model="honourModel" label-position="right" label-width="120px" :rules="rules"
                     size="large">
              <el-form-item label="荣誉名称" prop="title">
                <el-input v-model="honourModel.title"></el-input>
              </el-form-item>
              <el-form-item label="荣誉级别" prop="levelId">
                <el-select v-model="honourModel.levelId" placeholder="请选择">
                  <el-option
                      v-for="item in levelOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="荣誉类别" prop="categoryId">
                <el-select v-model="honourModel.categoryId" placeholder="请选择">
                  <el-option
                      v-for="item in categoryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="获取时间" prop="actTime">
                <el-date-picker
                    v-model="honourModel.actTime"
                    type="date"
                    placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="获奖学期" prop="term">
                <el-input v-model="honourModel.term"></el-input>
              </el-form-item>
              <el-form-item label="获得者">
                <el-button class="my-0" type="primary" @click="handleTabAction('add')">添加</el-button>
                <el-table :data="actTableData" style="width: 700px; height: 600px;">
                  <el-table-column prop="index" label="序号"/>
                  <el-table-column prop="name" label="姓名"/>
                  <el-table-column prop="role" label="角色">
                    <template #default="{ row }">
                      <div class="w-full flex  space-x-0">
                        {{ row.role === "1" ?  '教师':"学生" }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="clazz" label="班级" width="120">
                    <template #default="{ row }">
                      <div class="w-full flex  space-x-0">
                        {{ getClazzLabel(row.clazz) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template #default="{ row }">
                      <div class="w-full flex  space-x-0">
                        <el-button size="small" @click="handleTabAction('remove',row)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>

            </el-form>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
 
  <LeftDrawer ref="leftDrawerRef" @set-honour-title-event="setHonourTitleEvent" @set-stu-event="setStuEvent" @set-teach-event="setTeachEvent"></LeftDrawer>
  <RightDrawer ref="rightDrawerRef" @right-add-event="rightAddEvent"/>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {categoryOptions, clazzOptions, Dto, levelOptions} from "@/model";
import UploadImg from "@/components/common/Upload/Img.vue";
import getTextFromImage from "@/service/api/img2word";
import LeftDrawer from './components/LeftDrawer.vue';
import RightDrawer from './components/RightDrawer.vue';
import { unref } from 'vue';
import { toRaw } from 'vue';


// clazzOptions通过value 获取label 
const getClazzLabel = (value: string) => {
  return clazzOptions.find(item => item.value === value)?.label
}
const imageUrl = ref('')
const leftDrawerRef = ref<any>(null)


const handleImg2Word = async () => {
  if (!imageUrl.value) {
    ElMessage.error('请上传图片')
    return
  }
  leftDrawerRef.value.acceptParams( {drawer:true,rowData:await getTextFromImage(imageUrl.value)})
}
const backRoot = () => {
  ElMessage.info('backRoot')
}

const honourModel = reactive<Partial<Dto.Honour>>({})
// form 约束
const rules = {
  title: [
    {required: true, message: '请输入荣誉名称', trigger: 'blur'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  levelId: [
    {required: true, message: '请选择荣誉级别', trigger: 'blur'},
  ],
  categoryId: [
    {required: true, message: '请选择荣誉类别', trigger: 'blur'},
  ],
  actTime: [
    {required: true, message: '请选择获取时间', trigger: 'blur'},
  ],
  term: [
    {required: true, message: '请输入获奖学期', trigger: 'blur'},
  ],
}


//图片上传相关
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref([])
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList)
}
const actTableData = ref<Array<any>>([])
const rightDrawerRef=ref<any>(null)
const handleTabAction=(action:string,row?:any)=>{
  switch (action) {
    case 'add':
      rightDrawerRef.value.drawerVisible=true;
      break;
    case 'remove':
      // 删除actTableData
      actTableData.value.splice(actTableData.value.findIndex((item:any)=>item.id===row.id),1)
      break;
  }
}
const rightAddEvent=(data:any):Boolean=>{
  console.log("heee");
  console.log(toRaw(unref(data)));
  console.log(toRaw(unref(actTableData.value)));
  
  // 查询是否存在过了
  if(actTableData.value.findIndex((item:any)=>item.id===toRaw(unref(data)).id)>-1){
    ElMessage.error('已存在')
    return false;
  }
  actTableData.value.push(toRaw(unref(data)))
  return true;
}

const setHonourTitleEvent = (data: any) => {
  honourModel.title = data
}
const setStuEvent = (data: any) => {
  rightDrawerRef.value.drawerVisible=true
  rightDrawerRef.value.setNameAndRoleEvent(data,"2");
}
const setTeachEvent = (data: any) => {
  rightDrawerRef.value.drawerVisible=true
  rightDrawerRef.value.setNameAndRoleEvent(data,"1");
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  background-size: cover;
  background-image: url("/src/assets/img/upload-bg.jpg");
  color: #8c939d;
  border: 1px dashed var(--el-border-color);
  width: 340px;
  height: 340px;
  text-align: center;
}
</style>