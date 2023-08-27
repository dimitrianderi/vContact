<template>
<div class="page">
    <div class="contact-details">
      <h2 class="contact-title">Информация об участнике</h2>
      <div class="contact-info">
        <p><strong>Имя:</strong> {{ contact.name }}</p>
        <p><strong>Телефон:</strong> {{ contact.phone }}</p>
        <p><strong>Email:</strong> {{ contact.email }}</p>
        <p><strong>Теги:</strong> {{ contact.tags }}</p>
      </div>
      <div class="buttons">
        <button class="edit-button">Редактировать</button>
        <button class="delete-button">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john@example.com',
        tags: 'Друзья',
      },
    }
  },
}
</script>

<style scoped>
.page {
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
}

.contact-details {
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.contact-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.contact-info p {
  font-size: 16px;
  margin: 10px 0;
  color: #666;
}

.buttons {
  margin-top: 20px;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  background-color: #8b7355;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #6a5433;
}


</style>
