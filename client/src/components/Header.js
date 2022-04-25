import React from "react";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        padding: "0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        backgroundColor: "rgba(	46, 125, 50, 0.9)",
        borderRadius: "3px 3px 0px 0px",
        marginBottom: "30px",
      }}
    >
      <Box
        style={{
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <Typography variant="h3" style={{ marginBottom: 0, marginTop: 20 }}>
            Kukkiva kotini
          </Typography>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Viherpeukalon salainen ase
          </Typography>
        </>
      </Box>

      <Box
        style={{
          width: "45%",
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <Link
          component={RouterLink}
          to="/ajankohtaista"
          variant="button"
          color="#fff"
          margin="20px"
          fontSize={"1rem"}
          underline="hover"
        >
          <Typography>Ajankohtaista</Typography>
        </Link>

        <Link
          component={RouterLink}
          to="/kasvit"
          variant="button"
          color="#fff"
          margin="20px"
          fontSize={"1rem"}
          underline="hover"
        >
          <Typography>Kasvit</Typography>
        </Link>

        <Link
          component={RouterLink}
          to="/uusikasvi"
          variant="button"
          color="#fff"
          margin="20px"
          fontSize={"1rem"}
          underline="hover"
        >
          <Typography>Uusi kasvi</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
