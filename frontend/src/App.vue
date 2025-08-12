<script setup lang="ts">
import {ref} from 'vue';

interface Note {
  id: string,
  title: string,
  content: string
}

const notes = ref<Note[]>([])

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
