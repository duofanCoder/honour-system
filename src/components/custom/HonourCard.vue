<template>
  <div>
    <!-- 卡片，右边是图片，左侧，从上到下是标题，关联教师，内容，关联学生，内容 -->
    <el-card class="box-card hover:cursor-pointer">
      <div class="flex gap-4">
        <div class="w-2/5 h-full">
          <el-image round fit="cover" style="width: 100%; height: 200px" :src="getUrl"></el-image>
        </div>
        <div class="w-3/5">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col bg-yellow-200 rounded py-3 px-2">
              <div>{{ honour.title }}</div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-blue-400"><span class="mr-2">|</span>获奖教师</div>
              <div class="text-size-[12px] font-semibold">
                <span v-for="(item,index) in props.honour.actTea" :key="index">
                  {{ item.name }} {{ index!=props.honour.actTea.length-1?'、':'' }}
                </span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-blue-400"><span class="mr-2">|</span>获奖学生</div>
              <div class="flex text-size-[12px] font-semibold">
                <span v-for="(item,index) in props.honour.actStu" :key="index">
                  {{ item.name }} {{ index!=props.honour.actStu.length-1?'、':'' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    honour: any;
  }>();

  const getUrl = computed(() => {
    if (!props.honour.thumbList)
      return 'https://bpic.588ku.com/element_origin_min_pic/19/04/10/e87e154ddafd724a915a119fb21c38b9.jpg';
    return props.honour.thumbList.split(',')[0];
  });
</script>
