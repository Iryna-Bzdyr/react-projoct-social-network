import React, {useEffect, useState} from "react";
import s from './News.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../Redux/Reducer/profile-reducer";
import MyPosts from "../Profile/MyPosts/MyPosts";
import PreLoader from "../../common/PreLoader/PreLoader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

const News = (props) => {
    const dispatch = useDispatch();
    const activityData =  useSelector(state => state.profilePage.activityData)
    useEffect(()=>{
        dispatch(getAllPosts())
    },[activityData.length])

    return (
        !activityData.length ? <PreLoader></PreLoader> :
        <div>
            <MyPosts  postData={activityData} showPostBlock={false}/>
        </div>
    )
}

export default compose(
    withAuthRedirect
)(News)
