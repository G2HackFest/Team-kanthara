// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS6OmONDXuU-ub-sCdouZ6_ySXE1maffw",
  authDomain: "farm-to-market-b8e89.firebaseapp.com",
  projectId: "farm-to-market-b8e89",
  storageBucket: "farm-to-market-b8e89.appspot.com", // Fixed `.app` to `.com`
  messagingSenderId: "1022421510888",
  appId: "1:1022421510888:web:78e387b6a0767f14eb375d",
  measurementId: "G-P8T8HJN1ZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase Config Loaded");

export { auth };
