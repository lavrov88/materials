<template>
<header class="app_header">
  <div class="app_header__title">
    <h1 class="app_header__title_name">Калькулятор отделочных материалов</h1>
  </div>
  <div class="app_header_controls">
    <el-button
      @click="onOptionsBtnClick"
      size="small" type="info"
      :icon="Setting" plain
    >
      Настройки таблицы
    </el-button>
  </div>
</header>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { Setting } from '@element-plus/icons-vue'

const appStore = useApp()

const onOptionsBtnClick = () => {
  appStore.commit('toggleOptions')
}
</script>

<style scoped>
.app_header {
  height: 50px;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app_header__title_name {
  font-size: 18px;
}
</style>