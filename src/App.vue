<template>
  <div class="page" v-cloak>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import AppHeader from './layouts/AppHeader.vue'
import AppModal from './layouts/AppModalWindow.vue'
import store from './store';

export default {
  components: { AppHeader, AppModal },
  mounted () {
    store.dispatch('get');
  }
}
</script>

<style lang="scss" scoped>
[v-clock] {
  display: none;
}
.page {
  padding: 20px;
}
</style>
