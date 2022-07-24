<template>
  <div class="index">
    <!-- 头部信息 -->
    <div class="flexs" shadow="hover">
      <!-- 头部的支付信息 -->
      <el-card class="control" v-for="(item, index) in control" :key="index">
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
      </el-card>
    </div>
    <!-- 跳转信息 -->
    <ul>
      <li
        v-for="item in tabs"
        :key="item.path"
        @click="$router.push(item.path)"
      >
        <el-card shadow="hover">
          <div>
            <div class="icons">
              <el-button :icon="item.icon" size="large"></el-button>
            </div>
            <div>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <!-- 下方统计表 -->
    <div class="buttomesList">
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
        <div id="chartMain" style="width: 531px; height: 380px"></div>
      </div>
      <!-- 右侧统计表 -->
      <div class="readersd">
        <el-card
          class="btmCard"
          style="margin-bottom: 10px"
          shadow="hover"
          v-for="(val, key) in controls"
          :key="key"
        >
          <div class="card_header">
            <span>{{ key === 'goods' ? '店铺及商品提示' : '交易提示' }}</span>
            <el-tag effect="plain" type="danger">{{
              key === 'goods' ? '店铺及商品提示' : '需要立即处理的交易订单'
            }}</el-tag>
          </div>
          <span v-for="item in val" :key="item" class="spanbox">
            <h2>{{ item.value }}</h2>
            <div>{{ item.label }}</div>
          </span>
        </el-card>
      </div>
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
  // console.log(res)
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
  // console.log('type', type)
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
    height: 202px;
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
    .el-card {
      background-color: #fff;
      width: 77px;
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
      span {
        display: inline-block;
        width: 100px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.echarts {
  width: 518px;
  height: 400px;
  background-color: #fff;
  margin-right: 20px;
  .echarts-top {
    height: 40px;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.buttomesList {
  display: flex;
  .readersd {
    width: 521px;
    height: 331px;
    .btmCard {
      .spanbox {
        display: inline-block;
        width: 99px;
        height: 71px;
        background-color: rgba(229, 231, 235, 0.3);
        border-radius: 5px;
        margin: 10px;
        text-align: center;
        padding-top: 20px;
        color: rgb(107, 114, 128);

        h2 {
          font-size: 20px;
          margin-bottom: 5px;
        }

        div {
          font-size: 14px;
        }
      }
      .card_header {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
