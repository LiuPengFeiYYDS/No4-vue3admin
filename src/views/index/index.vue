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
        v-for="item in tabs"
        :key="item.path"
        @click="$router.push(item.path)"
      >
        <div>
          <div class="icons">
            <el-button :icon="item.icon" size="large"></el-button>
          </div>
          <div>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- echarts表格 -->
    <div class="echarts">
      <!-- 订单统计 -->
      <div class="echarts-top">
        <span>订单统计</span>
        <span>
          <el-check-tag
            :checked="chartType === 'month'"
            @click="changeChartType('month')"
            style="margin-right: 8px"
            >近一个月</el-check-tag
          >
          <el-check-tag
            :checked="chartType === 'week'"
            @click="changeChartType('week')"
            style="margin-right: 8px"
            >近一周</el-check-tag
          >
          <el-check-tag
            :checked="chartType === 'hour'"
            @click="changeChartType('hour')"
            style="margin-right: 8px"
            >近24小时</el-check-tag
          >
        </span>
      </div>
      <!-- 注装图 -->
      <div id="chartMain" style="width: 531px; height: 305px"></div>
    </div>
  </div>
</template>

<script setup>
import { tabs } from './databs'
import { statistics1, statistics2, statistics3 } from '../../api/statistics'
import { ref } from 'vue'
import * as echarts from 'echarts'
const control = ref([])
const controls = ref([])
const chartType = ref('week')
const getList = async () => {
  const res = await statistics1()
  control.value = res.panels
}
getList()
const getreminder = async () => {
  const res = await statistics2()
  console.log(res)
  controls.value = res
}
getreminder()

/**
 * 柱状图
 */
const getChartData = async () => {
  const res = await statistics3(chartType.value)
  const myChart = echarts.init(document.getElementById('chartMain'))
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: res.x
    },
    yAxis: {
      type: 'value',
      data: res.y
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: res.y,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  })
}
getChartData()
const changeChartType = (type) => {
  console.log('type', type)
  chartType.value = type
  getChartData()
}
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .icons {
      text-align: center;
      .el-button {
        border: none;
        background: none;
        padding: 0;
      }
    }
  }
}
.echarts {
  width: 522px;
  height: 330px;
  background-color: #fff;
  .echarts-top {
    height: 40px;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
