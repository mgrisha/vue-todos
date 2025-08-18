<template>
  <div class="flex flex-col h-full relative">
    <div>
      <h1 class="text-center text-xl font-bold text-main-todo-600">TODO List App</h1>
    </div>
    <hr class="my-2 text-gray-todo-100" />
    <div class="flex flex-col h-full overflow-hidden">
      <Tabs />
    </div>
    <RouterLink
      to="/add-task"
      class="bg-main-todo-600 rounded-md w-10 h-10 flex justify-center items-center absolute text-white bottom-4 right-4"
    >
      <i class="fa-solid fa-plus fa-xl"></i>
    </RouterLink>
  </div>
</template>

<script setup>
import Tabs from '@/components/Tabs.vue'
</script>
