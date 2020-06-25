import React, {useEffect, useState} from "react";
import s from "./Users.module.css";
import {
    changeUserPage,
    checkFollow,
    followThunk,
    setTotalUserCount,
    unFollowThunk
} from "../../Redux/Reducer/user-reducer";
import {useDispatch, useSelector} from "react-redux";



const FollowBtn = (props) => {
    const dispatch = useDispatch();
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    let [followStatus, setFollowStatus] = useState('')


    useEffect(() => {
        if (dispatch(checkFollow(authUserID, props.id)) == props.id) {
            setFollowStatus(true)
        } else (setFollowStatus(false))
    }, [props.id])


    let follow = (id, followUserId) => {
        dispatch(followThunk(id, followUserId))
        dispatch(changeUserPage(props.currentPage, props.pageSize))
        dispatch(setTotalUserCount())
    }
    let unFollow = (id, followUserId) => {
        dispatch(unFollowThunk(id, followUserId))
        dispatch(changeUserPage(props.currentPage, props.pageSize))
        dispatch(setTotalUserCount())
    }
    return (
        <div>
            {followStatus
                ? <button onClick={() => {
                    unFollow(authUserID, props.id)
                }} className={s.unfollow__btn}>UNFOLLOW</button>
                : <button onClick={() => {
                    follow(authUserID, props.id)
                }} className={s.follow__btn}>FOLLOW</button>
            }
        </div>
    )
}

export default FollowBtn
