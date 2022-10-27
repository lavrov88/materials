<template>
<div class="sidebar_delete_all_works">
  <el-popconfirm
    @confirm="onDeleteAllWorks"
    title="Очистить весь список работ?"
    confirm-button-text="Да"
    confirm-button-type="danger"
    cancel-button-text="Нет"
    hide-icon
    width="250px"
  >
    <template #reference>
      <el-button
        type="danger" size="small"
        :icon="Delete"
        text bg
      >
        Очистить список
      </el-button>
    </template>
  </el-popconfirm>
</div>
</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks';
import { Delete } from '@element-plus/icons-vue'

const { commit } = useWorks()
const onDeleteAllWorks = () => {
  commit('clearWorks')
}
</script>

<style>
.sidebar_delete_all_works {
  margin: 0 auto;
}
</style>
