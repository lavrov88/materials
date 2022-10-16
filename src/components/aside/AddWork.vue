<template>
<div class="sidebar_add_work">
  <el-button
    @click="addWorkDialogIsOpen = true"
    type="primary">
    Добавить новый вид работ
  </el-button>

  <el-dialog
    class="add_work_dialog"
    top="10vh"
    v-model="addWorkDialogIsOpen"
    title="Выберите новый вид работы"
  >
  <el-tabs
    v-model="activeType"
    @tab-click="handleTabClick"
  >
    <el-tab-pane
      v-for="wt of workTypes"
      :label="wt.title"
      :name="wt.name"
    >
      <el-scrollbar height="calc(80vh - 230px)">
        <el-menu :default-active="'' + activeSet">
          <el-menu-item
            v-for="(set, index) in currentSets"
            @click="onSetSelected"
            :index="'' + index"
          >
            <div class="add_work_menu_item">
              <div class="add_work_menu_item__title">
                {{ set.title }}
              </div>
              <add-work-controls
                v-if="activeSet === index && addWorkDialogIsOpen"
                :unit="set.unit"
                @added="onWorkAdded"
              ></add-work-controls>
            </div>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addWorkDialogIsOpen = false">Отмена</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { useSets } from '@/store/modules/sets';
import { useWorks } from '@/store/modules/addedWorks';
import AddWorkControls from './AddWorkControls.vue';

const addWorkDialogIsOpen = ref(false)

const workTypes = computed(() => useSets().getters.types)
const activeType = ref(workTypes.value[0].name)
const handleTabClick = (e: any) => {
  activeType.value = e.paneName
  activeSet.value = null
}

const sets = computed(() => useSets().getters.sets)
const setsValues = computed(() => Object.values(sets.value))
const currentSets = computed(() => {
  return setsValues.value.filter(set => set.type.name === activeType.value)
})
const activeSet = ref(null as number | null)
const onSetSelected = (e: any) => {
  activeSet.value = +e.index
}

const addedWorks = useWorks()
const onWorkAdded = (amount: Ref<number>) => {
  if (activeSet.value !== null) {
    addedWorks.dispatch('addWork', {
      setKey: currentSets.value[activeSet.value].name,
      amount: amount.value
    })
    setTimeout(() => {
      activeSet.value = null
      addWorkDialogIsOpen.value = false
    });
  }
}
</script>

<style>
.sidebar_add_work {
  margin-bottom: 10px;
}

.el-dialog.add_work_dialog {
  max-height: 80vh;
  overflow: hidden;
  border-radius: 10px;
}

.add_work_dialog .el-dialog__body {
  padding: 5px 20px 30px;
}

.add_work_menu_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.add_work_menu_item__controls {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
}

.el-input.add_work_menu_item__amount {
  width: 60px;
  text-align: center;
}

.add_work_menu_item__amount_unit {
  color: #585858;
}
</style>
