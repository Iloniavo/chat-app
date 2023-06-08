import MessageItem from "./MessageItem";
import React from "react";
import {Box, IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Loader} from "@/components/Loader";

export default function MessagesList({data, messageContent,setMessageContent, handleSendMessage}){
    return (
        <div style={{ overflow: "auto", height: '100%' }} >
            <Box sx={{ width: "60vw", height: "60vh", margin: '100px auto' }} component="form">
                { data == null ? <Loader/> : <Box sx={{width: "90%", height: '90%', margin: 'auto', border: 'solid black 2px', overflow: "auto"}}>
                    {data.map((item) => <MessageItem content={item.content} date={item.createdAt} sender={item.sender?.name} />)}
                </Box>}
                <TextField value={messageContent} multiline rows={4} placeholder={"Send a messages"} onChange={(e: any) => setMessageContent(e.target.value)} />
                <IconButton onClick={handleSendMessage} disabled={messageContent.trim() === ""}>
                    <SendIcon />
                </IconButton>
            </Box>
        </div>
    )
}