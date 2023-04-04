<template>
  <div>
    <el-card>
      <ProTable
        ref="proTable"
        title="用户列表"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :dataCallback="dataCallback"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
            >新增用户
          </el-button>
          <el-button type="primary" :icon="Download" plain @click="downloadFile"
            >导出用户数据
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            plain
            @click="batchDelete(scope.selectedListIds)"
            :disabled="!scope.isSelected"
          >
            批量删除用户
          </el-button>
        </template>
        <!-- createTime -->
        <template #createTime="scope">
          <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
            {{ scope.row.createTime }}
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)"
            >查看</el-button
          >
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
            >编辑</el-button
          >
          <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)"
            >重置密码</el-button
          >
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)"
            >删除</el-button
          >
        </template>
      </ProTable>
    </el-card>
    <UserDrawer ref="userDrawerRef" />
  </div>
</template>

<script setup lang="ts">
  import { ColumnProps } from '@/components/common/ProTable/interface';
  import { clazzOptions, Dto, roleOptions } from '@/model';
  import { reactive, ref } from 'vue';
  import {
    fetchQueryUser,
    fetchRemoveUser,
    fetchResetUser,
    fetchSaveUser,
    fetchUpdateUser,
  } from '@/service';
  import { CirclePlus, Delete, Download, EditPen, Refresh, View } from '@element-plus/icons-vue';
  import UserDrawer from './components/UserDrawer.vue';
  import { useHandleData } from '@/hooks';
  import { covertToEnumProps } from '@/utils/common';
  import { ElMessage } from 'element-plus';

  // 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
  const proTable = ref();

  // 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
  const initParam = reactive({});

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
    return fetchQueryUser(newParams);
  };

  // 表格配置项
  const columns: ColumnProps[] = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    {
      prop: 'username',
      label: '用户名',
      width: 120,
    },
    {
      prop: 'name',
      label: '姓名',
      width: 150,
      search: { el: 'input' },
    },
    {
      prop: 'age',
      width: 70,
      label: '年龄',
    },
    {
      prop: 'clazz',
      label: '班级',
      width: 140,
    },
    {
      prop: 'role',
      label: '角色',
      width: 70,
      search: { el: 'select', props: { filterable: true } },
      enum: covertToEnumProps(roleOptions),
      fieldNames: { label: 'dictLabel', value: 'dictValue' },
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 130,
    },
    { prop: 'operation', label: '操作', fixed: 'right', width: 300 },
  ];

  // 删除用户信息
  const deleteAccount = async (params: Dto.User) => {
    await useHandleData(fetchRemoveUser, { ids: [params.id] }, `删除【${params.name}】用户`);
    proTable.value.getTableList();
  };

  // 批量删除用户信息
  const batchDelete = async (id: string[]) => {
    fetchRemoveUser({ ids: id }).then(() => {
      ElMessage.success('批量删除成功');
      proTable.value.clearSelection();
      proTable.value.getTableList();
    });
  };

  // 重置用户密码
  const resetPass = async (params: Dto.User) => {
    fetchResetUser(params.id).then(() => {
      ElMessage.success('重置密码成功');
      proTable.value.getTableList();
    });
  };

  // 导出用户列表
  const downloadFile = async () => {
    ElMessageBox.confirm('确认导出用户数据?', '温馨提示', { type: 'warning' }).then(() =>
      console.log('导出用户数据')
    );
  };

  // 打开 drawer(新增、查看、编辑)
  const userDrawerRef = ref();
  const openDrawer = (title: string, rowData: Partial<Dto.User> = {}) => {
    let params = {
      title,
      rowData: { ...rowData },
      isView: title === '查看',
      api: title === '新增' ? fetchSaveUser : title === '编辑' ? fetchUpdateUser : '',
      getTableList: proTable.value.getTableList,
    };
    userDrawerRef.value.acceptParams(params);
  };
</script>

<style scoped></style>
