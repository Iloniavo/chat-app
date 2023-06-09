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
import { toast, ToastContainer } from "react-toastify";
import WifiChannelIcon from "@mui/icons-material/WifiChannel";
import ChatIcon from "@mui/icons-material/Chat";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      <div
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        <Box sx={{ marginTop: "50px" }}>
          <DropDown
            title={"Channels"}
            startIcon={<WifiChannelIcon fontSize={""} />}
          >
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
                      onClick={() => {
                        toast("You'll be redirected", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          progressStyle: { background: "#04323A" },
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          style: {
                            color: "#04323A",
                          },
                        });
                        push(`/channel/${item.id}`);
                      }}
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
          <DropDown title={"Messages"} startIcon={<ChatIcon fontSize={""} />}>
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
                      onClick={() => {
                        toast("You'll be redirected", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          progressStyle: { background: "#04323A" },
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          style: {
                            color: "#04323A",
                          },
                        });
                        push(`/messages/${item.id}`);
                      }}
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
      <ToastContainer style={{ zIndex: "999999" }} />
    </>
  );
};
export default Sidebar;
