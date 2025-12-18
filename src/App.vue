<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import HomeView from './views/HomeView.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.loadFromLocalStorage()
})
</script>
