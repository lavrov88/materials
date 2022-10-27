<template>
<div
  class="app_sidebar_content"
  :class="worksExist ? '' : 'empty'"
>
  <h5 v-if="!worksExist" class="app_sidebar_empty_title">
    Добавленных работ ещё нет
  </h5>
  <works-list v-if="worksExist" />
  <div class="app_sidebar_controls">
    <add-work />
    <delete-all-works v-if="worksExist" />
  </div>
</div>
</template>

<script lang="ts" setup>
import AddWork from './AddWork.vue'
import WorksList from './WorksList.vue'
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';
import DeleteAllWorks from './DeleteAllWorks.vue';

const worksExist = computed(() => !!useWorks().getters.works.length)

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
</style>
