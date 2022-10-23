<template>
<el-table
  :data="normalizedMaterials"
  class="ungrouped_table"
  :size="mobile ? 'small' : 'default'"
  stripe border
>
  <el-table-column label="Материал" header-align="center">
    <template #default="scope">
      <cell-material :row="scope.row"></cell-material>
    </template>
  </el-table-column>
  <el-table-column label="Кол." prop="amount" :width="mobile ? '60' : '70'" align="center" />
  <el-table-column label="Ед." prop="unit" :width="mobile ? '50' : '60'" align="center" />
  <el-table-column label="Цена" prop="price" :width="mobile ? '60' : '90'" align="right" header-align="center" />
  <el-table-column label="Стоим." prop="totalPrice" :width="mobile ? '70' : '90'" align="right" header-align="center" />
</el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { normalizeMaterials } from '@/ultils/ultils';
import CellMaterial from './CellMaterial.vue';
import { useApp } from '@/store/modules/app';

const computedMaterials = computed(() => useWorks().getters.computedMaterials)
const normalizedMaterials = normalizeMaterials(computedMaterials)

const mobile = computed(() => useApp().getters.mobileLayout)
</script>

<style>
.ungrouped_table {
  margin-bottom: 30px;
}
</style>
