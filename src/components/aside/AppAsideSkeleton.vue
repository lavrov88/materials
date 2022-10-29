<template>
<el-skeleton animated>
  <template #template>
    <div style="padding-top: 30px; text-align: center;">
      <el-skeleton-item
        v-for="_ in 6"
        variant="h1"
        style="width: 100%; height: 50px; margin-bottom: 10px;"
      />
      <el-skeleton-item
        variant="button"
        style="margin-top: 20px; width: 70%; height: 30px;"
      />
      <el-skeleton-item
        variant="button"
        style="margin-top: 20px; width: 50%; height: 25px;"
      />
    </div>
  </template>
</el-skeleton>
</template>
