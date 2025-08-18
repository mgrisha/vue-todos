<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between px-4 pb-2">
      <div class="flex items-center">
        <RouterLink class="rounded-[50%] w-6 h-6 flex justify-center items-center border-2" to="/">
          <i class="fa-solid fa-arrow-left fa-xs"></i>
        </RouterLink>
        <h1 class="text-center text-xl font-bold ml-3">
          {{ paramsID ? 'Edit task' : 'Add new task' }}
        </h1>
      </div>
      <div
        class="rounded-[50%] w-7 h-7 flex justify-center items-center border-1 border-red-500"
        v-if="paramsID"
        @click="deleteTask"
      >
        <i class="fa-solid fa-trash fa-xs text-red-500"></i>
      </div>
    </div>
    <!-- <hr class="my-4 text-gray-todo-100" /> -->
    <div
      class="flex flex-col h-full overflow-hidden bg-gray-50 border-t-1 border-gray-todo-100 px-4 py-2"
    >
      <form class="flex flex-col text-sm w-full" @submit="submitForm">
        <div class="flex flex-column gap-2 flex-col relative">
          <label for="task-title" class="font-bold self-start">Title</label>
          <input
            :class="`p-3 border rounded-md outline-0 transition text-gray-todo-700 placeholder:text-gray-todo-700 ${errors.title !== '' ? 'border-red-400 rounded-b-none' : 'border-gray-todo-200 focus:border-gray-todo-400'}`"
            type="text"
            placeholder="Enter task title"
            id="task-title"
            v-model="formData.title"
            @input="changeInput"
            name="title"
          />
          <span
            :class="`absolute text-white -bottom-5 text-xs px-2 py-0.5 bg-red-400 rounded-b-sm w-full ${errors.title !== '' ? 'opacity-100' : 'opacity-0'}`"
          >
            {{ errors.title }}
          </span>
        </div>
        <div class="flex flex-column gap-2 flex-col mt-5 relative">
          <label for="task-description" class="font-bold">Description</label>
          <textarea
            :class="`p-3 border rounded-md outline-0 transition resize-none text-gray-todo-700 placeholder:text-gray-todo-700 ${errors.description !== '' ? 'border-red-400 rounded-b-none' : 'border-gray-todo-200 focus:border-gray-todo-400'}`"
            type="textarea"
            placeholder="Enter Description here..."
            id="task-description"
            v-model="formData.description"
            rows="5"
            @input="changeInput"
            name="description"
          ></textarea>
          <span
            :class="`absolute text-white -bottom-5 text-xs px-2 py-0.5 bg-red-400 rounded-b-sm w-full ${errors.description !== '' ? 'opacity-100' : 'opacity-0'}`"
          >
            {{ errors.description }}
          </span>
        </div>
        <div class="flex flex-column gap-2 flex-col mt-5">
          <div class="font-bold">Select Category</div>
          <div class="flex flex-wrap gap-2 text-xs relative" id="task-category">
            <label
              :class="`relative cursor-pointer rounded-md py-2 px-3 ${Number(formData.categoryId) === Number(category.id) ? 'bg-main-todo-600 text-white' : 'bg-main-todo-100 text-main-todo-600'} transition hover:bg-main-todo-600 hover:text-white`"
              v-for="category in categories"
              :key="category.id"
            >
              <input
                type="radio"
                :checked="Number(formData.categoryId) === Number(category.id)"
                :id="`task-category-${category.caption}`"
                name="category"
                v-model="formData.categoryId"
                :value="category.id"
                class="absolute opacity-0 w-0 h-0"
                @input="changeInput"
              />
              <span>{{ category.caption }}</span>
            </label>
            <span
              :class="`absolute text-white -bottom-[22px] text-xs px-2 py-0.5 bg-red-400 rounded-sm ${errors.category !== '' ? 'opacity-100' : 'opacity-0'}`"
            >
              {{ errors.category }}
            </span>
          </div>
        </div>
        <div class="flex flex-column gap-2 flex-col mt-5 relative">
          <label for="task-deadline" class="font-bold">Deadline</label>
          <Datepicker
            v-model:value="formData.deadline"
            type="date"
            placeholder="Select date"
            id="task-deadline"
            class="task-datepicker"
            :input-class="`task-datepicker__input ${errors.deadline !== '' ? 'has-error' : ''}`"
            value-type="YYYY-MM-DD"
            format="DD/MM/YYYY"
            :input-attr="{ name: 'deadline' }"
            @input="changeInput"
          >
            <template #icon-calendar
              ><span class="fa-solid fa-calendar-days fa-xl text-main-todo-600"></span></template
          ></Datepicker>
          <span
            :class="`absolute text-white -bottom-5 text-xs px-2 py-0.5 bg-red-400 rounded-b-sm w-full ${errors.deadline !== '' ? 'opacity-100' : 'opacity-0'}`"
          >
            {{ errors.description }}
          </span>
        </div>
        <div class="flex flex-column gap-2 flex-col mt-5">
          <div class="font-bold">Set Priority</div>
          <div class="flex justify-between text-xs relative">
            <div
              class="flex items-center gap-1.5"
              v-for="priority in priorities"
              :key="priority.id"
            >
              <label class="checkbox-label">
                <input
                  type="radio"
                  :checked="Number(formData.priorityId) === Number(priority.id)"
                  :id="`task-priority-${priority.caption}`"
                  name="priority"
                  v-model="formData.priorityId"
                  :value="priority.id"
                  @input="changeInput"
                />
                <span class="checkbox-checkmark"></span>
              </label>
              <label class="text-gray-todo-800" :for="`task-priority-${priority.caption}`">{{
                priority.caption
              }}</label>
            </div>
            <span
              :class="`absolute text-white -bottom-[22px] text-xs px-2 py-0.5 bg-red-400 rounded-sm ${errors.priority !== '' ? 'opacity-100' : 'opacity-0'}`"
            >
              {{ errors.priority }}
            </span>
          </div>
        </div>
        <button
          type="submit"
          class="bg-main-todo-600 rounded-4xl text-center py-3 text-white font-bold mt-6 self-center px-28"
        >
          {{ paramsID ? 'Save' : 'Add' }} Task!
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'

