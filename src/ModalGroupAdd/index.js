import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Divider,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  TextField,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { border } from "@mui/system";
import { RoomContext } from "../Context/RoomProvider";
import { AuthContext } from "../Context/AuthProvider";
import addDocument from '../hook/addDocument.js'
import { collection, query, where, getDocs, QuerySnapshot,addDoc, serverTimestamp,onSnapshot, updateDoc, doc  } from "firebase/firestore";
import { db } from "../firebase/config";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "1px solid rgba(0, 0, 0, 0.25)",
  borderRadius: 10,
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  p: 4,
};

export default function ModalGroupAdd() {
  const { isVisibleAddRoom, setIsVisibleAddRoom } =
    React.useContext(RoomContext);
    const {currentUserSv} = React.useContext(AuthContext)
    const [nameGroup,setNameGroup]=React.useState()

  const handleCloseAddGroup = () => setIsVisibleAddRoom(false);
  const handleOnchangeNameGroup=(e)=>{
setNameGroup(e.target.value);
  }
 
  const handleCreateGroup = async () => {

   const a= await addDoc(collection(db, 'room'), {
    nameGroup:nameGroup,
    members:[currentUserSv.uid],
      createAt: serverTimestamp(),
      roomId: Math.floor(Math.random() * 10000)
      })
    await updateDoc(doc(db,'room',a.id),{
      id: a.id
    })
  //  const a= addDocument("room", {
  //     nameGroup:nameGroup,
  //     members:[currentUserSv.uid]
  //   }) 
  //   console.log(a.id);
    setNameGroup('');setIsVisibleAddRoom(false)
  };

  return (
    <div>
      <Modal
        open={isVisibleAddRoom}
        onClose={handleCloseAddGroup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign="center" variant="h6" component="h2">
            Create Group
          </Typography>

          <Divider variant="middle" />
          <Typography component="h1" style={{ marginTop: 20, marginLeft: 15 }} >
            Name Group
          </Typography>
          <Box
            sx={{
              display: "flex",

              marginRight: 10,
              border: "1px solid rgba(0, 0, 0, 0.25)",
              borderRadius: "13px",
              width: 330,
              marginTop: "5px",
            }}
          >
            <InputBase 
              style={{ marginLeft: 15 }}
              placeholder="Please insert group name"
              onChange={handleOnchangeNameGroup}
            />
          </Box>
          <Divider variant="middle" style={{ marginTop: 30 }} />
         
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 50,
              marginTop: 20,
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: 100 }}
              onClick={handleCloseAddGroup}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: 150 }}
              onClick={handleCreateGroup}
            >
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


