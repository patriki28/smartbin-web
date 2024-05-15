import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOMYONHuV6hMmfVUnoEadnALvnx6Qo2nU",
  authDomain: "test-2ac5c.firebaseapp.com",
  databaseURL: "https://test-2ac5c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-2ac5c",
  storageBucket: "test-2ac5c.appspot.com",
  messagingSenderId: "778611722689",
  appId: "1:778611722689:web:bc9f17677f476aa27d4740",
  measurementId: "G-CS0VJQ19NY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
