// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'; // for authentication
import 'firebase/storage'; // for storage
import 'firebase/database'; // for realtime database
import 'firebase/firestore'; // for cloud firestore
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWhtKzqJ_DZM4iXnxFIvm7PeMdtfdzXo0",
  authDomain: "messaging-app-mern-6cca4.firebaseapp.com",
  projectId: "messaging-app-mern-6cca4",
  storageBucket: "messaging-app-mern-6cca4.appspot.com",
  messagingSenderId: "930301542413",
  appId: "1:930301542413:web:95b2de0c94032dff40d544",
  measurementId: "G-5N1Q92VXJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app);

export { auth, provider }
export default db