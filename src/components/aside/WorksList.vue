<template>
<h3 class="app_sidebar__header">Добавленные работы</h3>
<ul class="works_list">
  <works-list-item
    v-for="(work, index) in works"
    :work="work"
    :index="index"
  ></works-list-item>
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
