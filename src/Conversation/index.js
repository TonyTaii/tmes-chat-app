import { Avatar, AvatarGroup, IconButton, Typography } from "@mui/material";

import Badge from "@mui/material/Badge";
import { StyledBadgeOnline } from "../SearchAndListFriend";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";

import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState, useRef, useContext, useMemo, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import Tooltip from "@mui/material/Tooltip";
import "../Conversation/style.css";
import { RoomContext } from "../Context/RoomProvider";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import InforTabGroup from "./InforTabGroup";
import InforTabOneOnONe from "./InforTabOneOnOne";
import WelcomeTab from "./WelcomeTab";
import addDocument from "../hook/addDocument.js";
import { AuthContext } from "../Context/AuthProvider";
import formatRelative from "date-fns/formatRelative";
import { storage } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PictureReviewR from "./PictureReviewR";
import PictureReviewS from "./PictureReviewS";
const SenderConversation = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        padding: "0px 10px",
        marginRight: 30,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            marginBottom: 0,
            marginTop: 10,
            maxWidth: "100%",
            height: "auto",
            wordWrap: "break-word",
            backgroundColor: "#1A66FF",
            borderRadius: "30px 1px 30px 30px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            fontSize: 15,
            color: "white",
          }}
        >
          {props.text}
        </div>
        <p
          style={{
            textAlign: "right",
            width: 150,
            fontSize: 12,
            color: "#4D4D4D",
            margin: "5px 0px 0 0",
          }}
        >
          {props.time}
        </p>
      </div>
      <Avatar
        src={props.avatar}
        style={{
          width: 50,
          height: 50,
          marginTop: 0,
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
      />
    </div>
  );
};

const ReciverConversation = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 10,
        padding: "0px 10px",
        marginLeft: 30,
      }}
    >
      {" "}
      <Avatar
        src={props.avatar}
        style={{
          width: 50,
          height: 50,
          marginTop: 5,
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
      />
      <div
        style={{
          maxWidth: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            marginBottom: 0,
            marginTop: 10,
            maxWidth: "100%",
            height: "auto",
            wordWrap: "break-word",
            backgroundColor: "#CFCFCF",
            borderRadius: "1px 30px 30px 30px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            fontSize: 15,
            color: "black",
          }}
        >
          {props.text}
        </div>
        <p
          style={{
            textAlign: "left",
            fontSize: 12,
            color: "#4D4D4D",
            width: "150",
            margin: "5px 0 0 0 ",
          }}
        >
          {props.time}
        </p>
      </div>
    </div>
  );
};

