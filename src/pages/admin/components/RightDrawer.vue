<template>
<div>
  <el-drawer  v-model="drawerVisible" size="60%" title="获奖人添加" :modal="false" append-to-body >
    <ProTable
        ref="proTableRef"
        title="用户列表"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :dataCallback="dataCallback"
      >
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="CirclePlus" @click="openDrawer( scope.row)"
            >添加</el-button
          >
        </template>
      </ProTable>
  </el-drawer>
</div>
</template>

<script setup lang="ts">
import { ColumnProps } from '@/components/common/ProTable/interface';
import { roleOptions1 } from '@/model';
import { fetchQueryUser } from '@/service';
import { covertToEnumProps } from '@/utils/common';
import { CirclePlus} from '@element-plus/icons-vue';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';

const props=defineProps(
  {drawer: {type: Boolean, default: false}}
)

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTableRef = ref<any>(null);
const searchKey=ref("");
const searchRole=ref("");
const drawerVisible = ref(props.drawer);
const openDrawer = (row:any) => {
  console.log(row);
  addEvent(row);
}


const addEvent = (row: any) => {
    emit("rightAddEvent", row)
}

type Emits = {
	(e: "rightAddEvent", val: string): void;
};
const emit=defineEmits<Emits>();
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
  return {
    list: data.records,
    total: data.total,
    pageNum: data.current,
    pageSize: data.size
  };
};
const setNameAndRoleEvent = (name:string ,role:string) => {
  searchKey.value=name;
  searchRole.value=role;
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.username && (newParams.username = "custom-" + newParams.username);
  return fetchQueryUser(newParams);
};
onMounted(() => {
  if(proTableRef.value){
    proTableRef.value.searchParam={name:"asdasd"}
    proTableRef.value.isShowSearch=false;
  }
  
  // proTableRef.value.refreshTable();
});

// 表格配置项
const columns: ColumnProps[] = [
  {type: "selection", fixed: "left", width: 80},
  {type: "index", label: "#", width: 80},
  {
    prop: "username",
    label: "用户名", width: 120,
  }, 
  {
    prop: "name",
    label: "姓名",
    width: 150,
    search: {el: "input"}
  },
  {
    prop: "role",
    label: "角色", width: 70,
    search: {el: "select", props: {filterable: true}},
    enum: covertToEnumProps(roleOptions1),
    fieldNames: {label: "dictLabel", value: "dictValue"}
  },
  {prop: "operation", label: "操作", fixed: "right", width: 300}
];


defineExpose({
  proTableRef,
  drawerVisible,
  setNameAndRoleEvent
})
</script>