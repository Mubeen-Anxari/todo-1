import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAIds2NWOdc0x9oalojsbNl5TQSi79sGVc",
  authDomain: "todo-51319.firebaseapp.com",
  projectId: "todo-51319",
  storageBucket: "todo-51319.appspot.com",
  messagingSenderId: "357981588978",
  appId: "1:357981588978:web:7f110b05387352b6122f6b",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db =getFirestore(app)
export default app;
