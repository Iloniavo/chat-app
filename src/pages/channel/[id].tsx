import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/NavBar";
import Sidebar from "../../components/SideBar";
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MessagesList from "../../components/MessagesList";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { getToken } from "../../hooks/useGetAuthUserInfo";
import { getChannelById } from "@/provider/ChannelProvider";
import { sendMessage } from "@/provider/MessageProvider";
import { Message } from "@/utils/type";
import {GetServerSideProps} from "next";

const token = getToken();

const fetcher = (url) => axios.get(url, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((res) => res.data);

export default function Id({channel}) {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`http://localhost:8080/messages/channel/${id}`, fetcher, { refreshInterval: 5000 });

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [messageContent, setMessageContent] = useState("");
    const [messagesList, setMessageList] = useState<Message[] | null>(null);
    const [message, setMessage] = useState({});

    const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);
    useEffect(() => {
        if (data) {
            setMessageList([...data.messages, message]);
        }
    }, [data, message]);

    const handleSendMessage = async () => {
        const newMessage = { channelId: id, content: messageContent, recipientId: null };
        await sendMessage(newMessage, token)
            .then((res) => {
                console.log(messageContent);
                setMessageContent('');
            });
    }

    return (
        <>
            <Navbar handleSideBarOpen={handleToggle} title={channel.name} />
            <Sidebar isOpen={isSideBarOpen} />
            <Box sx={{ width: "60vw", height: "60vh", margin: '100px auto', border: 'solid black 2px' }} component="form">
                <Box sx={{ width: "90%", height: '90%', margin: 'auto', border: 'solid black 2px' }}>
                    {messagesList !== null ? <MessagesList data={messagesList} /> : "Coucou les hahahahahaha"}
                </Box>
                <TextField value={messageContent} multiline rows={4} placeholder={"Send a message"} onChange={(e: any) => setMessageContent(e.target.value)} />
                <IconButton onClick={handleSendMessage} disabled={messageContent.trim() === ""}>
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
    const token = req.cookies.token;
    const { id } = params;
    if (!token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }
    const channel = await getChannelById(id, token);
    return {
        props: {
            channel
        }, // Vous pouvez également transmettre des données supplémentaires ici
    };
};