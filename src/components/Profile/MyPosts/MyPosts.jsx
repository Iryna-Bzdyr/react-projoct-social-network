import React from 'react'
import s from './MyPosts.module.css'
import { Button, Input  } from 'reactstrap';
import Post from "./Post/Post";




const  MyPosts = (props) => {
    let postElements = props.state.profilePage.postData.map( (post, index) =>  <Post key={index} message={post.post} likes={post.likesCount}/>)
    let newPostElement = React.createRef()
    let addNewPost = () => {
        props.addPost()
    }
    let onPostChange = () =>{
            let text = newPostElement.current.value
            console.log(props.state.profilePage.newPostText)
            props.updateNewPostText(text)
        }

    return (
        <div>
            My post
            <div>
                <div className={s.new__post__area}>
                    <Input type="textarea" name="text" id="exampleText" onChange={onPostChange} ref={newPostElement} value={props.state.profilePage.newPostText} />
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