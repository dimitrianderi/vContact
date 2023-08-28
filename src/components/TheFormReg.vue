<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Регистрация</h5>
    </div>

    <form class="modal-form">
      <app-input
        label_for="name"
        label="Имя"
        type-input="text"
        v-model="data.name"
      ></app-input>
      <app-input
        label_for="email"
        label="Email"
        type-input="email"
        v-model="data.email"
      ></app-input>
      <app-input
        label_for="pass"
        label="Пароль"
        type_input="password"
        v-model="data.pass"
      ></app-input>
    </form>

    <div class="modal-footer">
      <app-button text="Зарегистрироваться" @toggle="submit"></app-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex';
import AppInput from '../layouts/AppInput.vue'
import AppButton from '../layouts/AppButton.vue'

export default {
  components: { AppInput, AppButton },
  name: 'RegForm',

  setup() {
    const store = useStore();
    const data = reactive({
      name: '',
      email: '',
      pass: '',
    })

    const submit = async () => {
      store.dispatch('post', data)
    }

    return {
      data,
      submit,
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  background-color: var(--text-color);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--shadow-color);

  .modal-header {
    background-color: var(--main-color);
    border-radius: 8px 8px 0 0;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-title {
      color: var(--text-color);
      margin: 0;
      font-size: 1.25rem;
    }
  }

  .modal-form {
    padding: 10px;
    background-color: var(--light-color);

    .form-check-label {
      color: var(--dark-color);
      margin-left: 0.5rem;
    }

    .form-check-input {
      margin-top: 0.2rem;
    }
  }
  .modal-footer {
    background-color: var(--dark-color);
    border-radius: 0 0 8px 8px;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
