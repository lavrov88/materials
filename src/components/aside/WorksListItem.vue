<template>
<li>
  <el-card
    shadow="hover"
    :body-style="{ padding: '10px' }"
  >
  <div class="work-list-item__body">
    <div class="work-list-item__name">
      {{ work.set.name }}
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
    <div class="work-list-item__options">
      <el-button
        @click="onClickDelete"
        size="small"
        :icon="Delete"
        circle
      />
    </div>
  </div>
  </el-card>
</li>
</template>

<script lang="ts" setup>
import type { WorkItem } from '@/store/modules/addedWorks'
import { Delete } from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
import { useWorks } from '@/store/modules/addedWorks'

interface Props {
  work: WorkItem
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
  if (typeof amount === 'number') {
    dispatch('changeWorkAmount', { index, amount })
  }
}

const onClickDelete = () => {
  commit('deleteWork', index)
}
</script>

<style scoped>
.work-list-item__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.work-list-item__body:hover .work-list-item__options {
  opacity: 1;
}

.work-list-item__name {
  font-size: 12px;
  width: 65%;
  border-right: 1px #ccc solid;
}

.work-list-item__amount {
  width: 27%;
  padding-left: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
}

.work-list-item__options {
  opacity: 0;
  width: 8%;
}

.work-list-item__amount_digit,
.work-list-item__amount_input {
  height: 27px;
  width: 38px;
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
