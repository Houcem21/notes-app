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
      </li>
    </ul>
  </div>
</template>

<style scoped>

.flex-centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  padding: 10rem;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,0.4);

  button {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>
