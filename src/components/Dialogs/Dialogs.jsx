import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return(
        <div className={s.item + ' ' + s.active}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}

const MessageItem = (props)=> {
    return (
        <div className={s.messages}>{props.text}</div>
    )
}
const Dialogs = (props) => {
    return (
           <div>
               <div className={s.dialogs}>
                   <div className={s.dialogs__items}>
                       <DialogItem name='Item 1' id='1'/>
                       <DialogItem name='Item 2' id='2'/>
                       <DialogItem name='Item 3' id='3'/>
                   </div>


                   <div className={s.messages__items}>
                      <MessageItem id='1' text='Hello'/>
                       <MessageItem id='2' text='How are you'/>
                       <MessageItem id='3' text='What time is it'/>
                   </div>

               </div>
           </div>
    )
}
export default Dialogs