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
import {withRouter} from "react-router-dom";

class MyPostsAPIContainer extends React.Component{
componentDidMount() {
    let userID = +this.props.match.params.userID
    if(!userID){
        userID =1
    }
    database.ref('database/profile/').orderByChild('userID').equalTo(userID).on('value', (snap) => {
        let data = []
        snap.forEach(u=>{
            data.push(u.val())
        })
        this.props.setPost(data[0].post)
    });

    database.ref('database/users/').orderByChild('id').equalTo(userID).on('value', (snap) => {
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

let WithURLMypostContainer = withRouter(MyPostsAPIContainer)

const MyPostsContainer = connect(mapStateToProps,{
    setPost:setPostDataAC,
    setUsers: setUsersAC,
    upDateNewPostText:upDateNewPostTextActionCreator,
    addNewPost:addPostActionCreator
})(WithURLMypostContainer)
export default MyPostsContainer
