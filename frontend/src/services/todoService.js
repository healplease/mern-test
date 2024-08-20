import client from "@/client";

export const todoService = {
  async getTodoLists() {
    const response = await client.get('/api/todos/');
    return response.data;
  },

  async createTodoList(payload) {
    const response = await client.post('/api/todos/', payload);
    return response.data;
  },

  async getTodoList(todoId) {
    const response = await client.get(`/api/todos/${todoId}`);
    return response.data;
  },

  async updateTodoList(todoId, payload) {
    const response = await client.patch(`/api/todos/${todoId}`, payload);
    return response.data;
  },

  async deleteTodoList(todoId) {
    const response = await client.delete(`/api/todos/${todoId}`);
    return response.data;
  },

  async getTodoTasks(todoId) {
    const response = await client.get(`/api/todos/${todoId}/tasks`);
    return response.data;
  },

  async createTodoTask(todoId, payload) {
    const response = await client.post(`/api/todos/${todoId}/tasks`, payload);
    return response.data;
  },

  async getTodoTask(todoId, taskId) {
    const response = await client.get(`/api/todos/${todoId}/tasks/${taskId}`);
    return response.data;
  },

  async updateTodoTask(todoId, taskId, payload) {
    const response = await client.patch(`/api/todos/${todoId}/tasks/${taskId}`, payload);
    return response.data;
  },

  async deleteTodoTask(todoId, taskId) {
    const response = await client.delete(`/api/todos/${todoId}/tasks/${taskId}`);
    return response.data;
  },
};
