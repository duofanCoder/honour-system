<template>
  <el-config-provider size="small" :z-index="300">
    <div class="min-h-screen flex flex-col justify-between">
      <App class="h-full w-full flex flex-col"></App>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import App from '@/App.vue';</script>
<style></style>
