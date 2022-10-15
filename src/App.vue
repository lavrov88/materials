<template>
<el-container>
  <el-aside width="300px">
    <app-aside></app-aside>
  </el-aside>

  <el-main>
    <app-main></app-main>
  </el-main>
</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppAside from './components/aside/AppAside.vue';
import AppMain from './components/main/AppMain.vue';

export default defineComponent({
  data: () => ({
    test: 1
  })
})
</script>

<style scoped>
.el-aside {
  height: 100vh;

  background-color:lightskyblue;
}

.el-main {
  height: 100vh;
}
</style>
