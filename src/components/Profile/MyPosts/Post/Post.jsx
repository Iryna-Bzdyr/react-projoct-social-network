import React from "react";
import s from './Post.module.css'

const Post = (props)=>{
    return (
        <div className={s.wrapper}>
           <div className={s.avatar}>
               <img src='https://mvclip.ru/content/images/artists/1/5327124a3ee946e2a6ebcd9b1f9164f4.jpg '/>
           </div>
            <div>
                {props.message}
                {props.likes}
            </div>
        </div>
    )
}
export default Post