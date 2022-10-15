<template>
<div class="sidebar">
  <header>
    Калькулятор строительных материалов
  </header>
  <nav>
    <section>
      Добавленные работы
      <works-list></works-list>
    </section>
    <add-work></add-work>
  </nav>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AddWork from './AddWork.vue'
import WorksList from './WorksList.vue'

export default defineComponent({
  components: {
    'add-work': AddWork,
    'works-list': WorksList,
  },

  setup() {
    const store = useStore()

    return {}
  }
})
</script>

<style scoped>
.sidebar {
  padding: 10px;
}
</style>
