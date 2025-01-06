import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBElZvZI_KsxYcPvPwxL_gWkERLtOyV4A0",
  authDomain: "mark-tracker-55926.firebaseapp.com",
  projectId: "mark-tracker-55926",
  storageBucket: "mark-tracker-55926.appspot.com",
  messagingSenderId: "245266816771",
  appId: "1:245266816771:web:8454ff90407561db911336",
  measurementId: "G-08J6SVNMMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Function to sign in a user
export async function signInUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Function to sign up a new user
export async function signUpUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Function to sign out a user
export function signOutUser() {
  return signOut(auth);
}
