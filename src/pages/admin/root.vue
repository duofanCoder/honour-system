<template>
  <div>
    <el-card class="overflow-hidden overscroll-auto">
      <el-form
          size="large"
          :inline="true"
          :model="queryHonourModel"
          label-position="left"
          label-width="70px"
          class="items-center flex flex-wrap"
      >
        <el-form-item label="荣誉名称">
          <el-input v-model="queryHonourModel.title" class="w-60"/>
        </el-form-item>
        <el-form-item label="获得者">
          <el-input v-model="queryHonourModel.actUser" class="w-60"/>
        </el-form-item>
        <el-form-item label="班级" v-if="moreButtonRef">
          <el-select v-model="queryHonourModel.clazz" class="w-60">
            <el-option
                v-for="item in HonourTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学期" v-if="moreButtonRef">
          <el-select v-model="queryHonourModel.term" class="w-60">
            <el-option
                v-for="item in HonourTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="荣誉类别" v-if="moreButtonRef">
          <el-select v-model="queryHonourModel.categoryId" class="w-60">
            <el-option
                v-for="item in HonourTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="荣誉级别" v-if="moreButtonRef">
          <el-select v-model="queryHonourModel.levelId" class="w-60">
            <el-option
                v-for="item in HonourTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="获奖起" v-if="moreButtonRef">
          <el-date-picker
              v-model="queryHonourModel.actCreateTime"
              type="daterange"
              range-separator="To"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="large" @click="queryHonour()">查询</el-button>
          <el-button v-if="moreButtonRef" link type="primary" size="small" @click="moreButtonRef = false">收起</el-button>
          <el-button class="ml-4" v-else link type="primary" size="small" @click="moreButtonRef = true">更多</el-button>
        </el-form-item>
      </el-form>
      <div class="flex flex-col gap-4 mb-4">
        <el-button-group size="large">
          <el-button type="primary"> 我创建的</el-button>
          <el-button type="primary">关联我的</el-button>
        </el-button-group>
        <div>
          <el-button size="large" type="primary" @click=toCreate()>新增</el-button>
          <el-button size="large" type="danger" @click="queryHonour()">删除</el-button>
        </div>
      </div>

      <el-table
          border
          height="660"
          size="large"
          ref="tableRef"
          @sortChange="sortChange"
          @selection-change="handleSelectionChange"
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column fixed prop="id" label="序号" width="70"/>
        <el-table-column prop="title" label="荣誉名称" width="120"/>
        <el-table-column prop="levelId" label="级别" width="120" sortable="custom"/>
        <el-table-column prop="categoryId" label="类别" width="120" sortable="custom"/>
        <el-table-column label="关联教师" width="120">
          <template #default="{ row }">
            <el-tag size="small">教师1</el-tag>
            <el-tag size="small">教师2</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="关联关联" width="120">
          <template #default="{ row }">
            <el-tag size="small">关联1</el-tag>
            <el-tag size="small">关联2</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="学期" width="120" sortable="custom">
          <template #default="{ row }">
            <el-tag size="small">学期1</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="获奖日期" width="120" sortable="custom">
          <template #default="{ row }">
            {{ row.actTime }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120">
          <template #default="{ row }">
            <el-tag type='warning' v-if="row.aproveStatus=='0'">待审核</el-tag>
            <el-tag type='danger' v-if="row.aproveStatus=='1'">待审核</el-tag>
            <el-tag v-if="row.aproveStatus=='3'">审核通过</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="推荐状态" width="120">
          <template #default="{ row }">
            <el-tag type="warning" v-if="row.recommendStatus=='0'">未推荐</el-tag>
            <el-tag v-if="row.recommendStatus=='1'">推荐</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="荣誉状态" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="openHonourStatus(row)">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template #default="{row}">
            <el-button type="primary" link @click="openDrawer('编辑', row)">编辑</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="ml-auto mt-4">
        <el-pagination
            v-model:current-page="pageInfo.pageNum"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30]"
            szie="large"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <HonourDrawer ref="HonourDrawerRef"/>
  </div>
</template>

<script setup lang="ts">
import {Dto} from '@/model';
import {onMounted, reactive, ref, watch} from 'vue';
import HonourDrawer from './components/HonourListDrawer.vue';
import {fetchQueryHonour, fetchSaveHonour, fetchUpdateHonour} from '@/service';
import {router} from "@/router";

const queryHonourModel = reactive<Partial<Dto.Honour>>({});
const moreButtonRef = ref(false);
const HonourTypeOptions = [
  {value: '1', label: '老师'},
  {value: '2', label: '学生'},
];
const pageInfo = reactive<Dto.Page<Dto.Honour>>({
  pageNum: 1,
  pageSize: 10,
});
const tableRef = ref(null);

// 生成用户Dto.Honour数据的数组
const generateHonourList = (count: number): Partial<Dto.Honour>[] => {
  const HonourList: Partial<Dto.Honour>[] = [];
  for (let i = 0; i < count; i++) {
    HonourList.push({
      id: i,
      title: 'name' + i,
      categoryId: String(i % 3),
      levelId: String(i % 3),
      recommendStatus: String(i % 2),
      aproveStatus: String(i % 2),
    });
  }
  return HonourList;
};
const tableData = ref<Partial<Dto.Honour>[]>([]);

const queryHonour = () => {
  ElMessage.success('查询');
};
const handleSelectionChange = (val: Dto.Honour[]) => {
  const sr = val.map((item) => item.id).join(',');
  ElMessage.success('选择' + sr);
};

const handleSizeChange = (val: number) => {
  pageInfo.pageSize = val;
  ElMessage.success('每页' + val + '条');
};
const handleCurrentChange = (val: number) => {
  pageInfo.pageNum = val;
  ElMessage.success('第' + val + '页');
};

const openHonourStatus = (row: Dto.Honour) => {
  ElMessage.success('查看' + row.id);
}
onMounted(() => {
  tableData.value = generateHonourList(pageInfo.pageSize);
  pageInfo.total = 20;
});
watch(
    () => pageInfo.pageNum,
    (val) => {
      tableData.value = generateHonourList(pageInfo.pageSize);
    }
);


/**
 * @description 获取表格数据
 * @return void
 * */
const getTableList = async () => {
  try {
    // 先把初始化参数和分页参数放到总参数里面

    Object.assign(
        pageInfo,
        {query: JSON.stringify(queryHonourModel)}
    );

    let {data} = await fetchQueryHonour(pageInfo);
    if (data == null) {
      return
    }

    // 解构后台返回的分页数据 (如果有分页更新分页信息)
    const {pageNum, pageSize, total} = data;
    pageInfo.pageNum = pageNum;
    pageInfo.pageSize = pageSize;
    pageInfo.total = total;
  } catch (error) {
    console.log(error);
  }
};

// 打开 drawer(新增、查看、编辑)
const HonourDrawerRef = ref();
const openDrawer = (title: string, rowData: Partial<Dto.Honour> = {}) => {
  let params = {
    title,
    rowData: {...rowData},
    isView: title === "查看",
    api: title === "新增" ? fetchSaveHonour : title === "编辑" ? fetchUpdateHonour : "",
    getTableList: getTableList
  };
  HonourDrawerRef.value.acceptParams(params);
};

const sortChange = (column: any, prop: string, order: string) => {
  console.log(column, prop, order);
  console.log(column.order)
  console.log(column.prop)
}
const toCreate = () => {
  router.push({path: '/admin/create'})
}
</script>
