
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB4t2Sh9LzroWG8dAz8xwhYTzB15t6adfQ",
    authDomain: "graciastotalesprueba.firebaseapp.com",
    projectId: "graciastotalesprueba",
    storageBucket: "graciastotalesprueba.appspot.com",
    messagingSenderId: "385965834366",
    appId: "1:385965834366:web:e4c8bc0ebe4f39089d582f"
};

export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);