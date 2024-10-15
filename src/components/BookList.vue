<template>
  <div>
    <h1>Books with ISBN > 1000, ordered by ISBN in descending order, limited to 5</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="removeBook(book.id)">Remove Book</button>
        <button @click="toggleUpdate = !toggleUpdate">Update Book</button>
        <div v-if="toggleUpdate">
          <input type="text" v-model="newName" />
          <input type="text" v-model="newIsbn" />
          <button @click="updateBook(book.id, newName, newIsbn)">Update Book</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  limit
} from 'firebase/firestore'
import db from '../firebase/init'

export default {
  setup() {
    const books = ref([])
    const toggleUpdate = ref(false)

    const newName = ref('')
    const newIsbn = ref('')

    const fetchBooks = async () => {
      try {
        const booksRef = collection(db, 'books')
        const q = query(booksRef, where('isbn', '>', 1000), orderBy('isbn', 'desc'), limit(5))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({
            id: doc.id,
            name: doc.data().name,
            isbn: doc.data().isbn
          })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    const removeBook = async (id) => {
      try {
        const docRef = doc(collection(db, 'books'), id)
        await deleteDoc(docRef)
        books.value = books.value.filter((book) => book.id !== id)
      } catch (error) {
        console.error('Error removing book:', error)
      }
    }

    const updateBook = async (id, newName, newIsbn) => {
      try {
        const docRef = doc(collection(db, 'books'), id)
        await updateDoc(docRef, {
          name: newName,
          isbn: Number(newIsbn)
        })
      } catch (error) {
        console.error('Error updating book:', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return { books, removeBook, updateBook, toggleUpdate }
  }
}
</script>
