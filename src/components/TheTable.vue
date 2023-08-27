<template>
  <table class="contacts-table">
    <thead>
      <tr>
        <th>{{ titles.name }}</th>
        <th>{{ titles.phone }}</th>
        <th>{{ titles.email }}</th>
        <th>{{ titles.tags }}</th>
        <th>{{ titles.buttons }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Фамилия Имя Отчество</td>
        <td>Номер телефона</td>
        <td>email</td>
        <td>тег1 тег2 тег3</td>
        <td class="actions">
          <app-button :text="buttons.edit"></app-button>
          <app-button :text="buttons.delete"></app-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ref } from 'vue'
import AppButton from '../layouts/AppButton.vue'

export default {
  components: { AppButton },
  setup() {
    const titles = ref({
      name: 'ФИО',
      phone: 'Телефон',
      email: 'Электронный адрес',
      tags: 'Теги',
      buttons: 'Действия',
    })
    const buttons = ref({
      edit: 'Редактировать',
      delete: 'Удалить',
    })
    return {
      titles,
      buttons,
    }
  },
}
</script>

<style lang="scss" scoped>
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
}
</style>
