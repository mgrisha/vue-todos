import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddNewTask from '@/views/AddNewTask.vue'
import { useTodosStore } from '@/store'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory('/vue-todos/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/add-task',
      name: 'AddNewTask',
      component: AddNewTask,
      meta: {
        title: 'Add new task',
      },
    },
    {
      path: '/edit-task/:id',
      name: 'Edit task',
      component: AddNewTask,
      meta: {
        title: 'Edit task',
      },
      props: true,
    },
    // {
    //   path: '/edit-task/:id',
    //   name: 'EditTask',
    //   component: EditTask,
    //   meta: {
    //     title: 'Edit task',
    //   },
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  const todosStore = useTodosStore()
  const { todos, priorities, categories, tabs } = storeToRefs(todosStore)
  const { fetchTodos, fetchCategories, fetchPriorities, fetchTabs, updateSelectedTodos } =
    todosStore

  if (!todos.value.length) {
    await fetchTodos()
  }
  if (!priorities.value.length) {
    await fetchPriorities()
  }
  if (!categories.value.length) {
    await fetchCategories()
  }
  if (!tabs.value.length) {
    await fetchTabs()
  }

  updateSelectedTodos()

  document.title = `${to.meta.title} | TODO List App`
  next()
})

export default router
