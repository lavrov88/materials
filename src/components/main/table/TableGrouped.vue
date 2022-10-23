<template>
<div
  v-for="workType, idx in normalizedGroupedMaterials"
  :key="workType.workType"
  class="work_type_table"
>
  <el-table
    v-if="workType.works.length"
    :data="workType.works"
    :size="mobile ? 'small' : 'default'"
    border
    default-expand-all
    row-class-name="grouped_row"
  >
    <el-table-column type="expand" :width="mobile ? '30' : '40'">
      <template #default="props">
        <div m="4">
          <el-table :data="props.row.materials" :show-header="false" stripe border size="small">
            <el-table-column :width="mobile ? '60' : '80'" />
            <el-table-column label="Материал" header-align="center">
              <template #default="scope">
                <cell-material :row="scope.row.material"></cell-material>
              </template>
            </el-table-column>
            <el-table-column label="Кол." prop="amount" :width="mobile ? '60' : '70'" align="center" />
            <el-table-column label="Ед." prop="material.unit" :width="mobile ? '50' : '60'" align="center" />
            <el-table-column label="Цена" prop="material.price" :width="mobile ? '70' : '90'" align="right" header-align="center" />
            <el-table-column label="Стоим." prop="totalPrice" :width="mobile ? '80' : '90'" align="right" header-align="center" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="setNames[workType.workType]" prop="title" header-align="center" />
    <el-table-column label="Кол." prop="amount" :width="mobile ? '60' : '70'" align="center" />
    <el-table-column label="Ед." prop="unit" :width="mobile ? '50' : '60'" align="center" />
    <el-table-column label="Цена" prop="price" :width="mobile ? '70' : '90'" align="right" header-align="center" />
    <el-table-column label="Стоим." prop="totalPrice" :width="mobile ? '80' : '90'" align="right" header-align="center" />
  </el-table>
  <div v-if="checkTotalPriceVisibility(workType)" class="work_type_table__footer">
    Стоимость материалов по разделу
    {{ setNames[workType.workType].toLocaleLowerCase() }}:
    <strong>{{ workType.workTypeTotalPrice }}</strong>
    руб.
  </div>
  <div 
    v-if="checkDividerVisibility(workType, idx)"
    class="work_type_table__divider"
  ></div>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { normalizeGroupedMaterials } from '@/ultils/ultils';
import CellMaterial from './CellMaterial.vue';
import setNames from '@/enums/sets'
import type { INormalizedGroupedMaterialsTypes } from '@/types/materials';
import { useApp } from '@/store/modules/app';

const computedMaterialsGrouped = computed(() => useWorks().getters.computedMaterialsGrouped)
const normalizedGroupedMaterials = computed(() => normalizeGroupedMaterials(computedMaterialsGrouped.value))

const checkTotalPriceVisibility = (workType: INormalizedGroupedMaterialsTypes) => {
  const hasMoreOneNonEmptyType = normalizedGroupedMaterials.value.filter(wt => {
    return wt.works.length
  }).length > 1
  const currentTypeHasWorks = workType.works.length
  return hasMoreOneNonEmptyType && currentTypeHasWorks
}
const checkDividerVisibility = (workType: INormalizedGroupedMaterialsTypes, idx: number) => {
  const hasTotalPrice = checkTotalPriceVisibility(workType)
  const isLastItem = idx === normalizedGroupedMaterials.value.length - 1
  return hasTotalPrice && isLastItem
}

const mobile = computed(() => useApp().getters.mobileLayout)
</script>

<style>
.work_type_table {
  margin-bottom: 30px;
}

.el-table__row.grouped_row {
  background-color: #f5f5f5;
}

.el-table__body .el-table__cell.el-table__expanded-cell {
  padding-top: 0;
}

.work_type_table__footer {
  margin-top: 20px;
  margin-right: 5px;
  text-align: right;

  font-size: 14px;
  color: #747474;
}

.work_type_table__divider {
  width: 100%;
  height: 1px;
  margin-top: 30px;
  background-color: #d1d1d1;
}
</style>
