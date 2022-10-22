<template>
<h3 class="app_sidebar__title">Добавленные работы</h3>
<ul class="works_list">
  <el-scrollbar always max-height="calc(100vh - 70px - 40px - 37px - 25px - 42px - 24px)">
  <li
    v-for="wt in workByType"
    :key="wt.workType"
    class="works_list_group"
  >
    <ul v-if="wt.works.length" class="works_list_group_inner">
      <h4 class="works_list_group_title">{{ setsNames[wt.workType] }}</h4>
        <works-list-item
          v-for="(work, index) in wt.works"
          :key="work.id"
          :work="work"
          :index="index"
        ></works-list-item>
    </ul>
  </li>
  </el-scrollbar>
</ul>


</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';
import WorksListItem from './WorksListItem.vue';
import setsNames from '@/enums/sets'

const workByType = computed(() => useWorks().getters.worksByType)
</script>

<style scoped>
.app_sidebar__title {
  font-size: 15px;
  margin-bottom: 20px;
}

.works_list_group {
  margin-bottom: 30px;
}

.works_list_group:last-child {
  margin-bottom: 0;
}

.works_list_group_title {
  font-size: 14px;
  color: #747474;
  padding-left: 5px;
  padding-bottom: 15px;
}

.works_list {
  margin-bottom: 25px;
}
</style>
