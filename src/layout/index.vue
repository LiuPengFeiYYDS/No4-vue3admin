<template>
  <div class="layouts">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <tags-view></tags-view>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from './Main/index.vue'
import Header from './Header/index.vue'
import Aside from './Aside/index.vue'
import TagsView from '../components/tagsViews.vue'
</script>

<style lang="scss" scoped>
.layouts {
  height: 100vh;
}
.el-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}
.el-header {
  width: 100%;
  background: #4338ca;
  height: 64px;
  position: fixed;
  top: 0;
  z-index: 1000;
}
.el-container {
  padding-top: 32px;
  height: 100%;
  .el-aside {
    width: auto;
    background: #fff;
    height: 100%;
    overflow: auto;
  }
  .el-main {
    padding: 0 10px;
    background: #f3f4f6;
  }
}

</style>
