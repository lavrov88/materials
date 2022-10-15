<template>
<div>
  <div v-if="!addMenuIsOpen">
    <el-button
      @click="addMenuIsOpen = !addMenuIsOpen"
      type="primary">
      Добавить новый вид работ
    </el-button>
  </div>
  <div v-if="addMenuIsOpen">
    <el-select
      @change="onSetSelected"
      v-model="selectedNewWork"
      placeholder="Виды работ">
      <el-option-group
        label="Полы"
      >
        <el-option
          v-for="key in setItemsKeys"
          :key="key"
          :label="setItems[key as SetKey].name"
          :value="key"
        />
      </el-option-group>
    </el-select>
    <el-button
      @click="addMenuIsOpen = !addMenuIsOpen"
      type="danger">
      Отмена
    </el-button>
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import { useSets, type SetKey } from '@/store/modules/sets'

const setItems = useSets().getters.sets
const works = useWorks()

const setItemsKeys = Object.keys(setItems)
const selectedNewWork = ref('')
const addMenuIsOpen = ref(false)

const onSetSelected = (e: any) => {
  addMenuIsOpen.value = !addMenuIsOpen
  works.dispatch('addWork', {
    setKey: e,
    amount: 0
  })
  selectedNewWork.value = ''
}
</script>

<style scoped>
</style>
