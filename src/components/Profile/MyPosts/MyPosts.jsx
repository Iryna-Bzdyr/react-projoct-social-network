import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";

let MyPosts;
MyPosts = () => {
    return (

        <div>
            My post
            <div>
                New post
                <Post message='Hi. how are you' age={12}/>
                <Post message = 'It"s my first post'age={25}/>
            </div>

        </div>

    )
};

export default MyPosts