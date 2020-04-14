import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/Reducer/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props) => {
//     return <StoreContext.Consumer>
//         {store =>{
//             let state = store.getState()
//             let addNewMessage = () => {
//                 store.dispatch(addMessageActionCreator())
//             }
//             let changeMessage = (messageText) => {
//                 store.dispatch(updateNewMessageTextActionCreator(messageText))
//             }
//             return (<Dialogs addNewMessage={addNewMessage} changeMessage={changeMessage} state={state.messagesPage} />)
//         }}
//     </StoreContext.Consumer>
// }

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