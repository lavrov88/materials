<template>
<div class="add_work_menu_item__controls">
  <el-input
    ref="inputEl"
    class="add_work_menu_item__amount"
    v-model="inputValue"
  >
    <template #append>{{ unit }}</template>
  </el-input>
  <el-button
    type="primary"
    @click="onAddBtnClicked"
  >
    Добавить
  </el-button>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

const { unit } = defineProps({
  unit: String
})
const emit = defineEmits([ 'added' ])

const inputEl = ref()

const inputValue = ref(0)
watch(inputValue, (newValue, oldValue) => {
  if (isNaN(+newValue) || +newValue < 0) {
    inputValue.value = +oldValue
  } else {
    inputValue.value = +newValue
  }
});

const onAddBtnClicked = () => {
  emit('added', inputValue)
}

const enterHandler = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    onAddBtnClicked()
  }
}

onMounted(() => {
  setTimeout(() => {
    inputEl.value.focus()
    inputEl.value.select()
    if (document.activeElement === inputEl.value.ref) {
      document.addEventListener('keydown', enterHandler)
    }
  });
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

.el-input.add_work_menu_item__amount {
  width: 120px;
}

.el-input.add_work_menu_item__amount .el-input__inner {
  text-align: center;
}
</style>
