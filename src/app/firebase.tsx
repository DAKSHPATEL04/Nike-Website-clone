import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqeD19hkTkAc9zUcYFXCvZTIpVT3g7XL0",
  authDomain: "nike-clone-fb6d7.firebaseapp.com",
  projectId: "nike-clone-fb6d7",
  storageBucket: "nike-clone-fb6d7.firebasestorage.app",
  messagingSenderId: "1077019870605",
  appId: "1:1077019870605:web:5a67c34513bb74985fe9c4",
  measurementId: "G-4BJVHLN1FN",
  databaseURL: "https://nike-clone-fb6d7-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);