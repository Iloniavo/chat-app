import {GetServerSideProps} from "next";
import {getAllUsers, getCurrentUserInfo} from "@/provider/AuthProvider";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import React, {useState} from "react";
import axios from "axios";
import useSWR from "swr";
import {useEffect} from "react";
import {getUserById} from "@/provider/ChannelProvider";
import {sendMessage} from "@/provider/MessageProvider";
import MessagesList from "@/components/MessagesList";
import {Message} from "@/utils/type";



export default function Id({currentUser, token, idRecipient, recipientUser}){
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [messageContent, setMessageContent] = useState("");
    const [messagesList, setMessageList] = useState<Message[] | null>(null);
    const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);

    const fetcher = (url) => axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);

    const { data, error } = useSWR(`http://localhost:8080/messages/${idRecipient}`, fetcher, { refreshInterval: 5000 });

    const handleSendMessage = async () => {
        const newMessage = { channelId: null, content: messageContent, recipientId: idRecipient };
        await sendMessage(newMessage, token)
            .then((res) => {
                console.log(messageContent);
                setMessageContent('');
            });
    }

    return (
        <>
            <Navbar handleSideBarOpen={handleToggle} title={recipientUser.name} userName={currentUser.name} />
            <Sidebar isOpen={isSideBarOpen} />
            <MessagesList data={data.messages.reverse()} handleSendMessage={handleSendMessage} messageContent={messageContent} setMessageContent={setMessageContent} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
    const token = req.cookies.token;
    const idRecipient = params.id;

    if (!token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }
    const currentUser = await getCurrentUserInfo(token)
    const recipientUser = await getUserById(idRecipient, token)
    return {
        props: {
            currentUser,
            token,
            idRecipient,
            recipientUser
        },
    };
};