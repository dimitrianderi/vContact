<template>
  <div>
    <label :for="name" class="form-label">{{ label }}</label>
    <input :type="type - input" class="form-control" :id="name" />
  </div>
</template>

<script lang="ts">
export default {
  props: ['for', 'label', 'type-input'],
}
</script>

<style lang="scss" scoped>
.form-label {
  font-weight: bold;
  color: var(--dark-color);
}

.form-control {
  border: 1px solid var(--main-color);
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  background-color: var(--light-color);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--dark-color);
    background-color: var(--text-color);
  }
}
</style>
