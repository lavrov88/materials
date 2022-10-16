<template>
<div class="add_work_menu_item__controls">
  <el-input
    ref="inputEl"
    class="add_work_menu_item__amount"
    placeholder="0"
    :value="currentValue"
    @input="onChangeValue"
  />
  <span class="add_work_menu_item__amount_unit">{{ unit }}</span>
  <el-button
    type="primary"
  >
    Добавить
  </el-button>
</div>
</template>

<script lang="ts" setup>import { onMounted, ref } from 'vue';
const { unit } = defineProps({
  unit: String
})
const inputEl = ref()

const currentValue = ref(0)
const onChangeValue = (e: string) => {
  if (+e !== NaN && +e >= 0) {
    setTimeout(() => {
      currentValue.value = +e
    });
  }
}

onMounted(() => {
  setTimeout(() => {
    inputEl.value.focus()
    inputEl.value.select()
  });
})
</script>

<style>
</style>
