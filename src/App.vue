<template>
<div class="app_container">
  <aside  v-if="!tabletLayout" class="app_sidebar_wrapper">
    <div class="app_sidebar_inner">
      <app-aside></app-aside>
    </div>
  </aside>

  <div class="app_data">
    <app-header></app-header>
    <app-main></app-main>
  </div>

  <mobile-works-list></mobile-works-list>
  <mobile-options></mobile-options>
</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useApp } from '@/store/modules/app';

const appStore = useApp()
const commit = appStore.commit
const mobileLayout = computed(() => appStore.getters.mobileLayout)
const tabletLayout = computed(() => appStore.getters.tabletLayout)

const checkMobileWidth = () => {
  return window.innerWidth < 740
}
const checkTabletWidth = () => {
  return window.innerWidth < 1120
}
const onWindowResize = () => {
  const currentLayoutIsMobile = mobileLayout.value
  const currentLayoutIsTablet = tabletLayout.value

  if (!currentLayoutIsMobile && checkMobileWidth()) {
    commit('toggleMobileLayout', true)
  }
  if (currentLayoutIsMobile && !checkMobileWidth()) {
    commit('toggleMobileLayout', false)
  }

  if (!currentLayoutIsTablet && checkTabletWidth()) {
    commit('toggleTabletLayout', true)
  }
  if (currentLayoutIsTablet && !checkTabletWidth()) {
    commit('toggleTabletLayout', false)
  }
}

onMounted(() => {
  if (checkMobileWidth()) {
    commit('toggleMobileLayout', true)
  }
  if (checkTabletWidth()) {
    commit('toggleTabletLayout', true)
  }
  window.addEventListener('resize', onWindowResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<style>
.app_container {
  width: 100%;
  max-width: 1200px;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
}

.app_sidebar_wrapper {
  width: 350px;
  height: 100vh;
  max-height: 100vh;
  flex-shrink: 0;
  padding: 50px 0px 20px 20px;
}

.app_sidebar_inner {
  height: 100%;
  width: 100%;
  padding: 20px;
  padding-right: 5px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: -4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.app_data {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0 10px 10px 10px;
}

@media (max-width: 780px) {
  .app_data {
    padding: 0;
  }
}
</style>
