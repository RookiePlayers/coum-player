// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwR3F0HetEIKziBv_5BlBCYB9O-rlPMyg",
  authDomain: "coum-software.firebaseapp.com",
  projectId: "coum-software",
  storageBucket: "coum-software.appspot.com",
  messagingSenderId: "110042161532",
  appId: "1:110042161532:web:29fb691d9db203a2b0c4f9",
  measurementId: "G-42VH6KPYHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(app);
export {
    FirebaseAuth
}