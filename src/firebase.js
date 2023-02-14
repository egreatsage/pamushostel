// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0zaUXDMg_tsuFvXOtnr7le-h9roCVyX0",
  authDomain: "theapp-360e3.firebaseapp.com",
  projectId: "theapp-360e3",
  storageBucket: "theapp-360e3.appspot.com",
  messagingSenderId: "329553535750",
  appId: "1:329553535750:web:e5a8cd0139ed0180453487"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
