import { GetServerSideProps } from "next";
import { getAllUsers, getCurrentUserInfo } from "@/provider/AuthProvider";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { getUserById } from "@/provider/ChannelProvider";
import { sendMessage } from "@/provider/MessageProvider";
import MessagesList from "@/components/MessagesList";

export default function Id({ currentUser, token, idRecipient, recipientUser }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  const { data } = useSWR(
    `${process.env.NEXT_API_URL}/messages/${idRecipient}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const handleSendMessage = async () => {
    const newMessage = {
      channelId: null,
      content: messageContent,
      recipientId: idRecipient,
    };
    await sendMessage(newMessage, token).then((res) => {
      console.log(messageContent);
      setMessageContent("");
    });
  };

  return (
    <>
      <Navbar
        handleSideBarOpen={handleToggle}
        title={recipientUser.name}
        userName={currentUser.name}
      />
      <Sidebar isOpen={isSideBarOpen} />
      <MessagesList
        data={data ? data.messages.reverse() : []}
        handleSendMessage={handleSendMessage}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const token = req.cookies.token;
  const idRecipient = params.id;

  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const currentUser = await getCurrentUserInfo(token);
  const recipientUser = await getUserById(idRecipient, token);
  return {
    props: {
      currentUser,
      token,
      idRecipient,
      recipientUser,
    },
  };
};
