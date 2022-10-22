<template>
<main class="materials_data_wrapper">
  <AppMainOptions
    v-if="optionsAreOpen"
  ></AppMainOptions>

  <div
    class="app_main_block materials_data"
    :class="optionsAreOpen ? 'with_opened_options' : ''"
  >
  <el-scrollbar max-height="100%" always>
    <el-empty
      v-show="!allMaterialsPrice"
    >
      <template v-slot:description>
        <div class="materials_data_empty__title">
          Список пока пуст
        </div>
        <div class="materials_data_empty__description">
          Добавьте работы в меню слева
        </div>
      </template>
    </el-empty>

    <div v-show="allMaterialsPrice" class="materials-table">
      <app-main-table v-if="!materialsAreGrouped">
      </app-main-table>

      <app-main-table-grouped v-if="materialsAreGrouped">
      </app-main-table-grouped>

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
import { computed } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { formatToMoney } from '@/ultils/ultils';
import { useApp } from '@/store/modules/app';
import AppMainTable from './table/Table.vue';
import AppMainTableGrouped from './table/TableGrouped.vue';

const appStore = useApp()
const optionsAreOpen = computed(() => appStore.getters.optionsAreOpen)
const materialsAreGrouped = computed(() => appStore.getters.materialsAreGrouped)

const worksStore = useWorks()
const allMaterialsPrice = computed(() => {
  const price = worksStore.getters.computedMaterialsTotalPrice
  return price ? formatToMoney(price) : 0
})
</script>

<style>
.materials_data_wrapper {
  height: calc(100vh - 50px);
  padding: 0 10px 20px 0px;
}

.app_main_block {
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 30px 0;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.materials_data {
  height: 100%;
  max-height: 100%;
  overflow: auto;
}

.with_opened_options {
  height: calc(100% - 100px);
  max-height: calc(100% - 100px);
}

.materials-table {
  max-width: 710px;
  margin: 0 auto;
}

.materials_total_price {
  display: flex;
  justify-content: end;
  padding: 0px 5px 10px;
  color: #595b63
}

.materials_total_price strong {
  margin: 0 5px;
}

.materials_data_empty__title {
  color: #606266;
  margin-bottom: 10px;
}

.materials_data_empty__description {
  color: #9b9fa7;
  font-size: 14px;
}
</style>
