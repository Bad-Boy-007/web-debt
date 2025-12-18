<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">Имя:</label>
      <input
        v-model="formData.firstName"
        type="text"
        class="form-input"
        required
        placeholder="Введите имя"
      />
    </div>
    
    <div class="form-group">
      <label class="form-label">Фамилия:</label>
      <input
        v-model="formData.lastName"
        type="text"
        class="form-input"
        required
        placeholder="Введите фамилию"
      />
    </div>
    
    <div class="form-group">
      <label class="form-label">Дата рождения:</label>
      <input
        v-model="formData.birthDate"
        type="date"
        class="form-input"
        required
      />
    </div>
    
    <div class="btn-group">
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? 'Сохранить изменения' : 'Добавить пользователя' }}
      </button>
      
      <button 
        v-if="isEditing" 
        type="button" 
        class="btn btn-secondary"
        @click="cancelEdit"
      >
        Отмена
      </button>
      
      <button 
        type="button" 
        class="btn btn-secondary"
        @click="resetForm"
      >
        Очистить форму
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

interface Props {
  editingUserId?: number | null
}

interface Emits {
  (e: 'submitted'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  editingUserId: null
})

const emit = defineEmits<Emits>()

const userStore = useUserStore()
const isEditing = ref(false)

const formData = ref({
  firstName: '',
  lastName: '',
  birthDate: ''
})

watch(() => props.editingUserId, (newId) => {
  if (newId) {
    loadUserData(newId)
  } else {
    resetForm()
  }
})

onMounted(() => {
  if (props.editingUserId) {
    loadUserData(props.editingUserId)
  }
})

function loadUserData(userId: number) {
  const user = userStore.getUserById(userId)
  if (user) {
    formData.value = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate
    }
    isEditing.value = true
  }
}

function handleSubmit() {
  if (!formData.value.firstName.trim() || !formData.value.lastName.trim() || !formData.value.birthDate) {
    alert('Пожалуйста, заполните все поля')
    return
  }

  if (isEditing.value && props.editingUserId) {
    userStore.updateUser(props.editingUserId, formData.value)
  } else {
    userStore.addUser(formData.value)
  }

  resetForm()
  emit('submitted')
}

function resetForm() {
  formData.value = {
    firstName: '',
    lastName: '',
    birthDate: ''
  }
  isEditing.value = false
  emit('cancel')
}

function cancelEdit() {
  resetForm()
}
</script>
