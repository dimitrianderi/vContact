<template>
  <div class="page">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import AppHeader from './layouts/AppHeader.vue'

export default {
  components: { AppHeader },
}
</script>

<style>
.page {
  padding: 20px;
}
</style>
