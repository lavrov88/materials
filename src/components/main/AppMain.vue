<template>
<div class="materials-table">
  <el-table :data="normalizedMaterials">
    <el-table-column label="Материал" prop="name" />
    <el-table-column label="Кол." prop="amount" />
    <el-table-column label="Ед." prop="unit" />
    <el-table-column label="Цена" prop="price" />
    <el-table-column label="Стоим." prop="totalPrice" />
  </el-table>
</div>
<div class="materials_total_price">
  Общая стоимость материалов:
  <strong>{{ allMaterialsPrice }}</strong>
  руб.
</div>
</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks'
import { calcAllMaterialsPrice, normalizeMaterials } from '@/ultils/ultils';
import { computed } from 'vue';

const computedMaterials = computed(() => useWorks().getters.computedMaterials)
const normalizedMaterials = normalizeMaterials(computedMaterials)
const allMaterialsPrice = calcAllMaterialsPrice(normalizedMaterials)
</script>

<style scoped>
.materials_total_price {
  display: flex;
  justify-content: end;
  padding: 30px;
  color: rgb(96, 98, 102)
}

.materials_total_price strong {
  margin: 0 5px;
}
</style>
