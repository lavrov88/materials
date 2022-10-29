<template>
<el-skeleton animated>
  <template #template>
    <div
      v-for="_ in 3"
      style="padding: 20px;"
      >
      <el-skeleton-item
        variant="h1"
        style="width: 100%; height: 40px"
      />
      <el-skeleton-item
        v-for="_ in 4"
        variant="p"
        style="width: 80%; height: 25px"
      />
    </div>
  </template>
</el-skeleton>
</template>
