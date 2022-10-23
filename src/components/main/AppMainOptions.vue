<template>
<div class="options_content">
  <el-switch
    v-model="materialsAreGrouped"
    active-text="Группировать материалы по видам работ"
    :loading="materialsAreGroupedLoading"
  />

  <el-button
    v-if="!tablet"
    class="options_close_btn"
    @click="onCloseOptionsClick"
    text small circle :icon="Close"
  ></el-button>
</div>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { Close } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';

const appStore = useApp()
const tablet = computed(() => appStore.getters.tabletLayout)

const materialsAreGroupedLoading = ref(false)
const materialsAreGrouped = computed({
  get() {
    return appStore.getters.materialsAreGrouped
  },
  set(val) {
    materialsAreGroupedLoading.value = true
    setTimeout(() => {
      appStore.commit('toggleGroupedMaterials', val)
      materialsAreGroupedLoading.value = false
    })
  }
})

const onCloseOptionsClick = () => {
  appStore.commit('toggleOptions')
}
</script>

<style>
.options_content {
  position: relative;
  display: flex;
  align-items: center;
}

.options_close_btn {
  position: absolute;
  top: 2px;
  right: 3px;
  width: 30px;
  height: 30px;
}
</style>