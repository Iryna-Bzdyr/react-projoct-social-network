import React, {useEffect, useState} from "react";
import s from './MyFriends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator} from "../../../Redux/Reducer/user-reducer";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";

let MyFriends = (props) => {
    const usersData = useSelector(state => state.usersPage.users)
    const totalUserCount = useSelector(state => state.usersPage.totalUsersCount)
    // let [pagesSize, setPagesSize] = useState(4)
    // let [pagesCount, setPagesCount] = useState(Math.ceil(totalUserCount / pagesSize))

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersThunkCreator(4, 1))
        // setPagesSize(4)
    }, [...usersData])

    // onPageChange = (page) => {
    //     this.props.changeUserPage(page, this.props.pageSize)
    // }
    let avatarUnit = usersData.map(u => (
        u.avatar.url ? <Avatar src={u.avatar.url}></Avatar> : <Avatar
            src='https://firebasestorage.googleapis.com/v0/b/react-social-network-a5dc0.appspot.com/o/photo%2F1014-512.png?alt=media&token=954ffa60-d24a-4f30-b890-9f8548b29167'></Avatar>
    ))
    return (
        <AvatarGroup max={4}>
            {avatarUnit}
        </AvatarGroup>
    )
}
export default MyFriends
