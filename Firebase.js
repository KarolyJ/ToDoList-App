// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4FHFf46KEXGiqMdHl9NrZ0l2NzXt8d8g",
  authDomain: "todolistapp-64697.firebaseapp.com",
  projectId: "todolistapp-64697",
  storageBucket: "todolistapp-64697.appspot.com",
  messagingSenderId: "843306665271",
  appId: "1:843306665271:web:d8e8999175314525a646b2",
  measurementId: "G-XM1FDENRW1",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

//const analytics = getAnalytics(app);
