<template>
  <div class="container">
    <h1>Get Book Count</h1>
    <button @click="getBookCount">Get Book Count</button>
    <h2 v-if="count">Total number of books: {{ count }}</h2>
    <h2 v-if="error">{{ error }}</h2>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const count = ref(0)
const error = ref('')

async function getBookCount() {
  try {
    const response = await axios.get('https://countbooks-jc3t3rqtwa-uc.a.run.app')
    count.value = response.data.count
    error.value = ''
  } catch (err) {
    console.error('Error fetching book count:', err.message)
    error.value = err.message
    count.value = 0
  }
}
</script>
