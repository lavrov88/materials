<template>
<li class="work-list-item__li">
  <el-card
    shadow="hover"
    class="work-list-item__wrapper"
    :body-style="{ padding: '10px' }"
  >
  <div class="work-list-item__body">
    <div class="work-list-item__name">
      {{ work.set.title }}
    </div>
    <div class="work-list-item__amount">
      <span
        v-show="!amountEditIsOn"
        @click="amountEditIsOn = !amountEditIsOn"
        class="work-list-item__amount_digit"
      >{{ work.amount }}</span>
      <input
        ref="amountInput"
        v-show="amountEditIsOn"
        @blur="amountEditIsOn = false"
        @input="onAmountChange"
        :value="work.amount"
        class="work-list-item__amount_input"
      >
      <span class="work-list-item__amount_unit">
        {{ work.set.unit }}
      </span>
    </div>
    <div class="work-list-item__delete_btn">
      <el-popconfirm
        @confirm="onConfirmDelete"
        title="Удалить эту работу?"
        confirm-button-text="Да"
        cancel-button-text="Нет"
        confirm-button-type="danger"
        hide-icon
        width="180px"
      >
        <template #reference>
          <el-button size="small" :icon="Delete" circle/>
        </template>
      </el-popconfirm>
    </div>
  </div>
  </el-card>
</li>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'
import type { IWorkItem } from '@/types/works';

interface Props {
  work: IWorkItem
  index: number
}
const { work, index } = defineProps<Props>()
const commit = useWorks().commit
const dispatch = useWorks().dispatch

const amountEditIsOn = ref(false)
const amountInput = ref()
watch(amountEditIsOn, () => {
  if (amountEditIsOn) {
    setTimeout(() => {
      amountInput.value.focus()
      amountInput.value.select()
    });
  }
})
const onAmountChange = (e: Event) => {
  const amount = +(e.target as HTMLInputElement).value
  const id = work.id
  if (typeof amount === 'number') {
    dispatch('changeWorkAmount', { id, amount })
  }
}

const onConfirmDelete = () => {
  commit('deleteWork', work.id)
}
</script>

<style>
.work-list-item__li {
  transition: all 0.3s ease;
  max-width: 100%;
}

.work-list-item__wrapper {
  position: relative;
  margin-bottom: 10px;
  margin-right: 15px;
}

.work-list-item__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.work-list-item__body:hover .work-list-item__delete_btn {
  opacity: 1;
}

.work-list-item__name {
  flex-grow: 1;
  padding-right: 5px;
  border-right: 1px #ccc solid;
  font-size: 12px;
}

.work-list-item__amount {
  width: 70px;
  min-width: 70px;
  padding-left: 5px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
}

.work-list-item__delete_btn {
  position: absolute;
  top: 2px;
  right: 2px;
  opacity: 0;
  height: 20px;
  width: 20px;
}

.work-list-item__delete_btn button {
  height: 20px;
  width: 20px;
  max-height: 20px;
  max-width: 20px;
}

.work-list-item__amount_digit,
.work-list-item__amount_input {
  height: 27px;
  width: 38px;
  min-width: 38px;
  border: 1.5px transparent solid;
  border-radius: 3px;
  padding: 2px 3px;
  font-weight: bold;
  line-height: 20px;
  cursor: pointer;
}

.work-list-item__amount_digit:hover {
  background-color: #eee;
  border: 1.5px #aaa solid;
}

.work-list-item__amount_input {
  font-family: inherit;
  font-size: 12px;
  text-align: center;
  background-color: #eee;
  border: 2px #aaa solid;
}
</style>
