// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOPqfBoNH0D2ztzogmlVSwgVoDb1eobeY",
  authDomain: "worklance-5a84c.firebaseapp.com",
  projectId: "worklance-5a84c",
  storageBucket: "worklance-5a84c.appspot.com",
  messagingSenderId: "79041991715",
  appId: "1:79041991715:web:692b82e71df253f4a34d96",
  measurementId: "G-C3FW3RP33M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {app,analytics,db,auth,storage}