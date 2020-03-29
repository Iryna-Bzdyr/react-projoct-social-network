import React from 'react'
import s from './Post.module.css'

let Post;
Post = (props) => {
    console.log(props)
    return <div className={s.item}>
        {props.message}
        {props.age}
    </div>
};

export default Post