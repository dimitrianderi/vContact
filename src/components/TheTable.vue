<template>
  <teleport to="body">
    <app-loader v-if="isLoader"></app-loader>
  </teleport>
  <div class="wrapper">
    <table class="contacts-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Почта</th>
          <th>Теги</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody v-if="filteredContacts.length">
        <tr v-for="contact in filteredContacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.tags.join(', ') }}</td>
          <td class="actions">
            <router-link
              :to="{
                name: 'Contact',
                params: { id: contact.id },
              }"
            >
              <app-button text="Открыть"></app-button>
            </router-link>
            <app-button
              text="Редактировать"
              @toggle="toggleModal('Edit', contact)"
            ></app-button>
            <app-button
              text="Удалить"
              @click="deleteContact(contact.id)"
            ></app-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="contacts-text" v-if="!filteredContacts.length">
      <span>Контактов нет</span>
    </div>
  </div>
  <app-pupup
    v-if="isOpenModal"
    :postfix="postfix"
    @close="toggleModal('')"
    :data="data"
  ></app-pupup>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppButton from '../layouts/AppButton.vue'
import AppLoader from '../layouts/AppLoader.vue'
import AppPupup from '../layouts/AppPupup.vue'
import type { Contact } from './../store'

export default {
  components: { AppButton, AppLoader, AppPupup },
  setup(_) {
    const store = useStore()
    const contacts = store.state.contacts
    const isLoader = ref(false)
    const isOpenModal = ref(false)
    const message = ref('')
    const postfix = ref('')
    const data = ref({})

    const deleteContact = async (id: string) => {
      isLoader.value = true
      store.state.message = null
      await store.dispatch('delete', id)
      if (store.getters.message) {
        message.value = store.getters.message
      }
      isLoader.value = false
    }

    const toggleModal = (value: string, contact: Contact | null = null) => {
      data.value = { ...contact }
      isOpenModal.value = !isOpenModal.value
      postfix.value = value
    }

    const filteredContacts = computed(() => {
      const filteredByTag =
        store.state.activeTag === 'all'
          ? contacts
          : contacts.filter((el: Contact) =>
              el.tags.includes(store.state.activeTag)
            )

      if (!store.state.searchValue) {
        return filteredByTag
      }

      const searchQuery = store.state.searchValue.toLowerCase()
      return filteredByTag.filter((contact: Contact) =>
        contact.name.toLowerCase().includes(searchQuery)
      )
    })

    return {
      contacts,
      isLoader,
      message,
      postfix,
      isOpenModal,
      data,
      deleteContact,
      toggleModal,
      filteredContacts,
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .contacts-table {
    width: 100%;
    background-color: var(--table-row-color);
    color: var(--text-color);
    border-collapse: collapse;
    table-layout: auto;

    th,
    td {
      width: 100px;
      padding: 10px;
      border: 1px solid var(--main-color);
      text-align: center;
    }

    th {
      background-color: var(--dark-color);
    }

    tbody tr {
      background-color: var(--table-row-color);
      transition: background-color 0.1s ease;

      &:hover {
        background-color: var(--table-row-hover-color);
      }
    }

    a {
      margin-right: 10px;
    }
  }
  .contacts-text {
    padding: 10px;
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: var(--dark-color);
    font-weight: 700;
  }
}
</style>
