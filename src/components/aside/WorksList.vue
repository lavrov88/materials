<template>
<h3 class="app_sidebar__header">Добавленные работы</h3>
<ul class="works_list">
  <el-scrollbar always max-height="calc(100vh - 70px - 40px - 37px - 25px - 42px - 24px)">
    <works-list-item
      v-for="(work, index) in works"
      :work="work"
      :index="index"
    ></works-list-item>
  </el-scrollbar>
</ul>
</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks'
import WorksListItem from './WorksListItem.vue';

const works = useWorks().getters.works
</script>

<style scoped>
.app_sidebar__header {
  font-size: 15px;
  margin-bottom: 20px;
}

.works_list {
  margin-bottom: 25px;
}
</style>
