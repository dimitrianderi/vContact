<template>
  <header class="header">
    <h1 class="logo">{{ title }}</h1>
    <div class="auth-buttons">
      <app-button text="Вход"></app-button>
      <app-button text="Регистрация"></app-button>
      <app-button text="Выход"></app-button>
    </div>
  </header>
</template>

<script lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'

export default {
  components: { AppButton },
  setup() {
    const title = ref('vContact')

    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--dark-color);

  .logo {
    font-size: 28px;
    font-weight: bold;
    color: var(--main-color);
  }

  .auth-buttons {
    display: flex;
  }
}
</style>
