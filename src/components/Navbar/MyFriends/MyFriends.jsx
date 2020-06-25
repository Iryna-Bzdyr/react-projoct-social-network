import React, {useEffect, useState} from "react";
import s from './MyFriends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getFollowerUsersData, getUsersThunkCreator} from "../../../Redux/Reducer/user-reducer";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";

let MyFriends = (props) => {
    const friendsData = useSelector(state => state.usersPage.followerUserData)
    const followUsers = useSelector(state => state.usersPage.followUsers)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFollowerUsersData(followUsers))
    }, [followUsers.length])


    let avatarUnit = friendsData.map(u => (
        <Avatar src={u.avatar.url}></Avatar>
    ))

    return (
        friendsData.length ? <AvatarGroup max={4}>
            {avatarUnit}
        </AvatarGroup> : <></>
    )
}
export default MyFriends
