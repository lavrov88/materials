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
      :key="wt.toString()"
      :label="setsNames[wt as TSetsTypes]"
      :name="wt"
    >
      <el-scrollbar height="calc(80vh - 230px)">
        <el-menu :default-active="'' + activeSet">
          <el-menu-item
            v-for="(set, index) in currentSets"
            :key="set.title"
            @click="onSetSelected(set, index)"
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
        <el-tooltip
          effect="light"
          content="Чтобы было удобно добавлять сразу несколько работ"
          placement="top-start"
          :hide-after="0"
        >
          <el-switch
            v-model="dontClose"
            active-text="Не закрывать после добавления"
            size="small"
          />
        </el-tooltip>
        <el-button @click="addWorkDialogIsOpen = false">Назад</el-button>
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
import type { ISetItem, TSetsTypes } from '@/types/sets';
import type { IAddWorkPayload } from '@/types/works';
import setsNames from '@/enums/sets'
import { ElMessage } from 'element-plus';

const addWorkDialogIsOpen = ref(false)

const workTypes = computed(() => useSets().getters.types)
const activeType = ref(workTypes.value[0])
const handleTabClick = (e: any) => {
  activeType.value = e.paneName
  activeSet.value = null
}

const sets = computed(() => useSets().getters.sets)
const currentSets = computed(() => sets.value[activeType.value as TSetsTypes])
const activeSet = ref(null as number | null)
const activeSetTitle = ref(null as string | null)
const onSetSelected = (set: ISetItem, index: number) => {
  activeSet.value = index
  activeSetTitle.value = set.title
}

const addedWorks = useWorks()
const onWorkAdded = (amount: Ref<number>) => {
  if (activeSet.value !== null) {
    addedWorks.dispatch('addWork', {
      workType: activeType.value,
      setTitle: activeSetTitle.value,
      amount: amount.value
    } as IAddWorkPayload)
    afterWorkAdded(activeSetTitle.value)
  }
}

const afterWorkAdded = (title: string | null) => {
  setTimeout(() => {
    activeSet.value = null
    activeSetTitle.value = null
    
    if (!dontClose.value) {
      addWorkDialogIsOpen.value = false
    } else {
      const proceedTitle = title ? '"' + title + '" ' : ''
      const message = 'Работа ' + proceedTitle + 'добавлена'
      ElMessage({
        message,
        type: 'success',
        duration: 2000
      })
    }
  });
}

const dontClose = ref(false)
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

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer .el-switch__label.el-switch__label--right {
  color: #707070;
}

.dialog-footer .el-switch__label.el-switch__label--right.is-active {
  color: var(--el-color-primary);
}
</style>
