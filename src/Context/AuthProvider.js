import { CircularProgress } from "@mui/material";
import { getAdditionalUserInfo, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../firebase/config.js";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../firebase/config.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState({});
  const [currentUserSv, setCurrentUserSv] = useState({});
  const [uidUser,setUidUser]=useState()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  
  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { uid} = result;
        setUidUser(uid);
        async function ass() {
      
     
          const qUserCurrentInforFromeSever = query(
            collection(db, "user"),
            where("uid", "==", `${uid}`)
          );
          const getUserCurrentInfoFromSever = await getDocs(
            qUserCurrentInforFromeSever
          );
          getUserCurrentInfoFromSever.forEach((doc) =>
            setCurrentUserSv(doc.data())
          );
      
        }
        ass()

        navigate("/");
      } else {
        
        navigate("/login");
        setCurrentUserSv({})
      }
    });
    setIsLoading(false);
    return () => {
      unsubscibed();
    };
  },[]);
  
 
  

  return (
    <AuthContext.Provider value={{ currentUserSv }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "700px",
          }}
        >
          <CircularProgress style={{ height: 50, width: 50 }} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
