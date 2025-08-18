<template>
  <div class="flex item-center justify-between bg-white rounded-xl px-3 py-3.5 min-h-20">
    <div class="flex items-center">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="todo.todoItem.completed"
          @change="updateTodoCompleted(todo.todoItem)"
        />
        <span class="checkbox-checkmark"></span>
      </label>
      <RouterLink
        :to="`/edit-task/${todo.todoItem.id}`"
        class="flex flex-col justify-between ml-3 gap-1.5"
      >
        <span class="font-bold text-md">{{ todo.todoItem.title }}</span>
        <span class="text-xs text-gray-todo-600">
          {{
            new Date(todo.todoItem.deadline).toLocaleDateString('en-us', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          }}</span
        >
      </RouterLink>
    </div>
    <div class="flex flex-col h-full justify-between">
      <div :class="`flex w-2.5 h-2.5 rounded-[50%] self-end ${currentTodoPriorityClassName}`"></div>
      <div
        :class="`flex items-center justify-center px-2 py-0.5 rounded-sm text-[11px] ${currentTodoCategoryTextColor} ${currentTodoCategoryBgColor}`"
      >
        {{ currentCategoryName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useTodosStore } from '@/store'

const todosStore = useTodosStore()

const { priorities, categories } = storeToRefs(todosStore)
const { todoCompleted } = todosStore

const currentTodoPriorityClassName = ref('')
const currentTodoCategoryTextColor = ref('')
const currentTodoCategoryBgColor = ref('')
const currentCategoryName = ref('')

const todo = defineProps({
  todoItem: Object,
})

const updateTodoCompleted = (todoItem) => {
  todoCompleted(todoItem)
}

onMounted(async () => {
  currentTodoPriorityClassName.value = priorities.value.find(
    (priority) => Number(priority.id) === Number(todo.todoItem.priorityId),
  ).cssColorName

  const tempCategory = categories.value.find(
    (category) => Number(category.id) === Number(todo.todoItem.categoryId),
  )

  currentTodoCategoryTextColor.value = tempCategory.colorText
  currentTodoCategoryBgColor.value = tempCategory.bgColor
  currentCategoryName.value = tempCategory.caption
})
</script>
