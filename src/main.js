// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Import the functions you need from the SDKs you need

// Initialize Firebase
const app = createApp(App)

// Initialize Firebase

app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)
app.use(router)
app.mount('#app')
