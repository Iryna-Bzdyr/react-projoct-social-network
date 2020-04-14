import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/Reducer/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state:state.messagesPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: ()=>{
            dispatch(addMessageActionCreator())
        },
        changeMessage: (messageText)=>{
            dispatch(updateNewMessageTextActionCreator(messageText))
        }
    }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
export default DialogsContainer