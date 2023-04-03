<template>
  <div>
    <el-card>
      <ProTable
        ref="proTable"
        title="荣誉列表"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :dataCallback="dataCallback"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button-group size="default" class="mb-3">
            <el-button type="primary" @click="selectByPage(1)"> 我创建的</el-button>
            <el-button type="primary" @click="selectByPage(2)">关联我的</el-button>
          </el-button-group>
          <br />
          <el-button type="primary" size="default" :icon="CirclePlus" @click="openDrawer('新增')"
            >新增荣誉
          </el-button>
          <el-button type="primary" size="default" :icon="Download" plain @click="downloadFile"
            >导出荣誉数据
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            size="default"
            plain
            @click="batchDelete(scope.selectedListIds)"
            :disabled="!scope.isSelected"
          >
            批量删除荣誉
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
            >编辑</el-button
          >
          <el-button type="primary" link :icon="Delete" @click="deleteHonour(scope.row)"
            >删除</el-button
          >
        </template>
      </ProTable>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ColumnProps } from '@/components/common/ProTable/interface';
  import { categoryOptions, Dto, levelOptions, termOptions } from '@/model';
  import { reactive, ref } from 'vue';
  import {
    fetchQueryHonour,
    fetchRemoveHonour,
  } from '@/service';
  import { useRouter } from 'vue-router';
  import { CirclePlus, Delete, Download, EditPen } from '@element-plus/icons-vue';
  import { useHandleData } from '@/hooks';
  import { covertToEnumProps } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';

  const router = useRouter();
  // 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
  const proTable = ref();

  // 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
  const initParam = reactive({
    createrUser: undefined,
    actUsers: undefined,
  });
  const selectByPage=(type: number)=>{
    if(type===1){
      initParam.createrUser = '1' as any;
      initParam.actUsers = undefined;
    }else{
      initParam.createrUser = undefined;
      initParam.actUsers = '1' as any;
    }
  }


  // dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
  const dataCallback = (data: any) => {
    return {
      list: data.records,
      total: data.total,
      pageNum: data.current,
      pageSize: data.size,
    };
  };

  // 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
  // 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
  const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    newParams.username && (newParams.username = 'custom-' + newParams.username);
    return fetchQueryHonour(newParams);
  };

  // 表格配置项
  const columns: ColumnProps[] = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    {
      prop: 'title',
      label: '荣誉名称',
      width: 120,
      search: { el: 'input' }
    },
    {
      prop: 'levelId',
      label: '级别',
      sortable: true,
      width: 150,
      search: { el: 'select', props: { filterable: true } },
      enum: covertToEnumProps(levelOptions),
      fieldNames: { label: 'dictLabel', value: 'dictValue' },
    },
    {
      prop: 'categoryId',
      width: 100,
      sortable: true,
      label: '类别',
      search: { el: 'select', props: { filterable: true } },
      enum: covertToEnumProps(categoryOptions),
      fieldNames: { label: 'dictLabel', value: 'dictValue' },
    },
    {
      prop: 'actTeach',
      label: '关联教师',
      width: 140,
      search: { el: 'input' },
    },
    {
      prop: 'actStu',
      label: '关联学生',
      width: 140,
      search: { el: 'input' },
    },
    {
      prop: 'term',
      sortable: true,
      label: '学期',
      width: 130,
      search: { el: 'select', props: { filterable: true } },
      enum: covertToEnumProps(termOptions),
      fieldNames: { label: 'dictLabel', value: 'dictValue' },
    },
    {
      prop: 'actTime',
      label: '获奖时间',
      width: 140,
      search: {
        el: 'date-picker',
        span: 1,
        props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' },
        // defaultValue: ['2023-04-01', '2023-04-08'],
      },
    },
    { prop: 'operation', label: '操作', fixed: 'right', width: 300 },
  ];

  // 删除用户信息
  const deleteHonour = async (params: Dto.Honour) => {
    await useHandleData(fetchRemoveHonour, { ids: [params.id] }, `删除【${params.title}】用户`);
    proTable.value.getTableList();
  };

  // 批量删除用户信息
  const batchDelete = async (id: string[]) => {
    proTable.value.clearSelection();
    proTable.value.getTableList();
  };


  // 导出用户列表
  const downloadFile = async () => {
    ElMessageBox.confirm('确认导出数据?', '温馨提示', { type: 'warning' }).then(() =>
      console.log('导出数据')
    );
  };

  const openDrawer = (title: string, rowData: Partial<Dto.Honour> = {}) => {
    if (title === '新增') {
      router.push({ path: '/admin/create' });
    }else{
      router.push({ path: '/admin/create',query: { id: rowData.id } });
    }
    
  };
</script>

<style scoped></style>
