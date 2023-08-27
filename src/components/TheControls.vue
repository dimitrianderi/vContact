<template>
  <div class="controls">
    <div class="group-control">
      <div class="search-filter">
        <input type="text" placeholder="Поиск" class="search-filter__input" />
      </div>
      <label class="group-label">Группировка:</label>
      <select class="group-select">
        <option value="all">Все</option>
        <option value="friends">Друзья</option>
        <option value="colleagues">Коллеги</option>
        <option value="family">Семья</option>
      </select>
    </div>
    <app-button text="Добавить контакт" @toggle="() => toggleModal('New')"></app-button>
  </div>
  <app-pupup v-if="isOpenModal" :postfix="postfix" @close="toggleModal('')"></app-pupup>
</template>

<script lang="ts">
import { ref } from 'vue'
import AppModal from '../layouts/AppModalWindow.vue'
import AppButton from '../layouts/AppButton.vue'
import TheFormNew from './TheFormNew.vue'
import AppPupup from '../layouts/AppPupup.vue'

export default {
  components: { AppModal, AppButton, TheFormNew, AppPupup },
  setup() {
    const isOpenModal = ref(false)
    const postfix = ref('')

    const toggleModal = (value: string) => {
      isOpenModal.value = !isOpenModal.value
      postfix.value = value
    }

    return {
      isOpenModal,
      postfix,
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
