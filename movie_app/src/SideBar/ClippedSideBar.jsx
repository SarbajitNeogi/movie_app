import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Route, Routes } from "react-router-dom";
import "./ClippedSideBar.css";
import Inbox from "./Inbox";
import Starred from "./Starred";
import SendEmail from "./SendEmail";
import Drafts from "./Drafts";
import AllMail from "./AllMail";
import Trash from "./Trash";
import Spam from "./Spam";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase().replace(" ", "-")}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase().replace(" ", "-")}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div className="Button">
        <button
          onClick={toggleDrawer(true)}
          style={{
            marginTop: "8px",
            marginLeft: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "lightskyblue",
          }}
        >
          Open
        </button>
      </div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "lightgrey",
          },
        }}
      >
        {DrawerList}
      </Drawer>
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/all-mail" element={<AllMail />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/spam" element={<Spam />} />
      </Routes>
    </div>
  );
}
