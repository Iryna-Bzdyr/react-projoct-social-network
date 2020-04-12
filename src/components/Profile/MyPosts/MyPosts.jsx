import React from 'react'
import s from './MyPosts.module.css'
import {Button} from 'reactstrap';
import Post from "./Post/Post";



const MyPosts = (props) => {
    let postElements = props.profilePage.postData.map((post, index) => <Post key={index} message={post.post} likes={post.likesCount}/>)
    let newPostElement = React.createRef()
    let addNewPost = () => {
        props.addNewPost()
    }
    let onPostChange = () => {
        let text = newPostElement.current.value
        props.upDateNewPostText(text)
    }

    return (
        <div>
            My post
            <div>
                <div className={s.new__post__area}>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.profilePage.newPostText}/>
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