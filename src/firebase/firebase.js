import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcCCi_e7heW_ekuHqRBqsUY17OiLrLB-o",
  authDomain: "clonnerboxd.firebaseapp.com",
  projectId: "clonnerboxd",
  storageBucket: "clonnerboxd.appspot.com",
  messagingSenderId: "494667785645",
  appId: "1:494667785645:web:882708b1bbd24aba92ed24",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
