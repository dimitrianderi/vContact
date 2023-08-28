<template>
  <div>
    <label :for="label_for" class="form-label">{{ label }}</label>
    <input :type="type_input" class="form-control" :id="label_for" :value="modelValue" @input="change"/>
  </div>
</template>

<script lang="ts">
export default {
  props: ['modelValue', 'label_for', 'label', 'type_input'],
  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const change = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return {
      change
    }
  }
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
