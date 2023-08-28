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
      <tbody v-if="contacts.length">
        <tr v-for="contact in contactsFilterTag" :key="contact.id">
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
    <div class="contacts-text" v-if="!contacts.length">
      <span>Контактов ещё нет</span>
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

    const contactsFilterTag = computed(() => {

      if (store.state.activeTag === 'all') {
        return contacts
      } else {
        return contacts.filter((el: Contact) =>
          el.tags.includes(store.state.activeTag)
        )
      }
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
      contactsFilterTag,
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

    th,
    td {
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
