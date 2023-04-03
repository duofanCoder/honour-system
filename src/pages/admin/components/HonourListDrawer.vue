<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}荣誉`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="轮播图" prop="avatar">
				<el-upload
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					list-type="picture-card"
				>
					<el-icon><Plus /></el-icon>
				</el-upload>
			</el-form-item>
			
			<el-form-item label="荣誉名" prop="username">
				<el-input v-model="drawerProps.rowData!.username" placeholder="请输入荣誉名"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请输入荣誉名字"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="typeId">
				<el-tree-select
					v-model="drawerProps.rowData!.typeId"
					:data="typeTreeData"
				/>
			</el-form-item>
			<el-form-item label="简介" prop="description">
				<el-input v-model="drawerProps.rowData!.description" placeholder="请输入内容" type="textarea"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="PostDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { isUndefined } from "lodash";
import { Plus } from '@element-plus/icons-vue'

const rules = reactive({
	title: [{ required: true, message: "请输入荣誉名称" }],
	typeId: [{ required: true, message: "请选择上级荣誉" }]
});

const typeTreeData = ref([
	{label:"老师",value:"1"},
	{label:"学生",value:"2"}
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
			ElMessage.success({ message: `${drawerProps.value.title}荣誉成功！` });
			if (!isUndefined(drawerProps.value.getTableList)) {
				drawerProps.value.getTableList();
			}

			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
