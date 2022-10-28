import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import _, { debounce, orderBy } from "lodash";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  updateDoc,
} from "firebase/firestore";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { border } from "@mui/system";
import { RoomContext } from "../Context/RoomProvider";
import { AuthContext } from "../Context/AuthProvider";
import addDocument from "../hook/addDocument.js";
import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { async } from "@firebase/util";
import "antd/dist/antd.css";
import { db } from "../firebase/config";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFething] = React.useState(false);
  const [option, setOption] = React.useState([]);
  const debounceFetcher = React.useMemo(() => {
    const loadOption = (value) => {
      setOption([]);
      setFething(true);
      fetchOptions(value, props.currentMem).then((newOptions) => {
        setOption(newOptions);
        setFething(false);
      });
    };
    return debounce(loadOption, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      style={{ zIndex: "2000 !important" }}
      dropdownStyle={{ zIndex: 99999999 }}
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <CircularProgress size={20} /> : null}
      {...props}
    >
      {option.map((opt) => (
        <Select.Option
          key={opt.value}
          value={opt.value}
          title={opt.label}
          style={{ zIndex: 999 }}
        >
          <Avatar style={{ width: 20, height: 20 }} src={opt.avatar}>
            {opt.avatar ? "" : opt.label?.charAt(0).toUppeCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, currentMem) {
  const q = query(
    collection(db, "user"),
    where("keyword", "array-contains", search)
    // orderBy("fullname"),
    // limit(20)
  );
  const qrss = await getDocs(q);
  return qrss.docs
    .map((doc) => ({
      label: doc.data().fullname,
      value: doc.data().uid,
      avatar: doc.data().avatar,
    }))
    .filter((opt) => !currentMem.includes(opt.value));
  // const b=[]
  // qrss.forEach((doc) => {
  //   const a = {};
  //   a.label = doc.data().fullname;
  //   a.value = doc.data().uid;
  //   a.avatar = doc.data().avatar;
  //   b.push(a)
  // });
  // return b;
}

export default function ModalAddPeopleToGroup() {
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
    zIndex: "-1 !important",
  };

  const [value, setValue] = React.useState([]);
  const {
    isVisibleAddPeopleToRoom,
    setIsVisibleAddPeopleToRoom,
    selectedRoom,
    selectedRoomId,
  } = React.useContext(RoomContext);
  const handleCloseAddPeopleToRoom = () => {
    setIsVisibleAddPeopleToRoom(false);
  };

  const [form] = Form.useForm();

  const handleAddPeopleToRoom = async () => {
    const newArr = [...selectedRoom.members, ...value.map((val) => val.value)];
    const docRef = doc(db, "room", selectedRoom.id);

    await updateDoc(docRef, {
      members: newArr,
    });
    setIsVisibleAddPeopleToRoom(false);
    setValue([]);
  };

  const handleCancelAddPeopleToRoom = () => {
    setIsVisibleAddPeopleToRoom(false);
    setValue([]);
  };

  return (
    <div>
      <Modal
        open={isVisibleAddPeopleToRoom}
        onClose={handleCloseAddPeopleToRoom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign="center" variant="h6" component="h2">
            Add People To Group
          </Typography>

          <Divider variant="middle" />
          <Typography component="h1" style={{ marginTop: 20, marginLeft: 15 }}>
            User Name:
          </Typography>

          <Form form={form} layout="vertical">
            <DebounceSelect
              currentMem={selectedRoom ? selectedRoom.members : {}}
              placeholder="Please insert user name"
              mode="multiple"
              label="User name"
              value={value}
              fetchOptions={fetchUserList}
              onChange={(newValue) => setValue(newValue)}
              style={{ width: "100%" }}
            />
          </Form>
          {/* </Box> */}
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
              onClick={handleCancelAddPeopleToRoom}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: 150 }}
              onClick={handleAddPeopleToRoom}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
