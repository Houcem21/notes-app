<script setup lang="ts">
import {ref} from 'vue';

interface Note {
  id: string,
  title: string,
  content: string
}

const notes = ref<Note[]>([])

async function fetchNotes() {
  try {
    const response = await fetch("http://localhost:3000/r");
    const data = await response.json();
    notes.value = Array.from(data);
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="wrapper flex-centered">
    <h1>Die Schaltfläche auf Klicken Sie, um die Notizen zu sehen.</h1>
    <button class="fetch-btn" @click="fetchNotes">Genau hier, Kumpel</button>
    <ul class="notes-container">
      <li v-for="note in notes">
        {{ note.title }}
        <router-link :to="{path: '/update-note/' + note.id}">Aktualisieren</router-link>
      </li>
    </ul>
    <router-link to="/create-note">Erstellen Neue</router-link>
  </div>
</template>

<style scoped>

</style>
