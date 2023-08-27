<template>
  <teleport to="body">
    <app-modal-window>
      <component :is="'TheForm' + postfix" @close="$emit('close')"></component>
    </app-modal-window>
  </teleport>
</template>

<script lang="ts">
import TheFormAuth from '../components/TheFormAuth.vue'
import TheFormNew from '../components/TheFormNew.vue'
import AppModalWindow from './AppModalWindow.vue'
export default {
  components: { AppModalWindow, TheFormNew, TheFormAuth },
  props: ['isOpenModal', 'postfix'],
  emits: ['close'],
}
</script>

<style></style>