export default function Conversation() {
  // useState for show Emoji tab
  const [showEmojis, setShowEmojis] = useState(false);
  // Send File
  const fileRef = useRef();
  const { currentUserSv } = useContext(AuthContext);
  const { messListOneOnOne, setMessListOneOnOne, messList, setMessList } =
    useContext(RoomContext);

  const {
    isGroup,
    selectedOneOnOneId,
    setIsGroup,
    selectedRoomId,
    isOneOnOne,
    selectedRoom,
    id,
  } = useContext(RoomContext);
  const [valueMes, setValueMes] = useState("");
  const [valueMesOneOnOne, setValueMesOneOnOne] = useState("");
  const [file, setFile] = useState({});
  // Function for upload file
  useEffect(() => {
    if (Object.keys(file).length !== 0) {
      const metadata = { contentType: file[0].type };
      const storageRef = ref(storage, file[0].name);
      uploadBytes(storageRef, file[0], metadata).then((snapshot) => {
        console.log("Uploaded a file!");
        getDownloadURL(ref(storage, file[0].name)).then((url) => {
          addDocument("messages", {
            type: file[0].type,
            url: url,
            fullname: currentUserSv.fullname,
            uid: currentUserSv.uid,
            messId: isGroup?selectedRoom.id:selectedOneOnOneId
          });
        });
      });
    }
  }, [file]);

  // console.log(typeof(file[0].type));

  // Start Function for Group
  const handleSubmit = () => {
    if (valueMes.length !== 0) {
      addDocument("messages", {
        text: valueMes,
        fullname: currentUserSv.fullname,
        uid: currentUserSv.uid,
        avatar: currentUserSv.avatar,
        messId: selectedRoom.id,
      });
    }

    setValueMes("");
  };
  const handleSubmitPressEnter = (e) => {
    if (e.keyCode === 13 && valueMes.length !== 0) {
      addDocument("messages", {
        text: valueMes,
        fullname: currentUserSv.fullname,
        uid: currentUserSv.uid,
        avatar: currentUserSv.avatar,
        messId: selectedRoom.id,
      });
      setValueMes("");
    }
  };

  useEffect(() => {
    if (typeof selectedRoom !== "undefined") {
      const queryMess = query(
        collection(db, "messages"),
        where("messId", "==", selectedRoom.id),
        orderBy("createAt")
      );

      onSnapshot(queryMess, (qdoc) => {
        const ax = [];
        qdoc.forEach((doc) => {
         
          ax.push(doc.data());
        });
        setMessList(ax);
      });
    }
  }, [selectedRoom]);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setValueMes(valueMes + emoji);
    setShowEmojis(false);
  };
  // End Function for Group

  //Start Function for One On One
  const handleSubmitOneOnOne = () => {
    if (valueMesOneOnOne.length !== 0) {
      addDocument("messages", {
        text: valueMesOneOnOne,
        fullname: currentUserSv.fullname,
        uid: currentUserSv.uid,
        avatar: currentUserSv.avatar,
        messId: id,
      });
    }

    setValueMesOneOnOne("");
  };
  const handleSubmitPressEnterOneOnOne = (e) => {
    if (e.keyCode === 13 && valueMesOneOnOne.length !== 0) {
      addDocument("messages", {
        text: valueMesOneOnOne,
        fullname: currentUserSv.fullname,
        uid: currentUserSv.uid,
        avatar: currentUserSv.avatar,
        messId: id,
      });
      setValueMesOneOnOne("");
    }
  };

  useEffect(() => {
    if (typeof id !== "undefined") {
      const queryMess = query(
        collection(db, "messages"),
        where("messId", "==", id),
        orderBy("createAt")
      );

      onSnapshot(queryMess, (qdoc) => {
        const ax = [];
        qdoc.forEach((doc) => {
          ax.push(doc.data());
        });
        setMessListOneOnOne(ax);
      });
    }
  }, [selectedOneOnOneId, valueMesOneOnOne, id]);
  const addEmojiOneOnOne = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setValueMesOneOnOne(valueMesOneOnOne + emoji);
    setShowEmojis(false);
  };

  //End Function for One On One
  const formatDate = (seconds) => {
    let formatedDate = "";
    if (seconds) {
      formatedDate = formatRelative(new Date(seconds * 1000), new Date());
      formatedDate =
        formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
    }
    return formatedDate;
  };

  const messRef = useRef();

  useEffect(() => {
    messRef.current?.scrollIntoView("align");
  }, [messList, messListOneOnOne]);

  return (
    <>
      {isGroup ? (
        //GROUP CONVERTATIONS
        <div
          style={{
            marginRight: 20,
            minWidth: 800,
            height: "95vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 20,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {showEmojis && (
            <div
              style={{
                position: "absolute",
                right: "1.5%",
                bottom: "13%",
                zIndex: 999,
              }}
            >
              <Picker
                onEmojiSelect={addEmoji}
                data={data}
                theme="light"
                emojiButtonSize={30}
              />
            </div>
          )}
          {/* Infor tab */}
          <InforTabGroup />

          {/* End Infor tab */}
          {/* Conversation */}
          <div
            style={{
              display: "flex",

              justifyContent: "flex-end",
              margin: "0",
              width: "100%",
              height: "80%",
              position: "relative",
              gap: 0,
              fontSize: 17,
              borderRadius: 20,
              overflowY: "scroll",
            }}
          >
            <div style={{ width: "100%" }}>

              {messList.map((mess) =>
                mess.uid === currentUserSv.uid ? (
                  mess.url? (<PictureReviewS url={mess.url} time={formatDate(mess.createAt?.seconds)}/>):

                  (<SenderConversation
                    text={mess.text}
                    avatar={mess.avatar}
                    time={formatDate(mess.createAt?.seconds)}
                  />)
                ) : (
                  mess.url? (<PictureReviewR url={mess.url} time={formatDate(mess.createAt?.seconds)}/>):
                  (<ReciverConversation
                    text={mess.text}
                    avatar={mess.avatar}
                    time={formatDate(mess.createAt?.seconds)}
                  />)
                )
              )}

              <div id="end-message" ref={messRef}></div>
            </div>
          </div>
          {/* End Conversation */}
          {/* Send Tab */}
          <div
            style={{
              height: "100px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <hr
              style={{
                border: "none",
                borderTop: "2px solid rgba(0, 0, 0, 0.25)",
                width: "90%",
                marginTop: 0,
              }}
            />
            <div
              component="form"
              style={{
                p: "1px 4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                borderRadius: "25px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#E0E0E0",
                marginTop: 5,
              }}
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Write a message"
                onChange={(e) => setValueMes(e.target.value)}
                onKeyDown={handleSubmitPressEnter}
                value={valueMes}
                onClick={() => setShowEmojis(false)}
              />
              <Tooltip title="Send File" placement="top-start" arrow>
                <IconButton onClick={() => fileRef.current.click()}>
                  <input
                    ref={fileRef}
                    name="upload"
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files)}
                  />
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Emoji" placement="top-start" arrow>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <InsertEmoticonIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Massenges" placement="top-start" arrow>
                <IconButton onClick={handleSubmit}>
                  <SendIcon style={{ color: "#1A66FF" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {/* End Send Tab */}
        </div>
      ) : isOneOnOne ? (
        // ONE ON ONE CONVERTATIONS
        <div
          style={{
            marginRight: 20,
            minWidth: 800,
            height: "95vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 20,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {showEmojis && (
            <div
              style={{
                position: "absolute",
                right: "1.5%",
                bottom: "13%",
                zIndex: 999,
              }}
            >
              <Picker
                onEmojiSelect={addEmojiOneOnOne}
                data={data}
                theme="light"
                emojiButtonSize={30}
              />
            </div>
          )}
          {/* Infor tab */}
          <InforTabOneOnONe />

          {/* End Infor tab */}
          {/* Conversation */}
          <div
            style={{
              display: "flex",

              justifyContent: "flex-end",
              margin: "0",
              width: "100%",
              height: "80%",
              position: "relative",
              gap: 0,
              fontSize: 17,
              borderRadius: 20,
              overflowY: "scroll",
            }}
          >
            <div style={{ width: "100%" }}>
            {messListOneOnOne.map((mess) =>
                mess.uid === currentUserSv.uid ? (
                  mess.url? (<PictureReviewS url={mess.url} time={formatDate(mess.createAt?.seconds)}/>):

                  (<SenderConversation
                    text={mess.text}
                    avatar={mess.avatar}
                    time={formatDate(mess.createAt?.seconds)}
                  />)
                ) : (
                  mess.url? (<PictureReviewR url={mess.url} time={formatDate(mess.createAt?.seconds)}/>):
                  (<ReciverConversation
                    text={mess.text}
                    avatar={mess.avatar}
                    time={formatDate(mess.createAt?.seconds)}
                  />)
                )
              )}
              <div id="end-message" ref={messRef}></div>
            </div>
          </div>
          {/* End Conversation */}
          {/* Send Tab */}
          <div
            style={{
              height: "100px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <hr
              style={{
                border: "none",
                borderTop: "2px solid rgba(0, 0, 0, 0.25)",
                width: "90%",
                marginTop: 0,
              }}
            />
            <div
              component="form"
              style={{
                p: "1px 4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                borderRadius: "25px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#E0E0E0",
                marginTop: 5,
              }}
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Write a message"
                onChange={(e) => setValueMesOneOnOne(e.target.value)}
                onKeyDown={handleSubmitPressEnterOneOnOne}
                value={valueMesOneOnOne}
                onClick={() => setShowEmojis(false)}
              />
              <Tooltip title="Send File" placement="top-start" arrow>
                <IconButton onClick={() => fileRef.current.click()}>
                  <input
                    id="upload"
                    name="upload"
                    type="file"
                    ref={fileRef}
                    hidden
                    onChange={(e) => setFile(e.target.files)}
                  />
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Emoji" placement="top-start" arrow>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <InsertEmoticonIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Massenges" placement="top-start" arrow>
                <IconButton onClick={handleSubmitOneOnOne}>
                  <SendIcon style={{ color: "#1A66FF" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {/* End Send Tab */}
        </div>
      ) : (
        <WelcomeTab />
      )}
    </>
  );
}
