// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2eBhVitfJjFebJ__ho7mwZUk4JjdHv0Q",
  authDomain: "csci5410-groupproject-g12.firebaseapp.com",
  projectId: "csci5410-groupproject-g12",
  storageBucket: "csci5410-groupproject-g12.appspot.com",
  messagingSenderId: "541735430417",
  appId: "1:541735430417:web:8400ebd042fa3d312144b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export{db}