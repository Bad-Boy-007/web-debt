<template>
  <div class="search-container">
    <input
      v-model="searchInput"
      type="text"
      class="search-input"
      placeholder="Поиск по имени или фамилии..."
      @input="handleSearch"
    />
    
    <div v-if="searchInput" style="margin-top: 10px;">
      <button class="btn btn-secondary" @click="clearSearch">
        Очистить поиск
      </button>
      <span style="margin-left: 10px; color: #718096;">
        Найдено: {{ filteredUsers.length }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { searchQuery, filteredUsers } = storeToRefs(userStore)

const searchInput = ref(searchQuery.value)

watch(searchQuery, (newQuery) => {
  searchInput.value = newQuery
})

function handleSearch() {
  userStore.setSearchQuery(searchInput.value)
}

function clearSearch() {
  searchInput.value = ''
  userStore.clearSearch()
}
</script>
