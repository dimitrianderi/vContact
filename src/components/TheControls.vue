<template>
  <div class="controls">
    <div class="group-control">
      <div class="search-filter">
        <input type="text" :placeholder="search" class="search-filter__input" />
      </div>
      <label class="group-label">{{ group }}:</label>
      <select class="group-select">
        <option value="all">{{ options.all }}</option>
        <option value="friends">{{ options.friends }}</option>
        <option value="colleagues">{{ options.colleagues }}</option>
        <option value="family">{{ options.family }}</option>
      </select>
    </div>
    <app-button :text="add_user" @toggle="toggleModal"></app-button>
  </div>
  <teleport to="body"
    ><app-modal v-if="isOpenModal">
        <the-form-new @close="toggleModal"></the-form-new>
    </app-modal
  ></teleport>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import AppModal from '../layouts/AppModalWindow.vue'
import AppButton from '../layouts/AppButton.vue'
import TheFormNew from './TheFormNew.vue'

export default {
  components: { AppModal, AppButton, TheFormNew },
  setup() {
    const isOpenModal = ref(false)
    const group = ref('Группировка')
    const add_user = ref('Добавить участника')
    const search = ref('Поиск')
    const options = reactive({
      all: 'Все',
      friends: 'Друзья',
      colleagues: 'Коллега',
      family: 'Семья',
    })

    const toggleModal = () => {
      isOpenModal.value = !isOpenModal.value
    }

    return {
      isOpenModal,
      options,
      group,
      add_user,
      search,
      toggleModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .group-control {
    display: flex;
    align-items: center;

    .group-label {
      font-weight: bold;
      margin-right: 10px;
      color: var(--main-color);
    }

    .search-filter {
      display: flex;
      align-items: center;

      .search-filter__input {
        padding: 5px;
        border: 1px solid var(--main-color);
        border-radius: 4px;
        margin-right: 10px;
      }
    }

    .group-select {
      padding: 5px;
      border: 1px solid var(--main-color);
      border-radius: 4px;
      margin-right: 10px;
    }
  }

  .add-button {
    padding: 5px 10px;
    background-color: var(--main-color);
    color: var(--text-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--btn-hover-color);
    }
  }
}
</style>
