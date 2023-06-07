import MessageItem from "./MessageItem";
import React from "react";

export default function MessagesList({data}){
    return (
        <div style={{ overflow: "auto", height: '100%' }} >
            {data.map((item) => <MessageItem label={item.content} />
            )}
        </div>
    )
}