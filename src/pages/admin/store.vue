<template>
  <div>
    <el-card>
      <ProTable
        ref="proTable"
        title="荣誉库"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :dataCallback="dataCallback"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" size="default" :icon="Download" plain @click="downloadFile"
            >导出荣誉数据
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #actTea="scope">
          <span v-for="(item,index) in scope.row!.actTea" :key="index">
            {{ item.name }} {{ index!=scope.row.actTea.length-1?'、':'' }}
          </span>
			</template>
        <template #actStu="scope">
          <span v-for="(item,index) in scope.row!.actStu" :key="index">
              {{ item.name }}{{ index!=scope.row.actStu.length-1?'、':'' }}
          </span>
			</template>
        <template #operation="scope">
          <el-dropdown class="mr-3">
            <el-button type="primary">
              审核<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="downButton(0, '1', scope.row)">通过</el-dropdown-item>
                <el-dropdown-item @click="downButton(0, '2', scope.row)">驳回</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <el-button type="primary">
              推荐<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="downButton(1, '1', scope.row)">推荐</el-dropdown-item>
                <el-dropdown-item @click="downButton(1, '0', scope.row)">不推荐</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </ProTable>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ColumnProps } from '@/components/common/ProTable/interface';
  import { categoryOptions, levelOptions, termOptions } from '@/model';
  import { reactive, ref } from 'vue';
  import { fetchQueryHonour, fetchRecommendHonour, fetchApproveHonour } from '@/service';

  import { Download, ArrowDown } from '@element-plus/icons-vue';
  import { covertToEnumProps } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';

  // 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
  const proTable = ref();

  // 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
  const initParam = reactive({
    createrUser: undefined,
    aproveStatus: '1',
    actUsers: undefined,
  });

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
    let query=JSON.parse(params.query);
    let names=new Array()
    if(query.actTea){
      names.push(query.actTea);
    }
    if(query.actStu){
      names.push(query.actStu);
    }
    query.actTea=undefined;
    query.actStu=undefined;
    query.actUsers=names.join(',');
    params.query=JSON.stringify(query);
    console.log(params);
    
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
      search: { el: 'input' },
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
      prop: 'actTea',
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

  const downloadFile = async () => {
    ElMessageBox.confirm('确认导出数据?', '温馨提示', { type: 'warning' }).then(() =>
      console.log('导出用户数据')
    );
  };

  const downButton = (type: number, status: string, row: any) => {
    if (type === 0) {
      fetchApproveHonour(row.id, status).then((res) => {
        ElMessageBox.alert('操作成功', '提示');
        proTable.value.getTableList();
      });
    } else if (type === 1) {
      fetchRecommendHonour(row.id, status).then((res) => {
        ElMessageBox.alert('操作成功', '提示');
        proTable.value.getTableList();
      });
    }
  };
</script>

<style scoped></style>
