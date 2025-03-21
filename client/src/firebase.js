// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-d2a74.firebaseapp.com",
  projectId: "real-estate-d2a74",
  storageBucket: "real-estate-d2a74.firebasestorage.app",
  messagingSenderId: "1056265052718",
  appId: "1:1056265052718:web:849828ac45e062612775bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
