<template>
<main class="materials_data_wrapper">
  <transition name="options">
    <div v-show="optionsAreOpen" class="app_main_block header_options">
      <app-main-options>
      </app-main-options>
    </div>
  </transition>

  <div
    class="app_main_block materials_data"
    :class="optionsAreOpen ? 'with_opened_options' : ''"
  >
  <el-scrollbar
    ref="mainTableScrollbar"
    max-height="100%"
    always
  >
    <transition name="main-empty" mode="out-in">
      <app-main-skeleton v-if="isLoading" />

      <div
        v-else-if="allMaterialsPrice"
        class="materials-table"
      >
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

      <el-empty
        v-else
        class="materials_data_empty"
        :class="optionsAreOpen ? 'with_opened_options' : ''"
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
    </transition>

  </el-scrollbar>
  </div>
</main>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { formatToMoney } from '@/ultils/ultils';
import { useApp } from '@/store/modules/app';
import AppMainTable from './table/Table.vue';
import AppMainTableGrouped from './table/TableGrouped.vue';
import { ElEmpty, type ElScrollbar } from 'element-plus';
import type { TMainScrollbarEl } from '@/types/app';

const appStore = useApp()
const isLoading = computed(() => !appStore.getters.appIsInitialized)
const optionsAreOpen = computed(() => appStore.getters.optionsAreOpen)
const materialsAreGrouped = computed(() => appStore.getters.materialsAreGrouped)

const worksStore = useWorks()
const allMaterialsPrice = computed(() => {
  const price = worksStore.getters.computedMaterialsTotalPrice
  return price ? formatToMoney(price) : 0
})

const mainTableScrollbar = ref<InstanceType<typeof ElScrollbar>>()

onMounted(() => {
  appStore.commit('setMainScrollbarEl', mainTableScrollbar.value as TMainScrollbarEl)
})
</script>

<style>
.materials_data_wrapper {
  height: calc(100vh - 50px);
  padding: 0 10px 20px 10px;
}

.app_main_block {
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 30px 0;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  transition: all .2s ease;
}

.header_options {
  position: relative;
  height: 180px;
  padding: 20px;
  margin-bottom: 20px;
}

.materials_data {
  height: 100%;
  max-height: 100%;
  overflow: auto;
  padding-left: 5px;
  padding-right: 5px;
}

.materials_data.with_opened_options {
  height: calc(100% - 200px);
  max-height: calc(100% - 200px);
}

.materials-table {
  max-width: 95%;
  margin: 0 auto;
}

.materials_total_price {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0px 5px 10px;
  color: #595b63
}

.materials_total_price strong {
  margin: 0 5px;
  flex-shrink: 0;
}

.materials_data_empty {
  height: calc(100vh - 180px);
}

.materials_data_empty.with_opened_options {
  height: calc(100vh - 230px);
}


.materials_data_empty__title {
  color: #606266;
  margin-bottom: 10px;
}

.materials_data_empty__description {
  color: #9b9fa7;
  font-size: 14px;
}

/* TRANSITIONS */

.options-enter-active, .options-leave-active {
  transition: all .2s ease;
}
.options-enter-from, .options-leave-to {
  height: 0px;
  opacity: 0;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0;
}
.main-empty-enter-active, .main-empty-leave-active {
  transition: opacity .2s ease;
}
.main-empty-enter-from, .main-empty-leave-to {
  opacity: 0;
}
</style>
