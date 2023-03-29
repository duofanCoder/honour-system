<template>
  <div class="flex flex-wrap h-screen w-screen">
    <div class="flex flex-col items-center w-60 bg-[#545c64] text-white">
      <div class="flex py-6 w-full">
        <h5 class="mb-2 mx-auto">荣誉系统</h5>
      </div>
      <el-menu
        default-active="1-1"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleOpen"
        class="w-full h-[calc(100vh-80px)]"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>荣誉管理</span>
          </template>
          <el-menu-item index="admin-root"> 荣誉列表 </el-menu-item>
          <el-menu-item index="admin-approve">荣誉审批</el-menu-item>
          <el-menu-item index="admin-store">荣誉库</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>用户管理</span>
          </template>
          <el-menu-item index="admin-user">用户管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="w-full flex flex-col w-[calc(100vw-240px)]">
      <div class="flex px-4 w-full border-b border-gray-100">
        <div class="flex gap-4 ml-auto py-4">
          <div class="self-center cursor-pointer">
            <el-avatar class="hover:(bg-gray-300)">
              <i-ep-full-screen class="align-middle"
            /></el-avatar>
          </div>
          <div class="self-center cursor-pointer">
            <el-avatar class="hover:(bg-gray-300)">
              <i-ep-refresh class="align-middle"
            /></el-avatar>
          </div>

          <div class="cursor-pointer mr-4">
            <el-dropdown>
              <div class="flex items-center gap-4">
                <el-avatar
                  size="default"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <div class="text-base font-medium"> 多凡 </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>

      <el-tabs class="px-8 mt-4 flex flex-col" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tab.tabs"
          :key="item.fullPath"
          :label="item.name?.toString()"
          :name="item.name?.toString()"
        >
          <div>
            <router-view></router-view>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useTabStore } from '@/store';
  import { useRoute, useRouter } from 'vue-router';
  const tab = useTabStore();
  const route = useRoute();
  const router = useRouter();
  const handleOpen = (key: string, keyPath: string[]) => {
    router.push({ name: key });
  };

  const removeTab = () => {
    console.log('remove');
  };

  watch(
    () => route.fullPath,
    () => {
      tab.addTab(route);
      tab.setActiveTab(route.fullPath);
    }
  );
</script>
