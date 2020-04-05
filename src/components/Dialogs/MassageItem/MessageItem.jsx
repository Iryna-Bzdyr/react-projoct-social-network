import React from "react";
import s from './../Dialogs.module.css'


const MessageItem = (props) => {
    return (
        <div className={s.messages}>{props.text}</div>
    )
}
export default MessageItem