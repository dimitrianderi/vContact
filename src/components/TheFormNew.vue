<template>
  <teleport to="body">
    <app-loader v-if="isLoader"></app-loader>
  </teleport>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Добавление контакта</h5>
    </div>

    <form class="modal-form" @keydown.enter.prevent="addNewContact">
      <app-input
        for="name"
        label="Имя"
        type-input="text"
        v-model="data.name"
      ></app-input>
      <app-input
        for="phone"
        label="Телефон"
        type-input="text"
        v-model="data.phone"
      ></app-input>
      <app-input
        for="email"
        label="Email"
        type-input="email"
        v-model="data.email"
      ></app-input>

      <div>
        <label class="form-label">Теги</label>
        <div class="form-check" v-for="(tag, index) in tags" :key="index">
          <input
            class="form-check-input"
            type="checkbox"
            :id="tag"
            :value="tag"
            v-model="data.tags"
          />
          <label class="form-check-label" :for="tag">{{ tag }}</label>
        </div>
      </div>
    </form>

    <div class="modal-footer">
      <app-button text="Закрыть" @toggle="$emit('close')"></app-button>
      <app-button text="Добавить" @toggle="addNewContact"></app-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import AppInput from '../layouts/AppInput.vue'
import AppButton from '../layouts/AppButton.vue'
import AppLoader from '../layouts/AppLoader.vue'

export default {
  components: { AppInput, AppButton, AppLoader },
  setup(_, { emit }) {
    const store = useStore()
    const tags = ref(['Семья', 'Друзья', 'Коллеги'])
    const isLoader = ref(false)
    const message = ref(null)
    const data = reactive({
      name: '',
      phone: '',
      email: '',
      tags: [],
    })

    const addNewContact = async () => {
      isLoader.value = true
      store.state.message = null
      await store.dispatch('addNewContact', data)
      if (store.getters.message) {
        message.value = store.getters.message
      } else {
        emit('close')
      }
      isLoader.value = false
    }

    return {
      tags,
      data,
      message,
      isLoader,
      addNewContact,
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
    justify-content: space-between;
    align-items: center;
  }
}
</style>
