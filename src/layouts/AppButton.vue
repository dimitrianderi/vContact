<template>
  <button type="button" class="btn" @click="$emit('toggle')">{{ text }}</button>
</template>

<script lang="ts">
export default {
    props: ['text'],
    emits: ['toggle']
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 5px 10px;
  background-color: var(--main-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color .2s ease;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: var(--btn-hover-color);
  }
}
</style>
