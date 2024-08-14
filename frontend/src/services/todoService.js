export const todoService = {
  async createTodoList(title, description) {
    const response = await client.post('/todo-lists', { title, description });
    return response.data;
  },

  async getTodoLists() {
    const response = await client.get('/todo-lists');
    return response.data;
  },

  async getTodoList(id) {
    const response = await client.get(`/todo-lists/${id}`);
    return response.data;
  },

  async updateTodoList(id, title, description) {
    const response = await client.put(`/todo-lists/${id}`, { title, description });
    return response.data;
  },

  async deleteTodoList(id) {
    const response = await client.delete(`/todo-lists/${id}`);
    return response.data;
  },
};
