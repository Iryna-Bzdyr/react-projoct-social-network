import React, {useEffect} from "react";
import s from './Activity.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getFollowerPosts} from "../../../Redux/Reducer/profile-reducer";
import PreLoader from "../../../common/PreLoader/PreLoader";
import MyPosts from "../MyPosts/MyPosts";
import {getCurrentFollowers} from "../../../Redux/Reducer/user-reducer";


let Activity = (props) => {
    const dispatch = useDispatch();
    const currentFollowUsers = useSelector(state => state.usersPage.currentFollowUsers)
    const followerPostData = useSelector(state => state.profilePage.followerPostData)
    const authUserID = useSelector(state => state.usersPage.currentUserId)


    useEffect(() => {
        dispatch(getCurrentFollowers(authUserID))
        dispatch(getFollowerPosts(currentFollowUsers))
    }, [followerPostData.length, currentFollowUsers.length])


    return (
        !followerPostData.length ? <PreLoader></PreLoader> :
            <div>
                <MyPosts postData={followerPostData} showPostBlock={false}/>
            </div>
    )
}

export default Activity