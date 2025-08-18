<script setup>
// import { onMounted, ref, provide } from 'vue'
// import { storeToRefs } from 'pinia'
// import axios from 'axios'
// const todos = ref([])
// const priorities = ref([])
// const categories = ref([])

// import { useTodosStore } from '@/store/index.js'
// import HomeView from './views/HomeView.vue'

// const todosStore = useTodosStore()

// const { todos } = storeToRefs(todosStore)

// const { fetchTodos } = todosStore

// const fetchTodos = async () => {
//   try {
//     const { data } = await axios.get('http://localhost:3000/todos')
//     todos.value = data
//   } catch (error) {
//     console.log(error)
//   }
// }

// onMounted(async () => {
//   await fetchPriorities()
//   await fetchCategories()
// })

// provide('todosInfo', {
//   // todos,
//   priorities,
//   categories,
// })
</script>

<template>
  <div class="flex flex-col h-full pt-2">
    <!-- <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView> -->
    <RouterView />
    <!-- <HomeView /> -->
  </div>
</template>
