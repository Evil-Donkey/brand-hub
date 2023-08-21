// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwVnhclY5v6zvsKJDGpEdXFKs8IMAUl2I",
  authDomain: "brand-hub-d096e.firebaseapp.com",
  projectId: "brand-hub-d096e",
  storageBucket: "brand-hub-d096e.appspot.com",
  messagingSenderId: "422847523290",
  appId: "1:422847523290:web:618a54645b07aab70bf8e3",
  measurementId: "G-2ZJYD6NTKE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)