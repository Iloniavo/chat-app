"use server"


import React, {useEffect, useState} from "react";
import {Channels} from "../utils/type";
import {getToken} from "../hooks/useGetAuthUserInfo";
import {useRouter} from "next/navigation";
import { globalAxios as axios } from "../config/axiosConf";
import {Box, Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Home.module.css'
import {getChannels} from "@/provider/ChannelProvider";

const Sidebar = ({isOpen}) => {
    const {push} = useRouter()
    const [channels, setChannels] = useState<Channels[]>([])
    const token = getToken()

    useEffect(() => {
        const fetchData = async () => {
            await getChannels(token).then((res) => setChannels(res.data.channels))
        }
        fetchData();
    }, [])

    return <div className={`${styles.sidebar} ${ isOpen ? styles.sidebarOpen : ''}`}  style={{  overflowY: 'auto' }}>
        <Box sx={{ marginTop: '50px' }} >
        { channels.map<Channels>((item, key) => <List>
            <ListItem disablePadding onClick={() => push( `/channel/${item.id}` )} >
                <ListItemButton>
                    <ListItemText primary={ "# " + item.name} sx={{marginLeft: '15px'}} />
                </ListItemButton>

            </ListItem>
        </List>)}
        </Box>
        <div className={styles.sidebarButtonContainer}>
            <Button variant="outlined" sx={{ width: "80%" }} color='tertiary' endIcon={<AddIcon/>} onClick={() => push("/channel/create")}>
                Create a channel
            </Button>
        </div>
    </div>
}
export default Sidebar;