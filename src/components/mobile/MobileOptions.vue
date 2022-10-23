<template>
<el-drawer
  v-model="isOpen"
  direction="rtl"
  :size="mobile ? '90%' : '400px'"
>
  <app-main-options></app-main-options>
</el-drawer>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { computed } from 'vue'

const appStore = useApp()
const mobile = computed(() => appStore.getters.mobileLayout)

const isOpen = computed({
  get() {
    return appStore.getters.mobileMenus.options
  },
  set(val) {
    appStore.commit('toggleMobileOptions', val)
  }
})
</script>