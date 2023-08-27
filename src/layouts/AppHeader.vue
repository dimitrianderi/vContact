<template>
  <header class="header">
    <h1 class="logo">vContact</h1>
    <div class="auth-buttons">
      <router-link to="auth">
        <app-button text="Вход" v-if="!$store.getters.isAuth"></app-button>
      </router-link>
      <router-link to="reg">
        <app-button
          text="Регистрация"
          v-if="!$store.getters.isAuth"
        ></app-button>
      </router-link>
      <app-button text="Выход" v-if="$store.getters.isAuth"></app-button>
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

    a {
      margin: 0 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
