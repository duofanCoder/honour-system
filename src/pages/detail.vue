<template>
  <div class="flex flex-col">
    <div class="flex justify-between lg:px-60 md:px-50 sm:px-30 px-20 py-8">
      <!-- 圆形 -->
      <div class="md:text-3xl text-xl flex items-center gap-4">
        <div class="w-6 h-6 rounded-full bg-blue-500"></div>
        <div>荣誉墙</div>
      </div>
      <div class="flex gap-8">
        <router-link to="/">
          <el-button type="primary" size="large">首页</el-button>
        </router-link>
        <router-link to="login">
          <el-button type="primary" size="large">登录</el-button>
        </router-link>
      </div>
    </div>
    <div class="flex bg-gray-100 h-12 items-center">
      <div class="lg:px-60 md:px-50 sm:px-30 px-20"> 荣誉历史 </div>
    </div>

    <!-- 使用element 组件轮播图 -->
    <div class="lg:px-60 md:px-50 sm:px-30 px-20">
      <el-carousel class="mx-auto lg:px-350px md:h-300px sm:h-270px h-250px">
        <el-carousel-item v-for="item in honour.thumbList" :key="item" class="">
          <ElImage fit="cover" class="w-full h-full" :src="item"></ElImage>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex justify-center lg:px-60 md:px-50 sm:px-30 px-20 mb-20">
      <div class="flex flex-col w-1/2 bg-[#31CCEC] h-80 text-white">
        <div class="ml-20 mt-5 space-y-5">
          <div class="mt-12">
            <span>| </span><span>{{ honour.title }}</span>
          </div>
          <div><span>获奖级别:</span>{{ honour.level }}</div>
          <div>
            <span>获奖学期</span><span>{{ honour.term }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <div class="flex bg-teal-200 h-16 justify-center"><span class="my-auto">获奖人</span></div>
        <div class="w-full h-full flex justify-center bg-violet-300">
          <div class="self-center flex gap-4 flex-col">
            <span>老师：{{ honour.teacher }}</span>
            <span>学生：{{ honour.student }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between lg:px-60 md:px-50 sm:px-30 px-20 py-8 bg-gray-100">
      <div>联系我们</div>
      <div>关于我们</div>
      <div>使用帮助</div>
      <div>免责声明</div>
      <div>隐私政策</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchHonour } from '@/service';
  import { onMounted } from 'vue';
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { levelOptions, termOptions } from '@/model';
  const route = useRoute();
  const id = route.query.id || ('空' as string);
  const honour = reactive({
    id: 1,
    title: '国家级荣誉',
    thumbList:[
      'https://picsum.photos/id/1/600/300,https://picsum.photos/id/2/600/300,https://picsum.photos/id/3/600/300,https://picsum.photos/id/4/600/300'],
    level: '国家级',
    term: '第一学期',
    teacher: '张三、李四、王五',
    student: '张三、李四、王五',
  });
  // levelOptions 通过value 获取label
  const getLabelByValue = (value: string, ops: any) => {
    const level = ops.find((item: { value: string }) => item.value === value);
    return level ? level.label : '';
  };

  onMounted(() => {
    fetchHonour(id as string).then((res) => {
      if (res.error == null) {
        console.log(res.data);
        honour.id = res.data.id;
        honour.title = res.data.title;
        honour.thumbList = res.data.thumbList;
        honour.level = getLabelByValue(res.data.levelId, levelOptions);
        honour.term = getLabelByValue(res.data.term, termOptions);
        if(res.data.thumbList != null && res.data.thumbList!="" && res.data.thumbList.length>0){
          honour.thumbList=res.data.thumbList.split(",")
          console.log(honour.thumbList);
        }
        honour.teacher =
          res.data.actTea != null ? res.data.actTea.map((item: any) => item.name).join('、') : '';
        honour.student =
          res.data.actStu != null ? res.data.actStu.map((item: any) => item.name).join('、') : '';
      }
    });
  });

</script>
