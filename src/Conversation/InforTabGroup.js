import { Avatar, AvatarGroup, IconButton, Typography } from "@mui/material";

import Badge from "@mui/material/Badge";
import { StyledBadgeOnline } from "../SearchAndListFriend";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";

import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState, useRef, useContext, useMemo,useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Tooltip from "@mui/material/Tooltip";
import "../Conversation/style.css";
import { RoomContext } from "../Context/RoomProvider";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";





const InforTabGroup = () => {
  const [listAvatarGroup,setListAvatarGroup]=useState([])
  const {selectedRoom,setIsVisibleAddPeopleToRoom} = useContext(RoomContext)
  useEffect(() => {
    if(typeof(selectedRoom.members)!== 'undefined'){
    const queryRoomToShow = query(
      collection(db, "user"),
      // orderBy("createdAt","desc"),
      where("uid", "in", selectedRoom.members)
    );

    onSnapshot(queryRoomToShow, (qdoc) => {
      const temp = [];
      qdoc.forEach((doc) => {
        temp.push(doc.data());
      });
      setListAvatarGroup(temp);
    });}
  }, [selectedRoom]);


  
    
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: 90,
            // backgroundColor: "green",
            gap: 20,
          }}
        >
          
  
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              heigth: "100%",
              width: "74%",
              marginLeft:45
            }}
          >
            <Typography
              variant="h6 "
              margin={0}
              p={0}
              fontSize={"24px"}
              fontWeight={600}
            >
              {typeof(selectedRoom)!== 'undefined' ? selectedRoom.nameGroup : 'Something was wrong'
              }
            </Typography>
            <span style={{ fontSize: 15, color: "#4D4D4D" }}>Online</span>
          </div>
        
            <AvatarGroup
              spacing={2}
              
              max={4}
              sx={{
                
                width: 150,
              
                "& .MuiAvatar-root": { width: 40, height: 40, fontSize: 20 },
              }}
            >
              {listAvatarGroup.map((item,i)=>
              
              <Tooltip key={i} title={item.fullname} placement="bottom" arrow>
                <Avatar  src={item.avatar}/>
              </Tooltip>
              )}
              
              
            </AvatarGroup>
         
          <div style={{ marginLeft: 30, width: 100 }}>
            <IconButton onClick={()=>setIsVisibleAddPeopleToRoom(true)}>
              <PersonAddAlt1OutlinedIcon
                style={{ fontSize: 25, color: "#1A66FF", marginTop: "-5%" }}
              />
            </IconButton>
           
          </div>
        </div>
        <hr
          style={{
            border: "none",
            borderTop: "2px solid rgba(0, 0, 0, 0.25)",
            width: "90%",
            marginBottom: 0,
          }}
        />
      </div>
    );
  };
  export default InforTabGroup