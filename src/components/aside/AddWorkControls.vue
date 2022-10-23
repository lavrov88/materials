<template>
<div class="add_work_menu_item__controls">
  <el-input
    ref="inputEl"
    class="add_work_menu_item__amount"
    placeholder="0"
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

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
// const outsideClickHandler = (e: MouseEvent) => {
//   console.log(e)
// }

onMounted(() => {
  setTimeout(() => {
    inputEl.value.focus()
    inputEl.value.select()
    if (document.activeElement === inputEl.value.ref) {
      document.addEventListener('keydown', enterHandler)
    }
    // document.addEventListener('click', outsideClickHandler)
    // console.log('click on')
  });
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', enterHandler)
  // document.removeEventListener('click', outsideClickHandler)
  // console.log('click off')
})
</script>

<style>
.add_work_menu_item__controls {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-left: 5px;
  padding-right: 10px;
  gap: 10px;
  background-color: #fff;
}

.el-input.add_work_menu_item__amount {
  width: 60px;
  text-align: center;
}

.add_work_menu_item__amount_unit {
  color: #585858;
}
</style>
