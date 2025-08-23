<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const note = ref({
  title: '',
  content: '',
})

async function fetchNote(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/r/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const route = useRoute()
const userId = route.params.id as string

onMounted(() => {
  fetchNote(userId).then((data) => {
    if (data.hasOwnProperty('title') && data.hasOwnProperty('content')) note.value = data
  })
})

const successMessage = ref('')
const failureMessage = ref('')

async function updatePost() {
  try {
    const response = await fetch(`http://localhost:3000/u/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note.value),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    const data = await response.json()
    successMessage.value = `Post updated successfully: ${JSON.stringify(data)}`
  } catch (error) {
    if (error instanceof Error) failureMessage.value = `Error updating post: ${error?.message}`
    else console.log('Unknown error occured')
  }
}
</script>

<template>
  <div class="wrapper flex-centered">
    <h1>Anderung ein Beitrag</h1>
    <form @submit.prevent="updatePost">
      <div>
        <label for="title">Titel</label>
        <input type="text" v-model="note.title" id="title" required />
      </div>
      <div>
        <label for="content">Inhalt</label>
        <textarea type="text" v-model="note.content" id="content" required> </textarea>
      </div>
      <button>Beitrag hochladen</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="failureMessage" class="failure">{{ failureMessage }}</p>

    <router-link to="/">Zurückgeben</router-link>
  </div>
</template>

<style scoped>
.success {
  color: green;
}
.failure {
  color: red;
}
</style>
