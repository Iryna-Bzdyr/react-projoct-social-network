import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/Reducer/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = (props) => {
    return <StoreContext.Consumer>
        {store =>{
            let state = store.getState()
            let addNewMessage = () => {
                store.dispatch(addMessageActionCreator())
            }
            let changeMessage = (messageText) => {
                store.dispatch(updateNewMessageTextActionCreator(messageText))
            }
            return (<Dialogs addNewMessage={addNewMessage} changeMessage={changeMessage} state={state.messagesPage} />)
        }}
    </StoreContext.Consumer>
}
export default DialogsContainer