<!-- 使用element、windcss、setup语法 实现一个登录界面以及基本的检验登录操作SFC组件  -->
<template>
  <!-- 登陆页面添加炫酷的背景-->
  <div class="w-full h-screen bg-cover bg-center">
    <div class="w-full h-full">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <div
          class="<sm:(flex flex-col px-6 pb-4) h-screen px-6 md:px-24 mx-auto flex gap-10 justify-center items-center"
        >
          <img
            class="<sm:(absolute) sm:w-2/3 lg:w-4/5 md:w-3/5 w-full"
            src="@/assets/img/login_left0-87c63f1f.png"
            alt=""
          />
          <el-form
            class="sm:w-1/3 lg:w-1/5 md:w-2/5"
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            label-position="top"
            label-width="100px"
            size="large"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { toRaw } from 'vue';
  import { unref } from 'vue';
  import { useUserStore } from '@/store';
  import { FormInstance } from 'element-plus';
  const loginFormRef = ref<FormInstance>();
  const loginForm = reactive({
    username: '',
    password: '',
  });
  const store = useUserStore();
  const loginRules = ref({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });
  const onLogin = () => {
    if (!loginFormRef.value) return;
    loginFormRef.value.validate((valid) => {
      if (valid) {
        const info = toRaw(unref(loginForm));
        store.login(info.username, info.password);
      } else {
        return false;
      }
    });
    // 密码校验
  };
</script>
