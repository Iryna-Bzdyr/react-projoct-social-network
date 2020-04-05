import React from 'react'
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import state from "../../Redux/state";
const Profile = (props) => {
    return <div>      
        <div className={s.content__inner}>
           <ProfileInfo/>
           <MyPosts postData={state.profilePage.postData} />
        </div>
    </div>
};

export default Profile
