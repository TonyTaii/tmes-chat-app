import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  AvatarGroup,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import "../SearchAndListFriend/style.css";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { AuthContext } from "../Context/AuthProvider";
import { RoomContext } from "../Context/RoomProvider";
import ModalGroupAdd from "../ModalGroupAdd";
import ModalAddPeopleToGroup from "../ModalAddPeopleToGroup";

const PerFriend = (props) => {
  
  return (
    <> 
      <div 
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          width: "98%",
          height: 50,
          // backgroundColor: "green",
          gap: 10,
        }}
      >
        {props.onlineOrOffline}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            heigth: "100%",
            width: "70%",
          }}
        >
          <Typography variant="h6 " margin={0} p={0} fontSize={"15px"}>
            Swathi
          </Typography>
          <span style={{ fontSize: 10, color: "#4D4D4D" }}>
            Tra tien tao day!!
          </span>
        </div>
        <span style={{ fontSize: 10, color: "#4D4D4D", marginBottom: "-20px" }}>
          Today, 8:56pm
        </span>
      </div>
      <Divider variant="middle" />
    </>
  );
};
const PerGroup = (props) => {
  const {documentRoom}=useContext(RoomContext)
  const [listAvatar,setListAvatar]= useState([])
   
  useEffect(()=>{
    const queryRoomToShow = query(
      collection(db, "user"),
      // orderBy("createdAt","desc"),
      where("uid", "in", (props.item).members)
    )
    
    onSnapshot(queryRoomToShow, (qdoc) => {
      
      const temp=[]
      qdoc.forEach((doc) => {
        
        temp.push(doc.data().avatar);
       
       
       
      });
      setListAvatar(temp);
    });


  },[documentRoom])
  return (
    <>
      <div  className='hoverPerGroup' onClick={props.onClick}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: 50,
          // backgroundColor: "green",
          gap: 10,
          
          
        }}
      >
        <AvatarGroup
          spacing={2}
          // total={6}
          max={4}
          sx={{
            heigth: 40,
            width: 40,
            display: "flex",
            justifyContent: "space-between",

            flexWrap: "wrap",
            marginLeft: "12px",
            "& .MuiAvatar-root": { width:17, height: 17, fontSize: 10 },
          }}
        >
          {listAvatar.map((item)=>
            
            <Tooltip key={Math.random()*10000} title={(props.item).fullname} placement="bottom" arrow>
              <Avatar  src={item}/>
            </Tooltip>
            )}
        </AvatarGroup>
        <div
          style={{ display: "flex", flexDirection: "column", heigth: "100%" }}
        >
          <Typography variant="h6 " margin={0} p={0} fontSize={"15px"}>
           { props.nameGroup}
          </Typography>
          <span style={{ fontSize: 10, color: "#4D4D4D" }}>
            Hi Guys, Wassup!
          </span>
        </div>
      </div>
      <Divider variant="middle" />
    </>
  );
};

const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#969e91",
    color: "#969e91",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",

      border: "1px solid currentColor",
      content: '""',
    },
  },
}));
const propsStyleBadgeOnline = (
  <StyledBadgeOnline
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    variant="dot"
  >
    <Avatar style={{ height: 40, width: 40, marginLeft: 10 }} />
  </StyledBadgeOnline>
);
const propsStyleBadgeOffline = (
  <StyledBadgeOffline
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    variant="dot"
  >
    <Avatar style={{ height: 40, width: 40, marginLeft: 10 }} />
  </StyledBadgeOffline>
);

export default function SearchAndListFriend() {
 const {documentRoom} =useContext(RoomContext)
 const {isVisibleAddRoom,setIsVisibleAddRoom}= useContext(RoomContext)
 const {selectedRoomId,setSelectedRoomId,isGroup,setIsGroup} =useContext(RoomContext)
 const handleOpenAddGroup = () => setIsVisibleAddRoom(true);
  
  return (
    
    <div
      style={{
        width: "100%",
        minWidth: 400,
        height: "95vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ModalGroupAdd/>
      <ModalAddPeopleToGroup/>
      {/* Search bar */}
      <Paper
        component="form"
        sx={{
          p: "1px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          heigth: 59,
          borderRadius: "15px",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
        <MoreVertIcon
          style={{ paddingRight: 10, fontSize: 30, color: "#1A66FF" }}
        />
      </Paper>
      {/* Group */}
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            height: 40,
            fontSize: "17px",
            padding: "5px 15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span>Groups</span>
          <Tooltip title="Create Group" placement="top-end" arrow >
            <IconButton onClick={handleOpenAddGroup}>
              <GroupAddOutlinedIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ overflowY: "scroll", height: "73%" }}>
          
         {documentRoom.map((rom)=>
         <PerGroup onClick={()=>{setSelectedRoomId(rom.roomId)
        setIsGroup(true)
        }} key={rom.roomId} nameGroup={rom.nameGroup} item={rom} />

         )

         }
        </div>
      </div>

      {/* `````````````````````````````Friend````````````````````````````` */}

      <div 
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            height: 40,
            fontSize: "17px",
            padding: "5px 15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span>Friends</span>
          <Tooltip title="Add Friend" placement="top-end" arrow>
            <IconButton>
              <PersonAddAltOutlinedIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        </div>
        {/* Friend item */}
        <div style={{ overflowY: "scroll", height: "90%" }}>
          <PerFriend onlineOrOffline={propsStyleBadgeOnline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOnline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOnline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOnline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
          <PerFriend onlineOrOffline={propsStyleBadgeOffline} />
        </div>
        {/*  End Friend item */}
      </div>
    </div>
  );
}

export { StyledBadgeOnline };
