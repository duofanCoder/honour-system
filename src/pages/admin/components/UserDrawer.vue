<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form
        ref="ruleFormRef"
        label-width="100px"
        label-suffix=" :"
        :rules="rules"
        :disabled="drawerProps.isView"
        :model="drawerProps.rowData"
        :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="drawerProps.rowData!.username" placeholder="请输入用户名"
                  :disabled="drawerProps.title!=='新增'"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="drawerProps.rowData!.name" placeholder="请输入用户名字"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="drawerProps.rowData!.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model=" drawerProps.rowData!.role" placeholder="请选择角色">
          <el-option
              v-for="item in typeTreeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="clazz">
        <el-select v-model=" drawerProps.rowData!.clazz" placeholder="请选择班级">
          <el-option
              v-for="item in clazzOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {isUndefined} from "lodash";
import {clazzOptions} from "@/model/enum";

const rules = reactive({
  name: [{required: true, message: "请输入名称"}],
  username: [{required: true, message: "请输入用户名"}],
  role: [{required: true, message: "请选择角色"}],
  age: [{required: true, message: "请输入年龄"}]
});

const typeTreeData = ref([
  {label: "老师", value: "1"},
  {label: "学生", value: "2"}
]);
onMounted(() => {
});

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData?: any;
  api?: (params: any) => Promise<any>;
  getTableList?: () => Promise<any>;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.rowData);

      ElMessage.success({message: `${drawerProps.value.title}用户成功！`});
      if (!isUndefined(drawerProps.value.getTableList)) {
        drawerProps.value.getTableList();
      }
      drawerVisible.value = false;
      console.log(drawerVisible.value);
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
