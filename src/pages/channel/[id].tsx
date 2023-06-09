import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/NavBar";
import Sidebar from "../../components/SideBar";
import MessagesList from "../../components/MessagesList";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getToken } from "@/hooks/useGetAuthUserInfo";
import { getChannelById } from "@/provider/ChannelProvider";
import { sendMessage } from "@/provider/MessageProvider";
import { GetServerSideProps } from "next";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import { getCurrentUserInfo } from "@/provider/AuthProvider";

const token = getToken();

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export default function Id({ channel, currentUser, id }) {
  const router = useRouter();
  const { data, error } = useSWR(
    `http://localhost:8080/messages/channel/${id}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [messageContent, setMessageContent] = useState("");

  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);

  const handleSendMessage = async () => {
    const newMessage = {
      channelId: id,
      content: messageContent,
      recipientId: null,
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
        title={"# " + channel.name}
        userName={currentUser.name}
      />
      <Sidebar isOpen={isSideBarOpen} />
      <MessagesList
        data={data ? data.messages : []}
        handleSendMessage={handleSendMessage}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
      />

      <div
        style={{
          position: "absolute",
          right: "40px",
          bottom: "40px",
        }}
      >
        <Button
          onClick={() => router.push("/channel/edit/" + id)}
          endIcon={<PersonAddIcon />}
          sx={{ fontSize: "12px" }}
          variant="contained"
        >
          Add people
        </Button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const token = req.cookies.token;
  const { id } = params;
  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const channel = await getChannelById(id, token);
  const currentUser = await getCurrentUserInfo(token);
  return {
    props: {
      channel,
      currentUser,
      id,
    },
  };
};
