// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7UeHQ6jWco5GOcc7nKRBP8VvvqhLxpHk",
  authDomain: "auth-f4c2e.firebaseapp.com",
  projectId: "auth-f4c2e",
  storageBucket: "auth-f4c2e.firebasestorage.app",
  messagingSenderId: "782954186238",
  appId: "1:782954186238:web:3998d912741d127ba4ecaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);