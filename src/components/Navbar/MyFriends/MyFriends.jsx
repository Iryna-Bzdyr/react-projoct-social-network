import React, {useEffect, useState} from "react";
import s from './MyFriends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getFollowerUsersData, getUsersThunkCreator} from "../../../Redux/Reducer/user-reducer";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

let MyFriends = (props) => {
    const friendsData = useSelector(state => state.usersPage.followerUserData)
    const followUsers = useSelector(state => state.usersPage.followUsers)
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFollowerUsersData(followUsers))
    }, [followUsers.length])

    let onAvatarClick = (id) => {
        history.push(`/profile/${id}/Photo`);
    }

    let avatarUnit = friendsData.map(u => (
        <Avatar src={u.avatar.url} onClick={() => onAvatarClick(u.id)} className={s.avatar}></Avatar>
    ))

    return (
        friendsData.length ?
            <div className={s.wrapper}>
                <div className={s.user__area}>
                    <AvatarGroup max={4}>
                        {avatarUnit}
                    </AvatarGroup>


                    <IconButton
                        aria-label="next">
                        <PeopleAltIcon></PeopleAltIcon>
                    </IconButton>
                </div>
                <div className={s.arrow_btn}>
                    <IconButton
                        color="secondary" aria-label="add an alarm">
                        <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                    </IconButton>
                    <IconButton
                        color="secondary" aria-label="add an alarm">
                        <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                    </IconButton>
                </div>
            </div> : <></>

    )
}
export default MyFriends
