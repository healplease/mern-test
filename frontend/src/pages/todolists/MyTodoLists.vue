<template>
  <h1 class="text-h3 pb-3">My Todo Lists</h1>
  <p class="text-subtitle-1 pb-5">This is the home page of the To-Do List application.</p>
  <v-card v-for="todoList in todoLists">
    <v-card-title>{{ todoList.title }}</v-card-title>
    <v-card-text>{{ todoList.description }}</v-card-text>
  </v-card>
</template>

<script>
import { dummyTodoService } from '@/services/dummy/todoService';
export default {
  name: 'MyTodoLists',
  data() {
    return {
      todoLists: []
    }
  },
  created() {
    this.todoLists = dummyTodoService.getTodoLists();
  }
}
</script>
