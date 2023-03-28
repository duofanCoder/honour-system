<!-- 使用element、windcss、setup语法 实现一个登录界面以及基本的检验登录操作SFC组件  -->
<template>
  <!-- 登陆页面添加炫酷的背景-->
  <div class="w-full h-screen bg-cover bg-center"
       style="background-image: url('./src/assets/img/bg-index.73c9775d.png')">
    <div class="w-full h-full bg-black opacity-50">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-1/3 h-screen mx-auto flex flex-col justify-center items-center">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-position="top" label-width="100px"
                   size="large">
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
import {reactive, ref} from "vue";
// import { login } from "@/api/login";
import {useRouter} from "vue-router";

const loginFormRef = ref(null);
const loginForm = reactive({
  username: "",
  password: "",
});
const loginRules = ref({
  username: [{required: true, message: "请输入用户名", trigger: "blur"}],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
});
const router = useRouter();

const onLogin = () => {
  (loginFormRef as any).validate(async (valid: any) => {
    if (!valid) return;
    // const res = await login(loginForm.value);
    // if (res.code === 200) {
    //   router.push("/home");
    // }
  });
};
</script>