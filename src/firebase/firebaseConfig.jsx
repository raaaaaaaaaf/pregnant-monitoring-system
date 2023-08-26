// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqI-jy5YVSO2Eja4HTRbNIlso8rOQyLUE",
  authDomain: "pregnancy-monitoring-system.firebaseapp.com",
  projectId: "pregnancy-monitoring-system",
  storageBucket: "pregnancy-monitoring-system.appspot.com",
  messagingSenderId: "52197234215",
  appId: "1:52197234215:web:a50bbec0042c1acaf0a002",
  measurementId: "G-VC68LWCH41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage()