import { autocompleteClasses, Avatar, IconButton, Tooltip} from "@mui/material";
import { bgcolor, height } from "@mui/system";
import logo from "../Login/Tmes.jpg";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "../Sidebar1/sytle.css";
import logo1 from '../Login/Tmes.jpg'
import auth from "../firebase/config.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { RoomContext } from "../Context/RoomProvider";



const Sidebar1 = () => {
 const {currentUserSv} = useContext(AuthContext)
const {setIsGroup,setIsOneOnOne}=useContext(RoomContext)
  const [isActive,setIsActive]=useState(false)
  const onClickHandle=(e)=>{
    e.preventDefault()
setIsActive(!isActive)
  }
  const navigate=useNavigate();
  //Sign Out handle click function
  const signOutHandleClick=(e)=>{
    e.preventDefault();
    setIsGroup(false)
    setIsOneOnOne(false)
    signOut(auth).then(()=>{
      navigate('/login')
    })
  }

  return (
    <div className="sidebarColor"
      style={{
       marginLeft:20,
      minWidth:70,
        height: "95vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        
        borderRadius: 20,
      }}
    ><div >
      <Avatar src={logo1} style={{
          width: 60,
          height: 60,
          marginTop: 10,
          marginBottom:20,
          filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5))",
        }}/>
      <Tooltip
              
              title={currentUserSv.fullname}
              placement="right"
              arrow
            >
      <Avatar
      src={currentUserSv.avatar}
        style={{
          width: 55,
          height: 55,
          marginTop: 10,
          marginLeft:5,
          
          filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5))",
        }}
        
      />
    </Tooltip>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          width:'100%'
        }}
      >
      
        <IconButton style={ isActive? {
            backgroundColor: "#EAEAEA",
            border: "1.5px solid rgba(0, 0, 0, 0.25)",
            borderRight: "none",
            borderRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            width: "95%",
            marginRight: '-5%'
          } : {  color: "white" }} onClick={onClickHandle}>
          <QuestionAnswerOutlinedIcon
            style={{ fontSize: 40, color: "black" }}
          />
        </IconButton>
        <Tooltip title="Notification" placement="bottom" arrow >
        <IconButton>
          <NotificationsNoneOutlinedIcon
            style={{ fontSize: 40, color: "white" }}
          />
        </IconButton></Tooltip>
        <Tooltip title="Setting" placement="bottom" arrow >
        <IconButton>
          <SettingsOutlinedIcon style={{ fontSize: 40, color: "white" }} />
        </IconButton>
        </Tooltip>
      </div>
      <Tooltip title="Log Out" placement="top-end" arrow>
      <IconButton style={{ marginBottom: 10 }} onClick={signOutHandleClick}>
        <LogoutOutlinedIcon style={{ fontSize: 40, color: "white" }} />
      </IconButton>
      </Tooltip>
    </div>
  );
};
export default Sidebar1;
