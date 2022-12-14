<template>
<el-dialog
  class="add_work_dialog"
  @close="activeSet = null"
  @click="handleDialogClick"
  :width="popupWidth"
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
          :index="'' + index"
          @click="onSetSelected(set, index)"
          class="add_work_menu_item_wrapper"
        >
          <div class="add_work_menu_item">
            <div class="add_work_menu_item__title">
              {{ set.title }}
            </div>
            <add-work-controls
              :key="set.title"
              v-if="activeSet === index && addWorkDialogIsOpen"
              :unit="set.unit"
              @added="onWorkAdded"
            />
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
        content="Чтобы добавить несколько работ сразу"
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
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue';
import { useSets } from '@/store/modules/sets';
import { useWorks } from '@/store/modules/addedWorks';
import AddWorkControls from './AddWorkDialogControls.vue';
import type { ISetItem, TSetsTypes } from '@/types/sets';
import type { IAddWorkPayload } from '@/types/works';
import setsNames from '@/enums/sets'
import { ElMessage } from 'element-plus';
import { useApp } from '@/store/modules/app';

const appStore = useApp()

const addWorkDialogIsOpen = computed({
  get() {
    return appStore.getters.addWorkDialogIsOpen
  },
  set(val) {
    appStore.commit('toggleAddWorkDialog', val)
  }
})

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

const handleDialogClick = (e: any) => {
  const isMenuItem = e.target.closest('.add_work_menu_item')
  if (!isMenuItem) {
    activeSet.value = null
  }
}

const addedWorks = useWorks()
const onWorkAdded = (amount: number) => {
  if (activeSet.value !== null) {
    addedWorks.dispatch('addWork', {
      workType: activeType.value,
      setTitle: activeSetTitle.value,
      amount
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
  })
}

const dontClose = ref(false)

const mobile = computed(() => appStore.getters.mobileLayout)
const tablet = computed(() => appStore.getters.tabletLayout)
const popupWidth = computed(() => {
  if(!tablet.value) return '60%'
  if(!mobile.value) return '80%'
  return '95%'
})

</script>

<style>
.el-dialog.add_work_dialog {
  max-height: 80vh;
  max-width: 800px;
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

.add_work_menu_item__title {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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

@media (max-width: 480px) {
  .add_work_dialog .el-dialog__body {
    padding: 5px 10px 20px;
  }

  .el-menu-item.add_work_menu_item_wrapper {
    padding: 0px 10px !important;
  }

  .add_work_menu_item__title {
    font-size: 12px;
  }

  .el-message {
    max-width: 90% !important;
    left: 5vw !important;
    transform: translateX(0%) !important;
  }
}
</style>
