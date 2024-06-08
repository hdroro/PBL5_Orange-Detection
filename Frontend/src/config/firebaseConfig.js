import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "raspfruit2024.firebaseapp.com",
  databaseURL:
    "https://raspfruit2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raspfruit2024",
  storageBucket: "raspfruit2024.appspot.com",
  messagingSenderId: "890319740534",
  appId: "1:890319740534:web:0bdb3e0a63ed4195188957",
  measurementId: "G-EWV1GGTZ4M",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
