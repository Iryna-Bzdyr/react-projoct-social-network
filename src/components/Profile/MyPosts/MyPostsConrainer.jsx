import React from 'react'
import {addPostActionCreator, upDateNewPostTextActionCreator} from "../../../Redux/Reducer/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) =>{
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispath) => {
    return {
        upDateNewPostText:(text) => {
            dispath(upDateNewPostTextActionCreator(text))
        },
        addNewPost: () =>{
            dispath(addPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)
export default MyPostsContainer