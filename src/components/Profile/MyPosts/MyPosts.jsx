import React from 'react'
import s from './MyPosts.module.css'
import { Button } from 'reactstrap';
import Post from "./Post/Post";


const  MyPosts = (props) => {
    let postElements = props.postData.map( (post, index) =>  <Post key={index} message={post.post} likes={post.likesCount}/>)
    console.log(postElements)
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