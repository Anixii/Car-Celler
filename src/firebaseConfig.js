// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6XpUajeZM10NQTjZ3KS0Gsv5nb2E1wbU",
  authDomain: "cars-b5d50.firebaseapp.com",
  projectId: "cars-b5d50",
  storageBucket: "cars-b5d50.appspot.com",
  messagingSenderId: "904084867138",
  appId: "1:904084867138:web:2d2eaac4b97be8f5be05db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app) 
export const storage = getStorage(app)