<script setup lang="ts">
import { ref } from 'vue'

const note = ref({
  title: '',
  content: '',
})
const successMessage = ref('')
const failureMessage = ref('')

async function submitPost() {
  try {
    const response = await fetch('http://localhost:3000/c', {
      method: 'POST',
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
    successMessage.value = `Post created successfully: ${JSON.stringify(data)}`
    note.value = { title: '', content: '' }
  } catch (error) {
    if (error instanceof Error) failureMessage.value = `Error submitting post: ${error?.message}`
    else console.log('Unknown error occured')
  }
}
</script>

<template>
  <div class="wrapper flex-centered">
    <h1>Erstellen ein Beitrag</h1>
    <form @submit.prevent="submitPost">
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
