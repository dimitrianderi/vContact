<template>
  <header class="header">
    <h1 class="logo">vContact</h1>
    <span v-if="$store.getters.auth" class="greeting"
      >Здравствуйте, {{ $store.getters.auth.name }}!</span
    >
    <div class="auth-buttons">
      <router-link to="auth">
        <app-button text="Вход" v-if="!$store.getters.auth"></app-button>
      </router-link>
      <router-link to="reg">
        <app-button
          text="Регистрация"
          v-if="!$store.getters.auth"
        ></app-button>
      </router-link>
      <app-button
        text="Выход"
        v-if="$store.getters.auth"
        @toggle="logout"
      ></app-button>
    </div>
  </header>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppButton from './AppButton.vue'

export default {
  components: { AppButton },
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.commit('toggleAuth')
      router.push('auth')
      window.location.reload();
    }

    return {
      logout,
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
  .greeting {
    font-size: 18px;
    color: var(--main-color);
    margin-left: 10px;
  }
}
</style>
