import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/Reducer/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState()
    let addNewMessage = () => {
         props.store.dispatch(addMessageActionCreator())
    }
    let changeMessage = (messageText) => {
        props.store.dispatch(updateNewMessageTextActionCreator(messageText))
    }
    return (<Dialogs addNewMessage={addNewMessage} changeMessage={changeMessage} state={state.messagesPage} />)
}
export default DialogsContainer