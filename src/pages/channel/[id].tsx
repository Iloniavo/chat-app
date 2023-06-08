import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/NavBar";
import Sidebar from "../../components/SideBar";
import MessagesList from "../../components/MessagesList";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { getToken } from "@/hooks/useGetAuthUserInfo";
import { getChannelById } from "@/provider/ChannelProvider";
import { sendMessage } from "@/provider/MessageProvider";
import { Message } from "@/utils/type";
import {GetServerSideProps} from "next";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {IconButton} from "@mui/material";
import {getCurrentUserInfo} from "@/provider/AuthProvider";

const token = getToken();

const fetcher = (url) => axios.get(url, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((res) => res.data);

export default function Id({channel, currentUser,id}) {


    const { data, error } = useSWR(`http://localhost:8080/messages/channel/${id}`, fetcher, { refreshInterval: 5000 });

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [messageContent, setMessageContent] = useState("");
    const [messagesList, setMessageList] = useState<Message[] | null>(null);

    const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);
    useEffect(() => {
        if (data) {
            setMessageList([data.messages].reverse());
        }
    }, [data]);

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
            <Navbar handleSideBarOpen={handleToggle} title={channel.name} userName={currentUser.name} />
            <Sidebar isOpen={isSideBarOpen} />
            <MessagesList data={messagesList?.reverse()} handleSendMessage={handleSendMessage} messageContent={messageContent} setMessageContent={setMessageContent} />
            <IconButton onClick={() => router.push("/channel/edit/"+id)} >
                <PersonAddIcon/>
            </IconButton>

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
    const currentUser = await getCurrentUserInfo(token)
    return {
        props: {
            channel,
            currentUser,
            id
        },
    };
};