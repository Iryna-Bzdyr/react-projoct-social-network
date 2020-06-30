import React, {useEffect, useState} from "react";
import s from './../Dialogs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getDialogsData, getDialogsUserData, setDialogUserIDAC} from "../../../Redux/Reducer/dialogs-reducer";
import Avatar from "@material-ui/core/Avatar";
import {getUserAvatar} from "../../../Redux/Reducer/user-reducer";
import Paper from "@material-ui/core/Paper";
import * as AOS from "aos";

const DialogItem = (props) => {
    const dispatch = useDispatch();
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)
    const DialogsUserData = useSelector(state => state.messagesPage.DialogsUserData)


console.log(props)
    useEffect(() => {
          if(!dialogUserID){
              setTimeout(()=>{ dispatch(setDialogUserIDAC(DialogsUserData[0].userID))},1000)
          }
        AOS.init();
        AOS.refresh();
    }, [props.length,dialogUserID])

    const onClick = (id) => {
        dispatch(setDialogUserIDAC(id))
    }
    return (
        <div onClick={() => onClick(props.dialogUserID)} className={s.dialogs__block} >

            <Paper elevation={3} variant="outlined" className={s.dialogs__data}>
                <div className={s.dialogs__data__box}>
                    <Avatar aria-label="recipe" className={s.avatar}
                            src={getUserAvatar(props.dialogUserID)}
                    >
                    </Avatar>
                    <div
                        className={s.dialogs__data__message__text}>{getDialogsData(authUserID, props.dialogUserID).messageText}</div>
                </div>
                <div className={s.message__data}>
                    <span>{getDialogsData(authUserID, props.dialogUserID).time}</span><span>{getDialogsData(authUserID, props.dialogUserID).date}</span>
                </div>
            </Paper>

        </div>
    )
}
export default DialogItem
