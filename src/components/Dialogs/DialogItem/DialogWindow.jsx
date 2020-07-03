import React from "react";
import s from './../Dialogs.module.css'
import Avatar from "@material-ui/core/Avatar";
import {getUserAvatar, getUserFirstName, getUserLastName} from "../../../Redux/Reducer/user-reducer";
import {useSelector} from "react-redux";
import MessageItem from "../MassageItem/MessageItem";

const DialogWindow = (props) => {
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)

    return (
        <div>
            <div className={s.dialog__header}>
                <Avatar aria-label="recipe" className={s.avatar}
                        src={getUserAvatar(dialogUserID)}
                >
                </Avatar>

                <div className={s.user__name}><span className={s.name}>{getUserFirstName(dialogUserID)}</span>
                    <span className={s.name}>{getUserLastName(dialogUserID)}</span>
                </div>
            </div>
            <MessageItem></MessageItem>

        </div>
    )
}
export default DialogWindow
