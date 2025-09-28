// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDeUVjrdW6VusqhcnBU27qLDheYDAcJgeQ",
  authDomain: "backend-638af.firebaseapp.com",
  projectId: "backend-638af",
  storageBucket: "backend-638af.firebasestorage.app",
  messagingSenderId: "560157772805",
  appId: "1:560157772805:web:38a42aaf1bbe5b8329a06c"
};


// Initialize Firebase
// This pattern prevents re-initializing the app on hot-reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };