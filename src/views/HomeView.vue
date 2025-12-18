<template>
  <div class="container">
    <header class="header">
      <h1 class="title">CRUD приложение</h1>
      <p class="subtitle">для работы с пользователями</p>
    </header>

    <main class="app-layout">
      <div class="section">
        <h2 class="section-title">
          Форма пользователя
        </h2>
        <p class="subtitle" style="color: #718096; margin-bottom: 20px;">
          {{ editingUserId ? 'Редактирование пользователя' : 'Добавление нового пользователя' }}
        </p>
        <UserForm
          :editing-user-id="editingUserId"
          @submitted="handleFormSubmitted"
          @cancel="handleFormCancel"
        />
      </div>

      <div>
        <div class="section mb-4">
          <h2 class="section-title">
            Поиск пользователей
          </h2>
          <UserSearch />
        </div>

        <div class="section">
          <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              Список пользователей
            </div>
            <span class="user-id">Всего: {{ userStore.users.length }}</span>
          </div>
          <UserList @edit="handleEditUser" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import UserForm from '../components/UserForm.vue'
import UserList from '../components/UserList.vue'
import UserSearch from '../components/UserSearch.vue'

const userStore = useUserStore()
const editingUserId = ref<number | null>(null)

function handleEditUser(userId: number) {
  editingUserId.value = userId
}

function handleFormSubmitted() {
  editingUserId.value = null
}

function handleFormCancel() {
  editingUserId.value = null
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 20px;
}
</style>
