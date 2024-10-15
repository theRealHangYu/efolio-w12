import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAEtCcPFpYrEZ9ab_HJZEwMpEN8VB1pHes',
  authDomain: 'week7-hang.firebaseapp.com',
  projectId: 'week7-hang',
  storageBucket: 'week7-hang.appspot.com',
  messagingSenderId: '830221160755',
  appId: '1:830221160755:web:2b519d38250090cdb1ee46'
}

initializeApp(firebaseConfig)
const db = getFirestore()
export default db
