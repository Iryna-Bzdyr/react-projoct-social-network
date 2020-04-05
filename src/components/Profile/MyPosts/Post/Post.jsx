import React from "react";

const Post = (props)=>{
    return (
        <div>
            {props.message}
            {props.likes}
        </div>
    )
}
export default Post