const router = useRouter()

const todosStore = useTodosStore()

const { categories, priorities, todos } = storeToRefs(todosStore)
const { deleteTodo } = todosStore

const route = useRoute()

const paramsID = ref(null)

const formData = ref({
  id: uuidv4(),
  title: '',
  description: '',
  categoryId: null,
  deadline: moment().format('YYYY-MM-DD'),
  priorityId: null,
  completed: false,
})

const errors = ref({
  title: '',
  description: '',
  category: '',
  deadline: '',
  priority: '',
})

const submitForm = async (e) => {
  e.preventDefault()
  // console.log(formData.value)
  // router.push({
  //   name: 'Home',
  // })
  if (formData.value.title === '' || formData.value.title === 'undefined') {
    errors.value.title = "Це поле обов'язкове!"
  } else if (formData.value.title.length <= 2) {
    errors.value.title = 'Назва завдання має бути більше 2 символів!'
  } else {
    errors.value.title = ''
  }

  if (formData.value.description === '' || formData.value.description === 'undefined') {
    errors.value.description = "Це поле обов'язкове!"
  } else if (formData.value.description.length <= 10) {
    errors.value.description = 'Назва завдання має бути більше 10 символів!'
  } else {
    errors.value.description = ''
  }

  if (Number(formData.value.categoryId) === 0) {
    errors.value.category = "Це поле обов'язкове!"
  }

  if (formData.value.deadline === '') {
    errors.value.deadline = "Це поле обов'язкове!"
  } else if (isNaN(Date.parse(formData.value.deadline))) {
    errors.value.deadline = 'Це не є датою!'
  }

  if (Number(formData.value.priorityId) === 0) {
    errors.value.priority = "Це поле обов'язкове!"
  }

  if (
    errors.value.title === '' &&
    errors.value.description === '' &&
    errors.value.category === '' &&
    errors.value.deadline === '' &&
    errors.value.priority === ''
  ) {
    let status = null
    let data = null
    if (!paramsID.value) {
      const response = await axios.post('https://42cfcc8765a6c5d4.mokky.dev/todos', formData.value)
      status = response.status
      data = response.data
    } else {
      const response = await axios.patch(
        `https://42cfcc8765a6c5d4.mokky.dev/todos/${paramsID.value}`,
        formData.value,
      )
      status = response.status
    }

    if (status == 200 || status === 201 || status === 202) {
      router.push({
        name: 'Home',
      })
      if (data) {
        todos.value = [...todos.value, data]
      } else {
        todos.value = [...todos.value]
      }
    }
  }
}

