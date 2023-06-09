"use server";

import React, { useEffect, useState } from "react";
import { getToken } from "../hooks/useGetAuthUserInfo";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/Home.module.css";
import { getChannels } from "@/provider/ChannelProvider";
import { getAllUsers } from "@/provider/AuthProvider";
import DropDown from "@/components/DropDown";
import SearchIcon from "@mui/icons-material/Search";
const Sidebar = ({ isOpen }) => {
  const { push } = useRouter();
  const [channels, setChannels] = useState<[]>();
  const [users, setUsers] = useState<[]>();
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const token = getToken();

  const handleSearchChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleSearchChange2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const filteredItems = (items, searchTerm) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const fetchData = async () => {
      setChannels(await getChannels(token));
      setUsers(await getAllUsers(token));
    };
    fetchData();
  }, []);

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      style={{
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      <Box sx={{ marginTop: "50px" }}>
        <DropDown title={"Channels"}>
          <List>
            <FormControl
              variant="standard"
              sx={{
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
                width: "60%",
                marginLeft: "30px",
              }}
            >
              <Input
                id="Search"
                onChange={handleSearchChange1}
                sx={{ fontSize: "15px", height: "35px", pl: "5" }}
                placeholder="   Channels ..."
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ ml: 1 }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            {channels
              ? filteredItems(channels, searchTerm1).map((item, key) => (
                  <ListItem
                    disablePadding
                    onClick={() => push(`/channel/${item.id}`)}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={"# " + item.name}
                        sx={{ marginLeft: "15px" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              : ""}
          </List>
          <div className={styles.sidebarButtonContainer}>
            <Button
              variant="outlined"
              sx={{ width: "80%", fontSize: "11px" }}
              color="tertiary"
              endIcon={<AddIcon />}
              onClick={() => push("/channel/create")}
            >
              Create a channel
            </Button>
          </div>
        </DropDown>
        <DropDown title={"Messages"}>
          <List>
            <FormControl
              variant="standard"
              sx={{
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
                width: "60%",
                marginLeft: "30px",
              }}
            >
              <Input
                id="Search"
                onChange={handleSearchChange2}
                sx={{ fontSize: "15px", height: "35px", pl: "5" }}
                placeholder="   Users ..."
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ ml: 1 }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            {users
              ? filteredItems(users, searchTerm2).map((item, key) => (
                  <ListItem
                    key={key}
                    disablePadding
                    onClick={() => push(`/messages/${item.id}`)}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.name}
                        sx={{ marginLeft: "15px" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              : ""}
          </List>
        </DropDown>
      </Box>
    </div>
  );
};
export default Sidebar;
