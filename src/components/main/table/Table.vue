<template>
<el-table
  :data="normalizedMaterials"
  stripe border
>
  <el-table-column label="Материал" header-align="center">
    <template #default="scope">
      <cell-material :row="scope.row"></cell-material>
    </template>
  </el-table-column>
  <el-table-column label="Кол." prop="amount" width="70" align="center" />
  <el-table-column label="Ед." prop="unit" width="60" align="center" />
  <el-table-column label="Цена" prop="price" width="90" align="right" header-align="center" />
  <el-table-column label="Стоим." prop="totalPrice" width="90" align="right" header-align="center" />
</el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { normalizeMaterials } from '@/ultils/ultils';
import CellMaterial from './CellMaterial.vue';

const computedMaterials = computed(() => useWorks().getters.computedMaterials)
const normalizedMaterials = normalizeMaterials(computedMaterials)
</script>

<style>
</style>
