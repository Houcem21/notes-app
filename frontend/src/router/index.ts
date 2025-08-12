import { createRouter, createWebHistory } from 'vue-router'
import CreateNote from '@/components/CreateNote.vue'
import Home from '@/components/Home.vue'
import UpdateNote from '@/components/UpdateNote.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: Home},
    {path: '/create-note', component: CreateNote},
    {path: '/update-note/:id', component: UpdateNote}
  ],
})

export default router
