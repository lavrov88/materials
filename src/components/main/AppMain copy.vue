<template>
<el-table :data="tableData" fit style="width: 100%">
  <el-table-column type="expand">
    <template #default="props">
      <div m="4">
        <el-table :data="props.row.materials">
          <el-table-column />
          <el-table-column label="Материал" prop="name" />
          <el-table-column label="Кол." prop="amount" />
          <el-table-column label="Ед." prop="unit" />
          <el-table-column label="Цена" prop="price" />
          <el-table-column label="Стоимость" prop="value" />
        </el-table>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="Вид работ" prop="name" />
  <el-table-column label="Кол." prop="amount" />
  <el-table-column label="Ед." prop="unit" />
  <el-table-column label="Стоимость" prop="value" />
</el-table>
</template>

<script lang="ts">
export default {
  data: () => ({
    tableData: [
      {
        name: 'Утепление пола',
        unit: 'м2',
        amount: 100,
        value: 43900,
        materials: [
          {
            name: 'Пеноплекс',
            unit: 'упак.',
            price: 540,
            amount: 60,
            value: 32400,
          },
          {
            name: 'Клей-пена',
            unit: 'баллон',
            price: 800,
            amount: 10,
            value: 8000,
          },{
            name: 'Пена',
            unit: 'баллон',
            price: 700,
            amount: 5,
            value: 3500,
          },
        ],
      }
    ]
  }),

  // mounted() {
  //   console.log(this)
  // }
}
</script>

<style scoped>
</style>
