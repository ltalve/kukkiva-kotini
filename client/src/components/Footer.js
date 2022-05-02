import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      display="flex"
      style={{
        padding: "0",
        width: "100%",
        height: "4rem",
        marginTop: "50px",
        color: "#fff",
        backgroundColor: "rgba(	46, 125, 50, 0.9)",
        borderRadius: "0px 0px 3px 3px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography style={{ marginTop: "0.5rem" }}>
          &copy; Linda Talve {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
