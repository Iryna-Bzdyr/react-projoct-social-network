import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MassageItem/MessageItem";
import { Button } from 'reactstrap';



const Dialogs = (props) => {
    let dialogsElements = props.state.DialogsData.map( (dialog, index) => (<DialogItem key={index} id={dialog.id} name={dialog.name} />))
    let messageElements = props.state.MassageData.map(message => <MessageItem key={message.id} id={message.id} text={message.text}/> )
    let addNewMessage = () => {
         props.addNewMessage()
    }
    let changeMessage = (event) => {
        let messageText = event.target.value
        props.changeMessage(messageText)
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
                <textarea value={props.state.newMessageText}  onChange={changeMessage}/>

                <Button onClick={addNewMessage} color="warning">Add</Button>{' '}
            </div>
        </div>
    )
}
export default Dialogs