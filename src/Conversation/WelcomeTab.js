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
import {
  collection,
  query,
  where,onSnapshot,orderBy
  
} from "firebase/firestore";
import { db } from "../firebase/config";
import InforTabGroup from "./InforTabGroup";
import InforTabOneOnONe from "./InforTabOneOnOne";
import logo from "../Login/Tmes.jpg";
import illustration from "../Login/b.webp";


function WelcomeTab(){
    return (
        <div className="welcomeTab"
          style={{
            marginRight: 20,
            minWidth: 800,
            height: "95vh",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
           
            borderRadius: 20,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
        <p style={{fontSize:35,marginTop:100}}>Welcome to <b>Tmes</b> !</p>
        <Avatar src={logo}  style={{width:100,height:100,marginTop:-30,boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)"}}/>
        <p
        style={{marginTop:40,backgroundColor:'white',padding:'2px 10px',borderRadius:20}}
        >Select a chat to start messaging</p>
        <img src={illustration} style={{width:'50%',height:'auto',marginTop:-60}}/>
        </div>
        
      );

}
export default WelcomeTab