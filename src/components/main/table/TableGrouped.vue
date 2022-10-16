<template>
<el-table
  :data="normalizedGroupedMaterials"
  border
  row-class-name="grouped_row"
>
  <el-table-column type="expand" width="40">
    <template #default="props">
      <div m="4">
        <el-table :data="props.row.materials" stripe border>
          <el-table-column width="60" />
          <el-table-column label="Материал" header-align="center">
            <template #default="scope">
              <cell-material :row="scope.row.material"></cell-material>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Материал" prop="material.name" width="320" header-align="center" /> -->
          <el-table-column label="Кол." prop="amount" width="70" align="center" />
          <el-table-column label="Ед." prop="material.unit" width="60" align="center" />
          <el-table-column label="Цена" prop="material.price" width="90" align="right" header-align="center" />
          <el-table-column label="Стоим." prop="totalPrice" width="90" align="right" header-align="center" />
        </el-table>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="Вид работ" prop="title" width="360" header-align="center" />
  <el-table-column label="Кол." prop="amount" width="70" align="center" />
  <el-table-column label="Ед." prop="unit" width="60" align="center" />
  <el-table-column label="Цена" prop="price" width="90" align="right" header-align="center" />
  <el-table-column label="Стоим." prop="totalPrice" width="90" align="right" header-align="center" />
</el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { normalizeGroupedMaterials } from '@/ultils/ultils';
import CellMaterial from './CellMaterial.vue';

const computedMaterialsGrouped = computed(() => useWorks().getters.computedMaterialsGrouped)
const normalizedGroupedMaterials = normalizeGroupedMaterials(computedMaterialsGrouped)
</script>

<style>
.el-table__row.grouped_row {
  background-color: #f5f5f5;
}

.el-table__body .el-table__cell.el-table__expanded-cell {
  padding-top: 0;
}
</style>
