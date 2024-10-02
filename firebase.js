// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsLjSxhK_y6wrKYJ-0k40qEgzwC5Am-0k",
  authDomain: "resume-screener-829d7.firebaseapp.com",
  projectId: "resume-screener-829d7",
  storageBucket: "resume-screener-829d7.appspot.com",
  messagingSenderId: "235013593109",
  appId: "1:235013593109:web:1a0116591c90cda1fdd61c",
  measurementId: "G-2VHTP02KWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);