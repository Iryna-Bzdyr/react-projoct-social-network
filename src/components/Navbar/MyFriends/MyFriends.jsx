import React, {useEffect} from "react";
import s from './MyFriends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator} from "../../../Redux/Reducer/user-reducer";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";

let MyFriends = (props) => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(state => state.usersPage.users)

    useEffect(() => {
        dispatch(getUsersThunkCreator(4, 1))
    }, [])

    let avatarElement = currentUserData.map(u=><Avatar src={u.avatar.url}/>)
    return (
        <AvatarGroup max={4}>
            {avatarElement}
        </AvatarGroup>
    )
}
export default MyFriends
