<template>
  <div class="login">
    <div class="left">
      <h1>欢迎光临</h1>
    </div>
    <div class="right">
      <div class="login-name">
        <h1>欢迎回来</h1>
        <h4>——账号密码登陆——</h4>
        <!-- 输入框内容 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="Avatar"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              :prefix-icon="Lock"
              :suffix-icon="View"
              placeholder="请输入密码"
            />
          </el-form-item>

          <el-form-item>
            <el-button @click="handleLogin" :loading="loading">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Avatar, View, Lock } from '@element-plus/icons-vue'
// import { login } from '../../api/user'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const loading = ref(false)
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用密码', trigger: 'blur' }]
})
/**
 * 登录
 */
const ruleFormRef = ref()
function handleLogin() {
  ruleFormRef.value.validate(async (valid) => {
    try {
      if (valid) {
        loading.value = true
        const res = await store.dispatch('user/handleLogin', ruleForm)
        if (res) router.push('/')
        ElMessage({
          title: '提示',
          message: '登录成功',
          type: 'success'
        })
      }
    } catch (error) {
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    width: 68%;
    background-color: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 45px;
      color: #fff;
    }
  }
  .right {
    width: 32%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-name {
    width: 240px;
    text-align: center;
    h4 {
      color: #d3d6db;
      margin: 20px 0;
      font-size: 10px;
    }
  }
  .el-input {
    width: 100%;
  }
  .el-button {
    width: 100%;
    background-color: #6366f1;
    border-radius: 20px;
    color: #fff;
  }
}
</style>
