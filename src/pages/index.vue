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

    <div class="flex justify-between h-30 items-center lg:px-60 md:px-50 sm:px-30 px-20">
      <div>累计47个荣誉</div>
      <div class="flex gap-4">
        <el-input size="large" placeholder="请输入内容"></el-input>
        <ElButton size="large" type="primary">搜索</ElButton>
      </div>
    </div>
    <div class="lg:px-60 md:px-50 sm:px-30 px-20 grid lg:grid-cols-2 md:grid-cols-1">
      <div
        class="w-full mr-6 mb-6 pr-8"
        v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="index"
        @click="toDetail(item)"
      >
        <HonourCard />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { router } from '@/router';

  const toDetail = (item: any) => {
    console.log('niho');

    router.push({ path: '/detail', query: { id: item } });
  };
</script>
<style scoped></style>
