<script setup>
// import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import TodoItem from './TodoItem.vue'

import { useTodosStore } from '@/store/index.js'

const todosStore = useTodosStore()

const { tabs } = storeToRefs(todosStore)
const { selectedTabId } = storeToRefs(todosStore)
const { selectedTodos } = storeToRefs(todosStore)
const { selectTab } = todosStore

// const selectedTabId = computed(() => tabs.value.find((tab) => tab.isActive).id)
// const selectedTabId = ref(1)
// const selectedTodos = ref([])
// const selectedTodos = computed(
//   () => tabs.value.find((tab) => Number(tab.id) === Number(selectedTabId.value)).todos,
// )

// onMounted(() => {
//   console.log('selectedTabId >', selectedTabId.value)
//   // selectedTabId.value = tabs.value.find((tab) => tab.isActive).id
//   // selectedTodos.value = tabs.value.find((tab) => tab.id === selectedTabId.value).todos
// })

const changeSelectTab = (tabID) => {
  selectTab(tabID)
}

// onMounted(() => {
//   console.log(selectedTodos.value)
// })
</script>

<template>
  <ul class="todo-tabs flex items-center text-sm gap-3 px-3">
    <li
      class="todo-tabs__item flex justify-center items-center w-full"
      v-for="tab in tabs"
      :key="tab.caption"
      @click="changeSelectTab(tab.id)"
    >
      <span
        :class="`flex items-center justify-center ${Number(tab.id) === Number(selectedTabId) ? 'border-b-main-todo-600' : 'border-b-transparent'} border-b-2 px-3 pb-1`"
      >
        <span
          :class="`font-semibold${Number(tab.id) !== Number(selectedTabId) ? ' text-gray-400' : ''}`"
        >
          {{ tab.title }}
        </span>
        <span
          class="flex items-center justify-center text-gray-400 rounded-md bg-gray-100 ml-2 px-2 py-0.5"
          >{{ tab.countTodos }}</span
        >
      </span>
    </li>
  </ul>
  <div
    class="todo-tabs__item-content flex flex-col h-full bg-gray-todo-50 p-4 overflow-hidden max-h-full"
  >
    <div class="flex flex-col gap-4 overflow-auto h-full">
      <TodoItem
        v-for="selectedTodo in selectedTodos"
        :key="selectedTodo.id"
        :todo-item="selectedTodo"
      />
    </div>
  </div>
</template>

<style scope></style>
