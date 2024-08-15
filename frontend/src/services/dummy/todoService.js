import { dummyUsers, currentUser } from '@/services/dummy/authService';

export const dummyTodoLists = [{
  id: 1,
  title: 'Dummy Todo List',
  description: 'This is a dummy todo list.',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
  createdBy: dummyUsers[0].id,
  todos: [
    {
      id: 1,
      title: 'Dummy Todo 1',
      description: 'This is a dummy todo.',
      completed: false,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 2,
      title: 'Dummy Todo 2',
      description: 'This is another dummy todo.',
      completed: false,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ],
}];


export const dummyTodoService = {
  async createTodoList(title, description) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todoList = {
      id: 1,
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser,
      todos: [],
    };

    dummyTodoLists.push(todoList);

    return todoList;
  },

  async getTodoLists() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    dummyTodoLists.filter((todoList) => todoList.createdBy === currentUser);

    return dummyTodoLists;
  },

  async getTodoList(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todoList = dummyTodoLists.find((todoList) => todoList.id === id && todoList.createdBy === currentUser);

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    return todoList;
  },

  async updateTodoList(id, title, description) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todoList = dummyTodoLists.find((todoList) => todoList.id === id && todoList.createdBy === currentUser);

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    todoList = {
      ...todoList,
      title,
      description,
      updatedAt: new Date().toISOString(),
    };
  },

  async deleteTodoList(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = dummyTodoLists.findIndex((todoList) => todoList.id === id && todoList.createdBy === currentUser);

    if (index === -1) {
      throw new Error('Todo list not found');
    }

    dummyTodoLists.splice(index, 1);

    return { id };
  },
};