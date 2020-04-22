import React from 'react'
import {
    addPostActionCreator,
    setPostDataAC,
    upDateNewPostTextActionCreator
} from "../../../Redux/Reducer/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import database from "../../../firebase";
import {setUsersAC} from "../../../Redux/Reducer/user-reducer";

class MyPostsAPIContainer extends React.Component{
componentDidMount() {
    database.ref('database/profile/').orderByChild('userID').equalTo(2).on('value', (snap) => {
        let data = []
        snap.forEach(u=>{
            data.push(u.val())
        })
        this.props.setPost(data[0].post)
    });

    database.ref('database/users/').orderByChild('id').equalTo(2).on('value', (snap) => {
        let user = []
        snap.forEach(u=>{
            user.push(u.val())
        })
        this.props.setUsers(user)
    });
}
    render() {
        return (
            <MyPosts postData={this.props.postData} user={this.props.userData}/>
        )
    }
}


let mapStateToProps = (state) =>{
    return {
        postData: state.profilePage.postData,
        newPostText:state.profilePage.newPostText,
        userData: state.usersPage.users
    }
}

const MyPostsContainer = connect(mapStateToProps,{
    setPost:setPostDataAC,
    setUsers: setUsersAC,
    upDateNewPostText:upDateNewPostTextActionCreator,
    addNewPost:addPostActionCreator
})(MyPostsAPIContainer)
export default MyPostsContainer