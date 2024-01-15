import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBddS--erfnDi8JYz5bu7Xlfu-5cdM4dhw",
  authDomain: "webcarros-c75a1.firebaseapp.com",
  projectId: "webcarros-c75a1",
  storageBucket: "webcarros-c75a1.appspot.com",
  messagingSenderId: "18332757264",
  appId: "1:18332757264:web:f174923e710a8255280995",
  measurementId: "G-H3Z92J2EDJ"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }

