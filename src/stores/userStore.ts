import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  firstName: string
  lastName: string
  birthDate: string
}

interface UserFormData {
  firstName: string
  lastName: string
  birthDate: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      birthDate: '2020-01-01'
    },
    {
      id: 2,
      firstName: 'Петр',
      lastName: 'Петров',
      birthDate: '2025-06-12'
    },
    {
      id: 3,
      firstName: 'Сергей',
      lastName: 'Чернозём',
      birthDate: '1980-10-10'
    }
  ])
  
  const searchQuery = ref('')


  const filteredUsers = computed(() => {
    if (!searchQuery.value.trim()) {
      return users.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return users.value.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query)
    )
  })

  function getUserById(id: number): User | undefined {
    return users.value.find(user => user.id === id)
  }

  function addUser(userData: UserFormData) {
    const newUser: User = {
      ...userData,
      id: Date.now()
    }
    users.value.push(newUser)
    saveToLocalStorage()
  }

  function updateUser(id: number, userData: UserFormData) {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value[index] = { 
        ...users.value[index], 
        ...userData
      }
      saveToLocalStorage()
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter(user => user.id !== id)
    saveToLocalStorage()
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function clearSearch() {
    searchQuery.value = ''
  }


  function saveToLocalStorage() {
    try {
      localStorage.setItem('user-store', JSON.stringify(users.value))
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error)
    }
  }

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('user-store')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          users.value = parsed
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error)
    }
  }

  return {
    users,
    searchQuery,
    
    filteredUsers,
    getUserById,
    
    addUser,
    updateUser,
    deleteUser,
    setSearchQuery,
    clearSearch,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
