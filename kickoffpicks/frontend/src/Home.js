import Navbar from "./components/navbar";
import "./Home.css";
import Box from "@mui/material/Box";

export default function HomeExport() {
  return (
    <body>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "90vh",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "red",
            width: "65%",
            height: "70vh",
            borderRadius: 4,
          }}
        >
          <img
            src="test_img_3.jpg"
            alt="Smiley face"
            width="100%"
            height="100%"
            borderRadius="4"
          ></img>
        </Box>
        <Box
          sx={{
            backgroundColor: "red",
            width: "25%",
            height: "70vh",
            borderRadius: 4,
          }}
        ></Box>
      </Box>
    </body>
  );
}
