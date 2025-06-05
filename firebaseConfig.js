// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkbID3St4-pjHOykF3qdDx4i9ZqJJDyaM",
  authDomain: "venmol-49d25.firebaseapp.com",
  projectId: "venmol-49d25",
  storageBucket: "venmol-49d25.appspot.com",
  messagingSenderId: "629793032729",
  appId: "1:629793032729:web:9c46e9e71bd857c8a3b888",
  measurementId: "G-MQ2YJ5CQYJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };

