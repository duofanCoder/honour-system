<template>
  <div class="flex flex-col">
    <div class="flex justify-between lg:px-60 md:px-50 sm:px-30 px-20 py-8">
      <!-- 圆形 -->
      <div class="md:text-3xl text-xl flex items-center gap-4">
        <div class="w-6 h-6 rounded-full bg-blue-500"></div>
        <div>荣誉墙</div>
      </div>
      <div class="flex mr-14 gap-8">
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
        <el-carousel-item v-for="item in imgList" :key="item" class="">
          <ElImage fit="cover" class="w-full h-full" :src="item"></ElImage>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex justify-center lg:px-60 md:px-50 sm:px-30 px-20 mb-20">
      <div class="flex flex-col w-1/2 bg-[#31CCEC] h-80 text-white">
        <div class="ml-20 mt-5 space-y-5">
          <div class="mt-12"> <span>| </span><span>标题</span> </div>
          <div><span>获奖级别:</span>国家级</div>
          <div> <span>获奖学期</span><span>第一学期</span> </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <div class="flex bg-teal-200 h-16 justify-center"><span class="my-auto">获奖人</span></div>
        <div class="w-full h-full flex justify-center bg-violet-300">
          <div class="self-center flex gap-4 flex-col">
            <span>老师：张三、李四、王五</span>
            <span>学生：张三、李四、王五</span>
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
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const id = route.query.id || ('空' as string);
  // 生成4张轮播图的图片
  const imgList = Array.from({ length: 4 }, (v, k) => k + 1).map(
    (item) => `https://picsum.photos/id/${item}/600/300`
  );
</script>
