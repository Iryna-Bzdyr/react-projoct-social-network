import React, {useEffect, useState} from "react";
import s from './News.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts, setActivityDataAC} from "../../Redux/Reducer/profile-reducer";
import MyPosts from "../Profile/MyPosts/MyPosts";
import PreLoader from "../../common/PreLoader/PreLoader";

const News = (props) => {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(true);
    const activityData =  useSelector(state => state.profilePage.activityData)
    useEffect(()=>{
        dispatch(getAllPosts())
        if(activityData.length>0){
            setSpinner(false)
        }
    },[activityData.length])

    return (
        spinner ? <PreLoader></PreLoader> :
        <div>
            <MyPosts  postData={activityData} showPostBlock={false}/>
        </div>
    )
}

export default News
