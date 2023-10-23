import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp4G5WWBNcMraGLtlQJkrlFC9SWuaWmKg", //tässä myös teille tällainen salanen SUPERSALAINEN apiKey.
  authDomain: "chat-mt666.firebaseapp.com",
  projectId: "chat-mt666",
  storageBucket: "chat-mt666.appspot.com",
  messagingSenderId: "61223916680",
  appId: "1:61223916680:web:6196d5fb997bc4725c7b3d"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    MESSAGES,
    query,
    onSnapshot,
    serverTimestamp
}