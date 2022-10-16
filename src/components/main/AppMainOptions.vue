<template>
<div class="app_main_block header_options">
  <el-checkbox
    v-model="materialsAreGrouped"
    label="Группировать материалы по видам работ"
  />

  <el-button
    class="options_close_btn"
    @click="onCloseOptionsClick"
    text small circle :icon="Close"
  ></el-button>
</div>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { Close } from '@element-plus/icons-vue'
import { computed } from 'vue';
const appStore = useApp()

const materialsAreGrouped = computed({
  get() {
    return appStore.getters.materialsAreGrouped
  },
  set(val) {
    appStore.commit('toggleGroupedMaterials', val)
  }
})

const onCloseOptionsClick = () => {
  appStore.commit('toggleOptions')
}
</script>

<style scoped>
.header_options {
  height: 80px;
  padding: 20px;
  margin-bottom: 20px;
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