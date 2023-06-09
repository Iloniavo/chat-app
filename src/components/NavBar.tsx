import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ThemeProvider,
  ListItemButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navbar = ({ handleSideBarOpen, title, userName }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" style={{ zIndex: 10000 }}>
      <Toolbar color="secondary">
        <IconButton
          edge="start"
          color="tertiary"
          aria-label="menu"
          onClick={handleSideBarOpen}
          style={{ color: "black" }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          style={{ zIndex: 100001 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemButton
              onClick={() => {
                router.push("/login");
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </MenuItem>
          <MenuItem>
            <ListItemButton
              onClick={() => {
                handleMenuClose();
                Cookies.remove("token");
                router.push("/login");
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </MenuItem>
        </Menu>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Channels</Typography>
          <Typography>{title}</Typography>
          <Typography sx={{ marginRight: "5px" }}>{userName}</Typography>
        </div>
        <AccountCircleIcon
          onClick={handleMenuOpen}
          style={{ cursor: "pointer" }}
          fontSize={"large"}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
