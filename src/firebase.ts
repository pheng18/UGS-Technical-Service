import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  deleteDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

// Firebase configuration loaded dynamically or hardcoded from firebase-applet-config.json
const firebaseConfig = {
  projectId: "balmy-blueprint-kn50x",
  appId: "1:926289239388:web:e9302c3400cfa5f5a97599",
  apiKey: "AIzaSyAeieJoVy981fSeUh6u3hj3Mw69ezU7-Jk",
  authDomain: "balmy-blueprint-kn50x.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-uniqtektechnical-41e30717-e3b9-49c6-97fb-ef82f72f8dc1",
  storageBucket: "balmy-blueprint-kn50x.firebasestorage.app",
  messagingSenderId: "926289239388",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  deleteDoc,
  setDoc,
  serverTimestamp
};
export type { User };
