<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="10">
        <span class="title" v-if="showLayout('search')">关键词</span>
        <el-input
          v-model="keyword"
          placeholder="输入名称"
          v-if="showLayout('search')"
        />
      </el-col>
      <el-col :span="6">
        <span class="title" v-if="showLayout('select')">分类</span>
        <el-select
          ref="select"
          v-model="selectValue"
          style="width: 180px"
          v-if="showLayout('select')"
        >
          <el-option
            :value="item.name"
            :key="index"
            v-for="(item, index) in props.categ"
            >{{ item.name }}
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> </el-col>
      <el-col :span="6">
        <el-button
          size="small"
          type="primary"
          @click="search"
          v-if="showLayout('searchBtn')"
          >搜索</el-button
        >
        <el-button
          size="small"
          @click="resetForm"
          v-if="showLayout('searchBtn')"
          >重置</el-button
        >
        <el-button
          size="small"
          @click="showSelect = !showSelect"
          v-if="showLayout('searchBtn')"
          >{{ showSelect ? '收起' : '展开' }}
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="8">
        <slot v-if="showLayout('slot') && showSelect"></slot>
      </el-col>
      <el-col :span="14"> </el-col>
      <el-col :span="2">
        <el-tooltip
          v-if="showLayout('refresh') && showSelect"
          class="box-item"
          effect="dark"
          content="刷新数据"
          placement="top"
        >
          <el-icon style="font-size: 20px" @click="handleRefresh">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const emit = defineEmits(['onSearch', 'onRefresh'])
const props = defineProps({
  categ: {
    type: Object,
    default: () => {}
  },
  layout: {
    type: Array,
    default: () => ['search', 'select', 'searchBtn', 'slot', 'refresh']
  }
})

const showSelect = ref(true)
const keyword = ref('')
const selectValue = ref('请选择商品分类')
const resetForm = () => {
  keyword.value = ''
  selectValue.value = ''
}
const getQueryModel = () => {
  if (keyword.value && selectValue.value) {
    return {
      title: keyword.value || '',
      category_id: selectValue.value || ''
    }
  } else {
    return ''
  }
}
const search = () => {
  const queryModel = getQueryModel()
  emit('onSearch', queryModel)
}
const handleRefresh = () => {
  const queryModel = getQueryModel()
  emit('onRefresh', queryModel)
}
const showLayout = (type) => {
  return props.layout.includes(type)
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 300px;
}

.title {
  margin-right: 10px;
}

.el-button {
  margin-right: 10px;
}
</style>
