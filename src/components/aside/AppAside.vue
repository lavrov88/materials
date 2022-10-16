<template>
<aside class="app_sidebar_wrapper">
  <div
    class="app_sidebar_content"
    :class="worksExist ? '' : 'empty'"
  >
    <h5 v-if="!worksExist" class="app_sidebar_empty_title">
      Добавленных работ ещё нет
    </h5>
    <works-list v-if="worksExist"></works-list>
    <add-work></add-work>
    <delete-all-works v-if="worksExist"></delete-all-works>
  </div>
</aside>
</template>

<script lang="ts" setup>
import AddWork from './AddWork.vue'
import WorksList from './WorksList.vue'
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';
import DeleteAllWorks from './DeleteAllWorks.vue';

const worksExist = computed(() => !!useWorks().getters.works.length)

</script>

<style scoped>
.app_sidebar_wrapper {
  width: 350px;
  height: 100vh;
  max-height: 100vh;
  flex-shrink: 0;
  padding: 50px 20px 20px 10px;
}
.app_sidebar_content {
  height: 100%;
  width: 100%;
  padding: 20px;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: -4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.app_sidebar_content.empty {
  display: flex;
  justify-content: center;
}

.app_sidebar_empty_title {
  margin-top: 0;
  margin-bottom: 40px;
}
</style>
