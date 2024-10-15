<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <select v-model="role">
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = async () => {
  createUserWithEmailAndPassword(auth, email.value, password.value, role.value)
    .then((data) => {
      console.log('Firebase Register Successful!')
      setDoc(doc(db, 'users', data.user.uid), { email: email.value, role: role.value })
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
