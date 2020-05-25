import React from "react";
import s from './SearchBar.module.css'
import {NavLink} from "react-router-dom";

let SearchBarNavigation = (props)=>{

    return (
        <div className={s.wrapper}>
           <div>
               <NavLink to={`/profile/${props.currentUserId}/${props.pathName}`} activeClassName={s.active} className={s.link}>{props.pathName}</NavLink>
           </div>
        </div>
    )
}
export default  SearchBarNavigation
