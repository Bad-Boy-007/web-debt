<template>
  <div class="user-list">
    <div v-if="filteredUsers.length === 0" class="empty-state">
      <div class="empty-icon">?</div>
      <h3 class="empty-title">
        {{ userStore.searchQuery ? 'Пользователи не найдены' : 'Нет пользователей' }}
      </h3>
      <p class="empty-description">
        {{ userStore.searchQuery 
          ? 'Попробуйте изменить запрос' 
          : 'Добавьте пользователя' 
        }}
      </p>
    </div>
    
    <div v-else>
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-header">
          <h3 class="user-name">
            {{ user.firstName }} {{ user.lastName }}
          </h3>
          <span class="user-id">ID: {{ user.id }}</span>
        </div>
        
        <div class="user-details">
          <div class="user-detail">
            <span class="detail-label">Дата рождения:</span>
            <span class="detail-value">{{ formatDate(user.birthDate) }}</span>
          </div>
        </div>
        
        <div class="user-actions">
          <button
            class="btn btn-primary"
            @click="$emit('edit', user.id)"
          >
            Редактировать
          </button>
          <button
            class="btn btn-danger"
            @click="handleDelete(user.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

interface Emits {
  (e: 'edit', id: number): void
}

const emit = defineEmits<Emits>()

const userStore = useUserStore()
const { filteredUsers } = storeToRefs(userStore)

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  } catch (error) {
    console.error('Ошибка форматирования даты:', error)
    return dateString
  }
}

function handleDelete(userId: number) {
  if (confirm('Вы уверены, что хотите удалить пользователя?')) {
    userStore.deleteUser(userId)
  }
}
</script>
