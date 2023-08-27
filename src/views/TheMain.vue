<template>
  <the-controls></the-controls>
  <table class="contacts-table">
    <thead>
      <tr>
        <th>Имя</th>
        <th>Телефон</th>
        <th>Email</th>
        <th>Теги</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ randomName }}</td>
        <td>{{ randomPhone }}</td>
        <td>{{ randomEmail }}</td>
        <td>{{ randomTags }}</td>
        <td class="actions">
          <button class="edit-button">Редактировать</button>
          <button class="delete-button">Удалить</button>
        </td>
      </tr>
      <tr>
        <td>{{ randomName }}</td>
        <td>{{ randomPhone }}</td>
        <td>{{ randomEmail }}</td>
        <td>{{ randomTags }}</td>
        <td class="actions">
          <button class="edit-button">Редактировать</button>
          <button class="delete-button">Удалить</button>
        </td>
      </tr>
      <tr>
        <td>{{ randomName }}</td>
        <td>{{ randomPhone }}</td>
        <td>{{ randomEmail }}</td>
        <td>{{ randomTags }}</td>
        <td class="actions">
          <button class="edit-button">Редактировать</button>
          <button class="delete-button">Удалить</button>
        </td>
      </tr>
      <!-- Здесь будут остальные строки таблицы с данными контактов -->
    </tbody>
  </table>
</template>

<script lang="ts">
import TheControls from '../components/TheControls.vue'
export default {
  components: { TheControls },
  data() {
    return {
      randomName: '',
      randomPhone: '',
      randomEmail: '',
      randomTags: '',
    }
  },
  created() {
    this.generateRandomContact()
  },
  methods: {
    generateRandomContact() {
      this.randomName = this.generateRandomString()
      this.randomPhone = this.generateRandomPhone()
      this.randomEmail = this.generateRandomEmail()
      this.randomTags = this.generateRandomTags()
    },
    generateRandomString() {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      const length = 10

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
      }

      return result
    },
    generateRandomPhone() {
      return '8' + Math.floor(Math.random() * 1000000000).toString()
    },
    generateRandomEmail() {
      return this.generateRandomString() + '@example.com'
    },
    generateRandomTags() {
      const tags = ['Друзья', 'Коллеги', 'Семья']
      return tags[Math.floor(Math.random() * tags.length)]
    },
  },
}
</script>

<style scoped>
.contacts-table {
  width: 100%;
  background-color: var(--table-row-color);
  color: #fff;
  border-collapse: collapse;
}

.contacts-table th,
.contacts-table td {
  padding: 10px;
  border: 1px solid var(--primary-color);
  text-align: center;
}

.contacts-table th {
  background-color: var(--table-header-color);
}

.contacts-table tbody tr {
  background-color: var(--table-row-color);
}

.contacts-table tbody tr:hover {
  background-color: var(--table-row-hover-color);
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: var(--secondary-color);
}
</style>
