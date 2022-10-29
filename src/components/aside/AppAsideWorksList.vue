<template>
<h3 class="app_sidebar__title">Добавленные работы</h3>
<el-scrollbar
  style="height: auto; margin-right: -15px;"
  max-height="calc(100vh - 230px)"
>
  <ul  class="works_list">
    <li
      v-for="wt in workByType"
      :key="wt.workType"
      class="works_list_group"
    >
      <transition name="works_list">
        <ul v-if="wt.works.length" class="works_list_group_inner">
          <h4 class="works_list_group_title">{{ setsNames[wt.workType] }}</h4>
            <transition-group name="works_list">
              <works-list-item
                v-for="(work, index) in wt.works"
                :key="work.id"
                :work="work"
                :index="index"
              />
            </transition-group>
        </ul>
      </transition>
    </li>
  </ul>
</el-scrollbar>
</template>

<script lang="ts" setup>
import { useWorks } from '@/store/modules/addedWorks'
import { computed } from 'vue';
import WorksListItem from './AppAsideWorksListItem.vue';
import setsNames from '@/enums/sets'

const workByType = computed(() => useWorks().getters.worksByType)
</script>

<style>
.app_sidebar__title {
  font-size: 15px;
  margin-bottom: 20px;
}

.works_list_group {
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.works_list_group:last-child {
  margin-bottom: 0;
}

.works_list_group_inner {
  transition: all 0.3s ease;
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

.works_list-enter-from,
.works_list-leave-to {
  opacity: 0;
  transform: scaleY(0%);
}

.works_list-leave-active {
  position: absolute;
}
</style>
