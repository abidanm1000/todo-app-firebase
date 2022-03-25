// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu1dPaKQQkZpPjTLVTUK5pwz19Vow3eH4",
  authDomain: "todoapp-e4230.firebaseapp.com",
  projectId: "todoapp-e4230",
  storageBucket: "todoapp-e4230.appspot.com",
  messagingSenderId: "623689130544",
  appId: "1:623689130544:web:da4f2d1728a5a488b483f5",
  measurementId: "G-1HTLYHWW0T"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const auth = getAuth(app)

export default db