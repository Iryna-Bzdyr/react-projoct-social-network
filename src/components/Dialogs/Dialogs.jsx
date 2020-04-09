import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MassageItem/MessageItem";
import { Button } from 'reactstrap';


const Dialogs = (props) => {
    console.log(props)
    let dialogsElements = props.state.messagesPage.DialogsData.map( (dialog, index) => (<DialogItem key={index} id={dialog.id} name={dialog.name} />))
    let messageElements = props.state.messagesPage.MassageData.map(message => <MessageItem key={message.id} id={message.id} text={message.text}/> )
    let newMessageText = React.createRef()
    let addNewMessage = () => {
         props.addMessage()
    }
    let changeMessage = () => {
        let messageText = newMessageText.current.value
        props.updateNewMessageText(messageText)
    }
    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogs__items}>
                    {
                        dialogsElements
                    }
                </div>


                <div className={s.messages__items}>
                    {
                        messageElements
                    }
                </div>

            </div>
            <div className={s.message__area}>
                <textarea value={props.state.messagesPage.newMessageText} ref={newMessageText} onChange={changeMessage}/>

                <Button onClick={addNewMessage} color="warning">Add</Button>{' '}
            </div>
        </div>
    )
}
export default Dialogs