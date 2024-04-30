// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaqfKqTBUHNZoaBis3bWQginTpnbFH1so",
  authDomain: "pending-notes.firebaseapp.com",
  projectId: "pending-notes",
  storageBucket: "pending-notes.appspot.com",
  messagingSenderId: "514195216862",
  appId: "1:514195216862:web:f45078b1f078faff78a54f",
  measurementId: "G-QX5NE1B5EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);