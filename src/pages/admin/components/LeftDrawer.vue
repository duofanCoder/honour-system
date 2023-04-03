<template>
    <div>
  <el-drawer  v-model="drawer" direction="ltr" border  size="30%"  :modal="false" append-to-body>
    <el-table :data="drawerProps" style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column prop="word" label="内容" width="200" />
    <el-table-column  label="操作" >
        <template #default="scope">
           <div class="flex gap-0">
            <el-button class="px-0 mx-0"  link size="small" @click="handleTitle(scope.row)">复制到名称</el-button>
            <el-button class="px-0 mx-0"  link size="small" @click="handleTeach(scope.row)">关联教师</el-button>
            <el-button class="px-0 mx-0"  link size="small" @click="handleStu(scope.row)">关联学生</el-button>
           </div>
        </template>
    </el-table-column>
  </el-table>
  </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props=defineProps({
    drawerOpen: {
        type: Boolean,
        default: false,
    },

})
const drawerProps = ref([]);
const drawer=ref(props.drawerOpen)

// 接收父组件传过来的参数
const acceptParams = (params?: any): void => {
    drawer.value = params.drawer;
    drawerProps.value=params.rowData.map((item: any) => {
        return {
            word: item.words
        }
    });
}
const handleTitle = (row: any) => {
    emit("setHonourTitleEvent", row.word)
}
const handleTeach = (row: any) => {
    emit("setTeachEvent", row.word)
}
const handleStu = (row: any) => {
    emit("setStuEvent", row.word)
}

type Emits = {
	(e: "setTeachEvent", val: string): void;
	(e: "setStuEvent", val: string): void;
	(e: "setHonourTitleEvent", val: string): void;
};
const emit = defineEmits<Emits>();

defineExpose({
  acceptParams,
  drawer
});
</script>