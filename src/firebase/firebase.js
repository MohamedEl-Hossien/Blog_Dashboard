// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUVV7OxSzEWM5G6tT9aaukNX6Ape-gX_8",
  authDomain: "blog-dashboard-17633.firebaseapp.com",
  databaseURL: "https://blog-dashboard-17633-default-rtdb.firebaseio.com",
  projectId: "blog-dashboard-17633",
  storageBucket: "blog-dashboard-17633.firebasestorage.app",
  messagingSenderId: "677969949324",
  appId: "1:677969949324:web:5ce22647281a3acdf0c1a9",
  measurementId: "G-M77PM6319W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
