<template>
<main class="materials_data_wrapper">
  <div class="materials_data">
  <el-scrollbar height="100%">
    <div class="materials-table">
      <el-table :data="normalizedGroupedMaterials" stripe border>
        <el-table-column type="expand" width="40">
          <template #default="props">
            <div m="4">
              <el-table :data="props.row.materials" stripe border>
                <el-table-column />
                <el-table-column label="Материал" prop="material.name" width="320" />
                <el-table-column label="Кол." prop="amount" width="70" />
                <el-table-column label="Ед." prop="material.unit" width="70" />
                <el-table-column label="Цена" prop="material.price" width="100" />
                <el-table-column label="Стоим." prop="totalPrice" width="100" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Вид работ" prop="name" width="360" />
        <el-table-column label="Кол." prop="amount" width="70" />
        <el-table-column label="Ед." prop="unit" width="70" />
        <el-table-column label="Цена" prop="price" width="100" />
        <el-table-column label="Стоим." prop="totalPrice" width="100" />
      </el-table>
      <br>
      <el-table :data="normalizedMaterials" stripe border>
        <el-table-column label="Материал" prop="name" width="400" />
        <el-table-column label="Кол." prop="amount" width="70" />
        <el-table-column label="Ед." prop="unit" width="70" />
        <el-table-column label="Цена" prop="price" width="100" />
        <el-table-column label="Стоим." prop="totalPrice" width="100" />
      </el-table>

      <div class="materials_total_price">
        Общая стоимость материалов:
        <strong>{{ allMaterialsPrice }}</strong>
        руб.
      </div>
    </div>
  </el-scrollbar>
  </div>
</main>
</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks'
import { calcAllMaterialsPrice, normalizeGroupedMaterials, normalizeMaterials } from '@/ultils/ultils';
import { computed } from 'vue';

const computedMaterials = computed(() => useWorks().getters.computedMaterials)
const computedMaterialsGrouped = computed(() => useWorks().getters.computedMaterialsGrouped)
const allMaterialsPrice = computed(() => useWorks().getters.computedMaterialsTotalPrice)
const normalizedMaterials = normalizeMaterials(computedMaterials)
const normalizedGroupedMaterials = normalizeGroupedMaterials(computedMaterialsGrouped)
// const allMaterialsPrice = calcAllMaterialsPrice(normalizedMaterials)
</script>

<style scoped>
.materials_data_wrapper {
  height: calc(100vh - 50px);
  padding: 0 10px 20px 0px;
}
.materials_data {
  background-color: #fff;
  width: 100%;
  max-height: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  border-radius: 10px;
  padding: 30px 0;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.materials-table {
  max-width: 740px;
  margin: 0 auto;
}

.materials_total_price {
  display: flex;
  justify-content: end;
  padding: 30px 5px;
  color: rgb(96, 98, 102)
}

.materials_total_price strong {
  margin: 0 5px;
}
</style>
