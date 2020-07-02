import React, {useEffect, useState} from "react";
import s from "./Users.module.css";
import {
    changeUserPage,
    checkFollow,
    followThunk, getFollowers,
    setTotalUserCount,
    unFollowThunk
} from "../../Redux/Reducer/user-reducer";
import {useDispatch, useSelector} from "react-redux";



const FollowBtn = (props) => {
    // console.log(props)
    const dispatch = useDispatch();
    let [followStatus, setFollowStatus] = useState('')
    const followUsers = useSelector(state => state.usersPage.followUsers)

    useEffect(() => {
        // dispatch(getFollowers(props.authUserID))

            if (dispatch(checkFollow(props.authUserID, props.id)) == props.id) {
                setFollowStatus(true)
            } else (setFollowStatus(false))


    }, [props.id, followUsers.length])


    let follow = (id, followUserId) => {
        dispatch(followThunk(id, followUserId))
    }
    let unFollow = (id, followUserId) => {
        dispatch(unFollowThunk(id, followUserId))
    }
    return (
        <div>
            {followStatus
                ? <button onClick={() => {
                    unFollow(props.authUserID, props.id)
                }} className={s.unfollow__btn}>UNFOLLOW</button>
                : <button onClick={() => {
                    follow(props.authUserID, props.id)
                }} className={s.follow__btn}>FOLLOW</button>
            }
        </div>
    )
}

export default FollowBtn
