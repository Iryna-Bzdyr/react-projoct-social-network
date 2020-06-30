import React, {useEffect} from "react";
import s from './../Dialogs.module.css'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import EmojiWindow from "../../../common/EmojiWindow/EmojiWindow";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteMessage,
    getMessagesData,
    sendNewMessage,
    updateNewMessageTextAC
} from "../../../Redux/Reducer/dialogs-reducer";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Avatar from "@material-ui/core/Avatar";
import {getUserAvatar} from "../../../Redux/Reducer/user-reducer";
import DeleteIcon from "@material-ui/icons/Delete";
import * as AOS from "aos";

const useStyles = makeStyles((theme) => ({
    textArea: {
        width: '65%',
        height: '65%',
        boxShadow: '0 3px 5px 2px #bbc0c7',
    },

    inputBlock: {
        display: 'flex',
        position: 'fixed',
        width: '65%',
        bottom: '0%',
        backgroundColor: 'white',
        zIndex: 100,
    },
    emoji: {
        position: 'absolute',
    }
}))

const MessageItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const newMessageText = useSelector(state => state.messagesPage.newMessageText)
    const messagesData = useSelector(state => state.messagesPage.MassagesData)
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)

    useEffect(() => {
        dispatch(getMessagesData(authUserID, dialogUserID))
        AOS.init();
        AOS.refresh();
    }, [dialogUserID, messagesData.length])
    const onMessageChange = (e) => {
        dispatch(updateNewMessageTextAC(e.target.value))
    };
    const sendMessage = () => {
        dispatch(sendNewMessage(authUserID, dialogUserID, newMessageText))
        dispatch(updateNewMessageTextAC(''))
    }
    const onClickDeleteMessage = (authUserID, dialogUserID, messageID) => {
        dispatch(deleteMessage(authUserID, dialogUserID, messageID))
    }
    return (
        !dialogUserID ? <></> :
            <div>

                <div className={s.dialog__wrapper}>
                    {
                        messagesData.map(data =>
                            data.userID === authUserID ?
                                <div className={s.outgoing} data-aos="fade-left">
                                    <div className={s.message__data}>
                                        <span>{data.date}</span><span>{data.time}</span></div>
                                    <div className={s.message__text__wrapper}>
                                        <div className={s.message__text}>{data.messageText}</div>
                                        {!data.delete ? <div className={s.message__detete__btn}>
                                            <IconButton className={s.message__detete__btn} size="small"
                                                        onClick={() => onClickDeleteMessage(authUserID, dialogUserID, data.messageID)}
                                                        aria-label="delete post"
                                            >
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </div> : <></>}
                                    </div>
                                    <Avatar aria-label="recipe" className={s.avatar}
                                            src={getUserAvatar(data.userID)}
                                    >
                                    </Avatar>
                                </div>
                                :
                                <div className={s.incoming} data-aos="fade-right">

                                    <Avatar aria-label="recipe" className={s.avatar}
                                            src={getUserAvatar(data.userID)}
                                    >
                                    </Avatar>
                                    <div className={s.message__text__wrapper}>

                                        <div className={s.message__text}>{data.messageText}</div>
                                    </div>

                                    <div className={s.message__data}>
                                        <span>{data.time}</span><span>{data.date}</span></div>
                                </div>
                        )
                    }
                </div>

                <div className={classes.inputBlock}>
                    <TextField
                        className={classes.textArea}
                        multiline
                        rows={1}
                        placeholder={props.label}
                        variant="outlined"
                        onChange={onMessageChange}
                        value={newMessageText}
                    />
                    <EmojiWindow className={classes.emoji} action={updateNewMessageTextAC}
                                 value={newMessageText}></EmojiWindow>
                    <IconButton color="primary" onClick={() => sendMessage()}>
                        <SendIcon/>
                    </IconButton>
                </div>
            </div>
    )
}

export default MessageItem
