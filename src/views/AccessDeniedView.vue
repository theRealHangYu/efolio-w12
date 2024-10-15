<template>
  <div class="access-denied">
    <h1>Access Denied</h1>
    <p>
      You do not have permission to access this page. You will be redirected to the login page in
      {{ countdown }} seconds.
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AccessDeniedView',
  setup() {
    const router = useRouter()
    const countdown = ref(3)

    onMounted(() => {
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value === 0) {
          clearInterval(timer)
          router.push('/login')
        }
      }, 1000)
    })

    return {
      countdown
    }
  }
}
</script>

<style scoped>
.access-denied {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #ff4444;
}
</style>
