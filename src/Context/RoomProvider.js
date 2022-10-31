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
  const [isVisibleAddFriend, setIsVisibleAddFriend] = useState(false);
  const [listAvatarSelectedGroup, setListAvatarSelectedGroup] = useState([]);
  const [isOneOnOne, setIsOneOnOne] = useState(false);
  const [documentOneOnOne, setDocumentOneOnOne] = useState([]);
  const [selectedOneOnOneId, setSelectedOneOnOneId] = useState("");
const [messList, setMessList] = useState([]);
const [messListOneOnOne, setMessListOneOnOne] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [name, setName] = useState([]);
  const [id, setId] = useState();

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

  const selectedRoom = documentRoom.find(
    (room) => room.roomId === selectedRoomId
  );
  //Function export avatar URL member room selected

  useEffect(() => {
    if (selectedRoomId !== "") {
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
  }, [selectedRoomId]);

  //One On One

  useEffect(() => {
    if (Object.getOwnPropertyNames(currentUserSv).length !== 0) {
      const queryRoom = query(
        collection(db, "oneOnOne"),
        // orderBy("createdAt","desc"),
        where("members", "array-contains", currentUserSv.uid)
      );
      onSnapshot(queryRoom, (qdoc) => {
        const documentRoom1 = [];
        qdoc.forEach((doc) => {
          documentRoom1.push(doc.data());
        });
        // console.log('aaa');
        setDocumentOneOnOne(documentRoom1);
      });
    }
  }, [currentUserSv]);

  useEffect(() => {
    if (typeof selectedOneOnOneId !== "undefined") {
      const queryRoom = query(
        collection(db, "oneOnOne"),
        // orderBy("createdAt","desc"),
        where("id", "==", selectedOneOnOneId)
      );

      onSnapshot(queryRoom, (qdoc) => {
        qdoc.forEach((doc) => {
          setAvatar(doc.data().avatar);
          setName(doc.data().fullnamePerOne);
          setId(doc.data().id);
        });
      });
    }
  }, [selectedOneOnOneId]);

  return (
    <RoomContext.Provider
      value={{
        messList, setMessList,
        documentOneOnOne,
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
        isVisibleAddFriend,
        setIsVisibleAddFriend,
        isOneOnOne,
        setIsOneOnOne,
        selectedOneOnOneId,
        setSelectedOneOnOneId,
        avatar,
        name,
        id,
        messListOneOnOne, setMessListOneOnOne
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
