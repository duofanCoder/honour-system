<template>
  <div>
    <el-card class="h-full">
      <el-form
        size="large"
        :inline="true"
        :model="queryUserModel"
        class="justify-center items-center"
      >
        <el-form-item label="姓名">
          <el-input v-model="queryUserModel.name" size="large" class="" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="queryUserModel.userType" size="large" class="" placeholder="身份">
            <el-option
              v-for="item in userTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="queryUser()">查询</el-button>
          <el-button size="large" type="primary" @click="queryUser()">新增</el-button>
          <el-button size="large" type="danger" @click="queryUser()">删除</el-button>
        </el-form-item>
      </el-form>
      <el-table
        size="large"
        ref="tableRef"
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="id" label="序号" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="age" label="年龄" width="120" />
        <el-table-column label="角色" width="120">
          <template #default="{ row }">
            {{ row.role === '0' ? '管理员' : row.role === '1' ? '老师' : '学生' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
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
  </div>
</template>

<script setup lang="ts">
  import { Dto } from '@/model';
  import { watch } from 'vue';
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  import { reactive } from 'vue';

  const queryUserModel = reactive<Partial<Dto.User>>({});
  const userTypeOptions = [
    { value: '1', label: '老师' },
    { value: '2', label: '学生' },
  ];
  const pageInfo = reactive<Dto.Page<Dto.User>>({
    pageNum: 1,
    pageSize: 10,
  });
  const tableRef = ref(null);

  // 生成用户Dto.User数据的数组
  const generateUserList = (count: number): Partial<Dto.User>[] => {
    const userList: Partial<Dto.User>[] = [];
    for (let i = 0; i < count; i++) {
      userList.push({
        id: i,
        name: 'name' + i,
        username: 'username' + i,
        age: i % 100,
        role: String(i % 3),
        userType: i % 2 === 0 ? '1' : '2',
      });
    }
    console.log(userList);

    return userList;
  };
  const tableData = ref<Partial<Dto.User>[]>([]);

  const queryUser = () => {
    ElMessage.success('查询');
  };
  const handleClick = () => {
    ElMessage.success('点击');
  };
  const handleSelectionChange = (val: Dto.User[]) => {
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

  onMounted(() => {
    tableData.value = generateUserList(pageInfo.pageSize);
    pageInfo.total = 20;
  });
  watch(
    () => pageInfo.pageNum,
    (val) => {
      tableData.value = generateUserList(pageInfo.pageSize);
    }
  );
</script>
