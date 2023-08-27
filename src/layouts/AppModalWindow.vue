<template>
  <div class="modal-container">
    <div class="modal-overlay" @click="$emit('toggle')"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">

export default {
}

</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--black-color);
    opacity: .5;
    z-index: -1;
  }

  .modal-content {
    background-color: var(--text-color);
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px var(--shadow-color);
    z-index: 1;
    position: relative;
  }
}
</style>
