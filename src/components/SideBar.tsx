"use server"


import React, {useEffect, useState} from "react";
import {Channels, UserData} from "../utils/type";
import {getToken} from "../hooks/useGetAuthUserInfo";
import {useRouter} from "next/navigation";
import { globalAxios as axios } from "../config/axiosConf";
import {Box, Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Home.module.css'
import {getChannels} from "@/provider/ChannelProvider";
import {getAllUsers} from "@/provider/AuthProvider";
import DropDown from "@/components/DropDown";

const Sidebar = ({isOpen}) => {
    const {push} = useRouter()
    const [channels, setChannels] = useState<[]>()
    const [users, setUsers] = useState<[]>()
    const token = getToken()

    useEffect(() => {
        const fetchData = async () => {
            setChannels(await getChannels(token))
            setUsers(await getAllUsers(token))
        }
        fetchData();
    }, [])

    return <div className={`${styles.sidebar} ${ isOpen ? styles.sidebarOpen : ''}`}  style={{  overflowY: 'auto' }}>
        <Box sx={{ marginTop: '50px' }} >

            <DropDown title={"Channels"}>
                <List>
                { channels ? channels.map((item, key) =>
                    <ListItem disablePadding onClick={() => push( `/channel/${item.id}` )} >
                        <ListItemButton>
                            <ListItemText primary={ "# " + item.name} sx={{marginLeft: '15px'}} />
                        </ListItemButton>

                    </ListItem>
               ) : ""}
                </List>
                <div className={styles.sidebarButtonContainer}>
                    <Button variant="outlined" sx={{ width: "80%", fontSize: "13px" }} color='tertiary' endIcon={<AddIcon/>} onClick={() => push("/channel/create")}>
                        Create a channel
                    </Button>
                </div>
            </DropDown>
            <DropDown title={"Messages"} >
                <List>
                {
                    users ? users.map((item, key) => (
                        <ListItem disablePadding onClick={() => push( `/messages/${item.id}` )} >
                            <ListItemButton>
                                <ListItemText primary={item.name} sx={{marginLeft: '15px'}} />
                            </ListItemButton>
                        </ListItem>
                    )): ""
                }
                </List>
            </DropDown>
        </Box>
    </div>
}
export default Sidebar;