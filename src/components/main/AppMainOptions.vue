<template>
<div class="options_content">
  <el-switch
    v-model="materialsAreGrouped"
    active-text="Группировать материалы по видам работ"
    :loading="materialsAreGroupedLoading"
  />

  <label class="options_item materials_titles">
    <span class="options_materials_titles__label">Марки материалов:</span>
    <el-select v-model="materialsTitles">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </label>

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

const value = ref('')
const materialsTitles = computed({
  get() {
    return appStore.getters.materialsTitles
  },
  set(val) {
    appStore.commit('toggleMaterialsTitles', val)
  }
})
const options = [
  {
    value: 'tooltip',
    label: 'во всплывающей подсказке',
  },
  {
    value: 'table',
    label: 'в таблице',
  },
  {
    value: 'none',
    label: 'не показывать',
  }
]


const onCloseOptionsClick = () => {
  appStore.commit('toggleOptions')
}
</script>

<style>
.options_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

@media (max-width: 1120px) {
  .options_content {
    justify-content: flex-start;
    align-items:flex-start;
    gap: 25px;
  }
}

.options_item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.options_close_btn {
  position: absolute;
  top: 2px;
  right: 3px;
  width: 30px;
  height: 30px;
}
</style>