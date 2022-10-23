<template>
<el-drawer
  v-model="isOpen"
  direction="ltr"
  :size="mobile ? '90%' : '400px'"
>
  <app-aside></app-aside>
</el-drawer>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { computed } from 'vue'

const appStore = useApp()
const mobile = computed(() => appStore.getters.mobileLayout)

const isOpen = computed({
  get() {
    return appStore.getters.mobileMenus.works
  },
  set(val) {
    appStore.commit('toggleMobileWorks', val)
  }
})
</script>