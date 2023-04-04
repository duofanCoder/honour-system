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
        v-if="dataTable != null && dataTable.list.length > 0"
        class="w-full mr-6 mb-6 pr-8"
        v-for="(item, index) in dataTable.list"
        :key="index"
        @click="toDetail(item)"
      >
        <HonourCard :honour="item" />
      </div>
    </div>
    <!-- footer -->
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
  import { router } from '@/router';
  import { fetchQueryHonour } from '@/service';
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import { reactive } from 'vue';

  const initParam = reactive({
    aproveStatus: '1',
    recommendStatus: '1',
  });

  const dataTable = ref<null | any>(null);

  const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    return fetchQueryHonour({ query: newParams, pageNum: 0, size: 999 });
  };
  const dataCallback = (data: any) => {
    return {
      list: data.records,
      total: data.total,
      pageNum: data.current,
      pageSize: data.size,
    };
  };

  onMounted(() => {
    getTableList(initParam).then((res) => {
      dataTable.value = dataCallback(res.data) as any;
    });
  });

  const toDetail = (item: any) => {
    router.push({ path: '/detail', query: { id: item.id } });
  };
</script>
<style scoped></style>
