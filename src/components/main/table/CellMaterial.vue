<template>
<div class="material_cell_inner">
  <el-tooltip
    :content="row.title"
    placement="right"
    :hide-after="0"
  >
    {{ row.name }}
  </el-tooltip>
</div>
</template>

<script lang="ts" setup>
import type { INormalizedMaterials } from '@/ultils/ultils';

const { row } = defineProps<{ row: INormalizedMaterials }>()
</script>

<style>
</style>
