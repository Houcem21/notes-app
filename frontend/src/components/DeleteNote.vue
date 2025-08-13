<script setup lang="ts">
import {ref, onMounted, } from 'vue';
import { useRoute } from 'vue-router';

const note = ref({
  title: '',
  content: ''
})

async function fetchNote(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/r/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

const route = useRoute();
const userId = route.params.id as string;

onMounted(() => {
  fetchNote(userId).then(data => {
    if (data.hasOwnProperty('title') && data.hasOwnProperty('content'))
      note.value = data;
  });
});


const successMessage = ref('');
const failureMessage = ref('');

async function deletePost() {
  try {
  const response = await fetch(`http://localhost:3000/d/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  const data = await response.json();
  successMessage.value = `Post deleted successfully: ${JSON.stringify(data)}`;

  } catch (error) {
    if (error instanceof Error) failureMessage.value = `Error deleting post: ${error?.message}`;
    else console.log("Unknown error occured")
  }
}
</script>

<template>
  <div class="wrapper flex-centered gap-1-rem">
    <h1>Sicher?</h1>

    <div class="post-container">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
    </div>
    
    <button @click="deletePost">Bestätigen</button>
    <p v-if="successMessage" class="success">{{  successMessage }}</p>
    <p v-if="failureMessage" class="failure">{{  failureMessage }}</p>

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
