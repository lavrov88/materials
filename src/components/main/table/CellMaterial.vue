<template>
<div 
  v-if="titleOption === 'none' || titleOption === 'tooltip'"
  class="material_cell_inner"
>
  <el-tooltip
    v-if="titleOption === 'tooltip'"
    :content="row.title"
    placement="right"
    :hide-after="0"
  >
    {{ row.name }}
  </el-tooltip>
  {{ titleOption === 'none' ? row.name : null }}
</div>
<div v-if="titleOption === 'table'" class="material_cell_inner">
  <div class="material_cell__name">
    {{ row.name }}
  </div>
  <div class="material_cell__title">
    {{ row.title }}
  </div>
</div>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import type { INormalizedMaterials } from '@/types/materials';
import { ElTooltip } from 'element-plus';
import { computed } from 'vue';

const { row } = defineProps<{ row: INormalizedMaterials }>()

const titleOption = computed(() => useApp().getters.materialsTitles)
</script>

<style>
.el-table .material_cell__name {
  font-size: 13px;
  line-height: 1.4;
}
.el-table .material_cell__title {
  font-size: 11px;
  line-height: 1.5;
}

.el-table .el-table--small .material_cell__name {
  font-size: 12px;
}
.el-table .el-table--small .material_cell__title {
  font-size: 11px;
}

.material_cell__title {
  color: #929292;
  font-weight: 600;
}
</style>
