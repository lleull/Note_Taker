import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCH9ecw8LiHvQI1H64Dg07eO17h54B5yXU",
    authDomain: "note-4d800.firebaseapp.com",
    projectId: "note-4d800",
    storageBucket: "note-4d800.firebasestorage.app",
    messagingSenderId: "782471089236",
    appId: "1:782471089236:web:623e2713c82e0361b931c1",
    measurementId: "G-CKCXTGF0WL"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)