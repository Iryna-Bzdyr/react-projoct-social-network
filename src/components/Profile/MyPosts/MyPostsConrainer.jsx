import React from 'react'
import {addPostActionCreator, upDateNewPostTextActionCreator} from "../../../Redux/Reducer/profile-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
    let state = props.store.getState()
    let addNewPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    let onPostChange = (text) => {
        props.store.dispatch(upDateNewPostTextActionCreator(text))
    }

    return (<MyPosts upDateNewPostText={onPostChange} addNewPost={addNewPost} profilePage={state.profilePage} />)
};

export default MyPostsContainer