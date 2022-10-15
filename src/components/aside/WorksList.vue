<template>
<ul>
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
</style>
