import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const AppBarTop = () => {
  return (
    <div>
        <div className="Appbar">
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, backgroundColor: "blue" }}
        />
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 , fontWeight:"bold" }}>
            Film Data
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </div>
    </div>
  )
}

export default AppBarTop