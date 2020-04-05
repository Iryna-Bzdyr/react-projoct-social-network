import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={s.item + ' ' + s.active}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}

const MessageItem = (props) => {
    return (
        <div className={s.messages}>{props.text}</div>
    )
}

let DialogsData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
    {id: 4, name: 'Item 4'}
]
let dialogsElements = DialogsData.map( dialog => (<DialogItem id={dialog.id} name={dialog.name} />))

let MassageData = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'How are you'},
    {id: 3, text: 'What time is it'},
]

let messageElements = MassageData.map(message => <MessageItem id={message.id} text={message.text}/> )

const Dialogs = (props) => {
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