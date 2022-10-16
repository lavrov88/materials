<template>
<div class="app_container">
  <app-aside></app-aside>

  <div class="app_data">
    <app-header></app-header>
    <app-main></app-main>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    test: 1
  })
})
</script>

<style scoped>
.app_container {
  width: 100%;
  max-width: 1200px;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
}
.app_data {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0 10px 20px 10px;
}
</style>
