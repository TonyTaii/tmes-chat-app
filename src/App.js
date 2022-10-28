import "./App.css";
import Button from "@mui/material/Button";

import Sidebar1 from "./Sidebar1";
import { CssBaseline } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import AuthProvider from "./Context/AuthProvider";
import RoomProvider  from "./Context/RoomProvider";

function App() {
  return (
    <AuthProvider>  
      <RoomProvider>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </RoomProvider>
    </AuthProvider>
  );
}

export default App;
