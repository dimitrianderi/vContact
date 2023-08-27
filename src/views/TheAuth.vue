<template>
  <div class="modal-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import TheFormAuth from '../components/TheFormAuth.vue'

export default {
  components: { TheFormAuth },
  name: 'Auth'
}
</script>

<style scoped>
.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 0;
}
</style>
