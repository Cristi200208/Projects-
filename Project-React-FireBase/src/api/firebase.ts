import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWZ2B7r05HHQaXevjnsZAjIfPG_KORcW0",
  authDomain: "project-react-edeb2.firebaseapp.com",
  projectId: "project-react-edeb2",
  storageBucket: "project-react-edeb2.appspot.com",
  messagingSenderId: "206802365723",
  appId: "1:206802365723:web:389d6875f4e4bcf09137be",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
