import React from 'react'
import s from './MyPosts.module.css'
import {Button} from 'reactstrap';




const MyPosts = (props) => {
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
                              value={props.newPostText}/>
                    <Button onClick={addNewPost} color="warning">Add</Button>{' '}
                </div>
                New post
                {
                    props.postData.map(post => <div>
                        <div className={s.wrapper}>
                            <div className={s.avatar}>
                                <img src={props.user[0].photo}/>
                            </div>
                            <div>
                                {post.text}
                                {post.likes}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>

    )
};

export default MyPosts