const changeInput = (e) => {
  const inputName = e.target.name
  errors.value[inputName] = ''

  // console.log(inputName)

  // const inputValue = e.target.value
  // if (inputName === 'task-title') {
  //   if (inputValue.length === 0) {
  //     errors.value.title = "Це поле обов'язкове!"
  //   } else if (inputValue.length <= 2) {
  //     errors.value.title = 'Назва завдання має бути більше 2 символів!'
  //   } else {
  //     errors.value.title = ''
  //   }
  // }
}

const deleteTask = async () => {
  if (paramsID) {
    const status = await deleteTodo(paramsID.value)
    if (status == 200 || status === 201 || status === 202) {
      router.push({
        name: 'Home',
      })
    }
  }
}

onMounted(() => {
  paramsID.value = route.params.id
  if (paramsID.value) {
    formData.value = todos.value.find((todo) => String(todo.id) === String(paramsID.value))
  }
})

// const focusOutInput = (e) => {
//   const inputName = e.target.name
//   const inputValue = e.target.value
//   if (inputName === 'task-title') {
//     if (inputValue === '') {
//       errors.value.title = ''
//     }
//   }
// }
</script>

<style scoped>
:deep(.task-datepicker) {
  width: 100%;
}
:deep(.task-datepicker__input) {
  border: 1px solid var(--color-gray-todo-200);
  background-color: transparent;
  border-radius: var(--radius-md);
  width: 100%;
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 3) calc(var(--spacing) * 3)
    calc(var(--spacing) * 10);
  outline: none;
  transition: border-color 0.15s;
  color: var(--color-gray-todo-700);
}
:deep(.task-datepicker__input.has-error) {
  border-color: var(--color-red-400);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
:deep(.task-datepicker__input::placeholder) {
  color: var(--color-gray-todo-700);
}
:deep(.task-datepicker__input:focus) {
  border-color: var(--color-gray-todo-400);
}
:deep(.task-datepicker .mx-input-wrapper) {
  display: flex;
  flex-direction: row;
  align-items: center;
}
:deep(.task-datepicker .mx-icon-calendar),
:deep(.task-datepicker .mx-icon-clear) {
  right: unset;
  left: calc(var(--spacing) * 4);
  color: var(--color-main-todo-600);
  font-size: 12px;
}
:deep(.mx-input-wrapper:hover .mx-icon-clear + .mx-icon-calendar) {
  display: block;
}
:deep(.mx-input-wrapper:hover .mx-icon-clear) {
  display: none;
}
:deep(.task-datepicker svg) {
  display: none;
}
:deep(.task-datepicker .fa-calendar-days) {
  font-weight: 500;
}
.checkbox-label {
  width: 20px;
  height: 20px;
}
.checkbox-checkmark {
  border-radius: 0.4rem;
}
.checkbox-checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
}
.checkbox-checkmark__category {
  position: relative;
  top: unset;
  left: unset;
}
.checkbox-checkmark__category:after {
  content: none;
}
.checkbox-label__category {
  width: auto;
  height: auto;
}
</style>
