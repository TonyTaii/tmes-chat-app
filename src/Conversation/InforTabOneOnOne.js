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


const InforTabOneOnONe = () => {
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
          <StyledBadgeOnline
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              style={{
                height: 70,
                width: 70,
                marginLeft: 20,
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </StyledBadgeOnline>
  
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              heigth: "100%",
              width: "74%",
            }}
          >
            <Typography
              variant="h6 "
              margin={0}
              p={0}
              fontSize={"24px"}
              fontWeight={600}
            >
              Nguyen Thanh Tai
            </Typography>
            <span style={{ fontSize: 15, color: "#4D4D4D" }}>Online</span>
          </div>
          <div style={{ marginLeft: 30, width: 100 }}>
            <IconButton>
              <CallIcon
                style={{ fontSize: 30, color: "#1A66FF", marginTop: "-5%" }}
              />
            </IconButton>
            <IconButton>
              <VideocamIcon
                style={{
                  fontSize: 30,
                  color: "#1A66FF",
                  marginTop: "-5%",
                }}
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
  export default InforTabOneOnONe