import { createContext, useEffect, useState, useContext } from "react";

import { AuthContext } from "./AuthProvider.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

export const RoomContext = createContext();

export default function RoomProvider({ children }) {
  const { currentUserSv } = useContext(AuthContext);
  const [isVisibleAddRoom, setIsVisibleAddRoom] = useState(false);
  const [isVisibleAddPeopleToRoom, setIsVisibleAddPeopleToRoom] =
    useState(false);
  const [documentRoom, setDocumentRoom] = useState([]);

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isGroup, setIsGroup] = useState(false);

  //Query to list room have Uid's current User frome fire
  useEffect(() => {
    if (Object.getOwnPropertyNames(currentUserSv).length !== 0) {
      const queryRoom = query(
        collection(db, "room"),
        // orderBy("createdAt","desc"),
        where("members", "array-contains", currentUserSv.uid)
      );
      onSnapshot(queryRoom, (qdoc) => {
        const documentRoom1 = [];
        qdoc.forEach((doc) => {
          documentRoom1.push(doc.data());
        });
        // console.log('aaa');
        setDocumentRoom(documentRoom1);
      });
    }
  }, [currentUserSv]);

  const [listAvatarSelectedGroup, setListAvatarSelectedGroup] = useState([]);
  const selectedRoom = documentRoom.find(
    (room) => room.roomId === selectedRoomId
  );
  //Function export avatar URL member room selected

  useEffect(() => {
    if (selectedRoomId.length != 0) {
      const aaax = [];

      const queryRoom = query(
        collection(db, "user"),
        // orderBy("createdAt","desc"),
        where("uid", "in", selectedRoom.members)
      );

      onSnapshot(queryRoom, (qdoc) => {
        qdoc.forEach((doc) => {
          aaax.push(doc.data());
        });

        setListAvatarSelectedGroup(aaax);
      });
    }
  }, [documentRoom, selectedRoomId]);

  return (
    <RoomContext.Provider
      value={{
        documentRoom,
        isVisibleAddRoom,
        setIsVisibleAddRoom,
        selectedRoomId,
        setSelectedRoomId,
        isGroup,
        setIsGroup,
        selectedRoom,
        listAvatarSelectedGroup,
        isVisibleAddPeopleToRoom,
        setIsVisibleAddPeopleToRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
