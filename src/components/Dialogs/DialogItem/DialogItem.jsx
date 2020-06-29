import React, {useEffect, useState} from "react";
import s from './../Dialogs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getDialogsData, getDialogsUserData, setDialogUserIDAC} from "../../../Redux/Reducer/dialogs-reducer";
import Avatar from "@material-ui/core/Avatar";
import {getUserAvatar} from "../../../Redux/Reducer/user-reducer";
import Paper from "@material-ui/core/Paper";

const DialogItem = (props) => {
    const dispatch = useDispatch();
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const [dialogsData, setDialogsData] = useState({})
    const messagesData = useSelector(state => state.messagesPage.MassagesData)
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)
    const DialogsUserData = useSelector(state => state.messagesPage.DialogsUserData)

    useEffect(() => {
        setDialogsData(dispatch(getDialogsData(authUserID,props.dialogUserID)))
        // dispatch(setDialogUserIDAC(DialogsUserData[0].userID))
    }, [props.dialogUserID, messagesData.length])

    const onClick=(id)=>{
        dispatch(setDialogUserIDAC(id))
    }
    return (
        <div onClick={()=>onClick(props.dialogUserID)}className={s.dialogs__wrapper}>
            <Paper elevation={3} variant="outlined" className={s.dialogs__data}>
            <div className={s.dialogs__data__box}>
                <Avatar aria-label="recipe" className={s.avatar}
                        src={getUserAvatar(props.dialogUserID)}
                >
                </Avatar>
                <div className={s.dialogs__data__message__text}>{dialogsData.messageText}</div>
            </div>
            <div className={s.message__data}>
                <span>{dialogsData.time}</span><span>{dialogsData.date}</span></div>
            </Paper>
        </div>
    )
}
export default DialogItem