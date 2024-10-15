/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.addBooks = capitalizeBookData = functions.firestore
  .document('books/{bookId}')
  .onCreate((snap) => {
    const book = snap.data()
    const capitalizedBook = {
      name: book.name.toUpperCase()
    }
    return snap.ref.set(capitalizedBook, { merge: true })
    s
  })

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()

      if (snapshot && snapshot.docs) {
        const books = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        res.status(200).json(books)
      } else {
        res.status(200).json()
      }
    } catch (error) {
      console.error(':', error.message)
      res.status(500).send('')
    }
  })
})
