// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import this

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA7VOndmQUDqIEgdrWNHTlOcwKIYZabNt8",
  authDomain: "hooli-8a670.firebaseapp.com",
  projectId: "hooli-8a670",
  storageBucket: "hooli-8a670.appspot.com",
  messagingSenderId: "518756820854",
  appId: "1:518756820854:web:f87df9cdc757c7de91bc57",
  measurementId: "G-DGQ9ZW5HT4"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const usersDB = db;
const storage = getStorage(app); // Initialize this

export { auth, usersDB, storage };