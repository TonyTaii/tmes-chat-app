import { Avatar, Divider, Grid, IconButton, Typography } from "@mui/material";
import "../InforUserTab/style.css";

export default function InforUserTab() {
  return (
    <div
      style={{
        width: "500px",
        height: "95vh",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: 155,
            // backgroundColor: "green",
            gap: 30,
          }}
        >
          <Avatar
            style={{
              height: 90,
              width: 90,
              marginLeft: 20,
              filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
            }}
          />

          
            <Typography
              variant="h6 "
              margin="auto"
              p={0}
              fontSize={"24px"}
              fontWeight={600}
            >
              Nguyen Thanh Tai
            </Typography>
            <p style={{ fontSize: 15, color: "#4D4D4D", margin: "auto" }}>
              Online
            </p>
          
          
        </div>
        <Divider
          variant="middle"
          style={{ borderTop: "1px solid #00000040", marginTop: 30 }}
        />

        <Grid container spacing={1} style={{ width: "95%", height: "40%",backgroundColor:'green' }}>
          <Grid item xs={4}>
            <img
              src="https://i.guim.co.uk/img/media/9bf6f50857ca9ebbb11800fd30e764cab39b9fc5/6_0_1800_1080/master/1800.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=dc31e47f1d96de78a7cdf641c1455a4d"
              style={{ maxWidth: 125,maxHeight:125, height: "100%", objectFit: "contain" }}
            />
          </Grid>
          
        </Grid>
      </div>
    
  );
}
