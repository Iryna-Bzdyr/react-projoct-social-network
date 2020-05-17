import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../Redux/Reducer/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        state:state.messagesPage,
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
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent)
// export default DialogsContainer
