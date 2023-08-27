<template>
  <button class="btn">{{ text }}</button>
</template>

<script lang="ts">
export default {
    props: ['text']
}
</script>

<style scoped>
.btn {
  padding: 5px 10px;
  background-color: var(--main-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color .2s ease;
}
.btn:last-child {
  margin-right: 0;
}

.btn:hover {
    background-color: var(--btn-hover-color);
}
</style>
