<template>
  <div class="index">
    <!-- 头部信息 -->
    <div class="flexs">
      <!-- 头部的支付信息 -->
      <div class="control" v-for="(item, index) in control" :key="index">
        <!-- 头部 -->
        <div class="tops">
          <div>{{ item.title }}</div>
          <div>
            <el-tag :type="item.unitColor">{{ item.unit }}</el-tag>
          </div>
        </div>
        <!-- 身体 -->
        <div class="headers">
          <div>{{ item.value }}</div>
        </div>
        <!-- 尾部 -->
        <div class="tops">
          <div>{{ item.subTitle }}</div>
          <div>
            <span class="moin">{{ item.subValue }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 跳转信息 -->
    <ul>
      <li
        v-for="item in tabData"
        :key="item.path"
        @click="$router.push(item.path)"
      >
        <!-- <div>
         <el-icon><Cellphone /></el-icon>
        </div> -->

        <div>
          <span>{{ item.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
// import { tabData } from './tabDatabs.js'
// import { tabData } from './tabDatabs'
import { statistics1 } from '../../api/statistics'
import { ref } from 'vue'
// import { useStore } from 'vuex';
// import { useRouter, useRoute } from 'vue-router';
// const store = useStore();
// const router = useRouter();
// const route = useRoute();
// const data = reactive({});
const control = ref([])

const getList = async () => {
  const res = await statistics1()
  control.value = res.panels
}
getList()
</script>

<style lang="scss" scoped>
.flexs {
  display: flex;
  margin-bottom: 20px;
  .control {
    background-color: #fff;
    width: 295px;
    height: 184px;
    margin-right: 15px;
  }
  .tops {
    height: 20px;
    border-bottom: 1px solid #ccc;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .moin {
      font-size: 12px;
    }
  }
  .headers {
    padding: 15px;
    display: flex;
    align-items: center;
    div {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      font-size: 24px;
    }
  }
}
ul {
  display: flex;
  li {
    background-color: #fff;
    width: 115px;
    height: 44px;
    padding: 20px;
    margin-right: 15px;
  }
}
</style>
