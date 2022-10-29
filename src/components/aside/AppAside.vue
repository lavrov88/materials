<template>
<transition name="sidebar-empty" mode="out-in">
  <app-aside-skeleton v-if="isLoading" />

  <div
    v-else-if="worksExist"
    class="app_sidebar_content"
  >
    <works-list />
    <div class="app_sidebar_controls">
      <el-button
        class="sidebar_add_work"
        @click="onClickAddWork"
        type="primary"
        :icon="Plus"
      >
        Добавить новый вид работ
      </el-button>
      <delete-all-works />
    </div>
  </div>

  <div
    v-else
    class="app_sidebar_content empty"
  >
    <h5 class="app_sidebar_empty_title">
      Добавленных работ ещё нет
    </h5>
    <div class="app_sidebar_controls">
      <el-button
        class="sidebar_add_work"
        @click="onClickAddWork"
        type="primary"
        :icon="Plus"
      >
        Добавить новый вид работ
      </el-button>
    </div>
  </div>
</transition>
<add-work-dialog />
</template>

<script lang="ts" setup>
import AddWorkDialog from './AddWorkDialog.vue'
import WorksList from './AppAsideWorksList.vue'
import { Plus } from '@element-plus/icons-vue'
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';
import DeleteAllWorks from './DeleteAllWorks.vue';
import { useApp } from '@/store/modules/app';

const worksExist = computed(() => !!useWorks().getters.works.length)

const appStore = useApp()
const isLoading = computed(() => !appStore.getters.appIsInitialized)
const onClickAddWork = () => {
  appStore.commit('toggleAddWorkDialog', true)
}
</script>

<style>
.app_sidebar_content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app_sidebar_content.empty {
  display: flex;
  justify-content: center;
}

.app_sidebar_empty_title {
  margin-top: 0;
  margin-bottom: 40px;
}

.app_sidebar_controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-top: 20px;
}

.sidebar_add_work {
  margin-bottom: 20px;
}

.sidebar-empty-enter-active, .sidebar-empty-leave-active {
  transition: opacity .2s ease;
}
.sidebar-empty-enter-from, .sidebar-empty-leave-to {
  opacity: 0;
}
</style>
