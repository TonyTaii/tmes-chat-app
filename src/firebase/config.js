import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore} from "firebase/firestore";
import { useEffect } from "react";
import { connectAuthEmulator, getAuth } from "firebase/auth";


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

const db = getFirestore(app);
const auth =getAuth(app)

// const docRef = doc(db, "user", "B3wxR7QLXB84uGZSKKsM");

// async function dbUser() {
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

// dbUser();
connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectAuthEmulator(auth, 'http://127.0.0.1:9099' );

export { app,db};
export default auth
