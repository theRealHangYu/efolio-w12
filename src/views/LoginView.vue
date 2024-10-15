<template>
  <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
      <router-link to="/register">
        <button type="submit">Register</button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      const storedCredentials = localStorage.getItem('userCredentials')
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials)
        if (this.username === credentials.username && this.password === credentials.password) {
          localStorage.setItem('isAuth', 'true')
          this.$router.push('/')
        } else {
          console.log('Login failed')
        }
      }
    }
  }
}
</script>

<style scoped>
.login-view {
  max-width: 300px;
  margin: 0 auto;
}
</style>
