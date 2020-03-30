import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
           <div>
               <div className={s.dialogs}>
                   <div className={s.dialogs__items}>
                       <div className={s.item + ' ' + s.active}>
                           <NavLink to='/dialogs/1'>Item 1</NavLink>
                       </div>
                       <div className={s.item}>
                           <NavLink to='/dialogs/2'>Item 2</NavLink>
                       </div>
                       <div className={s.item}>
                           <NavLink to='/dialogs/3'>Item 3</NavLink>
                       </div>
                   </div>

                   <div className={s.messages__items}>
                       <div className={s.messages}>Message 1</div>
                       <div className={s.messages}>Message 2</div>
                       <div className={s.messages}>Message 3</div>
                   </div>

               </div>
           </div>
    )
}
export default Dialogs