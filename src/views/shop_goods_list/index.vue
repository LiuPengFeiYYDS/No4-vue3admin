<template>
  <div class="goods">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="审核中" name="checking"></el-tab-pane>
      <el-tab-pane label="出售中" name="saling"></el-tab-pane>
      <el-tab-pane label="已下架" name="off"></el-tab-pane>
      <el-tab-pane label="库存预警" name="min_stock"></el-tab-pane>
      <el-tab-pane label="回收站" name="delete"></el-tab-pane>
    </el-tabs>
    <!-- input搜索新增等功能 -->
    <Search :categ="categ" class="cearch">
      <el-button type="primary" size="small" @click="drawer = true"
        >新增</el-button
      >
      <el-button type="danger" size="small">批量删除</el-button>
      <el-button size="small">上架</el-button>
      <el-button size="small">下架</el-button>
    </Search>
    <!-- tab表格 -->
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="cover" label="商品" width="240">
        <template #default="scope">
          <div class="cell">
            <div>
              <el-avatar shape="square" :size="50" :src="scope.row.cover" />
            </div>
            <div class="imgreoter">
              <div>{{ scope.row.title }}</div>
              <div>
                <span style="color: red">{{ scope.row.min_price }}</span> |
                <span>{{ scope.row.min_oprice }}</span>
              </div>
              <div v-if="scope.row.category">
                分类：{{ scope.row.category.name }}
              </div>
              <div>创建时间：{{ scope.row.create_time }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="sale_count"
        label="实际销量"
        width="90"
      />
      <el-table-column align="center" prop="status" label="商品状态" width="90">
        <template #default="scope">
          <el-tag class="ml-2" v-if="scope.row.status === 0" type="danger"
            >仓库</el-tag
          >
          <el-tag class="ml-2" v-if="scope.row.status === 1" type="success"
            >上架</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ischeck"
        label="审核状态"
        width="90"
      >
        <template #default="scope">
          <div v-if="scope.row.ischeck === 1">通过</div>
          <div v-if="scope.row.ischeck === 2">拒绝</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stock" label="总库存" width="80" />
      <el-table-column align="center" label="操作" width="400">
        <el-button
          v-for="button in buttons"
          :key="button.text"
          size="small"
          type="primary"
          text
          >修改</el-button
        >
        <el-button
          v-for="button in buttons"
          :key="button.text"
          size="small"
          type="primary"
          text
          >商品规格</el-button
        >
        <el-button
          v-for="button in buttons"
          :key="button.text"
          size="small"
          type="primary"
          text
          >设置轮播图</el-button
        >
        <el-button
          v-for="button in buttons"
          :key="button.text"
          size="small"
          type="primary"
          text
          >商品详情</el-button
        >
        <el-button
          v-for="button in buttons"
          :key="button.text"
          size="small"
          type="primary"
          text
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <el-drawer
      v-model="drawer"
      size="70%"
      title="I am the title"
      :with-header="false"
    >
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { getCategoryt, goodsList } from '../../api/goods'
import Search from '../../components/goods/search.vue'
import { ref } from 'vue'
const buttons = [{ text: 'primary' }]
// 默认首个pane
const activeName = ref('all')
/**
 * 关键词input
 */
const categ = ref([])
// tab表格
const tableData = ref([])
/**
 *抽屉的弹出和收缩
 */
const drawer = ref(false)
// const goodList = ref([])
/**
 * 根据点击转换状态name
 */
const handleClick = (tab) => {
  const res = tab.props.name
  activeName.value = res
  getgood()
}
/**
 *获取商品所有列表
 */
const getgood = async () => {
  const res = await goodsList(activeName.value)
  console.log('list', res)
  // goodList.value = res
  tableData.value = res.list
  console.log(tableData.value)
}
getgood()
const getcateg = async () => {
  const res = await getCategoryt()
  categ.value = res
}
getcateg()
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  background-color: #fff;
  .inputs {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      width: 800px;
      display: flex;
      align-items: center;
      margin-left: 50px;

      .el-input {
        width: 300px;
        margin: 0px 20px;
        height: 30px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
.cell {
  display: flex;
  align-items: center;
  .imgreoter {
    margin-left: 10px;
    div {
      font-size: 10px;
    }
  }
}
.cearch {
  height: 90px;
  background-color: #fff;
  padding-top: 20px;
  padding-left: 40px;
}
</style>
