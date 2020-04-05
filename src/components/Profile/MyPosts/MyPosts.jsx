import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import { Button } from 'reactstrap';

let postData = [
    {id:1, post:'Hi. how are you', likesCount:12},
    {id:2, post:'It"s my first post', likesCount:35}
]
let postElements = postData.map( post =>  <Post message={post.post} likes={post.likesCount}/>)
const  MyPosts = () => {
    return (

        <div>
            My post
            <div>
                <div className={s.new__post__area}>
                    <textarea></textarea>
                    <Button color="warning">Add</Button>{' '}
                </div>
                New post
                {
                    postElements
                }
            </div>


        </div>

    )
};

export default MyPosts