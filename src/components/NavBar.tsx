import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Menu,
    MenuItem, ListItemIcon, ListItemText, Typography, ThemeProvider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu as MenuIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Navbar = ({handleSideBarOpen, title}) => {

    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="sticky" style={{ zIndex: 10000 }} >
            <Toolbar color="secondary">
                <IconButton
                    edge="start"
                    color="tertiary"
                    aria-label="menu"
                    onClick={handleSideBarOpen}
                    style={{ color: "black" }}
                >
                    <MenuIcon sx={{ color: 'white' }}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    style={{ zIndex: 100001 }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        Cookies.remove("token")
                        router.push("/login")
                    }}>
                        <ListItemIcon onClick={() => {

                        }} href="/login">
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </MenuItem>
                </Menu>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography>
                        Channels
                    </Typography>
                    <Typography >
                        {title}
                    </Typography>
                    <Typography sx={{ marginRight: '5px' }} >
                        user.name
                    </Typography>
                </div>
                <AccountCircleIcon
                    onClick={handleMenuOpen}
                    style={{cursor: "pointer"}}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

//TODO: add channels dropdown and messages dropdown