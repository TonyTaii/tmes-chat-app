import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore} from "firebase/firestore";
import { useEffect } from "react";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getStorage,connectStorageEmulator  } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA65VImFr4YXZMQnBxM-Ys2MNSpSxGddko",
  authDomain: "tmes-393b2.firebaseapp.com",
  projectId: "tmes-393b2",
  storageBucket: "tmes-393b2.appspot.com",
  messagingSenderId: "1016274911057",
  appId: "1:1016274911057:web:ceade105472a1d32569d70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth =getAuth(app)


// connectFirestoreEmulator(db, '127.0.0.1', 8080);
// connectAuthEmulator(auth, 'http://127.0.0.1:9099' );
// connectStorageEmulator(storage, '127.0.0.1', 9199)

export { app,db,storage};
export default auth
