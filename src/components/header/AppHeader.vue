<template>
<header class="app_header" :class="tablet ? 'mobile' : ''">
  <div v-if="tablet" @click="onClickMobileWorks" class="app_header__mobile_menu">
    <el-button type="primary">&#9776;</el-button>
  </div>
  <div class="app_header__title">
    <h1 class="app_header__title_name">Калькулятор материалов для отделки</h1>
  </div>
  <div class="app_header_controls">
    <el-button
      v-if="tablet"
      @click="onClickMobileOptions"
      type="info"
      :icon="Setting"
      plain
    >
    </el-button>
    <el-button
      v-if="!tablet"
      @click="onOptionsBtnClick"
      size="small"
      type="info"
      :icon="Setting"
      plain
    >
      Настройки таблицы
    </el-button>
  </div>
</header>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app';
import { Setting } from '@element-plus/icons-vue'
import { computed } from 'vue';

const appStore = useApp()
const tablet = computed(() => appStore.getters.tabletLayout)

const onOptionsBtnClick = () => {
  appStore.dispatch('toggleOptions')
}
const onClickMobileWorks = () => {
  appStore.commit('toggleMobileWorks', true)
}
const onClickMobileOptions = () => {
  appStore.commit('toggleMobileOptions', true)
}
</script>

<style>
.app_header {
  height: 50px;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.app_header.mobile {
  padding-left: 10px;
  padding-right: 10px;
}
.app_header__title_name {
  font-size: 18px;
}

@media (max-width: 500px) {
  .app_header__title_name {
    font-size: 14px;
  }
}
</style>