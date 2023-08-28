<template>
  <teleport to="body">
    <app-loader v-if="isLoader"></app-loader>
  </teleport>
  <div class="page">
    <div class="contact-details">
      <h2 class="contact-title">Информация о контакте</h2>
      <div class="contact-info">
        <p><strong>Имя:</strong> {{ contact.name }}</p>
        <p><strong>Телефон:</strong> {{ contact.phone }}</p>
        <p><strong>Email:</strong> {{ contact.email }}</p>
        <p><strong>Теги:</strong> {{ contact.tags.join(', ') }}</p>
      </div>
      <div class="buttons">
        <router-link to="/main"
          ><app-button text="Назад"></app-button
        ></router-link>
        <app-button
          text="Редактировать"
          @toggle="toggleModal('Edit')"
        ></app-button>
        <app-button text="Удалить" @click="deleteContact(contact.id)"></app-button>
      </div>
    </div>
  </div>
  <app-pupup
    v-if="isOpenModal"
    :postfix="postfix"
    @close="toggleModal('')"
    :data="contact"
  ></app-pupup>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppButton from '../layouts/AppButton.vue'
import type { Contact } from './../store'
import AppPupup from '../layouts/AppPupup.vue'
import { useRouter } from 'vue-router'
import AppLoader from '../layouts/AppLoader.vue'

export default {
  components: { AppButton, AppPupup, AppLoader },
  props: ['id'],
  name: 'Contact',

  setup(props) {
    const router = useRouter()
    const store = useStore()
    const contacts = store.state.contacts
    const idx = props.id
    const isOpenModal = ref(false)
    const postfix = ref('')
    const isLoader = ref(false)
    
    const contact = computed(() => {
      return contacts.find((el: Contact) => el.id === idx)
    })

    const toggleModal = (value: string) => {
      isOpenModal.value = !isOpenModal.value
      postfix.value = value
    }

    const deleteContact = async (id: string) => {
      isLoader.value = true
      await store.dispatch('delete', id)
      router.push('/main')
      isLoader.value = false
    }

    return {
      contact,
      isOpenModal,
      postfix,
      isLoader,
      deleteContact,
      toggleModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100%;
  background-color: var(--light-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  .contact-details {
    background-color: var(--text-color);
    box-shadow: 0px 2px 10px var(--shadow-color);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;

    .contact-title {
      font-size: 24px;
      margin-bottom: 10px;
      color: var(--dark-color);
    }

    .contact-info p {
      font-size: 16px;
      margin: 10px 0;
      color: var(--dark-color);
    }
  }

  .buttons {
    margin-top: 20px;

    a {
      margin-right: 10px;
    }
  }
}
</style>
