// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOXmUMZHF3HOYsiK4Lyb2hk-YKf_XrEBQ",
  authDomain: "ecommerce-4334d.firebaseapp.com",
  projectId: "ecommerce-4334d",
  storageBucket: "ecommerce-4334d.appspot.com",
  messagingSenderId: "301947021601",
  appId: "1:301947021601:web:02597622d70a2e68977660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }