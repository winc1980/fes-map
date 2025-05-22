// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa9FnjTdGNssShhAdgZpDnnsOXAGvVthA",
  authDomain: "circle-app-project.firebaseapp.com",
  projectId: "circle-app-project",
  storageBucket: "circle-app-project.firebasestorage.app",
  messagingSenderId: "684667399496",
  appId: "1:684667399496:web:076672928dff10cf71d77d",
  measurementId: "G-5R6GLXR2W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);