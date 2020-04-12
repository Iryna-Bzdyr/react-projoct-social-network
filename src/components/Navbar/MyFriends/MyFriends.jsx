import React from "react";
import s from './MyFriends.module.css'

let MyFriends =(props)=> {
   return(
       <div className={s.friend__block}>
           <img src={props.imageUrl} alt={props.name} />
       </div>
   )
}
export default MyFriends