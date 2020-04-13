import React from 'react'
import {addPostActionCreator, upDateNewPostTextActionCreator} from "../../../Redux/Reducer/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";


const MyPostsContainer = (props) => {
    return <StoreContext.Consumer>
        {store =>{
            let state = store.getState()
            let addNewPost = () => {
                store.dispatch(addPostActionCreator())
            }
            let onPostChange = (text) => {
                store.dispatch(upDateNewPostTextActionCreator(text))
            }
            return (<MyPosts upDateNewPostText={onPostChange} addNewPost={addNewPost} profilePage={state.profilePage} />)
        }}
    </StoreContext.Consumer>
};

export default MyPostsContainer