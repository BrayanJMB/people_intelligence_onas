import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar(props) {
  let url = props?.logo?.split("/");
  let param = "";
  if (url) {
    param = url[url.length - 1];
  }

  return (
    <AppBar style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: "11%" }}
          align="center"
        >
          Organizational Network Analysis
        </Typography>
        <Box
          component="img"
          sx={{
            height: 64,
            justifyContent: "right",
            backgroundColor: "white",
          }}
          alt="Your logo."
          src={
            param
              ? "https://peopleintelligenceapi.azurewebsites.net/StaticFiles/Images/CompanyLogo/" +
                param
              : "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png?20171228163613"
          }
        />
      </Toolbar>
    </AppBar>
  );
}
