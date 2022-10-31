import { IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
const PictureReviewS = (props) => {
  return (
    <div style={{display:'flex',justifyContent:'flex-end'}}>
    <div style={{ height: 200, width: 300,margin:'0px 40px 0px 40px',position:'relative'}}>
      <img
        style={{
          height: "90%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 20,
          
        }}
        src={props.url}
      />
      <a href={props.url} style={{position:'absolute',left:10,top:10,backgroundColor:'white',height:30,width:30,border:'1px solid black',borderRadius:'50%'}}>
        <DownloadIcon style={{color:'grey',margin:'3px 5px 5px 2px'}} />
        </a>
        <p
          style={{
            textAlign: "right",
            width: 240,
            fontSize: 12,
            color: "#4D4D4D",
            margin: "5px 0px 0 0",
          }}
        >


          {props.time}
        </p>
      
    </div>
    </div>
  );
};
export default PictureReviewS;
