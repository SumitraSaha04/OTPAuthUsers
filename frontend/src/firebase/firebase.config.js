
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx38Y3vUaxanMwKCpC9pWWO8Jjy4xA9vU",
  authDomain: "otplessusers.firebaseapp.com",
  projectId: "otplessusers",
  storageBucket: "otplessusers.firebasestorage.app",
  messagingSenderId: "88877022263",
  appId: "1:88877022263:web:a779e0eec59e06fa3c13b2",
  measurementId: "G-5D53Y2P8NB"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
