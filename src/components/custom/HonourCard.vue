<template>
    <div>
        <!-- 卡片，右边是图片，左侧，从上到下是标题，关联教师，内容，关联学生，内容 -->
        <el-card class="box-card hover:cursor-pointer   ">
            <div class="flex gap-4">
                <div class="w-2/5  h-full">
                    <el-image
                        round
                        fit="cover"
                        style="width: 100%; height: 200px"
                        :src="honour.image"
                    ></el-image>
                </div>
                <div class="w-3/5">
                    <div class="flex flex-col gap-4 ">
                        <div class="flex flex-col bg-yellow-200 rounded  py-3 px-2">
                            <div>{{honour.title}}</div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="text-blue-400"><span class="mr-2 ">|</span>获奖教师</div>
                            <div class=" text-size-[12px] font-semibold ">{{honour.teacher.name}}</div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class=" text-blue-400"><span class="mr-2">|</span>获奖学生</div>
                            <div class="flex text-size-[12px] font-semibold" >
                                <span v-for="(student,index) in honour.students" :key="index">{{student.name}}、</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const honour = reactive({
    title: "教师荣誉",
    image: "https://img.yzcdn.cn/vant/apple-1.jpg",
    teacher: {
        name: "张三"
    },
    content: "教师荣誉内容",
    students: [
        {
            name: "张三"
        },
        {
            name: "李四"
        }
    ]
})
</script>