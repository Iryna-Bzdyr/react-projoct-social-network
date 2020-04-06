import React from 'react'
import s from './MyPosts.module.css'
import { Button } from 'reactstrap';
import Post from "./Post/Post";



const  MyPosts = (props) => {
    let postElements = props.postData.map( (post, index) =>  <Post key={index} message={post.post} likes={post.likesCount}/>)
    let newPostElement = React.createRef()
    let addNewPost = () => {
        debugger
        let text = newPostElement.current.value
        props.addPost(text)
    }
    return (
        <div>
            My post
            <div>
                <div className={s.new__post__area}>
                    <textarea ref={newPostElement} ></textarea>
                    <Button onClick={addNewPost} color="warning">Add</Button>{' '}
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