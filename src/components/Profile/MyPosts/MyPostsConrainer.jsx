import React from 'react'
import {addPostActionCreator, upDateNewPostTextActionCreator} from "../../../Redux/Reducer/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) =>{
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        upDateNewPostText:(text) => {
            dispatch(upDateNewPostTextActionCreator(text))
        },
        addNewPost: () =>{
            dispatch(addPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)
export default MyPostsContainer