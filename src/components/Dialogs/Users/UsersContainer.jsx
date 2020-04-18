import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setUsersAC, unfollowAC} from "../../../Redux/Reducer/user-reducer";
const mapStateToProps = (state)=>{
return{
    users: state.usersPage.users
}
}

const mapDispatchToProps = (dispatch)=>{
   return{
       follow: (userId)=>{
           dispatch(followAC(userId))},
       unFollow:(userId)=>{
           dispatch(unfollowAC(userId))
       },
       setUsers: (users)=> {
           dispatch(setUsersAC(users))
       }
   }
}

const UserContainer = connect(mapStateToProps,mapDispatchToProps)(Users)
export default UserContainer