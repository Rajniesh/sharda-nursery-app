
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1h4zAXD9ZOFvE3wBNb3flzOHo-aeyDrc",
  authDomain: "sharda-nursery-app.firebaseapp.com",
  projectId: "sharda-nursery-app",
  storageBucket: "sharda-nursery-app.firebasestorage.app",
  messagingSenderId: "75741700517",
  appId: "1:75741700517:web:187d4cc4abb72872ed084c",
  measurementId: "G-7XYZ5X7RFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);