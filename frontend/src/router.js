import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/index/IndexPage.vue'
import MyTodoLists from './pages/todolists/MyTodoLists.vue'
import CreateNewTodoList from './pages/todolists/create/CreateNewTodoList.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/todolists', component: MyTodoLists },
  { path: '/todolists/create', component: CreateNewTodoList },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
