<template>
<div class="add_work_menu_item__controls">
  <el-input-number
    ref="inputEl"
    @focus="onInputFocused"
    @blur="onInputBlurred"
    :min="0"
    :controls="false"
    placeholder="0"
    class="add_work_menu_item__amount"
    v-model="inputValue"
  />
  <span class="add_work_menu_item__amount_unit">{{ unit }}</span>
  <el-button
    type="primary"
    @click="onAddBtnClicked"
  >
    Добавить
  </el-button>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const { unit } = defineProps({
  unit: String
})
const emit = defineEmits([ 'added' ])
const inputEl = ref()
const inputValue = ref()

const onAddBtnClicked = () => {
  emit('added', inputValue.value)
}
const enterHandler = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    inputEl.value.blur()
    setTimeout(() => {
      onAddBtnClicked()
    }, 0);
  }
}
const onInputFocused = () => {
  document.addEventListener('keydown', enterHandler)
}
const onInputBlurred = () => {
  document.removeEventListener('keydown', enterHandler)
}

onMounted(() => {
  setTimeout(() => {
    inputEl.value.focus()
  }, 0)
})
</script>

<style>
.add_work_menu_item__controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-left: 5px;
  padding-right: 10px;
  gap: 10px;
  background-color: #fff;
  transition: background-color var(--el-transition-duration);
}

.el-menu-item.add_work_menu_item_wrapper:hover .add_work_menu_item__controls {
  background-color: var(--el-menu-hover-bg-color);
}

.el-input-number.add_work_menu_item__amount {
  width: 60px;
}

.add_work_menu_item__amount_unit {
  color: #585858;
}
.el-input.add_work_menu_item__amount .el-input__inner {
  text-align: center;
}
</style>
