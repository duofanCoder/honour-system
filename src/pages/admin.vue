<template>
  <div class="flex flex-wrap h-screen w-screen">
    <div class="flex flex-col items-center w-60 bg-[#545c64] text-white">
      <div class="flex py-6 w-full">
        <h5 class="mb-2 mx-auto">荣誉系统</h5>
      </div>
      <el-menu
        :default-active="route.fullPath"
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
          <el-menu-item index="/admin/root"> 荣誉列表 </el-menu-item>
          <el-menu-item index="/admin/approve">荣誉审批</el-menu-item>
          <el-menu-item index="/admin/store">荣誉库</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/user">用户管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="w-full h-full flex flex-col w-[calc(100vw-240px)]">
      <div class="flex">
        <el-tabs
          class="px-6 mt-4 flex flex-col"
          type="card"
          @tab-click="tabClick"
          v-model="tabsMenuValue"
          @tab-remove="tabRemove"
        >
          <el-tab-pane
            v-for="item in getTabRef"
            :key="item.fullPath"
            :closable="item.meta.title?.toString() != 'root'"
            :label="item.meta.title?.toString()"
            :name="item.name?.toString()"
          >
          </el-tab-pane>
        </el-tabs>
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
                  <div class="text-base font-medium"> {{ userStore.userInfo.name }} </div>
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
      </div>
      <div class="px-5.5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useTabStore, useUserStore } from '@/store';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { TabsPaneContext } from 'element-plus/es/components/tabs';
  import { onMounted } from 'vue';
  import { computed } from 'vue';
  const tab = useTabStore();
  const route = useRoute();
  const router = useRouter();

  const userStore = useUserStore();
  const getTabRef = computed(() => {
    return tab.tabs;
  });

  const tabsMenuValue = ref(route.fullPath);
  const handleOpen = (key: string, keyPath: string[]) => {
    router.push({ path: key });
  };

  // Tab Click
  const tabClick = (tabItem: TabsPaneContext) => {
    const name = tabItem.props.name as string;
    router.push({ name: name });
  };

  // Remove Tab
  const tabRemove = (name: any) => {
    const nameR = name as string;
    const nameS = nameR.replace('-', '/');
    tab.removeTab('/' + nameS);
  };

  // 初始化需要固定的标签
  const initTabs = () => {
    tab.iniTabStore(route);
    if (tab.tabs.length == 0) {
      tab.setActiveTab('/admin/root');
      tab.addTab(route);
    }
  };

  onMounted(() => {
    initTabs();
  });
  watch(
    () => route.fullPath,
    () => {
      ElMessage.info('路由变化' + route.fullPath);
      tabsMenuValue.value = route.fullPath;
      tab.addTab(route);
      tab.setActiveTab(route.fullPath);
      tab.cacheTabRoutes();
    }
  );
</script>
