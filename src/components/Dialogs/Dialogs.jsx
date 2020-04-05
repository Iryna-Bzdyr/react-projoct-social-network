import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MassageItem/MessageItem";


const Dialogs = (props) => {
    let dialogsElements = props.DialogsData.map( (dialog, index) => (<DialogItem key={index} id={dialog.id} name={dialog.name} />))
    let messageElements = props.MassageData.map(message => <MessageItem key={message.id} id={message.id} text={message.text}/> )
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
        </div>
    )
}
export default Dialogs