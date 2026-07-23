import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";




// Firebase Configuration

const firebaseConfig = {

  apiKey: "AIzaSyAfRgyyr47wVctfWPNJu2_3f-X7_6oLexI",

  authDomain: "tony-ai-agent-71e1d.firebaseapp.com",

  projectId: "tony-ai-agent-71e1d",

  storageBucket: "tony-ai-agent-71e1d.firebasestorage.app",

  messagingSenderId: "580606912",

  appId: "1:580606912:web:f87aba422d2cfd41604625",

  measurementId: "G-16DR9THZ7S"

};




// Initialize Firebase

const app = initializeApp(firebaseConfig);




// Authentication

export const auth = getAuth(app);




// Google Login Provider

export const googleProvider = new GoogleAuthProvider();