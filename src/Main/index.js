import Button from "@mui/material/Button";

import Sidebar1 from "../Sidebar1";
import { CssBaseline, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";



import { Route, Routes } from "react-router-dom";
import SearchAndListFriend from "../SearchAndListFriend";
import Conversation from "../Conversation";
import InforUserTab from "../InforUserTab";
import ModalGroupAdd from "../ModalGroupAdd";
import WelcomeTab from "../Conversation/WelcomeTab";

function Main() {
  return (<>
    <CssBaseline/>
    <div style={{backgroundColor:'#EAEAEA', height:'100vh',minWidth:1500,minHeight:800, width:'100vw',fontFamily:'Poppins',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Grid container spacing={3} columns={15}>
  <Grid item xs={1}>
<Sidebar1/>
    </Grid>
    <Grid item xs={6}>
<SearchAndListFriend/>
    </Grid>
    <Grid item xs={8}>
<Conversation/>
    </Grid>
    </Grid>

    </div>
    
    </>
  );
}

export default Main;
