import { ref, computed } from 'vue'
import axios from 'axios'

import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])
  const priorities = ref([])
  const categories = ref([])
  const tabs = ref([])
  const selectedTabId = ref(1)
  const selectedTodos = ref([])

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get('https://42cfcc8765a6c5d4.mokky.dev/todos')
      todos.value = data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPriorities = async () => {
    try {
      const { data } = await axios.get('https://42cfcc8765a6c5d4.mokky.dev/priorities')
      priorities.value = data
      console.log('fetch priorities')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://42cfcc8765a6c5d4.mokky.dev/categories')
      categories.value = data
    } catch (error) {
      console.log(error)
    }
  }

  const todoCompleted = async (todoItem) => {
    try {
      const newCompleted = !todoItem.completed
      // const { data } = await axios.patch(`http://localhost:3000/todos/${todoItem.id}`, {
      //   completed: newCompleted,
      // })

      const index = todos.value.findIndex((_todoItem) => _todoItem.id == todoItem.id)

      if (index !== -1) {
        todos.value[index].completed = newCompleted
        // Або, якщо ваш сервер повертає оновлену задачу, ви можете оновити її повністю:
        // this.tasks[index] = response.data;
        // todos.value[index] = data
      }

      updateTabs()

      updateSelectedTodos()
      await saveTodosChanges(todoItem.id, newCompleted)
      // console.log(tabs.value)
    } catch (error) {
      console.log(error)
    }
  }

  const saveTodosChanges = async (id, completed) => {
    await axios.patch(`https://42cfcc8765a6c5d4.mokky.dev/todos/${id}`, {
      completed,
    })
  }

  const deleteTodo = async (id) => {
    const { status } = await axios.delete(`https://42cfcc8765a6c5d4.mokky.dev/todos/${id}`)
    if (status === 200 || status === 201 || status === 202) {
      todos.value = todos.value.filter((todo) => String(todo.id) !== String(id))
      updateTabs()
    }
    return status
  }

  const updateTabs = () => {
    tabs.value.forEach((tab) => {
      if (tab.typeTodos === 'tasksToStart') {
        // tab.todos = computed(() => todos.value.filter((todo) => !todo.completed))
        tab.todos = computed(() => todos.value.filter((todo) => !todo.completed))
        tab.countTodos = tab.todos.length
      }
      if (tab.typeTodos === 'tasksCompleted') {
        tab.todos = computed(() => todos.value.filter((todo) => todo.completed))
        tab.countTodos = tab.todos.length
      }
    })
  }

  const fetchTabs = async () => {
    try {
      const { data } = await axios.get('https://42cfcc8765a6c5d4.mokky.dev/tabs')
      tabs.value = data
      updateTabs()
    } catch (error) {
      console.log(error)
    }
  }

  const selectTab = (tabId) => {
    selectedTabId.value = tabId
    tabs.value.forEach((tab) => {
      tab.isActive = tabId == tab.id
    })
    updateSelectedTodos()
  }

  const updateSelectedTodos = () => {
    selectedTodos.value = tabs.value.find((tab) => tab.id == selectedTabId.value).todos
  }

  return {
    todos,
    priorities,
    categories,
    tabs,
    selectedTabId,
    selectedTodos,
    fetchTodos,
    fetchPriorities,
    fetchCategories,
    todoCompleted,
    fetchTabs,
    updateTabs,
    updateSelectedTodos,
    selectTab,
    deleteTodo,
  }
})
