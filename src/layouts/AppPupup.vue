<template>
  <teleport to="body">
    <app-modal-window>
      <component :is="'TheForm' + postfix" @close="$emit('close')" :contact="data"></component>
    </app-modal-window>
  </teleport>
</template>

<script lang="ts">
import TheFormAuth from '../components/TheFormAuth.vue'
import TheFormEdit from '../components/TheFormEdit.vue'
import TheFormNew from '../components/TheFormNew.vue'
import AppModalWindow from './AppModalWindow.vue'
export default {
  components: { AppModalWindow, TheFormNew, TheFormAuth, TheFormEdit },
  props: ['isOpenModal', 'postfix', 'data'],
  emits: ['close'],
}
</script>

<style></style>
