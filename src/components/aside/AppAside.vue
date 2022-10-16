<template>
<aside class="app_sidebar_wrapper">
  <div class="app_sidebar_content">
    <h5 v-if="!worksAreExist" class="app_sidebar_empty_title">
      Добавленных работ ещё нет
    </h5>
    <works-list v-if="worksAreExist"></works-list>
    <add-work></add-work>
  </div>
</aside>
</template>

<script lang="ts" setup>
import AddWork from './AddWork.vue'
import WorksList from './WorksList.vue'
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';

const worksAreExist = computed(() => !!useWorks().getters.works.length)

</script>

<style scoped>
.app_sidebar_wrapper {
  width: 300px;
  height: 100vh;
  max-height: 100vh;
  padding: 50px 0px 0px 10px;
}
.app_sidebar_content {
  height: calc(100% - 20px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: -4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.app_sidebar_empty_title {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
