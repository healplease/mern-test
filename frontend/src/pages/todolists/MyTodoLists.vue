<template>
  <h1 class="text-h3 pb-3">My Todo Lists</h1>
  <p class="text-subtitle-1 pb-5">This is the home page of the To-Do List application.</p>
  <v-card v-for="todo in todos" class="mb-3">
    <v-card-title>{{ todo.title }}</v-card-title>
    <v-card-subtitle>{{ todo.description }}</v-card-subtitle>
    <v-card-text>
      <v-list
        lines="one"
      >
        <v-list-item
          v-for="task in todo.tasks"
          :key="task.id"
        >
          <v-list-item-title>{{ task.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>

          <template v-slot:prepend>
            <v-checkbox-btn
              v-model="task.completed"
              color="primary"
              @change="toggleTaskCompleted(todo, task)"
            ></v-checkbox-btn>
          </template>

          <template v-slot:append>
            <v-btn icon variant="text">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              @click="deleteTask(todo, task)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn text>View</v-btn>
      <v-btn text>Edit</v-btn>
      <v-btn text>Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { todoService } from '@/services/todoService.js'
export default {
  name: 'MyTodoLists',
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    this.todos = todoService.getTodoLists().then((response) => {
      this.todos = response.todos
    })
  },
  methods: {
    toggleTaskCompleted(todo, task) {
      todoService.updateTodoTask(todo.id, task.id, { completed: task.completed }).then((response) => {
        this.todos.map((todo) => {
          if (todo.id === response.todo.id) {
            todo.tasks = response.todo.tasks
          }
        })
      })
    },
    deleteTask(todo, task) {
      todoService.deleteTodoTask(todo.id, task.id)
    },
  }
}
</script>
