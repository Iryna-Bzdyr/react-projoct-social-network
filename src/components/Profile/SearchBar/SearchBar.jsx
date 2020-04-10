import React from "react";
import s from './SearchBar.module.css'
import {NavLink} from "react-router-dom";

let SearchBar = (props)=>{

    return (
        <div>
           <div>
               <NavLink to={`/profile/${props.pathName}`} activeClassName={s.active} className={s.link}>{props.pathName}</NavLink>
           </div>
        </div>
    )
}
export default  SearchBar