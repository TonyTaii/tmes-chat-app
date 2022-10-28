import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "./Tmes.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signOut,
} from "firebase/auth";
import { app, db } from "../firebase/config";
import { Navigate, useNavigate } from "react-router-dom";
import background from "../Login/17545.jpg";
import auth from "../firebase/config.js";
import { addDoc, collection,onSnapshot,doc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthProvider";
import addDocument, { generateKeywords } from "../hook/addDocument";

//Sign in by Facebook

const providerFB = new FacebookAuthProvider();
//Sign in by Google
const providerGG = new GoogleAuthProvider();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Double T Team "}
      {new Date().getFullYear()}
      {"."} <br />
      {"(Nguyen Thanh Tai & Pham Anh Tai)"}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  






  //Function onlcick Sign in by FB
  const handleClickSignFB = (e) => {
    e.preventDefault();

    signInWithPopup(auth, providerFB).then((result) => {
      const dataUser = result.user;
      const additionalUserInfor = getAdditionalUserInfo(result);

      if (additionalUserInfor.isNewUser) {
        addDocument("user", {
          fullname: dataUser.displayName,
          avatar: dataUser.photoURL,
          email: dataUser.email,
          uid: dataUser.uid,
          providerID: additionalUserInfor.providerId,
          keyword: generateKeywords(dataUser.displayName.toLowerCase())
        });
      }
    });
  };
  //Function onclik Sign in by GG
  const handleClickSignGG = (e) => {
    e.preventDefault();
    signInWithPopup(auth, providerGG)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credentialGG = GoogleAuthProvider.credentialFromResult(result);
        const tokenGG = credentialGG.accessToken;
        // The signed-in user info.
        const userGG = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{ m: 1, bgcolor: "secondary.main", width: 200, height: 200 }}
          />

          <Typography
            component="h1"
            variant="h5"
            textAlign={"center"}
            width={500}
          >
            Welcome to Tmes Chatting
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Button
              endIcon={<FacebookIcon />}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, mr: 30 }}
              onClick={handleClickSignFB}
            >
              Sign in by Facebook
            </Button>
            <Button
              endIcon={<GoogleIcon />}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 1, mr: 30 }}
              onClick={handleClickSignGG}
            >
              Sign in by Google
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
